"""Two mechanical sweeps over all 365 days. Run after any content edit.

Four rounds of whole-page reading found the same defect shape every time, and
each round also found the previous round's repairs. That is a generator flaw
rather than a punch list, so it wants a check rather than another read.

SWEEP A, retired objects. A day's steps or Safety block put something away:
into a tin, up on a shelf, out of reach, tipped out, taken down. The free-text
schedule rows after that hour (Her Job at 4:00, Quiet Play at 4:15, Wind-Down
at 5:00) were written from the day's theme and never reconciled against those
endings, so some handed the reader an object the page had already retired. Ten
of those shipped. A tired parent hits them at the hour with the least slack.

SWEEP B, uncovered hazards. A day's own materials or numbered steps name
standing water, ice, mouth-size parts, string at toddler height, a berry or an
open flame, and the day's own Safety block never mentions it. The reader runs
the page, not the booklet cover, so the sentence has to be on the day. Eight
of those shipped, including two dishpans on the floor beside a crawling baby.

Both are deliberately narrow. A check that cries wolf gets ignored, and then
the real findings get ignored with it. Out Again and Afternoon Alternatives
are excluded from Sweep B because an outing option is not the day's activity.

    python tools/pipeline/sweeps.py
"""
import glob
import io
import os
import re
import sys

HITS_A, HITS_B = [], []

# --- Sweep A ---------------------------------------------------------------
# The object must sit in the same clause as the retirement phrase and before
# it. "One jar on the windowsill, one in a dark cupboard" is not a retirement.
RETIRED = re.compile(
    r'\b(bottle caps?|buttons?|beads?|coins?|marbles?|pom.poms?|pegs?|screws?|'
    r'beans?|lentils?|ice cubes?|strings?|ribbons?|cords?|scissors|jars?|tins?|'
    r'bowls?|dishpans?|buckets?|candles?|matches|berr(?:y|ies)|nuts?)\b'
    r'[^.,;]{0,34}?\b(?:go(?:es)? back (?:in|into)|goes? up (?:on|out)|'
    r'go (?:up )?out of reach|on a high shelf|comes? down|gets? tipped out|'
    r'tipped? (?:it |them )?out|counted? back into|comes? off the line|'
    r'gets? emptied|is emptied|are emptied|goes? away|put away|stays? up)\b',
    re.I)

LATE_ROW = re.compile(r'^- \*\*(?:4:00|4:15|5:00)')

# --- Sweep B ---------------------------------------------------------------
SKIP_SECTIONS = ("### 🎯 Afternoon Alternatives", "### 🌳 Out Again")

HAZARDS = [
    ("standing water",
     r'\bdishpan\b|\bpaddling pool\b|\bbowl of (?:cold |warm |soapy |ice )?water\b|'
     r'\bbucket of water\b|\bbasin\b|\bwater table\b|\btub of water\b',
     r'drown|arm\'s reach|tip(?:ped|s)? (?:it |them )?out|empt(?:y|ied|ies)|'
     r'pour(?:ed)? (?:it |them )?away|never (?:left|out of)|water'),
    ("ice",
     r'\bice cubes?\b|\bcrushed ice\b',
     r'chok|slush|scrape[ds]?|melt|hard chunks|throat'),
    ("mouth-size parts",
     r'\bbottle caps?\b|\bbeads?\b|\bmarbles?\b|\bdried beans?\b|\bcoins?\b',
     r'chok|airway|mouth|swallow|count (?:them|it) (?:out|back)|throat|high shelf'),
    ("open flame",
     r'\bcandles?\b|\bmatches\b|\bsparklers?\b',
     r'flame|burn|matches|fire|hot wax|blow(?:n)? out|out of reach|candle'),
]


def day_blocks(path):
    out, cur, num = [], None, None
    for ln in io.open(path, encoding="utf-8", newline="").read().split("\n"):
        m = re.match(r'^<a id="day-(\d+)"></a>\s*$', ln)
        if m:
            if cur is not None:
                out.append((num, cur))
            num, cur = int(m.group(1)), []
            continue
        if re.match(r'^<a id="(week|booklet|backup)', ln) and cur is not None:
            out.append((num, cur))
            cur = None
            continue
        if cur is not None:
            cur.append(ln)
    if cur is not None:
        out.append((num, cur))
    return out


for path in sorted(glob.glob(os.path.join("months", "*w*.md"))):
    base = os.path.basename(path)
    for num, lines in day_blocks(path):
        txt = "\n".join(lines)
        m = re.search(r'> ⚠️ \*\*Safety:\*\*(.*?)(?:\n\n|\Z)', txt, re.S)
        safety = m.group(1) if m else ""

        # ---- A
        late = [l for l in lines if LATE_ROW.match(l)]
        if late:
            retired = set(re.sub(r's$', '', g.group(1).lower())
                          for g in RETIRED.finditer(txt))
            for row in late:
                low = row.lower()
                for obj in sorted(retired):
                    if re.search(r'\b' + re.escape(obj) + r's?\b', low):
                        HITS_A.append(
                            "Day %d (%s): row %r names '%s' after the page retires it"
                            % (num, base, row.split("— ", 1)[-1].strip()[:48], obj))

        # ---- B
        own, skipping = [], False
        for l in lines:
            if l.startswith("### "):
                skipping = any(l.startswith(s) for s in SKIP_SECTIONS)
            if skipping:
                continue
            if l.startswith("- ") or re.match(r'^\d+\. ', l):
                own.append(l)
        own_txt = "\n".join(own)
        for name, trigger, required in HAZARDS:
            hit = re.search(trigger, own_txt, re.I)
            if hit and not re.search(required, safety, re.I):
                HITS_B.append("Day %d (%s): %s on the page (%r), nothing in its "
                              "own Safety block" % (num, base, name, hit.group(0)[:30]))

print("=" * 74)
print("SWEEP A  a later schedule row hands back an object the page retired")
print("=" * 74)
for h in HITS_A:
    print("  " + h)
print("  none" if not HITS_A else "  %d candidates" % len(HITS_A))

print("\n" + "=" * 74)
print("SWEEP B  a hazard on the page with no line in the day's own Safety block")
print("=" * 74)
for h in HITS_B:
    print("  " + h)
print("  none" if not HITS_B else "  %d candidates" % len(HITS_B))

print("\nBoth sweeps report CANDIDATES, not failures. Read the day before")
print("changing it: a day that says 'she checks at 4:15' is doing it on purpose.")
sys.exit(0)

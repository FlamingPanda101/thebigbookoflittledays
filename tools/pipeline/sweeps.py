"""Two mechanical sweeps over all 365 days, plus the 24 backup days.

Four rounds of whole-page reading found the same defect shape every time, and
each round found the previous round's repairs. That is a generator flaw rather
than a punch list, so it wants a check rather than another read.

SWEEP A, retired objects. A day's steps or Safety block put something away:
into a tin, up on a shelf, out of reach, tipped out, taken down. The free-text
schedule rows after that hour (Her Job at 4:00, Quiet Play at 4:15, Wind-Down
at 5:00) were written from the day's theme and never reconciled against those
endings, so some of them hand the reader an object the page already retired.

SWEEP B, uncovered hazards. A day's materials or steps name standing water,
ice, mouth-size parts, string at toddler height, a berry or an open flame, and
the day's own Safety block never mentions it. The reader runs the page, not
the booklet cover, so the sentence has to be on the day.

    python tools/pipeline/sweeps.py
"""
import glob
import io
import os
import re
import sys

MONTHS = "months"
HITS_A, HITS_B = [], []


def read(p):
    return io.open(p, encoding="utf-8", newline="").read()


def day_blocks(path):
    out, cur, num = [], None, None
    for ln in read(path).split("\n"):
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


def split_day(lines):
    """Return (steps_and_activity_text, safety_text, late_rows)."""
    txt = "\n".join(lines)
    safety = ""
    m = re.search(r'> ⚠️ \*\*Safety:\*\*(.*?)(?:\n\n|\Z)', txt, re.S)
    if m:
        safety = m.group(1)
    body = txt.replace(safety, " ")
    late = [l for l in lines
            if re.match(r'^- \*\*(4:00|4:15|5:00)', l)]
    return body, safety, late


# ---------------------------------------------------------------- SWEEP A
# An object is "retired" when the page puts it beyond use for the rest of the
# day. Only high-confidence phrasings, because a false hit here sends someone
# rewriting a row that was fine.
RETIRE = re.compile(
    r'(?:back )?(?:go(?:es)?|going|put|puts|counted?|count|tip(?:ped)?|empt(?:y|ied)|'
    r'take[ns]?|taken?)\b[^.]{0,60}?\b(?:back (?:in|into|on)|up (?:on|out of)|'
    r'out of reach|on a high shelf|high (?:up|shelf)|away|down|out)\b', re.I)

# nouns worth tracking; a row naming one of these after it is retired is the bug
OBJECTS = ["bottle cap", "button", "bead", "coin", "marble", "pom-pom", "peg",
           "screw", "nail", "bean", "pasta", "rice", "lentil", "seed", "ice cube",
           "string", "ribbon", "cord", "yarn", "scissors", "jar", "tin", "bowl",
           "dishpan", "bucket", "candle", "match", "berry", "cracker", "nut"]


def sweep_a(tag, num, lines):
    body, safety, late = split_day(lines)
    if not late:
        return
    retired = set()
    for chunk in re.split(r'(?<=[.!?])\s+', body + " " + safety):
        if RETIRE.search(chunk):
            low = chunk.lower()
            for o in OBJECTS:
                if o in low:
                    retired.add(o)
    if not retired:
        return
    for row in late:
        low = row.lower()
        for o in sorted(retired):
            # plural and singular both
            if re.search(r'\b' + re.escape(o) + r's?\b', low):
                HITS_A.append("%s %s: row %r names '%s' after the page puts it away"
                              % (tag, num, row.split("— ", 1)[-1][:52], o))


# ---------------------------------------------------------------- SWEEP B
# (trigger in materials or steps) -> (something the Safety block must say)
HAZARDS = [
    ("standing water",
     r'\bdishpan\b|\bpaddling pool\b|\bbowl of (?:cold |warm |soapy )?water\b|'
     r'\bbucket of water\b|\bbasin of water\b|\bwater table\b|\btray of water\b|'
     r'\bwashing.up bowl\b',
     r'drown|arm\'s reach|tip(?:ped|s)? (?:it |them )?out|empt(?:y|ied)|'
     r'pour(?:ed)? (?:it |them )?away|never left'),
    ("ice",
     r'\bice cubes?\b|\bcrushed ice\b|\bfrozen (?:blocks?|cubes?)\b',
     r'chok|slush|scrape[ds]?|melt|hard chunks|throat'),
    ("mouth-size parts",
     r'\bbottle caps?\b|\bbuttons?\b|\bbeads?\b|\bmarbles?\b|\bpom.poms?\b|'
     r'\bdried beans?\b|\bdried pasta\b|\bcoins?\b|\blentils?\b',
     r'chok|airway|mouth|swallow|count (?:them|it) (?:out|back)|throat|high shelf'),
    ("string at height",
     r'\b(?:tie|tied|tying|hang|hung|string|cord|ribbon) (?:the )?'
     r'(?:string|cord|line|ribbon)\b|\bwashing line\b|\bclothes ?line\b',
     r'strangl|neck|loop|take (?:it|the string) down|knee height|out of reach'),
    ("berries and toxic leaves",
     r'\bberr(?:y|ies)\b|\bholly\b|\byew\b|\bmistletoe\b|\brose hips?\b|'
     r'\bivy\b|\bdaffodil\b|\bbuckeye\b',
     r'poison|toxic|sick|stay on the (?:bush|stem)|nobody eats|pocket|'
     r'out of reach|do(?:es)? not handle|leave (?:anything red|it) '),
    ("open flame",
     r'\bcandles?\b|\bmatches\b|\blighter\b|\bsparklers?\b|\btea light\b',
     r'flame|burn|matches|fire|hot wax|blow(?:n)? out|out of reach'),
]


def sweep_b(tag, num, lines):
    body, safety, _ = split_day(lines)
    for name, trigger, required in HAZARDS:
        if not re.search(trigger, body, re.I):
            continue
        if re.search(required, safety, re.I):
            continue
        m = re.search(trigger, body, re.I)
        HITS_B.append("%s %s: %s present (%r) and the day's Safety block never "
                      "covers it" % (tag, num, name, m.group(0)[:34]))


for p in sorted(glob.glob(os.path.join(MONTHS, "*w*.md"))):
    for num, lines in day_blocks(p):
        tag = os.path.basename(p)
        sweep_a("Day", num, lines)
        sweep_b("Day", num, lines)

print("=" * 74)
print("SWEEP A  retired objects handed back by a later schedule row")
print("=" * 74)
for h in HITS_A:
    print("  " + h)
print("  (none)" if not HITS_A else "\n  %d hits" % len(HITS_A))

print("\n" + "=" * 74)
print("SWEEP B  hazards on the page with no line in the day's own Safety block")
print("=" * 74)
for h in HITS_B:
    print("  " + h)
print("  (none)" if not HITS_B else "\n  %d hits" % len(HITS_B))

sys.exit(1 if (HITS_A or HITS_B) else 0)

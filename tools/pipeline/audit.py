"""Full-book audit. Reads months/ and checks everything validate.py does not.

Line-based throughout. No DOTALL, no regex surgery.
"""
import datetime as dt
import glob
import os
import re
import sys
from collections import Counter, defaultdict

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
MONTHS = os.path.join(REPO, "months")

DAY_HDR = re.compile(r"^## 🌟 Day (\d+): (.+?) 🌟\s*$")
DATE_LN = re.compile(r"^\*\*📅 (\w+day), (\w+) (\d{1,2}), 2027\*\*\s*$")
WEEK_HDR = re.compile(r"^## Week (\d+): (.+?)\s*$")
NAMED = re.compile(r"^### (?:🌅 Opening Activity|🎨 The Main Event|"
                   r"🎨 Second Main Event): (.+?)\s*$")
SCHED = re.compile(r"^- \*\*\d.*\*\* — .+$")
MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July",
               "August", "September", "October", "November", "December"]

KRESTON = [(339, 18), (309, 17), (278, 16), (248, 15), (217, 14), (186, 13),
           (156, 12), (125, 11), (95, 10), (64, 9), (36, 8), (5, 7)]
HOLIDAYS = {18: "Martin Luther King", 33: "Groundhog", 45: "Valentine",
            46: "Presidents", 76: "Patrick", 79: "equinox", 85: "Good Friday",
            87: "Easter", 112: "Earth Day", 129: "Mother", 151: "Memorial",
            156: "Kreston", 170: "Juneteenth", 171: "Father", 172: "solstice",
            185: "Independence", 249: "Labor", 256: "birthday",
            266: "equinox", 284: "Indigenous", 302: "Diwali", 304: "Hallowe",
            305: "Muertos", 315: "Veterans", 329: "Thanksgiving",
            354: "four", 355: "solstice", 358: "Hanukkah", 359: "Christmas",
            363: "birthday", 365: "New Year"}


def kreston_age(day):
    for start, age in KRESTON:
        if day >= start:
            return age
    return 6


# ---------- load, in booklet order ----------
files = sorted(glob.glob(os.path.join(MONTHS, "*.md")))
lines, origin = [], []
for f in files:
    for ln in open(f, encoding="utf-8").read().split("\n"):
        lines.append(ln)
        origin.append(os.path.basename(f))

fails, warns, notes = [], [], []

# ---------- split into day blocks ----------
starts = [(i, int(m.group(1))) for i, ln in enumerate(lines)
          if (m := DAY_HDR.match(ln))]
# a day block ends at the next day OR at the next week/booklet anchor. without
# the second condition the last day of a week absorbs the following week's
# opener, which shows up as a phantom third page break.
stops = [i for i, ln in enumerate(lines)
         if ln.startswith('<a id="week-') or ln.startswith('<a id="booklet-')
         or ln.startswith('<a id="backup-')
         or re.match(r'^<a id="\w+-(weather|sick|extras)', ln)]
days = {}
for idx, (i, n) in enumerate(starts):
    end = starts[idx + 1][0] if idx + 1 < len(starts) else len(lines)
    nxt = [s for s in stops if i < s < end]
    days[n] = lines[i:min(nxt) if nxt else end]

weeks = [(i, int(m.group(1))) for i, ln in enumerate(lines)
         if (m := WEEK_HDR.match(ln))]

print(f"AUDIT: {len(days)} days, {len(weeks)} week openers, "
      f"{len(files)} source files\n")

# ---------- 1. sequence ----------
nums = sorted(days)
if nums:
    missing = [n for n in range(1, max(nums) + 1) if n not in days]
    if missing:
        fails.append(f"missing day numbers: {missing[:20]}")

# ---------- 2. calendar ----------
for n, blk in days.items():
    d = next((x for x in blk[:4] if DATE_LN.match(x)), None)
    if not d:
        fails.append(f"D{n}: no date line")
        continue
    m = DATE_LN.match(d)
    wd, mon, dd = m.group(1), m.group(2), int(m.group(3))
    real = dt.date(2027, MONTH_NAMES.index(mon) + 1, dd)
    if real.timetuple().tm_yday != n:
        fails.append(f"D{n}: dated {mon} {dd}, which is day {real.timetuple().tm_yday}")
    if real.strftime("%A") != wd:
        fails.append(f"D{n}: {mon} {dd} is a {real.strftime('%A')}, not {wd}")

# ---------- 3. structure per day ----------
for n, blk in days.items():
    txt = "\n".join(blk)
    ns = sum(1 for x in blk if SCHED.match(x))
    if ns != 16:
        fails.append(f"D{n}: {ns} schedule rows, want 16")
    if txt.count("page-break-after") != 2:
        fails.append(f"D{n}: {txt.count('page-break-after')} page breaks, want 2")
    # the insight header is a blockquote with bold, "> 🧠 **A Little...**",
    # so match on the words, not on the emoji-plus-space form
    for req in ("Prep Tonight", "At-a-Glance", "Opening Activity",
                "The Main Event", "Get Outside", "Second Main Event",
                "Afternoon Alternatives", "Out Again",
                "A Little Parenting Insight"):
        if req not in txt:
            fails.append(f"D{n}: missing section {req}")

    # a schedule row and its heading must name the same activity. this is the
    # rule that replaced freezing the rows: Day 83 once kept a Her Job row
    # for a windowsill whose planting activity had been deleted.
    ROW = re.compile(r"^- \*\*.+?\*\* — \S+ (Opening Activity|The Main Event|"
                     r"Second Main Event|Get Outside|Out Again): "
                     r"(.+?)(?: \(\d+ min\))?\s*$")
    HEAD = re.compile(r"^### \S+ (Opening Activity|The Main Event|"
                      r"Second Main Event|Get Outside|Out Again): (.+?)\s*$")
    rows = {}
    for x in blk:
        m = ROW.match(x)
        if m:
            rows[m.group(1)] = m.group(2).strip().strip("*")
    for x in blk:
        m = HEAD.match(x)
        if m and m.group(1) in rows:
            head = m.group(2).strip().strip("*")
            if head.lower() != rows[m.group(1)].lower() \
               and "pick one" not in head.lower():
                fails.append(f"D{n}: {m.group(1)} row says "
                             f"{rows[m.group(1)]!r} but heading says {head!r}")

    sec, cur = defaultdict(list), None
    for x in blk:
        if x.startswith("### "):
            cur = x[4:].split(":")[0].strip()
        elif cur:
            sec[cur].append(x)
    for nm, lo, hi in (("🎨 The Main Event", 4, 6), ("🎨 Second Main Event", 5, 7)):
        s = [x for x in sec.get(nm, []) if re.match(r"^\d+\. ", x)]
        if s and not (lo <= len(s) <= hi):
            fails.append(f"D{n}: {nm} has {len(s)} steps, want {lo}-{hi}")
    for nm, lo, hi in (("🎯 Afternoon Alternatives", 3, 4), ("🌳 Out Again", 4, 6)):
        b = [x for x in sec.get(nm, []) if x.startswith("- ")]
        if b and not (lo <= len(b) <= hi):
            fails.append(f"D{n}: {nm} has {len(b)} bullets, want {lo}-{hi}")

# ---------- 4. ages ----------
for n, blk in days.items():
    txt = "\n".join(blk)
    want = kreston_age(n)
    found = set(int(x) for x in re.findall(r"(\d{1,2}) months", txt))
    found |= set(int(x) for x in re.findall(r"at (\d{1,2}) months", txt))
    if found and want not in found:
        if not (want == 12 and re.search(r"turns 1|is 1\b|one year", txt)):
            warns.append(f"D{n}: Kreston should be {want}mo, text says {sorted(found)}")
    azlyn_want = 4 if n >= 354 else 3
    if re.search(r"Azlyn is (three|3)\b", txt) and azlyn_want == 4:
        fails.append(f"D{n}: Azlyn called three, but she turns four on Day 354")
    if re.search(r"Azlyn is (four|4)\b", txt) and azlyn_want == 3:
        fails.append(f"D{n}: Azlyn called four before Day 354")

# ---------- 5. sidebars: one per week, on the week's first day ----------
atw = sorted(n for n, blk in days.items()
             if any(x.startswith("### 🌍 Around the World") for x in blk))
for n in atw:
    if n % 7 != 1:
        fails.append(f"D{n}: Around the World is not on a week's first day")
expected_first = [7 * w - 6 for w in range(1, (max(nums) // 7) + 1)] if nums else []
for f_ in expected_first:
    if f_ in days and f_ not in atw:
        fails.append(f"D{f_}: week's first day has no Around the World")

# ---------- 6. holidays ----------
# the equinoxes and solstices are "bonus note" days and the book often marks
# them by what happens rather than by the word, which reads better to a
# three-year-old. Accept either.
SYNONYMS = {"equinox": ("equinox", "same length", "day and the night",
                        "even split", "halfway"),
            "solstice": ("solstice", "longest day", "shortest day",
                         "latest sunset", "light for longest")}
for n, kw in HOLIDAYS.items():
    if n not in days:
        continue
    hay = "\n".join(days[n]).lower()
    alts = SYNONYMS.get(kw.lower(), (kw.lower(),))
    if not any(a in hay for a in alts):
        warns.append(f"D{n}: no mention of {kw!r}")

# ---------- 7. style ----------
ADV = re.compile(r"\b(really|just|literally|genuinely|honestly|simply|actually"
                 r"|deeply|truly|fundamentally|inherently|inevitably)\b", re.I)
for n, blk in days.items():
    prose = [x for x in blk if not x.startswith("- **") and
             not x.startswith("###") and not x.startswith("- [")]
    em = sum(x.count("—") for x in prose)
    if em:
        fails.append(f"D{n}: {em} em dash(es) in prose")
    a = ADV.findall(" ".join(prose))
    if a:
        fails.append(f"D{n}: adverbs {sorted(set(x.lower() for x in a))}")

# ---------- 8. titles ----------
titles = [m.group(1).strip().lower() for ln in lines if (m := NAMED.match(ln))]
dupes = [t for t, c in Counter(titles).items() if c > 1]
if dupes:
    fails.append(f"duplicate activity titles: {dupes[:8]}")
ins, pend = [], False
for ln in lines:
    if ln.startswith("> 🧠"):
        pend = True
        continue
    if pend and (m := re.match(r"^> \*\*(.+?)\*\*\s*$", ln)):
        ins.append(m.group(1).strip().lower().rstrip("."))
        pend = False
idup = [t for t, c in Counter(ins).items() if c > 1]
if idup:
    fails.append(f"duplicate insight headlines: {idup[:8]}")

# ---------- 8b. each opener's What You'll Learn must quote its own week's
#                seven insight headlines. A truncated day file once produced
#                an opener derived from one day instead of seven.
def hnorm(s):
    s = s.strip().lower()
    s = re.sub(r'\.(["”\'])\s*$', r"\1", s)
    return s.rstrip(". ")


for wi, (li, wnum) in enumerate(weeks):
    wend = weeks[wi + 1][0] if wi + 1 < len(weeks) else len(lines)
    blk = lines[li:wend]
    try:
        s = next(i for i, x in enumerate(blk) if "What You'll Learn" in x)
        e = next(i for i, x in enumerate(blk[s:], s) if "Shopping List" in x)
    except StopIteration:
        fails.append(f"week {wnum}: opener missing What You'll Learn or Shopping List")
        continue
    bullets = [hnorm(x[2:]) for x in blk[s:e] if x.startswith("- ")]
    if len(bullets) != 7:
        fails.append(f"week {wnum}: opener lists {len(bullets)} headlines, want 7")
    wdays = [d for d in range(7 * wnum - 6, 7 * wnum + 1) if d in days]
    heads = []
    for d in wdays:
        pend2 = False
        for x in days[d]:
            if x.startswith("> 🧠"):
                pend2 = True
                continue
            if pend2 and (m := re.match(r"^> \*\*(.+?)\*\*\s*$", x)):
                heads.append(hnorm(m.group(1)))
                pend2 = False
    for h in heads:
        if h not in bullets:
            fails.append(f"week {wnum}: opener does not quote day headline {h[:60]!r}")
    shop = sum(1 for x in blk if x.startswith("- [ ]"))
    if shop < 15:
        warns.append(f"week {wnum}: shopping list only {shop} items")

# ---------- 9. year-long threads ----------
book = "\n".join(lines).lower()
for name, kw in (("time capsule", "time capsule"), ("growth chart", "growth chart"),
                 ("handprint", "handprint"), ("the forks", "the forks")):
    hits = book.count(kw)
    notes.append(f"thread {name!r}: {hits} mentions")

# ---------- report ----------
print(f"activity titles: {len(titles)} ({len(set(titles))} unique)")
print(f"insight headlines: {len(ins)} ({len(set(ins))} unique)")
print(f"Around the World sidebars: {len(atw)}")
for x in notes:
    print("  ", x)
if warns:
    print(f"\n{len(warns)} WARNING(S)")
    for w in warns[:30]:
        print("  ~", w)
if fails:
    print(f"\n{len(fails)} FAILURE(S)")
    for f_ in fails[:40]:
        print("  -", f_)
    sys.exit(1)
print("\nAUDIT PASSED")

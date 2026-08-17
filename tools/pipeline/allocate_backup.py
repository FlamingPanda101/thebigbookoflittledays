"""Allocate four unused insight headlines to each month's backup days.

Backup days carry insights, and every headline in the book must be unique.
Writes tools/pipeline/backup-briefs.json.
"""
import glob
import json
import os
import re

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
SP = os.path.dirname(os.path.abspath(__file__))

MONTHS = [
    ("January", "01", "jan", "deep winter, short days, frozen ground, dark by 5"),
    ("February", "02", "feb", "cold and wet, the longest-feeling month, still dark early"),
    ("March", "03", "mar", "mud, wind, first warm afternoons that do not last"),
    ("April", "04", "apr", "rain showers, sudden warmth, everything coming up"),
    ("May", "05", "may", "warm but unreliable, thunderstorms, long light evenings"),
    ("June", "06", "jun", "heat arriving, longest days, first properly hot afternoons"),
    ("July", "07", "jul", "heat, thunderstorms, days too hot to be out at noon"),
    ("August", "08", "aug", "heavy heat, humid, the flat end of summer"),
    ("September", "09", "sep", "cooling, first cold mornings, light going earlier"),
    ("October", "10", "oct", "wind and rain, leaves down, dark by 6 after the clocks"),
    ("November", "11", "nov", "grey, wet, dark by 5, the flattest month"),
    ("December", "12", "dec", "cold, dark by 4:30, possible snow, indoors a lot"),
]

pool = [re.match(r"^- \*\*\d+\.\*\* (.+)$", l.strip()).group(1)
        for l in open(os.path.join(REPO, "tools", "insight-pool.md"),
                      encoding="utf-8")
        if re.match(r"^- \*\*\d+\.\*\* ", l.strip())]

used = set()
for f in glob.glob(os.path.join(REPO, "months", "*.md")):
    pend = False
    for ln in open(f, encoding="utf-8").read().split("\n"):
        if ln.startswith("> 🧠"):
            pend = True
            continue
        if pend:
            m = re.match(r"^> \*\*(.+?)\*\*\s*$", ln)
            if m:
                used.add(m.group(1).strip().lower().rstrip("."))
                pend = False

free = [h for h in pool if h.lower().rstrip(".") not in used]
assert len(free) >= 48, f"only {len(free)} free headlines, need 48"

briefs, cur = [], 0
for name, pre, ab, weather in MONTHS:
    briefs.append({
        "month": name, "prefix": pre, "abbrev": ab, "weather": weather,
        "file": f"{pre}-{ab}-zz-backup.md",
        "anchors": [f"{ab}-weather-1", f"{ab}-weather-2",
                    f"{ab}-sick-1", f"{ab}-sick-2", f"{ab}-extras"],
        "insight_headlines": free[cur:cur + 4],
    })
    cur += 4

json.dump(briefs, open(os.path.join(SP, "backup-briefs.json"), "w",
                       encoding="utf-8"), ensure_ascii=False, indent=2)
print(f"allocated {cur} headlines across 12 months, {len(free) - cur} spare")
for b in briefs[:2]:
    print(f"  {b['month']}: {b['file']}")
    for h in b["insight_headlines"]:
        print(f"     - {h[:66]}")

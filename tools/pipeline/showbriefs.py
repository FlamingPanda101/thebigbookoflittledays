"""Print a summary of the remaining week briefs. Read-only."""
import json
import os
import sys

SP = os.path.dirname(os.path.abspath(__file__))
lo, hi = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (45, 52)

for w in range(lo, hi + 1):
    p = os.path.join(SP, "weeks", f"wk{w:02d}.json")
    if not os.path.exists(p):
        print(f"wk{w:02d}: BRIEF MISSING")
        continue
    d = json.load(open(p, encoding="utf-8"))
    hols = [f"D{x['day']} {x['holiday']} ({x['holiday_treatment']})"
            for x in d["day_specs"] if x.get("holiday")]
    ages = sorted({x["azlyn_age"] for x in d["day_specs"]})
    kr = sorted({x["kreston_months"] for x in d["day_specs"]})
    flag = "  <-- SIDEBAR NEEDS WRITING" if d.get("sidebar_needs_writing") else ""
    print(f"wk{w:02d} {d['booklet'][:3]} days {d['days'][0]:>3}-{d['days'][1]:<3} "
          f"{d['theme'][:38]:<38} Azlyn{ages} K{kr}mo{flag}")
    print(f"       sidebar: {d['sidebar']}")
    if hols:
        for h in hols:
            print(f"       holiday: {h}")

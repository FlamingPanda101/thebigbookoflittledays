"""Print the grand-audit findings by severity. The consolidator agent kept
failing on a prompt that embedded all six raw results, so this does the merge.
"""
import io
import json
import re

raw = io.open("tools/pipeline/GRAND-AUDIT-RAW.txt", encoding="utf-8").read()

# each result is a JSON object somewhere in its block
blocks = raw.split("=" * 70)
found = []
for b in blocks:
    s, e = b.find("{"), b.rfind("}")
    if s == -1 or e == -1:
        continue
    txt = b[s:e + 1]
    for attempt in (txt, txt.replace("\\n", "\n").replace('\\"', '"')):
        try:
            found.append(json.loads(attempt))
            break
        except Exception:
            continue

print(f"parsed {len(found)} of 6 audit results\n")
order = {"critical": 0, "major": 1, "minor": 2}
rows = []
for d in found:
    dim = d.get("dimension", "?")
    print(f"### {dim}")
    print(f"    {d.get('overallVerdict','')[:400]}\n")
    for f in d.get("findings", []):
        rows.append((order.get(f.get("severity"), 3), dim, f))

rows.sort(key=lambda x: x[0])
for label, sev in (("CRITICAL", "critical"), ("MAJOR", "major")):
    sel = [r for r in rows if r[2].get("severity") == sev]
    print("\n" + "=" * 74)
    print(f"{label}  ({len(sel)})")
    print("=" * 74)
    for _, dim, f in sel:
        days = f.get("days", [])
        ds = ", ".join(f"D{x}" for x in days[:10]) + ("..." if len(days) > 10 else "")
        print(f"\n[{dim.split(':')[0][:26]}] {ds}")
        print(f"  PROBLEM: {str(f.get('problem',''))[:340]}")
        if f.get("why"):
            print(f"  WHY:     {str(f.get('why',''))[:220]}")
        print(f"  FIX:     {str(f.get('fix',''))[:260]}")

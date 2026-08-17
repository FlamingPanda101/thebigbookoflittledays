"""Extract the consolidated audit verdict from the workflow output."""
import json
import os
import re
import sys

p = sys.argv[1]
raw = open(p, encoding="utf-8").read()

# the consolidator's JSON is the value of "merged"
i = raw.find('"merged"')
seg = raw[i:]
s = seg.find('"{')
if s == -1:
    print(seg[:4000])
    sys.exit(0)
# walk the escaped JSON string
depth, j, buf = 0, s + 1, []
while j < len(seg):
    ch = seg[j]
    if ch == "\\" and j + 1 < len(seg):
        buf.append(seg[j:j + 2])
        j += 2
        continue
    if ch == '"' and depth == 0 and buf:
        break
    buf.append(ch)
    if ch == "{":
        depth += 1
    elif ch == "}":
        depth -= 1
        if depth == 0:
            buf.append("")
            break
    j += 1
txt = "".join(buf)
txt = txt.replace('\\"', '"').replace("\\n", "\n").replace("\\\\", "\\")
try:
    d = json.loads(txt)
except Exception as e:
    print("parse failed:", e)
    print(txt[:6000])
    sys.exit(1)

print("=" * 78)
print("VERDICT")
print("=" * 78)
print(d.get("verdict", "")[:4000])

st = d.get("struck", {})
print(f"\nSTRUCK: {st.get('count')} findings")
print(st.get("why", "")[:1500])

for key, title in (("mustFix", "MUST FIX BEFORE PRINT"),
                   ("worthFixing", "WORTH FIXING")):
    items = d.get(key, [])
    print("\n" + "=" * 78)
    print(f"{title}  ({len(items)})")
    print("=" * 78)
    for k, it in enumerate(items, 1):
        days = it.get("days", [])
        ds = ", ".join(f"D{x}" for x in days[:12]) + ("..." if len(days) > 12 else "")
        print(f"\n{k}. [{it.get('dimension','?')}]  {ds}")
        print(f"   PROBLEM: {it.get('problem','')[:600]}")
        if it.get("why"):
            print(f"   WHY:     {it.get('why','')[:400]}")
        print(f"   FIX:     {it.get('fix','')[:500]}")

print("\n" + "=" * 78)
print("PER-DIMENSION VERDICTS")
print("=" * 78)
for k, v in (d.get("dimensionVerdicts") or {}).items():
    print(f"\n{k.upper()}: {v[:700]}")

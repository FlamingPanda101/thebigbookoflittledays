import json
import os

J = (r"C:\Users\Josep\.claude\projects\C--Users-Josep--claude"
     r"\f2051431-8954-4594-9860-3b743569602a\subagents\workflows"
     r"\wf_014bf30c-0d2\journal.jsonl")

found = False
for ln in open(J, encoding="utf-8"):
    try:
        d = json.loads(ln)
    except Exception:
        continue
    if d.get("type") != "result":
        continue
    r = str(d.get("result", ""))
    if '"findings"' not in r:
        continue
    s, e = r.find("{"), r.rfind("}")
    try:
        o = json.loads(r[s:e + 1])
    except Exception:
        print(r[:3000])
        break
    found = True
    for i, f in enumerate(o.get("findings", []), 1):
        print(f"{i}. [{f.get('category')}] {'+'.join(f.get('blocks', []))}")
        print(f"   TEXT: {f.get('text', '')[:200]}")
        print(f"   PROB: {f.get('problem', '')[:260]}")
        print(f"   FIX : {f.get('fix', '')[:260]}\n")
    break

if not found:
    print("no findings payload located in journal")

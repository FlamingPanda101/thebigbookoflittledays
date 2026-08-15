import json

J = (r"C:\Users\Josep\.claude\projects\C--Users-Josep--claude"
     r"\f2051431-8954-4594-9860-3b743569602a\subagents\workflows"
     r"\wf_f126af58-f3c\journal.jsonl")

rows = []
for ln in open(J, encoding="utf-8"):
    try:
        d = json.loads(ln)
    except Exception:
        continue
    if d.get("type") != "result":
        continue
    lab = str(d.get("label", ""))
    if not lab.startswith("recheck:"):
        continue
    r = str(d.get("result", ""))
    s, e = r.find("{"), r.rfind("}")
    try:
        o = json.loads(r[s:e + 1])
    except Exception:
        continue
    rows.append((lab.split(":")[1], o))

rows.sort()
for key, o in rows:
    issues = o.get("issues", [])
    sev = [i for i in issues if i.get("severity") in ("critical", "major")]
    print(f"=== {key}  ok={o.get('ok')}  words={o.get('words')}  "
          f"{len(sev)} major/critical, {len(issues) - len(sev)} minor")
    for i in issues:
        if i.get("severity") in ("critical", "major"):
            print(f"  [{i['severity'].upper()}] {i.get('problem', '')[:230]}")
            print(f"     FIX: {i.get('fix', '')[:230]}")
    print()

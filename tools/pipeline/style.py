import sys,io
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding="utf-8",errors="replace")
import re
p=r"newweeks/wk15-days.md"
lines=open(p,encoding="utf-8").read().split("\n")
bad=r"\b(really|just|literally|genuinely|honestly|simply|actually|deeply|truly|fundamentally)\b"
for i,l in enumerate(lines,1):
    if re.search(bad,l,re.I): print("ADV",i,l[:120])
    if "—" in l and not l.startswith("- **") and not l.startswith("- **"): 
        if not re.match(r"^- \*\*\d",l): print("EMDASH",i,l[:120])
    for m in re.finditer(r"(?:^|(?<=[.!?:] ))(What|Why|When|Where|Which|Who|How)\b",l):
        print("WH",i,l[max(0,m.start()-30):m.start()+70])
    if len(l)>82 and not l.startswith("- ") and not re.match(r"^\d+\. ",l) and not l.startswith("**") and not l.startswith("### ") and not l.startswith("> 💡") and not l.startswith("> ") and not l.startswith("<"):
        print("WRAP",i,len(l),l[:100])

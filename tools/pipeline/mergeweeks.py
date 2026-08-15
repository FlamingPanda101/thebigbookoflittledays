"""Merge generated weeks into months/ and regenerate titles.tsv from source.

usage: mergeweeks.py <month-prefix> <month-abbrev> <week> [<week> ...]
   eg: mergeweeks.py 01 jan 2 3 4 5
"""
import glob
import os
import re
import sys

SP = os.path.dirname(os.path.abspath(__file__))
REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
NEW = os.path.join(SP, "newweeks")
MONTHS = os.path.join(REPO, "months")

prefix, abbrev = sys.argv[1], sys.argv[2]
weeks = [int(a) for a in sys.argv[3:]]

DAY_HDR = re.compile(r"^## 🌟 Day (\d+): (.+?) 🌟\s*$")
NAMED = re.compile(r"^### (?:🌅 Opening Activity|🎨 The Main Event|"
                   r"🎨 Second Main Event): (.+?)\s*$")
INSIGHT = re.compile(r"^> \*\*(.+?)\*\*\s*$")

written = []
for wk in weeks:
    op = os.path.join(NEW, f"wk{wk:02d}-opener.md")
    dp = os.path.join(NEW, f"wk{wk:02d}-days.md")
    for p in (op, dp):
        assert os.path.exists(p), f"missing {p}"
    opener = open(op, encoding="utf-8").read().rstrip("\n")
    days = open(dp, encoding="utf-8").read().rstrip("\n")

    # line-based, never a multiline regex over the whole file
    n_days = sum(1 for ln in days.split("\n") if DAY_HDR.match(ln))
    assert n_days == 7, f"wk{wk}: {n_days} days, refusing to write"

    dest = os.path.join(MONTHS, f"{prefix}-{abbrev}-w{wk}.md")
    assert not os.path.exists(dest), f"{dest} already exists, refusing"
    with open(dest, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(opener + "\n\n" + days + "\n")
    written.append(os.path.basename(dest))
    print(f"wrote months/{os.path.basename(dest)} ({n_days} days)")

# --- regenerate titles.tsv from every file in months/, the source of truth
acts, ins = [], []
for f in sorted(glob.glob(os.path.join(MONTHS, "*.md"))):
    day = None
    pending = False
    for ln in open(f, encoding="utf-8").read().split("\n"):
        m = DAY_HDR.match(ln)
        if m:
            day = int(m.group(1))
            continue
        m = NAMED.match(ln)
        if m and day:
            acts.append((day, m.group(1).strip()))
            continue
        if ln.startswith("> 🧠"):
            pending = True
            continue
        if pending:
            m = INSIGHT.match(ln)
            if m and day:
                ins.append((day, m.group(1).strip()))
                pending = False

acts.sort(key=lambda x: x[0])
ins.sort(key=lambda x: x[0])

seen, dupes = set(), []
for _, t in acts + ins:
    k = t.lower().rstrip(".")
    if k in seen:
        dupes.append(t)
    seen.add(k)
assert not dupes, f"duplicate titles, refusing to write titles.tsv: {dupes[:5]}"

tsv = os.path.join(REPO, "tools", "titles.tsv")
with open(tsv, "w", encoding="utf-8", newline="\n") as fh:
    fh.write("kind\tday\ttitle\n")
    for d, t in acts:
        fh.write(f"activity\t{d}\t{t}\n")
    for d, t in ins:
        fh.write(f"insight\t{d}\t{t}\n")

print(f"\nregenerated tools/titles.tsv: {len(acts)} activities + "
      f"{len(ins)} insights = {len(acts) + len(ins)} unique titles")
print("files added:", ", ".join(written))

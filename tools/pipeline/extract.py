"""Extract per-dimension views of a day range, so an auditor can see every day
for one concern without reading the whole book.

usage: extract.py <first-day> <last-day> <outdir>
"""
import glob
import os
import re
import sys

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
LO, HI = int(sys.argv[1]), int(sys.argv[2])
OUT = sys.argv[3]
os.makedirs(OUT, exist_ok=True)

DAY = re.compile(r"^## 🌟 Day (\d+): (.+?) 🌟\s*$")
DATE = re.compile(r"^\*\*📅 (\w+day), (\w+) (\d{1,2}), 2027\*\*\s*$")

lines = []
for f in sorted(glob.glob(os.path.join(REPO, "months", "*.md"))):
    lines.extend(open(f, encoding="utf-8").read().split("\n"))

stops = [i for i, ln in enumerate(lines)
         if ln.startswith('<a id="week-') or ln.startswith('<a id="booklet-')]
starts = [(i, int(m.group(1))) for i, ln in enumerate(lines) if (m := DAY.match(ln))]
days = {}
for idx, (i, n) in enumerate(starts):
    end = starts[idx + 1][0] if idx + 1 < len(starts) else len(lines)
    nxt = [s for s in stops if i < s < end]
    days[n] = lines[i:min(nxt) if nxt else end]
sel = {n: b for n, b in days.items() if LO <= n <= HI}


def sections(blk):
    out, cur = {}, None
    for x in blk:
        if x.startswith("### "):
            cur = x[4:].strip()
            out[cur] = []
        elif cur:
            out[cur].append(x)
    return out


def head(n):
    d = next((x for x in sel[n][:4] if DATE.match(x)), "")
    m = DATE.match(d) if d else None
    t = DAY.match(sel[n][0]) if DAY.match(sel[n][0]) else None
    title = t.group(2) if t else "?"
    return f"D{n} ({m.group(1)[:3]} {m.group(2)[:3]} {m.group(3)}) {title}" if m else f"D{n} {title}"


def write(name, chunks):
    p = os.path.join(OUT, name)
    with open(p, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(chunks))
    print(f"  {name}: {len(chunks)} entries, {sum(len(c.split()) for c in chunks):,} words")


# 1. SAFETY: every Safety block with the steps of its own day
saf = []
for n in sorted(sel):
    blk, sec = sel[n], sections(sel[n])
    s = [x for x in blk if x.startswith("> ⚠️") or
         (x.startswith("> ") and any(y.startswith("> ⚠️") for y in blk[:blk.index(x)]))]
    steps = []
    for k, v in sec.items():
        if "Main Event" in k or "Opening Activity" in k or "Get Outside" in k:
            steps += [f"    [{k}] {x}" for x in v
                      if re.match(r"^\d+\. ", x) or x.startswith("**🧰")
                      or (not x.startswith(("-", ">", "*")) and x.strip())]
    saf.append(f"{head(n)}\n  SAFETY: {' '.join(x[2:] for x in s) or '(none)'}\n"
               + "\n".join(steps[:26]))
write("safety.txt", saf)

# 2. MATERIALS: every materials list
mat = []
for n in sorted(sel):
    sec = sections(sel[n])
    items = []
    for k, v in sec.items():
        got = [x for x in v if x.startswith("- ")]
        need = [x for x in v if x.startswith("**🧰 You need")]
        if got or need:
            items.append(f"  [{k}]\n" + "\n".join("    " + x for x in need + got))
    mat.append(f"{head(n)}\n" + "\n".join(items))
write("materials.txt", mat)

# 3. TITLES + TIPS: for repetition across months
rep = []
for n in sorted(sel):
    blk = sel[n]
    names = [x[4:] for x in blk if x.startswith("### ")]
    tips = [x for x in blk if x.startswith("> 💡")]
    rep.append(f"{head(n)}\n  " + "\n  ".join(names) + "\n  " + "\n  ".join(tips))
write("titles-and-tips.txt", rep)

# 4. INSIGHTS: headline plus body
ins = []
for n in sorted(sel):
    blk = sel[n]
    for i, x in enumerate(blk):
        if x.startswith("> 🧠"):
            body = []
            for y in blk[i + 1:]:
                if not y.startswith("> ") or y.startswith("> ⚠️"):
                    break
                body.append(y[2:])
            ins.append(f"{head(n)}\n  " + "\n  ".join(body))
            break
write("insights.txt", ins)

# 5. INFANT: Kreston's two blocks per day, to check the developmental arc
inf = []
for n in sorted(sel):
    blk = sel[n]
    got = []
    for i, x in enumerate(blk):
        if x.startswith("> 👶"):
            body = [x[2:]]
            for y in blk[i + 1:]:
                if not y.startswith("> "):
                    break
                body.append(y[2:])
            got.append(" ".join(body))
    inf.append(f"{head(n)}\n  " + "\n  ".join(got))
write("infant.txt", inf)

# 6. OUTDOOR: Get Outside plus Out Again, for season fit
out = []
for n in sorted(sel):
    sec = sections(sel[n])
    g = next((v for k, v in sec.items() if "Get Outside" in k), [])
    o = next((v for k, v in sec.items() if "Out Again" in k), [])
    out.append(f"{head(n)}\n  GET OUTSIDE: " + " ".join(x for x in g if x.strip() and not x.startswith(">"))
               + "\n  OUT AGAIN: " + " | ".join(x[2:] for x in o if x.startswith("- ")))
write("outdoor.txt", out)

print(f"\nextracted days {LO}-{HI} ({len(sel)} days) into {OUT}")

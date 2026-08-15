"""Reassemble rewritten blocks into months/. Line-based, no DOTALL.

Refuses to write if any frozen line changed. Run with --check to audit only.
"""
import os
import re
import sys

SP = os.path.dirname(os.path.abspath(__file__))
REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
ORIG, NEW = os.path.join(SP, "blocks"), os.path.join(SP, "rewritten")
ORDER = ["opener", "day1", "day2", "day3", "day4", "day5", "day6", "day7"]

FROZEN = [
    re.compile(r'^<a id="[\w-]+"></a>$'),
    re.compile(r"^## 🌟 Day \d+: .+ 🌟$"),
    re.compile(r"^\*\*📅 .+\*\*$"),
    re.compile(r"^\*\*Theme:\*\* .+$"),
    re.compile(r"^## Week \d+: .+$"),
    re.compile(r"^### .+$"),
    re.compile(r"^- \*\*\d.+\*\* — .+$"),           # schedule rows
    re.compile(r'^<div style="page-break-after: always;"></div>$'),
]


def read(d, k):
    with open(os.path.join(d, k + ".md"), encoding="utf-8") as fh:
        return fh.read().split("\n")


def frozen_lines(lines):
    """Every frozen line, in order, plus each insight headline."""
    out, pending = [], False
    for ln in lines:
        if any(p.match(ln) for p in FROZEN):
            out.append(ln)
        if ln.startswith("> 🧠"):
            pending = True
            continue
        if pending and re.match(r"^> \*\*.+\*\*$", ln):
            out.append("INSIGHT:" + ln)
            pending = False
    return out


def words(lines):
    return len(" ".join(lines).split())


fails = []
for key in ORDER + ["cover"]:
    path = os.path.join(NEW, key + ".md")
    if not os.path.exists(path):
        fails.append(f"{key}: MISSING from rewritten/")
        continue
    o, n = read(ORIG, key), read(NEW, key)
    fo, fn = frozen_lines(o), frozen_lines(n)
    if fo != fn:
        only_o = [x for x in fo if x not in fn]
        only_n = [x for x in fn if x not in fo]
        for x in only_o[:6]:
            fails.append(f"{key}: FROZEN LINE LOST -> {x!r}")
        for x in only_n[:6]:
            fails.append(f"{key}: FROZEN LINE ADDED/CHANGED -> {x!r}")
        if not only_o and not only_n:
            fails.append(f"{key}: frozen lines reordered")
    ow, nw = words(o), words(n)
    drift = (nw - ow) / ow * 100
    flag = "  <-- OUT OF BAND" if abs(drift) > 8 else ""
    if abs(drift) > 8:
        fails.append(f"{key}: word count drift {drift:+.1f}% ({ow} -> {nw})")
    print(f"{key:>7}: {ow:>5} -> {nw:>5} words ({drift:+5.1f}%)"
          f"  frozen {len(fn)}/{len(fo)}{flag}")

    # residual slop, prose lines only (schedule rows and headings exempt)
    prose = [ln for ln in n
             if not ln.startswith("- **") and not ln.startswith("###")]
    em = sum(ln.count("—") for ln in prose)
    adv = re.findall(
        r"\b(really|just|literally|genuinely|honestly|simply|actually|deeply|"
        r"truly|fundamentally|inherently|inevitably)\b",
        " ".join(prose), re.I)
    if em or adv:
        print(f"         residual: {em} em dash, adverbs {sorted(set(a.lower() for a in adv))}")

if fails:
    print("\nREFUSING TO WRITE:")
    for f in fails:
        print("  -", f)
    sys.exit(1)

print("\nfrozen lines intact, word counts in band")

if "--check" in sys.argv:
    sys.exit(0)

week = []
for key in ORDER:
    week.extend(read(NEW, key))

# hard assertion before touching the repo
n_days = sum(1 for ln in week if re.match(r"^## 🌟 Day \d+: .+ 🌟$", ln))
assert n_days == 7, f"day count moved: {n_days}, refusing to save"

with open(os.path.join(REPO, "months", "01-jan-w1.md"), "w",
          encoding="utf-8", newline="\n") as fh:
    fh.write("\n".join(week))
with open(os.path.join(REPO, "months", "01-jan-00-cover.md"), "w",
          encoding="utf-8", newline="\n") as fh:
    fh.write("\n".join(read(NEW, "cover")))

print(f"wrote months/01-jan-w1.md ({len(week)} lines, {n_days} days)")
print("wrote months/01-jan-00-cover.md")

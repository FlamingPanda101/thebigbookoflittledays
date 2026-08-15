"""Restore one day block from the baseline. Line-based splice, no regex surgery.

usage: revertday.py <week> <day>
"""
import os
import re
import sys

SP = os.path.dirname(os.path.abspath(__file__))
wk, day = int(sys.argv[1]), int(sys.argv[2])
cur = os.path.join(SP, "newweeks", f"wk{wk:02d}-days.md")
base = os.path.join(SP, "baseline", f"wk{wk:02d}-days.md")

ANCHOR = re.compile(r'^<a id="day-(\d+)"></a>\s*$')


def blocks(path):
    lines = open(path, encoding="utf-8").read().split("\n")
    starts = [(i, int(m.group(1))) for i, ln in enumerate(lines)
              if (m := ANCHOR.match(ln))]
    out, order = {}, []
    for idx, (i, n) in enumerate(starts):
        end = starts[idx + 1][0] if idx + 1 < len(starts) else len(lines)
        out[n] = lines[i:end]
        order.append(n)
    return lines[:starts[0][0]], out, order


head_c, cur_b, order = blocks(cur)
head_b, base_b, order_b = blocks(base)

assert order == order_b, f"day order differs: {order} vs {order_b}"
assert day in cur_b and day in base_b, f"day {day} not in both files"

if cur_b[day] == base_b[day]:
    print(f"day {day} already matches baseline, nothing to do")
    sys.exit(0)

before = len(" ".join(cur_b[day]).split())
cur_b[day] = list(base_b[day])
after = len(" ".join(cur_b[day]).split())

rebuilt = list(head_c)
for n in order:
    rebuilt.extend(cur_b[n])

n_days = sum(1 for ln in rebuilt if ln.startswith("## 🌟 Day "))
assert n_days == 7, f"day count moved to {n_days}, refusing to save"

with open(cur, "w", encoding="utf-8", newline="\n") as fh:
    fh.write("\n".join(rebuilt))
print(f"wk{wk:02d} day {day}: restored from baseline ({before} -> {after} words)")
print(f"day count {n_days}, other days untouched")

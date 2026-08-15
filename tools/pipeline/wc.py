"""Per-day word counts. Splits into day blocks by anchor, no regex surgery."""
import re, sys

path = sys.argv[1]
lines = open(path, encoding="utf-8").read().splitlines()

# split into blocks at each <a id="day-N"></a>
blocks, cur, num = [], None, None
for ln in lines:
    m = re.match(r'^<a id="day-(\d+)"></a>\s*$', ln)
    if m:
        if cur is not None:
            blocks.append((num, cur))
        num, cur = int(m.group(1)), []
        continue
    if cur is not None:
        cur.append(ln)
if cur is not None:
    blocks.append((num, cur))

assert len(blocks) == 7, f"expected 7 day blocks, got {len(blocks)}"


def words(ls):
    return len(" ".join(ls).split())


print(f"{'Day':>4} {'total':>7} {'schedule':>9} {'prose':>7}")
for n, ls in blocks:
    # schedule block = from '### ⏰' up to the next '###'
    sched, inside = [], False
    for ln in ls:
        if ln.startswith("### ⏰"):
            inside = True
        elif inside and ln.startswith("### "):
            inside = False
        if inside:
            sched.append(ln)
    t, s = words(ls), words(sched)
    print(f"{n:>4} {t:>7} {s:>9} {t - s:>7}")

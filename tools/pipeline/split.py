"""Split week file into blocks. Line-based. No DOTALL, no regex surgery."""
import os
import re
import sys

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

src = os.path.join(REPO, "months", "01-jan-w1.md")
lines = open(src, encoding="utf-8").read().split("\n")

# find the anchor line index for each day
starts = []
for i, ln in enumerate(lines):
    m = re.match(r'^<a id="day-(\d+)"></a>\s*$', ln)
    if m:
        starts.append((int(m.group(1)), i))

assert len(starts) == 7, f"expected 7 day anchors, got {len(starts)}"

blocks = {}
blocks["opener"] = lines[: starts[0][1]]
for idx, (num, start) in enumerate(starts):
    end = starts[idx + 1][1] if idx + 1 < len(starts) else len(lines)
    blocks[f"day{num}"] = lines[start:end]

# cover is its own file
cover = open(os.path.join(REPO, "months", "01-jan-00-cover.md"),
             encoding="utf-8").read().split("\n")
blocks["cover"] = cover

for name, ls in blocks.items():
    with open(os.path.join(OUT, f"{name}.md"), "w", encoding="utf-8",
              newline="\n") as fh:
        fh.write("\n".join(ls))
    print(f"{name}: {len(ls)} lines, {len(' '.join(ls).split())} words")

# round-trip assertion: opener + days must reproduce the source exactly
rebuilt = list(blocks["opener"])
for num, _ in starts:
    rebuilt.extend(blocks[f"day{num}"])
assert rebuilt == lines, "ROUND TRIP FAILED - split is lossy"
print("\nround-trip verified: blocks reassemble to the byte-identical source")

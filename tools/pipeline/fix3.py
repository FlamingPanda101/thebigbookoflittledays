"""Five continuity fixes on months/. Literal replace, asserted count. No regex."""
import os

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
W = os.path.join(REPO, "months", "01-jan-w1.md")

EDITS = [
    # 1. Day 6 (Wed Jan 6) sent Brooklyn back on Sunday, but Day 7 (Thu Jan 7)
    #    is the block that actually checks the shelter.
    (W,
     "or a leaf inside for her to shelter, and come back on Sunday to see whether the",
     "or a leaf inside for her to shelter, and come back tomorrow to see whether the"),

    # 2. The flattened box is Day 1 (Friday Jan 1). Saturday is Day 2, where
    #    Kreston gets a small furniture box instead.
    (W,
     "> in the far corner with the flattened box he liked on Saturday. Once the",
     "> in the far corner with the flattened box he liked on Friday. Once the"),

    # 3. Day 4 promises a stone-stack check tomorrow; Day 5's walk never did it.
    (W,
     "Keep it short and brisk today, because the oven is on. Look for frost on car",
     "Keep it short and brisk today, because the oven is on. Go past yesterday's\n"
     "stone stack first and see whether it survived. Look for frost on car"),

    # 4. Shopping list promises everything both main events call for. The craft
    #    knife (Day 2, adult-only) and crayons (Days 2 and 7) were missing.
    (W,
     "- [ ] A permanent marker\n- [ ] A pencil and a measuring tape",
     "- [ ] A permanent marker\n- [ ] A craft knife or heavy scissors (adult only)\n"
     "- [ ] Crayons\n- [ ] A pencil and a measuring tape"),

    # 5. "Tuesdays" meant "an ordinary day", but the only Tuesday this week is
    #    Day 5, the heaviest day in the book. Drop the weekday, keep the point.
    (W,
     "> Skip what doesn't fit, cross things out. The days you ignore the page\n"
     "> altogether are Tuesdays. I know exactly how long these hours are, and I know\n"
     "> I am not the one in them.",
     "> Skip what doesn't fit, cross things out. Some days you will not open it at\n"
     "> all, and those days count too. I know exactly how long these hours are, and\n"
     "> I know I am not the one in them."),
]

for path, old, new in EDITS:
    txt = open(path, encoding="utf-8").read()
    n = txt.count(old)
    assert n == 1, f"expected 1 match, found {n} for: {old[:60]!r}"
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(txt.replace(old, new))
    print(f"ok: {old[:58]!r}")

txt = open(W, encoding="utf-8").read()
lines = txt.split("\n")
days = sum(1 for ln in lines if ln.startswith("## 🌟 Day "))
assert days == 7, f"day count moved to {days}, aborting"
print(f"\nday count {days}, lines {len(lines)}")
for probe in ("come back on Sunday", "liked on Saturday", "are Tuesdays"):
    assert probe not in txt, f"still present: {probe}"
for probe in ("come back tomorrow", "liked on Friday", "stone stack first",
              "Crayons", "craft knife or heavy scissors (adult only)",
              "those days count too"):
    assert probe in txt, f"missing: {probe}"
print("all five fixes verified present, old text gone")

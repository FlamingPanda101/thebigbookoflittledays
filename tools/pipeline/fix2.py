"""Two editorial restorations. Literal string replace, asserted count. No regex."""
import os

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "rewritten")

EDITS = [
    # Day 3: the fix pass swapped out substantive advice that had no slop in it.
    # Day 6 now carries "count to five" once (in its insight), so restoring the
    # original Tip makes it a technique planted here and explained on Day 6.
    ("day3.md",
     "> 💡 **Tip:** She will look at you the second the card sags. Look back at "
     "the bridge instead of at her, and she starts again on her own most of the "
     "time.",
     "> 💡 **Tip:** When she gets stuck, count to five in your head before you "
     "help. Most of the time she starts again on her own inside those five "
     "seconds, and the fix she finds is worth more than yours."),

    # Day 4: the fix pass dropped the sibling parallel along with the invented
    # clipboard. Restore the parallel, keep the prop honest (materials list says
    # "Paper and a marker for recording").
    ("day4.md",
     "> without tiring of it. Keep his cups separate from hers so nothing chewed\n"
     "> goes back in the build box.",
     "> without tiring of it, the same experiment Azlyn is running with three\n"
     "> towers and a sheet of paper. Keep his cups separate from hers so nothing\n"
     "> chewed goes back in the build box."),
]

for fname, old, new in EDITS:
    p = os.path.join(D, fname)
    txt = open(p, encoding="utf-8").read()
    n = txt.count(old)
    assert n == 1, f"{fname}: expected 1 match, found {n} - refusing to edit"
    with open(p, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(txt.replace(old, new))
    print(f"{fname}: replaced 1 occurrence")

# confirm the callback now reads once per block, not twice in one
for f in ("day3.md", "day6.md"):
    t = open(os.path.join(D, f), encoding="utf-8").read().lower()
    print(f"{f}: 'count to five' x{t.count('count to five')}")
print("day4 Azlyn mentions:",
      open(os.path.join(D, "day4.md"), encoding="utf-8").read().count("Azlyn"))

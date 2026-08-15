"""March: the two mandatory fixes. Literal replace, asserted counts."""
import os

N = os.path.join(os.path.dirname(os.path.abspath(__file__)), "newweeks")

EDITS = [
    # CRITICAL, Day 75. Safety says bare skin comes off the block after the
    # first MINUTE; step 1 prescribed two minutes of bare-handed contact.
    # Aligning to the step is the cheaper edit and keeps the absolute strong.
    ("wk11-days.md",
     "1. Set the tray on the towel on the floor and hand her nothing for the first two minutes. Hands, breath, banging.",
     "1. Set the tray on the towel on the floor and hand her nothing for the first minute. Hands, breath, banging."),

    # Day 75. My own Wh- fix read stiff and implied several authors. Joseph
    # wrote the plan, and the wry first-person aside is the book's register.
    ("wk11-days.md",
     "> from the adult running it. Nobody who wrote the plan had been up twice in",
     "> from the adult running it. I wrote the plan on a full night of sleep, in"),

    # Day 64. Steps 1 and 2 both cut card, no scissors listed, and Safety
    # never answers the cutting hazard. Days 66, 68 and 69 all list scissors
    # and close Safety with "The scissors stay with you."
    ("wk10-days.md",
     "- 1 cereal box or 2 sheets thick card\n"
     "- Black paper, or a black crayon (paint works)",
     "- 1 cereal box or 2 sheets thick card\n"
     "- 1 pair of scissors (adult only)\n"
     "- Black paper, or a black crayon (paint works)"),
]

for fname, old, new in EDITS:
    p = os.path.join(N, fname)
    txt = open(p, encoding="utf-8").read()
    c = txt.count(old)
    assert c == 1, f"{fname}: {c} matches for {old[:60]!r}"
    open(p, "w", encoding="utf-8", newline="\n").write(txt.replace(old, new))
    print(f"{fname}: {old[:56]!r}")

# Day 75 insight tail has to follow on from the new opening clause
p = os.path.join(N, "wk11-days.md")
txt = open(p, encoding="utf-8").read()
old_tail = "> the night."
assert txt.count(old_tail) == 1, f"{txt.count(old_tail)} matches for tail"
txt = txt.replace(old_tail, "> which it shows.")
open(p, "w", encoding="utf-8", newline="\n").write(txt)
print("wk11-days.md: insight tail rejoined")

# Day 64 Safety must now answer the cutting hazard
old_s = ("> String at his height is a strangulation risk, so take the flag line down")
txt = open(p := os.path.join(N, "wk10-days.md"), encoding="utf-8").read()
assert txt.count(old_s) == 1
txt = txt.replace(old_s, old_s.replace(
    "String at his height", "The scissors stay with you. String at his height"))
open(p, "w", encoding="utf-8", newline="\n").write(txt)
print("wk10-days.md: Safety now answers the cutting hazard")

w11 = open(os.path.join(N, "wk11-days.md"), encoding="utf-8").read()
assert "first two minutes" not in w11 and "Nobody who wrote" not in w11
w10 = open(os.path.join(N, "wk10-days.md"), encoding="utf-8").read()
assert "1 pair of scissors (adult only)" in w10
assert "The scissors stay with you." in w10
print("\nall verified")

"""Final February repairs. Literal replace, asserted counts."""
import os

N = os.path.join(os.path.dirname(os.path.abspath(__file__)), "newweeks")

EDITS = [
    # --- SAFETY. Day 54 step 3 hands Azlyn "her own scissors" but the
    # materials list carried only adult-only ones. Day 51 already splits the
    # two correctly; match it.
    ("wk08-days.md",
     "- Scissors (adult only)",
     "- 1 pair of child-safe scissors, for the straws\n"
     "- 1 pair of adult scissors (adult only), for the string"),

    # --- Day 53: newspaper is used in step 4 and the Tip, but was missing
    # from the materials list, so the 8am reader gathering kit misses it.
    ("wk08-days.md",
     "- 1 kitchen sponge cut in half",
     "- 1 kitchen sponge cut in half\n- Newspaper, a stack"),

    # --- Day 56: the Safety block and Kreston note both depend on a pegged
    # string, but no step ever hangs it.
    ("wk08-days.md",
     "2. Start at her eye level and build upward. The bottom row is hers to hang and reach, the top row is yours off the chair.",
     "2. Start at her eye level and build upward, taping the low ones and pegging the high row to the string. The bottom row is hers to hang and reach, the top row is yours off the chair."),

    # --- Day 44: my own suggested fix still carried the X-not-Y contrast it
    # was meant to remove. State it positively.
    ("wk07-days.md",
     "arrives before any of that hardens. She is doing a Danish thing, not\n"
     "> learning about Denmark, and at three that is the version that sticks. The",
     "arrives before any of that hardens. She is doing a Danish thing with her\n"
     "> own hands, and at three the doing is the version that sticks. The"),

    # --- Day 44: "a bread" is not English
    ("wk07-days.md",
     "hidden by her. Keep them small and keep them practical, a letter, a bread,",
     "hidden by her. Keep them small and keep them practical, a letter, a loaf,"),

    # --- Day 36: dropped article at a cut seam
    ("wk06-days.md",
     "> 👶 **Kreston's Afternoon:** Kreston gets soft roll with the crust off, torn",
     "> 👶 **Kreston's Afternoon:** Kreston gets a soft roll with the crust off, torn"),
]

for fname, old, new in EDITS:
    p = os.path.join(N, fname)
    txt = open(p, encoding="utf-8").read()
    c = txt.count(old)
    assert c == 1, f"{fname}: {c} matches for {old[:60]!r}"
    open(p, "w", encoding="utf-8", newline="\n").write(txt.replace(old, new))
    print(f"{fname}: {old[:56]!r}")

# assertions
w8 = open(os.path.join(N, "wk08-days.md"), encoding="utf-8").read()
assert "child-safe scissors, for the straws" in w8
assert "Newspaper, a stack" in w8
assert "pegging the high row to the string" in w8
w7 = open(os.path.join(N, "wk07-days.md"), encoding="utf-8").read()
assert "a bread" not in w7 and "Danish thing, not" not in w7
w6 = open(os.path.join(N, "wk06-days.md"), encoding="utf-8").read()
assert "gets a soft roll" in w6
print("\nall six repairs verified")

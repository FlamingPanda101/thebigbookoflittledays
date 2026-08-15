"""Repair damage left at trim cut-seams. Literal replace, asserted count."""
import os

N = os.path.join(os.path.dirname(os.path.abspath(__file__)), "newweeks")

EDITS = [
    # D25: verb agreement broken where a cut landed mid-sentence
    ("wk04-days.md",
     "> workout she volunteered for. Eight objects sits above her",
     "> workout she volunteered for. Eight objects sit above her"),

    # D35: the trim removed the placement, leaving "where" with nothing to
    # refer to
    ("wk05-days.md",
     "> on your lap for ten minutes. Hold a big leaf where he",
     "> on your lap for ten minutes. Hold a big leaf out to one side, where he"),

    # D32: reads truncated against the rhythm around it
    ("wk05-days.md",
     "Walk the shaded side of the street and read what has been across\n"
     "it: a cat's prints along a wall,",
     "Walk the shaded side of the street and read what crossed it in the\n"
     "night: a cat's prints along a wall,"),

    # D12: two adverbs
    ("wk02-days.md",
     "- A room that goes properly dark",
     "- A room that goes dark with the door shut"),
    ("wk02-days.md",
     "where the birds go at night, take her answer seriously, then go and look at the",
     "where the birds go at night, take her answer at face value, then go and look at the"),

    # D10: quantity missing, unlike every other entry in the same list
    ("wk02-days.md",
     "- Card and a marker for picture labels",
     "- 1 sheet of card and 1 marker for picture labels"),
]

for fname, old, new in EDITS:
    p = os.path.join(N, fname)
    txt = open(p, encoding="utf-8").read()
    c = txt.count(old)
    assert c == 1, f"{fname}: {c} matches for {old[:50]!r}"
    with open(p, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(txt.replace(old, new))
    print(f"{fname}: fixed {old[:52]!r}")

for f in ("wk02-days.md", "wk04-days.md", "wk05-days.md"):
    t = open(os.path.join(N, f), encoding="utf-8").read()
    for bad in ("objects sits", "properly dark", "answer seriously"):
        assert bad not in t, f"{f}: {bad!r} survived"
print("\nall seam repairs verified")

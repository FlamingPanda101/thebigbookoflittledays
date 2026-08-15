"""Clean four hidden-actor passive headlines at source, and in week 7 which
already used one. Literal replace, asserted counts.
"""
import os

SP = os.path.dirname(os.path.abspath(__file__))
REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
POOL = os.path.join(REPO, "tools", "insight-pool.md")

# only the "X is <verb>ed by <gerund>" shape, where the actor disappears.
# the other 20 passive-ish headlines read naturally and are left alone.
SUBS = {
    "Persistence is built by seeing the finish line.":
        "Seeing the finish line is what builds persistence.",
    "Balance is trained by being slightly off it.":
        "Balance comes from being slightly off it.",
    "Caring about a place is learned by improving it, not by being told to.":
        "Children learn to care about a place by improving it.",
    "Shapes are learned by making the edges, not by naming them.":
        "Making the edges teaches shapes faster than naming them.",
}

txt = open(POOL, encoding="utf-8").read()
for old, new in SUBS.items():
    assert txt.count(old) == 1, f"pool: {txt.count(old)} matches for {old!r}"
    txt = txt.replace(old, new)
open(POOL, "w", encoding="utf-8", newline="\n").write(txt)
print(f"tools/insight-pool.md: cleaned {len(SUBS)} passive headlines")

# week 7 already used the first one, in both the day and the opener bullet
old = "Persistence is built by seeing the finish line."
new = SUBS[old]
total = 0
for suffix in ("days", "opener"):
    p = os.path.join(SP, "newweeks", f"wk07-{suffix}.md")
    t = open(p, encoding="utf-8").read()
    for o, n in ((old, new), (old.rstrip("."), new.rstrip("."))):
        if o in t:
            total += t.count(o)
            t = t.replace(o, n)
            break
    open(p, "w", encoding="utf-8", newline="\n").write(t)
assert total >= 2, f"wk07: only {total} replacement(s)"
print(f"wk07: {total} replacement(s) in day + opener")

for suffix in ("days", "opener"):
    t = open(os.path.join(SP, "newweeks", f"wk07-{suffix}.md"),
             encoding="utf-8").read()
    assert "Persistence is built by" not in t
print("verified: passive headline gone from week 7")

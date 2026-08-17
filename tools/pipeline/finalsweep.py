"""Final locale sweep. Phrase-level, so ambiguous words convert only in the
British sense and stay put in the American one.

"post office", "botanical garden", "garden center" and "Garden Discovery" are
correct US English and must survive. So must "fence posts" and "gate posts".
"""
import glob
import os
import re
import sys

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
CHECK = "--check" in sys.argv

# whole phrases, applied before any word-level pass, longest first
PHRASES = [
    # soft play is a British name for a commercial padded play area. The
    # rotation also has "indoor play center" as a SEPARATE option, so these
    # must not collapse into one name.
    ("Soft play (quiet session)", "Indoor playground (quiet session)"),
    ("soft play (quiet session)", "indoor playground (quiet session)"),
    ("Soft play", "Indoor playground"),
    ("soft play", "indoor playground"),
    # the mail sense of post. "post office" and "fence posts" stay.
    ("Post a letter", "Mail a letter"),
    ("Post a piece", "Mail a piece"),
    ("Post the", "Mail the"),
    ("post one piece", "mail one piece"),
    ("to post something", "to mail something"),
    ("going in the post", "going in the mail"),
    ("in the post", "in the mail"),
    # kitchen and street
    ("stock cubes", "bouillon cubes"),
    ("stock cube", "bouillon cube"),
    ("the school gates", "the school pickup line"),
    ("school gates", "school pickup"),
    ("Bannister", "Banister"),
    ("bannister", "banister"),
    ("Sledge", "Sled"),
    ("sledge", "sled"),
    ("half four", "four thirty"),
    ("half three", "three thirty"),
    ("half five", "five thirty"),
    # garden meaning yard. botanical garden, garden center and the week theme
    # "Garden Discovery" are all correct US and are excluded by being longer
    # phrases that do not contain these exact strings.
    ("into the garden", "into the yard"),
    ("in the garden", "in the yard"),
    ("from the garden", "from the yard"),
    ("the garden fence", "the yard fence"),
    ("across the garden", "across the yard"),
    ("round the garden", "around the yard"),
    ("the garden gate", "the yard gate"),
    ("out to the garden", "out to the yard"),
]

GUARD = ["post office", "botanical garden", "garden center", "Garden Discovery",
         "fence posts", "gate posts", "garden centre"]

files = sorted(glob.glob(os.path.join(REPO, "months", "*.md")))
tally, changed = {}, 0

for f in files:
    text = open(f, encoding="utf-8").read()
    before_days = text.count("## 🌟 Day ")
    guard_counts = {g: text.count(g) for g in GUARD}

    # protect the guarded phrases behind placeholders first: "in the garden"
    # otherwise matches inside "in the garden center" and yields "yard center"
    new = text
    for i, g in enumerate(GUARD):
        new = new.replace(g, f"\x00GUARD{i}\x00")

    for a, b in PHRASES:
        if a in new:
            tally[a] = tally.get(a, 0) + new.count(a)
            new = new.replace(a, b)

    for i, g in enumerate(GUARD):
        new = new.replace(f"\x00GUARD{i}\x00", g)

    assert new.count("## 🌟 Day ") == before_days, f"{f}: day count moved"
    for g, c in guard_counts.items():
        assert new.count(g) == c, f"{f}: guarded phrase {g!r} was damaged"

    if new != text and not CHECK:
        with open(f, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(new)
        changed += 1

print(f"{'WOULD CHANGE' if CHECK else 'CHANGED'} {changed} file(s)")
print(f"{sum(tally.values())} replacements\n")
for a, c in sorted(tally.items(), key=lambda x: -x[1]):
    nxt = dict(PHRASES)[a]
    print(f"  {c:>4}  {a!r} -> {nxt!r}")

print("\nguarded and untouched: " + ", ".join(GUARD))

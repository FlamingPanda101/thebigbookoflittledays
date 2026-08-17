"""Scan the shipped book against the full stop-slop ruleset. Read-only.

Reports every category from the skill, not just the ones the gate enforces.
"""
import glob
import os
import re
from collections import Counter

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"

lines = []
for f in sorted(glob.glob(os.path.join(REPO, "months", "*.md"))):
    lines.extend(open(f, encoding="utf-8").read().split("\n"))

# prose only: drop schedule rows, headings, checkbox list items, TOC rows
prose = [x for x in lines
         if not x.startswith("- **") and not x.startswith("###")
         and not x.startswith("- [") and not x.startswith("## ")
         and not x.startswith("<") and not x.startswith("**")]
blob = "\n".join(prose)
words = len(blob.split())

CHECKS = [
    ("em dashes in prose", r"—"),
    ("adverbs (really/just/literally/genuinely/honestly/simply/actually)",
     r"\b(really|just|literally|genuinely|honestly|simply|actually|deeply|"
     r"truly|fundamentally|inherently|inevitably|interestingly|importantly|"
     r"crucially)\b"),
    ("throat-clearing openers",
     r"(here's (the thing|what|why|how|this|that)|the truth is|it turns out|"
     r"let me be (clear|honest)|can we talk about|the real \w+ is)"),
    ("emphasis crutches",
     r"(full stop\.|let that sink in|this matters because|make no mistake|"
     r"here's why that matters)"),
    ("filler phrases",
     r"(at its core|it's worth noting|at the end of the day|when it comes to|"
     r"in a world where|the reality is)"),
    ("binary contrasts (not X, it's Y)",
     r"(isn't the problem|is not the problem|the answer isn't|"
     r"the question isn't|it's not \w+, it's|not \w+\. it's |"
     r"stops being \w+ and starts|not just \w+ but also)"),
    ("meta-commentary", r"(plot twist|spoiler:|hint:|you already know this)"),
    ("rhetorical setups",
     r"(what if [a-z]|here's what i mean|think about it:|and that's okay)"),
    ("business jargon",
     r"\b(navigate the|unpack the|lean into|game-changer|double down|"
     r"deep dive|circle back|moving forward|on the same page)\b"),
    ("vague declaratives",
     r"(the reasons are structural|the implications are|the stakes are high|"
     r"the consequences are real)"),
]

print(f"scanned {len(lines)} lines, {words:,} words of prose "
      f"across {len(glob.glob(os.path.join(REPO, 'months', '*.md')))} files\n")

total = 0
for name, pat in CHECKS:
    hits = re.findall(pat, blob, re.I)
    total += len(hits)
    mark = "  " if not hits else "<-"
    print(f"{mark} {len(hits):>4}  {name}")
    if hits:
        for h, c in Counter(
                [h if isinstance(h, str) else h[0] for h in hits]
        ).most_common(5):
            print(f"          {c:>3}x {h!r}")

# rhythm: three consecutive sentences of near-equal length is the tell
paras, cur = [], []
for x in prose:
    if x.strip():
        cur.append(x)
    elif cur:
        paras.append(" ".join(cur))
        cur = []
runs = 0
for p in paras:
    sents = [s for s in re.split(r"(?<=[.!?]) ", p) if len(s.split()) > 2]
    for i in range(len(sents) - 2):
        a, b, c = (len(s.split()) for s in sents[i:i + 3])
        if abs(a - b) <= 1 and abs(b - c) <= 1:
            runs += 1
print(f"\n   {runs:>4}  paragraphs with 3 consecutive same-length sentences")

print(f"\nTOTAL RULESET HITS: {total}")

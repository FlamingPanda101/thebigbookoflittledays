"""Scan the cleaned pool for passive-voice headlines.

A verifier flagged 'Persistence is built by seeing the finish line.' as the one
passive construction in a headline slot. If there are more, clean them at
source now rather than catching them one month at a time.
"""
import os
import re

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"

# "is/are/was/were/gets/get <past participle>" and by-agent phrasing
PASSIVE = re.compile(
    r"\b(is|are|was|were|gets|get|be|been|being)\s+"
    r"(\w+ed|built|made|taught|told|given|shown|held|kept|drawn|known|seen|"
    r"heard|felt|found|lost|won|learnt|learned|caught|brought|thought|meant|"
    r"sent|left|put|set|read|spent|understood|written)\b", re.I)

pool = []
for ln in open(os.path.join(REPO, "tools", "insight-pool.md"), encoding="utf-8"):
    m = re.match(r"^- \*\*\d+\.\*\* (.+)$", ln.strip())
    if m:
        pool.append(m.group(1).strip())

hits = [h for h in pool if PASSIVE.search(h)]
print(f"pool: {len(pool)} headlines")
print(f"passive candidates: {len(hits)}\n")
for h in hits:
    print("   ", h)

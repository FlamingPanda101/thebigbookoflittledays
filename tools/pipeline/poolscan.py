"""Scan the v1 insight pool for style violations before they get allocated."""
import os
import re

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"

ADV = re.compile(r"\b(really|just|literally|genuinely|honestly|simply|actually|"
                 r"deeply|truly|fundamentally|inherently|inevitably|"
                 r"interestingly|importantly|crucially)\b", re.I)

pool, seen = [], set()
with open(os.path.join(REPO, "tools", "v1-insights.md"), encoding="utf-8") as fh:
    for ln in fh:
        m = re.match(r"^- \*\*\d+\.\*\* (.+)$", ln.strip())
        if not m:
            continue
        h = m.group(1).strip()
        k = h.lower().rstrip(".")
        if k in seen:
            continue
        seen.add(k)
        pool.append(h)

em = [h for h in pool if "—" in h]
adv = [h for h in pool if ADV.search(h)]
contrast = [h for h in pool if re.search(
    r"\b(isn't|is not|aren't|are not|not just)\b.{0,40}\b(it's|it is|but)\b", h, re.I)]

print(f"pool: {len(pool)} unique headlines\n")
print(f"em dashes:  {len(em)}")
for h in em:
    print("   ", h)
print(f"\nadverbs:    {len(adv)}")
for h in adv:
    print("   ", h)
print(f"\ncontrasts:  {len(contrast)}")
for h in contrast:
    print("   ", h)

flagged = {h for h in em + adv + contrast}
print(f"\n{len(flagged)} of {len(pool)} headlines need cleaning "
      f"({len(flagged) / len(pool) * 100:.1f}%)")
print(f"{len(pool) - len(flagged)} are already clean")

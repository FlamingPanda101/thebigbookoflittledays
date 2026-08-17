"""List the lines slopscan counts as prose em dashes, with their file."""
import glob
import os

for f in sorted(glob.glob("months/*.md")):
    for i, x in enumerate(open(f, encoding="utf-8").read().split("\n"), 1):
        if "—" not in x:
            continue
        if (x.startswith("- **") or x.startswith("###") or x.startswith("- [")
                or x.startswith("## ") or x.startswith("<") or x.startswith("**")):
            continue
        print(f"{os.path.basename(f)}:{i}")
        print(f"    {x.strip()[:96]}")

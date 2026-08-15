"""Clean three v1-era insight headlines before they get logged as titles.

Each must change in BOTH the day file and the opener's What You'll Learn
bullet, or the opener/day match check fails. Literal replace, asserted count.
"""
import os

N = os.path.join(os.path.dirname(os.path.abspath(__file__)), "newweeks")

# (week, old headline, new headline) - v1 wrote these before stop-slop existed
SUBS = [
    (4, "Working memory is the thing she's actually building.",
        "Working memory is the thing she is building."),
    (5, "Patterns are the beginning of algebra, genuinely.",
        "Patterns are the beginning of algebra."),
    (5, "Evidence and inference — a genuinely big idea, learnable at three.",
        "Evidence and inference, a big idea learnable at three."),
]

for wk, old, new in SUBS:
    total = 0
    for suffix in ("days", "opener"):
        p = os.path.join(N, f"wk{wk:02d}-{suffix}.md")
        txt = open(p, encoding="utf-8").read()
        # the opener bullet drops the trailing full stop
        for o, n in ((old, new), (old.rstrip("."), new.rstrip("."))):
            if o in txt:
                c = txt.count(o)
                txt = txt.replace(o, n)
                total += c
                break
        with open(p, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(txt)
    assert total >= 2, f"wk{wk}: only {total} replacement(s) for {old!r}"
    print(f"wk{wk:02d}: {total} replacement(s) -> {new!r}")

for wk in (4, 5):
    for suffix in ("days", "opener"):
        t = open(os.path.join(N, f"wk{wk:02d}-{suffix}.md"),
                 encoding="utf-8").read()
        for bad in ("actually", "genuinely"):
            assert bad not in t, f"wk{wk}-{suffix}: {bad!r} still present"
print("\nheadlines cleaned in both day and opener files")

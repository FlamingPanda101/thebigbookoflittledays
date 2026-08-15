"""Check the reconstructed Out Again rotation against the spec's own table.

CONTINUATION.md section 5 is authoritative and also states the year totals:
Swimming 52, Library 26, Museum 12, nothing else above 11.
"""
import datetime as dt
import importlib.util
import os
import sys
from collections import Counter

SP = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location(
    "by", os.path.join(SP, "buildyear.py"))
# import without running the write step
src = open(os.path.join(SP, "buildyear.py"), encoding="utf-8").read()
head = src.split("# --- headlines already used anywhere")[0]
ns = {"__file__": os.path.join(SP, "buildyear.py")}
exec(compile(head, "buildyear-head", "exec"), ns)
out_again = ns["out_again"]

# the spec table, transcribed for weeks 2-18 (Fri Sat Sun Mon Tue Wed Thu)
TRUTH = {
    2:  ["Cafe (cake + people-watching)", "Bus ride (nowhere in particular)", "Feeding the ducks", "Neighbourhood park", "Swimming", "Soft play", "Hardware shop"],
    3:  ["Playgroup", "Farm", "Scooter / balance bike", "Woods loop", "Swimming", "Library", "Market"],
    4:  ["Meet a friend at the park", "Aquarium", "A playground you've never been to", "Green space + ball", "Swimming", "Indoor play centre", "Post office + errand"],
    5:  ["Grandparents / family visit", "Botanical garden", "Nature hunt walk", "Playground (the big slide one)", "Swimming", "Library", "Garden centre"],
    6:  ["Friend's house", "**MUSEUM**", "Sunset walk", "Field walk", "Swimming", "Church hall playgroup", "Charity shop"],
    7:  ["Cafe (cake + people-watching)", "Train ride", "Long walk with the pram", "Duck pond", "Swimming", "Library", "Bakery run"],
    8:  ["Playgroup", "Pet shop + garden centre", "Feeding the ducks", "Hill walk", "Swimming", "Soft play (quiet session)", "Pharmacy + park bench"],
    9:  ["Meet a friend at the park", "Fire station / tractor spotting", "Scooter / balance bike", "Riverside path", "Swimming", "Library", "Grocery shop"],
    10: ["Grandparents / family visit", "**MUSEUM**", "A playground you've never been to", "Neighbourhood park", "Swimming", "Soft play", "Hardware shop"],
    11: ["Friend's house", "Lakeshore", "Nature hunt walk", "Woods loop", "Swimming", "Library", "Market"],
    12: ["Cafe (cake + people-watching)", "Bus ride (nowhere in particular)", "Sunset walk", "Green space + ball", "Swimming", "Indoor play centre", "Post office + errand"],
    13: ["Playgroup", "Farm", "Long walk with the pram", "Playground (the big slide one)", "Swimming", "Library", "Garden centre"],
    14: ["Meet a friend at the park", "**MUSEUM**", "Feeding the ducks", "Field walk", "Swimming", "Church hall playgroup", "Charity shop"],
    15: ["Grandparents / family visit", "Aquarium", "Scooter / balance bike", "Duck pond", "Swimming", "Library", "Bakery run"],
    16: ["Friend's house", "Botanical garden", "A playground you've never been to", "Hill walk", "Swimming", "Soft play (quiet session)", "Pharmacy + park bench"],
    17: ["Cafe (cake + people-watching)", "Train ride", "Nature hunt walk", "Riverside path", "Swimming", "Library", "Grocery shop"],
    18: ["Playgroup", "**MUSEUM**", "Sunset walk", "Neighbourhood park", "Swimming", "Soft play", "Hardware shop"],
}

DAYNAME = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
bad = 0
for wk, row in sorted(TRUTH.items()):
    for i, want in enumerate(row):
        got = out_again(wk, i)
        if got != want:
            bad += 1
            print(f"  wk{wk:02d} {DAYNAME[i]}: got {got!r}, spec says {want!r}")
print(f"weeks 2-18 vs spec table: {'MATCH' if not bad else f'{bad} MISMATCH'}")

# weekday sanity, and the year totals the spec asserts
tally = Counter()
for wk in range(1, 53):
    d0 = 7 * wk - 6
    for i in range(7):
        d = dt.date(2027, 1, 1) + dt.timedelta(days=d0 - 1 + i)
        assert d.strftime("%a") == DAYNAME[i], f"wk{wk} offset {i} is {d:%a}"
        tally[out_again(wk, i)] += 1

print("\nyear totals:")
for k, c in tally.most_common(8):
    print(f"  {c:>3}  {k}")
print("\nspec asserts: Swimming 52, Library 26, Museum 12, "
      "no other destination above 11")
ok = (tally["Swimming"] == 52 and tally["Library"] == 26
      and tally["**MUSEUM**"] == 12
      and max(c for k, c in tally.items()
              if k not in ("Swimming", "Library", "**MUSEUM**")) <= 11)
print("totals:", "MATCH" if ok else "MISMATCH")
sys.exit(0 if (not bad and ok) else 1)

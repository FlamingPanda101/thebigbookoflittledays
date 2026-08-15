"""Generate one brief per week for weeks 2-18. Dates computed, not trusted."""
import datetime as dt
import json
import os
import re

SP = os.path.dirname(os.path.abspath(__file__))
REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
OUT = os.path.join(SP, "weeks")
os.makedirs(OUT, exist_ok=True)

# week -> (theme, around-the-world sidebar)
THEMES = {
    2:  ("Nursery Rhymes & Rhythm 🎶", "Lullabies Everywhere"),
    3:  ("Kindness & Community 💛", "Southern Africa: *Ubuntu*"),
    4:  ("Puzzles & Problem Solving 🧩", "China: The Tangram"),
    5:  ("Forest Friends 🌲", "Japan: *Shinrin-yoku* (Forest Bathing)"),
    6:  ("Little Bakery 🥐", "Bread Everywhere"),
    7:  ("Love & Friendship 💌", "Wales: Love Spoons"),
    8:  ("Art Masters Studio 🎨", "Mexico: *Alebrijes*"),
    9:  ("My Body & Senses 🖐️", "Hello Everywhere"),
    10: ("Circus Adventures 🎪", "China: Acrobatics"),
    11: ("St. Patrick's Day & Springtime Beginnings 🍀", "Ireland: Soda Bread"),
    12: ("Baby Animals & New Beginnings 🐣", "Spring New Years"),
    13: ("Easter & April Fools' Fun 🐰", "Easter Eggs Everywhere"),
    14: ("Egg-cellent Science 🥚", "Japan: *Tamagoyaki*"),
    15: ("Garden Discovery 🌱", "The Three Sisters (Indigenous North America)"),
    16: ("Earth Day & Wildlife 🌎", "Kenya: Wangari Maathai"),
    17: ("Recycling & Earth Care ♻️", "Japan: *Mottainai* and *Furoshiki*"),
    18: ("Bugs & Blooms 🌷", "Bugs Everywhere"),
}

# Out Again anchor by week, in Fri Sat Sun Mon Tue Wed Thu order (spec section 5)
OUT_AGAIN = {
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

HOLIDAYS = {
    18:  ("Martin Luther King Jr. Day", "bonus note"),
    33:  ("Groundhog Day", "bonus note"),
    45:  ("💗 Valentine's Day", "FULL DAY"),
    46:  ("Presidents' Day", "bonus note"),
    76:  ("☘️ St Patrick's Day", "FULL DAY"),
    79:  ("Spring equinox", "bonus note"),
    85:  ("Good Friday", "bonus note"),
    87:  ("🐣 Easter Sunday", "FULL DAY"),
    112: ("🌍 Earth Day", "FULL DAY"),
}

BOOKLET = {}
for w in range(1, 6):    BOOKLET[w] = "January"
for w in range(6, 10):   BOOKLET[w] = "February"
for w in range(10, 14):  BOOKLET[w] = "March"
for w in range(14, 19):  BOOKLET[w] = "April"


def kreston(day):
    for start, age, note in [
        (125, 11, "Stands alone briefly, first words possible"),
        (95, 10, "Cruises furniture, points, understands \"no\""),
        (64, 9, "Pulls to stand, pincer grip, waves"),
        (36, 8, "Crawls or shuffles, stranger wariness, bangs two things together"),
        (5, 7, "Reaches across midline, transfers hand to hand, babbles in strings"),
    ]:
        if day >= start:
            return age, note
    return 6, "Sits with hands free, mouths everything"


# insight pool, minus the seven already used in week 1
used = set()
with open(os.path.join(REPO, "tools", "titles.tsv"), encoding="utf-8") as fh:
    for ln in fh.read().splitlines()[1:]:
        p = ln.split("\t")
        if len(p) == 3 and p[0] == "insight":
            used.add(p[2].strip().lower().rstrip("."))

pool, seen = [], set()
with open(os.path.join(REPO, "tools", "v1-insights.md"), encoding="utf-8") as fh:
    for ln in fh:
        m = re.match(r"^- \*\*\d+\.\*\* (.+)$", ln.strip())
        if not m:
            continue
        h = m.group(1).strip()
        k = h.lower().rstrip(".")
        if k in seen or k in used:
            continue
        seen.add(k)
        pool.append(h)

print(f"insight pool available: {len(pool)} (used already: {len(used)})")

cursor = 0
for wk in range(2, 19):
    d0, d1 = 7 * wk - 6, 7 * wk
    days = []
    for n in range(d0, d1 + 1):
        date = dt.date(2027, 1, 1) + dt.timedelta(days=n - 1)
        assert date.timetuple().tm_yday == n
        age, cap = kreston(n)
        hol = HOLIDAYS.get(n)
        days.append({
            "day": n,
            "weekday": date.strftime("%A"),
            "month": date.strftime("%B"),
            "date_num": date.day,
            "header_date": f"**📅 {date.strftime('%A')}, {date.strftime('%B')} {date.day}, 2027**",
            "kreston_months": age,
            "kreston_capability": cap,
            "out_again_anchor": OUT_AGAIN[wk][n - d0],
            "holiday": hol[0] if hol else None,
            "holiday_treatment": hol[1] if hol else None,
        })
    theme, sidebar = THEMES[wk]
    brief = {
        "week": wk,
        "booklet": BOOKLET[wk],
        "days": [d0, d1],
        "theme": theme,
        "sidebar": sidebar,
        "date_range": f"{days[0]['month']} {days[0]['date_num']} – "
                      f"{days[-1]['month']} {days[-1]['date_num']}, 2027",
        "insight_headlines": pool[cursor:cursor + 7],
        "day_specs": days,
    }
    cursor += 7
    with open(os.path.join(OUT, f"wk{wk:02d}.json"), "w", encoding="utf-8") as fh:
        json.dump(brief, fh, ensure_ascii=False, indent=2)
    hols = [f"D{d['day']} {d['holiday']}" for d in days if d["holiday"]]
    print(f"wk{wk:02d} {BOOKLET[wk][:3]} days {d0:>3}-{d1:>3} "
          f"{days[0]['weekday'][:3]}..{days[-1]['weekday'][:3]}  "
          f"K{days[0]['kreston_months']}mo  {theme[:34]:<34} "
          f"{'; '.join(hols) if hols else ''}")

print(f"\nallocated {cursor} insight headlines, {len(pool) - cursor} left in pool")

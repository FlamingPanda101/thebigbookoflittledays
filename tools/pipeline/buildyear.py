"""Build week briefs for the whole year. Dates computed, headlines allocated
from the CLEAN pool, excluding anything already used in months/ or newweeks/.
"""
import datetime as dt
import glob
import json
import os
import re

SP = os.path.dirname(os.path.abspath(__file__))
REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
OUT = os.path.join(SP, "weeks")
os.makedirs(OUT, exist_ok=True)

THEMES = {
    2: ("Nursery Rhymes & Rhythm 🎶", "Lullabies Everywhere"),
    3: ("Kindness & Community 💛", "Southern Africa: *Ubuntu*"),
    4: ("Puzzles & Problem Solving 🧩", "China: The Tangram"),
    5: ("Forest Friends 🌲", "Japan: *Shinrin-yoku* (Forest Bathing)"),
    6: ("Little Bakery 🥐", "Bread Everywhere"),
    7: ("Love & Friendship 💌", "Wales: Love Spoons"),
    8: ("Art Masters Studio 🎨", "Mexico: *Alebrijes*"),
    9: ("My Body & Senses 🖐️", "Hello Everywhere"),
    10: ("Circus Adventures 🎪", "China: Acrobatics"),
    11: ("St. Patrick's Day & Springtime Beginnings 🍀", "Ireland: Soda Bread"),
    12: ("Baby Animals & New Beginnings 🐣", "Spring New Years"),
    13: ("Easter & April Fools' Fun 🐰", "Easter Eggs Everywhere"),
    14: ("Egg-cellent Science 🥚", "Japan: *Tamagoyaki*"),
    15: ("Garden Discovery 🌱", "The Three Sisters (Indigenous North America)"),
    16: ("Earth Day & Wildlife 🌎", "Kenya: Wangari Maathai"),
    17: ("Recycling & Earth Care ♻️", "Japan: *Mottainai* and *Furoshiki*"),
    18: ("Bugs & Blooms 🌷", "Bugs Everywhere"),
    19: ("Mother's Day & Family Love 💐", "Mother's Day Everywhere"),
    20: ("Backyard Science Lab 🔬", "China: The First Kites"),
    21: ("Superheroes & Helpers 🦸", "West Africa & the Caribbean: Anansi"),
    22: ("Memorial Day & Community Heroes 🎖️", "Remembering, Everywhere"),
    23: ("Colors of Summer ☀️", "Colors Mean Different Things"),
    24: ("Water Safety & Swimming Fun 🏊", "The Netherlands: The Swimming Diploma"),
    25: ("Juneteenth & Father's Day 🕊️", "Freedom Days Everywhere"),
    26: ("Red, White & Blue Countdown 🎇", "Independence Days Everywhere"),
    27: ("Independence Day Celebration 🎆", "NEEDS WRITING"),
    28: ("Beach & Water Fun 🏖️", "Australia: Swim Between the Flags"),
    29: ("Ice Cream & Summer Treats 🍦", "Frozen Treats Everywhere"),
    30: ("Under the Sea 🌊", "Pacific Wayfinding"),
    31: ("Camping Adventures ⛺", "Norway: *Allemannsretten*"),
    32: ("Sports & Team Play ⚽", "The World's Game"),
    33: ("Pretend Passport World Adventure 🌍", "NEEDS WRITING"),
    34: ("Backyard Carnival 🎡", "Festivals & Fairs Everywhere"),
    35: ("Music & Movement 🎵", "Rhythms of the World"),
    36: ("Community Helpers 🚚", "Feeding the Workers Everywhere"),
    37: ("Backyard Explorers 🔍", "Australia: Bush Tucker"),
    38: ("Colors & Shapes Studio 🎨", "Morocco: *Zellij* Tilework"),
    39: ("Letters & Sounds 🔤", "Korea: *Hangul*"),
    40: ("Numbers & Counting 🔢", "Counting on Your Hands, Everywhere"),
    41: ("Things That Go 🚂", "Vehicles Everywhere"),
    42: ("Space Explorers 🚀", "The Pictures People See in the Sky"),
    43: ("Insects & Minibeasts 🐛", "Eating Insects, Everywhere"),
    44: ("Dinosaur Discovery 🦕", "Dinosaurs Everywhere"),
    45: ("On the Farm 🚜", "Milk, Everywhere"),
    46: ("Weather & Rainbows 🌦️", "Rain, Everywhere"),
    47: ("Seasons & Nature Cycles 🍂", "Harvest, Everywhere"),
    48: ("Kitchen Helpers 👩‍🍳", "Noodles, Everywhere"),
    49: ("Storybook Village 📖", "Storytellers, Everywhere"),
    50: ("Animal Kingdom 🦉", "Feeding the Birds at Midwinter"),
    51: ("Water & Weather Wonders 💧", "Light in the Darkest Week"),
    52: ("Reflection & Winter Holidays 🎄", "NEEDS WRITING"),
}

# Out Again anchors, Fri Sat Sun Mon Tue Wed Thu, from spec section 5
_F = ["Friend's house", "Cafe (cake + people-watching)", "Playgroup",
      "Meet a friend at the park", "Grandparents / family visit"]
_SUN = ["Long walk with the pram", "Feeding the ducks", "Scooter / balance bike",
        "A playground you've never been to", "Nature hunt walk", "Sunset walk"]
_MON = ["Riverside path", "Neighbourhood park", "Woods loop",
        "Green space + ball", "Playground (the big slide one)", "Field walk",
        "Duck pond", "Hill walk"]
_WED = ["Library", "Soft play", "Library", "Indoor play centre", "Library",
        "Church hall playgroup", "Library", "Soft play (quiet session)"]
_THU = ["Grocery shop", "Hardware shop", "Market", "Post office + errand",
        "Garden centre", "Charity shop", "Bakery run", "Pharmacy + park bench"]
_SAT = ["Bus ride (nowhere in particular)", "Farm", "Aquarium",
        "Botanical garden", "Train ride", "Pet shop + garden centre",
        "Fire station / tractor spotting", "Lakeshore"]

BOOKLETS = [("January", "01", "jan", 1, 5), ("February", "02", "feb", 6, 9),
            ("March", "03", "mar", 10, 13), ("April", "04", "apr", 14, 18),
            ("May", "05", "may", 19, 22), ("June", "06", "jun", 23, 26),
            ("July", "07", "jul", 27, 31), ("August", "08", "aug", 32, 35),
            ("September", "09", "sep", 36, 39), ("October", "10", "oct", 40, 44),
            ("November", "11", "nov", 45, 48), ("December", "12", "dec", 49, 52)]

HOLIDAYS = {
    18: ("Martin Luther King Jr. Day", "bonus note"),
    33: ("Groundhog Day", "bonus note"),
    45: ("💗 Valentine's Day", "FULL DAY"), 46: ("Presidents' Day", "bonus note"),
    76: ("☘️ St Patrick's Day", "FULL DAY"), 79: ("Spring equinox", "bonus note"),
    85: ("Good Friday", "bonus note"), 87: ("🐣 Easter Sunday", "FULL DAY"),
    112: ("🌍 Earth Day", "FULL DAY"), 129: ("💐 Mother's Day", "FULL DAY"),
    151: ("Memorial Day", "bonus note"),
    156: ("🎈 Kreston turns 1", "FULL DAY"), 170: ("Juneteenth", "bonus note"),
    171: ("👔 Father's Day", "FULL DAY"), 172: ("Summer solstice", "bonus note"),
    185: ("🎆 Independence Day", "FULL DAY"), 249: ("Labor Day", "bonus note"),
    256: ("🎈 Joseph's birthday", "FULL DAY"),
    266: ("Autumn equinox", "bonus note"),
    284: ("Indigenous Peoples' Day", "bonus note"),
    302: ("🪔 Diwali", "FULL DAY"), 304: ("🎃 Halloween", "FULL DAY"),
    305: ("💀 Día de los Muertos", "FULL DAY"),
    315: ("Veterans Day", "bonus note"), 329: ("🦃 Thanksgiving", "FULL DAY"),
    354: ("🎈 Azlyn turns 4", "FULL DAY"), 355: ("Winter solstice", "bonus note"),
    358: ("🕎 Hanukkah begins at sundown", "FULL DAY"),
    359: ("🎄 Christmas", "FULL DAY"),
    363: ("🎈 Brooklyn's birthday, she gets the day off", "FULL DAY"),
    365: ("🎂 Grand Finale and New Year's Eve", "FULL DAY"),
}

KRESTON = [(339, 18, "Climbs stairs holding on, pretend play begins, 20+ words"),
           (309, 17, "Kicks a ball, two-word combinations starting"),
           (278, 16, "Stacks four blocks, copies chores, 10+ words"),
           (248, 15, "Runs, spoons food, points at pictures in books"),
           (217, 14, "Scribbles, stacks two blocks, 3-5 words"),
           (186, 13, "Walks, climbs, carries things while moving"),
           (156, 12, "Walking or close, drinks from a cup, one-step instructions"),
           (125, 11, "Stands alone briefly, first words possible"),
           (95, 10, "Cruises furniture, points, understands \"no\""),
           (64, 9, "Pulls to stand, pincer grip, waves"),
           (36, 8, "Crawls or shuffles, stranger wariness, bangs two things together"),
           (5, 7, "Reaches across midline, transfers hand to hand, babbles in strings")]


def kreston(day):
    for start, age, note in KRESTON:
        if day >= start:
            return age, note
    return 6, "Sits with hands free, mouths everything"


def booklet_of(wk):
    for name, pre, ab, a, b in BOOKLETS:
        if a <= wk <= b:
            return name, pre, ab
    raise ValueError(wk)


def _saturdays():
    """Museum takes the first Saturday of each month. The other Saturdays run
    through _SAT in order, and that cycle CONTINUES across a museum week
    rather than losing its slot. Verified against the spec table, weeks 1-18.
    """
    out, k = {}, 0
    for wk in range(1, 53):
        d = dt.date(2027, 1, 1) + dt.timedelta(days=(7 * wk - 6 + 1) - 1)
        if d.day <= 7:
            out[wk] = "**MUSEUM**"
        else:
            out[wk] = _SAT[k % 8]
            k += 1
    return out


_SAT_BY_WEEK = _saturdays()


def out_again(wk, offset):
    """offset 0=Fri 1=Sat 2=Sun 3=Mon 4=Tue 5=Wed 6=Thu"""
    if offset == 4:
        return "Swimming"
    if offset == 0:
        return _F[(wk - 1) % 5]
    if offset == 1:
        return _SAT_BY_WEEK[wk]
    if offset == 2:
        return _SUN[(wk - 1) % 6]
    if offset == 3:
        return _MON[(wk - 1) % 8]
    if offset == 5:
        return _WED[(wk - 1) % 8]
    return _THU[(wk - 1) % 8]


# --- headlines already used anywhere
used = set()
for pat in (os.path.join(REPO, "months", "*.md"),
            os.path.join(SP, "newweeks", "*-days.md")):
    for f in glob.glob(pat):
        pend = False
        for ln in open(f, encoding="utf-8").read().split("\n"):
            if ln.startswith("> 🧠"):
                pend = True
                continue
            if pend:
                m = re.match(r"^> \*\*(.+?)\*\*\s*$", ln)
                if m:
                    used.add(m.group(1).strip().lower().rstrip("."))
                    pend = False

pool = []
for ln in open(os.path.join(REPO, "tools", "insight-pool.md"), encoding="utf-8"):
    m = re.match(r"^- \*\*\d+\.\*\* (.+)$", ln.strip())
    if m and m.group(1).strip().lower().rstrip(".") not in used:
        pool.append(m.group(1).strip())

done_weeks = set()
for f in glob.glob(os.path.join(SP, "newweeks", "*-days.md")):
    done_weeks.add(int(re.search(r"wk(\d+)-days", f).group(1)))
for f in glob.glob(os.path.join(REPO, "months", "*-w*.md")):
    done_weeks.add(int(re.search(r"-w(\d+)\.md", f).group(1)))

todo = [w for w in range(2, 53) if w not in done_weeks]
print(f"already written: {sorted(done_weeks)}")
print(f"to write: {len(todo)} weeks")
print(f"clean headlines available: {len(pool)}, need {len(todo) * 7}")
assert len(pool) >= len(todo) * 7, "insight pool exhausted"

cursor = 0
for wk in todo:
    d0, d1 = 7 * wk - 6, 7 * wk
    name, pre, ab = booklet_of(wk)
    days = []
    for i, n in enumerate(range(d0, d1 + 1)):
        date = dt.date(2027, 1, 1) + dt.timedelta(days=n - 1)
        assert date.timetuple().tm_yday == n
        age, cap = kreston(n)
        hol = HOLIDAYS.get(n)
        days.append({
            "day": n, "weekday": date.strftime("%A"),
            "month": date.strftime("%B"), "date_num": date.day,
            "header_date": f"**📅 {date.strftime('%A')}, {date.strftime('%B')} {date.day}, 2027**",
            "azlyn_age": 4 if n >= 354 else 3,
            "kreston_months": age, "kreston_capability": cap,
            "out_again_anchor": out_again(wk, i),
            "holiday": hol[0] if hol else None,
            "holiday_treatment": hol[1] if hol else None,
        })
    theme, sidebar = THEMES[wk]
    json.dump({
        "week": wk, "booklet": name, "file_prefix": f"{pre}-{ab}",
        "days": [d0, d1], "theme": theme, "sidebar": sidebar,
        "sidebar_needs_writing": sidebar == "NEEDS WRITING",
        "date_range": f"{days[0]['month']} {days[0]['date_num']} – "
                      f"{days[-1]['month']} {days[-1]['date_num']}, 2027",
        "insight_headlines": pool[cursor:cursor + 7],
        "day_specs": days,
    }, open(os.path.join(OUT, f"wk{wk:02d}.json"), "w", encoding="utf-8"),
        ensure_ascii=False, indent=2)
    cursor += 7

print(f"\nwrote {len(todo)} briefs, allocated {cursor} headlines, "
      f"{len(pool) - cursor} spare")
for name, pre, ab, a, b in BOOKLETS:
    ws = [w for w in range(a, b + 1)]
    left = [w for w in ws if w in todo]
    print(f"  {name:<10} weeks {a:>2}-{b:<2}  {len(left)} to write")

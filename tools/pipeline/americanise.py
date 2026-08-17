"""Convert British spelling and vocabulary to US across months/.

Word-boundary replacements from a curated list, capitalisation preserved.
Not regex surgery on structure: the day count is asserted before and after and
the file is refused if it moves.

usage: americanise.py [--check]
"""
import glob
import os
import re
import sys
from collections import Counter

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
CHECK = "--check" in sys.argv

# spelling
SPELL = {
    "colour": "color", "colours": "colors", "coloured": "colored",
    "colouring": "coloring", "colourful": "colorful",
    "favourite": "favorite", "favourites": "favorites",
    "flavour": "flavor", "flavours": "flavors", "flavoured": "flavored",
    "neighbour": "neighbor", "neighbours": "neighbors",
    "neighbourhood": "neighborhood",
    "behaviour": "behavior", "behaviours": "behaviors",
    "harbour": "harbor", "labour": "labor",
    "practise": "practice", "practises": "practices",
    "practised": "practiced", "practising": "practicing",
    "realise": "realize", "realised": "realized", "realises": "realizes",
    "organise": "organize", "organised": "organized",
    "recognise": "recognize", "recognised": "recognized",
    "apologise": "apologize", "memorise": "memorize",
    "metre": "meter", "metres": "meters",
    "centimetre": "centimeter", "centimetres": "centimeters",
    "litre": "liter", "litres": "liters",
    "theatre": "theater", "centre": "center", "centres": "centers",
    "grey": "gray", "greyish": "grayish",
    "plough": "plow", "moustache": "mustache",
    "pyjamas": "pajamas", "aeroplane": "airplane",
    "aluminium": "aluminum", "cosy": "cozy",
    "storey": "story", "storeys": "stories",
    "traveller": "traveler", "travelling": "traveling", "travelled": "traveled",
    "modelling": "modeling", "modelled": "modeled",
    "labelling": "labeling", "labelled": "labeled",
    "marvellous": "marvelous", "woollen": "woolen",
    "defence": "defense", "offence": "offense", "licence": "license",
    "kerb": "curb", "kerbs": "curbs",
    "tyre": "tire", "tyres": "tires",
    "mould": "mold", "moulds": "molds", "mouldy": "moldy",
    "smoulder": "smolder", "draught": "draft", "draughts": "drafts",
    "sceptical": "skeptical", "programme": "program", "programmes": "programs",
    "jewellery": "jewelry", "somersault": "somersault",
}

# vocabulary and groceries
VOCAB = {
    "pram": "stroller", "prams": "strollers",
    "wellies": "rain boots", "wellingtons": "rain boots",
    "lolly stick": "craft stick", "lolly sticks": "craft sticks",
    "courgette": "zucchini", "courgettes": "zucchini",
    "caster sugar": "superfine sugar",
    "self-raising flour": "self-rising flour",
    "bicarbonate of soda": "baking soda",
    "nappy": "diaper", "nappies": "diapers",
    "cling film": "plastic wrap", "clingfilm": "plastic wrap",
    "greaseproof paper": "parchment paper",
    "kitchen roll": "paper towels",
    "washing-up liquid": "dish soap", "washing up liquid": "dish soap",
    "tea towel": "dish towel", "tea towels": "dish towels",
    "flannel": "washcloth", "flannels": "washcloths",
    "hoover": "vacuum", "hoovering": "vacuuming",
    "rubbish": "trash", "rubbish bin": "trash can",
    "bin bag": "trash bag", "bin bags": "trash bags",
    "torch": "flashlight", "torches": "flashlights",
    "plaster": "bandage", "plasters": "bandages",
    "jumper": "sweater", "jumpers": "sweaters",
    "trainers": "sneakers", "dummy": "pacifier",
    "cot": "crib", "cots": "cribs",
    "buggy": "stroller", "buggies": "strollers",
    "post box": "mailbox", "postbox": "mailbox",
    "aubergine": "eggplant", "sultanas": "golden raisins",
    "biscuit": "cookie", "biscuits": "cookies",
    "sweets": "candy", "candyfloss": "cotton candy",
    "chips": "fries", "crisps": "chips",
    "jug": "pitcher", "jugs": "pitchers",
    "cooker": "stove", "hob": "stovetop",
    "wardrobe": "closet", "garden centre": "garden center",
    "car park": "parking lot", "pavement": "sidewalk",
    "queue": "line", "queued": "lined up",
    # deliberately NOT converted:
    # autumn -> fall. "autumn" is standard American English in writing, and the
    #   book already uses fall/falls/falling 81 times for toppling towers.
    #   Converting produces "the fall will stop" and "fall's leaves".
    # dummy -> pacifier. Zero occurrences.
    # jug -> pitcher is kept: every use is "a jug of water", which is a pitcher.
}

REPL = {}
REPL.update(SPELL)
REPL.update(VOCAB)


def cap_like(src, dst):
    if src.isupper():
        return dst.upper()
    if src[:1].isupper():
        return dst[:1].upper() + dst[1:]
    return dst


# longest first so "lolly sticks" beats "lolly stick"
KEYS = sorted(REPL, key=len, reverse=True)
PAT = re.compile(r"\b(" + "|".join(re.escape(k) for k in KEYS) + r")\b", re.I)

files = sorted(glob.glob(os.path.join(REPO, "months", "*.md")))
tally = Counter()
changed = 0

for f in files:
    text = open(f, encoding="utf-8").read()
    before_days = text.count("## 🌟 Day ")

    def sub(m):
        src = m.group(1)
        dst = REPL.get(src.lower())
        if dst is None:
            return src
        tally[src.lower()] += 1
        return cap_like(src, dst)

    new = PAT.sub(sub, text)
    after_days = new.count("## 🌟 Day ")
    assert before_days == after_days, f"{f}: day count moved, refusing"

    if new != text and not CHECK:
        with open(f, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(new)
        changed += 1

print(f"{'WOULD CHANGE' if CHECK else 'CHANGED'} {changed if not CHECK else sum(1 for _ in files)} file(s)")
print(f"{sum(tally.values())} replacements across {len(tally)} distinct terms\n")
for w, c in tally.most_common(30):
    print(f"  {c:>4}  {w} -> {REPL[w]}")
if len(tally) > 30:
    print(f"  ... and {len(tally) - 30} more terms")

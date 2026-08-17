"""Whole-book final gate. Run last, after every write has settled.

Checks what validate.py and audit.py do not: internal link integrity, the
index's coverage of the backup sections, back-matter presence, and the locale
sweep holding.
"""
import glob
import os
import re
import sys

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
MONTHS = os.path.join(REPO, "months")

fails, warns, notes = [], [], []
files = sorted(glob.glob(os.path.join(MONTHS, "*.md")))
book = ""
for f in files:
    book += open(f, encoding="utf-8").read() + "\n"

# ---------- 1. every anchor defined, every link resolved ----------
anchors = set(re.findall(r'<a id="([\w-]+)"></a>', book))
links = set(re.findall(r"\]\(#([\w-]+)\)", book))
dead = sorted(links - anchors)
for d in dead:
    fails.append(f"dead link: [...](#{d}) has no matching anchor")
notes.append(f"{len(anchors)} anchors, {len(links)} distinct link targets, "
             f"{len(dead)} dead")

# ---------- 2. the index reaches every backup section ----------
idx_path = os.path.join(MONTHS, "99-back-01-index.md")
if not os.path.exists(idx_path):
    fails.append("MISSING months/99-back-01-index.md")
else:
    idx = open(idx_path, encoding="utf-8").read()
    missing = []
    for m in ("jan", "feb", "mar", "apr", "may", "jun",
              "jul", "aug", "sep", "oct", "nov", "dec"):
        for a in ("weather-1", "weather-2", "sick-1", "sick-2", "extras"):
            if f"#{m}-{a})" not in idx:
                missing.append(f"{m}-{a}")
    for m in missing:
        fails.append(f"index never links backup section {m}")
    notes.append(f"index links {60 - len(missing)}/60 backup sections")

# ---------- 3. back matter present ----------
for f, label in (("00-front.md", "front matter"),
                 ("99-back-01-index.md", "master activity index"),
                 ("99-back-02-keepsake.md", "keepsake tracker"),
                 ("99-back-03-closing.md", "closing note")):
    if not os.path.exists(os.path.join(MONTHS, f)):
        fails.append(f"MISSING {label}: months/{f}")

# ---------- 4. covers and backups, one per month ----------
n_cov = len(glob.glob(os.path.join(MONTHS, "*00-cover.md")))
n_bak = len(glob.glob(os.path.join(MONTHS, "*zz-backup.md")))
if n_cov != 12:
    fails.append(f"{n_cov} booklet covers, want 12")
if n_bak != 12:
    fails.append(f"{n_bak} backup sections, want 12")

# ---------- 5. the locale sweep is holding ----------
BRIT = ["soft play", "colour", "favourite", "pram", "wellies", "lolly",
        "torch", "pavement", "kerb", "tea towel", "flannel", "kitchen roll",
        "yoghurt", "parcel tape", "cotton wool", "washing-up", "plain flour",
        "fortnight", "conker", "bannister", "sledge", "stock cube",
        "carrier bag", "greengrocer", "half four", "biscuit", "nappy",
        "cling film", "aubergine", "courgette", "candyfloss"]
low = book.lower()
for w in BRIT:
    c = low.count(w)
    if c:
        fails.append(f"British term survives: {w!r} x{c}")

# ---------- 6. draft markers gone from the notes ----------
n_draft = book.count("Draft. Rewrite this")
if n_draft:
    warns.append(f"{n_draft} draft marker(s) still present")
n_notes = book.count("A Note from Joseph")
notes.append(f"{n_notes} notes from Joseph, {n_draft} still marked draft")

# ---------- 7. no backup day masquerading as one of the 365 ----------
for f in glob.glob(os.path.join(MONTHS, "*zz-backup.md")):
    t = open(f, encoding="utf-8").read()
    if re.search(r"^## 🌟 Day \d+:", t, re.M):
        fails.append(f"{os.path.basename(f)} uses the numbered-day header, "
                     f"which the day count depends on")

# ---------- report ----------
print(f"FINAL CHECK over {len(files)} files\n")
for n in notes:
    print("  ", n)
if warns:
    print(f"\n{len(warns)} WARNING(S)")
    for w in warns[:20]:
        print("  ~", w)
if fails:
    print(f"\n{len(fails)} FAILURE(S)")
    for f_ in fails[:30]:
        print("  -", f_)
    sys.exit(1)
print("\nFINAL CHECK PASSED")

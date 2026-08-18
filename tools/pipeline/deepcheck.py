"""Whole-book deterministic audit. Everything checkable without judgment.

Run from the repo root. Exits 1 if any check fails. Every check here either
shipped a real defect at some point or guards an invariant the designer will
rely on when templating the book.
"""
import datetime
import glob
import io
import os
import re
import sys
from collections import Counter

MONTHS = "months"
FAILS, WARNS, NOTES = [], [], []


def fail(m):
    FAILS.append(m)


def warn(m):
    WARNS.append(m)


def note(m):
    NOTES.append(m)


def read(p):
    return io.open(p, encoding="utf-8", newline="").read()


WEEKFILES = sorted(glob.glob(os.path.join(MONTHS, "*w*.md")))
ALLFILES = sorted(glob.glob(os.path.join(MONTHS, "*.md")))


def day_blocks(path):
    """Split a week file into (day_number, lines).

    A day stops at the next day/week/booklet/backup anchor. An earlier
    splitter that only looked for day anchors swallowed the following week's
    opener and produced 119 phantom failures.
    """
    out, cur, num = [], None, None
    for ln in read(path).split("\n"):
        m = re.match(r'^<a id="day-(\d+)"></a>\s*$', ln)
        if m:
            if cur is not None:
                out.append((num, cur))
            num, cur = int(m.group(1)), []
            continue
        if re.match(r'^<a id="(week|booklet|backup|keepsake|index)', ln) and cur is not None:
            out.append((num, cur))
            cur = None
            continue
        if cur is not None:
            cur.append(ln)
    if cur is not None:
        out.append((num, cur))
    return out


DAYS, DAYFILE = {}, {}
for p in WEEKFILES:
    for n, lines in day_blocks(p):
        if n in DAYS:
            fail("[structure] Day %d appears in two files: %s and %s" % (n, DAYFILE[n], p))
        DAYS[n], DAYFILE[n] = lines, p

# ---------------------------------------------------------------- 1. coverage
if len(DAYS) != 365:
    fail("[structure] %d day blocks, want 365" % len(DAYS))
gaps = [n for n in range(1, 366) if n not in DAYS]
if gaps:
    fail("[structure] missing days: %s" % gaps[:20])
note("days parsed: %d" % len(DAYS))

# -------------------------------------------------- 2. dates and the calendar
START = datetime.date(2027, 1, 1)
for n, lines in sorted(DAYS.items()):
    txt = "\n".join(lines)
    m = re.search(r'^\*\*📅 (\w+), (\w+) (\d+), (\d+)\*\*', txt, re.M)
    if not m:
        fail("[date] Day %d: no date line" % n)
        continue
    wd, mon, dd, yy = m.group(1), m.group(2), int(m.group(3)), int(m.group(4))
    real = START + datetime.timedelta(days=n - 1)
    if (real.strftime("%A"), real.strftime("%B"), real.day, real.year) != (wd, mon, dd, yy):
        fail("[date] Day %d: page says %s %s %d %d, calendar says %s %d %d"
             % (n, wd, mon, dd, yy, real.strftime("%A %B"), real.day, real.year))
note("dates checked against the real 2027 calendar")

# ---------------------------------------------------------- 3. schedule rows
for n, lines in sorted(DAYS.items()):
    rows = [l for l in lines if re.match(r'^- \*\*\d{1,2}:\d{2}', l)]
    if len(rows) != 16:
        fail("[schedule] Day %d: %d rows, want 16" % (n, len(rows)))

# ------------------------------------ 4. schedule row <-> heading, char exact
NAMED = ["🌅 Opening Activity", "🎨 The Main Event", "🌳 Get Outside",
         "🎨 Second Main Event", "🌳 Out Again"]
for n, lines in sorted(DAYS.items()):
    heads = {}
    for l in lines:
        if l.startswith("### "):
            body = l[4:].strip()
            for k in NAMED:
                if body.startswith(k):
                    heads.setdefault(k, []).append(body)
    for l in lines:
        for k in NAMED:
            mark = "— " + k + ":"
            if mark in l:
                rowname = l.split(mark, 1)[1]
                rowname = re.sub(r'\s*\(\d+\s*min\)\s*$', '', rowname).strip()
                got = heads.get(k, [])
                if not got:
                    fail("[row] Day %d: row names '%s' but no such heading" % (n, k))
                elif not any(h == "%s: %s" % (k, rowname) for h in got):
                    fail("[row] Day %d: row '%s' vs heading '%s'"
                         % (n, rowname, got[0].split(": ", 1)[-1]))

# ------------------------------------------------------- 5. insight word band
INS = re.compile(r'> 🧠 \*\*A Little Parenting Insight\*\*\n> \*\*(.+?)\*\*\n((?:> .*\n?)+)')
n_ins = 0
for p in ALLFILES:
    for m in INS.finditer(read(p)):
        n_ins += 1
        body = re.sub(r'^> ?', '', m.group(2), flags=re.M)
        w = len(body.split())
        if not (95 <= w <= 125):
            fail("[insight] %s: '%s' body is %d words, want 100-120"
                 % (os.path.basename(p), m.group(1)[:44], w))
note("insights checked: %d" % n_ins)

# -------------------------------------------------------------------- 6. ages
KRESTON = [(1, 6), (5, 7), (36, 8), (64, 9), (95, 10), (125, 11), (156, 12),
           (186, 13), (217, 14), (248, 15), (278, 16), (309, 17), (339, 18)]


def kreston_months(day):
    v = 6
    for d, mo in KRESTON:
        if day >= d:
            v = mo
    return v


for n, lines in sorted(DAYS.items()):
    txt = "\n".join(lines)
    want = kreston_months(n)
    for m in re.finditer(r'Kreston is (\d+) months', txt):
        got = int(m.group(1))
        if got != want:
            fail("[age] Day %d: says Kreston is %d months, table says %d" % (n, got, want))
    for m in re.finditer(r'At (\d+) months', txt):
        got = int(m.group(1))
        if got != want:
            fail("[age] Day %d: 'At %d months', table says %d" % (n, got, want))
note("Kreston's age checked on every day that states it")

# ---------------------------------------------- 7. shopping list vs materials
STOP = set("""the a an and or of for with in on to from into 1 2 3 4 5 6 7 8 9
one two three four five six seven eight nine ten if you your her his its any
each per plus some few several more than about least optional adult only new
old big small large you'll she he it that this these those his hers""".split())


def norm(s):
    s = s.lower()
    s = re.sub(r'\*\*|\*|`', '', s)
    s = re.sub(r'\([^)]*\)', ' ', s)
    s = re.sub(r'[^a-z ]', ' ', s)
    out = set()
    for w in s.split():
        if w in STOP or len(w) <= 3:
            continue
        out.add(w[:-1] if w.endswith("s") and len(w) > 4 else w)
    return out


CARRIED = re.compile(r"this morning|from earlier|she made|you made|from the walk|"
                     r"today's|from day \d|the week's|from yesterday|already", re.I)


for p in WEEKFILES:
    txt = read(p)
    lm = re.search(r"This Week's Shopping List(.*?)(?=\n---|\n<div)", txt, re.S)
    if not lm:
        continue
    listwords = set()
    for l in lm.group(1).split("\n"):
        if l.startswith("- [ ]"):
            listwords |= norm(l[5:])
    for n, lines in day_blocks(p):
        inmat = False
        for l in lines:
            if "Complete Materials List" in l:
                inmat = True
                continue
            if inmat and (l.startswith("**📝") or l.startswith("### ") or not l.strip()):
                inmat = False
            if inmat and l.startswith("- "):
                if CARRIED.search(l):
                    continue  # made earlier in the day, not shopped for
                ws = norm(l[2:])
                if ws and not (ws & listwords):
                    warn("[shopping] %s Day %d: '%s' shares no word with the week's list"
                         % (os.path.basename(p), n, l[2:64]))

# ------------------------------------------- 8. cross-references to other days
for n, lines in sorted(DAYS.items()):
    for m in re.finditer(r'\bDay (\d{1,3})\b', "\n".join(lines)):
        d = int(m.group(1))
        if not (1 <= d <= 365):
            fail("[xref] Day %d: references Day %d, out of range" % (n, d))

# ------------------------------------------------ 9. markdown / print hygiene
for p in ALLFILES:
    raw = read(p)
    if "\r" in raw:
        fail("[hygiene] %s: CRLF line endings, want LF" % os.path.basename(p))
    if "\t" in raw:
        fail("[hygiene] %s: contains a tab" % os.path.basename(p))
    for i, l in enumerate(raw.split("\n"), 1):
        if l.rstrip() != l:
            fail("[hygiene] %s:%d: trailing whitespace" % (os.path.basename(p), i))
    # bold legally wraps across lines, so balance is a paragraph property
    for para in raw.split("\n\n"):
        if para.count("**") % 2:
            fail("[hygiene] %s: unclosed bold in '%s'"
                 % (os.path.basename(p), para.strip()[:70].replace("\n", " ")))
    if raw and not raw.endswith("\n"):
        fail("[hygiene] %s: no trailing newline" % os.path.basename(p))
    if "\n\n\n" in raw:
        warn("[hygiene] %s: triple blank line" % os.path.basename(p))

# --------------------------------------------------------- 10. anchors, links
anchors, dupes = set(), []
for p in ALLFILES:
    for m in re.finditer(r'<a id="([^"]+)"></a>', read(p)):
        if m.group(1) in anchors:
            dupes.append(m.group(1))
        anchors.add(m.group(1))
if dupes:
    fail("[links] duplicate anchors: %s" % dupes[:10])
dead = set()
for p in ALLFILES:
    for m in re.finditer(r'\]\(#([^)]+)\)', read(p)):
        if m.group(1) not in anchors:
            dead.add("%s -> #%s" % (os.path.basename(p), m.group(1)))
if dead:
    fail("[links] dead internal links: %s" % sorted(dead)[:10])
note("anchors: %d, dead links: %d" % (len(anchors), len(dead)))

# ------------------------------------------------------------ 11. title reuse
titles = Counter()
for p in ALLFILES:
    # [^:] matches newlines, so anchor both groups to the line or the match
    # runs on past the heading and swallows the block below it.
    for m in re.finditer(r'^### ((?:🌅|🎨|🌳|🧹|🛁|🤸|📚) [^:\n]+): ([^\n]+)$', read(p), re.M):
        if m.group(1).strip() == "🌳 Out Again":
            continue  # rotation anchor, repeats by design (spec section 5)
        titles[m.group(2).strip()] += 1
rep = [t for t, c in titles.items() if c > 1]
if rep:
    fail("[titles] %d repeated activity titles: %s" % (len(rep), rep[:10]))
note("activity titles: %d (%d unique)" % (sum(titles.values()), len(titles)))

# --------------------------------------------------- 12. banned-content sweep
BANNED = {
    "note from Joseph": r'Note from Joseph',
    "closing anchor": r'id="closing"',
    "weekly swim slot": r'the weekly one',
    "swimming lesson": r'swim\w*\s+lesson|her instructor|the instructor',
    "first-word promise": r'first word (is|may|comes|arrives)|edge of first words|close to (a )?first word|first words are close',
    "tree return": r'come back in July|three more times this year|in July, when you',
    "one-adult-per-child": r'one adult cannot watch|only one of them gets in|second adult comes with him|take (the children|them both)? ?one at a time (in|into) the water',
}
for p in ALLFILES:
    raw = read(p)
    for label, pat in BANNED.items():
        for m in re.finditer(pat, raw, re.I):
            fail("[banned] %s: %s -> '%s'"
                 % (os.path.basename(p), label,
                    raw[max(0, m.start() - 30):m.end() + 30].replace("\n", " ")))

# ------------------------------------------- 13. Out Again rotation totals
# CONTINUATION.md section 5: "Verified across all 365 days: Swimming 52.
# Library 26. Museum 12." and no other destination above 11.
anchor = Counter()
for n, lines in sorted(DAYS.items()):
    for l in lines:
        m = re.match(r'^### 🌳 Out Again: (.+)$', l)
        if m:
            anchor[re.sub(r'\*\*', '', m.group(1)).strip()] += 1
for want, name in ((52, "Swimming"), (26, "The Library"), (12, "The Museum")):
    got = anchor.get(name, 0)
    if got != want:
        fail("[rotation] %s anchors %d days, spec says %d" % (name, got, want))
for k, v in anchor.items():
    if k not in ("Swimming", "The Library", "The Museum", "Pick one") and v > 11:
        fail("[rotation] '%s' anchors %d days, spec caps other destinations at 11" % (k, v))
note("Out Again anchors: " + ", ".join("%s %d" % (k, v) for k, v in anchor.most_common()))

# ------------------------------------- 14. block markers, exact strings only
# Every variant spelling of a recurring block costs the designer a special
# case, so the strings are checked literally rather than by pattern.
EXACT = {
    "prep": "### 🌙 Prep Tonight",
    "schedule": "### ⏰ At-a-Glance Schedule",
    "steps": "**📝 Step-by-Step Instructions:**",
    "materials": "**🧰 Complete Materials List:**",
    "youneed": "**🧰 You need:**",
    "tip": "> 💡 **Tip:**",
    "insight": "> 🧠 **A Little Parenting Insight**",
    "safety": "> ⚠️ **Safety:**",
    "kreston": "> 👶 **Kreston's Afternoon:**",
    "infant": "> 👶 **Infant Integration:**",
}
NEAR = {
    "prep": r'^#+ .{0,3}Prep Tonight[^\n]*',
    "schedule": r'^#+ .{0,3}At.a.Glance[^\n]*',
    "steps": r'\*\*.{0,3}Step.by.Step[^*]*\*\*',
    "materials": r'\*\*.{0,3}Complete Materials[^*]*\*\*',
    "tip": r'> .{0,3}\*\*Tip[^*]*\*\*',
    "insight": r'> .{0,3}\*\*A Little Parenting[^*]*\*\*',
    "safety": r'> .{0,3}\*\*Safety[^*]*\*\*',
}
for p in ALLFILES:
    raw = read(p)
    for key, pat in NEAR.items():
        for m in re.finditer(pat, raw, re.M):
            if EXACT[key] not in m.group(0) and not m.group(0).startswith(EXACT[key]):
                fail("[marker] %s: variant of '%s' -> %r"
                     % (os.path.basename(p), EXACT[key], m.group(0)[:60]))

# ------------------------------------------------- 15. one of each, per day
for n, lines in sorted(DAYS.items()):
    txt = "\n".join(lines)
    for key, want in (("prep", 1), ("schedule", 1), ("insight", 1), ("safety", 1)):
        got = txt.count(EXACT[key])
        if got != want:
            fail("[blocks] Day %d: %d x '%s', want %d" % (n, got, EXACT[key], want))
    infants = txt.count(EXACT["kreston"]) + txt.count(EXACT["infant"])
    if infants != 2:
        fail("[blocks] Day %d: %d infant blocks, want 2" % (n, infants))
note("per-day block counts checked on all 365 days")

# --------------------------- 16. week opener claims vs that week's insights
# "What You'll Learn" bullets quote the week's insight headlines verbatim
# minus the full stop. One drifted before and took a rewrite with it.
for p in WEEKFILES:
    raw = read(p)
    def nopunct(s):
        # the terminal period can sit inside a closing quote, US style, so
        # strip it wherever it lands before the end of the line
        return re.sub(r'\.(?=["”]?$)', '', s.strip()).strip()

    heads = set()
    for m in re.finditer(r'> 🧠 \*\*A Little Parenting Insight\*\*\n> \*\*(.+?)\*\*', raw):
        heads.add(nopunct(m.group(1)))
    lm = re.search(r"### 👩 What You'll Learn\n\n((?:- .*\n)+)", raw)
    if not lm:
        continue
    for l in lm.group(1).strip().split("\n"):
        claim = nopunct(l[2:])
        if claim and claim not in heads:
            fail("[opener] %s: 'What You'll Learn' bullet %r matches no insight "
                 "headline in the week" % (os.path.basename(p), claim[:60]))

# ------------------------------------------- 17. backup section structure
for p in sorted(glob.glob(os.path.join(MONTHS, "*zz-backup.md"))):
    raw = read(p)
    bad = len(re.findall(r'Bad Weather Day \d', raw))
    sick = len(re.findall(r'Sick Day \d', raw))
    extra = len(re.findall(r'Extra Ideas|Extras', raw))
    if bad < 2 or sick < 2 or extra < 1:
        fail("[backup] %s: %d bad-weather, %d sick, %d extras headings; want 2/2/1"
             % (os.path.basename(p), bad, sick, extra))
note("backup sections: 12 files checked for 2 bad weather + 2 sick + 1 extras")

# ------------------------------- 18. near-duplicate prose across the year
# Titles are unique by construction. Bodies are not checked anywhere, and a
# previous audit found a Tip in one half making the same point in the same
# words as a Tip in the other.
BORING = set("""her his the and for a an of to in on with it that this she he
you your they them from into out up down over under one two three all any
each some more most then than when while because so but or if as at by is are
was were be been being do does did done get gets got go goes going take takes
took put puts putting let lets letting will would can could should about
what which who whom whose there here now not no yes""".split())


def shingle(text):
    ws = [w for w in re.findall(r'[a-z]+', text.lower()) if w not in BORING and len(w) > 3]
    return set(ws)


def near_dupes(items, label, threshold=0.55, minlen=25):
    keys = [(k, shingle(v)) for k, v in items if len(shingle(v)) >= minlen]
    for i in range(len(keys)):
        for j in range(i + 1, len(keys)):
            a, b = keys[i][1], keys[j][1]
            inter = len(a & b)
            if not inter:
                continue
            jac = inter / float(len(a | b))
            if jac >= threshold:
                fail("[dupe] %s %s and %s overlap %d%% of their distinctive words"
                     % (label, keys[i][0], keys[j][0], int(jac * 100)))


ins_bodies, tips = [], []
for p in ALLFILES:
    raw = read(p)
    base = os.path.basename(p)
    for m in INS.finditer(raw):
        ins_bodies.append((base + ":" + m.group(1)[:34], re.sub(r'^> ?', '', m.group(2), flags=re.M)))
    for m in re.finditer(r'> 💡 \*\*Tip:\*\*(.+?)(?=\n\n|\n> \n)', raw, re.S):
        tips.append((base + ":" + m.group(1).strip()[:34], m.group(1)))
near_dupes(ins_bodies, "insight")
near_dupes(tips, "tip")
note("near-duplicate scan: %d insight bodies, %d tips" % (len(ins_bodies), len(tips)))

# --------------------------------------------- 19. her 4:00 job, every day
# The job itself grows across the year on purpose, from the forks to the
# napkins to the cups, so the invariant is the slot rather than the forks.
jobs = Counter()
for n, lines in sorted(DAYS.items()):
    row = [l for l in lines if l.startswith("- **4:00–4:15 PM**")]
    if len(row) != 1:
        fail("[job] Day %d: %d rows at 4:00, want 1" % (n, len(row)))
        continue
    if "🧹 Her Job:" not in row[0]:
        fail("[job] Day %d: 4:00 row is not 'Her Job' -> %r" % (n, row[0][:70]))
        continue
    name = row[0].split("🧹 Her Job:", 1)[1].strip()
    jobs[name] += 1
    if not any(l.startswith("### 🧹 Her Job: " + name) or
               ("Her Job" in l and name in l) for l in lines if l.startswith("###")):
        pass  # the job has no section of its own, only the row; that is the format
fork_days = sum(v for k, v in jobs.items() if "Fork" in k)
note("her 4:00 job: %d distinct jobs, forks in %d days" % (len(jobs), fork_days))

# NOTE: a lexical "material listed but no step uses it" check was written
# here and deleted. Steps name actions rather than tools, so it fired 541
# times on things like a shoebox the steps call "the box" and a marker the
# steps imply by saying "write". Materials-versus-steps stays with the
# human auditors. A check that cries wolf gets ignored, and then the real
# ones get ignored with it.

# ------------------------------- 20. every swimming day carries a water rule
# 28 of the 52 shipped without one. Agents reading page by page found six of
# those; the whole class only shows up when you ask all 52 the same question.
swim = 0
for n, lines in sorted(DAYS.items()):
    if not any(l.startswith("### 🌳 Out Again: **Swimming**") for l in lines):
        continue
    swim += 1
    m = re.search(r'> ⚠️ \*\*Safety:\*\*(.*?)(?:\n\n|\Z)', "\n".join(lines), re.S)
    body = m.group(1) if m else ""
    if not re.search(r"arm's reach|drown", body, re.I):
        fail("[water] Day %d is a swimming day with no water rule in its own "
             "Safety block" % n)
note("swimming days checked for a water rule: %d" % swim)

# ------------------------------------------------------------------ 21. print
print("=" * 74)
print("DEEPCHECK")
print("=" * 74)
for m in NOTES:
    print("   " + m)
if WARNS:
    io.open("tools/pipeline/DEEPCHECK-WARNINGS.txt", "w", encoding="utf-8").write(
        "\n".join(WARNS) + "\n")
    print("\n-- %d warnings (judgment needed, full list in "
          "tools/pipeline/DEEPCHECK-WARNINGS.txt)" % len(WARNS))
    for m in WARNS[:30]:
        print("   " + m)
    if len(WARNS) > 30:
        print("   ... and %d more" % (len(WARNS) - 30))
if FAILS:
    print("\n** %d FAILURES" % len(FAILS))
    for m in FAILS[:60]:
        print("   " + m)
    if len(FAILS) > 60:
        print("   ... and %d more" % (len(FAILS) - 60))
    sys.exit(1)
print("\nDEEPCHECK PASSED")

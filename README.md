# The Big Book of Little Days — 2027

A 365-day activity and lesson-plan book for 2027, written by Joseph for
Brooklyn. One two-page spread per day, 8:00 AM to 6:00 PM, two main events,
1,000–1,150 words. Twelve printable monthly booklets.

This is **v2**. Version 1 covered 9:00 AM–12:45 PM and is tagged
`v1-morning-only`.

## Read this first

**[`CONTINUATION.md`](CONTINUATION.md)** is the authoritative build spec. The
day format, the children's real ages week by week, the verified 2027 calendar,
the whole-year Out Again rotation, the 52 week themes, and the validation rules
all live there. Read it before writing anything.

Section 14 lists every v1 rule that v2 kills. Read that too, or v1 habits will
leak back in.

## Layout

```
months/          source files, one per week-block   ← edit these
tools/
  validate.py    run before every commit
  titles.tsv     every title used, for duplicate checking
CONTINUATION.md  the spec
The-Big-Book-of-Little-Days-2027.md                 ← generated, never edit
```

## Build

```bash
cat months/*.md > The-Big-Book-of-Little-Days-2027.md
```

## Before every commit

```bash
python3 tools/validate.py
```

It checks day count, gaps, duplicate anchors, duplicate titles, and that every
date and weekday matches the real 2027 calendar. It exits non-zero on failure.

**Rule Zero: never overwrite the working file, and commit before any bulk
edit.** No `.` under DOTALL inside a repeated group. One of those destroyed a
finished version of v1.

## Privacy

**Keep this repository private.** It contains the children's names, ages and
birthdays throughout.

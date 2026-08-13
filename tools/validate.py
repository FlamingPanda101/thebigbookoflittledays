#!/usr/bin/env python3
"""Pre-commit validator for The Big Book of Little Days.

Checks all five Rule Zero conditions. Exits non-zero on any failure.
Deliberately avoids DOTALL and regex surgery: it splits into blocks and reads
them line by line.
"""
import datetime as dt
import glob
import os
import re
import sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]

DAY_HDR = re.compile(r"^## 🌟 Day (\d+): (.+?) 🌟\s*$")
DATE_LINE = re.compile(r"^\*\*📅 (\w+day), (\w+) (\d{1,2}), 2027\*\*\s*$")
ANCHOR = re.compile(r'^<a id="([\w-]+)"></a>\s*$')
NAMED = re.compile(r"^### (?:🌅 Opening Activity|🎨 The Main Event|"
                   r"🎨 Second Main Event): (.+?)\s*$")
INSIGHT = re.compile(r"^> \*\*(.+?)\*\*\s*$")


def load():
    text = []
    files = sorted(glob.glob(os.path.join(ROOT, "months", "*.md")))
    if not files:
        print("no files in months/ — nothing to validate")
        sys.exit(1)
    for f in files:
        with open(f, encoding="utf-8") as fh:
            text.extend(fh.read().splitlines())
    return text


def main():
    lines = load()
    fails = []

    days, anchors, titles, insights = [], [], [], []
    pending_insight = False

    for i, ln in enumerate(lines):
        m = ANCHOR.match(ln)
        if m:
            anchors.append(m.group(1))
            continue
        m = DAY_HDR.match(ln)
        if m:
            num, title = int(m.group(1)), m.group(2)
            date = None
            for look in lines[i + 1:i + 4]:
                d = DATE_LINE.match(look)
                if d:
                    date = (d.group(1), d.group(2), int(d.group(3)))
                    break
            days.append((num, title, date))
            continue
        m = NAMED.match(ln)
        if m:
            titles.append(m.group(1).strip().lower())
            continue
        if ln.startswith("> 🧠"):
            pending_insight = True
            continue
        if pending_insight:
            m = INSIGHT.match(ln)
            if m:
                insights.append(m.group(1).strip().lower())
                pending_insight = False

    nums = [d[0] for d in days]
    print(f"[1] days found: {len(days)}")

    dupe_nums = [n for n, c in Counter(nums).items() if c > 1]
    if dupe_nums:
        fails.append(f"duplicate day numbers: {sorted(dupe_nums)}")
    if nums:
        expected = set(range(min(nums), max(nums) + 1))
        missing = sorted(expected - set(nums))
        if missing:
            fails.append(f"gaps in day numbers: {missing[:20]}")
    print(f"[2] range: {min(nums) if nums else '-'}–{max(nums) if nums else '-'}, "
          f"{len(set(nums))} unique")

    dupe_anchors = [a for a, c in Counter(anchors).items() if c > 1]
    if dupe_anchors:
        fails.append(f"duplicate anchors: {sorted(dupe_anchors)}")
    print(f"[3] anchors: {len(anchors)} found, {len(dupe_anchors)} duplicated")

    all_titles = titles + insights
    dupe_titles = [t for t, c in Counter(all_titles).items() if c > 1]
    if dupe_titles:
        fails.append(f"duplicate titles: {sorted(dupe_titles)[:10]}")
    print(f"[4] titles: {len(titles)} activity + {len(insights)} insight, "
          f"{len(dupe_titles)} duplicated")

    bad = []
    for num, title, date in days:
        if date is None:
            bad.append(f"Day {num}: no date line")
            continue
        wd, mon, dd = date
        if mon not in MONTHS:
            bad.append(f"Day {num}: unknown month {mon!r}")
            continue
        try:
            real = dt.date(2027, MONTHS.index(mon) + 1, dd)
        except ValueError:
            bad.append(f"Day {num}: {mon} {dd} is not a real 2027 date")
            continue
        if real.timetuple().tm_yday != num:
            bad.append(f"Day {num}: {mon} {dd} is day {real.timetuple().tm_yday}")
        if real.strftime("%A") != wd:
            bad.append(f"Day {num}: {mon} {dd} is a {real.strftime('%A')}, not {wd}")
    if bad:
        fails.append("calendar mismatches: " + "; ".join(bad[:20]))
    print(f"[5] calendar: {len(days) - len(bad)}/{len(days)} correct")

    if fails:
        print("\nFAILED — do not commit:")
        for f in fails:
            print("  -", f)
        sys.exit(1)
    print("\nAll five checks passed. Safe to commit.")


if __name__ == "__main__":
    main()

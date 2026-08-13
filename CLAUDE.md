# CLAUDE.md — The Big Book of Little Days (2027)

## Read first, every session

1. `CONTINUATION.md` — the authoritative build spec. Day format, the children's
   real ages week by week, the verified 2027 calendar, the whole-year Out Again
   rotation, all 52 week themes, the validation rules. **Section 14 lists every
   v1 rule that v2 kills — read it or v1 habits leak back in.**
2. `tools/titles.tsv` — every Opening Activity, Main Event, Second Main Event
   and Insight title used so far. Check it before naming anything.
3. `tools/v1-insights.md` — 425 harvested insight headlines. Draw from these.
4. `tools/v1-sidebars.md` — the Around the World list, mapped to weeks.

Do not ask me to re-explain any of the above. It is all in those files.

## Rule Zero — non-negotiable

- **Never overwrite a working file.** Commit before any bulk edit.
- **Never** put `.` under the DOTALL flag inside a repeated group in a regex.
  One of those destroyed a completed version of this book. Parse into blocks
  and reassemble. No regex surgery on the whole file.
- `months/` is the source. **Edit only these.**
  `The-Big-Book-of-Little-Days-2027.md` is generated — never edit it directly.
- After any scripted pass, assert the day count and refuse to save if it moved.

## Never commit without validating

```powershell
python tools\validate.py
```

All five checks must pass: day count, no gaps, no duplicate anchors, no
duplicate titles, every date and weekday matching the real 2027 calendar.
**If it fails, fix it. Do not commit. Do not weaken the validator to make it
pass.**

## Check before writing every single day

- **Azlyn's age.** Three for Days 1–353. Four from Day 354 (Dec 20). Check the
  day number first, every time. Do not mix these up.
- **Kreston's age.** Born June 5, 2026 — he reaches each new month on the 5th.
  Six months on Day 1, 7 months from Day 5, 12 months on Day 156, 18–19 months
  by Day 365. Use the table in CONTINUATION.md section 1.
- **The date and weekday.** Verify against the real 2027 calendar before you
  write the header, not after.
- **Titles.** Grep `tools/titles.tsv` before naming an activity or insight.

## What I want from you

Write for **Brooklyn**, a competent adult, at 8:00 in the morning with a
three-year-old and a baby. Warm, practical, never preachy. Do not explain
things she already knows. Do not pad.

- Target **1,000–1,150 words of prose** per day, plus the ~120-word schedule
  block. The week's first day runs longer because it carries the Around the
  World sidebar.
- The Opening Activity usually **preps the 9:15 Main Event** so the day builds.
- The Second Main Event either **extends** the morning or **switches mode**.
  Morning made something → afternoon plays with it. Morning was messy →
  afternoon is calm. It is never filler and never a repeat.
- Every Get Outside is a **specific named activity**, season-matched. Never a
  generic "Park Trip."
- The Out Again anchor comes from the **year rotation** in CONTINUATION.md
  section 5. Swimming every Tuesday. Library alternate Wednesdays. Museum the
  first Saturday of the month. Do not invent a new destination scheme.
- ⚠️ Safety blocks only where there is a **real** hazard. Filler warnings train
  the reader to skip them.
- **Notes from Joseph: one per week, in the week opener.** Never daily. Draft
  it and mark it clearly as a draft for me to rewrite. It is the one thing in
  the book only I can write.

## Writing style

Follow `.claude/skills/stop-slop` if present. Otherwise: active voice, no
adverbs, no em dashes, no "here's what/this/that" openers, no "not X, it's Y"
contrasts, no dramatic sentence fragments. Vary sentence length. State things
directly and trust the reader.

## Workflow per week

1. Read the four files above.
2. Write the week opener, then the seven days, into one file in `months/`,
   named to match the existing convention (`01-jan-w1.md`, `02-feb-w6.md`).
3. Append every new title to `tools/titles.tsv`.
4. Rebuild: `Get-ChildItem months\*.md | Sort-Object Name | Get-Content | Set-Content "The-Big-Book-of-Little-Days-2027.md"`
5. Validate. **Only if all five pass**, commit and push.
6. Tell me the per-day word counts and anything you had to guess at.

## Repo state

- v1 is tagged `v1-morning-only`. Recover any old file with
  `git checkout v1-morning-only -- months`.
- `V1-REFERENCE.md` holds the harvest: 52 themes, 51 sidebars, 425 insights.
- **Keep this repo private.** It contains the children's names and birthdays.

## Open items

- Three Around the World sidebars need writing: weeks 27, 33 and 52. See
  CONTINUATION.md section 6.
- Backup sections per month: 2 bad weather days, 2 sick days, 1 extras page.
  Write these when the month's weeks are done.

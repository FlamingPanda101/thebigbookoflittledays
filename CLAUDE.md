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

## Locale — American, and it is not only spelling

The book is **US English throughout**. Joseph confirmed this. The holidays in
CONTINUATION.md section 2 were always the US set; the prose was not, because
it inherited v1's British voice, and 2,700 terms had to be converted after ten
months were already written. Do not reintroduce it.

- **Spelling:** color, favorite, practice, realize, meter, center, gray.
- **Vocabulary:** stroller not pram, craft sticks not lolly sticks, rain boots
  not wellies, flashlight not torch, sidewalk not pavement, curb not kerb,
  trash not rubbish, dish towel not tea towel, washcloth not flannel, paper
  towels not kitchen roll, popsicle not ice lolly, cookie not biscuit,
  candy not sweets, pitcher not jug, stove not cooker, closet not wardrobe,
  parking lot not car park, mailbox not postbox, diaper not nappy, crib not
  cot, bandage not plaster, plastic wrap not cling film, parchment not
  greaseproof.
- **Groceries:** superfine sugar, self-rising flour, baking soda, zucchini,
  eggplant, heavy cream.
- **Money:** dollars and cents. Never pence or pounds.
- **Measurements:** cups and spoons first. Grams and millilitres only where a
  recipe genuinely needs them.
- **Keep "autumn".** It is standard American English in writing, and the book
  uses fall/falls/falling eighty times for toppling towers. Converting it
  produces "the fall will stop".

**The plant and weather calendar must be American too.** v1's phenology is
British: snowdrops in February, frogspawn in late March, blackthorn, elder,
bluebell woods, cow parsley, hazel catkins. Write what is actually outside in
that month where the reader lives, and prefer plants that are widespread
across the US.

`tools/pipeline/americanise.py` does the mechanical sweep. Run it after any
merge, then re-validate.

## Writing style — apply to every day, no exceptions

The rules are inline below. Do not replace them with a pointer to a skill
file. An earlier version of this section said "follow `.claude/skills/stop-slop`
if present"; that directory is empty and untracked, so the instruction never
fired once, and week 1 had to be rewritten because of it.

**Cut**

- Throat-clearing: "Here's the thing / what / why", "The truth is", "It turns
  out", "The real X is", "Let me be honest", "Can we talk about".
- Emphasis crutches: "Full stop.", "Let that sink in.", "This matters
  because", "Make no mistake".
- Filler: "At its core", "It's worth noting", "At the end of the day", "When
  it comes to", "The reality is", "In a world where".
- All adverbs. No -ly words. Kill: really, just, literally, genuinely,
  honestly, simply, actually, deeply, truly, fundamentally.

**Never write**

- Binary contrasts: "not X, it's Y", "X isn't the problem, Y is", "stops being
  X and starts being Y", "not just X but also Y". State Y directly and drop
  the negation.
- Negative listing: "Not a X. Not a Y. A Z." State Z.
- Dramatic fragments: "[Noun]. That's it. That's the thing."
- Rhetorical setups: "What if...?", "Think about it:", "And that's okay."
- Em dashes in prose. Use commas, periods or parentheses.
- Wh- sentence openers. Lead with the subject instead.
- Passive voice and false agency. Name the person, or use "you" to put
  Brooklyn in the scene.
- Narrator-from-a-distance: "People tend to", "Nobody designed this".
- Vague declaratives: "The implications are significant". Name the thing.

**Rhythm**

Vary sentence length. Do not let three consecutive sentences match. Do not end
every paragraph on a punchy one-liner; that tic ran through all seven of
week 1's days before the rewrite.

### Four exceptions, learned the hard way

Style never outranks a working instruction. Brooklyn is executing these steps
with a three-year-old.

1. **Schedule rows keep their em dashes.** `- **9:15–10:15 AM** — 🎨 The Main
   Event: X` is the format set by CONTINUATION.md section 3. It is a table,
   not prose. Leave all 15 rows alone.
2. **Safety absolutes stay.** "Never leave Kreston in there on his own" is
   literally true and load-bearing. Cut "never" and "always" only where they
   are decoration, as in "a tower that never falls taught her nothing".
3. **Materials lists and numbered steps are exempt** from "two items beat
   three". Every material and quantity stays. Step counts are fixed by
   section 3: 4–6 for the Main Event, 5–7 for the Second Main Event.
4. **Titles are frozen once logged.** Activity names and insight headlines
   live in `tools/titles.tsv`, and the week opener quotes the seven headlines
   verbatim. Renaming one breaks three files at once.

### Self-check before every commit

```powershell
Select-String -Path months\*.md -Pattern '—' | Where-Object { $_.Line -notmatch '^- (\*\*\d|\[)' }
```

Every hit is an em dash in prose. Fix them before you validate. The filter
already drops the two structural uses: schedule rows (`- **9:15–10:15 AM** —`)
and booklet contents rows (`- [**Week 1** · …](#week-1) —`). Nothing else gets
a pass.

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

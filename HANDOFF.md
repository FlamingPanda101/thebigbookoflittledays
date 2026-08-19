# HANDOFF — the book is complete

**All 365 days are written, audited and pushed.** An earlier version of this
file said November and December were not written; that was true in the session
that wrote it and stale ever since. Trust the files in `months/`, not old
status documents. If a status claim here ever disagrees with the files, the
files win.

## Where it lives

Public repo: https://github.com/FlamingPanda101/thebigbookoflittledays
Live site:   https://flamingpanda101.github.io/thebigbookoflittledays/

The site is generated into `docs/` by `node tools/site/build.mjs` and served
by GitHub Pages from `main` `/docs`. Rebuild and push after any content edit,
or the site keeps serving the previous text.

## What the repo holds

| Piece | Files | Status |
|---|---|---|
| Front matter | `months/00-front.md` | done |
| 12 booklet covers | `months/NN-mon-00-cover.md` | done |
| 52 weeks, Days 1–364 | `months/NN-mon-wNN.md` | done |
| Day 365, the Grand Finale | `months/12-dec-w53-finale.md` | done |
| 12 backup sections | `months/NN-mon-zz-backup.md` | done |
| Master Activity Index | `months/99-back-01-index.md` | done |
| Keepsake Tracker | `months/99-back-02-keepsake.md` | done |

80 files, ~638,000 words assembled. `The-Big-Book-of-Little-Days-2027.md` at
the root is generated from `months/` and never edited by hand.

## What has been done since the writing finished

- Eleven audit passes, then a full per-day read of all 410 units (365 days,
  covers, backups, back matter) and four converging repair rounds. Every
  finding fixed and verified by hostile whole-page re-readers.
- The whole book is **US English**. The one deliberate exception is the word
  "autumn", plus proper names such as the Plough. Any extract carrying
  British vocabulary (lolly sticks, pram, wardrobe) predates the conversion
  and must be re-pulled from current source.
- Structure is machine-checked: 365/365 days, every date correct against the
  real 2027 calendar, 16 schedule rows per day, every row matching its
  section heading character for character, Main Event 4–6 steps, Second Main
  Event 5–7, Afternoon Alternatives 3–4 bullets, Out Again 4–6, insight
  bodies 100–120 words, 1,533 unique activity titles, 504 anchors with zero
  dead links, Out Again totals Swimming 52 / Library 26 / Museum 12.

## Decisions that are settled (do not re-open)

- No personal messages from Joseph anywhere in the book.
- No swimming lessons; the family has a pool membership.
- No first-word thread, no tree thread.
- Water supervision is arm's reach; never a one-adult-per-child rule.
- Twelve handprints, one per calendar month, both children on one sheet.
- The growth chart is offered in all twelve months as an option.
- Twelve printable monthly booklets, split on whole weeks.

## If you edit any content

Run the gates before committing; they take seconds and catch structural and
safety regressions:

```
python tools/validate.py
python tools/pipeline/deepcheck.py
python tools/pipeline/audit.py
python tools/pipeline/sweeps.py
```

Then regenerate the assembled volume from `months/` (see `ship.ps1`, which
pins UTF-8 both directions).

## Things learned the hard way. Do not relearn them.

**Read whole days, not sections.** The worst defects found across the whole
project were contradictions *between* correct-looking blocks on one page: a
step inviting a child to lick an ice block the Safety line kept off her face;
a Get Outside handing her cow parsley the Safety block reserved for the adult
because of hemlock lookalikes; a Safety block and an insight giving opposite
instructions about the same object. Section-by-section checking finds none of
these. After every edit, re-read the entire day; the knock-on rate across
four repair rounds fell from 83% to 4% on that one rule.

**Do not run a separate trim pass over finished days.** It was tried on three
months and damaged content in all three. An agent trimming one day out of
context trades meaning for word count.

**Days slightly over the word ceiling are acceptable.** Intact and coherent
beats tight and gutted.

**State the counting method whenever you give an agent a word target.**
Agents count prose about 78 words lower than `wc.py` does.

**Long-running draft agents fail on transient API errors**, and one reported
success having written 1 day of 7. Count outputs before trusting reports.

**A check that cries wolf gets ignored.** Every mechanical check in
`tools/pipeline/` was narrowed until its false-positive rate was near zero;
the first drafts of two sweeps fired 178 and 541 times. Do not add a noisy
check to the gate.

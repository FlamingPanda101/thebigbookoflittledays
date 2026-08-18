export const meta = {
  name: 'grand-audit',
  description: 'Whole-book audit: the things never checked across all 365 days at once',
  phases: [
    { title: 'Audit', detail: 'six dimensions no earlier audit covered' },
    { title: 'Consolidate', detail: 'rank, strike taste, verdict on print readiness' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'
const EX = REPO + '/tools/pipeline/extract-all'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a printed 365-day activity
book. Joseph wrote it for Brooklyn, the mother of his children, to use with
Azlyn (three until December 20, four after) and Kreston (six months on Day 1,
eighteen by December). She reads it at 8:00 in the morning.

STRUCTURE: 12 printable booklets. Each has a cover, four or five week files
(each a week opener plus seven days), and a backup section with two bad
weather days, two sick days and an extras page. Day 365 stands alone. Front
matter opens the volume; a Master Activity Index, Keepsake Tracker and closing
note end it. 81 files, 472,000 words.

WHAT HAS ALREADY BEEN AUDITED AND FIXED, so do not re-report it:
- Days 1-182 and 183-364 were each audited across seven dimensions and the
  findings fixed: safety contradictions, choke hazards, water supervision,
  materials realism, within-half repetition, insight accuracy, season fit.
- The twelve covers: every hazard traced to a real day.
- The backup sections: season fit, sick-day rules, pantry-only materials.
- The back matter: link integrity, index coverage of all 60 backup sections.
- The 52 notes: adversarially read, the repeated move broken, six factual
  errors fixed.
- Structural checks all pass: 365 days, calendar 365/365, 1,580 unique titles,
  505 anchors and zero dead links, zero em dashes in prose, zero banned
  adverbs.

YOU ARE LOOKING FOR WHAT ONLY APPEARS WHEN THE WHOLE BOOK IS IN VIEW AT ONCE.
Every earlier audit read a half, a month, or one page type. Nobody has read
across the seam.

Be honest and rank honestly. If a dimension is in good shape, say so and
report few findings. Padding buries the real ones.
`

const RETURN = `
RETURN JSON only:
{"dimension":"...","overallVerdict":"one honest sentence","findings":[
{"severity":"critical|major|minor","days":[N],"problem":"quote the exact text",
"why":"what happens to a reader","fix":"the specific change"}]}
`

phase('Audit')

const DIMS = [
  {
    key: 'cross-half', label: 'repetition across the halves',
    prompt: `Find activities that REPEAT ACROSS THE TWO HALVES of the year.

FILE: ${EX}/titles-and-tips.txt (every day's section names and Tips, all 365)

Days 1-182 were audited against themselves. Days 183-365 were audited against
themselves. NOBODY HAS CHECKED ONE HALF AGAINST THE OTHER. A February activity
repeating in September would have passed every check so far, because the names
are unique and only the idea is the same.

1. Activities in the first half and the second half that are effectively THE
   SAME ACTIVITY under different names. Name both days and say what makes them
   the same. Look especially at: baking and dough, painting and printing,
   sorting and matching, building with boxes, water play, nature collecting,
   shadow and light, sound and instruments, pretend shops and cafes.
2. A Tip in one half that makes the same point in the same words as a Tip in
   the other.
3. A structural tic that runs the whole year rather than one half.

The book is 365 days long, so SOME return of a form is right and good. A
child benefits from meeting an idea again with more skill. Flag the ones where
the SECOND instance adds nothing, and say so plainly when a return is earned.`,
  },
  {
    key: 'threads', label: 'the year-long threads',
    prompt: `Check the year-long threads actually pay off across 365 days.

READ: ${REPO}/months/01-jan-w1.md (Day 1 starts them all),
${REPO}/months/12-dec-w53-finale.md (Day 365 closes them),
${REPO}/months/99-back-02-keepsake.md (the tracker that claims to hold them),
and search the other month files for where each thread is picked up.

THE THREADS, from CONTINUATION.md section 13:
  the time capsule, sealed Day 1, opened Day 365
  the growth chart, marked Day 1, re-measured across the year
  the handprints, one a month, twelve sheets
  the forks, Azlyn's job every night from Day 1
  the same walk, walked Day 1 and again each season
  the message bottle, sealed Day 209, opened Day 365

1. Does each thread ACTUALLY GET PICKED UP between its start and its end, or
   does it vanish for months and reappear at the finale? Give the day numbers
   where each is touched.
2. THE HANDPRINTS specifically: the book claims twelve, one a month. Find all
   twelve. If a month has none, say which.
3. Does any thread contradict itself across the year: a different container, a
   different place on the wall, a different set of questions?
4. Does Day 365 close anything that was never actually started, or leave
   anything started unclosed?`,
  },
  {
    key: 'insights', label: 'the 413 insights as a body',
    prompt: `Read all 413 insights as one body of advice.

FILE: ${EX}/insights.txt (365 day insights; the backup sections hold 48 more
in ${REPO}/months/*zz-backup.md)

Each was checked for accuracy within its own half. Nobody has asked whether
they COHERE as a year of advice to one parent about one child.

1. CONTRADICTIONS across the halves. Does an insight in March tell her one
   thing and an insight in October the opposite? Quote both.
2. THE DEVELOPMENTAL ARC. Azlyn is three for 353 days and four for twelve. Do
   the insights track a child who is growing, or could they be shuffled? Does
   December's advice assume more than March's?
3. Any claim that is WRONG. Be strict: this is where the book claims
   authority. Invented statistics, "research shows" with nothing behind it, a
   milestone attributed to the wrong age.
4. Anything that would land badly for a parent having a hard year, or that
   implies a child who does not do the described thing is behind.
5. Do the insights ever gang up: five in a row that all say let her struggle,
   or all say slow down?`,
  },
  {
    key: 'family', label: 'the family across 365 days',
    prompt: `Track the family across the whole year.

FILES: ${EX}/infant.txt (Kreston's two blocks every day) and
${EX}/insights.txt

KRESTON: 6 months Day 1, 7 from Day 5, 8 from 36, 9 from 64, 10 from 95,
11 from 125, ONE on Day 156, 13 from 186, 14 from 217, 15 from 248, 16 from
278, 17 from 309, 18 from 339.
AZLYN: three until Day 353, FOUR from Day 354.

1. Does Kreston's arc read as ONE CHILD GROWING, or as twelve separate babies?
   Is there a month where he stalls or goes backwards?
2. Is the transition at Day 156, his first birthday, handled as a real change
   or just a number?
3. AZLYN TURNING FOUR on Day 354. The last twelve days are the only ones where
   she is four. Does the book treat her differently, or is it the same
   three-year-old with a new number?
4. Does the book ever forget one of them for a stretch of days?
5. BROOKLYN. She is the reader and the doer. Across 365 days, is she ever
   written as incompetent, scolded, or lectured? Quote anything that reads
   that way.`,
  },
  {
    key: 'spec', label: 'conformance to the build spec',
    prompt: `Check the finished book against its own specification.

READ ${REPO}/CONTINUATION.md IN FULL, then test the book against it.

1. SECTION 3, the day format. Every day should carry the sixteen listed
   sections in order. Spot-check at least twenty days spread across the year,
   including one from each booklet, and report any that deviate.
2. SECTION 5, the Out Again rotation. It asserts specific year totals:
   Swimming 52, Library 26, Museum 12, no other destination above 11. Count
   them across the book using ${EX}/outdoor.txt and report the real numbers.
3. SECTION 6, the 52 week themes. Check each week's opener theme against the
   table.
4. SECTION 8, the booklet structure. Twelve booklets split on whole weeks,
   Jan 1-5, Feb 6-9, Mar 10-13, Apr 14-18, May 19-22, Jun 23-26, Jul 27-31,
   Aug 32-35, Sep 36-39, Oct 40-44, Nov 45-48, Dec 49-52 plus Day 365.
5. SECTION 15, the open questions. Two were listed as unresolved: the word
   count question, and three sidebars needing writing. Are they resolved in
   the finished book?
6. Anything the spec asks for that the book does not have, or the book has
   that the spec never asked for.`,
  },
  {
    key: 'reader', label: 'reading it as a parent would',
    prompt: `Read the book the way Brooklyn would and report what fails her.

Do not read it end to end. Read it the way it gets used:
  - Open ${REPO}/months/01-jan-00-cover.md, then Day 1, cold, as a person who
    has never seen the book. Can she run that day?
  - Jump to a random Tuesday in June (${REPO}/months/06-jun-w24.md) and try to
    run it with no context.
  - It is raining and she has ten minutes: can she get from the front matter
    to something usable? Try it and describe the path.
  - A child is sick in November: find the sick day and see whether it works.
  - She wants to know what she needs for next week: is the shopping list
    enough to shop from?

1. Where does the book assume knowledge she does not have at that moment?
2. Where does it assume prep she was never told to do?
3. Is anything unfindable? The Index, the backup days, the threads?
4. At 8:00 in the morning, is a day scannable in thirty seconds, or does she
   have to read prose to find out what is happening?
5. What would make her put the book down and not pick it up again?

This is the most subjective dimension and the most important. Be specific and
quote pages.`,
  },
]

const results = await pipeline(
  DIMS,
  (d) => agent(`${CONTEXT}\n\n${d.prompt}\n\n${RETURN}`,
    { label: `grand:${d.key}`, phase: 'Audit', effort: 'high' })
)

phase('Consolidate')

const merged = await agent(
`Consolidate the whole-book audit of a finished 365-day activity book.
${CONTEXT}

Six auditors each took one dimension and could not see each other's findings:

${results.map((r, i) => `--- ${DIMS[i].label} ---\n${typeof r === 'string' ? r : JSON.stringify(r)}`).join('\n\n')}

YOUR JOB:
1. Merge duplicates into single findings.
2. Rank honestly across dimensions. A defect that fails a parent on the day
   outranks a stylistic observation.
3. STRIKE anything that is taste, or that an earlier audit already fixed, or
   that the brief told them not to report. Say how many you struck and why.
4. Split into MUST FIX BEFORE PRINT and WORTH FIXING. Be ruthless. This book
   has been through many audits and is going to design; a long list of
   nice-to-haves is worse than a short list of real problems.
5. Give an honest verdict on whether the book is ready to print. If it is,
   say so plainly and without hedging.

RETURN JSON only:
{"verdict":"honest paragraph","readyToPrint":true|false,
"struck":{"count":N,"why":"..."},
"mustFix":[{"days":[N],"dimension":"...","problem":"...","why":"...","fix":"..."}],
"worthFixing":[{"days":[N],"dimension":"...","problem":"...","fix":"..."}],
"dimensionVerdicts":{"crossHalf":"...","threads":"...","insights":"...","family":"...","spec":"...","reader":"..."}}`,
  { label: 'consolidate', phase: 'Consolidate', effort: 'high' })

return { merged, raw: results }

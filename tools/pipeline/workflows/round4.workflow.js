export const meta = {
  name: 'round4',
  description: 'Verify round three landed whole, and sweep the two classes it exposed across all 365 days',
  phases: [
    { title: 'Read', detail: 'five slices: two verification, three whole-book sweeps' },
    { title: 'Verdict', detail: 'ship or name what is left' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a designer. Brooklyn reads it at 8:00 in the morning and runs the day off
the page with Azlyn (three, four from Day 354) and Kreston (six months on Day
1, eighteen by December). 81 files in ${REPO}/months.

THREE ROUNDS OF WHOLE-PAGE READING HAVE HAPPENED AND EACH FOUND THE SAME
SHAPE OF DEFECT: a correction lands in one block of a day while another block
on the same page still tells the reader the old thing. Round two found ten of
round one's fixes had landed in the Safety block only. Round three found nine
more, two of them created by round two's edits. Every round has caught the
previous round's repairs, so assume this one will too.

ROUND THREE'S FIXES, ALL NOW APPLIED:
  Day 351  holly dropped from the reaching-in list in Get Outside
  Day 3    the bean now travels back in a closed hand, never into his
  Day 203  4:15 row renamed to "The Eight Pegs, Off the Line"; scrape clock
           moved from ten o'clock to half past nine; freezer back-reference
           changed from 9:30 to 9:15
  Day 238  "abandon the other five" became "the other three" (six stalls)
  Week 11  opener "wet cotton yarn" became "wet cotton balls"
  Day 5    materials went from one baking tray to two plus a cold third
  Day 4    Prep Tonight day labels corrected to Tuesday and tomorrow
  Day 45   the picked berry stem removed from the infant block
  Days 170, 179  punnet became pint in four places
  Day 291  "queues on the ramp" became "lines up on the ramp"

JOSEPH'S SETTLED DECISIONS. Do not re-argue these or report their absence:
- No personal messages from Joseph anywhere.
- No swimming lessons; the family has a pool membership.
- No first-word thread, no tree thread.
- No one-adult-per-child water rule; arm's-reach supervision replaced it.
  NEVER recommend restoring it.
- Twelve handprints, one per calendar month, both children on one sheet.
- Growth chart offered in all twelve months as an option.
- US English, except "autumn", and except proper names like the Plough.
- No em dashes in prose, no adverbs (really, just, literally, genuinely,
  honestly, simply, actually, deeply, truly, fundamentally), no binary
  contrasts, no passive voice, no Wh- sentence openers, wrap near 78 columns.

ALL DETERMINISTIC GATES PASS: 365 days, correct dates, 16 rows per day, every
row matching its section heading exactly, insight word bands, 1,533 unique
titles, 504 anchors and zero dead links, Swimming 52 / Library 26 / Museum 12,
no ragged blockquotes. Do not re-check any of that.

Report only what a reader running the day would actually hit. If your slice is
clean, say so and report nothing.
`

const RETURN = `
RETURN JSON only, under 1200 words:
{"slice":"...","clean":true|false,"issues":[
{"severity":"critical|major|minor","file":"months/...","days":[N],
"problem":"quote both sides","fix":"the specific change"}]}
`

const SLICES = [
  {
    key: 'verify-r3',
    prompt: `SLICE: did round three land whole? Read each of these days ENTIRELY.

  Day 3, 4, 5   ${REPO}/months/01-jan-w1.md
  Day 45        ${REPO}/months/02-feb-w7.md
  Day 203       ${REPO}/months/07-jul-w29.md
  Day 238       ${REPO}/months/08-aug-w34.md
  Day 351       ${REPO}/months/12-dec-w51.md
  Week 11 opener ${REPO}/months/03-mar-w11.md
  Days 170, 179 ${REPO}/months/06-jun-w25.md, 06-jun-w26.md

For each, check every other block on the page still agrees with the change.
Day 203 deserves the most care: verify the peg clock now works end to end.
Eight pegs, one off every half hour starting at half past nine, should leave
two on the line at lunch and put the last peg at the 1:00 event. Check the
Opening Activity, step 5, step 6, the Second Main Event, the Safety block,
the 4:15 row and the week 29 opener all tell the same story about the tray,
the line and the times.

Day 5: confirm nothing else on the page or in the week 1 shopping list now
disagrees about how many trays. Day 4: confirm the corrected Prep Tonight
matches what Day 4 and Day 5 actually do.`,
  },
  {
    key: 'clocks',
    prompt: `SLICE: numeric and clock arithmetic across all 365 days.

Round three found a day where eight pegs coming off half-hourly could not
reach the time the day said they would. That class has never been swept.

Grep ${REPO}/months/*w*.md for times in prose (patterns like "at ten", "every
half hour", "by lunch", "twenty minutes", "at four", "since 9:15") and for
counted sets ("the five tests", "six squares", "eight pegs", "twelve sheets",
"the four questions", "three of them", "the ten she"). Where a day states a
count or a schedule in prose, CHECK IT AGAINST WHAT THE DAY ACTUALLY LISTS
AND AGAINST THE SIXTEEN SCHEDULE ROWS.

Report only arithmetic that does not work: a count that disagrees with the
items on the page, an elapsed time that cannot reach the stated end, an
activity said to happen at a clock time the schedule gives to something else.

Prioritize days that run a timed sequence: freezing, baking, rising dough,
growing seeds, melting, drying, a countdown. Sample at least 40 days across
all twelve months, and say how many you checked.`,
  },
  {
    key: 'rows-vs-day',
    prompt: `SLICE: do the free-text schedule rows still describe the day?

The five named activity rows are machine-checked against their headings and
pass. The OTHER rows are free text and nothing checks them:
  Morning Meeting, Snack, Free Play, Wiggle Time, Lunch, Book Time,
  Snack & Free Play, Her Job, Quiet Play, Wind-Down, Dinner.

Round three found a 4:15 "Quiet Play: The Peg Line" row on a day whose own
Safety block takes the peg line down at 1:00.

Read the Quiet Play, Wind-Down, Book Time and Her Job rows across at least 60
days spread over all twelve months in ${REPO}/months/*w*.md. For each, check
the thing it names still exists at that hour on that day: not taken down
earlier, not eaten, not sealed in a box, not still at the store.

Also check the 12 backup sections in ${REPO}/months/*zz-backup.md for the same
thing. Report only rows naming something the day has already ended or never
had.`,
  },
  {
    key: 'hazard-sweep',
    prompt: `SLICE: one last whole-book hazard consistency sweep.

Three rounds have moved hazard rules between blocks. Confirm the book now
rules the same way on the same hazard everywhere.

Grep all of ${REPO}/months and read every hit in context for:
  holly, yew, ivy, mistletoe, daffodil, bramble, Virginia creeper, buckeye
  bottle caps, buttons, coins, beads, marbles, nuts, whole grapes, ice cubes
  string, cord, rope, ribbon, line (at neck or shin height)
  standing water, paddling pool, bucket, bowl, dishpan, sink

For each hazard class, answer: does every day that involves it carry the same
rule, and does any day let a child do what another day forbids? Quote both
sides where they disagree.

Kreston mouths everything, has a pincer grip from about nine months, walks
from about twelve, and climbs from about sixteen. Azlyn is three until Day
353. The one-adult-per-child water rule was removed on purpose and arm's
reach replaced it; that is settled and not a finding.`,
  },
  {
    key: 'cold-read',
    prompt: `SLICE: read ten days cold, chosen at random, as Brooklyn would.

Pick one day from each of these ranges and read it start to finish with no
other context, then say whether you could run it: 8-30, 55-80, 100-125,
140-160, 175-200, 215-240, 250-275, 285-310, 320-340, 355-365.
Do not pick days this session has edited if you can avoid it, because the
point is to sample the parts nobody has looked at recently.

For each day answer:
1. Could you run it at 8:00 in the morning with two children in the room?
2. Does it assume prep you were never told to do, or knowledge you do not
   have at that moment?
3. Is anything in it unsafe, unclear, or impossible as written?
4. Does the page contradict itself anywhere?
5. Is there a moment in it worth having, or is it filler?

Name the days you read. Be honest about quality, not only correctness. This
is the only slice looking at parts of the book nobody has audited in this
session, so it is the best evidence about whether the rest is sound.`,
  },
]

phase('Read')

const out = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `r4:${s.key}`, phase: 'Read', effort: 'high' })
)

phase('Verdict')

const verdict = await agent(
`Final call. Does this book go to the designer?
${CONTEXT}

Five readers took the fourth pass:

${out.map((r, i) => `--- ${SLICES[i].key} ---\n${typeof r === 'string' ? r.slice(0, 7000) : JSON.stringify(r).slice(0, 7000)}`).join('\n\n')}

YOUR JOB:
1. Name anything where a page still contradicts itself or a fix left another
   block on the old version.
2. Strike taste, settled decisions, and anything a reader would never hit.
3. Weigh the cold-read slice heavily. It sampled parts of the book nobody has
   touched this session, so it is the best evidence about the other 300 days.
4. Answer plainly: DOES THIS GO TO THE DESIGNER NOW? If yes, say yes without
   hedging, and say what your confidence rests on.

RETURN JSON only:
{"readyForDesign":true|false,"verdict":"an honest paragraph for Joseph",
"remaining":[{"file":"...","days":[N],"problem":"...","fix":"..."}]}`,
  { label: 'verdict', phase: 'Verdict', effort: 'high' })

return { verdict, out }

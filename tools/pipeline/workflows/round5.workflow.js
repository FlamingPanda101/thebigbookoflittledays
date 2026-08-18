export const meta = {
  name: 'round5',
  description: 'Triage the 50 hazard-coverage candidates and cold-read 30 untouched days',
  phases: [
    { title: 'Work', detail: 'four triage slices, three cold-read slices' },
    { title: 'Verdict', detail: 'ship or name what is left' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a designer. Brooklyn reads it at 8:00 in the morning and runs the day off
the page with Azlyn (three, four from Day 354) and Kreston (six months on Day
1, eighteen by December). 81 files in ${REPO}/months.

WHERE THIS STANDS. Four rounds of whole-page reading each found the same
defect shape and each also found the previous round's repairs. Round four read
ten days nobody had touched and six fought themselves, which said the problem
was a generator flaw across all 365 days rather than a punch list. Two
mechanical sweeps were built in response, ${REPO}/tools/pipeline/sweeps.py.

SWEEP A is closed. It asks whether a 4:00, 4:15 or 5:00 row hands back an
object the same page already retired. It found the ten that shipped; after
those fixes it returns four candidates and all four are deliberate.

SWEEP B is what you are triaging. It asks whether standing water, ice,
mouth-size parts or an open flame appear in a day's own materials or numbered
steps with no matching line in that day's own Safety block.

Already fixed this session, do not re-report: Days 3, 4, 5, 18, 45, 46, 71,
113, 132, 156, 203, 233, 238, 250, 266, 280, 284, 290, 291, 295, 298, 299,
324, 345, 347, 351, 364, and the August and April backup days.

JOSEPH'S SETTLED DECISIONS. Do not re-argue these:
- No personal messages from Joseph anywhere.
- No swimming lessons; the family has a pool membership.
- No first-word thread, no tree thread.
- No one-adult-per-child water rule; arm's-reach supervision replaced it.
  NEVER recommend restoring it or asking for a second adult.
- Twelve handprints, one per calendar month; growth chart offered all twelve.
- US English except "autumn" and proper names like the Plough.
- No em dashes in prose, no adverbs (really, just, literally, genuinely,
  honestly, simply, actually, deeply, truly, fundamentally), no binary
  contrasts, no passive voice, no Wh- sentence openers, wrap near 78 columns.

ALL DETERMINISTIC GATES PASS and do not need re-checking.
`

const RETURN = `
RETURN JSON only, under 1400 words:
{"slice":"...","clean":true|false,"issues":[
{"severity":"critical|major|minor","file":"months/...","days":[N],
"problem":"quote the page","fix":"the exact sentence to add or change"}]}
`

const TRIAGE = `
HOW TO TRIAGE. For each candidate, open the day and read it whole. Decide:

  REAL: the hazard is genuinely present at a child's level during that day's
  activity, and no sentence anywhere on the page covers it. Kreston mouths
  everything, has a pincer grip from nine months, walks from twelve, climbs
  from sixteen. Standing water at floor level, ice cubes handed to the baby,
  bottle caps or beads on the floor, a lit candle within reach.

  NOT REAL: the hazard is on a table with an adult at it and the page says so;
  the item is out of the day's own reach by its own words; another sentence on
  the page already covers it in different words; the "hazard" is incidental
  (a match named in a simile, a bowl used only by the adult at the stove).

Report ONLY the real ones, each with the exact sentence to add to that day's
Safety block, written in house voice. Being ruthless is the job. A safety line
on a day that does not need one trains the reader to skip safety lines, which
is how the ones that matter get missed.
`

const SLICES = [
  {
    key: 'triage-q1',
    prompt: `SLICE: triage the Sweep B candidates for JANUARY TO MARCH.

The full candidate list is ${REPO}/tools/pipeline/SWEEP-B-CANDIDATES.txt.
Take only the entries for files 01-jan, 02-feb and 03-mar.
${TRIAGE}`,
  },
  {
    key: 'triage-q2',
    prompt: `SLICE: triage the Sweep B candidates for APRIL TO JUNE.

The full candidate list is ${REPO}/tools/pipeline/SWEEP-B-CANDIDATES.txt.
Take only the entries for files 04-apr, 05-may and 06-jun.
${TRIAGE}`,
  },
  {
    key: 'triage-q3',
    prompt: `SLICE: triage the Sweep B candidates for JULY TO SEPTEMBER.

The full candidate list is ${REPO}/tools/pipeline/SWEEP-B-CANDIDATES.txt.
Take only the entries for files 07-jul, 08-aug and 09-sep.
${TRIAGE}`,
  },
  {
    key: 'triage-q4',
    prompt: `SLICE: triage the Sweep B candidates for OCTOBER TO DECEMBER.

The full candidate list is ${REPO}/tools/pipeline/SWEEP-B-CANDIDATES.txt.
Take only the entries for files 10-oct, 11-nov and 12-dec.
${TRIAGE}`,
  },
  {
    key: 'cold-a',
    prompt: `SLICE: read ten days cold, as Brooklyn would at 8:00 in the morning.

Pick ONE day from each range, avoiding any day listed as already fixed:
  10-25, 33-44, 50-63, 75-90, 96-112, 115-128, 133-151, 158-181, 188-202,
  205-218.

Read each start to finish with no other context. For each, answer:
1. Could you run it with two children in the room?
2. Does it assume prep you were never told to do, or knowledge you do not
   have at that moment?
3. Is anything unsafe, unclear, or impossible as written?
4. DOES THE PAGE CONTRADICT ITSELF ANYWHERE? This is the main question. Check
   every block against every other block: prep against materials, steps
   against Safety, the infant blocks against both, the schedule rows against
   what the day actually does, the Tip against the step it follows.
5. Is there a moment in it worth having?

Name the days you read and give an honest count of how many were clean.`,
  },
  {
    key: 'cold-b',
    prompt: `SLICE: read ten more days cold, as Brooklyn would at 8:00.

Pick ONE day from each range, avoiding any day listed as already fixed:
  219-232, 234-249, 251-265, 268-279, 285-297, 300-313, 315-323, 328-344,
  348-359, 360-363.

Read each start to finish with no other context. For each, answer:
1. Could you run it with two children in the room?
2. Does it assume prep you were never told to do?
3. Is anything unsafe, unclear, or impossible as written?
4. DOES THE PAGE CONTRADICT ITSELF ANYWHERE? This is the main question. Check
   every block against every other: prep against materials, steps against
   Safety, the infant blocks against both, the schedule rows against what the
   day actually does, the Tip against the step it follows.
5. Is there a moment in it worth having?

Name the days you read and give an honest count of how many were clean.`,
  },
  {
    key: 'cold-backup',
    prompt: `SLICE: read the backup sections cold, the pages reached on bad days.

From ${REPO}/months/*zz-backup.md, read SIX units in full, chosen across
different months and avoiding the April and August ones already fixed: two bad
weather days, two sick days and two extras pages.

For each:
1. Could a parent run it on the day she reaches for it, meaning a wet
   housebound day or a genuinely ill three-year-old?
2. Does it need anything not already in the house?
3. Does the page contradict itself, or contradict a main day?
4. Is the infant handled, and safely?
5. Is the extras page usable, or a list of names with no method?

These 60 sections get reached for at the worst moments of the year and have
had the least attention. Give an honest count of how many were clean.`,
  },
]

phase('Work')

const out = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `r5:${s.key}`, phase: 'Work', effort: 'high' })
)

phase('Verdict')

const verdict = await agent(
`Final call. Does this book go to the designer?
${CONTEXT}

Seven readers took the fifth pass. Four triaged the hazard-coverage
candidates; three read 26 units cold that nobody has touched this session:

${out.map((r, i) => `--- ${SLICES[i].key} ---\n${typeof r === 'string' ? r.slice(0, 6500) : JSON.stringify(r).slice(0, 6500)}`).join('\n\n')}

YOUR JOB:
1. List the real hazard-coverage gaps, merged, with the exact sentence each
   day needs.
2. WEIGH THE COLD READS ABOVE EVERYTHING ELSE. Round four's cold read found
   six of ten untouched days fighting themselves, and that is what stopped the
   book last time. Compare: what fraction came back clean now, and is the
   defect rate falling or flat? Say the numbers plainly.
3. Strike taste, settled decisions, and anything a reader would never hit.
4. Answer plainly: DOES THIS GO TO THE DESIGNER NOW? If yes, say yes without
   hedging and say what your confidence rests on. If no, say what is left and
   roughly how much work it is.

RETURN JSON only:
{"readyForDesign":true|false,
"coldReadCleanRate":"e.g. 22 of 26 clean",
"verdict":"an honest paragraph for Joseph",
"remaining":[{"file":"...","days":[N],"problem":"...","fix":"..."}]}`,
  { label: 'verdict', phase: 'Verdict', effort: 'high' })

return { verdict, out }

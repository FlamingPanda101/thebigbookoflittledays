export const meta = {
  name: 'final',
  description: 'Re-read all 410 units with fresh eyes and measure whether the clean rate moved off 56%',
  phases: [
    { title: 'Read', detail: '26 readers, the same units as the first full pass' },
    { title: 'Verdict', detail: 'the number, and ship or do not ship' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a print designer. Brooklyn reads it at 8:00 in the morning and runs the day
off the page with Azlyn (three until Day 353, four after) and Kreston (six
months on Day 1, eighteen by December).

THIS IS THE MEASUREMENT PASS. An identical pass ran before the repairs and
scored 410 units read, 230 clean, 56%, with 14 critical and 108 major. Those
122 were fixed, then 66 verifier residuals, then 22 more. You are re-reading
the same units to find out whether the clean rate actually moved. Your
daysRead and daysClean numbers are the point of this run, so count them
honestly. Do not soften the count to make the book look finished, and do not
invent findings to look thorough.

WHAT COUNTS AS NOT CLEAN. A unit is not clean if a reader running that day off
the page would hit a real problem:
1. A block contradicts another block on the same page. The Safety block
   forbids what a step instructs. An infant block puts Kreston somewhere the
   Safety block rules out. A 4:00, 4:15 or 5:00 row names an object an earlier
   step bagged, shelved, emptied or took down. A Tip needs a material the list
   does not carry.
2. The day creates a hazard with no line anywhere on the page. Kreston mouths
   everything, has a pincer grip from nine months, walks from twelve, and
   climbs from about thirteen. Standing water at floor level, ice, small
   parts on the floor, string at his height, open flame, hot pans, blades,
   toxic plants.
3. Prep Tonight does not cover what the day's own 8:00 and 9:15 blocks need.
4. Arithmetic that does not work: a count against the items on the page, an
   elapsed time that cannot reach its stated end, an activity at an hour the
   schedule gives to something else.
5. An insight, Tip or week-opener bullet describing a different day.

JOSEPH'S SETTLED DECISIONS. Never report these as defects:
- No personal messages from Joseph anywhere in the book.
- No swimming lessons. The family has a POOL MEMBERSHIP. Other people's
  lessons closing the pool is realistic and stays.
- No first-word thread. No tree thread.
- NO ONE-ADULT-PER-CHILD WATER RULE. Arm's-reach supervision replaced it.
  NEVER ask for a second adult. All 52 swimming days now carry one standard
  water line in their Safety block; that is correct and not a repetition
  defect.
- Twelve handprints, one per calendar month. Growth chart offered all twelve.
- US English except "autumn" and proper names such as the Plough.
- The book says Kreston climbs from about 13 months and that is correct.

ALL DETERMINISTIC GATES PASS: dates, 16 schedule rows, rows matching headings
character for character, insight word bands, unique titles, anchors and links,
rotation totals, no ragged blockquotes. Do not re-check any of that and do not
comment on wrap width or on prose style.

YOU ARE READ-ONLY. Report findings only.

Most units should now be clean. Say so when they are.
`

const RETURN = `
RETURN JSON only, under 1200 words. Report at most the six worst.
{"range":"Days N-M","daysRead":N,"daysClean":N,
"issues":[{"severity":"critical|major|minor","day":N,"file":"months/...",
"problem":"quote both sides","fix":"the exact change"}]}
`

const SLICES = []
for (let start = 1; start <= 365; start += 15) {
  const end = Math.min(start + 14, 365)
  SLICES.push({
    key: `d${start}-${end}`,
    prompt: `SLICE: Days ${start} to ${end}. Read EVERY one of them, whole.

Find the files with:  grep -l 'day-${start}"' ${REPO}/months/*.md

Read every block of every day in order, then ask the one question: DOES ANY
BLOCK ON THIS PAGE CONTRADICT ANY OTHER BLOCK ON IT, or does the day create a
hazard nothing on the page covers?

Report daysRead and daysClean honestly. The count is the point of this run.`,
  })
}
SLICES.push({
  key: 'backups',
  prompt: `SLICE: the twelve backup sections, ${REPO}/months/*zz-backup.md.

Each holds two bad weather days, two sick days and an extras page, 60 units in
all. Read every one. Same question, plus: is the sick-day advice safe for a
genuinely ill three or four year old, do the weather days run on what is
already in the house, and is Kreston handled safely with a sick sister in the
room?

Report unitsRead and unitsClean honestly.`,
})

phase('Read')

const out = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `final:${s.key}`, phase: 'Read', effort: 'high' })
)

const rows = out.filter(Boolean).map(r => {
  try { return typeof r === 'string' ? JSON.parse(r.slice(r.indexOf('{'), r.lastIndexOf('}') + 1)) : r }
  catch { return {} }
})
const read = rows.reduce((a, r) => a + (r.daysRead || r.unitsRead || 0), 0)
const clean = rows.reduce((a, r) => a + (r.daysClean || r.unitsClean || 0), 0)
const all = rows.flatMap(r => r.issues || [])
const crit = all.filter(i => i.severity === 'critical')
const maj = all.filter(i => i.severity === 'major')
log(`${read} read, ${clean} clean, ${crit.length} critical, ${maj.length} major`)

phase('Verdict')

const verdict = await agent(
`Give Joseph the number and the call.
${CONTEXT}

BEFORE THE REPAIRS: 410 units read, 230 clean, 56%. 14 critical, 108 major.
NOW: ${read} read, ${clean} clean, ${read ? Math.round(clean / read * 100) : 0}%. ${crit.length} critical, ${maj.length} major.

The critical and major findings from this pass:
${JSON.stringify([...crit, ...maj].map(i => ({ sev: i.severity, day: i.day, file: i.file, problem: (i.problem || '').slice(0, 320), fix: (i.fix || '').slice(0, 240) })))}

YOUR JOB:
1. State the movement plainly: 56% then, what now. Say whether that is real
   improvement or noise.
2. Strike any finding that is taste, a settled decision, or something a
   reader running the day would never hit. Say how many you struck.
3. Answer plainly: DOES THIS GO TO THE DESIGNER NOW?
   - If yes, say yes without hedging and say what your confidence rests on.
   - If no, say exactly what is left, how many items, and whether they are a
     day's work or a week's.
4. Joseph has been asking for this book to be 100% ready. Tell him the truth
   about what "ready" means for a 636,000 word book: name the residual risk
   he would be shipping with, in one honest sentence.

RETURN JSON only:
{"readyForDesign":true|false,
"cleanRate":"N of M, X%",
"movement":"one sentence on 56% then versus now",
"struck":N,
"verdict":"an honest paragraph for Joseph",
"remaining":[{"file":"...","days":[N],"problem":"...","fix":"..."}]}`,
  { label: 'verdict', phase: 'Verdict', effort: 'high' })

return { verdict, unitsRead: read, unitsClean: clean, critical: crit, major: maj }

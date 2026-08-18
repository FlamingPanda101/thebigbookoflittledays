export const meta = {
  name: 'everyday',
  description: 'Read all 365 days plus the 60 backup sections, one agent per fortnight, reporting only intra-page contradictions',
  phases: [
    { title: 'Read', detail: '26 readers, ~14 days each, whole pages' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a print designer. Brooklyn reads it at 8:00 in the morning and runs the day
off the page with Azlyn (three until Day 353, four after) and Kreston (six
months on Day 1, eighteen by December).

WHY YOU EXIST. Five rounds of sampling have each found the same defect shape,
and the clean rate on untouched days has not moved: round four scored 4 of 10,
round five 5 of 26. That says the defect is spread evenly across the book
rather than concentrated where the editing happened, so sampling cannot finish
it. You are part of a pass that reads EVERY day once.

THE DEFECT SHAPE, in order of how often it appears:
1. A block on the page contradicts another block on the same page. The Safety
   block forbids what a numbered step instructs. An infant block puts Kreston
   somewhere the Safety block rules out. A schedule row at 4:00, 4:15 or 5:00
   names an object an earlier step already bagged, shelved, emptied or took
   down. A Tip refers to a material the list does not carry.
2. A hazard the day itself creates with no line anywhere on the page covering
   it. Kreston mouths everything, has a pincer grip from nine months, walks
   from twelve, climbs from sixteen. Standing water at floor level, ice cubes,
   bottle caps or beads or coins on the floor, string at his height, an open
   flame, a hot pan, a blade, a toxic plant.
3. Prep Tonight does not cover what the day's own 8:00 and 9:15 blocks need.
4. Arithmetic that does not work: a count that disagrees with the items on the
   page, an elapsed time that cannot reach the stated end, an activity said to
   happen at an hour the schedule gives to something else.
5. An insight, Tip or week-opener bullet describing a different day.

JOSEPH'S SETTLED DECISIONS. Never report these as defects and never
recommend reversing them:
- No personal messages from Joseph anywhere in the book.
- No swimming lessons. The family has a POOL MEMBERSHIP and goes when it
  suits. Other people's lessons closing the pool is realistic and stays.
- No first-word thread. No tree thread.
- NO ONE-ADULT-PER-CHILD WATER RULE. It was deleted on his instruction and
  arm's-reach supervision replaced it. NEVER ask for a second adult.
- Twelve handprints, one per calendar month, both children on one sheet.
- The growth chart is offered in all twelve months as an option.
- US English, except "autumn" and proper names such as the Plough.
- House style: no em dashes in prose, no adverbs (really, just, literally,
  genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
  binary contrasts, no passive voice, no Wh- sentence openers, wrap near 78.

ALREADY FIXED, do not re-report: Days 3, 4, 5, 18, 45, 46, 70, 71, 107, 113,
132, 139, 152, 156, 161, 182, 203, 233, 238, 242, 247, 250, 266, 273, 274,
280, 284, 288, 290, 291, 295, 298, 299, 324, 325, 345, 347, 351, 361, 364,
and the April, August and November backup days.

ALL DETERMINISTIC GATES PASS: dates, 16 schedule rows, rows matching their
headings, insight word bands, unique titles, anchors and links, rotation
totals. Do not re-check any of that. Do not comment on wrap width.

YOU ARE READ-ONLY. Do not edit any file. Report findings only.

Be ruthless about what you report. A safety line added to a day that does not
need one trains the reader to skip safety lines, which is how the ones that
matter get missed. If a day is clean, say so. Most days should be clean.
`

const RETURN = `
RETURN JSON only, under 1600 words. Report at most the eight worst.
{"range":"Days N-M","daysRead":N,"daysClean":N,
"issues":[{"severity":"critical|major|minor","day":N,"file":"months/...",
"problem":"quote both sides of the contradiction","fix":"the exact sentence to add or change"}]}
`

// 26 slices: 25 fortnights of days plus the twelve backup files
const SLICES = []
for (let start = 1; start <= 365; start += 15) {
  const end = Math.min(start + 14, 365)
  SLICES.push({
    key: `d${start}-${end}`,
    prompt: `SLICE: Days ${start} to ${end}. Read EVERY one of them, whole.

Find the day files with:  grep -l 'day-${start}"' ${REPO}/months/*.md

For each day read every block in order: Prep Tonight, the sixteen schedule
rows, Opening Activity, Morning Meeting, The Main Event, Get Outside and its
infant block, Second Main Event, Afternoon Alternatives, Out Again and its
infant block, Her Job, Quiet Play, Wind-Down, the Parenting Insight and the
Safety block. Then ask the one question that matters: DOES ANY BLOCK ON THIS
PAGE CONTRADICT ANY OTHER BLOCK ON IT?

Also check that week's opener where it makes a claim about one of your days.

Report daysRead and daysClean honestly, then at most the eight worst issues.`,
  })
}
SLICES.push({
  key: 'backups',
  prompt: `SLICE: the twelve backup sections, ${REPO}/months/*zz-backup.md.

Each holds two bad weather days, two sick days and an extras page, so 60
units a parent reaches for on the worst days of the year. Read all twelve
files. Skip the April, August and November units already fixed.

Same question: does any block contradict another on the same page? Plus:
- Is the sick-day advice safe for a genuinely ill three-year-old, and does it
  ask for energy, appetite or being upright that she does not have?
- Do the bad weather days really run on what is already in the house?
- Is Kreston handled, and safely, with a sick sister in the room?
- None of the twelve extras pages carries a Safety block. Say whether any of
  them needs one and what it should say.
- December's backup calls Azlyn three; she is four from Day 354.

Report unitsRead and unitsClean honestly, then at most the eight worst.`,
})

phase('Read')

const out = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `read:${s.key}`, phase: 'Read', effort: 'high' })
)

const rows = out.filter(Boolean).map(r => {
  try { return typeof r === 'string' ? JSON.parse(r.slice(r.indexOf('{'), r.lastIndexOf('}') + 1)) : r }
  catch { return { range: 'unparsed', raw: String(r).slice(0, 800) } }
})
const read = rows.reduce((a, r) => a + (r.daysRead || r.unitsRead || 0), 0)
const clean = rows.reduce((a, r) => a + (r.daysClean || r.unitsClean || 0), 0)
const all = rows.flatMap(r => r.issues || [])
log(`${read} units read, ${clean} clean, ${all.length} issues reported`)

return {
  unitsRead: read,
  unitsClean: clean,
  cleanRate: read ? Math.round((clean / read) * 100) + '%' : 'n/a',
  critical: all.filter(i => i.severity === 'critical'),
  major: all.filter(i => i.severity === 'major'),
  minor: all.filter(i => i.severity === 'minor').length,
  byRange: rows.map(r => ({ range: r.range, read: r.daysRead || r.unitsRead, clean: r.daysClean || r.unitsClean })),
}

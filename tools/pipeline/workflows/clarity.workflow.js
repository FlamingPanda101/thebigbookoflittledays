export const meta = {
  name: 'clarity',
  description: 'Every activity opens on its feet: audit all 365 days for instructions that start mid-activity',
  phases: [
    { title: 'Fix', detail: 'twelve agents, one month each, whole pages' },
    { title: 'Verify', detail: 'hostile re-read of every touched day' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book,
live as a website and twelve print booklets. Brooklyn reads a day at 8:00 in
the morning and runs it off the page with Azlyn (three until Day 353, four
after) and Kreston (six months on Day 1, eighteen by December).

JOSEPH'S COMPLAINT, verbatim in spirit: Day 1's opening activity, "Sorting
the Build Box", started with "Tip the pile into the middle of the floor and
sit down in it with her." Not enough instructions. It starts in the middle of
the activity. I'm not sure what this box is and why I am sorting it.

THE DEFECT: a first step that assumes context the reader does not have at
that moment. "The pile", "the box", "the strips" with no antecedent on the
page. The prep that created the object happened last night and the reader
cannot be assumed to remember it, and on the website each activity is also
read on its own.

THE MODEL FIX, Day 1, already applied:
  BEFORE: "Tip the pile into the middle of the floor and sit down in it
           with her."
  AFTER:  "The recycling you emptied onto the table last night is today's
           building kit. Carry it to the living room, tip it into one pile
           in the middle of the floor, and sit down in it with her."

One sentence of orientation, folded into step 1. It names the object, ties
it to where it came from, and says where the activity happens. That is the
whole repair. Referencing last night's prep is GOOD, but name the thing:
"the jars you washed last night", never bare "the jars".

THE TEST for every first step: a reader who lands on this activity cold, who
did not read the prep line and cannot see yesterday's page, knows WHAT the
thing is, WHERE it came from or comes from now, and WHERE this is happening.
If the title names an object ("Sorting the Build Box"), the steps must make
that object real.

WHAT NOT TO DO:
- Do not pad. One orienting clause or sentence folded into step 1, or a
  rewritten step 1, is the fix. An activity that already opens on its feet
  gets NO edit. Most Main Events and Second Main Events have intro
  paragraphs and are already fine, as Joseph said himself.
- Do not add new steps to gated sections unless the count allows it: Main
  Event holds 4-6 numbered steps, Second Main Event 5-7. Opening Activity
  and Get Outside are not count-gated, but prefer rewriting step 1 over
  adding steps anywhere.
- Do not change what any activity IS. Same materials, same actions, same
  outcome. Clarity only.
- Do not touch Prep Tonight, schedules, titles, materials lists, Tips,
  insights, Safety blocks, or infant blocks unless a step edit orphans a
  reference in one, in which case re-read the whole day and reconcile.

HOUSE FORMAT, frozen: anchors, day headers, date lines, theme lines,
page-break divs. A schedule row and its section heading name the same
activity character for character. Insight bodies 100-120 words. 16 schedule
rows per day.

HOUSE STYLE: US English except "autumn" and proper names such as the Plough.
No em dashes in prose. No adverbs (really, just, literally, genuinely,
honestly, simply, actually, deeply, truly, fundamentally). No binary
contrasts, no dramatic fragments, no passive voice, no Wh- sentence openers.
Steps are single lines in the markdown (they do not wrap); prose blocks wrap
near 78 columns. LF endings.

SETTLED DECISIONS, never write toward them: no personal messages from
Joseph, no swimming lessons (pool membership), no first-word thread, no tree
thread, arm's-reach water supervision (never a second adult), twelve
handprints one per calendar month, growth chart offered all twelve months.

KRESTON'S AGES: 6 months Day 1, 7 from Day 5, 8 from 36, 9 from 64, 10 from
95, 11 from 125, ONE on Day 156, 13 from 186, 14 from 217, 15 from 248, 16
from 278, 17 from 309, 18 from 339.

AFTER EVERY EDIT, RE-READ THE ENTIRE DAY. The knock-on rate across this
project's repair rounds fell from 83% to 4% on that one rule.
`

const MONTHS = [
  { k: '01', name: 'January' }, { k: '02', name: 'February' },
  { k: '03', name: 'March' }, { k: '04', name: 'April' },
  { k: '05', name: 'May' }, { k: '06', name: 'June' },
  { k: '07', name: 'July' }, { k: '08', name: 'August' },
  { k: '09', name: 'September' }, { k: '10', name: 'October' },
  { k: '11', name: 'November' }, { k: '12', name: 'December' },
]

phase('Fix')

const out = await pipeline(
  MONTHS,

  (m) => agent(
`Audit ${m.name} for activities that start in the middle. ${CONTEXT}

YOUR FILES, and you are the only agent touching them:
  ${REPO}/months/${m.k}-*.md
(the week files and the zz-backup file; skip the cover)

FOR EVERY DAY in your month, read these four sections and judge their FIRST
STEP against the test: 🌅 Opening Activity, 🎨 The Main Event, 🌳 Get
Outside, 🎨 Second Main Event. Openings are where the defect lives, because
they have no intro paragraph; check the other three but expect most to pass.
Also run the same test over the backup file's activities.

Judge day by day. Where the first step assumes an unnamed object or an
unstated place, fold one orienting clause into it, in house voice, modeled
on the Day 1 fix. Where a later step is doing two unrelated jobs in one
line and the section is not count-gated, you may split it; prefer not to.

Day 1 is already fixed; do not touch it again (January agent).

RETURN JSON only, under 1100 words:
{"month":"${m.name}","edited":[{"day":N,"section":"opening|main|outside|second|backup","before":"first 8 words","after":"first 8 words"}],
"clean":N}`,
    { label: `fix:${m.k}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, m) => agent(
`Verify the ${m.name} clarity edits. Be hostile. ${CONTEXT}

FILES: ${REPO}/months/${m.k}-*.md

WHAT THE EDITOR REPORTED:
${typeof rep === 'string' ? rep.slice(0, 2600) : JSON.stringify(rep).slice(0, 2600)}

FOR EVERY DAY THE EDITOR TOUCHED, READ THE WHOLE DAY and check:
1. The edit is in the file. Claimed but absent is CRITICAL.
2. The first step now passes the cold-reader test: what the thing is, where
   it came from, where this happens.
3. The edit did not change what the activity is, did not contradict the
   materials list, the Tip, the Safety block, the schedule row, or the
   infant blocks, and did not break a step count (Main 4-6, Second 5-7).
4. House style holds: no em dash, no banned adverb, no binary contrast, no
   passive, no Wh- opener, steps stay on one line.
5. SAMPLE five days the editor called clean and re-run the cold-reader test
   on their openings. If any fails, report it; a lazy pass matters more
   than a bad edit.

RETURN JSON only:
{"month":"${m.name}","ok":true|false,
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `verify:${m.k}`, phase: 'Verify', effort: 'high' }
  )
)

const rows = out.flat().filter(Boolean)
const open = rows.flatMap(r => {
  try {
    const d = typeof r === 'string' ? JSON.parse(r.slice(r.indexOf('{'), r.lastIndexOf('}') + 1)) : r
    return d.issues || []
  } catch { return [] }
})
log(`${open.length} verifier issues open`)
return { open, rows }

export const meta = {
  name: 'majors',
  description: 'Clear the 44 majors from the measurement pass, six agents, whole pages',
  phases: [
    { title: 'Fix', detail: 'six agents, two months each' },
    { title: 'Verify', detail: 'hostile whole-page re-read of every touched day' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a print designer. Brooklyn reads it at 8:00 in the morning and runs the day
off the page with Azlyn (three until Day 353, four after) and Kreston (six
months on Day 1, eighteen by December).

WHERE THIS STANDS. A measurement pass just re-read all 425 units: 334 clean,
79%, up from 56% before the repairs began. 6 critical and 44 major remain. The
six criticals are already fixed. You are clearing the 44 majors, and they are
the last known defects in the book.

THE RULE THAT MATTERS MOST, and the reason the knock-on rate fell from 83% to
4% across three repair rounds:

  AFTER EVERY EDIT, RE-READ THE ENTIRE DAY AND CHECK EVERY OTHER BLOCK.

Prep Tonight, the sixteen schedule rows, all five named activities and their
steps, the Tip, the Afternoon Alternatives, the Out Again bullets, both infant
blocks, the insight, the Safety block, and that week's opener and shopping
list. A fix that leaves another block contradicting it is worse than the
defect, because it looks repaired. Most of the findings you are about to read
exist because somebody edited one block and stopped.

HOUSE FORMAT, frozen: anchors, day headers, date lines, theme lines and
page-break divs. A schedule row and its section heading name the same activity
character for character; change one and you change the other. Main Event 4-6
numbered steps, Second Main Event 5-7, Afternoon Alternatives 3-4 bullets, Out
Again 4-6 bullets, insight body 100-120 words, 16 schedule rows. Anything a
day calls for is on that week's flat shopping list. Activity titles are unique
book-wide; the ledger is ${REPO}/tools/titles.tsv.

HOUSE STYLE: US English except "autumn" and proper names such as the Plough.
No em dashes in prose. No adverbs (really, just, literally, genuinely,
honestly, simply, actually, deeply, truly, fundamentally). No binary
contrasts, no dramatic fragments, no passive voice, no Wh- sentence openers.
Prose wraps near 78 columns. LF endings.

JOSEPH'S SETTLED DECISIONS. Never reverse these and never write toward them:
- No personal messages from Joseph anywhere in the book.
- No swimming lessons. The family has a POOL MEMBERSHIP.
- No first-word thread. No tree thread.
- NO ONE-ADULT-PER-CHILD WATER RULE. Arm's-reach supervision replaced it.
  NEVER write a fix that needs a second adult. All 52 swimming days carry one
  standard water line; that is correct and deliberate.
- Twelve handprints, one per calendar month. Growth chart offered all twelve.
- The book says Kreston climbs from about 13 months and that is correct.

KRESTON'S AGES: 6 months Day 1, 7 from Day 5, 8 from 36, 9 from 64, 10 from
95, 11 from 125, ONE on Day 156, 13 from 186, 14 from 217, 15 from 248, 16
from 278, 17 from 309, 18 from 339. He mouths everything, has a pincer grip
from nine months, walks from twelve, climbs from about thirteen.

Fix what you are given and nothing else. Every edit is a chance to break a
page that was fine.
`

const PAIRS = [
  { k: 'a', pre: ['01', '02'], name: 'January and February' },
  { k: 'b', pre: ['03', '04'], name: 'March and April' },
  { k: 'c', pre: ['05', '06'], name: 'May and June' },
  { k: 'd', pre: ['07', '08'], name: 'July and August' },
  { k: 'e', pre: ['09', '10'], name: 'September and October' },
  { k: 'f', pre: ['11', '12'], name: 'November and December' },
]

phase('Fix')

const out = await pipeline(
  PAIRS,

  (p) => agent(
`Clear the majors for ${p.name}. ${CONTEXT}

YOUR FINDINGS are in ${REPO}/tools/pipeline/FINAL-QUEUE.json, a flat list of
objects each with "file", "days", "problem" and "fix". Take ONLY the entries
whose file starts months/${p.pre[0]}- or months/${p.pre[1]}-. Skip any whose
problem begins "CRITICAL"; those six are already fixed.

YOUR FILES, and you are the only agent touching them:
  ${REPO}/months/${p.pre[0]}-*.md
  ${REPO}/months/${p.pre[1]}-*.md

FOR EACH FINDING:
1. Read the WHOLE day or backup unit first.
2. Judge it. If the quoted text is not in the file, or the problem is not
   real, or the proposed fix breaks something else, reject it and say why.
   Do not manufacture an edit to satisfy a bad finding. One finding in the
   last round was wrong and the agent that pushed back was right.
3. If it is real, make the smallest edit that resolves it, in house voice.
   Most of these are one to three sentences into a Safety block, or a row
   heading swapped, and the proposed fix is usually sound as written.
4. RE-READ THE WHOLE UNIT and fix anything your edit now contradicts,
   including the schedule rows, the week opener and the shopping list.

RETURN JSON only, under 1000 words:
{"pair":"${p.name}","fixed":[{"day":N,"what":"one line"}],
"rejected":[{"day":N,"why":"one line"}]}`,
    { label: `fix:${p.k}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, p) => agent(
`Verify the ${p.name} repairs. Be hostile. ${CONTEXT}

FILES: ${REPO}/months/${p.pre[0]}-*.md and ${REPO}/months/${p.pre[1]}-*.md
FINDINGS SENT: ${REPO}/tools/pipeline/FINAL-QUEUE.json, files ${p.pre.join('- and ')}-

WHAT THE REPAIRER REPORTED:
${typeof rep === 'string' ? rep.slice(0, 2500) : JSON.stringify(rep).slice(0, 2500)}

READ EVERY DAY THE REPAIRER TOUCHED, WHOLE, and check:
1. The fix is in the file. Claimed but absent is CRITICAL.
2. No other block on that page contradicts it now. This is the recurring
   failure and the only reason you exist.
3. Schedule rows match their headings character for character.
4. Step and bullet counts legal, insight bodies 100-120 words.
5. Everything the day calls for is on that week's shopping list.
6. No em dash, no banned adverb, no passive, no Wh- opener, no second adult
   asked for, no pronoun with no antecedent, no restored note from Joseph.
7. Any rejection the repairer made was correct.

RETURN JSON only:
{"pair":"${p.name}","ok":true|false,
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `verify:${p.k}`, phase: 'Verify', effort: 'high' }
  )
)

const rows = out.flat().filter(Boolean)
const left = rows.flatMap(r => {
  try {
    const d = typeof r === 'string' ? JSON.parse(r.slice(r.indexOf('{'), r.lastIndexOf('}') + 1)) : r
    return d.issues || []
  } catch { return [] }
})
log(`${left.length} findings still open`)
return { open: left, rows }

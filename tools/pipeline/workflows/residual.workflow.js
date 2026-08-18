export const meta = {
  name: 'residual',
  description: 'Clear the 66 residual findings the repair verifiers raised, then confirm convergence',
  phases: [
    { title: 'Fix', detail: 'six agents, two months each' },
    { title: 'Confirm', detail: 'fresh whole-page read of every touched day' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a print designer. Brooklyn reads it at 8:00 in the morning and runs the day
off the page with Azlyn (three until Day 353, four after) and Kreston (six
months on Day 1, eighteen by December).

WHERE THIS STANDS. A full per-day pass read all 410 units: 230 clean, 14
critical and 108 major. Twelve repair agents fixed the 122 that mattered.
Twelve hostile verifiers then re-read every touched day and raised 66
residual findings, 20 major and 46 minor. You are clearing those.

THE RESIDUALS ARE MOSTLY ONE THING: the repair landed in one block and
another block on the same page still says the old version, or the repair's
own new sentence contradicts a step it did not read. That has been the
failure mode of every round in this project. The knock-on rate is falling,
10 of 12 in the first round, 20 of 122 in the last, so this round should be
close to the end.

THE RULE THAT MATTERS MOST:
  AFTER EVERY EDIT, RE-READ THE ENTIRE DAY AND CHECK EVERY OTHER BLOCK.
Prep Tonight, the sixteen schedule rows, all five named activities and their
steps, the Tip, the Afternoon Alternatives, the Out Again bullets, both infant
blocks, the insight, the Safety block, and that week's opener and shopping
list. A fix that leaves another block contradicting it is worse than the
original defect, because it looks repaired.

HOUSE FORMAT, frozen: anchors, day headers, date lines, theme lines and
page-break divs. A schedule row and its section heading name the same
activity character for character. Main Event 4-6 numbered steps, Second Main
Event 5-7, Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets, insight
body 100-120 words, 16 schedule rows. Anything a day calls for is on that
week's flat shopping list. Activity titles are unique book-wide; the ledger is
${REPO}/tools/titles.tsv and it must be updated if you rename one.

HOUSE STYLE: US English except "autumn" and proper names such as the Plough.
No em dashes in prose. No adverbs (really, just, literally, genuinely,
honestly, simply, actually, deeply, truly, fundamentally). No binary
contrasts, no dramatic fragments, no passive voice, no Wh- sentence openers.
Prose wraps near 78 columns. LF endings.

JOSEPH'S SETTLED DECISIONS. Never reverse these and never write toward them:
- No personal messages from Joseph anywhere in the book.
- No swimming lessons. The family has a POOL MEMBERSHIP and goes when it
  suits. Other people's lessons closing the pool is realistic and stays.
- No first-word thread. No tree thread.
- NO ONE-ADULT-PER-CHILD WATER RULE. Deleted on his instruction, replaced by
  arm's-reach supervision. NEVER write a fix that needs a second adult.
- Twelve handprints, one per calendar month, both children on one sheet, at
  Days 1, 52, 60, 95, 129, 154, 187, 219, 271, 287, 325, 362.
- The growth chart is offered in all twelve months as an option.

KRESTON'S AGES: 6 months Day 1, 7 from Day 5, 8 from 36, 9 from 64, 10 from
95, 11 from 125, ONE on Day 156, 13 from 186, 14 from 217, 15 from 248, 16
from 278, 17 from 309, 18 from 339. He mouths everything, has a pincer grip
from nine months, walks from twelve, climbs from sixteen.

Fix what you are given and nothing else.
`

const PAIRS = [
  { k: 'a', months: ['January', 'February'], pre: ['01', '02'] },
  { k: 'b', months: ['March', 'April'], pre: ['03', '04'] },
  { k: 'c', months: ['May', 'June'], pre: ['05', '06'] },
  { k: 'd', months: ['July', 'August'], pre: ['07', '08'] },
  { k: 'e', months: ['September', 'October'], pre: ['09', '10'] },
  { k: 'f', months: ['November', 'December'], pre: ['11', '12'] },
]

phase('Fix')

const out = await pipeline(
  PAIRS,

  (p) => agent(
`Clear the residual findings for ${p.months.join(' and ')}. ${CONTEXT}

YOUR FINDINGS are in ${REPO}/tools/pipeline/RESIDUAL.json, a flat list of
objects each carrying "month", "day", "severity", "problem" and "fix". Take
ONLY the entries whose month is ${p.months.map(m => '"' + m + '"').join(' or ')}.
Some carry day 0, which means a backup section; the problem text names which.

YOUR FILES, and you are the only agent touching them:
  ${REPO}/months/${p.pre[0]}-*.md
  ${REPO}/months/${p.pre[1]}-*.md

FOR EACH FINDING:
1. Read the WHOLE day or backup unit first.
2. Judge it. If the quoted text is not in the file, or the problem is not
   real, or the proposed fix breaks something else, reject it and say why.
   Do not manufacture an edit to satisfy a bad finding.
3. If it is real, make the smallest edit that resolves it, in house voice.
4. RE-READ THE WHOLE UNIT and fix anything your edit now contradicts.

Take the minors as well as the majors; they are cheap and this is the last
pass. Two of the findings name a sibling day that was never repaired (a
February pool day, a September backup rule). Fix the sibling too.

RETURN JSON only, under 1000 words:
{"pair":"${p.months.join('+')}","fixed":[{"day":N,"what":"one line"}],
"rejected":[{"day":N,"why":"one line"}]}`,
    { label: `fix:${p.k}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, p) => agent(
`Confirm the ${p.months.join(' and ')} residual repairs. Be hostile.
${CONTEXT}

FILES: ${REPO}/months/${p.pre[0]}-*.md and ${REPO}/months/${p.pre[1]}-*.md
FINDINGS SENT: ${REPO}/tools/pipeline/RESIDUAL.json, months ${p.months.join(' and ')}

WHAT THE REPAIRER REPORTED:
${typeof rep === 'string' ? rep.slice(0, 2500) : JSON.stringify(rep).slice(0, 2500)}

READ EVERY DAY THE REPAIRER TOUCHED, WHOLE, and check:
1. The fix is in the file. Claimed but absent is CRITICAL.
2. No other block on that page contradicts it now. This is the recurring
   failure and the reason you exist.
3. Schedule rows match their headings character for character.
4. Step and bullet counts legal, insight bodies 100-120 words.
5. Everything the day calls for is on that week's shopping list.
6. No em dash, no banned adverb, no passive, no Wh- opener, no second adult
   asked for, no restored note from Joseph, no swimming lesson, no pronoun
   with no antecedent.
7. Any rejection the repairer made was correct.

RETURN JSON only:
{"pair":"${p.months.join('+')}","ok":true|false,
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `confirm:${p.k}`, phase: 'Confirm', effort: 'high' }
  )
)

const rows = out.flat().filter(Boolean)
const left = rows.flatMap(r => {
  try {
    const d = typeof r === 'string' ? JSON.parse(r.slice(r.indexOf('{'), r.lastIndexOf('}') + 1)) : r
    return d.issues || []
  } catch { return [] }
})
log(`${left.length} findings still open after this pass`)
return { open: left, rows }

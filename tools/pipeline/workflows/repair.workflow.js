export const meta = {
  name: 'repair',
  description: 'Fix the 122 critical and major findings from the full per-day pass, one agent per month, whole pages',
  phases: [
    { title: 'Fix', detail: 'twelve agents, one month each, no shared files' },
    { title: 'Verify', detail: 'each month re-read whole by a second agent' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a print designer. Brooklyn reads it at 8:00 in the morning and runs the day
off the page with Azlyn (three until Day 353, four after) and Kreston (six
months on Day 1, eighteen by December).

A FULL PER-DAY PASS HAS JUST READ ALL 410 UNITS. 230 came back clean, 56%. It
found 14 critical and 108 major defects spread evenly across every fortnight
of the year, which is what a generator flaw looks like: the days were written
activity by activity and the blocks on a page were never reconciled with each
other.

THE ONE RULE THAT MATTERS MOST. Every previous repair round introduced NEW
defects by fixing one block and leaving the rest of the page saying the old
thing. Ten of round one's twelve fixes did this. So:

  AFTER EVERY EDIT, RE-READ THE ENTIRE DAY AND CHECK EVERY OTHER BLOCK.

If you change a step, check the Safety block, the materials list, the Tip, the
infant blocks, the Afternoon Alternatives, the schedule rows and the week
opener. If you change a Safety block, check the steps it governs. A fix that
lands in one block and leaves another contradicting it is worse than the
original defect, because it looks repaired.

HOUSE FORMAT, frozen:
- Anchors, day headers, date lines, theme lines and page-break divs.
- A schedule row and its section heading name the same activity, character for
  character. Change one and you change the other.
- Counts hold: Main Event 4-6 numbered steps, Second Main Event 5-7,
  Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets, insight body
  100-120 words, 16 schedule rows.
- Anything a day calls for must be on that week's flat shopping list.
- Activity titles are unique book-wide. Ledger: ${REPO}/tools/titles.tsv

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
- NO ONE-ADULT-PER-CHILD WATER RULE. Deleted on his instruction and replaced
  with arm's-reach supervision. NEVER write a fix that needs a second adult.
  If a finding's proposed fix asks for one, rewrite it for a single adult.
- Twelve handprints, one per calendar month, both children on one sheet, at
  Days 1, 52, 60, 95, 129, 154, 187, 219, 271, 287, 325, 362.
- The growth chart is offered in all twelve months as an option.

KRESTON'S AGES, for any safety wording: 6 months Day 1, 7 from Day 5, 8 from
36, 9 from 64, 10 from 95, 11 from 125, ONE on Day 156, 13 from 186, 14 from
217, 15 from 248, 16 from 278, 17 from 309, 18 from 339. He mouths
everything, has a pincer grip from nine months, walks from twelve, climbs
from sixteen.

Fix what you are given and nothing else. Do not improve prose you were not
sent to. Every edit is a chance to break a page that was fine.
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
`Repair ${m.name}. ${CONTEXT}

YOUR FINDINGS are in ${REPO}/tools/pipeline/FIX-QUEUE.json under the key
"${m.k}". Read that file and take ONLY your key's entries. Each has a file, a
day, a severity, a quoted problem and a proposed fix.

YOUR FILES, and you are the only agent touching them:
  ${REPO}/months/${m.k}-*.md

FOR EACH FINDING:
1. Read the WHOLE day first, every block.
2. Judge the finding. If the quoted text is not in the file, or the problem is
   not real, or the proposed fix would break something else, say so and move
   on. Do not manufacture an edit to satisfy a bad finding.
3. If it is real, make the smallest edit that resolves it, in house voice.
4. RE-READ THE WHOLE DAY and fix anything your edit has now contradicted,
   including the schedule rows and that week's opener.

Prefer the proposed fix where it is sound. Rewrite it where it asks for a
second adult, breaks a count, or fights the house style.

RETURN JSON only, under 1200 words:
{"month":"${m.name}","fixed":[{"day":N,"what":"one line"}],
"rejected":[{"day":N,"why":"one line"}],
"knockOn":[{"day":N,"what":"what else on the page you had to change"}]}`,
    { label: `fix:${m.k}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, m) => agent(
`Verify the ${m.name} repairs. Be hostile. ${CONTEXT}

FILES: ${REPO}/months/${m.k}-*.md
FINDINGS THAT WERE SENT: ${REPO}/tools/pipeline/FIX-QUEUE.json key "${m.k}"

WHAT THE REPAIRER REPORTED:
${typeof rep === 'string' ? rep.slice(0, 3000) : JSON.stringify(rep).slice(0, 3000)}

FOR EVERY DAY THE REPAIRER TOUCHED, READ THE WHOLE DAY AND CHECK:
1. Did the fix land in the file? A fix claimed in a report but absent from the
   file is CRITICAL.
2. Does any OTHER block on that page now contradict the fix? This is the
   failure mode that has recurred in every previous round: the Safety block
   gets corrected and the step, the Tip, the infant block or a schedule row
   still says the old thing.
3. Schedule rows still match their headings character for character.
4. Step and bullet counts still legal, insight bodies still 100-120 words.
5. Everything the day calls for is still on that week's shopping list.
6. No em dash, no banned adverb, no passive, no Wh- opener, no second adult
   asked for, no restored note from Joseph, no swimming lesson.
7. Anything the repairer REJECTED: check the rejection was right.

RETURN JSON only:
{"month":"${m.name}","ok":true|false,
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `verify:${m.k}`, phase: 'Verify', effort: 'high' }
  )
)

const rows = out.flat().filter(Boolean)
log(`${rows.length} agent results returned`)
return rows

export const meta = {
  name: 'final-read',
  description: 'Last read: whole-page check of every day touched, hunting the half-fix pattern again',
  phases: [
    { title: 'Read', detail: 'four readers, whole pages not changed lines' },
    { title: 'Verdict', detail: 'ship or name what is left' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a designer. Brooklyn reads it at 8:00 in the morning and runs the day off
the page with Azlyn (three, four from Day 354) and Kreston (six months on Day
1, eighteen by December).

THIS IS THE LAST READ BEFORE IT SHIPS.

THE PATTERN YOU ARE HUNTING HAS ALREADY HAPPENED TWICE. A defect gets fixed in
one block of a day and the other blocks on the same page are left saying the
old thing. First round: twelve Safety-versus-step contradictions were fixed.
Second round: ten of those fixes turned out to have landed in the Safety block
only, leaving the activity text, the infant block, the Tip or the Afternoon
Alternatives still telling the reader to do the forbidden thing. Those ten
have now been completed.

YOUR JOB IS TO FIND THE THIRD ROUND IF IT EXISTS. For every day named below,
READ THE ENTIRE DAY: prep, schedule, all five named activities, every numbered
step, the Tip, the Afternoon Alternatives, the Out Again bullets, both infant
blocks, the insight and the Safety block. Then answer one question: does any
part of this page contradict any other part of it?

Also check the WEEK OPENER of any week you touch, because a week opener's
shopping list and its "What Azlyn Will Learn" bullets can still promise the
old version of an activity.

JOSEPH'S SETTLED DECISIONS. Do not re-argue these or report their absence:
- No personal messages from Joseph anywhere.
- No swimming lessons; the family has a pool membership.
- No first-word thread, no tree thread.
- No one-adult-per-child water rule; arm's-reach supervision replaced it.
  NEVER recommend restoring it.
- Twelve handprints, one per calendar month, both children on one sheet.
- Growth chart offered in all twelve months as an option.
- US English, except "autumn" and proper names like the Plough.
- No em dashes in prose, no adverbs (really, just, literally, genuinely,
  honestly, simply, actually, deeply, truly, fundamentally), no binary
  contrasts, no passive voice, no Wh- sentence openers, wrap near 78 columns.

ALL DETERMINISTIC GATES PASS. 365 days, correct dates, 16 rows per day, rows
matching headings exactly, insight word bands, 1,533 unique titles, 504
anchors and zero dead links, Swimming 52 / Library 26 / Museum 12. Forty
ragged blockquotes were reflowed and verified as a pure rewrap. Do not
re-check any of that.

Report only what a reader running the day would actually hit.
`

const RETURN = `
RETURN JSON only, under 1200 words:
{"slice":"...","clean":true|false,
"daysRead":[N],
"issues":[{"severity":"critical|major|minor","file":"months/...","days":[N],
"problem":"quote both sides of the contradiction","fix":"the specific change"}]}
`

const SLICES = [
  {
    key: 'jan-jun',
    prompt: `READ THESE DAYS WHOLE, in ${REPO}/months/:

  Day 3, 4, 5   01-jan-w1.md   (catching box, wrecking-ball anchor, pool line)
  Day 45        02-feb-w7.md   (centerpiece jar changed from ivy to pine)
  Day 71        03-mar-w11.md  (daffodil leaf replaced with a grass stem)
  Day 113       04-apr-w17.md  (muslin moved into the adult's hands)
  Day 156       06-jun-w23.md  (candle now lifted out of the smash cake)

For each: does any block on the page still describe the old version? Check the
week opener too. Day 4's week 1 shopping list lost a broom handle; confirm no
step or alternative still calls for one. Day 156's week 23 opener summarizes
the birthday; confirm it matches the day as it now reads.`,
  },
  {
    key: 'jul-sep',
    prompt: `READ THESE DAYS WHOLE, in ${REPO}/months/:

  Day 203       07-jul-w29.md  (seed-spitting target moved to a tray)
  Day 238       08-aug-w34.md  (hook-a-duck water line made unconditional)
  Day 266       09-sep-w38.md  (wall plants ruled out of Kreston's hands)
  Day 225       08-aug-w33.md  (passport sidebar de-totalized)

And the August backup section, ${REPO}/months/08-aug-zz-backup.md, Bad Weather
Day 1: the 5:00 bath became warm washcloths and the lightning caution was
rewritten. Confirm the schedule row, the section heading and the section body
all now describe washcloths rather than a bath, and that the new caution
covers the warm water at 1:00 and the bowl in Kreston's block.`,
  },
  {
    key: 'oct-dec',
    prompt: `READ THESE DAYS WHOLE, in ${REPO}/months/:

  Day 280       10-oct-w40.md  (card line lowered to knee height between chairs)
  Day 284       10-oct-w41.md  (rope allowed in her hand)
  Day 291       10-oct-w42.md  (markers allowed in her hand)
  Day 295, 298, 299  10-oct-w43.md  (minibeasts, buttons, bottle caps)
  Day 345, 347  12-dec-w50.md  (nut warning moved to the day with the nuts)
  Day 364       12-dec-w52.md  (yew ruling, and who cuts the greenery)

Day 280 matters most: the line moved from door handles to chair legs, so check
every later step, the Tip and the Quiet Play block still work with a low line.
Day 364: confirm the walk, the materials, the insight and the Safety block all
now agree about who holds the scissors.`,
  },
  {
    key: 'ivy-threads',
    prompt: `TWO WHOLE-BOOK CONSISTENCY SWEEPS.

1. POISONOUS PLANTS. Day 307 rules: "Ivy and holly are both poisonous, and
   Kreston still puts leaves in his mouth at 16 months, so those two travel
   home in your pocket." Day 324 rules every part of a yew poisonous. Grep all
   of ${REPO}/months for ivy, holly, yew, mistletoe, daffodil, bramble and
   Virginia creeper. Read every hit. Report any day where a child collects,
   carries, cuts, presses or handles one of them, and any day that rules on
   one of them in a way that contradicts another day. Plants growing on a wall
   that nobody touches are fine.

2. THE TWO SIDEBARS THAT WERE REWRITTEN. Read
   ${REPO}/months/06-jun-w25.md (Freedom Days) and
   ${REPO}/months/04-apr-w18.md (insects growers buy) in full, plus their week
   openers. Confirm each sidebar still fits its own week's theme, that its
   "Try it" and "Did you know" still make sense beside the new text, and that
   nothing in the week opener still describes the old sidebar. Then confirm
   week 43 in ${REPO}/months/10-oct-w43.md is now the only insect-eating one.`,
  },
]

phase('Read')

const out = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `read:${s.key}`, phase: 'Read', effort: 'high' })
)

phase('Verdict')

const verdict = await agent(
`Final call. Does this book go to the designer?
${CONTEXT}

Four readers each took the whole pages that were changed:

${out.map((r, i) => `--- ${SLICES[i].key} ---\n${typeof r === 'string' ? r.slice(0, 7000) : JSON.stringify(r).slice(0, 7000)}`).join('\n\n')}

YOUR JOB:
1. Name anything where a page still contradicts itself, or where a fix left
   another block describing the old version.
2. Strike taste, anything already settled, and anything a reader running the
   day would never hit.
3. Answer plainly: DOES THIS GO TO THE DESIGNER NOW? If yes, say yes without
   hedging. If no, name exactly what is left and nothing more.

RETURN JSON only:
{"readyForDesign":true|false,"verdict":"a short honest paragraph for Joseph",
"remaining":[{"file":"...","days":[N],"problem":"...","fix":"..."}]}`,
  { label: 'verdict', phase: 'Verdict', effort: 'high' })

return { verdict, out }

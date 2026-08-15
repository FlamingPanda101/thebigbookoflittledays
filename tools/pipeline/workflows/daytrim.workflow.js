export const meta = {
  name: 'day-trim',
  description: 'Trim only the named over-long days, leaving every in-band day untouched',
  phases: [
    { title: 'Trim', detail: 'per week, only the days listed' },
    { title: 'Recheck', detail: 'confirm the cut took nothing structural' },
  ],
}

const SP = 'C:\\Users\\Josep\\AppData\\Local\\Temp\\claude\\C--Users-Josep--claude\\f2051431-8954-4594-9860-3b743569602a\\scratchpad'
const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const OUT = SP + '\\newweeks'
const pad = (n) => String(n).padStart(2, '0')

// only days meaningfully over. days within ~30 of the ceiling are left alone:
// chasing them costs more in cut-seam damage than the overage is worth.
const TARGETS = {
  10: [{ day: 66, now: 1184, ceil: 1150 }],
  11: [{ day: 73, now: 1231, ceil: 1150 }, { day: 75, now: 1211, ceil: 1150 }],
  12: [{ day: 78, now: 1325, ceil: 1300 }, { day: 81, now: 1194, ceil: 1150 },
       { day: 84, now: 1206, ceil: 1150 }],
  13: [{ day: 85, now: 1320, ceil: 1300 }, { day: 86, now: 1255, ceil: 1150 },
       { day: 90, now: 1223, ceil: 1150 }],
}

const WEEKS = Object.keys(TARGETS).map(Number)

phase('Trim')

const out = await pipeline(
  WEEKS,

  (wk) => {
    const list = TARGETS[wk].map(t =>
      `  Day ${t.day}: ${t.now} prose words, ceiling ${t.ceil}, cut ~${t.now - t.ceil}`
    ).join('\n')
    const days = TARGETS[wk].map(t => t.day).join(', ')

    return agent(
`Trim named days of a printed activity book back into the spec word band.

THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn (3) and Kreston (9 months in March). She reads it at 8:00 in
the morning holding the baby. Warm, practical, direct, written to an equal.

FILE TO EDIT IN PLACE: ${OUT}\\wk${pad(wk)}-days.md
REFERENCE for register and length: ${REPO}\\months\\01-jan-w1.md

⚠️ EDIT ONLY THESE DAYS. Every other day in the file is already in band and
MUST NOT BE TOUCHED:

${list}

The ~155 word schedule block does not count toward the prose total. Do not
take any day below 1,000.

WHERE THE EXCESS IS, cut in this order:
1. Qualification and hedging inside otherwise clear sentences.
2. Prose restating what the numbered steps already say.
3. Sentences telling Brooklyn what the point of an activity is. She can see
   it. Tails shaped like "..., and that is the point" go first.
4. Infant Integration or Kreston's Afternoon paragraphs past four sentences.

⚠️ THINGS PREVIOUS TRIMS BROKE. Every one of these was a real defect that
shipped to review:
- an Out Again list cut from 5 bullets to 3, against the 4-6 spec
- a Main Event left with 7 numbered steps, and another cut to 6 where the
  house pattern is 7, with the missing step folded into one 47-word instruction
- a materials list losing an item the steps still called for
- a step handing a three-year-old scissors the materials list marked adult-only
- a Safety block whose hazard control referred to a setup no step performed
- a dropped article, a broken verb agreement, a "where" with nothing to refer
  to, and a clause that stopped mid-thought

So: COUNTS ARE FIXED. Main Event keeps 4-6 steps, Second Main Event keeps 5-7,
Afternoon Alternatives keep 3-4 bullets, Out Again keeps 4-6 bullets. Every
material and quantity stays. Every Safety block stays with its hazard AND the
action that answers it. The insight body stays 100-120 words.

NEVER CHANGE: anchors, day headers, date lines, theme lines, any line starting
with ###, the insight HEADLINE, the 16 schedule rows, the page-break divs.

AFTER EVERY CUT, READ THE WHOLE SENTENCE BACK. It must be grammatical,
complete, and still mean what it meant.

STYLE: no em dashes in prose, no adverbs, no binary contrasts, no dramatic
fragments, no passive voice, no false agency, no Wh- sentence openers. Vary
sentence length. Safety absolutes stay and stay strong. Prose wraps near 78
columns; steps and bullets stay one line each.

RETURN a table: day, prose before, prose after, in band yes/no.`,
      { label: `trim:wk${pad(wk)} d${days}`, phase: 'Trim' }
    )
  },

  (rep, wk) => {
    const days = TARGETS[wk].map(t => t.day).join(', ')
    return agent(
`Verify trimmed days in a printed activity book. Be skeptical.

FILE: ${OUT}\\wk${pad(wk)}-days.md
DAYS THAT WERE TRIMMED: ${days}
Every other day in this file should be byte-identical to before. If any
untouched day changed, that is a MAJOR issue.

For the trimmed days check:
1. PROSE LENGTH, excluding the ~155 word schedule block. Must be 1,000-1,150,
   or up to 1,300 for the week's first day. Give the number.
2. STEP COUNTS: Main Event 4-6, Second Main Event 5-7.
3. BULLETS: Afternoon Alternatives 3-4, Out Again 4-6.
4. MATERIALS: every item the numbered steps call for is in the list, and
   nothing in the list went missing.
5. SAFETY: block still present, hazard intact, and paired with the action that
   answers it.
6. INSIGHT BODY 100-120 words.
7. FROZEN LINES: anchors, day header, date line, theme line, every ###
   heading, insight headline, 16 schedule rows, page-break divs.
8. CUT-SEAM DAMAGE: a sentence missing its subject or object, a broken verb
   agreement, a dropped article, a pronoun or "where"/"which" with nothing to
   refer to, a clause stopping mid-thought, prose gone clipped and cold.

RETURN JSON only:
{"ok":true|false,"days":[{"day":N,"prose":N,"mainSteps":N,"secondSteps":N,"altBullets":N,"outAgainBullets":N,"insightWords":N}],
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
      { label: `recheck:wk${pad(wk)}`, phase: 'Recheck', effort: 'high' }
    )
  }
)

return out

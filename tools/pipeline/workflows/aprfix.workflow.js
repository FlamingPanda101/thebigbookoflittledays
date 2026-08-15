export const meta = {
  name: 'april-polish',
  description: 'Trim the five over-long April days and extend four short insight bodies',
  phases: [
    { title: 'Polish', detail: 'per week: named days only' },
    { title: 'Recheck', detail: 'diff against baseline, confirm nothing else moved' },
  ],
}

const SP = 'C:\\Users\\Josep\\AppData\\Local\\Temp\\claude\\C--Users-Josep--claude\\f2051431-8954-4594-9860-3b743569602a\\scratchpad'
const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const OUT = SP + '\\newweeks'
const pad = (n) => String(n).padStart(2, '0')

const WORK = {
  14: { trim: [{ d: 96, now: 1219, ceil: 1150 }], insight: [] },
  15: { trim: [{ d: 102, now: 1209, ceil: 1150 }], insight: [] },
  16: { trim: [{ d: 108, now: 1218, ceil: 1150 }],
        insight: [{ d: 110, now: 93 }, { d: 112, now: 90 }] },
  17: { trim: [{ d: 113, now: 1337, ceil: 1300 }, { d: 119, now: 1210, ceil: 1150 }],
        insight: [] },
  18: { trim: [], insight: [{ d: 124, now: 94 }, { d: 126, now: 94 }] },
}

const WEEKS = Object.keys(WORK).map(Number).filter(
  w => WORK[w].trim.length || WORK[w].insight.length)

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn (3) and Kreston (9-10 months in April). She reads it at 8:00
in the morning holding the baby. Warm, practical, direct, written to an equal.

REFERENCE: ${REPO}\\months\\01-jan-w1.md

NEVER CHANGE: anchors; day headers; date lines; theme lines; any line starting
with ###; the insight HEADLINE (the "> **...**" line after the brain-emoji
line); the 16 schedule rows; the page-break divs.

COUNTS ARE FIXED: Main Event 4-6 numbered steps, Second Main Event 5-7,
Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets. Every material and
quantity stays. Every Safety block keeps its hazard AND the action answering
it, and no numbered step may contradict its own Safety block.

STYLE: no em dashes in prose, no adverbs (really, just, literally, genuinely,
honestly, simply, actually, deeply, truly, fundamentally), no binary contrasts,
no negative listing, no dramatic fragments, no passive voice, no false agency,
no Wh- sentence openers. Vary sentence length. Safety absolutes stay strong.
Prose wraps near 78 columns; steps and bullets stay one line each.

⚠️ AFTER EVERY EDIT, READ THE WHOLE SENTENCE BACK. Past passes have left a
broken verb agreement, a dropped article, a "where" with nothing to refer to,
and a clause stopping mid-thought.
`

phase('Polish')

const out = await pipeline(
  WEEKS,

  (wk) => {
    const w = WORK[wk]
    const t = w.trim.map(x =>
      `  Day ${x.d}: ${x.now} prose words, ceiling ${x.ceil}, cut ~${x.now - x.ceil}`
    ).join('\n') || '  (none)'
    const i = w.insight.map(x =>
      `  Day ${x.d}: insight body is ${x.now} words, band is 100-120, add ~${105 - x.now}`
    ).join('\n') || '  (none)'
    const touched = [...w.trim.map(x => x.d), ...w.insight.map(x => x.d)].join(', ')

    return agent(
`Polish named days of a printed activity book. ${RULES}

FILE TO EDIT IN PLACE: ${OUT}\\wk${pad(wk)}-days.md
BASELINE for diffing (do not edit): ${SP}\\baseline\\wk${pad(wk)}-days.md

⚠️ EDIT ONLY DAYS ${touched}. Every other day in this file is correct and must
come out byte-identical.

TRIM THESE DAYS to inside the band. The ~155 word schedule block does not
count. Never go below 1,000.
${t}

Cut in this order: qualification and hedging; prose restating what a numbered
step already says; sentences telling Brooklyn what the point of an activity is
(tails shaped "..., and that is the point" go first); Infant Integration or
Kreston's Afternoon paragraphs past four sentences.

DO NOT cut a material, a step, a bullet, or anything from a Safety block.

EXTEND THESE INSIGHT BODIES to 100-120 words.
${i}

Extend by carrying the existing argument one step further into what Brooklyn
does with it, in the register of the surrounding days. Do not restate the
headline, do not add a new claim, and do not tip into instruction. Keep the
day inside its word band afterwards.

RETURN a table: day, what changed, before, after.`,
      { label: `polish:wk${pad(wk)} d${touched}`, phase: 'Polish' }
    )
  },

  (rep, wk) => {
    const w = WORK[wk]
    const touched = [...w.trim.map(x => x.d), ...w.insight.map(x => x.d)].join(', ')
    return agent(
`Verify a polished week. Be skeptical. ${RULES}

CURRENT:  ${OUT}\\wk${pad(wk)}-days.md
BASELINE: ${SP}\\baseline\\wk${pad(wk)}-days.md

Diff them. ONLY days ${touched} may differ. Any change to any other day is a
MAJOR issue, quote it.

For all seven days report and check:
1. Prose words excluding the ~155 word schedule block: 1,000-1,150, or up to
   1,300 for the week's first day.
2. Main Event 4-6 steps, Second Main Event 5-7 steps.
3. Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets.
4. Insight body 100-120 words.
5. MATERIALS both directions: every object a step or Tip names is in that
   activity's materials list with a quantity, and every listed material is
   used. Report orphans and missing items by name.
6. Safety block present where a real hazard exists, hazard paired with the
   action answering it, and NOT contradicted by any numbered step.
7. Frozen lines intact.
8. No cut-seam damage: missing subject or object, broken verb agreement,
   dropped article, pronoun or "where"/"which" with no antecedent, clause
   stopping mid-thought, prose gone clipped and cold.

RETURN JSON only:
{"ok":true|false,"unexplainedChanges":[],"days":[{"day":N,"prose":N,"mainSteps":N,"secondSteps":N,"altBullets":N,"outAgainBullets":N,"insightWords":N}],
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
      { label: `recheck:wk${pad(wk)}`, phase: 'Recheck', effort: 'high' }
    )
  }
)

return out

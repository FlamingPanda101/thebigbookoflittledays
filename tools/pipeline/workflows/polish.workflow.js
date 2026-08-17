export const meta = {
  name: 'polish-weeks',
  description: 'Trim named over-long days and extend named short insight bodies, diffed against baseline',
  phases: [
    { title: 'Polish', detail: 'per week: only the named days' },
    { title: 'Recheck', detail: 'diff against baseline, confirm nothing else moved' },
  ],
}

const SP = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027\\tools\\pipeline'
const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const OUT = SP + '\\newweeks'
const pad = (n) => String(n).padStart(2, '0')

// args: { "19": {trim:[{d,now,ceil}], insight:[{d,now}]}, ... }
const WORK = args || {}
const WEEKS = Object.keys(WORK).map(Number)
  .filter(w => (WORK[w].trim || []).length || (WORK[w].insight || []).length)
  .sort((a, b) => a - b)

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn, who is three, and her baby brother Kreston. She reads it at
8:00 in the morning holding the baby. Warm, practical, direct, written to an
equal, never preachy.

REFERENCE for register and length: ${REPO}\\months\\01-jan-w1.md

NEVER CHANGE: anchors; day headers; date lines; theme lines; any line starting
with ###; the insight HEADLINE (the "> **...**" line after the brain-emoji
line); the 16 schedule rows; the page-break divs.

COUNTS ARE FIXED: Main Event 4-6 numbered steps, Second Main Event 5-7,
Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets. Every material and
quantity stays. Every Safety block keeps its hazard AND the action answering
it, and no numbered step may contradict its own Safety block.

STYLE: no em dashes in prose, no adverbs (really, just, literally, genuinely,
honestly, simply, actually, deeply, truly, fundamentally), no binary contrasts
("not X, it's Y"), no negative listing, no dramatic fragments, no passive
voice, no false agency, no Wh- sentence openers. Vary sentence length. Safety
absolutes stay strong. Prose wraps near 78 columns; steps and bullets stay one
line each. LF endings.

⚠️ WHAT PREVIOUS POLISH PASSES BROKE, all real and all shipped to review:
- a day compressed by 67 words when it was ALREADY IN BAND, losing five
  clauses that carried meaning, including the only line identifying the
  control condition in that day's experiment
- an Out Again list cut from 5 bullets to 3
- a Main Event left at 7 steps, a Second Main Event cut to 6
- a materials list losing an item its steps still called for
- a broken verb agreement, a dropped article, a "where" with no antecedent,
  a clause stopping mid-thought

So: if a day is already inside its band, DO NOT TOUCH IT. After every edit,
read the whole sentence back and check it is complete and still means what it
meant.
`

phase('Polish')

const out = await pipeline(
  WEEKS,

  (wk) => {
    const w = WORK[wk]
    const trim = w.trim || [], ins = w.insight || []
    const t = trim.map(x =>
      `  Day ${x.d}: ${x.now} prose words, ceiling ${x.ceil}, cut ~${x.now - x.ceil}`
    ).join('\n') || '  (none)'
    const i = ins.map(x =>
      `  Day ${x.d}: insight body ${x.now} words, band 100-120, add ~${105 - x.now}`
    ).join('\n') || '  (none)'
    const touched = [...new Set([...trim.map(x => x.d), ...ins.map(x => x.d)])]
      .sort((a, b) => a - b).join(', ')

    return agent(
`Polish named days of a printed activity book. ${RULES}

FILE TO EDIT IN PLACE: ${OUT}\\wk${pad(wk)}-days.md
BASELINE for reference (do not edit): ${SP}\\baseline\\wk${pad(wk)}-days.md

⚠️ EDIT ONLY DAYS ${touched}. Every other day must come out byte-identical.

⚠️ HOW TO COUNT, because we have disagreed on this twice and it cost content.
Count EVERY word in the day, from its <a id="day-N"></a> line to its closing
page-break div, and then subtract ONLY the At-a-Glance Schedule rows. Headers,
the date line, the theme line, Prep Tonight, all ### headings, materials
lists, numbered steps, Tips, blockquotes, the sidebar, the insight and the
Safety block ALL COUNT.

Counted any other way the numbers below will look wrong to you, and twice now
an agent has "corrected" a day that its own count said was already fine,
cutting real content out of it. If your count disagrees with the figure below
by more than about 20 words, you are counting differently: recount my way,
and if it still disagrees, CUT NOTHING and say so in your return.

TRIM THESE to inside the band. Never go below 1,000.
${t}

Cut in this order: qualification and hedging; prose restating what a numbered
step already says; sentences telling Brooklyn what the point of an activity is
(tails shaped "..., and that is the point" first); Infant Integration or
Kreston's Afternoon paragraphs past four sentences.
Do NOT cut a material, a step, a bullet, or anything from a Safety block.

EXTEND THESE INSIGHT BODIES to 100-120 words.
${i}

Carry the existing argument one step further into what Brooklyn does with it,
in the register of the surrounding days. Do not restate the headline, do not
add a new claim, do not tip into instruction. Keep the day inside its band.

RETURN a table: day, what changed, prose before, prose after.`,
      { label: `polish:wk${pad(wk)} d${touched}`, phase: 'Polish' }
    )
  },

  (rep, wk) => {
    const w = WORK[wk]
    const touched = [...new Set([...(w.trim || []).map(x => x.d),
                                 ...(w.insight || []).map(x => x.d)])]
      .sort((a, b) => a - b).join(', ')
    return agent(
`Verify a polished week. Be skeptical. ${RULES}

CURRENT:  ${OUT}\\wk${pad(wk)}-days.md
BASELINE: ${SP}\\baseline\\wk${pad(wk)}-days.md

Diff them. ONLY days ${touched} may differ. Any change to any other day is a
MAJOR issue: quote it. (Normalise line endings before diffing.)

For all seven days report and check:
1. Prose words excluding the ~155 word schedule block: 1,000-1,150, or up to
   1,300 for the week's first day.
2. Main Event 4-6 steps, Second Main Event 5-7 steps.
3. Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets.
4. Insight body 100-120 words.
5. MATERIALS both directions: every object a step or Tip names is in that
   activity's materials list with a quantity, and every listed material is
   used by a step or Tip. Report orphans and missing items by name.
6. Safety block present where a real hazard exists, hazard paired with the
   action answering it, and NOT contradicted by any numbered step.
7. Frozen lines intact.
8. Cut-seam damage: missing subject or object, broken verb agreement, dropped
   article, pronoun or "where"/"which" with no antecedent, clause stopping
   mid-thought, prose gone clipped and cold.

RETURN JSON only:
{"ok":true|false,"unexplainedChanges":[],"days":[{"day":N,"prose":N,"mainSteps":N,"secondSteps":N,"altBullets":N,"outAgainBullets":N,"insightWords":N}],
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
      { label: `recheck:wk${pad(wk)}`, phase: 'Recheck', effort: 'high' }
    )
  }
)

return out

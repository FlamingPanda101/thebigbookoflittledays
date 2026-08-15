export const meta = {
  name: 'trim-to-band',
  description: 'Cut over-long days back to the spec word band without losing content',
  phases: [
    { title: 'Trim', detail: 'one agent per over-long week' },
    { title: 'Recheck', detail: 'confirm nothing was lost in the cut' },
  ],
}

const SP = 'C:\\Users\\Josep\\AppData\\Local\\Temp\\claude\\C--Users-Josep--claude\\f2051431-8954-4594-9860-3b743569602a\\scratchpad'
const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const OUT = SP + '\\newweeks'

// week -> per-day current prose counts, first day of the week listed first
const OVER = {
  2: { first: 8,  counts: { 8: 1323, 9: 1221, 10: 1244, 11: 1253, 12: 1243, 13: 1240, 14: 1241 } },
  4: { first: 22, counts: { 22: 1333, 23: 1264, 24: 1294, 25: 1271, 26: 1218, 27: 1271, 28: 1199 } },
  5: { first: 29, counts: { 29: 1300, 30: 1289, 31: 1200, 32: 1211, 33: 1259, 34: 1209, 35: 1380 } },
  6: { first: 36, counts: { 36: 1365, 37: 1212, 38: 1284, 39: 1216, 40: 1225, 41: 1187, 42: 1360 } },
  7: { first: 43, counts: { 43: 1321, 44: 1191, 45: 1212, 46: 1202, 47: 1207, 48: 1276, 49: 1261 } },
  8: { first: 50, counts: { 50: 1341, 51: 1208, 52: 1204, 53: 1208, 54: 1203, 55: 1205, 56: 1207 } },
}

const WEEKS = Array.isArray(args) && args.length ? args : [2, 4, 5]
const pad = (n) => String(n).padStart(2, '0')

phase('Trim')

const res = await pipeline(
  WEEKS,

  (wk) => {
    const o = OVER[wk]
    const rows = Object.entries(o.counts).map(([d, c]) => {
      const ceil = Number(d) === o.first ? 1300 : 1150
      const cut = c - ceil
      return `  Day ${d}: ${c} prose words, ceiling ${ceil}` +
             (cut > 0 ? `, CUT ~${cut}` : `, already in band, leave it`)
    }).join('\n')

    return agent(
`Trim one week of a printed activity book back to its specified length.

THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn (3) and Kreston (a baby). She reads it at 8:00 in the
morning while holding the baby. Warm, practical, direct, written to a
competent adult.

FILE TO EDIT IN PLACE: ${OUT}\\wk${pad(wk)}-days.md
REFERENCE, correct length and register: ${REPO}\\months\\01-jan-w1.md
  (its days run 1,054-1,145 prose words, and its first day runs 1,282 because
   it carries the Around the World sidebar)

THE SPEC: 1,000-1,150 words of PROSE per day, plus the ~155 word schedule
block which does NOT count. The week's first day may reach 1,300 because it
carries the sidebar. These days overshoot:

${rows}

Every day must land in 1,000-1,150 prose (first day of the week: up to 1,300).
Do not go under 1,000. The two-page printed spread depends on this.

HOW TO CUT. In this order:
1. Tighten sentences. Most of the excess is qualification, restatement and
   explaining a step twice.
2. Cut sentences that tell Brooklyn what the point of an activity is. She can
   see it. "..., and that is the point" style tails go first.
3. Cut throat-clearing lead-ins to sections.
4. Shorten the Infant Integration and Kreston's Afternoon paragraphs if they
   have drifted past four sentences.

NEVER CUT:
- any material or quantity from a materials list
- any numbered step, or the number of steps
- any Afternoon Alternative or Out Again bullet
- any Safety block, or any hazard detail inside one
- the Around the World sidebar on the week's first day
- any schedule row
- times, ages, dates, weekdays, or Kreston's stated age in months

NEVER CHANGE:
- the anchors, the day header lines, the date lines, the theme lines
- any line starting with ###, including the activity names after the colon
- the insight HEADLINE, the "> **...**" line after the brain-emoji line.
  You may tighten the insight BODY, keeping it in the 100-120 word range.
- the page-break divs

STYLE, unchanged from the rest of the book: no em dashes in prose (schedule
rows are table formatting and stay), no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts ("not X, it's Y"), no dramatic fragments, no passive voice,
no false agency, no Wh- sentence openers. Vary sentence length. Safety
absolutes ("Never leave Kreston alone with it") stay and stay strong.

Work day by day. After each, count the prose words yourself and confirm the
day is in band before moving on.

RETURN a table: day, prose words before, prose words after.`,
      { label: `trim:wk${pad(wk)}`, phase: 'Trim' }
    )
  },

  (rep, wk) => agent(
`Verify a trimmed week of a printed activity book. Assume the trimmer cut too
much or cut the wrong thing.

FILE: ${OUT}\\wk${pad(wk)}-days.md

Check every one of the seven days:

1. LENGTH. Prose words per day, excluding the ~155 word schedule block, must
   be 1,000-1,150. The week's first day may reach 1,300 for its sidebar.
   Report the actual count per day. Under 1,000 is a MAJOR issue.
2. NOTHING LOST. Compared with what a complete day needs: full materials list
   with quantities, 4-6 numbered steps in the Main Event, 5-7 in the Second
   Main Event, 3-4 Afternoon Alternatives, 4-6 Out Again bullets, an Infant
   Integration, a Kreston's Afternoon, an insight of 100-120 words. Any
   Safety block that existed must still exist with its hazard detail intact.
   The Around the World sidebar must still be on the first day.
3. FROZEN LINES intact: anchors, day headers, date lines, theme lines, every
   ### heading, the insight headlines, all 16 schedule rows per day, the
   page-break divs.
4. NO NEW SLOP: em dashes in prose, adverbs, binary contrasts, dramatic
   fragments, passive voice, false agency, Wh- openers.
5. STILL READS WELL. The cut must not have left clipped, telegraphic prose.
   The register is warm and practical.

RETURN JSON only:
{"ok":true|false,"days":[{"day":N,"prose":N,"inBand":true|false}],
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `recheck:wk${pad(wk)}`, phase: 'Recheck', effort: 'high' }
  )
)

return res

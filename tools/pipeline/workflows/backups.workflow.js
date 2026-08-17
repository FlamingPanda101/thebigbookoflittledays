export const meta = {
  name: 'backup-sections',
  description: 'Write the twelve backup sections: 2 bad weather days, 2 sick days and an extras page per month',
  phases: [
    { title: 'Write', detail: 'one agent per month' },
    { title: 'Verify', detail: 'format, season fit, sick-day rules, uniqueness' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const BRIEFS = REPO + '\\tools\\pipeline\\backup-briefs.json'

const MONTHS = [
  { name: 'January', pre: '01', ab: 'jan', wk: [1, 5],   kr: '6 to 7 months, sitting, mouthing everything, rocking on hands and knees' },
  { name: 'February', pre: '02', ab: 'feb', wk: [6, 9],  kr: '8 months, crawling or shuffling, wary of strangers' },
  { name: 'March', pre: '03', ab: 'mar', wk: [10, 13],   kr: '9 months, pulling to stand, pincer grip, waving' },
  { name: 'April', pre: '04', ab: 'apr', wk: [14, 18],   kr: '10 months, cruising furniture, pointing, understands no' },
  { name: 'May', pre: '05', ab: 'may', wk: [19, 22],     kr: '11 months, standing alone briefly, first words possible' },
  { name: 'June', pre: '06', ab: 'jun', wk: [23, 26],    kr: 'turning ONE on June 5, walking or close, drinks from a cup' },
  { name: 'July', pre: '07', ab: 'jul', wk: [27, 31],    kr: '13 months, walking, climbing, carrying things while moving' },
  { name: 'August', pre: '08', ab: 'aug', wk: [32, 35],  kr: '14 months, scribbling, stacking two blocks, 3 to 5 words' },
  { name: 'September', pre: '09', ab: 'sep', wk: [36, 39], kr: '15 months, running, using a spoon, pointing at pictures' },
  { name: 'October', pre: '10', ab: 'oct', wk: [40, 44], kr: '16 months, stacking four blocks, copying chores, 10+ words' },
  { name: 'November', pre: '11', ab: 'nov', wk: [45, 48], kr: '17 months, kicking a ball, two-word combinations starting' },
  { name: 'December', pre: '12', ab: 'dec', wk: [49, 52], kr: '18 months, climbing stairs holding on, pretend play, 20+ words' },
]

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)", a printed 365-day activity
book. Joseph wrote it for Brooklyn to use with Azlyn and Kreston. She reads it
at 8:00 in the morning. Warm, practical, direct, written to an equal, never
preachy.

AZLYN is THREE all year until December 20, Day 354, and FOUR after.

RULES: ${REPO}\\CLAUDE.md, especially Locale and Writing style.
FORMAT SPEC: ${REPO}\\CONTINUATION.md section 8.
REFERENCE for register and day format: ${REPO}\\months\\01-jan-w1.md

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts ("not X, it's Y"), no negative listing, no dramatic
fragments, no passive voice, no false agency, no Wh- sentence openers. Vary
sentence length. Safety absolutes stay strong. Prose wraps near 78 columns;
numbered steps and bullets stay one line each. LF endings, no trailing
whitespace.

⚠️ DO NOT USE THE "## 🌟 Day N: ... 🌟" HEADER FORMAT ANYWHERE. A validator
counts those to check the book has exactly 365 days, and a backup day is not
one of the 365. Backup days use their own headers, given below.
`

phase('Write')

const out = await pipeline(
  MONTHS,

  (m) => agent(
`Write the ${m.name} backup section. ${RULES}

YOUR BRIEF: ${BRIEFS} — find the entry where "abbrev" is "${m.ab}". It gives
the file name, the five anchors, that month's real weather, and FOUR insight
headlines allocated to you from the unused pool.

READ THIS MONTH'S ACTUAL WEEKS FIRST, so the backups feel like the same book
and do not repeat activities the month already used:
${Array.from({length: m.wk[1] - m.wk[0] + 1}, (_, i) =>
  `  ${REPO}\\months\\${m.pre}-${m.ab}-w${m.wk[0] + i}.md`).join('\n')}

WRITE TO: ${REPO}\\months\\${m.pre}-${m.ab}-zz-backup.md

=== STRUCTURE ===

<a id="backup-${m.ab}"></a>
(blank)
# 🌧️ ${m.name} — Backup Days & Extra Ideas
(blank)
A short paragraph, three or four sentences, on what this section is for and
when Brooklyn reaches for it. Written to her, not about her.
(blank)
---
(blank)
Then five pieces, in this order, each opening with its own anchor:

**TWO BAD WEATHER DAYS**, anchors ${m.ab}-weather-1 and ${m.ab}-weather-2.
Header format: ## 🌧️ Bad Weather Day 1 — [Title]
These are FULL DAY PLANS in the same shape as a normal day: 🌙 Prep Tonight,
an ⏰ At-a-Glance Schedule of 16 rows from 8:00 to 6:00, 🌅 Opening Activity,
🎨 The Main Event with a full materials list and 4-6 numbered steps and a Tip,
an indoor substitute for Get Outside, 👶 Infant Integration, 🎨 Second Main
Event with 5-7 steps and a Tip, 🎯 Afternoon Alternatives, 👶 Kreston's
Afternoon, and 🧠 A Little Parenting Insight. NO 🌳 Out Again: the point of the
day is that going out is off.
Write them for ${m.name}'s REAL weather. The brief names it. A January bad
weather day is not an April one.

**TWO SICK DAYS**, anchors ${m.ab}-sick-1 and ${m.ab}-sick-2.
Header format: ## 🤒 Sick Day 1 — [Title]
These are DIFFERENT and the difference is the point:
  - NO outdoor section at all, and no schedule of clock times. Use a vague
    shape instead: "whenever she wakes", "after the first long sleep",
    "when she asks for food", "before the afternoon dip".
  - A REST BLOCK is the centre of the day, not an activity.
  - Activities are low-demand and can be abandoned: things done lying down,
    on a lap, from a sofa, with one hand.
  - No materials that need setting up, cutting, baking or cleaning after.
  - One is for the worst day, flat on the sofa. The other is for the mend,
    when she is bored but not well.
  - Each still carries 🧠 A Little Parenting Insight.
  - Kreston still needs somewhere to be, and a sick sibling changes that.

**ONE EXTRA IDEAS PAGE**, anchor ${m.ab}-extras.
Header format: ## 🎲 ${m.name} — Extra Ideas
  - 🎲 **Alternative Activities**, about eleven one-line ideas
  - 🎨 **Alternative Arts & Crafts**, about eleven one-line ideas
  - 👶 **Kreston's Turn**, three or four one-line ideas for him at his age
    this month: ${m.kr}
Each line is a title plus a clause, no steps. These are for the parent who
opens the book with ten minutes and no plan.

End the file with:
<div style="page-break-after: always;"></div>

=== HARD RULES ===
- Kreston is ${m.kr} this month. Everything asked of him must match that.
- Use the four insight headlines from your brief, verbatim, one per backup
  day. If one does not fit its day, you may swap it for another from
  ${REPO}\\tools\\insight-pool.md, but ONLY one that appears nowhere in
  ${REPO}\\tools\\titles.tsv and nowhere else in the book. Insight bodies are
  100-120 words.
- Every activity name must be new. Check ${REPO}\\tools\\titles.tsv.
- No activity here may repeat one from this month's five weeks, which you have
  just read.
- Materials come from a normal house, the recycling, or a cheap store trip.
  A bad weather day cannot need a special trip, because the weather is why
  nobody is going out.
- Safety blocks where there is a real hazard, with an action attached, and no
  filler warnings.

RETURN: the five piece titles, the four insight headlines you used and whether
you swapped any, and confirmation that no activity repeats the month's weeks.`,
    { label: `backup:${m.ab}`, phase: 'Write', effort: 'high' }
  ),

  (rep, m) => agent(
`Verify the ${m.name} backup section. Be skeptical. ${RULES}

FILE: ${REPO}\\months\\${m.pre}-${m.ab}-zz-backup.md
THE MONTH'S WEEKS: ${Array.from({length: m.wk[1] - m.wk[0] + 1}, (_, i) =>
  `${m.pre}-${m.ab}-w${m.wk[0] + i}.md`).join(', ')}
TITLES USED BOOK-WIDE: ${REPO}\\tools\\titles.tsv

CHECK:
1. NO "## 🌟 Day N: ... 🌟" header anywhere. That format is counted by a
   validator and a backup day is not one of the 365. CRITICAL if present.
2. All five anchors present and correct: ${m.ab}-weather-1, ${m.ab}-weather-2,
   ${m.ab}-sick-1, ${m.ab}-sick-2, ${m.ab}-extras.
3. The two bad weather days are full day plans with 16 schedule rows, a Main
   Event of 4-6 steps and a Second Main Event of 5-7, and NO Out Again
   section.
4. THE SICK DAYS ARE ACTUALLY DIFFERENT. No outdoor section, no clock-time
   schedule, a rest block at the centre, low-demand abandonable activities,
   nothing needing setup or cleanup. A sick day that reads like a normal day
   with the walk removed is a MAJOR issue. One should be for the worst day and
   one for the mend.
5. The extras page has about eleven activities, about eleven arts and crafts,
   and a Kreston's Turn list.
6. SEASON: the bad weather days are written for ${m.name}'s real weather, and
   nothing needs a store trip the weather prevents.
7. KRESTON: everything asked of him matches ${m.kr}.
8. UNIQUENESS: no activity name appears in titles.tsv or in this month's five
   weeks. Quote any repeat.
9. INSIGHTS: four of them, bodies 100-120 words, headlines not used elsewhere.
10. Style: US English, no em dashes in prose, no banned adverbs, no Wh-
    sentence openers, no cut-seam damage.

RETURN JSON only:
{"ok":true|false,"issues":[{"severity":"critical|major|minor","piece":"...","problem":"...","fix":"..."}]}`,
    { label: `verify:${m.ab}`, phase: 'Verify', effort: 'high' }
  )
)

return out

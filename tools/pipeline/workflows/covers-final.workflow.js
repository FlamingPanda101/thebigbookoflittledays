export const meta = {
  name: 'covers-final',
  description: 'Final cover polish: two-sentence bullets, exact attribution, correct hands',
  phases: [{ title: 'Polish', detail: 'one agent per cover, then self-check' }],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const F = REPO + '\\tools\\pipeline\\VERIFY-COVERS2.txt'

const B = [
  { name: 'February', pre: '02', ab: 'feb', wk: [6, 9] },
  { name: 'March', pre: '03', ab: 'mar', wk: [10, 13] },
  { name: 'April', pre: '04', ab: 'apr', wk: [14, 18] },
  { name: 'May', pre: '05', ab: 'may', wk: [19, 22] },
  { name: 'June', pre: '06', ab: 'jun', wk: [23, 26] },
  { name: 'July', pre: '07', ab: 'jul', wk: [27, 31] },
  { name: 'August', pre: '08', ab: 'aug', wk: [32, 35] },
  { name: 'September', pre: '09', ab: 'sep', wk: [36, 39] },
  { name: 'October', pre: '10', ab: 'oct', wk: [40, 44] },
  { name: 'November', pre: '11', ab: 'nov', wk: [45, 48] },
  { name: 'December', pre: '12', ab: 'dec', wk: [49, 52] },
]

phase('Polish')

const out = await pipeline(
  B,
  (b) => agent(
`Final polish on the ${b.name} booklet cover. This is the last pass; the
fabricated-hazard problem is already fixed and every bullet now traces to a
real day. What remains is precision.

FILE: ${REPO}\\months\\${b.pre}-${b.ab}-00-cover.md
MODEL: ${REPO}\\months\\01-jan-00-cover.md
FINDINGS FROM THE LAST VERIFIER: ${F} — find your month and fix every issue.
THE MONTH'S DAYS, the only source of truth:
${Array.from({length: b.wk[1] - b.wk[0] + 1}, (_, i) =>
  `  ${REPO}\\months\\${b.pre}-${b.ab}-w${b.wk[0] + i}.md`).join('\n')}

FOUR THINGS, and nothing else:

1. TWO SENTENCES MAXIMUM after the bold lead-in, on every bullet. Several run
   to three and one to 55 words. January's model is one or two short
   sentences. Cut the middle sentence, which is usually the one restating what
   the day page already says. Keep the specific day numbers.

2. EXACT ATTRIBUTION. A hazard listed under a day it does not occur on is the
   same failure as inventing it, in a milder form. February attributes cut
   straws to Days 46 and 54 when they are only on 54. Check every item in
   every bullet against the day it names, and split or move anything that is
   wrong.

3. RIGHT HANDS. April files the litter-pick tongs on Day 112 as an adult-only
   step, but that day hands them to Azlyn: "She works the tongs, you hold the
   bag open". The real adult-only half of that day is the sharp litter, the
   glass and the cans. Check every adult-only claim against who actually holds
   the tool on that day.

4. RIGHT HEADING. A hazard filed under the wrong heading trains the same
   skimming. March files a balloon warning under "String and cord". A balloon
   is not cord: give it its own line or move it to the small-parts bullet.

Do not add hazards. Do not rewrite bullets that are already correct and two
sentences. Do not touch the contents list, the ages or the dates unless the
findings say they are wrong.

STYLE: US English, no em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts, no Wh- sentence openers. LF endings, no trailing whitespace.

WHEN YOU HAVE FINISHED, re-read the file and check yourself: every bullet at
most two sentences after the lead-in, every day number correct, every
adult-only claim matching who holds the tool, every hazard under a heading it
belongs to.

RETURN a table: bullet, sentence count before and after, and any attribution
you corrected.`,
    { label: `polish:${b.ab}`, phase: 'Polish', effort: 'high' }
  )
)

return out

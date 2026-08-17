export const meta = {
  name: 'fix-covers',
  description: 'Repair the booklet covers: every named hazard must trace to a real day',
  phases: [
    { title: 'Repair', detail: 'one agent per cover' },
    { title: 'Verify', detail: 'trace every hazard back to its day' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const FINDINGS = REPO + '\\tools\\pipeline\\VERIFY-COVERS.txt'

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

const RULE = `
THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn and Kreston. Warm, practical, direct, never preachy.

⚠️ THE DEFECT BEING FIXED. Cover agents invented hazards. April's cover warns
about a "magnet fishing bowl", "bottle planters" and a "shadow screen", and
none of those activities exist in April. March's warns about "the craft knife
on planting day" when planting day uses scissors and the craft knife is on mud
kitchen day. This is the worst thing a safety page can do: it trains Brooklyn
to skim the warnings, because some of them are about nothing.

THE RULE, and it is absolute: EVERY HAZARD NAMED ON A COVER MUST BE
TRACEABLE TO A SPECIFIC DAY AND A SPECIFIC ACTIVITY THAT EXISTS IN THAT
MONTH'S FILES. Before you write a bullet, find the day. If you cannot find the
day, the bullet does not go on the page.

Name the day where it helps Brooklyn, the way January does: "**String and
cord** — the zip line and the wrecking ball both use it."

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts, no dramatic fragments, no passive voice, no Wh- sentence
openers. LF endings, no trailing whitespace.

KEEP THE BULLETS SHORT. January's model is one or two sentences each. One
verifier flagged February's bullets running 60 to 95 words, which stops them
being "Quick Safety Reminders". Lead-in in bold, then two sentences at most.
`

phase('Repair')

const out = await pipeline(
  B,

  (b) => agent(
`Repair the ${b.name} booklet cover. ${RULE}

FILE TO FIX IN PLACE: ${REPO}\\months\\${b.pre}-${b.ab}-00-cover.md
MODEL: ${REPO}\\months\\01-jan-00-cover.md
VERIFIER FINDINGS: ${FINDINGS} — find the entry for ${b.name} and fix every
issue it raises. Some covers were passed clean; if yours was, still do the
audit below, because the verifiers checked hazards and may not have checked
every line.

THE MONTH'S ACTUAL DAYS, which are the only source of truth for what is in
this month:
${Array.from({length: b.wk[1] - b.wk[0] + 1}, (_, i) =>
  `  ${REPO}\\months\\${b.pre}-${b.ab}-w${b.wk[0] + i}.md`).join('\n')}

DO THIS:
1. Take every safety bullet on the cover one at a time. For each, SEARCH the
   month's files for the activity it names. If the activity does not exist,
   either delete the bullet or re-point it at the real activity that carries
   that hazard. Report the day number you found for each bullet.
2. Check every hazard the month DOES carry is represented. Read the Safety
   blocks across all the month's days and pick the five or six that recur or
   matter most. An oven that runs five days, a craft knife, string at toddler
   height, standing water, small parts with a crawling baby, the season.
3. Trim any bullet longer than two sentences after its bold lead-in.
4. Verify the week numbers, themes and day ranges against the actual
   "## Week N:" headers. Verify the booklet number, the day range and the date
   range against the real 2027 calendar.
5. Verify Kreston's stated age against what the month's Infant Integration
   blocks actually say, not against a table. One cover said his pincer grip
   arrived on the 5th when the month's own days date it to two weeks earlier.
6. Verify Azlyn's age line. She is three until December 20, Day 354, and four
   after. December's cover must say she turns four this month.

RETURN a table: each safety bullet, the day number that justifies it, and
whether you kept, re-pointed or deleted it.`,
    { label: `cover:${b.ab}`, phase: 'Repair', effort: 'high' }
  ),

  (rep, b) => agent(
`Verify the repaired ${b.name} cover. Be skeptical. ${RULE}

FILE: ${REPO}\\months\\${b.pre}-${b.ab}-00-cover.md
THE MONTH'S DAYS: ${Array.from({length: b.wk[1] - b.wk[0] + 1}, (_, i) =>
  `${REPO}\\months\\${b.pre}-${b.ab}-w${b.wk[0] + i}.md`).join(', ')}

FOR EVERY SAFETY BULLET, find the day and activity in the month's files that
justifies it, and quote the line. A bullet you cannot trace to a real activity
is a CRITICAL issue: that is the exact defect this pass exists to fix.

Then check:
- week numbers, themes and day ranges match the "## Week N:" headers exactly
- booklet number, day range and date range match the real 2027 calendar
- Kreston's age matches the month's own Infant Integration blocks
- Azlyn's age is right, four only from Day 354
- bullets are at most two sentences after the bold lead-in
- structure matches January's cover: anchor, headings, contents links,
  page-break div
- US English, no em dashes, no banned adverbs, no Wh- openers

RETURN JSON only:
{"ok":true|false,"bulletsTraced":N,"issues":[{"severity":"critical|major|minor","bullet":"...","problem":"...","fix":"..."}]}`,
    { label: `verify:${b.ab}`, phase: 'Verify', effort: 'high' }
  )
)

return out

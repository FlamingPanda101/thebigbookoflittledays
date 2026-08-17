export const meta = {
  name: 'booklet-covers',
  description: 'Write the eleven missing booklet covers, February through December',
  phases: [
    { title: 'Write', detail: 'one agent per booklet' },
    { title: 'Verify', detail: 'contents, ages and season checks' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'

// month, prefix, abbrev, weeks, day range, Kreston age across the month
const BOOKLETS = [
  { n: 2,  name: 'February', pre: '02', ab: 'feb', wk: [6, 9],   days: [36, 63],   kr: '8 months, turning 9 on March 5' },
  { n: 3,  name: 'March',    pre: '03', ab: 'mar', wk: [10, 13], days: [64, 91],   kr: '9 months on the 5th, turning 10 on April 5' },
  { n: 4,  name: 'April',    pre: '04', ab: 'apr', wk: [14, 18], days: [92, 126],  kr: '9 months, turning 10 on April 5 and 11 on May 5' },
  { n: 5,  name: 'May',      pre: '05', ab: 'may', wk: [19, 22], days: [127, 154], kr: '11 months on the 5th, turning 1 on June 5' },
  { n: 6,  name: 'June',     pre: '06', ab: 'jun', wk: [23, 26], days: [155, 182], kr: 'turning ONE on June 5, Day 156' },
  { n: 7,  name: 'July',     pre: '07', ab: 'jul', wk: [27, 31], days: [183, 217], kr: '13 months from July 5' },
  { n: 8,  name: 'August',   pre: '08', ab: 'aug', wk: [32, 35], days: [218, 245], kr: '14 months from August 5' },
  { n: 9,  name: 'September',pre: '09', ab: 'sep', wk: [36, 39], days: [246, 273], kr: '15 months from September 5' },
  { n: 10, name: 'October',  pre: '10', ab: 'oct', wk: [40, 44], days: [274, 308], kr: '16 months from October 5' },
  { n: 11, name: 'November', pre: '11', ab: 'nov', wk: [45, 48], days: [309, 336], kr: '17 months from November 5' },
  { n: 12, name: 'December', pre: '12', ab: 'dec', wk: [49, 52], days: [337, 365], kr: '18 months from December 5' },
]

phase('Write')

const out = await pipeline(
  BOOKLETS,

  (b) => agent(
`Write the booklet cover for ${b.name} of a printed 365-day activity book.

THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn,
the mother of his children, to use with Azlyn and Kreston. Warm, practical,
direct, written to an equal, never preachy, never twee.

THE MODEL, and match it exactly in structure and register:
  ${REPO}\\months\\01-jan-00-cover.md
FORMAT SPEC: ${REPO}\\CONTINUATION.md section 8
RULES: ${REPO}\\CLAUDE.md, especially the Locale and Writing style sections

READ THE MONTH'S ACTUAL DAYS before you write a word. The safety reminders and
the "This Month" lines have to come from what is really in these files, not
from what a month like this usually contains:
${Array.from({length: b.wk[1] - b.wk[0] + 1}, (_, i) =>
  `  ${REPO}\\months\\${b.pre}-${b.ab}-w${b.wk[0] + i}.md`).join('\n')}

WRITE TO: ${REPO}\\months\\${b.pre}-${b.ab}-00-cover.md

EXACT STRUCTURE, following January:

<a id="booklet-${b.ab === 'jun' ? 'june' : b.name.toLowerCase()}"></a>
(blank)
# 📘 ${b.name}
## ☀️ *The Big Book of Little Days* ☀️
### Booklet ${b.n} of 12 · Days ${b.days[0]}–${b.days[1]}
**[first day's date] – [last day's date], 2027**
(blank)
*For Azlyn & Kreston · Made by Joseph for Brooklyn*
(blank)
---
(blank)
## This Month
(blank)
- [**Week N** · Theme](#week-N) — *Days X–Y*      one line per week
- [🌧️ **Backup Days & Extra Ideas**](#backup-${b.ab})
(blank)
> 👶 **Kreston this month:** ${b.kr}. [two or three lines on what he is
> actually doing at that age, taken from the Infant Integration blocks in this
> month's files, not invented.]
(blank)
> 🧒 **Azlyn this month:** [her age. She is three until December 20, Day 354,
> and four after. December's cover must say she turns four this month.]
(blank)
---
(blank)
## ⚠️ Quick Safety Reminders
(blank)
- Five or six bullets, each **bolded lead-in** then the reason.
(blank)
<div style="page-break-after: always;"></div>

THE SAFETY REMINDERS ARE THE POINT OF THIS PAGE. Do not write generic
warnings. Go through this month's four or five week files, find the hazards
that actually recur, and name them with the activity that carries them, the
way January does: "**String and cord** — the zip line and the wrecking ball
both use it. Take it down the moment the activity ends." Include the season:
January's cover ends on ice and heat loss; a July cover should end on sun,
heat and water; a December cover on candles, dark afternoons and cold.

The week themes and day ranges must be exact. Get them from the "## Week N:"
headers in the files, not from memory.

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts, no dramatic fragments, no passive voice, no Wh- sentence
openers. Vary sentence length. LF endings, no trailing whitespace.

RETURN: the week themes you listed, the number of safety bullets, and the two
or three hazards you judged most worth naming for this month.`,
    { label: `cover:${b.ab}`, phase: 'Write' }
  ),

  (rep, b) => agent(
`Verify the ${b.name} booklet cover.

FILE: ${REPO}\\months\\${b.pre}-${b.ab}-00-cover.md
MODEL: ${REPO}\\months\\01-jan-00-cover.md
THE MONTH'S DAYS: ${Array.from({length: b.wk[1] - b.wk[0] + 1}, (_, i) =>
  `${b.pre}-${b.ab}-w${b.wk[0] + i}.md`).join(', ')}

CHECK:
1. Every week number, theme and day range on the cover matches the actual
   "## Week N:" header and day numbers in the files. Quote any mismatch.
2. Days ${b.days[0]}-${b.days[1]} and "Booklet ${b.n} of 12" are correct, and
   the date range matches the real 2027 calendar.
3. Kreston's stated age matches what the month's Infant Integration blocks
   actually say.
4. Azlyn's age is right: three until Day 354, four after. December must say
   she turns four.
5. THE SAFETY REMINDERS ARE REAL. Each one must name a hazard that genuinely
   appears in this month's activities. A generic warning about something the
   month does not contain is a MAJOR issue: January's cover was once flagged
   for warning about a pond the day did not visit.
6. The anchor, the heading levels, the page-break div and the structure match
   January's cover.
7. US English, no em dashes, no banned adverbs, no Wh- openers.

RETURN JSON only:
{"ok":true|false,"issues":[{"severity":"critical|major|minor","problem":"...","fix":"..."}]}`,
    { label: `verify:${b.ab}`, phase: 'Verify', effort: 'high' }
  )
)

return out

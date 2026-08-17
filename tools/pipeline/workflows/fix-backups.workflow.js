export const meta = {
  name: 'fix-backups',
  description: 'Close the backup-section verifier findings: season fit, sick-day rules, pantry-only materials, locale',
  phases: [
    { title: 'Fix', detail: 'one agent per backup file' },
    { title: 'Verify', detail: 'confirm each finding is closed' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const F = REPO + '\\tools\\pipeline\\VERIFY-BACKUPS.txt'

const M = [
  { ab: 'jan', pre: '01', name: 'January', weather: 'freezing rain, snow, ice, dark by five' },
  { ab: 'feb', pre: '02', name: 'February', weather: 'COLD: snow, ice, frost, freezing rain. Not plain rain.' },
  { ab: 'mar', pre: '03', name: 'March', weather: 'wind, mud, cold rain, late snow possible' },
  { ab: 'apr', pre: '04', name: 'April', weather: 'rain showers, wind, cold snaps' },
  { ab: 'may', pre: '05', name: 'May', weather: 'thunderstorms, heavy rain, unseasonal cold' },
  { ab: 'jun', pre: '06', name: 'June', weather: 'thunderstorms, and heat too fierce to go out in' },
  { ab: 'jul', pre: '07', name: 'July', weather: 'dangerous heat, thunderstorms, smoke or air quality' },
  { ab: 'aug', pre: '08', name: 'August', weather: 'heavy heat, humidity, storms' },
  { ab: 'sep', pre: '09', name: 'September', weather: 'cold rain, wind, the first raw days' },
  { ab: 'oct', pre: '10', name: 'October', weather: 'wind, driving rain, dark by six' },
  { ab: 'nov', pre: '11', name: 'November', weather: 'grey, cold, wet, dark by five' },
  { ab: 'dec', pre: '12', name: 'December', weather: 'snow, ice, bitter cold, dark by four thirty' },
]

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn and Kreston. Warm, practical, direct, never preachy.

RULES: ${REPO}\\CLAUDE.md, especially Locale and Writing style.
SPEC: ${REPO}\\CONTINUATION.md section 8.

⚠️ A SCHEDULE ROW AND ITS SECTION HEADING NAME THE SAME ACTIVITY, character
for character. Rename one, rename the other.

⚠️ DO NOT USE THE "## 🌟 Day N: ... 🌟" HEADER FORMAT. A validator counts those
to confirm the book has 365 days.

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts, no negative listing, no dramatic fragments, no passive
voice, no Wh- sentence openers. Vary sentence length. Prose wraps near 78
columns. LF endings, no trailing whitespace.
`

phase('Fix')

const out = await pipeline(
  M,

  (m) => agent(
`Fix the ${m.name} backup section. ${RULES}

FILE: ${REPO}\\months\\${m.pre}-${m.ab}-zz-backup.md
VERIFIER FINDINGS: ${F} — find your month's entry and fix EVERY issue it
raises. Some months were passed cleaner than others; do the checks below
regardless.

=== 1. THE WEATHER MUST BE THIS MONTH'S WEATHER ===
Your bad weather days must be written for: ${m.weather}
${m.ab === 'feb' ? `
FEBRUARY IS THE WORST CASE AND MUST BE REWRITTEN. Both its bad weather days
are plain rain. February in the US is cold: snow, ice, frost, freezing rain.
The month's own cover says three walks hunt frost and ice and one puts her
bare palms on cold metal. January, November and December all carry the cold
correctly. Rewrite both February bad weather days around cold weather, keeping
the activities that still work and replacing the ones that only make sense in
rain.` : ''}

=== 2. A BAD WEATHER DAY CANNOT NEED A STORE RUN ===
The weather is the reason nobody is going out. Check every material on both
bad weather days: if it needs fresh groceries the house might not have, give
a pantry substitute in the same line, or rebuild the activity around what is
already in the kitchen. A conditional Prep Tonight ("if the forecast warned
you") does not solve this, because the day gets grabbed at 8:00 with no
warning.

=== 3. THE SICK DAYS MUST STAY SICK DAYS ===
No clock-time schedule, no outdoor section, a rest block at the centre, and
every activity abandonable in place. Anything needing setup, pins re-stood,
cutting, baking, or the child leaving the spot you built for her does not
belong. One is for the worst day, one for the mend.

=== 4. KRESTON'S AGE ===
He must not be given ability he does not have that month. January is 6 to 7
months: sitting, mouthing, rocking on hands and knees, NOT crawling to her
across a room. Check every mention against his real age in your month.

=== 5. LOCALE AND CONSISTENCY ===
Sweep for British survivals. Known ones across the twelve files: "half four"
(use "four thirty"), "Sledge" (sled), "Film Hour" (Movie Hour), "round the
tray" (around), "goes off" (spoils), "a meter" of string (a yard).
Also: the outdoor-replacement slot is named "🏠 Instead of Getting Outside" in
February and "🏠 Instead of Outside" elsewhere. Standardize on
"🏠 Instead of Getting Outside", in BOTH the schedule row and the heading, on
every bad weather day in your file.

=== 6. NO ORPHAN MATERIALS, NO DUPLICATE NAMES ===
Every listed item must be used by a step. Every activity name must appear
nowhere else in the book: check ${REPO}\\tools\\titles.tsv, which now includes
all backup-section titles. "The Blanket Sledge" in January duplicates
December's "The Blanket Sled" and one of them must change.

DO NOT report an item as done unless you changed the file.

RETURN a list: item number, what you changed, or why it needed no change.`,
    { label: `fix:${m.ab}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, m) => agent(
`Verify the repaired ${m.name} backup section. Be skeptical. ${RULES}

FILE: ${REPO}\\months\\${m.pre}-${m.ab}-zz-backup.md
FINDINGS IT SHOULD HAVE CLOSED: ${F}

CHECK:
1. Both bad weather days are written for ${m.weather}. Quote the weather line
   from each. A rain day in a snow month is a MAJOR issue.
2. Neither bad weather day needs groceries the house may not have, or every
   such item has a pantry substitute in the same line.
3. The two sick days have no clock-time schedule, no outdoor section, a rest
   block, and nothing needing setup or cleanup or the child leaving her spot.
4. Kreston is never given ability beyond his real age this month.
5. No British terms: half four, sledge, film (for movie), round (for around),
   goes off (for spoils), metric string.
6. The outdoor-replacement slot is "🏠 Instead of Getting Outside" in both the
   schedule row and the heading on every bad weather day.
7. Every schedule row names the same activity as its heading.
8. No orphan materials. No activity name appearing anywhere else in the book.
9. No "## 🌟 Day N" header anywhere.
10. Style: US English, no em dashes in prose, no banned adverbs, no Wh-
    openers, no cut-seam damage.

RETURN JSON only:
{"ok":true|false,"issues":[{"severity":"critical|major|minor","piece":"...","problem":"...","fix":"..."}]}`,
    { label: `verify:${m.ab}`, phase: 'Verify', effort: 'high' }
  )
)

return out

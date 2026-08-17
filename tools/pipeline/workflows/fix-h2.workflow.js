export const meta = {
  name: 'fix-second-half',
  description: 'Apply the pre-print audit fixes to Days 183-365: safety, US conversion, repetition, ages',
  phases: [
    { title: 'Fix', detail: 'one agent per month, owning its own files' },
    { title: 'Verify', detail: 'adversarial recheck of each month' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const FINDINGS = REPO + '\\tools\\pipeline\\AUDIT-H2-FINDINGS.txt'

const MONTHS = [
  { key: 'jul', days: [183, 217], files: ['07-jul-w27.md', '07-jul-w28.md', '07-jul-w29.md', '07-jul-w30.md', '07-jul-w31.md'] },
  { key: 'aug', days: [218, 245], files: ['08-aug-w32.md', '08-aug-w33.md', '08-aug-w34.md', '08-aug-w35.md'] },
  { key: 'sep', days: [246, 273], files: ['09-sep-w36.md', '09-sep-w37.md', '09-sep-w38.md', '09-sep-w39.md'] },
  { key: 'oct', days: [274, 308], files: ['10-oct-w40.md', '10-oct-w41.md', '10-oct-w42.md', '10-oct-w43.md', '10-oct-w44.md'] },
  { key: 'nov', days: [309, 336], files: ['11-nov-w45.md', '11-nov-w46.md', '11-nov-w47.md', '11-nov-w48.md'] },
  { key: 'dec', days: [337, 365], files: ['12-dec-w49.md', '12-dec-w50.md', '12-dec-w51.md', '12-dec-w52.md', '12-dec-w53-finale.md'] },
]

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)", a printed 365-day activity
book. Joseph wrote it for Brooklyn to use with Azlyn and Kreston. She reads it
at 8:00 in the morning. Warm, practical, direct, written to an equal, never
preachy.

AGES IN THIS RANGE:
- Azlyn is THREE until Day 353 and FOUR from Day 354, her birthday.
- Kreston is 13 months from Day 186, 14 from 217, 15 from 248, 16 from 278,
  17 from 309, 18 from 339. He walks, climbs, reaches counters and gets to
  water on his own feet.

SPEC: ${REPO}\\CONTINUATION.md
RULES: ${REPO}\\CLAUDE.md   (read the Locale and Writing style sections)
REFERENCE: ${REPO}\\months\\01-jan-w1.md is the canonical week.

NEVER CHANGE: anchors; "## 🌟 Day N: ... 🌟" headers; "**📅 ...**" date lines;
"**Theme:** ..." lines; "## Week N: ..." headers; the 16 At-a-Glance Schedule
rows per day; the page-break divs.

MAY CHANGE, and often must: any ### heading INCLUDING the activity name after
the colon. Renaming is REQUIRED when you replace an activity. Every activity
name in the book must stay unique, so check ${REPO}\\tools\\titles.tsv and do
not reuse a name from it. If you change an insight HEADLINE you MUST change
the matching bullet in that week's opener "What You'll Learn" list, which
quotes all seven verbatim minus the trailing full stop.

COUNTS ARE FIXED: Main Event 4-6 numbered steps, Second Main Event 5-7,
Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets, insight body
100-120 words, prose 1,000-1,150 per day (1,300 for a week's first day).

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts, no negative listing, no dramatic fragments, no passive
voice, no false agency, no Wh- sentence openers. Vary sentence length. Safety
absolutes stay strong. Prose wraps near 78 columns; steps and bullets stay one
line each. LF endings, no trailing whitespace.

After every edit read the whole sentence back. Past passes left a broken verb
agreement, a dropped article, a "where" with nothing to refer to, and a clause
stopping mid-thought.
`

phase('Fix')

const results = await pipeline(
  MONTHS,

  (m) => agent(
`Apply pre-print audit fixes to ${m.key.toUpperCase()}, Days ${m.days[0]}-${m.days[1]}.
${RULES}

YOUR FILES, and you are the only agent touching them:
${m.files.map(f => `  ${REPO}\\months\\${f}`).join('\n')}

THE AUDIT: ${FINDINGS}
Read it in full. Work ONLY on findings whose day numbers fall in
${m.days[0]}-${m.days[1]}. Another agent owns the rest.

=== 1. EVERY MUST-FIX FINDING IN YOUR RANGE ===
Most are safety. Where a step contradicts its own Safety block, make the STEP
obey the block unless the finding says otherwise. Where the audit names a day
elsewhere in the book that already handles the same hazard correctly, copy
that wording rather than inventing new phrasing.

Four run across several months, so check them on every one of your days even
where the audit does not name that day:

  a) THE LAP SLIDE. Going down a slide with a child on an adult's lap is the
     best-documented mechanism for toddler tibia fracture: the shoe catches
     the bed, the leg twists, the adult's weight completes the break. The
     audit found it on Days 200, 256 and 282, and the first half had it on
     Day 144. If any of your days has it, replace it: he goes down alone feet
     first on a short toddler slide with an adult at the bottom, or is walked
     down the steps and lifted off.
  b) SUN CREAM. It appears four times in ninety-one days and never inside a
     Safety block. Add it to the Safety block of EVERY day in your range whose
     Main Event or Get Outside runs outdoors between June and early September,
     using Day 187's wording as the house pattern: "hat on, cream at eight,
     cream again at eleven".
  c) WATER AND ROADS. Any day that sends water down a gutter or driveway, or
     runs an activity at a curb, needs a traffic sentence and a stated place
     for Kreston. Day 209 has the wording the book already owns: "At the
     drain, hold his hand from the curb onward and keep the grating on your
     side of him."
  d) A HAZARD NAMED WITH NO ACTION. Every sentence in a Safety block must end
     in something Brooklyn does. "Pumpkin seeds and Halloween candy are both
     choking size at 16 months" with no instruction after it is a defect.

=== 2. FINISH THE US CONVERSION ===
The converter was a word list and it stopped short. July through November
still ask for squash as a drink, cornflour, lining paper, A4 paper, prices in
pounds, and still send Brooklyn out for sycamore spinners. Sweep YOUR files
for:
  - British groceries and materials: squash (drink), cornflour, lining paper,
    A4, greaseproof, icing sugar, mince, courgette, aubergine, jelly (dessert)
  - money in pounds or pence
  - measurements given only in grams and millilitres where a US reader needs
    cups and spoons
  - British plants and seasonal events: sycamore spinners (US: maple samaras
    or helicopters), and any bloom, fall or migration timing that is British
  - a British sunset clock or a British daylight-saving date. US DST ends the
    first Sunday in November, which in 2027 is November 7, Day 311.

=== 3. NO TWO DAYS MAY RUN THE SAME ACTIVITY ===
Joseph's instruction: every activity unique. The audit names pairs running the
same activity from the same shopping list. THE EARLIER DAY KEEPS IT; the LATER
day is rewritten into something genuinely different, renamed, with its own
materials and steps. Do not re-skin it. If a pair spans months, only rewrite
the day in YOUR range.

=== 4. AZLYN IS FOUR FROM DAY 354 ===
If your range includes Days 354-365, hunt every phrase treating her as three.
Confirmed errors: Day 358 "Azlyn at three hides a coin behind her back" and
Day 364 "Azlyn at three hears death as a temporary state". Also check
"three-year-old" used about her on Days 361 and 363. Counts and measurements
that happen to say "three" are fine and must not be touched.

=== 5. INSIGHT ACCURACY ===
Fix any factual error, overclaim, or insight that corrects Brooklyn rather
than backing her. Hunt across ALL your days: any claim she sustained one
activity for 40 to 60 minutes (ten to twenty is typical at three), and any
"research shows" sentence you cannot stand behind.

DO NOT report a finding as fixed unless you changed the file.

RETURN a compact list: finding, days touched, what you changed.`,
    { label: `fix:${m.key}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, m) => agent(
`Adversarially verify the audit fixes applied to ${m.key.toUpperCase()},
Days ${m.days[0]}-${m.days[1]}. Assume the fixer made mistakes. ${RULES}

FILES: ${m.files.map(f => `${REPO}\\months\\${f}`).join(', ')}
THE AUDIT: ${FINDINGS}

CHECK:
1. Every must-fix finding in ${m.days[0]}-${m.days[1]} is genuinely fixed IN
   THE FILE. Quote the new text. A finding "addressed" in a report but absent
   from the file is CRITICAL.
2. NO LAP SLIDE survives anywhere in your range. Search for slide plus lap.
3. SUN CREAM is in the Safety block of every outdoor day from June to early
   September in your range.
4. NO SAFETY REGRESSION: does any numbered step contradict its own Safety
   block? Is any hazard named without an action? Does any day hand Kreston
   something that fails the too-big-to-swallow rule at his age that day?
5. Days 354-365 only: nothing treats Azlyn as three. Counts like "three
   parcels" and measurements like "three inches" are fine.
6. No British groceries, money, plants or DST dates left.
7. Structure intact: 16 schedule rows, Main Event 4-6 steps, Second Main 5-7,
   Alternatives 3-4 bullets, Out Again 4-6 bullets, insight 100-120 words,
   frozen lines unchanged.
8. Any renamed activity appears nowhere else in titles.tsv or these files.
9. Any changed insight headline matches its opener bullet exactly.
10. No cut-seam damage: missing subject, broken verb agreement, dropped
    article, dangling pronoun, clause stopping mid-thought.

RETURN JSON only:
{"ok":true|false,"fixedCount":N,"issues":[{"severity":"critical|major|minor",
"day":N,"problem":"...","fix":"..."}]}`,
    { label: `verify:${m.key}`, phase: 'Verify', effort: 'high' }
  )
)

return results

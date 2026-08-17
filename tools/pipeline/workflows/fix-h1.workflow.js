export const meta = {
  name: 'fix-first-half',
  description: 'Apply the pre-print audit fixes to Days 1-182: safety, plant calendar, repetition, insight accuracy',
  phases: [
    { title: 'Fix', detail: 'one agent per month, owning its own files' },
    { title: 'Verify', detail: 'adversarial recheck of each month' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const FINDINGS = REPO + '\\tools\\pipeline\\AUDIT-H1-FINDINGS.txt'

// one agent owns one month's files: no two agents ever write the same file
const MONTHS = [
  { key: 'jan', days: [1, 35],    files: ['01-jan-00-cover.md', '01-jan-w1.md', '01-jan-w2.md', '01-jan-w3.md', '01-jan-w4.md', '01-jan-w5.md'] },
  { key: 'feb', days: [36, 63],   files: ['02-feb-w6.md', '02-feb-w7.md', '02-feb-w8.md', '02-feb-w9.md'] },
  { key: 'mar', days: [64, 91],   files: ['03-mar-w10.md', '03-mar-w11.md', '03-mar-w12.md', '03-mar-w13.md'] },
  { key: 'apr', days: [92, 126],  files: ['04-apr-w14.md', '04-apr-w15.md', '04-apr-w16.md', '04-apr-w17.md', '04-apr-w18.md'] },
  { key: 'may', days: [127, 154], files: ['05-may-w19.md', '05-may-w20.md', '05-may-w21.md', '05-may-w22.md'] },
  { key: 'jun', days: [155, 182], files: ['06-jun-w23.md', '06-jun-w24.md', '06-jun-w25.md', '06-jun-w26.md'] },
]

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)", a printed 365-day activity
book. Joseph wrote it for Brooklyn to use with Azlyn (three) and Kreston (her
baby brother, 6 months on Day 1, 12 months on Day 156). She reads it at 8:00
in the morning holding the baby. Warm, practical, direct, written to an equal,
never preachy.

SPEC: ${REPO}\\CONTINUATION.md
RULES: ${REPO}\\CLAUDE.md   (read the Locale and Writing style sections)
REFERENCE: ${REPO}\\months\\01-jan-w1.md is the canonical week.

NEVER CHANGE, these are load-bearing for a validator:
- <a id="..."></a> anchors
- "## 🌟 Day N: ... 🌟" headers, "**📅 Weekday, Month D, 2027**" date lines,
  "**Theme:** ..." lines, "## Week N: ..." headers
- the 16 At-a-Glance Schedule rows per day
- <div style="page-break-after: always;"></div>

MAY CHANGE, and often must:
- any line starting with ###, INCLUDING the activity name after the colon.
  Renaming an activity is REQUIRED when you replace it. Every activity name in
  the book must stay unique, so check ${REPO}\\tools\\titles.tsv before naming
  anything, and do not reuse a name from it.
- the insight HEADLINE line ("> **...**" after the brain-emoji line) if a
  finding says the insight is wrong. If you change a headline you MUST also
  change the matching bullet in that week's opener "What You'll Learn" list,
  which quotes all seven headlines verbatim minus the trailing full stop.
  A validator fails on any mismatch.

COUNTS ARE FIXED: Main Event 4-6 numbered steps, Second Main Event 5-7,
Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets, insight body
100-120 words. Prose 1,000-1,150 words per day excluding the ~155 word
schedule block; the week's first day may reach 1,300 for its sidebar.

STYLE: US English throughout (see the Locale section of CLAUDE.md). No em
dashes in prose, no adverbs (really, just, literally, genuinely, honestly,
simply, actually, deeply, truly, fundamentally), no binary contrasts
("not X, it's Y"), no negative listing, no dramatic fragments, no passive
voice, no false agency, no Wh- sentence openers. Vary sentence length. Safety
absolutes stay strong. Prose wraps near 78 columns; steps and bullets stay one
line each. LF endings, no trailing whitespace.

AFTER EVERY EDIT, READ THE WHOLE SENTENCE BACK. Past passes have left a broken
verb agreement, a dropped article, a "where" with nothing to refer to, and a
clause stopping mid-thought.
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
${m.days[0]}-${m.days[1]}. Ignore every finding outside that range; another
agent owns those days.

Apply four categories of fix.

=== 1. EVERY "MUST FIX BEFORE PRINT" FINDING IN YOUR RANGE ===
These are almost all infant safety. The book sets a too-big-to-swallow
standard and then breaks it. Most have a correct model on another page: the
findings name it, so copy the book's own wording rather than inventing new
phrasing. Where a finding says a step contradicts its own Safety block, make
the STEP obey the block, not the other way round, unless the finding says
otherwise.

=== 2. THE PLANT AND WEATHER CALENDAR MUST BECOME AMERICAN ===
Spelling and vocabulary are already converted. The phenology is still British
and it is wrong for a US reader: snowdrops in February, hazel catkins, "late
March is frogspawn week", blackthorn blossom, elder in flower, bluebell woods,
cow parsley, agapanthus.

Go through YOUR days and replace any British-specific plant, bloom time or
seasonal event with something a family across much of the United States would
actually find in that month. Prefer widespread species: forsythia, crocus,
daffodil, redbud, dogwood, maple, oak, milkweed, goldenrod, dandelion,
clover. Keep the observation the activity is built on, change the organism.
If a day's whole activity depends on a British event, rebuild the activity
around an American one and rename it.

Also fix any daylight arithmetic that is wrong for the date.

=== 3. NO TWO DAYS MAY RUN THE SAME ACTIVITY ===
The audit lists pairs and clusters of days that repeat each other, some
sharing a title and a shopping list. Joseph's instruction: make every activity
unique.

THE RULE FOR WHICH DAY CHANGES: the EARLIER day keeps the activity, because
that is where the child gets the discovery first. The LATER day is rewritten
into something genuinely different, renamed, with its own materials and steps.
Do not just re-skin it: if the earlier day shakes cream into butter, the later
day must not be a shaking-a-jar activity at all.

If a cluster spans months, only rewrite the days in YOUR range. The findings
name every day in each cluster so you can tell which are yours.

=== 4. THE INSIGHT ACCURACY FINDINGS IN YOUR RANGE ===
Fix any factual error, and any place where an insight overclaims, corrects
Brooklyn rather than backing her, or contradicts another day. Two specific
patterns to hunt across ALL your days even if a finding does not name them:
  - Any claim that Azlyn sustained one activity for 40 minutes or an hour.
    Ten to twenty minutes is typical at three, and this is a number Brooklyn
    will measure herself against. Rewrite to something honest.
  - Any "research shows" style sentence you cannot stand behind. Either make
    the claim modest and true, or drop the citation framing and state the
    observation plainly.

DO NOT report a finding as fixed unless you changed the file.

RETURN a compact list: finding number, days touched, what you changed. Then
the per-day prose word counts for any day you edited.`,
    { label: `fix:${m.key}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, m) => agent(
`Adversarially verify the audit fixes applied to ${m.key.toUpperCase()},
Days ${m.days[0]}-${m.days[1]}. Assume the fixer made mistakes.
${RULES}

FILES: ${m.files.map(f => `${REPO}\\months\\${f}`).join(', ')}
THE AUDIT: ${FINDINGS}

CHECK:
1. Every must-fix finding in ${m.days[0]}-${m.days[1]} is genuinely fixed in
   the file. Quote the new text. A finding "addressed" only in the fixer's
   report and not in the file is a CRITICAL issue.
2. NO SAFETY REGRESSION. For every day you touched, does any numbered step now
   contradict its own Safety block? Is any hazard named without an action
   attached? Does the day hand Kreston anything that fails the
   too-big-to-swallow rule at his age that day?
3. Structure intact: anchors, day headers, date lines, theme lines, 16
   schedule rows, page-break divs unchanged. Main Event 4-6 steps, Second Main
   5-7, Alternatives 3-4 bullets, Out Again 4-6, insight body 100-120 words.
4. If any activity was RENAMED, the new name appears nowhere else in
   ${REPO}\\tools\\titles.tsv or in these files.
5. If any insight HEADLINE changed, the week opener's "What You'll Learn"
   bullet changed to match it exactly, minus the trailing full stop.
6. Plant calendar: no British-only species or bloom timing left in this range.
7. No two days in this range still run the same activity.
8. Style: US English, no em dashes in prose, no banned adverbs, no binary
   contrasts, no Wh- sentence openers, no cut-seam damage (missing subject,
   broken verb agreement, dangling pronoun, clause stopping mid-thought).

RETURN JSON only:
{"ok":true|false,"fixedCount":N,"issues":[{"severity":"critical|major|minor",
"day":N,"problem":"...","fix":"..."}]}`,
    { label: `verify:${m.key}`, phase: 'Verify', effort: 'high' }
  )
)

return results

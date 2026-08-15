export const meta = {
  name: 'stop-slop-week-1',
  description: 'Audit and rewrite Week 1 of the activity book under the stop-slop ruleset, verify adversarially, repair',
  phases: [
    { title: 'Rewrite', detail: 'one agent per block: cover, week opener, days 1-7' },
    { title: 'Verify', detail: 'adversarial check: frozen lines, lost content, residual slop' },
    { title: 'Repair', detail: 'fix only blocks that failed verification' },
    { title: 'Consistency', detail: 'cross-block voice and repetition sweep' },
  ],
}

const SP = 'C:\\Users\\Josep\\AppData\\Local\\Temp\\claude\\C--Users-Josep--claude\\f2051431-8954-4594-9860-3b743569602a\\scratchpad'
const IN = SP + '\\blocks'
const OUT = SP + '\\rewritten'

const BLOCKS = [
  { key: 'cover',  label: 'January cover' },
  { key: 'opener', label: 'Week 1 opener' },
  { key: 'day1',   label: 'Day 1 The Tower and the Time Capsule' },
  { key: 'day2',   label: 'Day 2 The Box House' },
  { key: 'day3',   label: 'Day 3 Ramps and Bridges' },
  { key: 'day4',   label: 'Day 4 Demolition Day' },
  { key: 'day5',   label: 'Day 5 Bricks and Mortar' },
  { key: 'day6',   label: 'Day 6 Triangles Hold' },
  { key: 'day7',   label: 'Day 7 The Fort' },
]

const CONTEXT = `
PROJECT
"The Big Book of Little Days (2027)" is a 365-day activity book. A dad (Joseph)
wrote it for Brooklyn, the mother of his kids, to use with Azlyn (3) and
Kreston (a baby, 6-7 months in January). Repo:
C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027

READER AND VOICE
Brooklyn is a competent adult, reading at 8:00 in the morning while holding a
baby. Warm, practical, direct. Never preachy. Never explains what she already
knows. She is treated as an equal, not coached.

This is INSTRUCTIONAL writing. A parent executes these steps with a
three-year-old. Readability matters, but a step that loses its meaning is a
defect far worse than any style violation.
`

const SLOP_RULES = `
THE STOP-SLOP RULESET (apply to prose sentences)

1. CUT FILLER
   - Throat-clearing openers: "Here's the thing", "Here's what/why/how",
     "The truth is", "It turns out", "The real X is", "Let me be honest",
     "Can we talk about".
   - Emphasis crutches: "Full stop.", "Let that sink in.", "This matters
     because", "Make no mistake", "Here's why that matters".
   - Filler: "At its core", "It's worth noting", "At the end of the day",
     "When it comes to", "The reality is", "In a world where".
   - Meta-commentary: "Hint:", "Plot twist:", "X is a feature, not a bug".

2. KILL ADVERBS
   No -ly words. Delete: really, just, literally, genuinely, honestly, simply,
   actually, deeply, truly, fundamentally, inherently, inevitably,
   interestingly, importantly, crucially.

3. BREAK FORMULAIC STRUCTURES
   - Binary contrasts: "not X, it's Y" / "X isn't the problem, Y is" /
     "The answer isn't X. It's Y." / "It feels like X. It's actually Y." /
     "stops being X and starts being Y" / "not just X but also Y".
     FIX: state Y directly. Drop the negation.
   - Negative listing: "Not a X. Not a Y. A Z." FIX: state Z.
   - Dramatic fragmentation: "[Noun]. That's it. That's the thing."
     "X. And Y. And Z." FIX: complete sentences.
   - Rhetorical setups: "What if...?", "Here's what I mean:", "Think about
     it:", "And that's okay."

4. ACTIVE VOICE, NAMED ACTOR
   Every sentence needs a human subject doing something. No passive voice.
   No false agency: complaints do not "become" fixes, decisions do not
   "emerge", cultures do not "shift", data does not "tell us". Name the
   person, or use "you" to put the reader in the seat.

5. BE SPECIFIC
   No vague declaratives ("The implications are significant", "The reasons
   are structural"). Name the specific thing.

6. PUT THE READER IN THE ROOM
   No narrator-from-a-distance: "Nobody designed this", "People tend to",
   "This happens because". "You" beats "People".

7. VARY RHYTHM
   Mix sentence lengths. Do not let three consecutive sentences match length.
   Do not end every paragraph on a punchy one-liner. Two items often beat
   three in PROSE.
   NO EM DASHES anywhere in prose. Use commas, periods or parentheses.

8. TRUST THE READER
   State facts directly. Skip softening and hand-holding.

9. CUT QUOTABLES
   If a sentence sounds like a pull-quote, rewrite it.

10. NO LAZY EXTREMES as rhetoric
    "every", "always", "never", "everyone", "nobody" used for emphasis.
    SEE THE EXCEPTION IN THE HARD CONSTRAINTS BELOW.

11. NO WH- SENTENCE OPENERS
    Sentences starting What/When/Where/Which/Who/Why/How become a crutch.
    Restructure to lead with the subject. (Section HEADINGS are exempt and
    are frozen anyway.)
`

const HARD_CONSTRAINTS = `
HARD CONSTRAINTS. Violating any of these fails the task.

A) FROZEN LINES. Reproduce these BYTE-IDENTICAL. A validator and a title
   ledger (tools/titles.tsv) depend on them. Changing one breaks the build.
   1. Anchor lines:  <a id="day-3"></a>  /  <a id="week-1"></a>  /
      <a id="booklet-january"></a>
   2. Day headers:   ## (star) Day N: Title (star)
   3. Date lines:    **[calendar] Weekday, Month D, 2027**
   4. Theme lines:   **Theme:** ...
   5. Week header:   ## Week 1: Shape Engineers & Building  and its date line
   6. EVERY line beginning with ### (all section headings, including the ones
      carrying activity names: "### Opening Activity: NAME",
      "### The Main Event: NAME", "### Second Main Event: NAME").
      The activity NAMES are logged in titles.tsv. Do not rename anything.
   7. The insight HEADLINE: the "> **...**" line directly after the
      "> [brain] **A Little Parenting Insight**" line. The headline is in
      titles.tsv. Rewrite the insight BODY, never its headline.
   8. Every At-a-Glance Schedule row (the lines matching
      "- **8:00-9:00 AM** - ..."). These are a table, not prose. The em dashes
      in them are formatting specified by the build spec. LEAVE THEM EXACTLY.
   9. <div style="page-break-after: always;"></div>
  10. In the week opener, the "What You'll Learn" bullets are the seven
      insight headlines quoted verbatim. They must keep matching the headlines
      in the day files. Do not touch them.

  Emoji appear in many of these lines. Copy every line character for
  character, emoji included.

B) INSTRUCTIONAL INTEGRITY OUTRANKS STYLE
   - Every material stays. Every quantity stays. Never drop an item from a
     materials list to tighten prose.
   - Step COUNT stays identical. If a Main Event has 6 numbered steps, the
     rewrite has 6 numbered steps, in the same order, doing the same things.
   - Every bullet in "Afternoon Alternatives" and "Out Again" stays, same count.
   - Times, ages, dates, weekdays, measurements and Kreston's month-age stay
     exactly as written.

C) SAFETY ABSOLUTES SURVIVE
   Rule 10 bans "never"/"always" used as RHETORIC. In a Safety block,
   "Never leave Kreston in there on his own" is literally true and load-bearing.
   KEEP safety absolutes. Kill absolutes only where they are decoration
   ("a tower that never falls taught her nothing").

D) LENGTH
   Total block word count must land within 8% of the original. Do not pad and
   do not gut. Tightening is welcome; deleting content is not.

E) FORMAT
   - Preserve blank lines between sections and the existing blockquote "> "
     prefixes.
   - Match the existing wrapping: prose paragraphs wrap near 78 columns;
     numbered steps and bullets sit on one long line each.
   - Write LF line endings. No trailing whitespace. Keep the file's final line
     exactly as the original ends.
`

phase('Rewrite')

const results = await pipeline(
  BLOCKS,

  (b) => agent(
`You are rewriting one block of a printed activity book so it reads like a
person wrote it. ${CONTEXT}

TASK
1. Read the original block:  ${IN}\\${b.key}.md
2. Audit it against the stop-slop ruleset. Find every violation.
3. Rewrite the block, fixing every violation you can fix without breaking a
   hard constraint.
4. Write the result to:  ${OUT}\\${b.key}.md

${SLOP_RULES}

${HARD_CONSTRAINTS}

KNOWN VIOLATIONS ALREADY FOUND IN THIS BOOK (not exhaustive, find more):
- Roughly 38 em dashes in prose.
- "genuinely" x2, "actually" x2, "just" x2.
- Binary contrasts, for example: "Knocking it down is not the end of the
  activity, it is the measurement." / "A house nobody sits in is a craft
  project, not a house." / "Their mistakes are not random, they are evidence
  of rule-building." / "You are not being thrifty... You are handing her the
  better object."
- Punchy one-line paragraph endings used over and over ("That cycle is the
  week.", "The wrong words are the whole point.", "That is reading.").
- Narrator-from-a-distance in the parenting insights.

Work through the block line by line. Be thorough: this book will be printed
and read for a year.

RETURN a compact report: the count of violations you fixed by category, any
violation you deliberately left and why, and the original vs new word count.
Your final text is data for a script, not a message to a human.`,
    { label: `rewrite:${b.key}`, phase: 'Rewrite' }
  ),

  (report, b) => agent(
`You are the adversarial verifier. Another agent rewrote a block of a printed
activity book. Assume it made mistakes and find them. ${CONTEXT}

ORIGINAL: ${IN}\\${b.key}.md
REWRITE:  ${OUT}\\${b.key}.md

Read BOTH in full and compare them section by section.

CHECK, in priority order:

1. FROZEN LINES CHANGED (most severe). Every one of these must be
   byte-identical between original and rewrite:
   - <a id="..."></a> anchors
   - the "## ... Day N: ... " headers, the "**... Weekday, Month D, 2027**"
     date lines, the "**Theme:** ..." lines
   - the "## Week 1: ..." header and its date line
   - EVERY line starting with ### (all section headings, including activity
     names after the colon)
   - the insight headline, the "> **...**" line right after the
     "> ... A Little Parenting Insight" line
   - every At-a-Glance Schedule row
   - <div style="page-break-after: always;"></div>
   - in the opener, the "What You'll Learn" bullets
   Emoji count as characters. A dropped or swapped emoji is a critical issue.

2. LOST OR ALTERED INSTRUCTIONAL CONTENT
   - a material or quantity dropped or changed
   - the number of numbered steps changed, or a step now does something else
   - an Afternoon Alternative or Out Again bullet dropped
   - a time, age, date, weekday or measurement changed
   - Kreston's stated month-age changed (6 months Days 1-4, 7 months Days 5-7)
   - a SAFETY instruction weakened, softened or dropped. Safety absolutes
     ("never leave him alone") must survive intact.

3. RESIDUAL SLOP the rewriter missed
   - em dashes in prose (schedule rows are exempt and frozen)
   - adverbs: really, just, literally, genuinely, honestly, simply, actually,
     deeply, truly, fundamentally
   - binary contrasts ("not X, it's Y"), negative listing, dramatic fragments,
     rhetorical setups, throat-clearing openers
   - passive voice, false agency, narrator-from-a-distance
   - Wh- sentence openers in prose
   - three consecutive sentences of matching length
   - paragraphs that all end on a punchy one-liner

4. NEW DAMAGE
   - meaning changed, a sentence now says something false about a
     three-year-old or the activity
   - the warm practical register replaced with something clipped or cold
   - word count outside 8% of the original
   - broken markdown: lost "> " prefixes, lost blank lines, mangled bold

Be skeptical and specific. Quote the exact offending line.

RETURN JSON only:
{"clean": true|false, "issues": [{"severity":"critical|major|minor",
"category":"frozen|content|slop|damage","line":"the exact offending text",
"problem":"what is wrong","fix":"what it should say"}],
"origWords":N,"newWords":N}
Empty issues array if genuinely clean. Do not invent issues to look thorough.`,
    { label: `verify:${b.key}`, phase: 'Verify', effort: 'high' }
  ),

  async (verdict, b) => {
    let v = verdict
    if (typeof v === 'string') {
      try {
        const s = v.indexOf('{'), e = v.lastIndexOf('}')
        v = JSON.parse(v.slice(s, e + 1))
      } catch (err) { v = null }
    }
    const issues = (v && v.issues) || []
    if (v && v.clean === true && issues.length === 0) {
      log(`${b.key}: verified clean, no repair needed`)
      return { key: b.key, repaired: false, issues: 0 }
    }
    log(`${b.key}: ${issues.length} issue(s), repairing`)
    const res = await agent(
`Repair one block of a printed activity book. ${CONTEXT}

FILE TO FIX IN PLACE: ${OUT}\\${b.key}.md
ORIGINAL FOR REFERENCE: ${IN}\\${b.key}.md

An adversarial verifier found these issues:
${JSON.stringify(issues, null, 2)}

Fix every one. Critical and major issues are mandatory. Apply minor ones only
where the fix does not damage the prose.

Restoring a FROZEN line means copying it byte-for-byte from the original.
Restoring LOST CONTENT means putting the material, step, bullet or safety
instruction back, worded in the rewrite's cleaner voice.

${SLOP_RULES}

${HARD_CONSTRAINTS}

Rewrite the whole file. Do not leave a note in it. Do not add commentary.

RETURN a one-line-per-issue list of what you changed.`,
      { label: `repair:${b.key}`, phase: 'Repair' }
    )
    return { key: b.key, repaired: true, issues: issues.length, detail: res }
  }
)

phase('Consistency')

const sweep = await agent(
`You are doing a final cross-block consistency sweep on a rewritten week of a
printed activity book. ${CONTEXT}

Read all nine rewritten blocks:
${BLOCKS.map(b => `${OUT}\\${b.key}.md`).join('\n')}

Nine separate agents rewrote these in isolation, so none could see the others'
work. Find the problems that only appear when you read the week end to end:

1. REPEATED CONSTRUCTIONS across days. If four days now open a paragraph the
   same way, or five Tips share a sentence shape, or the same stock phrase
   ("worth watching for", "that is the point", "which is the same thing")
   shows up in six blocks, name it and say which blocks.
2. VOICE DRIFT. One block colder, chattier or more clipped than the rest.
3. RESIDUAL SLOP any single agent may have rationalised: em dashes in prose,
   surviving adverbs, binary contrasts, punchy one-liner paragraph endings.
4. FACTUAL CONTINUITY across days:
   - Kreston is 6 months on Days 1-4 and 7 months on Days 5-7. He turns 7
     months on Day 5, Tuesday January 5.
   - Azlyn is three all week.
   - Day 4 evening prep mixes the salt dough that Day 5 morning uses.
   - Day 6 builds a stick shelter outdoors; Day 7 checks on it.
   - Day 7's fort uses the salt dough bricks made on Day 5.
   - The week opener's shopping list must still cover the materials named in
     all seven days.
   - The opener's "What You'll Learn" bullets must still match the seven
     insight headlines word for word.
5. Any block where the rewrite lost the warmth that makes this book worth
   reading.

Report the worst 12 findings, most severe first. For each: which block, the
exact text, and the replacement you recommend. Do NOT edit any files.

RETURN JSON only:
{"findings":[{"blocks":["day2","day5"],"category":"repetition|voice|slop|continuity|warmth",
"text":"the exact offending text","problem":"...","fix":"..."}]}`,
  { label: 'cross-block-sweep', phase: 'Consistency', effort: 'high' }
)

return { results, sweep }

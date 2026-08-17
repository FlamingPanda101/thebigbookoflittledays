export const meta = {
  name: 'h1-leftovers',
  description: 'Close the gaps the first-half fix pass left, found by its own verifiers',
  phases: [
    { title: 'Fix', detail: 'one agent per month, owning its own files' },
    { title: 'Verify', detail: 'confirm each gap is closed in the file' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn (three) and Kreston. She reads it at 8:00 in the morning.
Warm, practical, direct, written to an equal, never preachy.

REFERENCE: ${REPO}\\months\\01-jan-w1.md
RULES: ${REPO}\\CLAUDE.md, especially Locale and Writing style.

NEVER CHANGE: anchors; "## 🌟 Day N: ... 🌟" headers; "**📅 ...**" date lines;
"**Theme:** ..." lines; "## Week N: ..." headers; the 16 At-a-Glance Schedule
rows; the page-break divs.

MAY CHANGE: ### headings including activity names, insight headlines (but if
you change a headline you MUST change the matching bullet in that week's
opener "What You'll Learn" list, which quotes all seven verbatim minus the
trailing full stop).

COUNTS ARE FIXED: Main Event 4-6 numbered steps, Second Main Event 5-7,
Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets, insight body
100-120 words, prose 1,000-1,150 per day (1,300 for a week's first day).

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts, no negative listing, no dramatic fragments, no passive
voice, no false agency, no Wh- sentence openers. Vary sentence length. Prose
wraps near 78 columns; steps and bullets stay one line each. LF endings.

After every edit read the whole sentence back. Past passes left a broken verb
agreement, a dropped article, and a clause stopping mid-thought.
`

// each agent owns one month's files, so no two ever write the same file
const WORK = [
  {
    key: 'jan', files: ['01-jan-00-cover.md', '01-jan-w1.md', '01-jan-w2.md', '01-jan-w3.md', '01-jan-w4.md', '01-jan-w5.md'],
    items: [
      `CRITICAL. Day 117's Main Event needs "100+ washed plastic bottle caps and milk-bottle lids" and its 8:00 opener assumes "the jar of washed caps" already exists, but NOTHING earlier in the book tells the reader to start saving. Day 1 already carries several year-long threads and can carry this one in a clause. Add a save-up line to Day 1's shopping list and one to months/01-jan-00-cover.md, in the book's own voice, for example "- [ ] A jar by the sink, and every bottle cap and milk-bottle lid dropped in it from today". Day 1's shopping list already models this with "start saving now" on the cardboard boxes.`,
      `Day 29's insight body is 122 words against the hard 100-120 cap, after an earlier fix replaced a 19-word clause with a 23-word one. Cut two or three words from that body without touching the headline.`,
      `Days 3, 4 and 17 now all close an Out Again bullet with the same phrase, "if the rain has set in", three times inside fifteen days, in the list Brooklyn scans at 2:30. Days 18 and 31 varied theirs. Vary two of the three so no phrase repeats inside a fortnight.`,
      `Day 33's Main Event opens on "The four feeders from January 17, brought in off their branches" with no substitute anywhere, so if those feeders came down in a February gale the 9:15 hour has nothing to run on. Add the substitute the way the book does elsewhere, for example "(four clean yogurt cups on new string if they did not survive)".`,
      `Six paragraphs were left ragged well short of the 78-column wrap by earlier edits: 01-jan-w1.md around "and drop them, running the same investigation" and "side within his reach and let"; 01-jan-w2.md around "turns your voice into something new. Twenty minutes," and "after they have made music together. Shared rhythm reads as"; 01-jan-w4.md around "pays out the second she solves it."; 01-jan-w5.md around "chickadee comes back for more if you hold still. Let her tick". Re-flow those paragraphs to 78 columns. Change no words.`,
      `Sweep all six of your files for any remaining British term the converter missed. It was built by guessing rather than reading, and verifiers found plain flour, till, washing-up bowl, porridge oats, wheelie bin, washing line, carrier bag, cotton wool, yoghurt, parcel tape, torchlight, fortnight, greengrocer, PVA and maths only after the fact. Report anything you find and fix it.`,
    ],
  },
  {
    key: 'feb-mar', files: ['02-feb-w6.md', '02-feb-w7.md', '02-feb-w8.md', '02-feb-w9.md', '03-mar-w10.md', '03-mar-w11.md', '03-mar-w12.md', '03-mar-w13.md'],
    items: [
      `Sweep every one of your files for British terms the converter missed, and for British plant or season references it could not see: any bloom time, insect, bird or natural event that is British rather than American. Fix each one, keeping the observation the activity is built on and changing the organism if you must.`,
      `Check that no two days in your range still run the same activity. The audit found February pairs at Days 40/47 (both shake cream into butter, seven days apart) and 52/61 (both make a face in salt dough from the same recipe with the same mirror), and a March pair at 71/83. If a pair survives, the EARLIER day keeps the activity and the LATER one is rewritten into something genuinely different, renamed, with its own materials and steps. Do not re-skin it.`,
      `Check every insight body in your range is 100-120 words and that none asserts the child sustained one activity for 40 to 60 minutes. Ten to twenty minutes is typical at three, and this is the number Brooklyn measures herself against.`,
      `Check every Safety block in your range against its own day's numbered steps. A step that contradicts its own Safety block is the worst defect class in this book. Also check that any object handed to Kreston passes the too-big-to-swallow rule at his stated age that day.`,
    ],
  },
  {
    key: 'apr-jun', files: ['04-apr-w14.md', '04-apr-w15.md', '04-apr-w16.md', '04-apr-w17.md', '04-apr-w18.md', '05-may-w19.md', '05-may-w20.md', '05-may-w21.md', '05-may-w22.md', '06-jun-w23.md', '06-jun-w24.md', '06-jun-w25.md', '06-jun-w26.md'],
    items: [
      `Sweep every file for British terms and British plant or season references the converter could not see. Fix each, keeping the observation and changing the organism where needed.`,
      `SUN CREAM. The audit found it appears once in 182 days and is missing from the entire June water week, Days 162 to 168, which runs outdoors from one o'clock in mid-June, and from Day 181. Add it to the outdoor or safety block of each of those days in the book's own voice, alongside the hats and shade already there.`,
      `Check no two days in your range run the same activity. The audit named pairs at 99/119 and clusters repeating blossom-catching and barefoot surface-ranking five or six times inside a fortnight. The EARLIER day keeps it; the LATER one is rewritten, renamed, with its own materials.`,
      `Check every insight body is 100-120 words, that none claims a 40-to-60-minute attention span, and that none contradicts another day.`,
      `Check every Safety block against its own day's numbered steps, and that anything handed to Kreston passes the too-big-to-swallow rule at his age that day. He walks from around Day 156.`,
    ],
  },
]

phase('Fix')

const out = await pipeline(
  WORK,

  (w) => agent(
`Close the gaps an earlier fix pass left in ${w.key.toUpperCase()}. ${RULES}

YOUR FILES, and you are the only agent touching them:
${w.files.map(f => `  ${REPO}\\months\\${f}`).join('\n')}

These were found by the verifiers that checked the earlier pass, so they are
real and specific. Work through them:

${w.items.map((it, i) => `${i + 1}. ${it}`).join('\n\n')}

DO NOT report an item as done unless you changed the file.

RETURN a list: item number, days touched, what you changed, or why an item
turned out to need no change.`,
    { label: `fix:${w.key}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, w) => agent(
`Verify the leftover fixes in ${w.key.toUpperCase()}. Be skeptical. ${RULES}

FILES: ${w.files.map(f => `${REPO}\\months\\${f}`).join(', ')}

For each item below, confirm it is genuinely fixed IN THE FILE and quote the
new text. An item "addressed" in a report but absent from the file is CRITICAL.

${w.items.map((it, i) => `${i + 1}. ${it.slice(0, 220)}...`).join('\n\n')}

Then check nothing regressed: 16 schedule rows per day, Main Event 4-6 steps,
Second Main 5-7, Alternatives 3-4 bullets, Out Again 4-6 bullets, insight
bodies 100-120 words, frozen lines unchanged, no British terms left, no em
dashes in prose, no banned adverbs, no cut-seam damage (missing subject,
broken verb agreement, dropped article, dangling pronoun, clause stopping
mid-thought).

RETURN JSON only:
{"ok":true|false,"itemsFixed":N,"issues":[{"severity":"critical|major|minor",
"day":N,"problem":"...","fix":"..."}]}`,
    { label: `verify:${w.key}`, phase: 'Verify', effort: 'high' }
  )
)

return out

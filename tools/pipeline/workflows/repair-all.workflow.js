export const meta = {
  name: 'repair-all',
  description: 'Close every outstanding verifier finding across the book, with schedule rows now editable',
  phases: [
    { title: 'Repair', detail: 'one agent per file block' },
    { title: 'Verify', detail: 'confirm each item is fixed in the file' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const H1 = REPO + '\\tools\\pipeline\\VERIFY-H1-ISSUES.txt'
const H2 = REPO + '\\tools\\pipeline\\VERIFY-H2-ISSUES.txt'

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)", a printed 365-day activity
book. Joseph wrote it for Brooklyn to use with Azlyn and Kreston. She reads it
at 8:00 in the morning. Warm, practical, direct, written to an equal.

AGES: Azlyn is THREE until Day 353 and FOUR from Day 354. Kreston is 6 months
on Day 1 and 18 by December; his month-by-month table is in CONTINUATION.md
section 1.

RULES: ${REPO}\\CLAUDE.md. Read the top three sections before you start.
REFERENCE: ${REPO}\\months\\01-jan-w1.md

⚠️ THE SCHEDULE ROWS ARE NOW EDITABLE. Joseph unfroze them. They used to be
never-change, and that made two defects unfixable.

The rule that replaces the freeze: A SCHEDULE ROW AND ITS SECTION HEADING NAME
THE SAME ACTIVITY, CHARACTER FOR CHARACTER. If you rename an activity, rename
its row, its heading, and anything else on the page pointing at it. Also fix
the rows that have no prose section of their own, Her Job, Quiet Play and
Wind-Down, if they referred to what you changed.

STILL FROZEN, never edit: the anchors, the "## 🌟 Day N: ... 🌟" header, the
"**📅 ...**" date line, the "**Theme:** ..." line, the "## Week N: ..." header,
and the page-break divs.

COUNTS ARE FIXED: Main Event 4-6 numbered steps, Second Main Event 5-7,
Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets, insight body
100-120 words, prose 1,000-1,150 per day (1,300 for a week's first day).
Activity names stay unique book-wide: check ${REPO}\\tools\\titles.tsv.

If you change an insight HEADLINE you MUST change the matching bullet in that
week's opener "What You'll Learn" list, which quotes all seven verbatim minus
the trailing full stop.

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts, no negative listing, no dramatic fragments, no passive
voice, no false agency, NO Wh- SENTENCE OPENERS (a previous pass introduced
"Where a driveway does cut the run..." and that is the pattern to avoid). Vary
sentence length. Safety absolutes stay strong. Prose wraps near 78 columns;
steps and bullets stay one line each. LF endings.

After every edit read the whole sentence back. Previous passes left a broken
verb agreement, a dropped article, orphan four-character lines inside
blockquotes, and a clause stopping mid-thought.
`

const BLOCKS = [
  {
    key: 'jan', files: ['01-jan-00-cover.md', '01-jan-w1.md', '01-jan-w2.md', '01-jan-w3.md', '01-jan-w4.md', '01-jan-w5.md'],
    items: [
      `THIS WHOLE BLOCK WAS NEVER DONE: the agent assigned to it died mid-run, so none of the following is fixed yet.`,
      `Day 117's Main Event needs "100+ washed plastic bottle caps and milk-bottle lids" and its 8:00 opener assumes "the jar of washed caps" exists, but nothing earlier in the book tells the reader to start saving. Add a save-up line to Day 1's shopping list and to months/01-jan-00-cover.md, in the book's voice. Day 1 already models it: "Cardboard boxes, 10-15 in mixed sizes (start saving now)".`,
      `Day 29's insight body is 122 words against the hard 100-120 cap. Cut two or three words without touching the headline.`,
      `Days 3, 4 and 17 all close an Out Again bullet with "if the rain has set in", three times inside fifteen days, in the list Brooklyn scans at 2:30. Vary two of the three.`,
      `Day 33's Main Event opens on "The four feeders from January 17, brought in off their branches" with no substitute, so a February gale leaves the 9:15 hour with nothing. Add a substitute in parentheses the way the book does elsewhere.`,
      `Six paragraphs are ragged well short of the 78-column wrap: in 01-jan-w1.md near "and drop them, running the same investigation" and "side within his reach and let"; in 01-jan-w2.md near "turns your voice into something new. Twenty minutes," and "after they have made music together. Shared rhythm reads as"; in 01-jan-w4.md near "pays out the second she solves it."; in 01-jan-w5.md near "chickadee comes back for more if you hold still." Re-flow to 78 columns, changing no words.`,
      `Sweep all six files for British terms the converter missed. It was a word list built by guessing, and verifiers later found plain flour, till, washing-up bowl, cotton wool, yoghurt, parcel tape, torchlight, fortnight, PVA and "towards" only by reading.`,
    ],
  },
  {
    key: 'feb', files: ['02-feb-w6.md', '02-feb-w7.md', '02-feb-w8.md', '02-feb-w9.md'],
    items: [
      `"LETTERBOX" IS BRITISH AND SURVIVES 15 TIMES in w7 and w8, including three At-a-Glance schedule rows that used to be unfixable. The rows are now editable. Convert every instance: the door fixture is a MAIL SLOT, the box by the door is a MAILBOX. Pick one object and be consistent. Touch: the week 7 opener (about line 13, bullet about line 30, shopping list about line 55), Day 43's two schedule rows and its Second Main Event heading, prose and tip, Day 45, Day 48, Day 49's schedule row, heading and materials, and 02-feb-w8.md's "push each envelope through the letterbox".`,
      `Day 43 now contradicts itself inside one activity: the heading and intro say "The Letterbox by the Door" while numbered step 3 says "Ask what a mailbox needs written on it". After the conversion above, every mention on that day must use the same word, including both schedule rows and the 4:15 Quiet Play row.`,
      `02-feb-w6.md has an orphan four-character line inside a Safety block: "> on" between "because a hot tap" and "its own will scald." Re-flow that block to 78 columns.`,
      `Check every Safety block in your files against its own day's numbered steps, and that nothing handed to Kreston fails the too-big-to-swallow rule at his stated age.`,
      `Sweep for remaining British terms.`,
    ],
  },
  {
    key: 'mar', files: ['03-mar-w10.md', '03-mar-w11.md', '03-mar-w12.md', '03-mar-w13.md'],
    items: [
      `CRITICAL, Day 72. Kreston is handed a budded twig: "Sit him on a wall while Azlyn hunts and let him hold the budded twig, too long to go far into his mouth." Buckeye and horse chestnut buds are toxic, a thin twig is a gag and puncture risk at 9 months, "sit him on a wall" adds an unsupervised fall risk, and the day's own Safety block says "Nothing she finds goes in a mouth". Day 44 already states the correct rule: "A willow twig snaps into mouth-sized pieces. The one Kreston swipes at stays in your hand." Rewrite Day 72's Infant Integration to match: he sits on your lap, gets an object the book already gives him, and the twig stays in the adult's hand.`,
      `CRITICAL, Day 83. A previous pass replaced the entire Second Main Event ("The Windowsill Row", 7 planting steps) with "Down at Kreston's Height" (6 baby-proofing steps), changed the schedule row, and stripped soil and pots from the week 12 shopping list. It left the 4:00 row "🧹 Her Job: Watering the Windowsill Row" pointing at a windowsill nothing now creates, and the Main Event's relocated chart line says "one box a morning", which fights the 4:00 slot and the insight's "same jar, same time". THE ROWS ARE NOW EDITABLE, so fix it coherently: either restore the planting activity and its shopping-list items and its row, or keep the baby-proofing activity and replace the orphaned Her Job row with a job the day actually creates. Pick one and make the whole day agree, including the insight.`,
      `Days 73 and 82 still run the same activity nine days apart: build a nest inside a bowl from materials laid in a line, then test it by tipping. The only difference is Day 82's choose-three constraint. Day 73 is EARLIER and keeps it. Rebuild Day 82's Main Event around a different physical form, for example weaving the three chosen materials into a fence or through wire mesh, keeping the choose-three constraint. Rename it, update its schedule row, its materials and the week's shopping list.`,
      `British "towards" survives twice: 03-mar-w10.md near "a parade of teddies coming down the hall towards him", and 03-mar-w13.md Day 87 step 3 "do not rush her towards 9:15". The book uses American "toward" 26 times elsewhere.`,
      `Two orphan lines inside blockquotes from earlier reflows: 03-mar-w11.md "> and keep loose" before "blankets and cushions clear of his face", and 03-mar-w12.md "> Handing her the" before "raisins and letting her sort out an impossible division". Re-flow both to 78 columns.`,
      `Over-long lines left by in-place word swaps in 03-mar-w11.md near Day 76 and 03-mar-w13.md near Day 90. Re-flow.`,
    ],
  },
  {
    key: 'apr-jun', files: ['04-apr-w14.md', '04-apr-w15.md', '04-apr-w16.md', '04-apr-w17.md', '04-apr-w18.md', '05-may-w19.md', '05-may-w20.md', '05-may-w21.md', '05-may-w22.md', '06-jun-w23.md', '06-jun-w24.md', '06-jun-w25.md', '06-jun-w26.md'],
    items: [
      `CRITICAL, Day 119. Its Second Main Event schedule row says "The Hotel in the Hedge" but the section heading says "Three Wrappers Round One Cookie". They must name the same activity. Work out from the day's materials and steps which one the activity actually IS, make the row and heading agree, and check the shopping list and any other row on that page.`,
      `02-feb-w9.md line about "Give her the floor, the wall and the driveway this year" runs 94 characters. Sweep your files for prose lines over about 85 characters that are not numbered steps or bullets, and re-flow them to 78.`,
      `Check every Safety block against its own day's numbered steps. Check nothing handed to Kreston fails the too-big-to-swallow rule at his age that day; he walks from around Day 156.`,
      `Check no two days in your range run the same activity from the same shopping list. The earlier day keeps it; the later is rewritten and renamed, with its rows updated.`,
      `Check every insight body is 100-120 words, none claims a 40-to-60-minute attention span, and none contradicts another day.`,
      `Sweep for remaining British terms and British plant or season references.`,
    ],
  },
  {
    key: 'jul', files: ['07-jul-w27.md', '07-jul-w28.md', '07-jul-w29.md', '07-jul-w30.md', '07-jul-w31.md'],
    items: [
      `Read ${H2} for the July findings in full. The critical and major ones:`,
      `CRITICAL Day 211 and Day 217: Kreston is given ring stones and fire stones with no size qualifier, while Day 186 says "The stone and the toy car are choking size for a 13-month-old who walks over and picks things up" and Day 213 says "The paper bag of stones and grit stays up on the bench with you." Hold one ruling across all of them: stones he is given are wider than his fist and too big for his mouth, or he gets a different job entirely, and the Safety block carries the clause.`,
      `CRITICAL Day 200: a floating ice cube is handed to a 13-month-old in standing water, and the Safety line "Ice cubes go in the water, never in his mouth" names the hazard with no workable action. Days 187, 197 and 203 all hold the opposite rule. Cut his cube; give him the bath toy; make the Safety line match the rest of the range.`,
      `Day 190: the gutter fix copied Day 209's sentence without adapting it, so the Safety block references a grating that does not exist on Day 190. Day 206 adapted it correctly to "with the road on your side of him". Match Day 206.`,
      `Day 196: the replacement Get Outside runs on "the paper bag", which appears in no shopping list, no materials list, and nowhere else in the week. Add it to the week 28 shopping list and Day 196's materials, and fix Prep Tonight, which points at a Friday bag that does not exist either.`,
      `British groceries and materials survive across the month: tinned peaches, tinned fruit, half a tin of coconut milk, blu-tack, plasticine, skirting board, lino, and "The shops" where Day 196 correctly says "The corner store". Convert all of them: canned, poster putty, modeling clay, baseboard, vinyl, store.`,
      `Day 200's Safety line reads "the pool gets tipped out the moment you go in", which as printed means the moment you get into the pool. Day 196 writes it correctly: "never left filled while you go indoors".`,
      `Day 202: the Out Again schedule row says "**The Library**" but the section heading says "**Pick one**". Make them agree.`,
      `Day 205: the driveway fix introduced Wh- sentence openers into prose, which the style rules forbid. Rewrite those sentences to lead with the subject.`,
      `LENGTH: several days went over the band when Safety text was added. Day 213 is about 1,289 words against 1,150, and Days 206, 208, 196, 205, 200 and 210 are over by 30 to 90. Day 190 is 1,333 against the 1,300 first-day allowance. Take the words out of the ADDED SAFETY SENTENCES, not out of the steps, and never below 1,000.`,
    ],
  },
  {
    key: 'aug-sep', files: ['08-aug-w32.md', '08-aug-w33.md', '08-aug-w34.md', '08-aug-w35.md', '09-sep-w36.md', '09-sep-w37.md', '09-sep-w38.md', '09-sep-w39.md'],
    items: [
      `Read ${H2} for every August and September finding and fix each one.`,
      `Confirm the lap slide is gone from Day 256 and anywhere else in your range: going down a slide with a child on an adult's lap is the documented mechanism for toddler tibia fracture. He goes alone feet first with an adult at the bottom, or is walked down and lifted off.`,
      `Confirm sun cream is in the Safety block of every day in your range whose Main Event or Get Outside runs outdoors through early September, using Day 187's pattern: "hat on, cream at eight, cream again at eleven".`,
      `Sweep for British groceries, materials, money, plants and season references the converter missed.`,
      `Check every Safety block against its own numbered steps, every hazard has an action attached, and nothing handed to Kreston fails the too-big-to-swallow rule at his age.`,
      `Check schedule rows match their headings on every day, including Her Job, Quiet Play and Wind-Down rows that point at activities.`,
      `Check day lengths are 1,000-1,150 prose (1,300 for a week's first day) and trim any day pushed over by added safety text.`,
    ],
  },
  {
    key: 'oct-dec', files: ['10-oct-w40.md', '10-oct-w41.md', '10-oct-w42.md', '10-oct-w43.md', '10-oct-w44.md', '11-nov-w45.md', '11-nov-w46.md', '11-nov-w47.md', '11-nov-w48.md', '12-dec-w49.md', '12-dec-w50.md', '12-dec-w51.md', '12-dec-w52.md', '12-dec-w53-finale.md'],
    items: [
      `Read ${H2} for every October, November and December finding and fix each one.`,
      `AZLYN IS FOUR FROM DAY 354. Confirmed errors: Day 358 "Azlyn at three hides a coin behind her back" and Day 364 "Azlyn at three hears death as a temporary state". Also check "three-year-old" used about her on Days 361 and 363. Counts and measurements that happen to say "three" (three parcels, three inches) are correct and must NOT be touched.`,
      `Confirm Day 300 has a real Safety block. It was the only day in 182 with none, and it pools six days of shells, husks, gravel, feathers and small parts onto one tray at table height with a 16-month-old who walks and reaches.`,
      `Confirm Day 304, Halloween After Dark, carries road rules: a flashlight, something reflective, a hand at curbs and driveways, a crossing rule, and a stated place for Kreston. It sends them onto residential roads after dark in a dark cardboard costume.`,
      `Confirm the lap slide is gone from Day 282.`,
      `US daylight saving ends the first Sunday in November, which in 2027 is November 7, Day 311. Any British DST date or British sunset clock must be corrected.`,
      `Sweep for British groceries, materials, money, plants and season references.`,
      `Check every Safety block against its own numbered steps, every hazard has an action, and nothing handed to Kreston fails the too-big-to-swallow rule at 16 to 18 months.`,
      `Check schedule rows match their headings on every day, and check day lengths.`,
    ],
  },
]

phase('Repair')

const out = await pipeline(
  BLOCKS,

  (b) => agent(
`Close every outstanding finding in ${b.key.toUpperCase()}. ${RULES}

YOUR FILES, and you are the only agent touching them:
${b.files.map(f => `  ${REPO}\\months\\${f}`).join('\n')}

VERIFIER REPORTS, read the parts covering your days:
  ${H1}
  ${H2}

Work through these:

${b.items.map((it, i) => `${i + 1}. ${it}`).join('\n\n')}

DO NOT report an item as done unless you changed the file.

RETURN a list: item number, days touched, what you changed, or why an item
needed no change.`,
    { label: `repair:${b.key}`, phase: 'Repair', effort: 'high' }
  ),

  (rep, b) => agent(
`Verify the repairs in ${b.key.toUpperCase()}. Be skeptical. ${RULES}

FILES: ${b.files.map(f => `${REPO}\\months\\${f}`).join(', ')}

For each item below, confirm it is fixed IN THE FILE and quote the new text.
An item "addressed" in a report but absent from the file is CRITICAL.

${b.items.map((it, i) => `${i + 1}. ${it.slice(0, 200)}...`).join('\n\n')}

Then check nothing regressed:
- every schedule row names the same activity as its heading, character for
  character, including Her Job, Quiet Play and Wind-Down rows
- 16 schedule rows per day, Main Event 4-6 steps, Second Main 5-7,
  Alternatives 3-4 bullets, Out Again 4-6 bullets, insight 100-120 words
- anchors, day headers, date lines, theme lines and page-break divs unchanged
- any renamed activity is unique book-wide
- no British terms, no em dashes in prose, no banned adverbs, no Wh- sentence
  openers
- no cut-seam damage: missing subject, broken verb agreement, dropped article,
  orphan short lines inside blockquotes, clause stopping mid-thought
- day lengths 1,000-1,150 prose, 1,300 for a week's first day

RETURN JSON only:
{"ok":true|false,"itemsFixed":N,"issues":[{"severity":"critical|major|minor",
"day":N,"problem":"...","fix":"..."}]}`,
    { label: `verify:${b.key}`, phase: 'Verify', effort: 'high' }
  )
)

return out

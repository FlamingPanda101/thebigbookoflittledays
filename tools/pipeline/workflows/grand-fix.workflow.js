export const meta = {
  name: 'grand-fix',
  description: 'Close the whole-book audit findings: the keepsake threads, the swimming announcement, and three specific errors',
  phases: [
    { title: 'Fix', detail: 'by file owner, no two agents share a file' },
    { title: 'Verify', detail: 'confirm the threads now hold end to end' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'
const RAW = REPO + '/tools/pipeline/GRAND-AUDIT-RAW.txt'

const BRIEF = `
THE BOOK: "The Big Book of Little Days (2027)", a finished 365-day activity
book about to go to design. Joseph wrote it for Brooklyn to use with Azlyn
(three until Day 353, four from Day 354) and Kreston (6 months on Day 1,
18 by December). She reads it at 8:00 in the morning.

A WHOLE-BOOK AUDIT FOUND THAT THE KEEPSAKE THREADS DO NOT HOLD. Every earlier
audit read a half, a month or one page type, so nobody saw this. The full
report is at ${RAW}.

THE HEADLINE FAILURE: the twelve handprints. The front matter promises "one
sheet a month". Day 365's prep says "Dig out the eleven handprint sheets" and
its materials say "The eleven handprint sheets, January through November."
Only six or seven exist. FEBRUARY, AUGUST, SEPTEMBER, OCTOBER and NOVEMBER
have none. JUNE HAS THREE, on three different substrates. And three different
counting systems run at once: "third of twelve" (calendar month), "three
prints in a row" (physical sheets), and a quarterly reading on Day 187.

RULES:
- Anchors, day headers, date lines, theme lines and page-break divs are frozen.
- A schedule row and its section heading name the same activity, character for
  character. If you add or rename an activity, fix its row too.
- Counts hold: Main Event 4-6 numbered steps, Second Main Event 5-7, Afternoon
  Alternatives 3-4 bullets, Out Again 4-6 bullets, insight body 100-120 words.
- Activity names stay unique book-wide: check ${REPO}/tools/titles.tsv.
- Prose stays 1,000-1,150 words per day where you can manage it. If an
  addition pushes a day over, take the words back out of the same day.
- US English. No em dashes in prose, no adverbs (really, just, literally,
  genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
  binary contrasts, no dramatic fragments, no passive voice, no Wh- sentence
  openers. Prose wraps near 78 columns. LF endings.

THE HANDPRINT METHOD, from Day 1, and every new one must match it:
"Paint her palm with the brush rather than dipping her hand. Press flat, count
to three, lift straight up." Both children go on one sheet. The month and the
child's age are written beside the print.
`

const JOBS = [
  {
    key: 'feb', files: ['02-feb-w6.md', '02-feb-w7.md', '02-feb-w8.md', '02-feb-w9.md'],
    items: [
      `FEBRUARY HAS NO HANDPRINT and the front matter promises one a month. Add one to a single afternoon in your range, using the Day 1 method verbatim. Days 39, 52 and 61 already have paint out, so one of those is the cheapest host. Write "February" and both children's ages beside the prints. Keep the day inside its word band by trimming the same day if needed.`,
      `Check your weeks for any handprint counting language and make it the CALENDAR MONTH index, "second of twelve", never a physical-sheet count.`,
    ],
  },
  {
    key: 'jun', files: ['06-jun-w23.md', '06-jun-w24.md', '06-jun-w25.md'],
    items: [
      `JUNE HAS THREE HANDPRINTS on three different substrates, while five other months have none. Day 154 uses "Thick card, 1 sheet"; Day 156 uses "2 sheets of paper"; Day 172 uses "the sheet started in January". KEEP ONLY DAY 172, which is the one that matches the front matter's single-running-sheet rule. Remove the handprint step and its materials from Day 154 and Day 156, leaving everything else on those days intact. Day 156 is Kreston's first birthday, so if the print is doing emotional work there, replace it with something that is not a handprint.`,
      `KRESTON'S FIRST WORD is set up nine times across May and June and never happens. Days 125, 129, 135, 138, 143, 146, 149, 154 and 156 all say he is on the edge of first words. Then it is dropped, and a later day reports it as already past. LAND IT on Day 156, his first birthday, in the Infant Integration block: what it sounded like, that half a word counts, and that Brooklyn should write it and the date in the Keepsake Tracker.`,
    ],
  },
  {
    key: 'aug-sep', files: ['08-aug-w32.md', '08-aug-w33.md', '08-aug-w34.md', '08-aug-w35.md', '09-sep-w36.md', '09-sep-w37.md', '09-sep-w38.md', '09-sep-w39.md'],
    items: [
      `AUGUST AND SEPTEMBER HAVE NO HANDPRINT. Add one to a single afternoon in each month, Day 1's method verbatim, both children on the sheet, the month and their ages written beside. Days 224 and 231 already have paint out in August; Day 259 is a natural September host.`,
      `THE TREE PROMISE. Day 107 in April says "Keep it close, because you come back in July, September and December" and "Photograph her with both arms round the trunk. The same photograph happens three more times this year." The September return never happens. Add it to a Get Outside slot in 09-sep-w38: find the tree, cut a new string at her shoulder height, compare it to the April string, take the photograph from the same spot.`,
      `THE GROWTH CHART dies between Day 209 in July and Day 354 in December, 145 days. Add one door-frame mark in your range, in the September weeks, with the date written beside it.`,
    ],
  },
  {
    key: 'oct-nov', files: ['10-oct-w40.md', '10-oct-w41.md', '10-oct-w42.md', '10-oct-w43.md', '10-oct-w44.md', '11-nov-w45.md', '11-nov-w46.md', '11-nov-w47.md', '11-nov-w48.md'],
    items: [
      `OCTOBER AND NOVEMBER HAVE NO HANDPRINT. Add one to a single afternoon in each, Day 1's method verbatim, both children, month and ages written beside. Days 287 and 294 are natural October hosts.`,
      `THE MESSAGE BOTTLE, sealed on Day 209, is never mentioned again until Day 365, which then asserts "she has asked about it since October." No October or November day mentions it. Day 209 names markers to wait for. Add ONE SENTENCE to a November day that reaches one of those markers, for example on Day 326 "The Tree With Nothing Left On It": note that the leaves being off was one of the markers she was given for the bottle. One sentence, no restructuring.`,
      `THE AUTUMN WALK. The same-walk thread needs an autumn instance with a real day number. Day 287 already walks to a big tree. Make that the autumn walk of the four, photographed from the same spot as January's.`,
    ],
  },
  {
    key: 'dec', files: ['12-dec-w49.md', '12-dec-w50.md', '12-dec-w51.md', '12-dec-w52.md', '12-dec-w53-finale.md'],
    items: [
      `DECEMBER HAS NO HANDPRINT and it is the pair that sits next to January's in the front matter's promise. Add December's to a day before Day 365, then make Day 365 lay out all twelve.`,
      `DAY 365 IS WRONG ABOUT ITS OWN MATERIALS. Its prep says "Dig out the eleven handprint sheets" and its materials say "The eleven handprint sheets, January through November." Once the missing months are added there are TWELVE, January through December. Fix the count in both places and in the step that lays them out.`,
      `THE APRIL ENVELOPE. Day 92 seals an envelope marked OPEN DECEMBER 31 and tapes it to the shelf beside the box. Day 365 opens the January box and the July bottle and walks straight past it. Add the envelope to Day 365: name it in the Opening Activity materials alongside the box and the bottle, and open it in the Main Event so the spring answers sit between January's and today's.`,
      `DAY 365 asserts "she has asked about it since October", a five-month anticipation the book never builds. Another agent is adding a November mention of the bottle. Soften this line so it does not claim more than the book delivers.`,
      `THE TREE, DECEMBER RETURN. Day 107 promised July, September and December. Add the December visit to a Get Outside slot in your range, ideally Day 357 or Day 362: the tree, the last string, the fourth photograph.`,
      `D361 (Dec 27) CRITICAL. Its insight says "Fire-safety researchers have said the same for decades" to authorize a four-year-old handling flame, and that consensus does not exist in that form. Cut the fabricated authority and "Every four-year-old finds matches at some point." Rewrite as the author's own position with the hazard named plainly. Keep the headline if it still fits; change it and the week opener bullet together if it does not.`,
    ],
  },
  {
    key: 'front', files: ['00-front.md', '99-back-02-keepsake.md'],
    items: [
      `THE 52 BOOKED SWIMMING LESSONS ARE NEVER ANNOUNCED. Every Tuesday of the year, all 52, the 2:30 block reads "Out Again: Swimming". It is first mentioned on Day 5 as "the weekly one and the first of fifty-two". The front matter, the covers and the week 1 opener say nothing. On the morning of January 5 Brooklyn discovers that a booked, paid, weekly lesson for a three-year-old and a seven-month-old starts at 2:30 today and runs for a year. ADD TO "How This Book Works": one line naming the fixed weekly anchors (Tuesday swimming, alternate Wednesday library, first Saturday of the month museum), one line saying to book the swimming before January starts, and one line on what to do with the Tuesday block if she does not swim.`,
      `THE HANDPRINT PROMISE. The front matter says "one sheet a month" and the Keepsake Tracker has a twelve-month checklist. Other agents are adding the five missing months so the promise becomes true. Check both pages state the same rule: one sheet per calendar month, both children on it, twelve in all, laid out together on Day 365.`,
      `THE SAME-WALK REFERENCE PHOTOGRAPH is never taken. The Keepsake Tracker says "You walked the same route four times and photographed it from the same spot", but Day 1 never asks for a photograph. Another agent owns Day 1. Make the tracker's four rows carry real day numbers: Day 1 winter, Day 154 summer, Day 287 autumn, Day 365 winter again.`,
    ],
  },
  {
    key: 'jan-mar-may', files: ['01-jan-w1.md', '01-jan-w4.md', '03-mar-w12.md', '05-may-w19.md', '07-jul-w30.md'],
    items: [
      `DAY 1 NEVER TAKES THE REFERENCE PHOTOGRAPH that the other three seasonal walks are measured against. Add one line to Day 1's Get Outside: stop under the biggest tree on the route and take one photograph from where you are standing, and say that three more happen this year from that spot.`,
      `THE HANDPRINT COUNTING SYSTEM. Three run at once across the book. Standardize on the CALENDAR MONTH index, "third of twelve", and never the physical-sheet count. Day 129 in May contradicts itself inside one page: its headline calls the sheet "fifth of twelve" while its step 5 says "three prints in a row". Fix Day 129. Day 187 in July calls July's "the third", which is wrong once the missing months exist; another agent owns July, so leave it, but fix any instance in YOUR files.`,
      `Check Day 60 in March and Day 92 in April for the same counting problem and correct any you find in your files.`,
    ],
  },
]

phase('Fix')

const out = await pipeline(
  JOBS,

  (j) => agent(
`Close whole-book audit findings in the ${j.key.toUpperCase()} files. ${BRIEF}

YOUR FILES, and you are the only agent touching them:
${j.files.map(f => `  ${REPO}/months/${f}`).join('\n')}

FULL AUDIT REPORT: ${RAW}

YOUR JOBS:

${j.items.map((it, i) => `${i + 1}. ${it}`).join('\n\n')}

Read the day before you change it. Where you add a handprint, add it to an
afternoon that already has paint or a quiet block, so the day does not grow a
new materials burden. Add the sheet to the week's shopping list if it is not
already there.

DO NOT report an item as done unless you changed the file.

RETURN a list: item number, day touched, what you changed.`,
    { label: `fix:${j.key}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, j) => agent(
`Verify the whole-book fixes in ${j.key.toUpperCase()}. Be skeptical. ${BRIEF}

FILES: ${j.files.map(f => `${REPO}/months/${f}`).join(', ')}

For each item, confirm it is fixed IN THE FILE and quote the new text. An item
"addressed" in a report but absent from the file is CRITICAL.

${j.items.map((it, i) => `${i + 1}. ${it.slice(0, 190)}...`).join('\n\n')}

Then check nothing regressed: schedule rows match their headings, step and
bullet counts hold, insight bodies are 100-120 words, frozen lines unchanged,
any new activity name is unique book-wide, no British terms, no em dashes in
prose, no banned adverbs, no cut-seam damage, and any day you added to is
still inside its word band.

RETURN JSON only:
{"ok":true|false,"itemsFixed":N,"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `verify:${j.key}`, phase: 'Verify', effort: 'high' }
  )
)

return out

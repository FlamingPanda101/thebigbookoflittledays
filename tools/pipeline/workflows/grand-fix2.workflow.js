export const meta = {
  name: 'grand-fix2',
  description: 'Add the three missing monthly handprints and the missing door-frame marks',
  phases: [
    { title: 'Write', detail: 'one agent per month, no shared files' },
    { title: 'Verify', detail: 'confirm it landed in the file' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const BRIEF = `
THE BOOK: "The Big Book of Little Days (2027)", a finished 365-day activity
book going to print design. Joseph wrote it for Brooklyn to use with Azlyn
(three) and Kreston (a baby who turns one on Day 156). She reads it at 8:00 in
the morning and runs the day off the page.

TWO YEAR-LONG THREADS HAVE HOLES IN THEM AND YOU ARE PATCHING ONE MONTH.

THREAD 1, THE TWELVE HANDPRINTS. The front matter promises one sheet per
calendar month, both children on the same sheet, twelve by December. Day 365
lays all twelve out on the floor in order. Three months never make theirs.
THE METHOD IS FIXED, from Day 1, and every sheet in the book uses these words:
"Paint her palm with the brush rather than dipping her hand. Press flat, count
to three, lift straight up." Both children go on ONE sheet, and the month and
each child's age are written beside the prints in marker. A wet washcloth is
in your other hand before she lifts. Kreston goes first while he is calm.

THREAD 2, THE GROWTH CHART. One door frame, marked all year. It runs Day 1,
March, April, June, July, then dies until December. Joseph wants it available
in every month AS AN OPTION, not as another task. One or two sentences,
phrased so a reader who skips it has skipped nothing: "If you are marking the
frame this month, this is the afternoon for it." Pencil mark, name, date.

RULES YOU CANNOT BREAK:
- Anchors, day headers, date lines, theme lines and page-break divs are frozen.
- A schedule row and its section heading name the same activity, character for
  character. If you rename a section you fix its row, and the reverse.
- Counts hold: Main Event 4-6 numbered steps, Second Main Event 5-7 steps,
  Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets.
- Whatever you add must appear in that WEEK OPENER's shopping list too, which
  is the flat "This Week's Shopping List" checkbox list near the top of the
  file. A material called for in a day and missing from the list is a defect.
- Keep the day inside 1,000-1,150 prose words. If your addition pushes it
  over, take the words back out of the same day.
- US English. No em dashes in prose. No adverbs (really, just, literally,
  genuinely, honestly, simply, actually, deeply, truly, fundamentally). No
  binary contrasts ("not X, but Y"), no dramatic one-word fragments, no
  passive voice, no sentences opening with a Wh- word. Prose wraps near 78
  columns. LF line endings, UTF-8.
- DO NOT invent a new named activity that collides with an existing one. The
  full title ledger is ${REPO}/tools/titles.tsv.
- Never restore a "Note from Joseph". They were deleted from the book on
  purpose. Never write a swimming lesson; the family has a pool membership.

PREFER WEAVING INTO AN EXISTING AFTERNOON over inventing a new section. A day
that already has paint out is the cheapest place for a handprint.
`

const M = [
  {
    k: 'aug', files: ['08-aug-w32.md', '08-aug-w33.md', '08-aug-w34.md', '08-aug-w35.md'],
    job: `AUGUST HAS NO HANDPRINT SHEET and no door-frame mark.

Read your four week files and find the best afternoon for each. Day 219 in
week 32 already has paint out. Days 224 and 231 are also worth reading.

1. Add AUGUST's handprint sheet to one afternoon, using the fixed method word
   for word, both children on one sheet, **AUGUST** and both ages written
   beside the prints. Add the thick card and the paint to that week's
   shopping list if they are not already on it.
2. Add ONE optional door-frame mark somewhere in August, worded as an option.`,
  },
  {
    k: 'sep', files: ['09-sep-w36.md', '09-sep-w37.md', '09-sep-w38.md', '09-sep-w39.md'],
    job: `SEPTEMBER HAS NO HANDPRINT SHEET and no door-frame mark.

Read your four week files and pick the afternoon that fits best. September is
the start-of-school month in this book, and a sheet marking that is a natural
fit.

1. Add SEPTEMBER's handprint sheet to one afternoon, fixed method word for
   word, both children on one sheet, **SEPTEMBER** and both ages beside the
   prints. Put the thick card and paint on that week's shopping list.
2. Add ONE optional door-frame mark somewhere in September, worded as an
   option. September is a natural month for it, because she is measured
   against the person she was in the summer.`,
  },
  {
    k: 'oct-nov', files: ['10-oct-w41.md', '11-nov-w45.md', '11-nov-w46.md', '11-nov-w47.md', '11-nov-w48.md'],
    job: `NOVEMBER HAS NO HANDPRINT SHEET. October and November have no door-frame
mark.

October already makes its handprint on Day 287 in week 41. DO NOT ADD A SECOND
OCTOBER SHEET. Your only job in October is the door-frame mark.

1. Add ONE optional door-frame mark to October. Day 287 already has the paint
   and the marker out, so it is the cheapest place.
2. Add NOVEMBER's handprint sheet to one afternoon across weeks 45 to 48,
   fixed method word for word, both children on one sheet, **NOVEMBER** and
   both ages beside the prints. Put the thick card and paint on that week's
   shopping list.
3. Add ONE optional door-frame mark somewhere in November.`,
  },
]

phase('Write')

const out = await pipeline(
  M,

  (m) => agent(
`Patch the handprint and growth-chart threads for ${m.k.toUpperCase()}.
${BRIEF}

YOUR FILES, and you are the only agent touching them:
${m.files.map(f => `  ${REPO}/months/${f}`).join('\n')}

YOUR JOB:
${m.job}

Read the day in full before you edit it, so what you add belongs to that
afternoon rather than sitting on top of it. Make the edits yourself. Do not
report anything as done that you did not write into the file.

RETURN: the day number you put the handprint on, the day number of each
door-frame mark, the exact new lines, and the shopping list lines you added.`,
    { label: `write:${m.k}`, phase: 'Write', effort: 'high' }
  ),

  (rep, m) => agent(
`Verify the ${m.k.toUpperCase()} patch landed. Be skeptical and check the file,
not the report.
${BRIEF}

FILES: ${m.files.map(f => `${REPO}/months/${f}`).join(', ')}

THE JOB THAT WAS ASKED FOR:
${m.job}

WHAT THE WRITER CLAIMS:
${typeof rep === 'string' ? rep.slice(0, 3000) : JSON.stringify(rep).slice(0, 3000)}

CHECK, quoting the file each time:
1. The handprint sheet exists, uses the fixed method word for word, puts both
   children on ONE sheet, and writes the month and both ages beside it.
2. Every material it calls for is on that week's shopping list.
3. The door-frame marks exist and read as an OPTION, not a task.
4. Schedule rows still match their section headings character for character.
5. Step and bullet counts still hold in any section that was touched.
6. No em dash in prose, no banned adverb, no cut seam, no orphaned material,
   no duplicated line, no restored note from Joseph, no swimming lesson.
7. The day is still inside 1,000-1,150 prose words.

RETURN JSON only:
{"ok":true|false,"handprintDay":N,"frameDays":[N],
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `verify:${m.k}`, phase: 'Verify', effort: 'high' }
  )
)

return out

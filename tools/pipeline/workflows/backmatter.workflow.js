export const meta = {
  name: 'back-matter',
  description: 'Front TOC, Master Activity Index, Keepsake Tracker and closing note',
  phases: [
    { title: 'Write', detail: 'four pieces in parallel' },
    { title: 'Verify', detail: 'links resolve, index entries are real' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'

const COMMON = `
THE BOOK: "The Big Book of Little Days (2027)", a printed 365-day activity
book. Joseph wrote it for Brooklyn, the mother of his children, to use with
Azlyn, who is three until December 20 and four after, and Kreston, her baby
brother, six months old on Day 1 and eighteen by December. She reads it at
8:00 in the morning.

THE SHAPE OF THE BOOK: twelve printable booklets. Each opens with a cover
(months/NN-mon-00-cover.md), then four or five week files each holding a week
opener and seven days, then a backup section (months/NN-mon-zz-backup.md) with
two bad weather days, two sick days and an extras page. Day 365 stands alone
in months/12-dec-w53-finale.md.

SPEC: ${REPO}\\CONTINUATION.md section 12 defines this back matter.
RULES: ${REPO}\\CLAUDE.md, especially Locale and Writing style.
REGISTER MODEL: ${REPO}\\months\\01-jan-w1.md

ANCHORS: the book uses explicit HTML anchors, never auto-generated heading
ids, because emoji in headings break slug generation in markdown-to-PDF
converters. Days are <a id="day-N"></a>, weeks <a id="week-N"></a>, booklets
<a id="booklet-january"></a>, backup sections <a id="backup-jan"></a>, and
inside those <a id="jan-weather-1"></a>, <a id="jan-sick-1"></a>,
<a id="jan-extras"></a>.

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts, no negative listing, no dramatic fragments, no passive
voice, no false agency, no Wh- sentence openers. Vary sentence length. Prose
wraps near 78 columns. LF endings, no trailing whitespace.

⚠️ DO NOT USE THE "## 🌟 Day N: ... 🌟" HEADER FORMAT. A validator counts those
to confirm the book has exactly 365 days.
`

const PIECES = [
  {
    key: 'front', file: '00-front.md',
    prompt: `Write the FRONT MATTER for the book. This is the first thing in
the whole volume, before January.

WRITE TO: ${REPO}\\months\\00-front.md

Include, in this order:
1. <a id="front"></a>, then the book's title block: the title, the year, and
   "For Azlyn & Kreston · Made by Joseph for Brooklyn".
2. A short opening from Joseph to Brooklyn, four or five sentences. What the
   book is, what it is not, and how to use it. It is not a curriculum and not
   a standard to fall short of. Mark it as a draft the way the weekly notes
   are marked, with the line
   > *(Draft. Rewrite this. I can guess the shape of it, not the feeling.)*
3. **How This Book Works**: the day runs 8:00 to 6:00, two main events, one
   Around the World per week, one insight a day, one note from Joseph a week.
   Prep Tonight sits at the top of each day and is read the night before.
   There is no nap in the book because Azlyn has dropped it.
4. **The Twelve Booklets**: a table or list, one line per booklet, with the
   month, the booklet number, the day range and a link to its cover anchor,
   for example [January](#booklet-january) · Days 1-35.
5. **When It Goes Wrong**: a short section pointing at the backup sections.
   Every booklet ends with two bad weather days, two sick days and a page of
   extra ideas, and there is a Master Activity Index at the back keyed by what
   kind of day it is. Link to [the index](#index).
6. **The Threads That Run All Year**: the time capsule sealed on Day 1 and
   opened on Day 365, the growth chart, the twelve handprints, the forks, and
   the same walk. Two lines each at most, and link to
   [the keepsake tracker](#keepsake).
7. Close with <div style="page-break-after: always;"></div>

Keep it short. This is the page someone reads once.`,
  },
  {
    key: 'index', file: '99-back-01-index.md',
    prompt: `Write the MASTER ACTIVITY INDEX. Spec section 12 item 1.

WRITE TO: ${REPO}\\months\\99-back-01-index.md

READ ALL TWELVE BACKUP SECTIONS FIRST. They are the content this indexes:
${['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  .map((m, i) => `  ${REPO}\\months\\${String(i + 1).padStart(2, '0')}-${m}-zz-backup.md`).join('\n')}

Open with <a id="index"></a> and a heading, then two or three sentences on
what this page is for: Brooklyn has ten minutes and a specific problem, and
this is how she finds something without reading a month.

INDEX BY NEED, not by month. These are the headings, and the spec names them:
  🌀 Messy
  ✨ No mess
  ⏱️ Ten minutes
  🏃 Burns energy
  😌 Calms them down
  📦 Cardboard box only
  🔤 Teaches letters
  🔢 Teaches counting

Under each heading, list entries drawn from the twelve backup sections: the
bad weather days, the sick days, and the individual ideas on the extras pages.
An activity can appear under more than one heading if it genuinely belongs.

EVERY ENTRY GIVES BOTH A LINK AND A HUMAN LOCATION, exactly as the spec says:
  - [Painting the Window with Water](#mar-weather-1) — 🌧️ March · Bad Weather Day 1
  - [The Sock Basket](#nov-extras) — 🎲 November · Extra Ideas

The link target must be a real anchor from those files: NN-weather-1,
NN-weather-2, NN-sick-1, NN-sick-2 or NN-extras, where NN is jan through dec.
DO NOT INVENT AN ENTRY. Every activity name must appear in one of the twelve
files you just read. If you are unsure whether something belongs under a
heading, leave it out.

Aim for a useful spread: at least eight entries under each heading, more where
the material supports it. Close with
<div style="page-break-after: always;"></div>`,
  },
  {
    key: 'keepsake', file: '99-back-02-keepsake.md',
    prompt: `Write the KEEPSAKE TRACKER. Spec section 12 item 2.

WRITE TO: ${REPO}\\months\\99-back-02-keepsake.md

Open with <a id="keepsake"></a> and a heading, then two or three sentences on
what this page is: the things the book started that outlast the year, and
where to put them.

READ THESE so the details are right, not invented:
  ${REPO}\\months\\01-jan-w1.md        Day 1 starts the capsule, the chart and the prints
  ${REPO}\\months\\07-jul-w30.md       Day 209 seals the message bottle
  ${REPO}\\months\\12-dec-w53-finale.md  Day 365 opens both

COVER, each with a short paragraph and a place to write:
1. **The time capsule** — sealed Day 1, opened Day 365, resealed on Day 365
   for the following New Year's Eve. What went in it. A line for what she said
   the four answers were, in January and again in December.
2. **The growth chart** — the door frame, marked on Day 1 and again on Day
   365, with the hand outline drawn round on both. A small table for the
   twelve months with a blank height column.
3. **The twelve handprints** — one a month, all twelve laid out on Day 365.
   A checklist of the twelve months.
4. **The message in a bottle** — sealed Day 209, opened Day 365.
5. **The memory jar** — a line a week, or whenever something is worth keeping.
6. **The season journals** — the same walk in four seasons, and what changed.
7. **Birthday interviews** — Azlyn turns four on Day 354 and Kreston turns one
   on Day 156. The same questions each year.

Use markdown tables and checkboxes where a parent will actually write on the
page. This is a page that gets filled in, so leave room.

Close with <div style="page-break-after: always;"></div>`,
  },
  {
    key: 'closing', file: '99-back-03-closing.md',
    prompt: `Write the CLOSING NOTE. Spec section 12 item 3. This is the last
page of the book.

WRITE TO: ${REPO}\\months\\99-back-03-closing.md

Open with <a id="closing"></a> and a heading.

This is Joseph writing to Brooklyn at the end of a year she did and he mostly
did not. Short: three or four short paragraphs, no more.

MARK IT AS A DRAFT the way every weekly note is marked, because this is the
one thing in the book only Joseph can write:
> *(Draft. Rewrite this. I can guess the shape of it, not the feeling.)*

The spec says it ends on the line about how on the days when nothing got done,
they still got her all day, and that was always the actual curriculum. Write
toward that and land it. Do not quote the spec's phrasing word for word; write
the line properly, in his voice.

DO NOT: give a speech, thank the reader for reading, use "as we close this
chapter", tell Brooklyn how to feel, or reach for a moral. The book spent 365
days being practical and warm. End it being practical and warm.

Close with <div style="page-break-after: always;"></div>`,
  },
]

phase('Write')

const out = await pipeline(
  PIECES,

  (p) => agent(`${COMMON}\n\n${p.prompt}\n\nRETURN a one-paragraph summary of what you wrote.`,
    { label: `write:${p.key}`, phase: 'Write', effort: 'high' }),

  (rep, p) => agent(
`Verify the back matter piece "${p.key}". ${COMMON}

FILE: ${REPO}\\months\\${p.file}

CHECK:
1. No "## 🌟 Day N: ... 🌟" header anywhere. CRITICAL if present.
2. The required anchor is present and correct.
3. FOR THE INDEX ONLY: every entry links to a real anchor (NN-weather-1,
   NN-weather-2, NN-sick-1, NN-sick-2, NN-extras) AND names an activity that
   genuinely appears in that backup file. Open the files and check a sample of
   at least fifteen entries across different headings. An invented entry is
   CRITICAL: this is a page Brooklyn uses when she is out of patience, and a
   dead link or a made-up activity is worse than no index.
4. FOR THE FRONT MATTER ONLY: every booklet link points at a real cover anchor
   (booklet-january through booklet-december), and the day ranges are right.
5. FOR THE KEEPSAKE TRACKER ONLY: the details match the actual days. The
   capsule is sealed Day 1 and opened Day 365, the bottle is sealed Day 209,
   Kreston turns one on Day 156, Azlyn turns four on Day 354.
6. FOR THE CLOSING NOTE ONLY: it carries the draft marker, it is short, and it
   does not give a speech or tell Brooklyn how to feel.
7. Style: US English, no em dashes in prose, no banned adverbs, no Wh-
   sentence openers, no passive voice.

RETURN JSON only:
{"ok":true|false,"checked":N,"issues":[{"severity":"critical|major|minor","problem":"...","fix":"..."}]}`,
    { label: `verify:${p.key}`, phase: 'Verify', effort: 'high' })
)

return out

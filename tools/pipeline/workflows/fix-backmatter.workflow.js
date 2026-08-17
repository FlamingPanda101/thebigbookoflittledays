export const meta = {
  name: 'fix-backmatter',
  description: 'Close the back-matter findings: unreachable index entries, passive voice, cross-file mismatches',
  phases: [{ title: 'Fix', detail: 'index, front matter and keepsake tracker' }],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn and Kreston. Warm, practical, direct, never preachy.
RULES: ${REPO}\\CLAUDE.md

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally, and no
other -ly words), no binary contrasts, no dramatic fragments, NO PASSIVE
VOICE, no Wh- sentence openers. Name the person or use "you" to put Brooklyn
in the scene. Prose wraps near 78 columns. LF endings.

⚠️ DO NOT USE THE "## 🌟 Day N: ... 🌟" HEADER FORMAT anywhere.
`

const JOBS = [
  {
    key: 'index', file: '99-back-01-index.md',
    prompt: `TEN OF THE SIXTY BACKUP SECTIONS ARE UNREACHABLE from this index.
The front matter tells Brooklyn it "sorts every backup day and extra idea",
and eight of the ten missing are sick days, which are the pages she needs when
she is least able to go hunting for them.

MISSING ANCHORS, none of which appears anywhere in the index:
  feb-sick-2, mar-sick-2, apr-sick-2, may-weather-2, jun-sick-1,
  jul-weather-2, jul-sick-2, aug-sick-1, sep-sick-2, dec-sick-2

For each one, OPEN THE BACKUP FILE, read that section, and add at least one
entry under the heading it genuinely belongs to. The sick days almost all
belong under 😌 Calms them down; the two weather days will fit 🏃 Burns energy
or 🌀 Messy. Use the real activity name from the file. Do not invent one.

Entry format, matching what is already in the file:
  - [Activity Name](#anchor) — 🌧️ Month · Bad Weather Day N
  - [Activity Name](#anchor) — 🤒 Month · Sick Day N
  - [Activity Name](#anchor) — 🎲 Month · Extra Ideas

THEN VERIFY THE WHOLE INDEX. For every entry already in the file, confirm the
activity name appears in the backup file its anchor points at. A dead link or
an invented activity on this page is worse than no index, because she reaches
for it when she is out of patience. Report and fix any you find.

ALSO: if the January extras page still calls something "The Blanket Sledge",
that is British and duplicates December's "The Blanket Sled". Another agent
may have renamed it already. Check the current name in
${REPO}\\months\\01-jan-zz-backup.md and make the index match whatever it now
says.

Files to read as needed:
${['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  .map((m, i) => `  ${REPO}\\months\\${String(i + 1).padStart(2, '0')}-${m}-zz-backup.md`).join('\n')}`,
  },
  {
    key: 'front', file: '00-front.md',
    prompt: `Fix three things in the front matter.

1. The adverb "smoothly" in "decide whether 9:15 goes smoothly". It is the
   only -ly adverb in the file. Rewrite the sentence.
2. The five bullets under "The Threads That Run All Year" all open with an
   agentless passive participle: "Sealed on Day 1", "Opened on Day 365",
   "Marked on the wall", "Walked on Day 1". The same shape appears in the
   schedule line, "laid out as a schedule". Turn them active and put Brooklyn
   in the scene: "You seal it on Day 1 with her answers word for word, and
   open it on Day 365." Same for the others.
3. Cross-file mismatch. This page names five Day 1 threads including the forks
   and says the keepsake tracker "lists all of them with space to write in the
   dates". The tracker has no forks entry and counts seven threads, not five.
   Fix it from THIS side: soften the claim so it does not promise something
   the tracker does not carry, and keep the forks in the list of threads if
   they belong there.

Do not restructure the page. These are three edits.`,
  },
  {
    key: 'keepsake', file: '99-back-02-keepsake.md',
    prompt: `Fix four things in the Keepsake Tracker.

1. PASSIVE VOICE throughout. "the same shoebox was taped shut again",
   "Kreston's January print was made while somebody held his fist open",
   "The slips get read out on a night when", plus the agentless openers
   "Sealed on Day 1 with packing tape", "Sealed on Day 209 with tape round the
   cap", "The same route, four times, photographed from the same spot".
   Put Brooklyn in the scene: "You taped the same shoebox shut again",
   "Somebody held Kreston's fist open for his January print", "Read the slips
   out on a night when", "You sealed it on Day 1", "You walked the same route
   four times and photographed it from the same spot."

2. THE GROWTH CHART TABLE has twelve month rows, but the book only marks the
   door frame on Day 1, Day 209, Day 354 and Day 365. Ten rows have no
   matching instruction anywhere in the book. Either cut the table to those
   four dated marks plus a few blank spare rows, or add one line saying the
   twelve rows are there for anyone who wants to mark the frame more often
   than the book asks. Pick one and make the page honest.

3. SEASON JOURNALS lists Day 365 as the fourth photograph, but Day 365's Get
   Outside never tells her to take one. Day 154 carries the standing
   instruction. Reword the row so the photograph on Day 365 reads as optional,
   or as something she may already have.

4. THE FORKS. The front matter says this tracker lists all five Day 1 threads
   and there is no forks entry. Add a short one: Azlyn has set the forks every
   night since Day 1, and that is worth a line here.

Add nothing else. Keep the tables and checkboxes, since this is a page that
gets written on.`,
  },
]

phase('Fix')

const out = await pipeline(
  JOBS,
  (j) => agent(
`Fix the back-matter piece "${j.key}". ${RULES}

FILE: ${REPO}\\months\\${j.file}

${j.prompt}

RETURN a list of what you changed.`,
    { label: `fix:${j.key}`, phase: 'Fix', effort: 'high' }
  )
)

return out

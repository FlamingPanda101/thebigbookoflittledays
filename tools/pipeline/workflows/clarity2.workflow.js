export const meta = {
  name: 'clarity2',
  description: 'Apply the 28 clarity-verifier residuals, whole pages, then confirm',
  phases: [
    { title: 'Fix', detail: 'six agents, two months each' },
    { title: 'Confirm', detail: 'string-and-page check of every fix' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", 365 days, live as a website
and print booklets. Brooklyn runs each day off the page at 8:00 AM with
Azlyn (3) and Kreston (a baby).

A clarity pass just rewrote first steps that started mid-activity. Its
verifiers raised 28 residuals: editors who called a day clean when its
opening still leans on a bare "the jar" or "the box", term mismatches the
edits exposed (tub vs tray, bowl vs dishpan), a few unwrapped lines, and one
settled-decision violation. You are clearing them.

THE COLD-READER TEST for any first step: a reader who lands on the activity
cold knows WHAT the thing is, WHERE it came from (naming last night's prep
is good: "the jars you washed last night", never bare "the jars"), and WHERE
this happens.

ONE DECISION IS ALREADY MADE, do not re-flag it: Day 30's "Choosing Her
Tree" year-long tree claim violates Joseph's settled "no tree thread"
ruling. Keep the walk, the arm-hug and today's photograph; cut "to be hers
for the year" and any April/July/October re-photograph schedule, and
re-read the whole day for anything leaning on the cut promise.

HOUSE FORMAT, frozen: anchors, day headers, date lines, theme lines,
page-break divs. Schedule rows match their section headings character for
character. Main Event 4-6 steps, Second Main Event 5-7. Insights 100-120
words. 16 schedule rows per day. Steps stay on one line in the markdown;
prose paragraphs wrap near 78 columns. LF endings.

HOUSE STYLE: US English except "autumn" and proper names (the Plough). No em
dashes in prose, no adverbs (really, just, literally, genuinely, honestly,
simply, actually, deeply, truly, fundamentally), no binary contrasts, no
passive voice, no Wh- sentence openers.

SETTLED DECISIONS: no personal messages from Joseph, no swimming lessons
(pool membership), no first-word thread, NO TREE THREAD anywhere, arm's
reach water supervision (never a second adult), twelve handprints one per
calendar month, growth chart offered all twelve months.

AFTER EVERY EDIT, RE-READ THE ENTIRE DAY and reconcile anything your edit
now contradicts. This rule took the project's knock-on rate from 83% to 4%.
Fix what you are given and nothing else.
`

const PAIRS = [
  { k: 'a', pre: ['01', '02'], name: 'January and February' },
  { k: 'b', pre: ['03', '04'], name: 'March and April' },
  { k: 'c', pre: ['05', '06'], name: 'May and June' },
  { k: 'd', pre: ['07', '08'], name: 'July and August' },
  { k: 'e', pre: ['09', '10'], name: 'September and October' },
  { k: 'f', pre: ['11', '12'], name: 'November and December' },
]

phase('Fix')

const out = await pipeline(
  PAIRS,

  (p) => agent(
`Clear the clarity residuals for ${p.name}. ${CONTEXT}

YOUR FINDINGS are in ${REPO}/tools/pipeline/CLARITY-RESIDUAL.json, a flat
list of objects with "day", "problem" and "fix". Take ONLY the entries whose
day falls in your months or whose problem text names one of your files
(months/${p.pre[0]}-* or months/${p.pre[1]}-*). Day ranges: 01: 1-35,
02: 36-63, 03: 64-91, 04: 92-126, 05: 127-154, 06: 155-182, 07: 183-217,
08: 218-245, 09: 246-273, 10: 274-308, 11: 309-336, 12: 337-365. Entries
with day 0 name their file in the problem text.

Skip entries whose fix says "None to the files" or is about report
arithmetic; those need no edit.

FOR EACH FINDING: read the whole day or backup unit, judge it, apply the
prescribed fix where it is sound (they were written against the current
files and usually are), reconcile the rest of the page, keep steps on one
line, and rewrap any prose paragraph your edit touches to ~78 columns.

RETURN JSON only, under 800 words:
{"pair":"${p.name}","fixed":[{"day":N,"what":"one line"}],
"rejected":[{"day":N,"why":"one line"}]}`,
    { label: `fix:${p.k}`, phase: 'Fix', effort: 'high' }
  ),

  (rep, p) => agent(
`Confirm the ${p.name} residual fixes landed whole. Be hostile. ${CONTEXT}

FILES: ${REPO}/months/${p.pre[0]}-*.md and ${REPO}/months/${p.pre[1]}-*.md
FINDINGS: ${REPO}/tools/pipeline/CLARITY-RESIDUAL.json (your months' entries)

WHAT THE FIXER REPORTED:
${typeof rep === 'string' ? rep.slice(0, 2200) : JSON.stringify(rep).slice(0, 2200)}

For every touched day, read the WHOLE day: the fix is in the file, no other
block now contradicts it, counts and style hold, no line left unwrapped
mid-paragraph, no bare reference reintroduced. Check rejections were right.

RETURN JSON only:
{"pair":"${p.name}","ok":true|false,
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `confirm:${p.k}`, phase: 'Confirm', effort: 'high' }
  )
)

const rows = out.flat().filter(Boolean)
const open = rows.flatMap(r => {
  try {
    const d = typeof r === 'string' ? JSON.parse(r.slice(r.indexOf('{'), r.lastIndexOf('}') + 1)) : r
    return d.issues || []
  } catch { return [] }
})
log(`${open.length} issues still open`)
return { open, rows }

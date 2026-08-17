export const meta = {
  name: 'fix-backup-dupes',
  description: 'Give the duplicated backup insights and activity their own unique versions',
  phases: [{ title: 'Fix', detail: 'one agent per affected file' }],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'

// Feb keeps both duplicated headlines because it is the earliest month.
// June keeps the duplicated activity name for the same reason.
const JOBS = [
  { file: '03-mar-zz-backup.md', month: 'March',
    fix: [`The sick-day insight headed "The third day of a cold is the worst one for both of you." is also used in February, April, July and November. February keeps it.`,
          `The sick-day insight headed "Coming back to normal needs a smaller version of normal first." is also used in February. February keeps it.`] },
  { file: '04-apr-zz-backup.md', month: 'April',
    fix: [`The sick-day insight headed "The third day of a cold is the worst one for both of you." is also used in February, March, July and November. February keeps it.`] },
  { file: '07-jul-zz-backup.md', month: 'July',
    fix: [`The sick-day insight headed "The third day of a cold is the worst one for both of you." is also used in February, March, April and November. February keeps it.`,
          `The Opening Activity "Shutting the House Against the Sun" on your first bad weather day has the same name as one in the June backup section. June keeps it. Rename yours and change BOTH its schedule row and its heading so they match, and make sure the renamed activity is still what the steps describe.`] },
  { file: '11-nov-zz-backup.md', month: 'November',
    fix: [`The sick-day insight headed "The third day of a cold is the worst one for both of you." is also used in February, March, April and July. February keeps it.`] },
]

phase('Fix')

const out = await pipeline(
  JOBS,
  (j) => agent(
`Fix duplicated titles in the ${j.month} backup section.

THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn and Kreston. Warm, practical, direct, never preachy.

FILE: ${REPO}\\months\\${j.file}
RULES: ${REPO}\\CLAUDE.md
UNUSED HEADLINE POOL: ${REPO}\\tools\\insight-pool.md
EVERY TITLE ALREADY IN THE BOOK: ${REPO}\\tools\\titles.tsv

Every insight headline and every activity name in this book must be unique
across all 365 days plus the backup sections. Twelve backup agents worked in
parallel and several reached for the same obvious sick-day headline.

FIX THESE:

${j.fix.map((f, i) => `${i + 1}. ${f}`).join('\n\n')}

FOR EACH DUPLICATED INSIGHT:
- Choose a REPLACEMENT HEADLINE from ${REPO}\\tools\\insight-pool.md that
  appears NOWHERE in titles.tsv and nowhere else in months/. Verify it with a
  search before you use it. Good unused candidates that suit a sick day or a
  low day include "Fever makes children clingy, and meeting it shortens it.",
  "Dark afternoons change the shape of the day, and the plan has to change
  with them.", "Big gatherings overwhelm her faster than they overwhelm you,
  and she needs an exit.", "A den changes the day more than any activity in
  it." and "Late summer is a low-energy stretch, and lowering the bar is the
  right response." Pick one that fits YOUR month and YOUR day.
- THEN REWRITE THE INSIGHT BODY to argue the new headline. Do not leave a body
  that argues the old one. The body is 100-120 words, evidence-informed,
  written to a competent adult, framed as why what she already does works,
  never corrective, never preachy.
- The insight must still suit the day it sits on: a sick day insight belongs
  to a sick day.

STYLE: US English. No em dashes in prose, no adverbs (really, just, literally,
genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
binary contrasts, no negative listing, no dramatic fragments, no passive
voice, no false agency, no Wh- sentence openers. Vary sentence length. Prose
wraps near 78 columns. LF endings, no trailing whitespace.

WHEN DONE, search your file and confirm the old headline is gone and the new
one appears exactly once.

RETURN: the old headline, the new one, and confirmation you searched
titles.tsv and months/ for the new one before using it.`,
    { label: `dupes:${j.month.slice(0, 3).toLowerCase()}`, phase: 'Fix' }
  )
)

return out

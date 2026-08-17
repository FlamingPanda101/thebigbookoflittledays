export const meta = {
  name: 'backups-final',
  description: 'Final backup polish: orphaned rows, unresolved setups, sick-day rule breaks',
  phases: [{ title: 'Polish', detail: 'the two files with findings, then a self-check' }],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const F = REPO + '\\tools\\pipeline\\VERIFY-BACKUPS2.txt'

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn and Kreston. Warm, practical, direct, never preachy.
RULES: ${REPO}\\CLAUDE.md

A SCHEDULE ROW AND ITS SECTION HEADING, OR THE STEP THAT CREATES THE JOB, NAME
THE SAME THING. Her Job, Quiet Play and Wind-Down rows have no prose section,
so they are the easiest to leave pointing at nothing.

DO NOT USE THE "## 🌟 Day N: ... 🌟" HEADER FORMAT.

STYLE: US English. No em dashes in prose, no adverbs, no binary contrasts, no
dramatic fragments, no passive voice, no Wh- sentence openers. Prose wraps near
78 columns. LF endings, no trailing whitespace.
`

const JOBS = [
  {
    key: 'jan', file: '01-jan-zz-backup.md',
    items: [
      `Bad Weather Day 1, the 4:15 row reads "Quiet Play: The Empty Jars". Two problems at once. It is IDENTICAL to a row on a real numbered day, months/11-nov-w47.md line 438, and a backup page must yield to one of the 365. It is also an ORPHAN: the page holds exactly one jar, and the Second Main Event's last step puts it in the fridge full of pickled vegetable sticks, so at 4:15 there are no empty jars anywhere. Rename the row to something the day actually leaves behind. The row has no prose section, so check nothing else on the page points at the old name.`,
      `Bad Weather Day 1, the 4:00 row reads "🧹 Her Job: Turning the Apple Rings", but the step that creates the job says something else: Main Event step 6 reads "Check the string at 4:00 as her job. Almost nothing will have changed..." Nothing tells her to turn anything, and the rings hang on a string rather than lying on a rack. Make the row and the step agree, whichever reads better.`,
      `Bad Weather Day 1, the salt is set up and never resolved. Step 3 says "The day runs three ways from here: salted, plain, and one saucer left alone", but step 5 sends her back to the untouched one only, step 6 to the string only, and the insight compares two items, "the ring on the saucer went brown and soft, the ring on the string went hard and pale". The salted saucer gets a date and no observation, which leaves the teaspoon of salt a half-orphan. Either wire the salted saucer into step 5 and the insight, or drop the salt from the materials and run the day on the two treatments the insight uses.`,
      `Sick Day 1, "Where Kreston Goes": the paragraph rewritten to fix his locomotion left a short line mid-paragraph where the next word would have fitted under 78 columns. Re-flow that paragraph. No wording change.`,
    ],
  },
  {
    key: 'feb', file: '02-feb-zz-backup.md',
    items: [
      `Sick Day 2 sends her off the spot the page just built. The opener promises "everything on this page can be done from a lying start" and the activity section is headed "🛋️ Things She Can Do From the Sofa", but the first bullet of The Shape of the Day reads "**Whenever she wakes.** Ask her to walk to the kitchen for her own drink." Every other month keeps her put: March has "Lunch on the blanket, where she already is", May has "breakfast on the floor by the window". Keep the diagnostic and drop the walk: bring the drink to her and watch how she takes it, since her hands and her voice say more than any question would.`,
      `Bad Weather Day 1 moves the shoe rack twice. Prep Tonight ends "and move the shoe rack somewhere else", then Opening Activity step 1 says "take out everything that would hurt to land on. The plant, the shoe rack, the basket of coats." She moved it last night, so the morning's first instruction sends her hunting for something already gone. Cut the shoe rack from step 1. The saucepan lid the Main Event needs at step 6 is not prepped either, so it can take the shoe rack's place in Prep Tonight.`,
      `Sick Day 2 leads its activity list with "The silverware basket and a tray, sorted into forks, spoons and the blunt knives", but the Safety block allows that only "while Kreston is asleep or behind the gate", and "Where Kreston Goes" sets the day's default the other way: "today he goes back on the floor near her, which is what they both want." The first-named job is the one the page mostly forbids. Either move it down the list with the condition attached, or swap it for something that works with him on the floor.`,
      `Re-flow any paragraph left with a short line mid-paragraph where the next word would have fitted under 78 columns.`,
    ],
  },
]

phase('Polish')

const out = await pipeline(
  JOBS,
  (j) => agent(
`Final polish on the ${j.key.toUpperCase()} backup section. ${RULES}

FILE: ${REPO}\\months\\${j.file}
FULL VERIFIER REPORT: ${F} — read your month's entry for context.
TITLES USED BOOK-WIDE: ${REPO}\\tools\\titles.tsv

${j.items.map((it, i) => `${i + 1}. ${it}`).join('\n\n')}

Make these changes and nothing else. Do not restyle untouched sections.

WHEN DONE, re-read the whole file and check yourself: every Her Job, Quiet
Play and Wind-Down row names something the day actually produces; every
material is used; every setup is resolved; the sick days keep her where she
is; no British terms; no line over 78 columns outside numbered steps and
bullets.

RETURN a list: item number, what you changed.`,
    { label: `polish:${j.key}`, phase: 'Polish', effort: 'high' }
  )
)

return out

export const meta = {
  name: 'water-rule-sweep',
  description: 'Find every surviving statement of the one-adult-per-child water rule, in any wording',
  phases: [
    { title: 'Sweep', detail: 'four readers over the whole water surface of the book' },
    { title: 'Confirm', detail: 'adversarial check of the four rewrites' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a finished 365-day activity
book. Joseph wrote it for Brooklyn to use with Azlyn (three) and Kreston (a
baby, walking from about 12 months). 81 files in ${REPO}/months, 472,000 words.

JOSEPH HAS ASKED FOR ONE RULE TO BE REMOVED FROM THE BOOK.

THE RULE BEING REMOVED: any instruction that ONE ADULT MAY NOT SUPERVISE BOTH
CHILDREN IN WATER. In its various forms it said: bring a second adult, take
them one at a time, one adult to one child, if it is only you then only one of
them gets in, leave Kreston with someone and take Azlyn on her own, he stays
behind, one adult cannot watch two in water.

FOUR INSTANCES HAVE ALREADY BEEN REWRITTEN:
  months/06-jun-w24.md   Day 165 Safety block
  months/07-jul-00-cover.md   the "Two children at the water" bullet
  months/07-jul-w27.md   Day 187 Kreston's Afternoon
  months/07-jul-w27.md   Day 187 Safety block

WHAT STAYS IN THE BOOK, and you must not flag it: arm's reach supervision,
eyes on the children, phone in the bag, float toys are toys and not safety
devices, holding hands on wet tile, getting the baby out before he goes cold,
tipping standing water out after use, and any line offering a second adult as
a convenience rather than requiring one.

YOU ARE LOOKING FOR THE RULE RESTATED IN PROSE THAT KEYWORD SEARCH MISSES.
A grep for the obvious phrases has already run and come back clean, so
anything you find is by definition worded differently. Read for the MEANING:
does this sentence tell the reader she may not take both children into water
by herself, or that one of them must sit out, or that another adult is
required rather than welcome?

Be honest. If your slice is clean, say so and report nothing. A padded list
buries a real hit.
`

const RETURN = `
RETURN JSON only:
{"slice":"...","clean":true|false,"findings":[
{"file":"months/...","day":N,"quote":"the exact sentence",
"whyItIsTheRule":"...","suggestedRewrite":"..."}]}
`

phase('Sweep')

const SLICES = [
  {
    key: 'covers-front',
    prompt: `YOUR SLICE: the twelve booklet covers and the front matter.

FILES: ${REPO}/months/00-front.md and all twelve ${REPO}/months/NN-mon-00-cover.md
files (01-jan through 12-dec).

Each cover carries a "Quick Safety Reminders" list. Read every bullet in all
twelve, plus the front matter's safety and routine sections. The covers are
where a rule gets restated as a standing policy for a whole month, so this is
the likeliest place for a surviving instance.`,
  },
  {
    key: 'safety-blocks',
    prompt: `YOUR SLICE: every Safety block in all 365 days that touches water.

Search ${REPO}/months/*w*.md for blocks beginning "> ⚠️ **Safety:**" and read
every one that mentions the pool, swimming, a paddling pool, a lake, the sea,
a bath, a water table, a bucket, a bowl, a dishpan or a sprinkler.

There are roughly 365 safety blocks. Narrow to the water ones with grep, then
read those in full. Report only blocks that require a second adult or say the
children must go in one at a time.`,
  },
  {
    key: 'infant-outings',
    prompt: `YOUR SLICE: Kreston's blocks and the Out Again bullets.

The infant blocks are "> 👶 **Kreston's Afternoon:**" and "> 👶 **Infant
Integration:**" in ${REPO}/months/*w*.md. The Out Again lists are the bullet
lists under "### 🌳 Out Again:".

These are where the book decides which child goes where. A surviving instance
here reads like "he stays home today", "she gets you to herself", "he comes
only if somebody else comes", or "take her on her own this week". Check every
swimming day and every water outing across all twelve months.`,
  },
  {
    key: 'backups-backmatter',
    prompt: `YOUR SLICE: the twelve backup sections and the back matter.

FILES: ${REPO}/months/*zz-backup.md (twelve files, each with two bad weather
days, two sick days and an extras page) and ${REPO}/months/99-back-01-index.md
and ${REPO}/months/99-back-02-keepsake.md.

The backup sections were written separately from the main days and carry their
own safety lines. The sick-day pages in particular talk about splitting the two
children up. Flag only water supervision, not the sick-day separation rules,
which are about illness and stay in the book.`,
  },
]

const found = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `sweep:${s.key}`, phase: 'Sweep', effort: 'high' })
)

phase('Confirm')

const confirm = await agent(
`${CONTEXT}

VERIFY THE FOUR REWRITES THAT HAVE ALREADY LANDED. Read each in the file and
judge it as a hostile reviewer.

1. ${REPO}/months/06-jun-w24.md, Day 165 Safety block
2. ${REPO}/months/07-jul-00-cover.md, the "Two children at the water" bullet
3. ${REPO}/months/07-jul-w27.md, Day 187 "Kreston's Afternoon"
4. ${REPO}/months/07-jul-w27.md, Day 187 Safety block

FOR EACH, ANSWER:
a. Is the one-adult-per-child rule actually gone, or did the rewrite smuggle
   it back in as a softer implication?
b. Does what replaced it still name the real hazard, or did the safety content
   get hollowed out into a platitude?
c. Is the surrounding text still coherent? Check for a cut seam, a dangling
   clause, a sentence that now contradicts a numbered step elsewhere in the
   same day, or a materials line orphaned by the change.
d. Style: no em dash in prose, no adverbs (really, just, literally, genuinely,
   honestly, simply, actually, deeply, truly, fundamentally), no binary
   contrast, no passive voice, no Wh- sentence opener, wraps near 78 columns.
e. Day 187's Kreston block lost a line in the rewrite. Confirm the block still
   reads as a complete thought and the day is still inside 1,000-1,150 prose
   words.

ALSO CHECK ONE THING THE REWRITES MIGHT HAVE BROKEN: Day 208 puts the paddling
pool and the real pool on the same day, and Day 212 goes to a lake. Read both
days in ${REPO}/months/07-jul-w30.md and ${REPO}/months/07-jul-w31.md and say
whether either day was RELYING on the removed rule to be safe. If a day's plan
only worked because a second adult was mandatory, that day now needs its own
supervision line and you should say exactly what it should say.

RETURN JSON only:
{"allFourClean":true|false,
"perInstance":[{"n":1,"ruleGone":true|false,"hazardStillNamed":true|false,
"coherent":true|false,"styleOk":true|false,"notes":"..."}],
"daysRelyingOnRemovedRule":[{"day":N,"file":"...","problem":"...","fix":"..."}],
"issues":[{"severity":"critical|major|minor","file":"...","problem":"...","fix":"..."}]}`,
  { label: 'confirm:rewrites', phase: 'Confirm', effort: 'high' })

return { found, confirm }

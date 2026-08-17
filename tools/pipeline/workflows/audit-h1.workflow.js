export const meta = {
  name: 'audit-first-half',
  description: 'Reader-level audit of Days 1-182 before design and print',
  phases: [
    { title: 'Audit', detail: 'one agent per dimension, all 182 days' },
    { title: 'Consolidate', detail: 'dedupe, rank, and separate must-fix from taste' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const EX = REPO + '\\tools\\pipeline\\extract-h1'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book.
Joseph wrote it for Brooklyn, the mother of his children, to use with Azlyn
(three years old all through this range) and Kreston (her baby brother, 6
months on Day 1, 12 months on Day 156). Brooklyn reads it at 8:00 in the
morning while holding the baby.

YOU ARE AUDITING DAYS 1-182, January through June. This is the last check
before the book goes to design and print, so the bar is: would this embarrass
us in a printed book a family uses for a year, or fail Brooklyn on the day?

Structural correctness is ALREADY VERIFIED and is not your job. Dates,
weekdays, day numbering, section order, step counts, bullet counts, duplicate
titles, em dashes and adverbs all pass automated checks. Do not report those.

Report only what a careful human reader would catch and a script cannot.

Rank honestly. A defect that would hurt a child or leave Brooklyn stuck at
9:15 outranks a stylistic preference. Do NOT pad the list: if a dimension is
in good shape, say so and report few findings. Inventing marginal findings to
look thorough wastes the author's time and buries the real ones.
`

const RETURN = `
RETURN JSON only, no prose around it:
{"dimension":"...","overallVerdict":"one honest sentence on the state of this
dimension across the 182 days","findings":[{"severity":"critical|major|minor",
"days":[N],"problem":"what is wrong, quoting the exact text","why":"what
happens to Brooklyn or the children","fix":"the specific change"}]}
severity: critical = unsafe or the day cannot be run as written.
major = a reader is misled, blocked, or the book looks wrong in print.
minor = worth fixing if cheap.
`

phase('Audit')

const DIMS = [
  {
    key: 'safety-a', label: 'safety, Days 1-91',
    prompt: `Audit SAFETY across Days 1-91.

FILE: ${EX}\\safety.txt (each entry is a day, its Safety block, and the steps
of its own activities). It is long: read it in chunks with offset and limit,
and cover EVERY day from 1 to 91.

Look for:
1. A numbered step that CONTRADICTS its own day's Safety block. This has been
   the single worst defect class in this book. Real examples already found and
   fixed elsewhere: a step inviting the child to lick an ice block the Safety
   line kept off her face; a walk telling her to pick cow parsley that the
   Safety block reserved for the adult because of hemlock and hogweed
   lookalikes; a step handing a three-year-old scissors the materials list
   marked adult-only.
2. A real hazard in the activity with NO Safety block at all: ovens, hobs, hot
   water, knives, scissors, craft knives, string or cord at child height,
   small parts near a baby who mouths everything, water deeper than a puddle,
   button batteries, nuts and choking foods, allergens, plants, animals.
3. A Safety block that names a hazard but never says what to DO about it.
4. Anything unsafe for a THREE-year-old specifically, or for a baby of the age
   stated on that day.
5. A Safety block that is filler, warning about nothing real. Filler warnings
   train a reader to skip the real ones.`
  },
  {
    key: 'safety-b', label: 'safety, Days 92-182',
    prompt: `Audit SAFETY across Days 92-182. Same file and same checks as the
first-half auditor.

FILE: ${EX}\\safety.txt (each entry is a day, its Safety block, and the steps
of its own activities). Read it in chunks with offset and limit and cover
EVERY day from 92 to 182. Days 92-182 run April to June, so the hazards shift
outdoors: sun, heat, water play, paddling pools, ponds, insects, barbecues,
garden chemicals, and from Day 156 a Kreston who can walk.

1. A numbered step that CONTRADICTS its own day's Safety block.
2. A real hazard with NO Safety block.
3. A hazard named with no action attached.
4. Anything unsafe for a three-year-old, or for a baby of the stated age.
   Water safety matters most here: week 24 is Water Safety & Swimming Fun.
5. Filler Safety blocks warning about nothing.`
  },
  {
    key: 'materials', label: 'materials realism',
    prompt: `Audit MATERIALS across all 182 days.

FILE: ${EX}\\materials.txt

The book's promise is that everything comes from a normal household, the
recycling, or a cheap supermarket trip. Check:
1. Anything a normal house would NOT have and that costs real money or needs a
   special trip. Flag it and say what would substitute.
2. Quantities that are wrong, impossible or absurd for one morning with a
   three-year-old.
3. The same consumable demanded in large amounts on many days without warning
   (for example if flour, paint or card is burned through week after week).
4. Anything unavailable in the season that day falls in.
5. An item listed with no quantity where the quantity matters.
6. Materials that would take longer to gather at 8:00 than the activity takes
   to run.

Note: a step needing an item that is missing from the list, or a listed item
no step uses, has been checked elsewhere. Focus on realism and cost.`
  },
  {
    key: 'repetition', label: 'repetition and sameness',
    prompt: `Audit REPETITION across all 182 days.

FILE: ${EX}\\titles-and-tips.txt (every day's section names and its Tips)

Twenty-six weeks were written by different agents that could not see each
other's work. Find where the book repeats itself:
1. Activities that are effectively the SAME activity under different names,
   especially across months. Name both days.
2. Tips that make the same point in the same shape more than twice.
3. A structural tic: for example many Second Main Events opening the same way,
   or many Get Outside paragraphs ending the same way.
4. Stock phrases recurring across months ("worth watching for", "that is the
   point", "which is the same thing").
5. A material or format used so often it stops feeling special (salt dough,
   cardboard boxes, painting, sorting).

Report the worst offenders with day numbers. A recurring FORMAT is fine if the
content differs; a recurring IDEA is the problem.`
  },
  {
    key: 'insights', label: 'parenting insights',
    prompt: `Audit the PARENTING INSIGHTS across all 182 days.

FILE: ${EX}\\insights.txt (182 insight bodies, one per day)

Each is 100-120 words, evidence-informed, written to a competent adult, framed
as why what she already does works. Check:
1. Anything factually WRONG or overstated about child development. Be strict:
   this is the part of the book that claims authority. Flag any claim that
   research does not support, any invented statistic, any "studies show" with
   nothing behind it.
2. Two insights making the same argument in different words. Headlines are
   unique but the bodies may not be.
3. Anything preachy, or that corrects Brooklyn rather than backing her.
4. Anything that would land badly for a parent having a hard day, or that
   implies a child who does not do the described thing is behind.
5. Advice that contradicts advice given on another day.`
  },
  {
    key: 'infant', label: "Kreston's developmental arc",
    prompt: `Audit KRESTON across all 182 days.

FILE: ${EX}\\infant.txt (his two blocks per day)

He is born June 5 2026: 6 months on Day 1, 7 from Day 5, 8 from Day 36, 9 from
Day 64, 10 from Day 95, 11 from Day 125, and he turns ONE on Day 156.

1. Anything asked of him that is beyond or below his real ability that day.
   Be specific about the milestone.
2. Whether his arc actually PROGRESSES. By Day 156 he should be a participant
   with his own jobs and materials, not a baby parked on a blanket. Say
   honestly whether the book achieves that or whether he stays scenery.
3. Repetition: is he given the same thing to do over and over?
4. Anything unsafe for a baby of that exact age, especially mouthing.
5. Whether the water-safety language stays firm every time he is near water.`
  },
  {
    key: 'season', label: 'season and outdoor fit',
    prompt: `Audit SEASONAL FIT across all 182 days.

FILE: ${EX}\\outdoor.txt (each day's Get Outside and Out Again options)

Days 1-31 are January, 32-59 February, 60-90 March, 91-120 April, 121-151 May,
152-182 June. Northern hemisphere.

1. An activity that will not work in that month's real weather or daylight.
   January dark by 4pm, frozen ground, no leaves. June long evenings, heat.
2. Something depending on a plant, insect or natural event out of season for
   that date: blossom, conkers, frogspawn, berries, bare trees, snow.
3. Repetition of outdoor activities across nearby weeks.
4. A day whose Get Outside is generic rather than a specific named activity.
   The spec bans "Park Trip" style entries.
5. Whether a cold or wet January day gives Brooklyn a realistic indoor way out.`
  },
]

const results = await pipeline(
  DIMS,
  (d) => agent(`${CONTEXT}\n\n${d.prompt}\n\n${RETURN}`,
    { label: `audit:${d.key}`, phase: 'Audit', effort: 'high' })
)

phase('Consolidate')

const merged = await agent(
`You are consolidating a pre-print audit of Days 1-182 of a printed activity
book. ${CONTEXT}

Seven auditors each covered one dimension and could not see each other's
findings. Here is everything they returned:

${results.map((r, i) => `--- ${DIMS[i].label} ---\n${typeof r === 'string' ? r : JSON.stringify(r)}`).join('\n\n')}

YOUR JOB:
1. Merge duplicates. Several auditors may have hit the same day from different
   angles: fold those into one finding.
2. Re-rank honestly across dimensions. A safety contradiction outranks a
   repeated Tip, whatever severity the original auditor assigned.
3. STRIKE anything that is taste rather than a defect, or that the audit brief
   told them not to report (structure, dates, step counts, em dashes,
   adverbs). Say how many you struck and why.
4. Separate the list into MUST FIX BEFORE PRINT and WORTH FIXING, and be
   ruthless about which is which. Design work is about to start against these
   files, so a long list of nice-to-haves is worse than a short list of real
   problems.
5. Give an honest overall verdict on whether Days 1-182 are ready for design.
   If they are, say so plainly.

RETURN JSON only:
{"verdict":"honest paragraph on readiness for design",
"struck":{"count":N,"why":"..."},
"mustFix":[{"days":[N],"dimension":"...","problem":"...","why":"...","fix":"..."}],
"worthFixing":[{"days":[N],"dimension":"...","problem":"...","fix":"..."}],
"dimensionVerdicts":{"safety":"...","materials":"...","repetition":"...","insights":"...","infant":"...","season":"..."}}`,
  { label: 'consolidate', phase: 'Consolidate', effort: 'high' }
)

return { merged, raw: results }

export const meta = {
  name: 'audit-second-half',
  description: 'Reader-level audit of Days 183-364 before design and print',
  phases: [
    { title: 'Audit', detail: 'one agent per dimension, all 182 days' },
    { title: 'Consolidate', detail: 'dedupe, rank, separate must-fix from taste' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const EX = REPO + '\\tools\\pipeline\\extract-h2'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book.
Joseph wrote it for Brooklyn to use with Azlyn and Kreston. She reads it at
8:00 in the morning.

YOU ARE AUDITING DAYS 183-364, July through December. This is the last check
before the book goes to design and print. The bar: would this embarrass us in
a printed book a family keeps for a year, or fail Brooklyn on the day?

AGES IN THIS RANGE, and they move:
- Azlyn is THREE until Day 353 and FOUR from Day 354, her birthday. Days
  354-364 must treat her as four.
- Kreston is 13 months from Day 186, 14 from 217, 15 from 248, 16 from 278,
  17 from 309, 18 from 339. He WALKS, climbs, carries things while moving,
  runs by autumn, and has twenty-plus words by December. He is no longer a
  baby on a blanket, and the hazards change with that: he can now reach
  counters, open doors, climb furniture and get to water on his own feet.

Structural correctness is ALREADY VERIFIED and is not your job. Dates,
weekdays, day numbering, section order, step counts, bullet counts, duplicate
titles, em dashes and adverbs all pass automated checks. Do not report those.

The FIRST half of this book was audited already. These defects were found
there, and you should check whether the same classes recur here:
- a numbered step contradicting its own Safety block
- objects given to the baby that fail the book's own too-big-to-swallow rule
- water moments with no adult-contact sentence
- a hazard named with no action attached
- a full-day holiday whose page never names the holiday
- British plant calendar and British vocabulary under American holidays
- pairs of days running the same activity from the same shopping list
- insights overclaiming, or asserting the child sustained an activity for
  40-60 minutes when 10-20 is typical at three

Report only what a careful human reader would catch and a script cannot.
Rank honestly. Do NOT pad: if a dimension is in good shape, say so and report
few findings. Inventing marginal findings buries the real ones.
`

const RETURN = `
RETURN JSON only, no prose around it:
{"dimension":"...","overallVerdict":"one honest sentence on this dimension
across the 182 days","findings":[{"severity":"critical|major|minor",
"days":[N],"problem":"what is wrong, quoting the exact text","why":"what
happens to Brooklyn or the children","fix":"the specific change"}]}
severity: critical = unsafe or the day cannot be run as written.
major = a reader is misled, blocked, or the book looks wrong in print.
minor = worth fixing if cheap.
`

phase('Audit')

const DIMS = [
  {
    key: 'safety-a', label: 'safety, Days 183-273',
    prompt: `Audit SAFETY across Days 183-273, July to September.

FILE: ${EX}\\safety.txt (each entry is a day, its Safety block, and its own
activity steps). It is long: read it in chunks with offset and limit, and
cover EVERY day from 183 to 273.

1. A numbered step that CONTRADICTS its own day's Safety block. This was the
   worst defect class in the first half. Real examples found there: a step
   inviting the child to lick an ice block the Safety line kept off her face;
   a walk telling her to pick the one plant the Safety block reserved for the
   adult; a step handing her scissors the materials list marked adult-only.
2. A real hazard with NO Safety block. Summer hazards: sun and heat, water and
   paddling pools, ponds, barbecues, insect stings, garden chemicals, hot
   surfaces, sand, campfires.
3. A hazard named with no action attached.
4. Anything unsafe for a three-year-old, or for a WALKING toddler of the age
   stated that day. Kreston is 13-15 months here and can reach and climb.
5. Filler Safety blocks warning about nothing real.
6. SUN CREAM. The first-half audit found it appeared once in 182 days and was
   missing from the whole June water week. July and August are the hottest
   months in this range. Check every outdoor block.`
  },
  {
    key: 'safety-b', label: 'safety, Days 274-364',
    prompt: `Audit SAFETY across Days 274-364, October to December.

FILE: ${EX}\\safety.txt. Read in chunks with offset and limit, cover EVERY day
from 274 to 364.

Autumn and winter hazards: candles and open flame (Diwali 302, Halloween 304,
Dia de los Muertos 305, Hanukkah 358, Christmas 359), hot stoves and ovens,
hot drinks, cold and wet exposure, dark afternoons and road visibility, holly
and yew and other poisonous winter berries, small holiday decorations and
tree ornaments, button batteries in lights and toys, nuts and choking foods at
Thanksgiving and Christmas, plastic packaging.

1. A numbered step contradicting its own Safety block.
2. A real hazard with NO Safety block.
3. A hazard named with no action attached.
4. Kreston is 16-18 months here. He walks, climbs and reaches. Anything left
   at his height, any candle on a low table, any tree ornament within reach.
5. Filler Safety blocks.
6. Azlyn turns FOUR on Day 354. Check that Days 354-364 treat her as four and
   that nothing still calls her three.`
  },
  {
    key: 'materials', label: 'materials realism',
    prompt: `Audit MATERIALS across all 182 days.

FILE: ${EX}\\materials.txt

The promise is a normal household, the recycling, or a cheap supermarket trip.
1. Anything a normal US house would not have, that costs real money or needs a
   special trip. Say what would substitute.
2. Quantities wrong, impossible or absurd for one morning with a small child.
3. The same consumable demanded heavily across many days with no warning.
4. Anything unavailable in the season that day falls in.
5. An item listed with no quantity where the quantity matters.
6. Anything requiring work the night before that is not flagged in the
   previous day's Prep Tonight.
7. BRITISH GROCERIES OR VOCABULARY. The book was converted to US English but
   the second half was converted by script, not read. Flag anything still
   British: conkers, elderflower, squash as a drink, biscuits, courgette,
   caster sugar, or any measurement given only in grams and millilitres where
   a US reader needs cups and spoons.`
  },
  {
    key: 'repetition', label: 'repetition and sameness',
    prompt: `Audit REPETITION across all 182 days.

FILE: ${EX}\\titles-and-tips.txt (each day's section names and Tips)

Twenty-six weeks were written by agents that could not see each other's work.
1. Activities that are effectively the SAME activity under different names,
   especially across months. Name both days. Joseph's instruction is that
   every activity must be unique.
2. Tips making the same point in the same shape more than twice.
3. A structural tic across many days.
4. Stock phrases recurring across months.
5. A material or format used so often it stops feeling special.
6. Also check against the FIRST half where you can tell from the names: does
   an activity here repeat one from Days 1-182? Christmas cookie decorating
   against the February bakery week, for instance.`
  },
  {
    key: 'insights', label: 'parenting insights',
    prompt: `Audit the PARENTING INSIGHTS across all 182 days.

FILE: ${EX}\\insights.txt (182 insight bodies)

1. Anything factually WRONG or overstated about child development. Be strict:
   this is where the book claims authority. Flag invented statistics, any
   "research shows" with nothing behind it, and any claim the evidence does
   not support. The first-half audit found object permanence attributed to a
   three-year-old and three claims ranking an underdog skill above the
   conventional one against the evidence.
2. Two insights making the same argument in different words.
3. Anything preachy, or correcting Brooklyn rather than backing her.
4. Anything that would land badly for a parent having a hard day, or that
   implies a child who does not do the described thing is behind.
5. Advice contradicting another day.
6. Any claim that the child sustained one activity for 40-60 minutes.
   Ten to twenty is typical at three. This is the number Brooklyn measures
   herself against.
7. Days 354-364: Azlyn is FOUR. Any insight still written about a
   three-year-old's capabilities there is wrong.`
  },
  {
    key: 'infant', label: "Kreston's developmental arc",
    prompt: `Audit KRESTON across all 182 days.

FILE: ${EX}\\infant.txt (his two blocks per day)

He is 13 months from Day 186, 14 from 217, 15 from 248, 16 from 278, 17 from
309, 18 from 339. He walks, climbs, carries things while moving, runs, scribbles,
stacks, spoons food, and has 20+ words by December.

1. Anything asked of him beyond or below his real ability that day. Name the
   milestone.
2. Does his arc keep DEVELOPING, or does the book freeze him at "toddles
   about" for six months? Say honestly.
3. Repetition: is he given the same thing to do over and over? The first-half
   audit found thirteen near-identical library afternoons and "twenty minutes"
   as the answer to everything.
4. Anything unsafe for a walking toddler of that exact age. He can now reach
   counters, climb chairs and get to water on his own feet.
5. Water-safety language: does it stay firm every time he is near water?
6. Does he get his own real jobs, or is he still scenery?`
  },
  {
    key: 'season', label: 'season and outdoor fit',
    prompt: `Audit SEASONAL FIT across all 182 days.

FILE: ${EX}\\outdoor.txt (each day's Get Outside and Out Again options)

Days 183-212 July, 213-243 August, 244-273 September, 274-304 October,
305-334 November, 335-364 December. NORTHERN HEMISPHERE, UNITED STATES.

1. An activity that will not work in that month's real weather or daylight.
   December dark by 5pm, frozen ground. July heat and long evenings.
2. Something depending on a plant, insect or natural event out of season, OR
   out of place for the United States. The book was written with a BRITISH
   plant calendar and only partly corrected. Flag conkers (US: buckeyes or
   horse chestnuts), elderflower, blackthorn, and any bloom or fall timing
   that is British rather than American.
3. Repetition of outdoor activities across nearby weeks.
4. A Get Outside that is generic rather than a specific named activity.
5. Whether a cold, wet or dark day gives Brooklyn a realistic indoor way out.
   December afternoons are short and the book must not assume daylight.`
  },
]

const results = await pipeline(
  DIMS,
  (d) => agent(`${CONTEXT}\n\n${d.prompt}\n\n${RETURN}`,
    { label: `audit:${d.key}`, phase: 'Audit', effort: 'high' })
)

phase('Consolidate')

const merged = await agent(
`You are consolidating a pre-print audit of Days 183-364. ${CONTEXT}

Seven auditors each covered one dimension and could not see each other's
findings. Everything they returned:

${results.map((r, i) => `--- ${DIMS[i].label} ---\n${typeof r === 'string' ? r : JSON.stringify(r)}`).join('\n\n')}

YOUR JOB:
1. Merge duplicates across dimensions into one finding each.
2. Re-rank honestly across dimensions. A safety contradiction outranks a
   repeated Tip whatever severity its auditor assigned.
3. STRIKE anything that is taste rather than defect, or that the brief told
   them not to report. Say how many you struck and why.
4. Split into MUST FIX BEFORE PRINT and WORTH FIXING, and be ruthless. Design
   work starts against these files, so a long list of nice-to-haves is worse
   than a short list of real problems.
5. Give an honest verdict on whether Days 183-364 are ready for design.

RETURN JSON only:
{"verdict":"honest paragraph on readiness",
"struck":{"count":N,"why":"..."},
"mustFix":[{"days":[N],"dimension":"...","problem":"...","why":"...","fix":"..."}],
"worthFixing":[{"days":[N],"dimension":"...","problem":"...","fix":"..."}],
"dimensionVerdicts":{"safety":"...","materials":"...","repetition":"...","insights":"...","infant":"...","season":"..."}}`,
  { label: 'consolidate', phase: 'Consolidate', effort: 'high' }
)

return { merged, raw: results }

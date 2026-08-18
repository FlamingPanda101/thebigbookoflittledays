export const meta = {
  name: 'final-battery',
  description: 'Everything a deterministic check cannot judge, in fourteen tight slices',
  phases: [
    { title: 'Audit', detail: 'fourteen slices, one month or one dimension each' },
    { title: 'Verify', detail: 'refute every non-minor finding' },
    { title: 'Verdict', detail: 'ready for the designer, or not' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a designer for print layout. Joseph wrote it for Brooklyn to use with Azlyn
(three until Day 353, four after) and Kreston (six months on Day 1, eighteen by
December). She reads it at 8:00 in the morning and runs the day off the page.
81 files in ${REPO}/months, about 472,000 words.

STRUCTURE: 12 printable booklets. Each has a cover, four or five week files
(a week opener plus seven days), and a backup section holding two bad weather
days, two sick days and an extras page. Day 365 stands alone. Front matter
opens the volume; a Master Activity Index and a Keepsake Tracker close it.

EVERY DETERMINISTIC CHECK ALREADY PASSES, so do not spend time on any of it:
365 days, all dates correct against the real 2027 calendar, 16 schedule rows
per day, every schedule row matching its section heading character for
character, legal step and bullet counts, 413 insights all inside the 100-120
word band, 1,531 unique activity titles, 504 anchors with zero dead links,
60/60 backup sections indexed, zero em dashes in prose, zero banned adverbs,
Kreston's stated age correct on every day, LF endings, no trailing whitespace,
no unclosed bold.

DECISIONS JOSEPH HAS ALREADY MADE. These are settled. Do not re-argue them,
do not recommend reversing them, and do not report their absence as a defect:
- NO personal messages from Joseph anywhere. The 52 weekly notes, the
  front-matter opening and the closing page were all removed.
- NO swimming lessons. The family has a POOL MEMBERSHIP and goes when it
  suits. Other people's lessons closing the pool is realistic and stays.
- NO first-word thread. Kreston's first word is never predicted or landed.
- NO tree thread. Nobody returns to the April tree.
- NO one-adult-per-child water rule. It was deleted on his instruction and
  replaced with arm's-reach supervision. Never recommend restoring it.
- TWELVE handprints, one per calendar month, both children on one sheet.
- The growth chart is offered in all twelve months AS AN OPTION.
- US English throughout, except the word "autumn", which stays.
- House style: no em dashes in prose, no adverbs (really, just, literally,
  genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
  binary contrasts, no dramatic fragments, no passive voice, no Wh- sentence
  openers, prose wrapped near 78 columns.

Be honest and rank honestly. This book has been through many audits and is
going to design. A long list of nice-to-haves is worse than a short list of
real defects. If your slice is clean, say so and report nothing. Read only
what your slice names and stop; do not read the whole book.
`

const RETURN = `
RETURN JSON only, under 1500 words:
{"slice":"...","verdict":"one honest sentence","findings":[
{"severity":"critical|major|minor","days":[N],"file":"months/...",
"quote":"exact text from the file","problem":"...","fix":"the specific change"}]}
`

// ---- safety vs steps: the defect class that has produced the worst finds ----
const SAFETY = [
  { k: 'q1', files: '01-jan-w1.md 01-jan-w2.md 01-jan-w3.md 01-jan-w4.md 01-jan-w5.md 02-feb-w6.md 02-feb-w7.md 02-feb-w8.md 02-feb-w9.md 03-mar-w10.md 03-mar-w11.md 03-mar-w12.md 03-mar-w13.md', label: 'January to March' },
  { k: 'q2', files: '04-apr-w14.md 04-apr-w15.md 04-apr-w16.md 04-apr-w17.md 04-apr-w18.md 05-may-w19.md 05-may-w20.md 05-may-w21.md 05-may-w22.md 06-jun-w23.md 06-jun-w24.md 06-jun-w25.md 06-jun-w26.md', label: 'April to June' },
  { k: 'q3', files: '07-jul-w27.md 07-jul-w28.md 07-jul-w29.md 07-jul-w30.md 07-jul-w31.md 08-aug-w32.md 08-aug-w33.md 08-aug-w34.md 08-aug-w35.md 09-sep-w36.md 09-sep-w37.md 09-sep-w38.md 09-sep-w39.md', label: 'July to September' },
  { k: 'q4', files: '10-oct-w40.md 10-oct-w41.md 10-oct-w42.md 10-oct-w43.md 10-oct-w44.md 11-nov-w45.md 11-nov-w46.md 11-nov-w47.md 11-nov-w48.md 12-dec-w49.md 12-dec-w50.md 12-dec-w51.md 12-dec-w52.md 12-dec-w53-finale.md', label: 'October to December' },
]

const SLICES = [
  ...SAFETY.map(q => ({
    key: `safety-${q.k}`,
    prompt: `SLICE: does any numbered step contradict its own Safety block, ${q.label}?

FILES, in ${REPO}/months/: ${q.files}

THIS IS THE HIGHEST-VALUE DEFECT CLASS IN THIS BOOK. Previous passes found a
step telling a child to lick an ice block the Safety block called a choke
hazard, a foraging step naming cow parsley beside a warning about hemlock,
scissors marked adult-only then handed to the child two steps later, and a
lap slide repeated four times where the Safety block named the exact
tibia-fracture mechanism. Every one of those read fine in isolation.

For EACH day in your files:
1. Read the ⚠️ Safety block.
2. Read every numbered step, every Afternoon Alternative, every Out Again
   bullet and both 👶 infant blocks on that same day.
3. Report anything a step tells the reader to do that the Safety block on the
   same page forbids, restricts, or contradicts. Quote both sides.

Also flag: a hazard present in the day's activity with NO safety line
covering it (hot liquid, open flame, blades, small parts near a baby who
mouths everything, standing water, cords at neck height, heights, roads),
and any safety line that names a hazard the day does not contain.

Kreston mouths everything and walks from about twelve months. Azlyn is three.`,
  })),

  {
    key: 'numbers',
    prompt: `SLICE: numeric and factual consistency in the prose.

The book counts things out loud constantly and a wrong count is visible to a
reader running the day. Check these across the whole book with grep, then read
the sites:

1. Counts that must agree between a step and the thing it counts: "the five
   tests", "the four questions", "twelve sheets", "the six answers", "eleven
   of them", "twenty-nine pebbles", "the seven pieces". Where a number is
   named, count the actual items on the page.
2. The four questions asked on Day 1, Day 92, Day 209 and Day 365. Are the
   question sets consistent with what each day claims to compare?
3. Ages and arithmetic in prose: "three months, about the width of two
   fingers", "six months after the first", "five months on". Check each
   against the day numbers involved.
4. Day-of-week and seasonal claims: "the longest day of the year", "the first
   Saturday of the month", "peak week for blackberries", "the city cuts them
   in July". Check against the real 2027 calendar and the northern hemisphere.
5. Any claim about how many times something has happened this year.`,
  },
  {
    key: 'xref',
    prompt: `SLICE: cross-references between days.

Grep ${REPO}/months/*w*.md for "Day \\d" and for backward references worded in
prose ("in January", "back in the spring", "the one you made in June", "since
Day 1", "last time", "on Saturday"). For each, open the day being referenced
and confirm it actually contains what the reference claims.

This matters because activities were rewritten in place across many passes,
so a reference can survive its target. Report any reference to something that
does not exist, happened on a different day, or happened differently.

Pay particular attention to the finale, ${REPO}/months/12-dec-w53-finale.md,
which reaches back further than any other page.`,
  },
  {
    key: 'design-structure',
    prompt: `SLICE: can a designer template this book?

You are reading as the person who has to lay out 365 near-identical pages.
Sample at least 25 days spread across all twelve months, plus all twelve
covers and all twelve backup sections in ${REPO}/months/.

1. Does every day carry the same section sequence in the same order with the
   same heading levels and the same emoji? List any day that deviates.
2. Are the recurring block formats byte-consistent? Specifically:
   "### 🌙 Prep Tonight", "### ⏰ At-a-Glance Schedule", "**🧰 Complete
   Materials List:**" versus "**🧰 You need:**", "**📝 Step-by-Step
   Instructions:**", "> 💡 **Tip:**", "> 🧠 **A Little Parenting Insight**",
   "> ⚠️ **Safety:**", "> 👶 **Kreston's Afternoon:**" versus
   "> 👶 **Infant Integration:**". Report any variant spelling or punctuation
   of these, because each variant costs the designer a special case.
3. Page-break divs: are they placed consistently, and is any one of them
   inside a block it would split badly?
4. Anything a print layout would choke on: a very long unbroken table, a list
   item running many lines, nested markdown, raw HTML beyond the anchor and
   page-break divs, or a heading that would sit alone at the foot of a page.
5. Do the twelve covers share one structure, and the twelve backup sections
   another?`,
  },
  {
    key: 'backups',
    prompt: `SLICE: the twelve backup sections, read properly for the first time.

FILES: ${REPO}/months/*zz-backup.md, all twelve.

Each holds two bad weather days, two sick days and an extras page, so this is
60 sections that a parent reaches for on the worst days of the year. They were
checked for season fit and pantry-only materials and nothing else.

1. SICK DAYS. Is the advice safe for an actually ill three-year-old? Flag
   anything requiring energy, appetite, or being upright that a sick child
   does not have. Flag any medical claim.
2. BAD WEATHER DAYS. Do they work indoors with what is already in the house?
   Flag any material that needs a trip out, which defeats the purpose.
3. Does the infant get handled on these days? A sick sister and a walking
   toddler in one room is the hardest hour in the book.
4. Are the extras pages actually usable, or a list of names with no method?
5. Does anything here contradict the main days, or duplicate one of them?`,
  },
  {
    key: 'sidebars',
    prompt: `SLICE: the 52 Around the World sidebars.

Grep ${REPO}/months/*w*.md for "Around the World" and read all 52.

1. ACCURACY. Is each claim about the country true and current? Flag anything
   outdated, wrong, or that describes a whole country by one custom.
2. RESPECT. These are read aloud to a three-year-old by her mother. Flag
   anything that exoticizes, flattens, or treats a living culture as a
   costume. Flag any "children there" framing that a family from that country
   would wince at.
3. Does each one give her something she can actually DO on the floor at home,
   as the format promises?
4. Are the 52 well spread across the world, or clustered on a few regions?
5. Is any country used twice?`,
  },
  {
    key: 'materials-real',
    prompt: `SLICE: can Brooklyn actually get and afford this?

Read ${REPO}/tools/pipeline/extract-all/materials.txt if it exists, otherwise
grep the Complete Materials Lists across ${REPO}/months/*w*.md.

1. Anything that needs a specialist shop, a long lead time, or an online order
   the book never warns about.
2. Anything expensive enough to notice, especially where it appears once.
3. Anything seasonal that will not be available in the month it is called for
   in the northern hemisphere.
4. Anything unsafe to have in a house with an eighteen-month-old.
5. The cumulative load: is there a week that asks for an unreasonable number
   of new things at once? Name the worst week and what it asks for.`,
  },
  {
    key: 'voice',
    prompt: `SLICE: voice consistency after many editing passes.

Sample at least 30 days spread across all twelve months in
${REPO}/months/*w*.md, weighted toward January (written first, before the
style rules existed), May and June (nineteen infant blocks rewritten in one
sitting), and July (heavily edited for the swimming reframe).

1. Does January read like December? Name any month that sounds like a
   different writer.
2. Are there passages that read as machine-smoothed rather than written:
   hedging, throat-clearing, a sentence that says nothing, three sentences of
   the same length and shape in a row?
3. Is Brooklyn ever written as incompetent, scolded, or lectured? Quote
   anything that reads that way. This is the single worst thing the book
   could do.
4. Is the reader ever addressed inconsistently, second person sliding to third
   or to an imperative that assumes a different speaker?
5. Any surviving first-person narrator, now that all of Joseph's notes are
   gone.`,
  },
  {
    key: 'shopping-h1',
    prompt: `SLICE: triage shopping-list gaps, JANUARY TO JUNE.

A lexical check flagged every material line in a day whose words appear
nowhere in that week's shopping list. It is deliberately noisy. The full list
is at ${REPO}/tools/pipeline/DEEPCHECK-WARNINGS.txt; take only the entries for
files 01-jan through 06-jun.

THE SPEC SAYS the week list must be complete, "including things she probably
owns, so she can check stock before the week starts."

For each flagged line, open the day and decide:
  REAL GAP: something she has to have and could plausibly not own, missing
    from the week list. Example: a specific pen, a jar, thick card.
  NOT A GAP: furniture and fixtures (a chair, the window, the doormat, the
    stroller, a wall), water from the tap, or something made earlier in the
    same week that the list already covers as raw materials.

Report ONLY the real gaps, with the exact line to add and which week list it
belongs to. Being ruthless here is the whole job; a false gap adds clutter to
a list Brooklyn shops from.`,
  },
  {
    key: 'shopping-h2',
    prompt: `SLICE: triage shopping-list gaps, JULY TO DECEMBER.

Same job as the January-to-June slice. The full list is at
${REPO}/tools/pipeline/DEEPCHECK-WARNINGS.txt; take only the entries for files
07-jul through 12-dec. October week 41 and August weeks 33 and 35 carry the
most flags, so start there.

THE SPEC SAYS the week list must be complete, "including things she probably
owns, so she can check stock before the week starts."

REAL GAP: something she has to have and could plausibly not own, missing from
that week's list. NOT A GAP: furniture and fixtures, tap water, or something
made earlier in the same week from materials the list already covers.

Report ONLY real gaps, with the exact line to add and which week list it goes
on. A false gap adds clutter to a list Brooklyn shops from.`,
  },
  {
    key: 'index',
    prompt: `SLICE: the Master Activity Index, as a person trying to find something.

FILE: ${REPO}/months/99-back-01-index.md, plus ${REPO}/months/00-front.md for
how the index is introduced.

1. Does the index cover the main days, or only the backup sections? Count what
   it actually lists against the 1,531 named activities in the book.
2. Are its categories the ones a parent would search by at 8:00 in the
   morning: no mess, ten minutes, burns energy, calms down, one cardboard box,
   teaches letters, teaches counting?
3. Every entry should link AND give a human location. Spot-check twenty
   entries: does the link resolve and does the location match?
4. Is anything findable through the index that is not findable any other way,
   and is anything important missing from it?
5. Would a designer be able to lay this out, or is it too long or uneven?`,
  },
]

phase('Audit')

const audited = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `audit:${s.key}`, phase: 'Audit', effort: 'high' }),

  (res, s) => {
    if (!res) return { slice: s.key, died: true, findings: [], verified: [] }
    let o
    try { o = typeof res === 'string' ? JSON.parse(res.slice(res.indexOf('{'), res.lastIndexOf('}') + 1)) : res }
    catch { return { slice: s.key, unparsed: String(res).slice(0, 1200), findings: [], verified: [] } }
    const fs = (o.findings || []).filter(f => f.severity !== 'minor')
    if (!fs.length) return { slice: s.key, verdict: o.verdict, findings: o.findings || [], verified: [] }
    return parallel(fs.slice(0, 12).map(f => () =>
      agent(
`Try to REFUTE this finding about a 365-day activity book going to print.
${CONTEXT}

THE CLAIM:
  severity: ${f.severity}
  days: ${JSON.stringify(f.days || [])}
  file: ${f.file || '(unstated)'}
  quote: ${f.quote || '(none given)'}
  problem: ${f.problem}
  proposed fix: ${f.fix}

OPEN THE FILE AND CHECK. Refute it if: the quoted text is not in the file, or
is quoted out of context, or it is taste rather than a defect, or an earlier
pass already fixed it, or it argues against one of Joseph's settled decisions,
or the fix would break something else, or a reader running the day would never
hit it. Default to refuted when uncertain. A false finding that survives costs
more than a true one that dies, because this book is finished and every edit
risks the text around it.

RETURN JSON only:
{"refuted":true|false,"why":"one or two sentences","realSeverity":"critical|major|minor"}`,
        { label: `refute:${s.key}:${(f.days || ['x'])[0]}`, phase: 'Verify', effort: 'high' })
        .then(v => {
          let j
          try { j = typeof v === 'string' ? JSON.parse(v.slice(v.indexOf('{'), v.lastIndexOf('}') + 1)) : v }
          catch { j = { refuted: false, why: 'verifier output unparsable' } }
          return { ...f, refuted: j.refuted, why: j.why, realSeverity: j.realSeverity }
        })
    )).then(verified => ({ slice: s.key, verdict: o.verdict, findings: o.findings || [], verified }))
  }
)

phase('Verdict')

const rows = audited.flat().filter(Boolean)
const died = rows.filter(r => r.died).map(r => r.slice)
const survivors = rows.flatMap(r => (r.verified || []).filter(v => v && !v.refuted))
log(`${rows.length - died.length}/${SLICES.length} slices returned, ${survivors.length} survived refutation`)

const verdict = await agent(
`Give the final verdict on whether this book can go to the designer.
${CONTEXT}

FOURTEEN AUDITORS EACH TOOK ONE SLICE. Every non-minor finding went to an
independent skeptic told to refute it. Here is what came back:

${rows.map(r =>
  `--- ${r.slice} ---\n` +
  (r.died ? 'AGENT DIED, slice not covered\n' :
   `verdict: ${r.verdict || '(none)'}\n` +
   `all findings: ${JSON.stringify((r.findings || []).map(f => ({ sev: f.severity, days: f.days, file: f.file, problem: (f.problem || '').slice(0, 220) })))}\n` +
   `survived refutation: ${JSON.stringify((r.verified || []).filter(v => v && !v.refuted).map(v => ({ days: v.days, file: v.file, quote: (v.quote || '').slice(0, 160), problem: (v.problem || '').slice(0, 280), fix: (v.fix || '').slice(0, 240) })))}`)
).join('\n\n')}

${died.length ? `WARNING: no coverage for: ${died.join(', ')}. Say so plainly.` : 'All fourteen slices returned.'}

YOUR JOB:
1. Merge duplicates across slices.
2. STRIKE anything that is taste, already fixed, or argues against one of
   Joseph's settled decisions. Say how many you struck and why.
3. Split what survives into MUST FIX BEFORE DESIGN and CAN SHIP WITHOUT. The
   bar for MUST FIX is: a reader running that day off the page hits a real
   problem, or the designer cannot lay the page out. Be ruthless.
4. Answer plainly: CAN THIS GO TO THE DESIGNER? If yes, say yes.

RETURN JSON only:
{"readyForDesign":true|false,
"verdict":"an honest paragraph addressed to Joseph",
"struck":{"count":N,"why":"..."},
"mustFix":[{"days":[N],"file":"...","quote":"...","problem":"...","fix":"..."}],
"canShipWithout":[{"days":[N],"problem":"...","fix":"..."}]}`,
  { label: 'verdict', phase: 'Verdict', effort: 'high' })

return { verdict, rows }

export const meta = {
  name: 'preprint-audit2',
  description: 'Pre-print audit, retry: seams, threads, Kreston and the reader, in smaller slices',
  phases: [
    { title: 'Audit', detail: 'eight tight slices, short runs' },
    { title: 'Verify', detail: 'refute every non-minor finding' },
    { title: 'Verdict', detail: 'ready for design, or not' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book about
to go to a designer for layout. Joseph wrote it for Brooklyn to use with Azlyn
(three until Day 353, four after) and Kreston (six months on Day 1, eighteen by
December). She reads it at 8:00 in the morning and runs the day off the page.
81 files in ${REPO}/months, about 472,000 words.

THE BOOK HAS BEEN AUDITED MANY TIMES AND THOSE FINDINGS ARE FIXED. Safety
contradictions, choke hazards, water supervision, materials realism,
repetition, insight accuracy and season fit have all had dedicated passes. All
deterministic gates pass: 365 days, 1,167 unique activity titles, 413 unique
insight headlines, 504 anchors with zero dead links, 60/60 backup sections
indexed, zero em dashes in prose, zero banned adverbs, and every day holding 16
schedule rows with legal step and bullet counts.

YOU ARE NOT RE-AUDITING THE BOOK. You are auditing WHAT THIS SESSION CHANGED,
because the changes were mostly REMOVALS, and removal leaves seams.

WHAT WAS REMOVED OR REWRITTEN IN THIS SESSION:
1. ALL 52 WEEKLY "NOTES FROM JOSEPH" were deleted from the week openers, with
   the personal opening in the front matter and the whole closing-note page
   (months/99-back-03-closing.md, now gone). No personal messages remain.
2. THE FIRST-WORD THREAD was removed. Nineteen places across April, May and
   June said Kreston's first word was coming; Day 156 landed it on his
   birthday. All were rewritten to say true things that promise nothing.
3. THE TREE THREAD was removed. Day 107 promised return visits to a chosen
   tree in July, September and December.
4. SWIMMING WAS RE-FRAMED. No lessons and never were; the family has a POOL
   MEMBERSHIP and goes when it suits.
5. A SAFETY RULE WAS DELETED AT JOSEPH'S INSTRUCTION: that one adult may not
   supervise both children in water. Arm's-reach supervision replaced it. THIS
   WAS HIS EXPLICIT DECISION. DO NOT re-argue it or recommend restoring it.
6. THREE MISSING HANDPRINTS were written (Days 219, 271, 325) and a duplicate
   June sheet on Day 172 became a comparison against January's. There are now
   twelve, one per calendar month: Days 1, 52, 60, 95, 129, 154, 187, 219,
   271, 287, 325, 362.
7. THE GROWTH CHART now offers a mark in all twelve months, as an OPTION.
8. Day 92's April envelope is now opened in Day 365. Day 326 reaches one of
   the markers Day 209 gave for the bottle.
9. Day 361's insight lost a fabricated research authority.

AN EARLIER AUDITOR ALREADY COVERED ORPHANED REFERENCES AND ITS FINDINGS ARE
FIXED. DO NOT RE-REPORT ANY OF THESE, they are done:
- four surviving tree promises in months/04-apr-w16.md (week opener lines 12
  and 22, Day 107 step 7, and the Day 107 insight), plus the wild corner's
  July return and its reference to the tree
- week 25's opener promising "a second handprint next to the first"
- week 25 shopping list paint, brush, washcloth and bowl orphans
- Day 172's unused permanent marker
- "I wrote the plan on a full night of sleep" in months/03-mar-w11.md
- the Keepsake Tracker's "word count" residue
- CLAUDE.md and CONTINUATION.md still mandating the notes and closing page
- the compiled book at the repo root being stale (it gets regenerated at the
  end, do not report it)

Be honest and rank honestly. This book is going to design. A long list of
nice-to-haves is worse than a short list of real defects. If your slice is
clean, say so and report nothing. Work efficiently: read what your slice names
and stop. Do not read the whole book.
`

const RETURN = `
RETURN JSON only, and keep it under 2000 words:
{"slice":"...","verdict":"one honest sentence","findings":[
{"severity":"critical|major|minor","days":[N],"file":"months/...",
"quote":"the exact text in the file","problem":"...","fix":"the specific change"}]}
`

phase('Audit')

const SLICES = [
  {
    key: 'seams-openers',
    prompt: `SLICE: the 52 week openers where the note was cut out.

FILES: ${REPO}/months/*w*.md, the top of each file only.

The note sat between the "This Week's Shopping List" checkbox list and the
"> 👶 **Kreston is N months this week**" line. Read that junction in ALL 52
files. You are looking for wrong numbers of horizontal rules, doubled or
missing blank lines, a stranded "---", or a page that reads as though
something has been lifted out of it.

Report a pattern once with the list of files it affects rather than 52 times.`,
  },
  {
    key: 'seams-front',
    prompt: `SLICE: the front matter and the two back-matter pages, read whole.

FILES: ${REPO}/months/00-front.md, ${REPO}/months/99-back-01-index.md,
${REPO}/months/99-back-02-keepsake.md.

The front matter lost a personal opening and a line about a weekly note. The
back matter lost a third page entirely (the closing note). Read all three in
full and report anything that reads as truncated, any table of contents entry
pointing at something gone, and any claim these pages make about the book that
the days no longer deliver.`,
  },
  {
    key: 'seams-firstword',
    prompt: `SLICE: the nineteen first-word rewrite sites, read in context.

FILES: ${REPO}/months/04-apr-w18.md, 05-may-00-cover.md, 05-may-w19.md,
05-may-w20.md, 05-may-w21.md, 05-may-w22.md, 05-may-zz-backup.md,
06-jun-w23.md.

Grep each for "👶" and read every infant block in these files in FULL, not the
changed sentence alone. A sentence was cut from the middle of most of them.
Look for a dangling pronoun, a "so" or "and" joining things that no longer
connect, a paragraph making its point twice, or a transition into a subject
that was deleted. Quote the whole block where you find one.`,
  },
  {
    key: 'threads-hand',
    prompt: `SLICE: the twelve handprints and the growth chart, verified day by day.

1. THE TWELVE HANDPRINTS at Days 1, 52, 60, 95, 129, 154, 187, 219, 271, 287,
   325, 362. Open each. Verify each is labeled with its calendar month, puts
   BOTH children on ONE sheet, and uses Day 1's fixed method ("Paint her palm
   with the brush rather than dipping her hand. Press flat, count to three,
   lift straight up"). Confirm exactly one per month and no thirteenth.
2. Confirm ${REPO}/months/12-dec-w53-finale.md says TWELVE everywhere it gives
   a number, and that Day 365 can lay out what the book actually made.
3. THE GROWTH CHART: a mark is offered at Days 1, 52, 78, 95, 129, 154, 172,
   209, 219, 249, 287, 326, 354, 365. Verify each exists, that the ones added
   this session read as an OPTION rather than a task, and that the front
   matter and Keepsake Tracker describe the thread the way the days do.

Use grep to locate, then read each site. Report contradictions in the method,
the count, or the container.`,
  },
  {
    key: 'threads-rest',
    prompt: `SLICE: the capsule, the bottle, the April envelope, the walk, the forks.

READ: ${REPO}/months/01-jan-w1.md (Day 1 starts them),
${REPO}/months/12-dec-w53-finale.md (Day 365 closes them),
${REPO}/months/99-back-02-keepsake.md (the tracker), and grep the month files
for where each is picked up.

1. THE APRIL ENVELOPE. Day 92 in ${REPO}/months/04-apr-w14.md seals it. Day
   365 opens it. Do the questions Day 92 asks line up with what Day 365 claims
   to compare? Day 365 says the row reads January, April, December.
2. THE BOTTLE. Day 209 in ${REPO}/months/07-jul-w30.md seals it and names
   markers for the wait. Day 365 says "she asked about it again when the
   leaves came off". Day 326 in ${REPO}/months/11-nov-w47.md was given a line
   to earn that. Does it?
3. THE TIME CAPSULE, THE SAME WALK, THE FORKS: does each get picked up between
   its start and its end, or vanish and reappear at the finale?
4. Does Day 365 close anything never started, or leave anything unclosed?`,
  },
  {
    key: 'kreston',
    prompt: `SLICE: Kreston's arc after nineteen rewrites in one pass.

Nineteen infant blocks across April, May and June were rewritten in a single
sitting to remove the first-word thread. That is the risk: one writer,
nineteen sentences about the same child at the same age.

FILES: ${REPO}/months/04-apr-w18.md, 05-may-00-cover.md, 05-may-w19.md,
05-may-w20.md, 05-may-w21.md, 05-may-w22.md, 05-may-zz-backup.md,
06-jun-w23.md.

1. REPETITION. The replacements talk about babbling in strings, copying the
   tune of your voice, taking in more than he gives back, and answering when
   you leave a gap. Do any two land close enough together to read as the same
   sentence twice? Quote both with day numbers. THIS IS YOUR MAIN JOB.
2. ACCURACY: is every claim true of a ten to twelve month old?
3. THE BIRTHDAY. Day 156 in ${REPO}/months/06-jun-w23.md used to land his
   first word and no longer does. Read it now. Does the day still register as
   a real change, or did removing the word leave it flat?
4. Does anything contradict the ages: 10 months from Day 95, 11 from Day 125,
   one on Day 156, 13 from Day 186?`,
  },
  {
    key: 'reader-cold',
    prompt: `SLICE: run four days cold, the way Brooklyn will at 8:00 in the morning.

Do not read around them. Open each and try to run it with no context.

1. ${REPO}/months/00-front.md then Day 1 in ${REPO}/months/01-jan-w1.md. The
   front matter lost its personal opening. Does it still welcome her into the
   book, or does it now start mid-instruction?
2. Day 165 in ${REPO}/months/06-jun-w24.md, rebuilt from a swimming lesson
   into a pool day. Can you tell it used to be about something else?
3. Day 219 in ${REPO}/months/08-aug-w32.md and Day 271 in
   ${REPO}/months/09-sep-w39.md, where handprints were added to existing
   afternoons. Do the additions belong to the day or sit on top of it?

For each: is the day scannable in thirty seconds? Does it assume prep she was
never told to do, or knowledge she does not have at that moment?`,
  },
  {
    key: 'reader-shop',
    prompt: `SLICE: can she shop from the lists, and can she find things?

1. SHOPPING LISTS. The weeks that gained materials this session are 32
   (${REPO}/months/08-aug-w32.md), 36 and 39 (${REPO}/months/09-sep-w36.md,
   09-sep-w39.md), 41 (${REPO}/months/10-oct-w41.md) and 47
   (${REPO}/months/11-nov-w47.md). For each, list every material called for in
   that week's seven days and check it appears in that week's flat
   "This Week's Shopping List". Report anything called for and not listed, or
   listed and used by nothing.
2. FINDABILITY. From ${REPO}/months/00-front.md, trace the path to: a bad
   weather day, a sick day, and the Keepsake Tracker. Can she get there? The
   index is ${REPO}/months/99-back-01-index.md.
3. It is raining and she has ten minutes. Describe the actual path from the
   front matter to something usable, and say how many pages it takes.`,
  },
]

const audited = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `audit:${s.key}`, phase: 'Audit', effort: 'high' }),

  (res, s) => {
    if (!res) return { slice: s.key, died: true, findings: [], verified: [] }
    let o
    try { o = typeof res === 'string' ? JSON.parse(res.slice(res.indexOf('{'), res.lastIndexOf('}') + 1)) : res }
    catch { return { slice: s.key, unparsed: String(res).slice(0, 1500), findings: [], verified: [] } }
    const fs = (o.findings || []).filter(f => f.severity !== 'minor')
    if (!fs.length) return { slice: s.key, verdict: o.verdict, findings: o.findings || [], verified: [] }
    return parallel(fs.map(f => () =>
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
pass already fixed it, or the brief listed it as already done, or the fix
would break something else, or a reader running the day would never hit it.
Default to refuted when uncertain. A false finding that survives costs more
than a true one that dies, because this book is finished and every edit risks
the text around it.

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
log(`${rows.length - died.length}/${SLICES.length} slices returned, ${survivors.length} findings survived refutation`)

const verdict = await agent(
`Give the final pre-print verdict on this book.
${CONTEXT}

EIGHT AUDITORS EACH TOOK ONE SLICE. Every non-minor finding went to an
independent skeptic told to refute it. Here is what came back:

${rows.map(r =>
  `--- ${r.slice} ---\n` +
  (r.died ? 'AGENT DIED, slice not covered\n' :
   `verdict: ${r.verdict || '(none)'}\n` +
   `all findings: ${JSON.stringify((r.findings || []).map(f => ({ sev: f.severity, days: f.days, file: f.file, problem: (f.problem || '').slice(0, 260) })))}\n` +
   `survived refutation: ${JSON.stringify((r.verified || []).filter(v => v && !v.refuted).map(v => ({ days: v.days, file: v.file, problem: (v.problem || '').slice(0, 300), fix: (v.fix || '').slice(0, 240) })))}`)
).join('\n\n')}

${died.length ? `WARNING: these slices had no coverage: ${died.join(', ')}. Say so in the verdict.` : 'All eight slices returned.'}

YOUR JOB:
1. Merge duplicates across slices into single findings.
2. STRIKE anything that is taste, that an earlier pass fixed, that the brief
   listed as already done, or that argues for restoring the safety rule
   Joseph deleted. Say how many you struck and why.
3. Split what is left into MUST FIX BEFORE DESIGN and CAN SHIP WITHOUT. The
   bar for MUST FIX is: a reader running that day off the page hits a real
   problem. Be ruthless.
4. Answer Joseph's actual question, plainly and without hedging: CAN HE SEND
   THIS TO THE DESIGNER NOW? If yes, say yes. If no, say exactly what has to
   change first and nothing more.

RETURN JSON only:
{"readyForDesign":true|false,
"verdict":"an honest paragraph addressed to Joseph",
"struck":{"count":N,"why":"..."},
"mustFix":[{"days":[N],"file":"...","problem":"...","fix":"..."}],
"canShipWithout":[{"days":[N],"problem":"...","fix":"..."}]}`,
  { label: 'verdict', phase: 'Verdict', effort: 'high' })

return { verdict, rows }

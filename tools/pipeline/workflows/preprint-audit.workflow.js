export const meta = {
  name: 'preprint-audit',
  description: 'Final pre-print audit: did this session\'s removals leave seams, and are the threads whole?',
  phases: [
    { title: 'Audit', detail: 'five readers over what changed' },
    { title: 'Verify', detail: 'adversarially refute each finding' },
    { title: 'Verdict', detail: 'ready to send to design, or not' },
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
deterministic gates currently pass: 365 days, 1,167 unique activity titles, 413
unique insight headlines, 504 anchors with zero dead links, 60/60 backup
sections indexed, zero em dashes in prose, zero banned adverbs, and every day
holding 16 schedule rows with legal step and bullet counts.

YOU ARE NOT RE-AUDITING THE BOOK. You are auditing WHAT THIS SESSION CHANGED,
because the changes were mostly REMOVALS, and removal is what leaves seams.

WHAT WAS REMOVED OR REWRITTEN IN THIS SESSION:

1. ALL 52 WEEKLY "NOTES FROM JOSEPH" were deleted from the week openers, along
   with the personal opening in the front matter and the whole closing-note
   page (months/99-back-03-closing.md, now gone). Joseph wants no personal
   messages in the book at all.
2. THE FIRST-WORD THREAD was removed. Nineteen places across April, May and
   June had said Kreston's first word was coming, and Day 156 had landed it on
   his birthday. All nineteen were rewritten to say true things about an
   eleven-month-old that promise nothing.
3. THE TREE THREAD was removed. Day 107 had promised return visits to a chosen
   tree in July, September and December. The promise and its Tip were cut.
4. SWIMMING WAS RE-FRAMED. There are no lessons and never were; the family has
   a POOL MEMBERSHIP and goes when it suits. Forty-six "the weekly one"
   bullets were swept, Day 5's "first of fifty-two" was rewritten, and Day 165
   in months/06-jun-w24.md was rebuilt from a lesson day into a pool day.
5. A SAFETY RULE WAS DELETED AT JOSEPH'S INSTRUCTION: the rule that one adult
   may not supervise both children in water. Four instances were rewritten to
   keep arm's-reach supervision without requiring a second adult. This was
   Joseph's explicit decision. DO NOT re-argue it or recommend restoring it.
6. THREE MISSING HANDPRINTS were written (August Day 219, September Day 271,
   November Day 325) and a duplicate June sheet on Day 172 became a comparison
   against January's. There are now exactly twelve, one per calendar month:
   Days 1, 52, 60, 95, 129, 154, 187, 219, 271, 287, 325, 362.
7. THE GROWTH CHART was extended to all twelve months as an OPTION rather than
   a task: Days 1, 52, 78, 95, 129, 154, 172, 209, 219, 249, 287, 326, 354, 365.
8. DAY 92's April envelope, sealed OPEN DECEMBER 31, is now named and opened in
   Day 365. Day 326 now reaches one of the markers Day 209 gave for the bottle.
9. Day 361's insight lost a fabricated "Fire-safety researchers have said the
   same for decades" authority.

Be honest and rank honestly. This book is going to design. A long list of
nice-to-haves is worse than a short list of real defects. If your dimension is
clean, say so and report nothing.
`

const RETURN = `
RETURN JSON only:
{"dimension":"...","verdict":"one honest sentence","findings":[
{"severity":"critical|major|minor","days":[N],"file":"months/...",
"quote":"the exact text in the file","problem":"...","fix":"the specific change"}]}
`

phase('Audit')

const DIMS = [
  {
    key: 'seams',
    prompt: `DIMENSION: cut seams left by the removals.

Removing a sentence from the middle of a paragraph leaves damage that no
structural gate can see: a dangling pronoun with nothing to refer to, a "so"
or "and" joining two things that no longer connect, a paragraph that now makes
a point twice, a transition into a subject that was deleted.

Read the actual removal sites:
- The 52 week openers in ${REPO}/months/*w*.md, at the point where the note
  used to sit, between the shopping list and the "👶 Kreston is N months this
  week" line. Check the horizontal rules and blank lines are right and nothing
  reads as though something is missing.
- ${REPO}/months/00-front.md in full. It lost a personal opening and a line
  about a weekly note.
- The nineteen first-word sites across ${REPO}/months/04-apr-w18.md,
  05-may-00-cover.md, 05-may-w19.md, 05-may-w20.md, 05-may-w21.md,
  05-may-w22.md, 05-may-zz-backup.md and 06-jun-w23.md.
- Day 107's tree activity in ${REPO}/months/04-apr-w16.md.
- Day 172 in ${REPO}/months/06-jun-w25.md, where a handprint became a
  comparison and paint left the materials list.

For each, read the WHOLE surrounding block, not the changed line alone.`,
  },
  {
    key: 'orphans',
    prompt: `DIMENSION: orphaned references and broken promises.

When a thing is deleted, other pages may still point at it. Search the whole
book for pointers to things that no longer exist.

1. Any surviving reference to a note from Joseph, a letter from Joseph, a
   closing note, or "the note at the front of this week". The anchor #closing
   is gone with its file.
2. Any surviving reference to Kreston's first word as a coming or landed event,
   or to writing it down in the Keepsake Tracker. Note that Day 788-ish in
   November referring to Azlyn's own word for a taste is unrelated and fine.
3. Any surviving reference to returning to the April tree, or to a photograph
   of her arms round a trunk being taken more than once.
4. Any surviving reference to swimming as a booked, paid, enrolled or
   instructed lesson, or to a fixed number of sessions in the year. Other
   people's lessons closing the pool is realistic and stays.
5. MATERIALS ORPHANS at the changed sites only: an item in a Complete Materials
   List that no step now uses, or a step needing an item no longer listed.
   Check Day 172, Day 165, Day 187 and Day 107 specifically.
6. Does the front matter, any booklet cover, the Master Activity Index or the
   Keepsake Tracker still promise anything the days no longer deliver?`,
  },
  {
    key: 'threads',
    prompt: `DIMENSION: the year-long threads, end to end.

READ ${REPO}/months/01-jan-w1.md (Day 1 starts them), the finale in
${REPO}/months/12-dec-w53-finale.md (Day 365 closes them), and
${REPO}/months/99-back-02-keepsake.md (the tracker that records them).

THE THREADS: the time capsule (Day 1 to Day 365), the growth chart, the twelve
handprints, the forks, the same walk, the message bottle (Day 209 to Day 365),
and the April envelope (Day 92 to Day 365).

1. THE TWELVE HANDPRINTS. Verify all twelve exist at Days 1, 52, 60, 95, 129,
   154, 187, 219, 271, 287, 325, 362, that each is labeled with its calendar
   month, that each puts BOTH children on ONE sheet, and that each uses the
   fixed method from Day 1. Confirm there is exactly one per month and no
   thirteenth. Confirm Day 365 says twelve everywhere it gives a number.
2. THE GROWTH CHART. Verify a mark is available in every calendar month, and
   that the new ones read as an OPTION rather than a task. Check the tracker
   and the front matter describe it the same way the days do.
3. THE APRIL ENVELOPE. Day 92 seals it, Day 365 opens it. Check the questions
   asked on Day 92 line up with what Day 365 claims to compare.
4. THE BOTTLE. Day 209 seals it and names markers for the wait. Day 365 says
   "she asked about it again when the leaves came off". Verify the book now
   earns that claim.
5. Does Day 365 close anything never started, or leave anything unclosed?`,
  },
  {
    key: 'kreston',
    prompt: `DIMENSION: Kreston's developmental arc after nineteen rewrites.

Nineteen infant blocks across April, May and June were rewritten in one pass
to remove the first-word thread. That is the risk: one writer, one sitting,
replacing nineteen sentences about the same child at the same age.

FILES: ${REPO}/months/04-apr-w18.md, 05-may-00-cover.md, 05-may-w19.md,
05-may-w20.md, 05-may-w21.md, 05-may-w22.md, 05-may-zz-backup.md,
06-jun-w23.md. The blocks are "👶 Kreston is N months this week", "👶 Infant
Integration:" and "👶 Kreston's Afternoon:".

1. REPETITION. The replacements talk about babbling, copying intonation,
   understanding more than he says, and answering when you leave a gap. Do any
   two land close enough together to read as the same sentence twice? Quote
   both and give the day numbers.
2. ACCURACY. Is every claim true of a ten to twelve month old? Flag anything
   that overstates or understates.
3. THE BIRTHDAY. Day 156 is his first birthday and it used to land his first
   word. Read it now. Does it still feel like a real change, or did removing
   the word leave the day flat? This is the single most important question in
   your dimension.
4. CONTINUITY. Read the arc from Day 95 through Day 186 in order. Does it read
   as one child growing, or does it stall for six weeks?
5. Does anything now contradict the ages table: 10 months from Day 95, 11 from
   Day 125, one on Day 156, 13 from Day 186?`,
  },
  {
    key: 'reader',
    prompt: `DIMENSION: read it the way Brooklyn will, cold.

Do not read end to end. Read it the way it gets used, and report what fails her.

- Open ${REPO}/months/00-front.md cold, as somebody who has never seen the
  book. It has lost its personal opening. Does it still welcome her into the
  book, or does it now start mid-instruction?
- Open ${REPO}/months/01-jan-w1.md and run Day 1 with no context.
- Jump to Day 165 in ${REPO}/months/06-jun-w24.md, the day rebuilt from a
  swimming lesson into a pool day. Run it cold. Does it hold together, or can
  you tell it used to be about something else?
- Jump to Day 219 in ${REPO}/months/08-aug-w32.md and Day 271 in
  ${REPO}/months/09-sep-w39.md, where handprints were added to existing
  afternoons. Do the additions belong to the day, or sit on top of it?
- She wants to know what she needs for next week: check the week 32, 36, 39
  and 47 shopping lists actually cover the new materials.

1. At 8:00 in the morning, is a day still scannable in thirty seconds?
2. Does any week opener now feel truncated where the note used to be?
3. Is anything unfindable?
4. What would make her put the book down?`,
  },
]

const audited = await pipeline(
  DIMS,
  (d) => agent(`${CONTEXT}\n\n${d.prompt}\n\n${RETURN}`,
    { label: `audit:${d.key}`, phase: 'Audit', effort: 'high' }),

  // verify each dimension's findings as soon as that dimension lands
  (res, d) => {
    let o
    try { o = typeof res === 'string' ? JSON.parse(res.slice(res.indexOf('{'), res.lastIndexOf('}') + 1)) : res }
    catch { return { dimension: d.key, unparsed: res, findings: [] } }
    const fs = (o.findings || []).filter(f => f.severity !== 'minor')
    if (!fs.length) return { dimension: d.key, verdict: o.verdict, findings: o.findings || [], verified: [] }
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
is quoted out of context, or the problem is taste rather than a defect, or an
earlier pass already fixed it, or the brief told the auditor not to report it,
or the "fix" would break something else, or a reader running the day would
never hit it. Default to refuted when you are uncertain. A false finding that
survives costs more than a true one that dies, because this book is finished
and every edit risks the text around it.

RETURN JSON only:
{"refuted":true|false,"why":"one or two sentences","realSeverity":"critical|major|minor"}`,
        { label: `refute:${d.key}:${(f.days || ['?'])[0]}`, phase: 'Verify', effort: 'high' })
        .then(v => {
          let j
          try { j = typeof v === 'string' ? JSON.parse(v.slice(v.indexOf('{'), v.lastIndexOf('}') + 1)) : v }
          catch { j = { refuted: false, why: 'verifier returned unparsable output' } }
          return { ...f, refuted: j.refuted, why: j.why, realSeverity: j.realSeverity }
        })
    )).then(verified => ({ dimension: d.key, verdict: o.verdict, findings: o.findings || [], verified }))
  }
)

phase('Verdict')

const survivors = audited.flat().filter(Boolean).flatMap(r =>
  (r.verified || []).filter(v => v && !v.refuted))

log(`${survivors.length} findings survived refutation`)

const verdict = await agent(
`Give the final pre-print verdict on this book.
${CONTEXT}

FIVE AUDITORS EACH TOOK ONE DIMENSION. Every non-minor finding was then handed
to an independent skeptic told to refute it. Here is what came back:

${audited.flat().filter(Boolean).map(r =>
  `--- ${r.dimension} ---\nverdict: ${r.verdict || '(none)'}\n` +
  `all findings: ${JSON.stringify((r.findings || []).map(f => ({ sev: f.severity, days: f.days, problem: (f.problem || '').slice(0, 240) })))}\n` +
  `survived refutation: ${JSON.stringify((r.verified || []).filter(v => v && !v.refuted).map(v => ({ days: v.days, file: v.file, problem: (v.problem || '').slice(0, 300), fix: (v.fix || '').slice(0, 240), why: (v.why || '').slice(0, 200) })))}`
).join('\n\n')}

YOUR JOB:
1. Merge duplicates across dimensions into single findings.
2. STRIKE anything that is taste, that an earlier pass fixed, that the brief
   said not to report, or that argues for restoring the safety rule Joseph
   deleted. Say how many you struck and why.
3. Split what is left into MUST FIX BEFORE DESIGN and CAN SHIP WITHOUT.
   Be ruthless. This book has been through many audits. The bar for MUST FIX
   is: a reader running that day off the page hits a real problem.
4. Answer the actual question Joseph asked, plainly and without hedging:
   CAN HE SEND THIS TO THE DESIGNER NOW? If yes, say yes. If no, say exactly
   what has to change first and nothing more.

RETURN JSON only:
{"readyForDesign":true|false,
"verdict":"an honest paragraph addressed to Joseph",
"struck":{"count":N,"why":"..."},
"mustFix":[{"days":[N],"file":"...","problem":"...","fix":"..."}],
"canShipWithout":[{"days":[N],"problem":"...","fix":"..."}]}`,
  { label: 'verdict', phase: 'Verdict', effort: 'high' })

return { verdict, audited }

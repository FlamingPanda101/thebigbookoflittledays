export const meta = {
  name: 'lastcheck',
  description: 'Verify the final 33 residual fixes on their whole pages, the last read before the book ships',
  phases: [
    { title: 'Verify', detail: 'three readers over the ~30 touched days' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a print designer. Brooklyn runs each day off the page with Azlyn (three
until Day 353, four after) and Kreston (six months on Day 1, eighteen by
December).

THIS IS THE LAST READ. A full per-day pass measured 56% clean, repairs took it
to 79%, and four repair rounds have converged: 12 fixes with 10 knock-ons,
then 122 with 20, 66 with 5, 44 with 5. The final 33 residuals were just fixed
by hand. You are checking those 33 landed whole, and you are the last eyes
before this goes to the designer.

Read every day WHOLE. The one failure mode that has recurred all project: a
fix lands in one block while another block on the same page still says the old
thing, or the fix's own new sentence contradicts a step it did not read.

JOSEPH'S SETTLED DECISIONS, not defects: no personal messages from Joseph, no
swimming lessons (pool membership), no first-word thread, no tree thread, no
one-adult-per-child water rule (arm's-reach supervision replaced it; never ask
for a second adult), twelve handprints one per calendar month, growth chart
offered all twelve months, US English except "autumn" and the Plough.

HOUSE FORMAT: schedule rows match their headings character for character; Main
Event 4-6 steps, Second Main Event 5-7, Alternatives 3-4 bullets, Out Again
4-6, insight body 100-120 words, 16 rows; day materials on the week list.
Numbered steps and Prep Tonight lines legally run long; multi-line prose wraps
near 78.

Report only what a reader running the day would hit. If a page is clean, say
so. Do not re-argue fixes that are internally consistent.
`

const RETURN = `
RETURN JSON only, under 900 words:
{"slice":"...","daysRead":N,"daysClean":N,"issues":[
{"severity":"critical|major|minor","file":"months/...","day":N,
"problem":"quote both sides","fix":"the exact change"}]}
`

const SLICES = [
  {
    key: 'jan-may',
    prompt: `Read these days WHOLE in ${REPO}/months/ and check every block agrees:

  Day 1 (01-jan-w1.md): growth chart surface now named "door frame" in step 3,
    Kreston's Afternoon and the week opener alike.
  Day 13 (01-jan-w2.md): step 7 counting ends on the tray, no forward promise.
  Day 121 (04-apr-w18.md): butterflies clipped at the table, then taped above
    the window catch; Safety and the 4:15 row must both work with that order.
  Day 137 (05-may-w20.md): the floor-work drop now has its own kit in the
    Second Main Event materials, week list says "Elastic bands, 2", Safety says
    "a plastic bottle" with no phantom antecedent.
  Day 153 (05-may-w22.md): the card "came off the door this morning" agrees
    with Opening step 2.
  March backup (03-mar-zz-backup.md): the Bag paragraph rewrapped near 78.`,
  },
  {
    key: 'jun-sep',
    prompt: `Read these days WHOLE in ${REPO}/months/ and check every block agrees:

  Days 155 and 158 (06-jun-w23.md): the board hangs at her eye height in both
    step 7 and Safety; the disc arithmetic works (blank discs left vs taken).
  Day 184 (07-jul-w27.md): "out of Kreston's reach" named, no bare pronoun.
  Days 190, 207 (07-jul-w28/29.md): week 28 list now buys 2 corks and 2 jar
    lids; Safety blocks wrapped clean.
  Days 215, 217 (07-jul-w31.md): the camp bell (saucepan lid + wooden spoon)
    and the dustpan/broom are now on the week 31 list and nothing else on
    those pages disagrees.
  Days 226, 229, 237 (08-aug-w33/34.md): raw masa ball under an upturned bowl
    on the counter; week 34 buys 12 paper cups; blocks wrapped.
  Days 254, 269, 273 (09-sep-w37/39.md): holed apples go on the pile in both
    Get Outside and Safety; Safety blocks wrapped clean.`,
  },
  {
    key: 'oct-dec',
    prompt: `Read these days WHOLE in ${REPO}/months/ and check every block agrees:

  Day 290 (10-oct-w42.md): jar lids on the week 42 list; the coin rule said
    once, in Safety; Kreston's Afternoon wrapped clean with no duplicate line.
  Day 310 (11-nov-w45.md): the new salt poisoning line agrees with the day's
    steps about where the tray works and where Kreston is.
  Day 336 (11-nov-w48.md): pan to the fridge until six, warmed at six, four
    plates spelled out, insight active voice and still 100-120 words.
  Day 344 (12-dec-w50.md): Safety confines Kreston for the hot window; the
    infant block's pinecone is a high-chair job until the pan is in the sink;
    the Try it names the darning needle and the week 50 list carries it.
  November backup (11-nov-zz-backup.md): Bad Weather Day 1 has ONE lamp, noon
    stays small on purpose, the one o'clock tray carries what lunch left, and
    the day-opener no longer duplicates the Second Main Event opener. Sick Day
    2 posts socks, buttons up on the sofa.`,
  },
]

phase('Verify')

const out = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `last:${s.key}`, phase: 'Verify', effort: 'high' })
)

const rows = out.filter(Boolean).map(r => {
  try { return typeof r === 'string' ? JSON.parse(r.slice(r.indexOf('{'), r.lastIndexOf('}') + 1)) : r }
  catch { return { slice: 'unparsed', raw: String(r).slice(0, 600), issues: [] } }
})
const issues = rows.flatMap(r => r.issues || [])
log(`${issues.length} issues on the last read`)
return { clean: issues.length === 0, issues, rows }

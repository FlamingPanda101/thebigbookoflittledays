export const meta = {
  name: 'fix-verify',
  description: 'Adversarial check that all 26 fixes landed correctly and broke nothing around them',
  phases: [
    { title: 'Verify', detail: 'six slices, each re-reading the whole day it touched' },
    { title: 'Verdict', detail: 'ship or do not ship' },
  ],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

const CONTEXT = `
THE BOOK: "The Big Book of Little Days (2027)", a 365-day activity book going
to a designer for print layout. Brooklyn reads it at 8:00 in the morning and
runs the day off the page with Azlyn (three, four from Day 354) and Kreston
(six months on Day 1, eighteen by December).

A FOURTEEN-SLICE AUDIT FOUND DEFECTS AND THEY HAVE ALL BEEN FIXED. Your job is
to check the fixes in the files. You are the last read before this goes out.

A FIX "APPLIED" IN A REPORT BUT ABSENT FROM THE FILE IS A CRITICAL FINDING.
So is a fix that landed but broke the text around it, contradicted another
page, or introduced a new hazard.

JOSEPH'S SETTLED DECISIONS. Do not re-argue these or report their absence:
- No personal messages from Joseph anywhere in the book.
- No swimming lessons; the family has a pool membership.
- No first-word thread, no tree thread.
- No one-adult-per-child water rule. Arm's-reach supervision replaced it.
  NEVER recommend restoring it.
- Twelve handprints, one per calendar month, both children on one sheet.
- The growth chart is offered in all twelve months as an option.
- US English, except "autumn", and except proper names like the Plough.
- House style: no em dashes in prose, no adverbs (really, just, literally,
  genuinely, honestly, simply, actually, deeply, truly, fundamentally), no
  binary contrasts, no passive voice, no Wh- sentence openers, prose wrapped
  near 78 columns.

ALL DETERMINISTIC GATES PASS: 365 days, correct dates, 16 schedule rows per
day, every row matching its heading exactly, insight word bands, 1,533 unique
titles, 504 anchors and zero dead links, Out Again totals of Swimming 52,
Library 26, Museum 12. Do not re-check any of that.

For each item: READ THE WHOLE DAY, not the changed line. Confirm the fix is
present, correct, and did not damage its surroundings.
`

const RETURN = `
RETURN JSON only, under 1200 words:
{"slice":"...","allLanded":true|false,"items":[
{"id":"...","landed":true|false,"correct":true|false,"note":"one sentence"}],
"issues":[{"severity":"critical|major|minor","file":"months/...","days":[N],
"problem":"...","fix":"..."}]}
`

const SLICES = [
  {
    key: 'safety-a',
    prompt: `VERIFY these safety fixes. Read each day in full.

1. ${REPO}/months/06-jun-w23.md Day 156. Step 3 should now lift the candle out
   of the cake and put it up high before step 4 lets a one-year-old put his
   face in. Check step 3 reads correctly, that step 4 still makes sense after
   it, and that the Safety block does not now repeat the same instruction.
2. ${REPO}/months/03-mar-w11.md Day 71. The infant block should hand him a
   grass stem or bare twig, not a daffodil leaf. Check nothing else on the day
   still puts daffodil foliage in a nine-month-old's hands, and that the new
   sentence reads like the rest of the block.
3. ${REPO}/months/04-apr-w17.md Day 113. The muslin should stay in the adult's
   hands. Confirm the block no longer has him covering his own face and that
   it agrees with the Safety block on the same page.
4. ${REPO}/months/01-jan-w1.md Day 4. The materials list should offer a door
   frame only, no curtain rail bracket and no broom handle. Check the week 1
   shopping list no longer carries the broom handle either, and that no step
   now calls for a fitting the materials list does not have.`,
  },
  {
    key: 'safety-b',
    prompt: `VERIFY these safety fixes. Read each day in full.

1. ${REPO}/months/10-oct-w40.md Day 280. The card line should run between the
   front legs of two dining chairs at her knee height, and the Safety block
   should match. Confirm step 6 and step 7 still work with a low line, and
   that nothing else on the day assumes a high one.
2. ${REPO}/months/12-dec-w50.md Days 345 and 347. The nut choking warning
   should have moved off Day 345, which has no nuts, onto Day 347, which hands
   a four-year-old ten unshelled nuts at ground level. Confirm Day 345's
   Safety block still reads as a whole after the sentence came out, and that
   Day 347's still covers the stairs hazard it carried before.
3. ${REPO}/months/10-oct-w43.md Days 298, 299 and 295. Day 298 should now
   cover the buttons, Day 299 the bottle caps, and Day 295's Safety block
   should no longer say minibeasts go in her hands and then that she lifts
   nothing with bare fingers. Check all three blocks read cleanly and stay
   inside the day's normal length.
4. ${REPO}/months/10-oct-w41.md Day 284 and ${REPO}/months/10-oct-w42.md Day
   291. The rope should be allowed in her hand, and the markers should be
   allowed in her hand, because the steps require both. Confirm the Safety
   blocks now agree with their own steps.`,
  },
  {
    key: 'safety-c',
    prompt: `VERIFY these safety fixes. Read each day in full.

1. ${REPO}/months/08-aug-w34.md Day 238. The water line should be first in the
   Safety block and unconditional, not dependent on visitors arriving. Confirm
   the rest of the block survived the edit and still covers the dried rice and
   pasta.
2. ${REPO}/months/09-sep-w38.md Day 266. The Safety block should now name ivy,
   Virginia creeper and the bramble thorns. Confirm it agrees with the Get
   Outside block and the infant block on the same day, and that the infant
   block no longer predicts him chewing what the safety line forbids.
3. ${REPO}/months/07-jul-w29.md Day 203. The spitting target should be on a
   tray. Confirm the numbered steps and the Safety block now agree about where
   the seeds land.
4. ${REPO}/months/08-aug-zz-backup.md, August Bad Weather Day 1. The 5:00 row
   should no longer schedule a bath during the storm, and the schedule row and
   its section heading must name the same activity character for character.
   Confirm the safety box about waiting for the thunder still makes sense
   beside the new row, and that the wind-down section body matches its new
   name rather than still describing a bath.`,
  },
  {
    key: 'ivy',
    prompt: `VERIFY the ivy ruling is now consistent across the whole book.

Day 307 rules: "Ivy and holly are both poisonous, and Kreston still puts
leaves in his mouth at 16 months, so those two travel home in your pocket."

Days 324 (${REPO}/months/11-nov-w47.md) and 364
(${REPO}/months/12-dec-w52.md) previously had the children collecting and
handling ivy. Both were changed to pine, spruce and cedar.

1. Grep the whole of ${REPO}/months for "ivy" and "Ivy" and read every hit in
   context. Report any place a child still collects, cuts, carries or handles
   it. Ivy growing on a wall that nobody touches is fine.
2. On Days 324 and 364, confirm the materials lists, the Get Outside blocks,
   the steps, the Tips and the Safety blocks all now agree. A Tip still naming
   ivy stems after the materials dropped them is a real defect.
3. Confirm the substitutions read naturally and that nothing now asks for a
   plant the materials list does not carry.
4. Check the same for holly and yew while you are in there, and report any
   other plant the book rules on twice in opposite directions.`,
  },
  {
    key: 'facts',
    prompt: `VERIFY the factual corrections, and check the new claims are true.

1. ${REPO}/months/06-jun-w25.md, the Around the World sidebar. It should no
   longer file South Africa's Freedom Day under the end of slavery, and should
   no longer say the Galveston news travelled slowly. VERIFY THE NEW TEXT IS
   ITSELF CORRECT: Juneteenth, the arrival of Union troops in Galveston in
   June 1865, Emancipation Day in Trinidad and Jamaica on August 1, and
   Freedom Day on April 27 marking South Africa's first universal election.
2. ${REPO}/months/04-apr-w18.md. Week 18's sidebar was rewritten from insect
   eating to insects that growers buy, because week 43
   (${REPO}/months/10-oct-w43.md) already had the eating one. CHECK EVERY NEW
   CLAIM: ladybugs sold to growers in France and California, Dutch tomato
   growers buying bumblebee colonies for greenhouses, and American beekeepers
   trucking hives to the California almond orchards. Flag anything overstated.
   Also confirm the new sidebar fits week 18's own theme, Bugs and Blooms, and
   that its "Try it" and "Did you know" still make sense beside the new text.
3. ${REPO}/months/06-jun-w24.md should say about a quarter of the Netherlands
   sits below sea level. Confirm the figure and that the sentence still reads.
4. ${REPO}/months/08-aug-w33.md should no longer claim the British monarch is
   the only person on earth who travels without a passport. Confirm the new
   claim about Japan's Emperor and Empress is accurate and not overstated.
5. Read the other 50 Around the World sidebars quickly for any claim as wrong
   as the two that were just corrected. Report only clear factual errors.`,
  },
  {
    key: 'structure',
    prompt: `VERIFY the structural fixes and check nothing broke around them.

1. ${REPO}/months/04-apr-zz-backup.md. Two "### 👶 Kreston's Afternoon"
   headings were converted to "> 👶 **Kreston's Afternoon:**" blockquote
   callouts. Confirm both converted cleanly, every line of both paragraphs
   carries the "> " prefix, no blank line was swallowed, and the surrounding
   sections still parse. Compare against jan-weather-1 in
   ${REPO}/months/01-jan-zz-backup.md, which is the correct pattern.
2. ALL TWELVE ${REPO}/months/*zz-backup.md files. Extras and section headings
   were unbolded so the twelve parallel pages match. Confirm no heading lost
   its emoji or its text, and that the twelve now agree.
3. ${REPO}/months/11-nov-w48.md Day 335. The week shopping list should now
   offer adhesive pads as an alternative to screws, matching what the day
   itself allows. Confirm the list and the day agree.
4. ${REPO}/months/00-front.md and ${REPO}/months/99-back-02-keepsake.md. The
   forks thread was reworded, because the 4:00 job actually varies across 194
   distinct jobs with forks on 145 days. Confirm both pages now describe what
   the book does and agree with each other.
5. Spot-check ten days spread across the year for wrap width near 78 columns,
   no stray blockquote prefixes, and no paragraph left half-reflowed by an
   edit.`,
  },
]

phase('Verify')

const out = await pipeline(
  SLICES,
  (s) => agent(`${CONTEXT}\n\n${s.prompt}\n\n${RETURN}`,
    { label: `verify:${s.key}`, phase: 'Verify', effort: 'high' })
)

phase('Verdict')

const verdict = await agent(
`Final call on whether this book goes to the designer.
${CONTEXT}

Six verifiers each re-read the days that were changed:

${out.map((r, i) => `--- ${SLICES[i].key} ---\n${typeof r === 'string' ? r.slice(0, 6000) : JSON.stringify(r).slice(0, 6000)}`).join('\n\n')}

YOUR JOB:
1. List anything that did not land, landed wrong, or broke its surroundings.
2. Strike anything that is taste or that argues against a settled decision.
3. Answer plainly: DOES THIS GO TO THE DESIGNER NOW? If yes, say yes without
   hedging. If no, name exactly what is left and nothing more.

RETURN JSON only:
{"readyForDesign":true|false,"verdict":"a short honest paragraph for Joseph",
"remaining":[{"file":"...","days":[N],"problem":"...","fix":"..."}]}`,
  { label: 'verdict', phase: 'Verdict', effort: 'high' })

return { verdict, out }

export const meta = {
  name: 'stop-slop-sweep-fixes',
  description: 'Apply the cross-block repetition and voice findings, then re-verify each block',
  phases: [
    { title: 'Fix', detail: 'apply cross-block findings per day' },
    { title: 'Recheck', detail: 'confirm frozen lines and no new damage' },
  ],
}

const SP = 'C:\\Users\\Josep\\AppData\\Local\\Temp\\claude\\C--Users-Josep--claude\\f2051431-8954-4594-9860-3b743569602a\\scratchpad'
const IN = SP + '\\blocks'
const OUT = SP + '\\rewritten'

const FROZEN = `
FROZEN LINES. Reproduce byte-identical, emoji included. A validator and
tools/titles.tsv depend on them:
- <a id="..."></a> anchors
- the "## ... Day N: ... " header, the "**... Weekday, Month D, 2027**" date
  line, the "**Theme:** ..." line
- EVERY line starting with ### (section headings, including the activity names
  after the colon)
- the insight HEADLINE, the "> **...**" line right after the
  "> ... A Little Parenting Insight" line. Rewrite insight BODY only.
- every At-a-Glance Schedule row (the "- **8:00-9:00 AM** - ..." lines). Their
  em dashes are table formatting from the build spec. Leave them.
- <div style="page-break-after: always;"></div>

ALSO UNCHANGEABLE:
- every material and quantity; the number of numbered steps and their order
- every Afternoon Alternative and Out Again bullet, same count
- all times, ages, dates, weekdays, measurements, Kreston's month-age
- safety absolutes ("never leave him alone") stay intact and stay strong

STYLE: no em dashes in prose, no adverbs, no binary contrasts ("not X, it's
Y"), no negative listing, no dramatic fragments, no rhetorical setups, no
passive voice, no false agency, no Wh- sentence openers, no narrator-from-a-
distance. Vary sentence length. Warm, practical, direct, written to a
competent adult.

FORMAT: prose wraps near 78 columns; numbered steps and bullets stay on one
line each. LF endings, no trailing whitespace, final line unchanged.
Stay within 5% of the file's current word count.
`

const FIXES = {
  day2: [
    `REPETITION (cross-block finding 4): Every Second Main Event in Days 1-5 opens with the same two-beat morning/afternoon contrast. Day 1 and Day 4 keep theirs. THIS BLOCK MUST LOSE IT. The current opener is a morning-versus-afternoon sentence pair before "**🧰 Complete Materials List:**". Rewrite that lead-in so it opens on the activity itself rather than on a comparison with the morning. Suggested direction: "She moves somebody in this afternoon. Ask what a house needs and take the list at face value." Keep it to the same length, one or two sentences.`,
  ],
  day3: [
    `REPETITION (finding 4): the Second Main Event lead-in uses the same morning/afternoon contrast as Days 1, 2, 4 and 5. Rewrite it to open on the bridge itself, not on a comparison with the morning. One or two sentences, same length.`,
    `REPETITION (finding 6): the Second Main Event Tip tells Brooklyn to count to five before helping. Day 6's entire parenting insight is "The pause before you help", and Day 6 also says it twice. Delivering the payoff here, four days early, makes Day 6 land as a repeat. CUT the counting from this Tip and give it a different job. Suggested: "She will look at you the second the card sags. Look back at the bridge instead of at her, and she usually starts again on her own."`,
    `SLOP (finding 10): a stock closing move survives here, a plain instruction followed by a short verdict clause telling Brooklyn what the point is. Find any "..., and that is the point" / "which is the whole lesson" / "so let it run" style tail in this block and cut the verdict, letting the instruction stand alone. Brooklyn can see the significance herself.`,
  ],
  day4: [
    `SLOP (finding 10): Main Event step 6 currently ends "Nothing in this room stays up forever, and that is the point." Cut the verdict clause. The step should read: "Now take down the ball run together and add its tubes to the pile." Check the rest of the block for the same tail construction and cut those too.`,
    `REPETITION + INVENTED PROP (finding 12): Kreston's Infant Integration paragraph ends with a line about him running "the same experiment Azlyn is running with three towers and a clipboard". Day 1 already closes Kreston's paragraph with the same construction ("running the same investigation Azlyn is running with the tower"), and there is no clipboard anywhere in this day, only "Paper and a marker for recording", so Brooklyn hunts for equipment she was never asked to have. Rewrite the ending as: "He will do it again and again without tiring of it. Keep his cups separate from hers so nothing chewed goes back in the build box." Do not lose the existing instruction about building him a two-cup tower within arm's reach.`,
  ],
  day5: [
    `REPETITION (finding 4): the Second Main Event lead-in uses the same morning/afternoon contrast as Days 1-4. Rewrite it to open on the wall itself. One or two sentences, same length.`,
    `SLOP (finding 10): two verdict-clause tails survive in this block, for example the Opening Activity's "The squashing is the point of the hour, so let it run" and the Second Main Event lead-in's "which is the whole lesson of the week in one move". Cut the verdict and let the instruction stand: "Give her a fist-sized lump and let her squash it for a few minutes before anything useful happens." Sweep the block for others.`,
  ],
  day6: [
    `REPETITION (finding 6): "count to five" now appears twice in this block, in Main Event step 1 and again in the parenting insight. Keep it ONCE, in the insight, where the headline "The pause before you help" makes it the payoff. Trim step 1 so it still tells Brooklyn to wait without repeating the count. Day 3's Tip is being changed separately so it no longer pre-empts this.`,
    `VOICE (finding 11): the Infant Integration paragraph is colder and more graphic than the other six days. It currently reads "Loose lolly sticks splinter, and they fit down his throat, so give him only a taped structure too big for his mouth, and take it back when you stop watching." The other six Infant Integrations are warm observations about what Kreston is doing. MOVE the hazard into the block's existing ⚠️ Safety section (which already covers loose lolly sticks: strengthen it there, do not weaken the warning or lose it) and rewrite this paragraph warm, in the register of the rest of the week. Suggested direction: keep the existing instruction to lay the taped triangle tower on its side within his reach and let him post his fingers through the gaps, then add what he is learning, that a shape has an inside. THE HAZARD MUST STILL APPEAR SOMEWHERE IN THE BLOCK, in Safety.`,
  ],
  day7: [
    `REPETITION (finding 4): the Second Main Event lead-in runs the same contrast at week scale ("She built everything else this week and then took it down..."). Rewrite it to open on living in the fort itself. One or two sentences, same length.`,
    `REPETITION (finding 7): Kreston's Afternoon ends "He will chew it more than look at it, which is what a book is for at his age." Day 6 closes Kreston's Afternoon with the same observation, the same joke and the same "which is what X is for" clause. On consecutive pages it reads as copy-paste. Day 6 keeps its version. Rewrite this ending: "Back home, put him in the fort doorway with one board book while Azlyn reads inside. He will hold it upside down and be pleased with it." Keep the preceding carrier/supermarket content intact.`,
  ],
}

const KEYS = Object.keys(FIXES)

phase('Fix')

const out = await pipeline(
  KEYS,

  (k) => agent(
`Apply targeted fixes to one block of a printed activity book.

The book: "The Big Book of Little Days (2027)", a 365-day activity book a dad
wrote for Brooklyn to use with Azlyn (3) and Kreston (a baby). Warm,
practical, direct, written to a competent adult at 8am.

FILE TO EDIT IN PLACE: ${OUT}\\${k}.md
ORIGINAL FOR REFERENCE (pre-rewrite): ${IN}\\${k}.md

A cross-block reviewer read all nine blocks together and found problems that
only show up when you read the week end to end. Fix these in this block:

${FIXES[k].map((f, i) => `${i + 1}. ${f}`).join('\n\n')}

${FROZEN}

Read the file first. Make only these changes plus anything needed to keep the
prose reading smoothly around them. Do not restyle the rest of the block.

RETURN one line per fix describing what you changed, then the old and new word
count.`,
    { label: `fix:${k}`, phase: 'Fix' }
  ),

  (rep, k) => agent(
`Verify one repaired block of a printed activity book. Be skeptical.

CURRENT:  ${OUT}\\${k}.md
PRE-REWRITE ORIGINAL: ${IN}\\${k}.md

Another agent applied targeted fixes. Confirm:

1. FROZEN LINES byte-identical to the original: anchors, the day header, the
   date line, the theme line, every line starting with ###, the insight
   headline (the "> **...**" line after the brain-emoji line), every
   At-a-Glance Schedule row, the page-break divs. Emoji count as characters.
2. NOTHING LOST: same number of numbered steps in the same order, same
   materials and quantities, same count of Afternoon Alternatives and Out
   Again bullets, same times/ages/dates/weekdays.
3. SAFETY INTACT AND STRONG. For day6 specifically: the lolly-stick hazard
   (splinter and choking risk, taped structure only, take it back when you
   stop watching) MUST still appear in the block, in the Safety section. If it
   vanished entirely, that is CRITICAL.
4. NO NEW SLOP: em dashes in prose, adverbs, binary contrasts, dramatic
   fragments, passive voice, false agency, Wh- openers.
5. The fixes were applied and did not introduce a fresh repetition.

RETURN JSON only:
{"ok":true|false,"issues":[{"severity":"critical|major|minor","line":"exact text","problem":"...","fix":"..."}],"words":N}`,
    { label: `recheck:${k}`, phase: 'Recheck', effort: 'high' }
  )
)

return out

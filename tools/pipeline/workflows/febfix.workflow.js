export const meta = {
  name: 'february-repairs',
  description: 'Fix the trim-recheck findings in weeks 6, 7 and 8, then re-verify',
  phases: [
    { title: 'Fix', detail: 'apply the recheck findings per week' },
    { title: 'Recheck', detail: 'confirm the fixes and that nothing new broke' },
  ],
}

const SP = 'C:\\Users\\Josep\\AppData\\Local\\Temp\\claude\\C--Users-Josep--claude\\f2051431-8954-4594-9860-3b743569602a\\scratchpad'
const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const OUT = SP + '\\newweeks'
const pad = (n) => String(n).padStart(2, '0')

const FIXES = {
  6: [
    `Day 41, ⚠️ Safety: the choking line names the hazard without saying what to do about it, unlike every other Safety block in the week. Add one clause of mitigation. Suggested: "Seeds, crusts and torn bagel are all choking-sized for him at 8 months, so his plate is soft white with the crust off and nothing else." Keep both hazards (infant botulism from honey, and choking).`,
    `Day 42, insight body: "Take one line off the Afternoon Alternatives instead" is ambiguous after the trim. It reads as removing something rather than choosing one. Rewrite as "Do one thing off the Afternoon Alternatives instead, or none of it, and put a film on."`,
    `Day 40, Second Main Event step 7: says the leftover butter "goes in the fridge for Thursday", but Day 41 (Wednesday) eats it as "yesterday's butter" and Day 42 (Thursday) starts from fresh butter. Change to "What is left goes in the fridge for tomorrow."`,
    `Day 36, 🌙 Prep Tonight: a verifier flagged the 100 g of butter as being stood out a day early. CHECK THIS BEFORE CHANGING ANYTHING. Prep Tonight printed on Day N is done on the evening of Day N and serves Day N+1, which is how week 1 works (Day 4 mixes the salt dough that Day 5 uses). If Day 36's butter is used on Day 37, it is already correct and you should leave it alone and say so. Only fix it if the butter is in fact used on Day 38 or later.`,
    `Days 37, 38, 40, 41, 42: several blockquote paragraphs carry ragged short lines where a mid-paragraph deletion was never re-wrapped (Day 37 Infant Integration and Kreston's Afternoon; the Day 37, 38, 41 and 42 insights; the Day 40 Safety block). The prose reads fine; only the source wrapping is uneven. Re-wrap those paragraphs to the file's ~78 character width. Change no words while doing it.`,
  ],
  7: [
    `MAJOR. Day 43, 🌳 Out Again: only 3 bullets. The spec is 4-6 and every other day in the week has 4 or 5. The trim cut an option from the week's longest day. Restore a fourth in the same register as the others. Day 43 has roughly 70 words of headroom under the 1,300 first-day ceiling.`,
    `Day 43, 🌳 Get Outside: 47 words against 60-75 elsewhere in the week, and the closing clause "so deliver before you walk" is compressed to the point of self-contradiction, since delivering IS the walk. Expand to about 65 words and unpack it. Suggested ending: "February wind pulls the heat out of bread in about ten minutes, so knock on both doors first and do the rest of the walk afterwards."`,
    `Day 44, insight body: carries a binary contrast plus a clipped tail. "She is doing a Danish thing rather than learning about Denmark, and doing beats being told at this age by a distance." The X-rather-than-Y then A-beats-B pairing is the slop pattern, and "by a distance" lands awkwardly. Collapse to one clause: "She is doing a Danish thing, not learning about Denmark, and at three that is the version that sticks."`,
    `Day 47, insight body: passive voice in "not one bite was required of her". Replace with "nobody asked her to taste any of it".`,
  ],
  8: [
    `Day 53, 🎨 The Main Event "Painting on the Cave Wall": 7 numbered steps, but the spec band is 4-6 and every other Main Event in the book runs 6. Steps 1 and 2 are both setup. Merge them into one setup step so the day lands on 6, losing no content. Keep the paint recipe (cocoa and water, paprika or turmeric and water, black poster paint from the pot), the out-of-reach mixing, the old T-shirt, and working on the floor.`,
    `Day 54, 🎨 Second Main Event "One Necklace Each": 6 numbered steps where the house pattern for a Second Main Event is 7, and step 2 now carries cutting, taping, anchoring and knotting in one 47-word instruction against a 15-25 word norm. Split the knot back out into its own step after the threading step. Nothing was lost, the step is just overloaded.`,
    `Day 53, 🌳 Get Outside "Digging for Colour": reads clipped at "February ground gives under the blade." The clause explaining WHY February ground is workable was cut. Restore it: "February ground is wet all the way through, so it gives under the blade." This section is 106 words, the shortest Get Outside in the week, and the day has room.`,
    `Day 55, insight body: 98 words, under the 100-120 band, and the only insight in the week below 100. Extend the closing sentence. Suggested: "Give her both this afternoon, and make sure she is standing there when at least one door opens." Day 55 is at 1,016 prose words so there is headroom.`,
  ],
}

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn (3) and Kreston (8 months in February). She reads it at 8:00
in the morning holding the baby. Warm, practical, direct, written to a
competent adult.

REFERENCE for register and format: ${REPO}\\months\\01-jan-w1.md

NEVER CHANGE: anchors; day headers; date lines; theme lines; any line starting
with ###, including the activity name after the colon; the insight HEADLINE
(the "> **...**" line after the brain-emoji line); the 16 schedule rows; the
page-break divs.

NEVER LOSE: a material or quantity; an Afternoon Alternative or Out Again
bullet; a Safety block or any hazard in one; a time, age, date or weekday;
Kreston's stated age in months.

LENGTH: each day must stay inside 1,000-1,150 prose words, excluding the ~155
word schedule block. The week's FIRST day may reach 1,300 because it carries
the Around the World sidebar. If a fix adds words, check the day is still in
band and take the words back out of something flabby if it is not.

STYLE: no em dashes in prose (schedule rows are table formatting and stay), no
adverbs (really, just, literally, genuinely, honestly, simply, actually,
deeply, truly, fundamentally), no binary contrasts ("not X, it's Y"), no
negative listing, no dramatic fragments, no rhetorical setups, no passive
voice, no false agency, no Wh- sentence openers, no narrator-from-a-distance.
Vary sentence length. Safety absolutes stay and stay strong.

Prose wraps near 78 columns. Numbered steps and bullets stay on one line each.
LF endings, no trailing whitespace.
`

phase('Fix')

const out = await pipeline(
  [6, 7, 8],

  (wk) => agent(
`Repair one week of a printed activity book. ${RULES}

FILE TO EDIT IN PLACE: ${OUT}\\wk${pad(wk)}-days.md

A verifier reviewed this week after a tightening pass and found the following.
Work through them in order:

${FIXES[wk].map((f, i) => `${i + 1}. ${f}`).join('\n\n')}

Read the file first. Make these changes and nothing else. Do not restyle
untouched sections. Do not leave notes or commentary in the file.

RETURN one line per item saying what you changed, or why you left it alone.`,
    { label: `fix:wk${pad(wk)}`, phase: 'Fix' }
  ),

  (rep, wk) => agent(
`Verify a repaired week of a printed activity book. Be skeptical. ${RULES}

FILE: ${OUT}\\wk${pad(wk)}-days.md

Check all seven days:

1. Every fix listed below was applied, or was correctly declined with a stated
   reason:
${FIXES[wk].map((f, i) => `   ${i + 1}. ${f.slice(0, 150)}...`).join('\n')}

2. STEP COUNTS: every Main Event has 4-6 numbered steps, every Second Main
   Event has 5-7. Report any that do not.
3. BULLET COUNTS: every day has 3-4 Afternoon Alternatives and 4-6 Out Again
   bullets. Report any that do not.
4. LENGTH: prose words per day, excluding the ~155 word schedule block. Must
   be 1,000-1,150, or up to 1,300 for the week's first day. Give the number.
5. INSIGHT BODIES: 100-120 words each. Give any that fall outside.
6. FROZEN LINES intact: anchors, day headers, date lines, theme lines, every
   ### heading, insight headlines, all 16 schedule rows per day, page-break
   divs.
7. NO NEW SLOP or new cut-seam damage: a sentence missing its subject or
   object, a broken verb agreement, a pronoun or "where"/"which" with nothing
   to refer to, a clause stopping mid-thought.
8. SAFETY blocks: still present where they were, hazards intact, and each
   hazard paired with what to do about it.

RETURN JSON only:
{"ok":true|false,"days":[{"day":N,"prose":N,"mainSteps":N,"secondSteps":N,"insightWords":N}],
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `recheck:wk${pad(wk)}`, phase: 'Recheck', effort: 'high' }
  )
)

return out

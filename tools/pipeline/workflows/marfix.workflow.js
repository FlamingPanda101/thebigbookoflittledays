export const meta = {
  name: 'march-repairs',
  description: 'Fix the March defects found by the day-trim rechecks and the extended gate',
  phases: [
    { title: 'Fix', detail: 'apply per-week findings' },
    { title: 'Recheck', detail: 'confirm and look for new damage' },
  ],
}

const SP = 'C:\\Users\\Josep\\AppData\\Local\\Temp\\claude\\C--Users-Josep--claude\\f2051431-8954-4594-9860-3b743569602a\\scratchpad'
const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const OUT = SP + '\\newweeks'
const pad = (n) => String(n).padStart(2, '0')

const FIXES = {
  10: [
    `MAJOR, Day 66, 🎨 Second Main Event "Clown Shoes": step 6 calls for "one step up onto a book" and the ⚠️ Safety block refers back to it as "the step up onto the book", but no book is in the Complete Materials List. Day 65 lists "1 paperback book" as a material, so the book treats this as a listed item. Add "- 1 sturdy hardback book, for the step up" to the materials list. Do not alter the step or the Safety block.`,
    `Day 66, 🎨 Second Main Event: step 5 calls for "her hand on a chair back for the stand-up" and no chair is listed. Day 67 lists "A chair back to hold at the start" as a material. Add "- A chair back to hold for the stand-up" to the materials list.`,
    `Day 66, 🌙 Prep Tonight: says "stand two empty shoeboxes by the door", but the day needs three. The Sound Effects Desk uses 1 shoebox and the Clown Shoes use 2. Change "two empty shoeboxes" to "three empty shoeboxes".`,
    `Day 66, 🎨 Second Main Event: the trim left this section telegraphic against the register of the rest of the week. The lead-in is a single 14-word sentence where every other day carries two sentences of about 25-30 words, and steps 4, 6 and 7 have gone clipped: "She paints or papers them. Big, bright and uneven." / "Walk. Then a hand in yours..." / "Cardigan, belt, mirror." A one-word "Walk." is the dramatic-fragment pattern the style rules ban. Restore a second sentence to the lead-in and unclip those steps into complete sentences. Day 66 is at 1,053 prose words against a 1,150 ceiling, so there is room. Keep the step count at 7.`,
    `HARD FAILURE, Days 67 and 69: 🌳 Out Again has only 3 bullets each. The spec is 4-6 and every other day in the book carries 4 or 5. These days were NOT trimmed, so this is a writing defect, not trim damage. Add a fourth bullet to each, in the same register as the existing ones and matching the day's real weekday and season (Day 67 is Monday 8 March, Day 69 is Wednesday 10 March, early spring). Keep each day inside its word band.`,
  ],
  11: [
    `MAJOR, Day 73, 🎨 The Main Event: "String cut into short pieces, nothing longer than a hand" is in the materials list, is cut in Prep Tonight, and is named twice more (Infant Integration "The string stays out of his reach", ⚠️ Safety "The cut string and the twigs go out of reach"), but NO numbered step ever uses it. The step that used it looks to have been cut. Put the string back into the build, for example in step 3: "Dry grass next, wound the same direction, with the short string pieces worked in where the gaps are widest." Keep the step count at 6.`,
    `MAJOR, Day 75, 🎨 The Main Event "Freeing What's Frozen": step 4 says "stand it on a saucer on the windowsill" and no saucer is in the Complete Materials List. Add "- 1 saucer" after the deep tray line.`,
    `MAJOR SAFETY, Day 75: the ⚠️ Safety block says the ice block "never goes against her face", but Main Event step 1 hands it to her with "Hands, breath, licking, banging". A tongue on a large ice block is the specific hazard the Safety line exists to prevent, and the step invites it. Change step 1's list to "Hands, breath, banging." so the step and the safety absolute agree. Do not weaken the Safety block.`,
    `Day 75, 🎨 Second Main Event: "String" is in the materials list but no step uses it. Step 7 hangs the chain with tape ("Tape it up high across the room"). Either drop String from the list or return it to step 7 as "Thread string through the end loops and tape it up high across the room." Prefer returning it, since the chain hangs better on string.`,
    `Day 75, 🎨 Second Main Event lead-in: elliptical after the cut. "Swimming is at 2:30 and there is nothing left for a project with steps." The noun has gone. Rewrite as "Swimming is at 2:30, so there is no afternoon left for a project with steps."`,
    `Day 75, insight body: opens a sentence with a Wh- word, against the style rules. "Whoever wrote the plan had not been up twice in the night." Rewrite as "Nobody who wrote the plan had been up twice in the night." Keep the body inside 100-120 words.`,
    `Day 73, 🎨 The Main Event step 6: "Sit the egg in the cup and tilt the nest." "the cup" is a definite reference with no antecedent anywhere in the day. Change to "Sit the egg in the hollow and tilt the nest."`,
  ],
}

const RULES = `
THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn (3) and Kreston (9 months in March). She reads it at 8:00 in
the morning holding the baby. Warm, practical, direct, written to an equal.

REFERENCE for register and format: ${REPO}\\months\\01-jan-w1.md

NEVER CHANGE: anchors; day headers; date lines; theme lines; any line starting
with ###, including the activity name after the colon; the insight HEADLINE
(the "> **...**" line after the brain-emoji line); the 16 schedule rows; the
page-break divs.

COUNTS ARE FIXED: Main Event 4-6 numbered steps, Second Main Event 5-7,
Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets, insight body
100-120 words. Every material and quantity stays unless a fix says otherwise.
Every Safety block keeps its hazard AND the action that answers it.

LENGTH: 1,000-1,150 prose words per day, excluding the ~155 word schedule
block; the week's FIRST day may reach 1,300. If a fix adds words, confirm the
day is still in band.

STYLE: no em dashes in prose, no adverbs (really, just, literally, genuinely,
honestly, simply, actually, deeply, truly, fundamentally), no binary contrasts
("not X, it's Y"), no negative listing, no dramatic fragments, no rhetorical
setups, no passive voice, no false agency, no Wh- sentence openers, no
narrator-from-a-distance. Vary sentence length. Safety absolutes stay strong.

Prose wraps near 78 columns; numbered steps and bullets stay on one line each.
LF endings, no trailing whitespace.

⚠️ TOUCH ONLY WHAT THE FIXES NAME. Every other day in the file is correct and
a baseline copy exists at ${SP}\\baseline\\ for diffing.
`

phase('Fix')

const out = await pipeline(
  [10, 11],

  (wk) => agent(
`Repair one week of a printed activity book. ${RULES}

FILE TO EDIT IN PLACE: ${OUT}\\wk${pad(wk)}-days.md
PRE-EDIT BASELINE (do not edit): ${SP}\\baseline\\wk${pad(wk)}-days.md

Findings, in order:

${FIXES[wk].map((f, i) => `${i + 1}. ${f}`).join('\n\n')}

Read the file first. Make these changes and nothing else.

RETURN one line per finding saying what you changed.`,
    { label: `fix:wk${pad(wk)}`, phase: 'Fix' }
  ),

  (rep, wk) => agent(
`Verify a repaired week. Be skeptical. ${RULES}

CURRENT:  ${OUT}\\wk${pad(wk)}-days.md
BASELINE: ${SP}\\baseline\\wk${pad(wk)}-days.md

Diff them. Every change must correspond to one of these findings:
${FIXES[wk].map((f, i) => `  ${i + 1}. ${f.slice(0, 140)}...`).join('\n')}
Any change NOT explained by a finding is a MAJOR issue. Report it.

Then check all seven days:
1. Prose words per day excluding the ~155 word schedule block: 1,000-1,150,
   or up to 1,300 for the week's first day.
2. Main Event 4-6 steps, Second Main Event 5-7 steps.
3. Afternoon Alternatives 3-4 bullets, Out Again 4-6 bullets.
4. MATERIALS COMPLETENESS, both directions: every item a numbered step or Tip
   calls for appears in that activity's materials list, and every listed
   material is used by a step or Tip. Report orphans in either direction.
5. Safety block present where a real hazard exists, hazard intact, paired with
   the action that answers it, and NOT contradicted by any numbered step.
6. Insight body 100-120 words, no Wh- sentence openers.
7. Frozen lines intact.
8. No cut-seam damage: missing subject or object, broken verb agreement,
   dropped article, pronoun or "where"/"which" with no antecedent, clause
   stopping mid-thought, prose gone clipped and cold.

RETURN JSON only:
{"ok":true|false,"unexplainedChanges":[],"days":[{"day":N,"prose":N,"mainSteps":N,"secondSteps":N,"altBullets":N,"outAgainBullets":N,"insightWords":N}],
"issues":[{"severity":"critical|major|minor","day":N,"problem":"...","fix":"..."}]}`,
    { label: `recheck:wk${pad(wk)}`, phase: 'Recheck', effort: 'high' }
  )
)

return out

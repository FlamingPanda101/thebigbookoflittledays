export const meta = {
  name: 'write-weeks',
  description: 'Write full weeks of the activity book: plan, draft days, derive opener, verify, repair',
  phases: [
    { title: 'Plan', detail: 'name all 21 activities per week and set the arc' },
    { title: 'Draft', detail: 'write the seven days from the plan' },
    { title: 'Tighten', detail: 'cut every day back into the spec word band' },
    { title: 'Opener', detail: 'derive the week opener and shopping list from the written days' },
    { title: 'Verify', detail: 'adversarial: calendar, ages, rotation, format, slop' },
    { title: 'Repair', detail: 'fix what verification found' },
  ],
}

// lives in the repo now, not a session scratchpad: a scratchpad is wiped when
// a session ends and that lost a whole month's output once.
const SP = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027\\tools\\pipeline'
const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const BRIEFS = SP + '\\weeks'
const OUT = SP + '\\newweeks'

// weeks to write this run, passed as args e.g. [2,3,4,5]
const WEEKS = Array.isArray(args) && args.length ? args : [2, 3, 4, 5]
const pad = (n) => String(n).padStart(2, '0')

const CANON = `
THE CANONICAL EXAMPLE
${REPO}\\months\\01-jan-w1.md is week 1, already written, rewritten under the
house style rules and shipped. READ IT FIRST and match it exactly: section
order, heading text, emoji, blockquote prefixes, line wrapping, register.
The build spec calls Day 1 of v2 the canonical worked example.

ALSO READ:
${REPO}\\CONTINUATION.md  sections 1, 2, 3, 5, 6, 7 (family, calendar, day
                          format, Out Again rotation, themes, opener format)
${REPO}\\CLAUDE.md        standing rules, including the full writing style
                          ruleset and its four exceptions
${REPO}\\tools\\titles.tsv every activity and insight title used so far
`

const FAMILY = `
THE FAMILY
Brooklyn is Mom and the reader. Joseph is Dad and the author. Azlyn is the
primary learner, she/her, and she is THREE for every day in this range.
Kreston is her baby brother, he/him, born June 5 2026. His age in months is
given per day in the brief and it changes on the 5th of each month. Use their
names. Never "your child" or "the baby".

Brooklyn reads this at 8:00 in the morning while holding a baby. She is a
competent adult. Warm, practical, direct. Never preachy, never explain what
she already knows, never pad.

There is no nap in the book. Azlyn is three and has dropped it.
`

const DAYFORMAT = `
THE DAY FORMAT. Every day is a two-page spread, 1,000-1,150 words of prose
plus the ~120 word schedule block. Sections in EXACTLY this order:

<a id="day-N"></a>
(blank)
## 🌟 Day N: [Day Title] 🌟
**📅 [Weekday], [Month] [D], 2027**       <- COPY VERBATIM FROM THE BRIEF
**Theme:** [week theme without the emoji]
(blank)
### 🌙 Prep Tonight
> One line. What to get out, defrost, freeze or set up the night before.
> Every day gets one. Where tomorrow's Main Event needs something made or
> bought, say so HERE, the day before.
(blank)
### ⏰ At-a-Glance Schedule
- **8:00–9:00 AM** — 🌅 Opening Activity: [NAME]
- **9:00–9:15 AM** — Morning Meeting (15 min)
- **9:15–10:15 AM** — 🎨 The Main Event: [NAME] (60 min)
- **10:15–10:30 AM** — Snack (15 min)
- **10:30–11:15 AM** — 🌳 Get Outside: [NAME] (45 min)
- **11:15–11:45 AM** — Free Play (30 min)
- **11:45 AM–12:00 PM** — 🤸 Wiggle Time (15 min)
- **12:00–12:30 PM** — Lunch
- **12:30–1:00 PM** — 📚 Book Time
- **1:00–2:30 PM** — 🎨 Second Main Event: [NAME] (90 min)
- **2:30–3:30 PM** — 🌳 Out Again: **Pick one** (60 min)
- **3:30–4:00 PM** — Snack & Free Play
- **4:00–4:15 PM** — 🧹 Her Job: [NAME]
- **4:15–5:00 PM** — Quiet Play: [NAME]
- **5:00–5:45 PM** — 🛁 Wind-Down: [NAME]
- **6:00 PM** — **Dinner**

  The dashes in those rows are EN DASH in the times (8:00–9:00) and EM DASH
  before the label. That is table formatting set by the spec. Reproduce it.
  Where the day's Out Again anchor is Swimming, the Library or the MUSEUM,
  that row reads "🌳 Out Again: **Swimming** (60 min)" instead of "Pick one".

### 🌅 Opening Activity: [NAME]
**🧰 You need:** item · item · item.
Then 3 numbered steps, ~90 words total. Gentle. She has come to the table and
the Main Event is an hour away. It usually PREPS the 9:15 Main Event so the
day builds instead of starting early.

### 🎨 The Main Event: [NAME]
**🧰 Complete Materials List:**
- full list with quantities
**📝 Step-by-Step Instructions:**
1. through 4-6 steps
> 💡 **Tip:** one tip.
Self-contained. Never link out.

### 🌳 Get Outside: [NAME]
A short paragraph. A SPECIFIC named activity matched to the season. Never a
generic "Park Trip". These days are deep winter through spring: check the
brief's month and write weather that is real for it.

> 👶 **Infant Integration:** blockquote paragraph. What Kreston does in this
> activity at the exact age the brief gives for that day. Warm observation of
> what he is working on, not a hazard warning.

<div style="page-break-after: always;"></div>

### 🎨 Second Main Event: [NAME]
A one or two sentence lead-in, then:
**🧰 Complete Materials List:**
**📝 Step-by-Step Instructions:** 5-7 steps
> 💡 **Tip:**
A real 90 minute activity with its own materials. Not filler, not a repeat.
It either EXTENDS the morning or SWITCHES MODE: morning made something so the
afternoon plays with it, or the morning was messy so the afternoon is calm.
DO NOT open every one of these with a "the morning did X, this afternoon does
Y" contrast. Week 1 did that five days running and it had to be rewritten.

### 🎯 Afternoon Alternatives
- 3-4 one-line options. Titles only, no steps.

### 🌳 Out Again: **Pick one**
- The brief gives the week's ANCHOR for that weekday. It goes FIRST.
- Then 3-5 more one-line alternatives, because weather and mood beat a table.

> 👶 **Kreston's Afternoon:** blockquote paragraph, his age-appropriate part
> of the afternoon.

### 🌍 Around the World: [sidebar title]      <- WEEK'S FIRST DAY ONLY
Two or three sentences of fact, then:
> **✨ Try it:** food-forward where possible.
> *Did you know?* one line.

---

> 🧠 **A Little Parenting Insight**
> **[The exact headline assigned in the brief, verbatim.]**
> 100-120 words. Evidence-informed, written to a competent adult. Framed as
> WHY WHAT SHE ALREADY DOES WORKS, never corrective. Never preachy.

> ⚠️ **Safety:** ONLY where there is a real hazard. Not every day. Filler
> warnings train the reader to skip them. Real hazards in this range: ovens,
> knives, scissors, string and cord at toddler height, small parts and
> choking, water, hot liquids, allergens, cold weather exposure.

<div style="page-break-after: always;"></div>
`

const STYLE = `
⚠️ US ENGLISH THROUGHOUT. The book is American. Ten months were written in
British English and 2,700 terms had to be converted afterwards; do not add to
that. Write color, favorite, practice, realize, meter, center, gray. Write
stroller not pram, craft sticks not lolly sticks, rain boots not wellies,
flashlight not torch, sidewalk not pavement, curb not kerb, trash not rubbish,
dish towel not tea towel, washcloth not flannel, paper towels not kitchen
roll, popsicle not ice lolly, cookie not biscuit, candy not sweets, pitcher
not jug, stove not cooker, stovetop not hob, closet not wardrobe, parking lot
not car park, mailbox not postbox, diaper not nappy, crib not cot, bandage not
plaster, plastic wrap not cling film, parchment not greaseproof, superfine
sugar, self-rising flour, baking soda, zucchini. Money in dollars and cents.
KEEP "autumn": it is standard American in writing and the book uses
fall/falls/falling for toppling towers.

THE PLANT AND WEATHER CALENDAR IS AMERICAN TOO. Do not write snowdrops in
February, hazel catkins, frogspawn in late March, blackthorn, elder, bluebell
woods or cow parsley. Write what a family across much of the United States
would actually find outside that month, and prefer widespread species.

WRITING STYLE. These are enforced and week 1 had to be rewritten for breaking
them. Read CLAUDE.md for the full set.

CUT: throat-clearing ("Here's the thing/what/why", "The truth is", "It turns
out"), emphasis crutches ("Full stop.", "This matters because"), filler ("At
its core", "It's worth noting", "At the end of the day"). ALL adverbs: no -ly
words, no really/just/literally/genuinely/honestly/simply/actually/deeply/
truly/fundamentally.

NEVER WRITE: binary contrasts ("not X, it's Y", "X isn't the problem, Y is",
"stops being X and starts being Y"); negative listing ("Not a X. Not a Y. A
Z."); dramatic fragments ("[Noun]. That's it."); rhetorical setups ("What
if...?", "Think about it:"); EM DASHES IN PROSE (use commas, periods or
parentheses; the schedule rows are the one exception and they are table
formatting); Wh- sentence openers; passive voice; false agency (name the
person, or use "you"); narrator-from-a-distance ("People tend to").

RHYTHM: vary sentence length, never three matching in a row. Do not end every
paragraph on a punchy one-liner.

EXCEPTIONS where style does NOT apply: safety absolutes stay ("Never leave
Kreston alone with it" is true and load-bearing); materials lists and numbered
steps keep every item and their counts.
`

phase('Plan')

const results = await pipeline(
  WEEKS,

  // 1. plan the week
  (wk) => agent(
`Plan one week of a 365-day activity book. ${FAMILY}
${CANON}

YOUR BRIEF: ${BRIEFS}\\wk${pad(wk)}.json
It gives the week number, theme, Around the World sidebar, date range, the
seven pre-assigned insight headlines, and per day: the day number, the exact
date header line to copy, Kreston's age in months that day, the Out Again
anchor for that weekday, and any holiday.

TASK: design the seven days. Do not write prose yet. Return a plan.

For each of the seven days decide:
- a Day Title (short, concrete, appears as "## 🌟 Day N: TITLE 🌟")
- Opening Activity name  (it should PREP that day's Main Event)
- Main Event name + one line of what it is + its materials
- Get Outside name (specific, named, matched to the real season of that month)
- Second Main Event name + one line + materials. It EXTENDS the morning or
  SWITCHES MODE. Vary which, across the week.
- Her Job, Quiet Play, Wind-Down names (schedule block only, no prose)
- whether the day needs a Safety block, and for what real hazard

THE ARC: the week has a theme. Days should build on each other without
requiring the reader to have done yesterday. Vary the shape: not every day is
a craft, not every day is messy. Put at least one low-mess, low-energy day in
the week, because some days are bad days.

HARD RULES
- Read ${REPO}\\tools\\titles.tsv. NO activity name may repeat any name in
  that file, and none may repeat within your week. 21 new activity names.
- A holiday marked FULL DAY in the brief reshapes that whole day around the
  holiday. A holiday marked "bonus note" gets a mention, not a redesign.
- Materials are ordinary household and supermarket things: recycling,
  cardboard, tape, string, flour, salt, food colouring, paper, chalk, pegs.
  No specialist craft kit. Anything unusual needs a stated substitute.
- Every activity must work for a THREE-year-old with a baby in the room.

RETURN JSON only:
{"week":N,"days":[{"day":N,"title":"...","opening":"...","main":"...",
"mainWhat":"...","mainMaterials":["..."],"getOutside":"...","second":"...",
"secondWhat":"...","secondMaterials":["..."],"secondMode":"extends|switches",
"herJob":"...","quietPlay":"...","windDown":"...","safety":"the real hazard or null"}]}`,
    { label: `plan:wk${pad(wk)}`, phase: 'Plan' }
  ),

  // 2. write the seven days from the plan
  async (plan, wk) => {
    const p = typeof plan === 'string' ? plan : JSON.stringify(plan)
    return agent(
`Write the seven days of one week of a 365-day activity book. ${FAMILY}
${CANON}

YOUR BRIEF: ${BRIEFS}\\wk${pad(wk)}.json
THE APPROVED PLAN for this week (names and materials are already decided,
follow them exactly):
${p}

${DAYFORMAT}

${STYLE}

WRITE all seven days, in order, to: ${OUT}\\wk${pad(wk)}-days.md
Start the file directly with the first day's <a id="day-N"></a> line. No week
opener, no preamble, no commentary. End with the last day's page-break div.

⚠️ MATERIALS MUST MATCH STEPS, BOTH DIRECTIONS. This is the defect that has
shipped most often, and it is the one that fails a real parent at 9:15 with
the kit already on the table.

For EVERY activity, before you move on:
- every object a numbered step or the Tip mentions is IN that activity's
  Complete Materials List, with a quantity
- every item in the materials list is USED by a numbered step or the Tip
- anything the ⚠️ Safety block or an Infant Integration refers to with "the"
  ("the step up onto the book", "the cut string") is also in the list

Real failures this has caused: a step telling Brooklyn to stand a jar on a
saucer that was never listed; a Safety block controlling a hazard from a
pegged string that no step ever hung; string listed in materials, cut in Prep
Tonight and named twice in Safety while no step used it; two steps cutting
card with no scissors listed and no cutting hazard in Safety; a step handing a
three-year-old scissors the list marked adult-only.

If a step needs scissors, list them and say whose they are. The book
distinguishes "1 pair of child-safe scissors" from "1 pair of adult scissors
(adult only)", and the Safety block closes with "The scissors stay with you."

⚠️ LENGTH IS THE RULE MOST OFTEN BROKEN. Read this twice.

Each day is 1,000-1,150 words of PROSE. The ~155 word schedule block does not
count toward it. The week's FIRST day may reach 1,300 because it alone carries
the Around the World sidebar.

AIM AT 1,080, not at 1,150. Writing to the ceiling lands you over it.

The first four weeks written this way came in at 1,199-1,380 and every one of
them had to go back through a trimming pass, which cost a day of work and left
damage at the cut seams. Do not repeat that.

COUNT THE PROSE YOURSELF after each day, before you start the next one. If a
day is over 1,150, cut it then, not later. The overage is almost always:
qualification, restating a step in the prose that the numbered list already
gives, explaining what the point of an activity is when the reader can see it,
and Infant Integration paragraphs that have drifted past four sentences.

CHECK BEFORE YOU FINISH
- Seven days, day numbers exactly as the brief gives them.
- Each date line copied VERBATIM from the brief. Do not compute dates.
- Azlyn's age from the brief's azlyn_age. She is three until Day 354.
- Kreston's age in each Infant Integration and Kreston's Afternoon matches the
  brief for THAT day. It changes mid-week in some weeks.
- Each day's Out Again list opens with the brief's anchor for that weekday.
- The Around the World sidebar appears on the WEEK'S FIRST DAY ONLY. If the
  brief says sidebar_needs_writing, no v1 sidebar exists for this week and you
  write a fresh one on the theme: a fact about how the theme shows up
  elsewhere in the world, then **✨ Try it** (food-forward), then *Did you
  know?*
- Each insight uses its assigned headline verbatim and its body is 100-120
  words and does not repeat another day's argument.
- Exactly 16 schedule rows per day, ending with the 6:00 PM dinner row.
- No em dashes outside the schedule rows.

DO NOT EDIT ${REPO}\\tools\\titles.tsv. Read it, never write it. It is
regenerated from months/ after the merge, and an agent editing it mid-run
breaks the collision check.

⚠️ FINISH THE WHOLE WEEK. A previous run reported success having written only
one day of the seven, and the partial file went downstream as if complete.

Before you finish: re-read the file you wrote and COUNT the lines matching
"## 🌟 Day". There must be exactly SEVEN, numbered consecutively across the
brief's range. If there are fewer, you are not done: keep writing until all
seven are there. Do not return a summary of days you did not write.

State the count you actually found in your return.

RETURN: the day-anchor count you verified, per-day PROSE word counts
(excluding the schedule block), and anything you had to guess at.`,
      { label: `days:wk${pad(wk)}`, phase: 'Draft' }
    )
  },

  // 3. tighten to the spec band. Every month written without this stage came
  //    in 5-20% over and needed a separate trim run, which left damage at the
  //    cut seams. Doing it here puts it in front of the verifier.
  async (rep, wk) => agent(
`Tighten one week of a printed activity book to its specified length. ${FAMILY}

FILE TO EDIT IN PLACE: ${OUT}\\wk${pad(wk)}-days.md
REFERENCE, correct length and register: ${REPO}\\months\\01-jan-w1.md
  (its days run 1,054-1,145 prose words; its first day runs 1,282 because it
   alone carries the Around the World sidebar)

⚠️ FIRST, BEFORE ANY EDIT: count the lines matching "## 🌟 Day" in the file.
There must be exactly SEVEN. If there are fewer, the draft stage failed
partway. STOP, change nothing, and return only "INCOMPLETE: n days found".
Tightening a truncated file wastes the work and hides the failure.

THE SPEC: 1,000-1,150 words of PROSE per day. The ~155 word schedule block
does NOT count. The week's FIRST day may reach 1,300 for its sidebar.

⚠️ AIM FOR THE MIDDLE, NOT THE CEILING. Target 1,080 prose words per day, and
1,240 for the week's first day. Trimming to 1,150 exactly has produced days at
1,151-1,255 three months running, because the last pass always leaves a little
back. Aiming at 1,080 puts the natural overshoot inside the band instead of
just outside it.

Go day by day. Count the prose. Cut every day to land near 1,080 (near 1,240
for the week's first day). A day already at 1,000-1,120 is fine, leave it.
Never take a day below 1,000.

WHERE THE EXCESS ALWAYS IS, cut in this order:
1. Qualification and hedging inside otherwise clear sentences.
2. Prose that restates what the numbered steps already say.
3. Sentences telling Brooklyn what the point of an activity is. She can see
   it. Tails in the shape of "..., and that is the point" go first.
4. Infant Integration and Kreston's Afternoon paragraphs that have drifted
   past four sentences.

NEVER CUT: a material or quantity; a numbered step, or the count of them; an
Afternoon Alternative or Out Again bullet; a Safety block or any hazard
detail in one; the Around the World sidebar; a schedule row; a time, age,
date, weekday, or Kreston's stated age in months.

NEVER CHANGE: anchors, day headers, date lines, theme lines, any line
starting with ###, the insight HEADLINE (the "> **...**" line after the
brain-emoji line), the page-break divs. You may tighten an insight BODY,
keeping it 100-120 words.

⚠️ CUT SEAMS ARE WHERE THIS GOES WRONG. Trimming has previously left a broken
verb agreement, a "where" with nothing to refer to, and a clause that stopped
mid-thought. After every cut, READ THE WHOLE SENTENCE BACK. It must be
grammatical, complete, and still say what it said before.

${STYLE}

RETURN a table: day, prose before, prose after, in band yes/no.`,
    { label: `tighten:wk${pad(wk)}`, phase: 'Tighten' }
  ),

  // 4. derive the opener from the written days
  async (rep, wk) => agent(
`Write the week opener for one week of a 365-day activity book. ${FAMILY}
${CANON}

YOUR BRIEF: ${BRIEFS}\\wk${pad(wk)}.json
THE SEVEN DAYS, already written: ${OUT}\\wk${pad(wk)}-days.md

READ THE SEVEN DAYS FIRST. The opener is DERIVED from them, especially the
shopping list, which is the most load-bearing part of the page.

Write to: ${OUT}\\wk${pad(wk)}-opener.md

EXACT FORMAT (see week 1's opener in ${REPO}\\months\\01-jan-w1.md):

<a id="week-N"></a>
(blank)
## Week N: [Theme with emoji, from the brief]
**📅 [date range from the brief]**
(blank)
---
(blank)
### 🎯 What This Week Is About
Two short paragraphs: the through-line, and any holiday landing in it.
(blank)
---
(blank)
### 🧒 What Azlyn Will Learn
- Five bullets. Concrete skills. **Bolded lead-in.** Then plain explanation.
(blank)
---
(blank)
### 👩 What You'll Learn
- The seven insight headlines from that week's days, VERBATIM, minus the full
  stop. Copy them from the written days. They must match character for
  character or a validator fails.
(blank)
---
(blank)
### 🛒 This Week's Shopping List
(blank)
> *Everything both main events call for, all seven days. Check what you've
> already got before Friday.*
(blank)
- [ ] one flat deduped list
(blank)
---
(blank)
### 💛 A Note from Joseph
(blank)
> *(Draft. Rewrite this. I can guess the shape of it, not the feeling.)*
> (blank quote line)
> The week's note. Private, warm, specific to THIS week. Never generic
> praise. Joseph is writing to Brooklyn, who is doing the days he is not in.
(blank)
---
(blank)
> 👶 **Kreston is N months this week**. [capability from the brief]
(blank)
---
(blank)
<div style="page-break-after: always;"></div>

THE SHOPPING LIST IS THE POINT OF THIS PAGE. Go through all seven days and
pull EVERY material from both main events and both opening activities. One
flat list, deduped, no buy/already-have split. Include things she probably
owns so she can check stock before Friday. Week 1 shipped with the craft knife
and the crayons missing and it had to be patched. Do not repeat that.

The Note from Joseph MUST keep the draft marker line. Joseph rewrites these
himself and the spec requires it be marked.

${STYLE}

RETURN: the shopping list item count, and confirmation the seven headlines
match the days character for character.`,
    { label: `opener:wk${pad(wk)}`, phase: 'Opener' }
  ),

  // 4. adversarial verification
  async (rep, wk) => agent(
`Adversarially verify one written week of a 365-day activity book. Assume the
writers made mistakes and find them. ${FAMILY}

BRIEF:  ${BRIEFS}\\wk${pad(wk)}.json
OPENER: ${OUT}\\wk${pad(wk)}-opener.md
DAYS:   ${OUT}\\wk${pad(wk)}-days.md
REFERENCE (correct in every respect): ${REPO}\\months\\01-jan-w1.md
TITLES ALREADY USED: ${REPO}\\tools\\titles.tsv

CHECK, most severe first:

1. CALENDAR. Every day's date line must match the brief VERBATIM. Weekday,
   month, day number. A wrong weekday is critical.
2. DAY NUMBERS. Seven days, consecutive, matching the brief's range.
3. AGES. Azlyn is three every day. Kreston's stated age in months must match
   the brief FOR THAT DAY. Some weeks change mid-week.
4. TITLE COLLISIONS. No Opening Activity, Main Event, Second Main Event or
   insight headline may repeat anything in titles.tsv, or repeat within this
   week. Check every one.
5. INSIGHT HEADLINES. Each must be the one assigned in the brief, verbatim.
   The opener's "What You'll Learn" bullets must match the day headlines
   character for character, minus the trailing full stop.
6. OUT AGAIN. Each day's list must open with the brief's anchor for that
   weekday.
7. SHOPPING LIST COVERAGE. Take every material named in all seven days' two
   main events and two opening activities. Anything missing from the opener's
   shopping list is a MAJOR issue. List exactly what is missing.
8. FORMAT. Section order, all 16 sections per day, all 15 schedule rows, the
   sidebar on the first day only, page-break divs, anchors, blockquote
   prefixes. Around the World must NOT appear on days 2-7.
9. SAFETY. A real hazard in an activity with no Safety block is MAJOR. A
   filler Safety block on a day with no hazard is MINOR.
   ALSO: does any numbered step CONTRADICT its own Safety block? A Safety line
   saying bare skin comes off the ice after one minute, against a step
   prescribing two minutes of bare-handed contact, is CRITICAL. So is a step
   inviting a child to lick a block the Safety block keeps off her face, or a
   step handing her scissors the materials list marks adult-only.
9b. MATERIALS COMPLETENESS, both directions, per activity. Every object a
   numbered step or Tip names must be in that activity's materials list with a
   quantity; every listed material must be used by a step or Tip; anything the
   Safety block or Infant Integration refers to with "the" must be listed.
   Report each orphan and each missing item by name. This is the most frequent
   defect in the book.
10. STYLE. Em dashes in prose (schedule rows exempt), adverbs, binary
    contrasts, dramatic fragments, passive voice, false agency, Wh- openers.
    Also: do more than two Second Main Events open on a morning/afternoon
    contrast? That is a MAJOR repetition problem.
11. SUBSTANCE. Is any activity impossible, unsafe or boring for a
    three-year-old? Does any Main Event need materials a normal house lacks?
12. LENGTH. Count the PROSE words per day, excluding the ~155 word schedule
    block. Under 1,000 or over 1,150 is a MAJOR issue and must be reported
    with the actual number. The week's first day may reach 1,300 for its
    sidebar. This is the check the first four weeks failed.
13. CUT SEAMS. A tightening pass ran over these days. Look for its damage:
    a sentence that lost its subject or its object, a broken verb agreement,
    a pronoun or a "where"/"which" with nothing left to refer to, a clause
    that stops mid-thought, a paragraph that now reads clipped against the
    warm register of the rest. Quote any you find. This is a MAJOR issue.

RETURN JSON only:
{"ok":true|false,"issues":[{"severity":"critical|major|minor","day":N or null,
"category":"calendar|ages|titles|insights|rotation|shopping|format|safety|style|substance",
"problem":"...","fix":"..."}]}
Be specific and quote exact text. Do not invent issues.`,
    { label: `verify:wk${pad(wk)}`, phase: 'Verify', effort: 'high' }
  ),

  // 5. repair
  async (verdict, wk) => {
    let v = verdict
    if (typeof v === 'string') {
      try {
        const s = v.indexOf('{'), e = v.lastIndexOf('}')
        v = JSON.parse(v.slice(s, e + 1))
      } catch (err) { v = null }
    }
    const issues = (v && v.issues) || []
    if (v && v.ok === true && issues.length === 0) {
      log(`wk${pad(wk)}: verified clean`)
      return { week: wk, issues: 0 }
    }
    log(`wk${pad(wk)}: ${issues.length} issue(s), repairing`)
    await agent(
`Repair one written week of a 365-day activity book. ${FAMILY}

BRIEF:  ${BRIEFS}\\wk${pad(wk)}.json
OPENER: ${OUT}\\wk${pad(wk)}-opener.md
DAYS:   ${OUT}\\wk${pad(wk)}-days.md
REFERENCE: ${REPO}\\months\\01-jan-w1.md

An adversarial verifier found these. Fix every critical and major issue, and
every minor one whose fix does not damage the prose:

${JSON.stringify(issues, null, 2)}

${DAYFORMAT}

${STYLE}

Edit the two files in place. Do not leave notes or commentary in them.
Date lines come from the brief, verbatim; never compute a date yourself.

RETURN one line per issue describing what you changed.`,
      { label: `repair:wk${pad(wk)}`, phase: 'Repair' }
    )
    return { week: wk, issues: issues.length }
  }
)

return results

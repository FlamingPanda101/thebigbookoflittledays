export const meta = {
  name: 'wk43-opener',
  description: 'Write the missing week 43 opener, derived from its finished days',
  phases: [{ title: 'Opener', detail: 'derive from the seven written days' }],
}

const SP = 'C:\\Users\\Josep\\AppData\\Local\\Temp\\claude\\C--Users-Josep--claude\\f2051431-8954-4594-9860-3b743569602a\\scratchpad'
const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'

phase('Opener')

const r = await agent(
`Write the week opener for week 43 of a 365-day activity book.

THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn, who is three, and her baby brother Kreston, who is 16
months in late October. She reads it at 8:00 in the morning holding the baby.
Warm, practical, direct, written to an equal, never preachy.

BRIEF: ${SP}\\weeks\\wk43.json
THE SEVEN DAYS, already written: ${SP}\\newweeks\\wk43-days.md
REFERENCE, a correct opener: ${REPO}\\months\\01-jan-w1.md
FORMAT SPEC: ${REPO}\\CONTINUATION.md section 7
STYLE RULES: ${REPO}\\CLAUDE.md

READ THE SEVEN DAYS FIRST. The opener is DERIVED from them.

Write to: ${SP}\\newweeks\\wk43-opener.md

EXACT FORMAT:

<a id="week-43"></a>
(blank)
## Week 43: [theme with emoji, from the brief]
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
- The seven insight headlines from the written days, VERBATIM, minus the
  trailing full stop. Copy them out of the day file character for character.
  A validator compares these against the days and fails on any mismatch.
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
> (blank quote line, just ">")
> The week's note. Private, warm, specific to THIS week. Never generic praise.
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
owns so she can check stock before Friday. An earlier week shipped with the
craft knife and the crayons missing and had to be patched.

The Note from Joseph MUST keep the draft marker line: Joseph rewrites these
himself and the spec requires it be marked.

STYLE: no em dashes in prose, no adverbs (really, just, literally, genuinely,
honestly, simply, actually, deeply, truly, fundamentally), no binary contrasts
("not X, it's Y"), no negative listing, no dramatic fragments, no passive
voice, no false agency, no Wh- sentence openers. Vary sentence length.
Prose wraps near 78 columns. LF endings, no trailing whitespace.

RETURN: the shopping list item count, and confirmation that the seven
headlines match the day file character for character.`,
  { label: 'opener:wk43', phase: 'Opener' }
)

return r

export const meta = {
  name: 'write-openers',
  description: 'Write week openers derived from already-written days',
  phases: [{ title: 'Opener', detail: 'one agent per week' }],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const SP = REPO + '\\tools\\pipeline'
const WEEKS = Array.isArray(args) && args.length ? args : [45, 46, 47, 48]
const pad = (n) => String(n).padStart(2, '0')

phase('Opener')

const out = await pipeline(
  WEEKS,
  (wk) => agent(
`Write the week opener for week ${wk} of a 365-day activity book.

THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn (three) and Kreston (her baby brother, 17 months in
November). She reads it at 8:00 in the morning holding the baby. Warm,
practical, direct, written to an equal, never preachy.

BRIEF: ${SP}\\weeks\\wk${pad(wk)}.json
THE SEVEN DAYS, already written: ${SP}\\newweeks\\wk${pad(wk)}-days.md
REFERENCE, a correct opener: ${REPO}\\months\\01-jan-w1.md
FORMAT: ${REPO}\\CONTINUATION.md section 7
RULES: ${REPO}\\CLAUDE.md, especially the Locale and Writing style sections

READ THE SEVEN DAYS FIRST. The opener is DERIVED from them.

Write to: ${SP}\\newweeks\\wk${pad(wk)}-opener.md

EXACT FORMAT:

<a id="week-${wk}"></a>
(blank)
## Week ${wk}: [theme with emoji, from the brief]
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
  A validator compares these against the days and fails on any mismatch. Note
  that a full stop can sit INSIDE a closing quote; drop it and keep the quote.
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
> (a bare ">" line)
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

US ENGLISH THROUGHOUT. Not pram, lolly sticks, wellies, torch, pavement,
flannel, tea towel, kitchen roll, jug or biscuit. See CLAUDE.md.

STYLE: no em dashes in prose, no adverbs, no binary contrasts, no negative
listing, no dramatic fragments, no passive voice, no false agency, no Wh-
sentence openers. Vary sentence length. Prose wraps near 78 columns. LF
endings, no trailing whitespace.

RETURN: the shopping list item count, and confirmation that the seven
headlines match the day file character for character.`,
    { label: `opener:wk${pad(wk)}`, phase: 'Opener' }
  )
)

return out

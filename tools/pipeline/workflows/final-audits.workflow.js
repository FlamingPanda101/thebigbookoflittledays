export const meta = {
  name: 'final-audits',
  description: 'The two things never checked: week 1 shopping list, and the 52 notes',
  phases: [{ title: 'Audit', detail: 'shopping list rebuild and an adversarial read of all 52 notes' }],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'

phase('Audit')

const out = await parallel([
  () => agent(
`Rebuild the Week 1 shopping list from its finished days.

THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn
to use with Azlyn (three) and Kreston (6 months in January). She reads it at
8:00 in the morning.

THE PROBLEM, measured: Week 1's shopping list holds 28 items. Comparable weeks
hold 47 to 58. Week 1 is the original week and its opener was written
ALONGSIDE its days. Every later week's opener was DERIVED FROM finished days,
which is the ordering that exists to stop exactly this. Week 1 never got that
treatment. Confirmed present in the days and absent from the list: a teaspoon,
a scrap of fabric, a saucepan.

FILE: ${REPO}/months/01-jan-w1.md
COMPARE: ${REPO}/months/01-jan-w2.md, whose list was derived properly
SPEC: ${REPO}/CONTINUATION.md section 7

Go through Days 1 to 7. Pull EVERY material from both Opening Activities, both
Main Events and both Second Main Events on each day, and rebuild the list to
cover them.

ON THE LIST: anything Brooklyn needs in the house or has to buy, including
things she probably owns, because the point of the page is checking stock
before Friday.

NOT ON IT: things the week makes earlier (Thursday's salt dough bricks are
made on Tuesday), house fixtures (door frame, front window, stairs), her own
body, furniture already in the room.

ONE FLAT DEDUPED LIST, no buy/already-have split. Keep the intro blockquote
and the "- [ ] " format. Preserve everything else on the page: the note from
Joseph, What Azlyn Will Learn, the What You'll Learn headlines, the Kreston
line. US English, no em dashes.

RETURN: item count before and after, and what you added.`,
    { label: 'shopping:wk1', phase: 'Audit', effort: 'high' }),

  () => agent(
`Adversarially audit all 52 Notes from Joseph. These have never been checked.

Joseph is the father. He wrote this book for Brooklyn, the mother of his two
children, to use with Azlyn and Kreston. He is not in the house during these
hours. She is. That gap is what every note is quietly about.

Every week opener in ${REPO}/months/ carries a "### 💛 A Note from Joseph".
Read ALL 52, in order, weeks 1 to 52.

THE MODEL is week 1 in ${REPO}/months/01-jan-w1.md. Short, true about the
work, ending on an admission rather than a compliment: "I know exactly how
long these hours are, and I know I am not the one in them."

FIND:
1. GENERIC PRAISE that survived: "amazing", "incredible", "lucky to have you",
   "I don't know how you do it". The spec bans it and it is the easiest
   failure to fall into.
2. PERFORMED GRATITUDE. He can be grateful. He cannot perform it.
3. INSTRUCTING HER. He is not her supervisor. Any note telling her how to
   parent, how to feel, or what to notice.
4. REPETITION ACROSS THE 52: repeated openings, the same admission twice, the
   same joke, the same sentence shape. Week 1 owns the "not the one in them"
   beat and nobody else may reuse its shape.
5. A NOTE THAT COULD SIT ON ANY WEEK. Each must name something that actually
   happens in its own seven days. Check at least fifteen against their weeks
   and say which fail.
6. FACTUAL ERRORS: a child's age, a weekday, an activity not in that week, a
   holiday on the wrong date.
7. STYLE: em dashes, adverbs, binary contrasts, Wh- sentence openers.
8. THE ARC. Read them in order. Week 1 is a man handing over a book. Week 52
   is the same man a year later, on her birthday, at the end of a year she
   carried. Does it build, or does the middle go flat?

Be honest. If they are good, say so and report few findings. Do NOT edit
anything; this is a read.

RETURN JSON only:
{"verdict":"one honest paragraph on whether these read like one person wrote
them to one person across a year","findings":[{"weeks":[N],"severity":"major|minor",
"problem":"quote the exact text","fix":"..."}]}`,
    { label: 'audit:52-notes', phase: 'Audit', effort: 'high' }),
])

return out

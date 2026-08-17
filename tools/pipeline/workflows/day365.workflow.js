export const meta = {
  name: 'day-365',
  description: 'Write the Grand Finale, Day 365, which sits outside the week structure',
  phases: [
    { title: 'Write', detail: 'the last day of the book' },
    { title: 'Verify', detail: 'threads closed, structure correct' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'
const OUT = REPO + '\\tools\\pipeline\\newweeks\\day365.md'

phase('Write')

const draft = await agent(
`Write Day 365, the last day of a 365-day activity book. This is the Grand
Finale and it carries more weight than any other page in the book.

THE BOOK: "The Big Book of Little Days (2027)". Joseph wrote it for Brooklyn,
the mother of his children, to use with Azlyn and Kreston. She reads it at
8:00 in the morning. Warm, practical, direct, written to an equal, never
preachy, never sentimental for its own sake.

THE DATE: Day 365 is **Friday, December 31, 2027**. New Year's Eve.
AZLYN IS **FOUR**. She turned four on Day 354, eleven days ago.
KRESTON is **18 months and 26 days**, a full participant who walks, climbs,
carries things while moving, and has twenty-plus words.

READ FIRST:
- ${REPO}\\months\\01-jan-w1.md  — Day 1, the canonical day AND the day whose
  threads this one closes. Read Day 1 in full before writing a word.
- ${REPO}\\months\\12-dec-w52.md — the week that runs up to this day
- ${REPO}\\CONTINUATION.md  sections 3 and 12
- ${REPO}\\CLAUDE.md  — the Locale and Writing style sections
- ${REPO}\\tools\\titles.tsv — every title used in the book. Yours must be new.

WRITE TO: ${OUT}

=== THE THREADS THIS DAY MUST CLOSE ===
These were started on Day 1 and returned to all year. Closing them is the
point of this page.

1. **The time capsule.** Day 1 sealed a shoebox marked OPEN DECEMBER 31, 2027
   and stood it where she could see it and not reach it. Today it opens. Inside
   are her four dictated answers from Day 1 (favorite color, favorite food,
   favorite song, what she wants to do this year), a drawing of the family, a
   photograph, and the treasure she picked up on the Day 1 walk.
2. **The message in a bottle** from Day 209, sealed OPEN NEW YEAR'S EVE and
   stood on the shelf beside the January box. It holds strips in her words
   from a July afternoon, and one folded strip Joseph wrote and did not read
   out.
3. **The growth chart.** Day 1 marked her height on the door frame and drew
   round her flat hand. Measure her against it today. She has been four for
   eleven days and the January mark is going to be a shock.
4. **The handprints.** One a month, twelve sheets. Today they go in order.
5. **The forks.** Her job every night since Day 1.
6. **The same walk.** Day 1 walked a route and looked at bare trees. Walk it
   again today.

Ask her the SAME FOUR QUESTIONS from Day 1 and write the answers word for word
beside the old ones. Do not tidy her grammar. The comparison is the whole
thing.

=== FORMAT ===
Follow the standard day format exactly, same as every other day: the anchor
<a id="day-365"></a>, the "## 🌟 Day 365: [Title] 🌟" header, the date line
**📅 Friday, December 31, 2027**, a **Theme:** line, 🌙 Prep Tonight, the 16-row
⏰ At-a-Glance Schedule, 🌅 Opening Activity, 🎨 The Main Event, 🌳 Get Outside,
👶 Infant Integration, a page-break div, 🎨 Second Main Event, 🎯 Afternoon
Alternatives, 🌳 Out Again, 👶 Kreston's Afternoon, then ---, the
> 🧠 A Little Parenting Insight, ⚠️ Safety if there is a real hazard, and the
closing page-break div.

Out Again for Day 365 is **Playgroup** per the spec rotation, then 3-5 more
one-line options. It is New Year's Eve, so some will be shut.

1,000-1,150 words of prose plus the ~155 word schedule block. This day may run
to 1,300 because of what it carries.

=== THE INSIGHT ===
Use this headline, which was reserved for this day:
**She won't remember most of this year, and that isn't the point.**
Then 100-120 words. Childhood amnesia is real: she will retain almost nothing
of being three from a standing memory. What the year built is not a set of
recallable episodes, it is her, and that is a different kind of keeping.
Written to Brooklyn as a competent adult who has done 365 of these days.
Never preachy. Do not tell her she did well; show her what the year did.

=== TONE ===
This is the last page of a book a family kept for a year. Earn the ending
without reaching for it. No speeches. No "as we close this chapter". The book
has spent 364 days being practical and warm, so end it being practical and
warm, and let the time capsule do the emotional work.

The spec's closing note ends on the line about how on the days when nothing
got done, they still got her all day, and that was always the actual
curriculum. Do not use that line here, it belongs to the back matter, but
write toward that feeling.

=== STYLE ===
US English throughout. No em dashes in prose, no adverbs (really, just,
literally, genuinely, honestly, simply, actually, deeply, truly,
fundamentally), no binary contrasts ("not X, it's Y"), no negative listing, no
dramatic fragments, no rhetorical setups, no passive voice, no false agency,
no Wh- sentence openers. Vary sentence length. Prose wraps near 78 columns;
numbered steps and bullets stay one line each. LF endings.

RETURN: the day title you chose, the prose word count, and one line on how you
closed each of the six threads.`,
  { label: 'write:day365', phase: 'Write' }
)

phase('Verify')

const check = await agent(
`Verify Day 365 of a 365-day activity book. It is the last page and the one
that closes the book's year-long threads. Be skeptical.

FILE: ${OUT}
DAY 1, whose threads it closes: ${REPO}\\months\\01-jan-w1.md
DAY 209, the message bottle: ${REPO}\\months\\07-jul-w30.md
TITLES ALREADY USED: ${REPO}\\tools\\titles.tsv

CHECK:
1. THREADS. Does it actually close all six: the time capsule sealed on Day 1,
   the message bottle from Day 209, the growth chart, the twelve handprints,
   the forks, and the same walk? Quote the line that closes each. A thread
   mentioned in passing but not closed is a MAJOR issue.
2. THE FOUR QUESTIONS. Day 1 asked favorite color, favorite food, favorite
   song, and what she wants to do this year, and wrote the answers word for
   word. Does Day 365 ask the SAME four and set them beside the old ones?
3. AGES. Azlyn is FOUR (she turned four on Day 354). Kreston is 18 months.
   Any line calling her three is CRITICAL.
4. DATE: **📅 Friday, December 31, 2027**. December 31 2027 is a Friday.
5. STRUCTURE: anchor, day header, theme line, exactly 16 schedule rows, all
   the standard sections in the standard order, two page-break divs.
   Main Event 4-6 numbered steps, Second Main Event 5-7, Afternoon
   Alternatives 3-4 bullets, Out Again 4-6 bullets.
6. TITLES: every activity name is new. Check titles.tsv.
7. INSIGHT: uses the reserved headline exactly, body 100-120 words.
8. LENGTH: 1,000-1,300 prose words excluding the ~155 word schedule block.
9. STYLE: US English, no em dashes in prose, no banned adverbs, no binary
   contrasts, no Wh- sentence openers, no passive voice.
10. TONE. Does it earn the ending, or does it reach for it? Flag any speech,
    any "as we close", any line that tells Brooklyn how to feel. Flag
    sentimentality that the rest of the book would not have written.

RETURN JSON only:
{"ok":true|false,"title":"...","prose":N,
"threads":{"timeCapsule":"quote or MISSING","bottle":"...","growthChart":"...",
"handprints":"...","forks":"...","sameWalk":"...","fourQuestions":"..."},
"issues":[{"severity":"critical|major|minor","problem":"...","fix":"..."}]}`,
  { label: 'verify:day365', phase: 'Verify', effort: 'high' }
)

return { draft, check }

export const meta = {
  name: 'notes-from-joseph',
  description: 'Write all 52 weekly notes from Joseph as finished writing, plus the front and closing notes',
  phases: [
    { title: 'Write', detail: 'one agent per booklet month' },
    { title: 'Sweep', detail: 'read all 52 together for repetition and voice drift' },
  ],
}

const REPO = 'C:\\Users\\Josep\\The-Big-Book-of-Little-Days-2027'

const VOICE = `
WHO IS WRITING. Joseph is the father. He made this book for Brooklyn, the
mother of his two children, to use with Azlyn and Kreston. He is not in the
house during these hours. She is. That gap is the whole reason the book
exists, and it is the thing every note is quietly about.

WHO IS READING. Brooklyn, on a Friday morning, at the start of a week, with a
three-year-old and a baby. She is a competent adult having a long year.

THE CANONICAL NOTE, week 1, which sets the voice exactly:

> Brooklyn, this is the first page of the first week. The book is me handing
> you something at 8:00 in the morning so you don't have to invent a whole day
> from nothing while a six-month-old chews your sleeve. Treat it as a menu.
> Skip what doesn't fit, cross things out. Some days you will not open it at
> all, and those days count too. I know exactly how long these hours are, and
> I know I am not the one in them.

Study what that does. It is short. It says a true thing about the work. It
does not praise her, thank her, or tell her she is doing well. It ends on an
admission rather than a compliment. That last sentence is the register: he
knows what he is asking and he knows who is carrying it.

THE RULES, and they matter more than usual here:

1. SHORT. Five to eight sentences. A note that runs long stops sounding like a
   person and starts sounding like a card.
2. SPECIFIC TO THAT WEEK. Name something that actually happens in those seven
   days: the activity, the mess, the thing that will go wrong, the day that
   will be hard. Read the week before you write about it. A note that could
   sit on any week of the year has failed.
3. NEVER GENERIC PRAISE. No "you are doing an amazing job", no "she is lucky
   to have you", no "I don't know how you do it". The spec bans this outright
   and it is the easiest failure to fall into.
4. NO GRATITUDE PERFORMANCE. He can be grateful. He cannot perform it.
5. ADMIT THINGS. The best material in these notes is what he gets wrong, what
   he misses, what he does not see, and what he is guessing at from a
   distance. A note where he is wise and she is tired is the wrong shape.
6. NEVER INSTRUCT HER. He is not her supervisor. He does not tell her how to
   parent, how to feel, or what to notice. If a note starts explaining the
   week to her, cut it.
7. VARY THE OPENING. Do not start every note with "Brooklyn,". Week 1 uses it
   because it is the first. Across 52 notes it becomes a tic.
8. VARY THE SHAPE. Some are about the week ahead. Some about something that
   happened. Some about one of the children. Some about her. Some about him.
   Some are almost a joke. Two or three across the year can be very short.
9. NO EM DASHES. No adverbs (really, just, literally, genuinely, honestly,
   simply, actually, deeply, truly, fundamentally). No binary contrasts
   ("not X, it's Y"). No dramatic fragments. No rhetorical questions as
   openers. US English throughout.
10. NO SENTIMENTALITY THE REST OF THE BOOK WOULD NOT WRITE. The book is warm
    and practical for 365 days. The notes are warmer, and still practical.

FORMAT. Replace the whole existing note body, keeping the heading and the
surrounding structure:

### 💛 A Note from Joseph

> [the note, blockquote, wrapped near 78 columns]

DELETE the draft marker line "> *(Draft. Rewrite this. I can guess the shape
of it, not the feeling.)*" and the bare ">" line under it. These are finished
notes now.
`

const MONTHS = [
  { key: 'jan', pre: '01', name: 'January', weeks: [1, 5],
    arc: `The year opens. Week 1 already has its note and is the model: leave that one alone and write weeks 2 to 5. This month is about starting, and about how quickly starting becomes ordinary. Kreston is 6 then 7 months. Deep winter, dark early, everyone indoors. Week 3 carries Martin Luther King Jr. Day. Somewhere in here he should admit the book was partly built to make himself feel less absent.` },
  { key: 'feb', pre: '02', name: 'February', weeks: [6, 9],
    arc: `The hardest stretch of winter and the month nobody writes songs about. Valentine's Day falls in week 7, Presidents' Day the day after. Kreston is 8 months and crawling, which changes the floor. One of these notes should be about the shortest, flattest kind of day, and should not try to redeem it.` },
  { key: 'mar', pre: '03', name: 'March', weeks: [10, 13],
    arc: `Light coming back, mud, wind. St Patrick's Day in week 11, the spring equinox and Good Friday in week 12, Easter Sunday in week 13. Kreston is 9 months, pulling to stand, pincer grip, into everything small. A note about how much of the year has already gone would land here.` },
  { key: 'apr', pre: '04', name: 'April', weeks: [14, 18],
    arc: `Growing things, rain, Earth Day in week 16. Kreston moves from 9 to 10 months and starts cruising the furniture. Azlyn is deep in three. One note here should be about something Azlyn said that he only heard about second hand, and what that is like.` },
  { key: 'may', pre: '05', name: 'May', weeks: [19, 22],
    arc: `Mother's Day is Day 129, in week 19, and that note is the biggest of the year so far. It must not be a card. It should be the least sentimental note in the book and land hardest for it. Memorial Day in week 22. Kreston is 11 months and about to walk.` },
  { key: 'jun', pre: '06', name: 'June', weeks: [23, 26],
    arc: `Kreston turns ONE on Day 156, in week 23. Juneteenth and Father's Day both fall in week 25, and the Father's Day note is Joseph writing about being the one celebrated for a job she is doing. Handle that honestly. Summer solstice in week 25. Heat arriving.` },
  { key: 'jul', pre: '07', name: 'July', weeks: [27, 31],
    arc: `Independence Day in week 27. Heat, long days, everyone outside and sticky. Kreston is 13 months and walking, which means the whole house changed shape. The halfway point of the year passes in this month, and one note should mark it without ceremony.` },
  { key: 'aug', pre: '08', name: 'August', weeks: [32, 35],
    arc: `The flat, heavy end of summer. Nothing to look forward to, the heat has stopped being fun, and everyone is tired of each other. This is the month to write the most honest note about how long a year is. Kreston is 14 to 15 months, scribbling, stacking, saying a few words.` },
  { key: 'sep', pre: '09', name: 'September', weeks: [36, 39],
    arc: `Labor Day in week 36. Joseph's own birthday is Day 256, in week 37, and that note should be about being celebrated for getting older while she does the actual days. Autumn equinox in week 38. Light going. Kreston is 15 months and running.` },
  { key: 'oct', pre: '10', name: 'October', weeks: [40, 44],
    arc: `The densest holiday block: Indigenous Peoples' Day in week 41, then Diwali, Halloween and Dia de los Muertos landing across weeks 43 and 44. Dark by six. Kreston is 16 months, copying chores, ten words and climbing. One note about how she has done nine months of this.` },
  { key: 'nov', pre: '11', name: 'November', weeks: [45, 48],
    arc: `Veterans Day in week 45, Thanksgiving in week 47. The flattest, greyest month, dark by five. Kreston is 17 months. The Thanksgiving note is the one place he can be plainly grateful, and it still must not perform. One note should be about the year nearly being over and how that feels from where he stands.` },
  { key: 'dec', pre: '12', name: 'December', weeks: [49, 52],
    arc: `The end. Azlyn turns FOUR on Day 354 in week 51, which is the last week she is three. The winter solstice follows. Week 52 carries Hanukkah, Christmas and Brooklyn's own birthday on Day 363, and it is the last weekly note in the book. Kreston is 18 months and a full participant. The week 52 note is the hardest thing to write in the whole book: it closes a year she carried, on her birthday, four days before it ends. Do not let it become a speech.` },
]

phase('Write')

const results = await pipeline(
  MONTHS,

  (m) => agent(
`Write the Notes from Joseph for ${m.name}, weeks ${m.weeks[0]} to ${m.weeks[1]}.
${VOICE}

THIS MONTH'S ARC, which is your territory and nobody else's:
${m.arc}

YOUR FILES, one note per file, in the "### 💛 A Note from Joseph" section of
each week opener:
${Array.from({length: m.weeks[1] - m.weeks[0] + 1}, (_, i) =>
  `  ${REPO}\\months\\${m.pre}-${m.key}-w${m.weeks[0] + i}.md`).join('\n')}

READ EACH WEEK BEFORE YOU WRITE ITS NOTE. The seven days, the theme, what
actually happens, what will be hard. A note that is not about that specific
week has failed the only rule that matters here.

ALSO READ the existing note in ${REPO}\\months\\01-jan-w1.md for the voice.
${m.key === 'jan' ? 'DO NOT CHANGE WEEK 1. It is the model. Write weeks 2 to 5 only, and remove the draft marker from week 1 while leaving its text alone.' : ''}

Write ${m.weeks[1] - m.weeks[0] + 1} notes. Make them different from each
other: different openings, different lengths, different subjects. If two of
yours could be swapped without anyone noticing, rewrite one.

RETURN: for each week, its first six words and one line on what the note is
about, so a later pass can check the 52 do not repeat each other.`,
    { label: `notes:${m.key}`, phase: 'Write', effort: 'high' }
  )
)

phase('Sweep')

const sweep = await agent(
`Read all 52 Notes from Joseph together and fix what only shows up at that
scale. ${VOICE}

THE FILES: every week opener in ${REPO}\\months\\, the section
"### 💛 A Note from Joseph" in each of:
${MONTHS.map(m => Array.from({length: m.weeks[1] - m.weeks[0] + 1}, (_, i) =>
  `${m.pre}-${m.key}-w${m.weeks[0] + i}.md`).join(', ')).join('\n  ')}

Twelve agents wrote these in parallel and could not see each other's work.

FIND AND FIX:
1. REPEATED OPENINGS. If more than three notes open with "Brooklyn," or more
   than two open the same way, rewrite the later ones.
2. REPEATED MOVES. The same admission made twice, the same joke, the same
   "I know I am not the one in them" beat. Week 1 owns that line; nobody else
   may reuse its shape.
3. GENERIC PRAISE that survived: any "amazing", "incredible", "lucky to have
   you", "I don't know how you do it". Cut and replace.
4. VOICE DRIFT: any note that sounds like a different person, or that lapses
   into instructing her, or explaining her own week to her.
5. LENGTH: any note over about eight sentences.
6. STYLE: em dashes, banned adverbs, binary contrasts, Wh- sentence openers.
7. ANY REMAINING DRAFT MARKER: "*(Draft. Rewrite this...)*" must be gone from
   all 52, along with the bare ">" line that followed it.
8. THE ARC. Read them in order, 1 to 52. Does the year build? Week 1 is a man
   handing over a book. Week 52 is the same man a year later, on her birthday,
   at the end of a year she carried. If the middle is flat, say which notes
   need lifting and lift them.

Edit the files directly. Then RETURN a list of every change you made, and one
honest paragraph on whether these 52 notes read like one person wrote them to
one person across a year.`,
  { label: 'sweep:all-52', phase: 'Sweep', effort: 'high' }
)

return { results, sweep }

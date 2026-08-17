export const meta = {
  name: 'notes-revision',
  description: 'Break the monotony of move in the 52 notes and fix three factual errors',
  phases: [{ title: 'Revise', detail: 'one agent per booklet month' }],
}

const REPO = 'C:/Users/Josep/The-Big-Book-of-Little-Days-2027'
const AUDIT = REPO + '/tools/pipeline/AUDIT-NOTES.txt'

const BRIEF = `
Joseph is the father. He wrote this book for Brooklyn, the mother of his two
children, to use with Azlyn and Kreston. He is not in the house during these
hours. She is.

AN ADVERSARIAL READ OF ALL 52 NOTES FOUND ONE DOMINANT PROBLEM, and it is not
falseness. The voice is dry, specific, and never flatters her. There is no
generic praise anywhere in the set. The problem is MONOTONY OF MOVE.

About FORTY of the fifty-two run the same engine: I planned this from outside
the room and the cost lands on you. Week 1's admission was meant to be week
1's. It became the chassis of the year. Samples:
  w7  "I set the rule at a desk in December and put myself nowhere near the cost"
  w10 "I wrote that sitting at a desk. You are the one stepping over the rope"
  w17 "That was a man at a kitchen table in January, pleased with himself"
  w24 "it takes me two seconds to type and takes you seven mornings to do"
  w33 "A whole week of things that get washed away was an easy week to plan"
  w45 "laid out by somebody who was not going to be standing in any of it"

And about FOURTEEN close on the same request: tell me, send me, photograph it,
prop the phone, I want to see it.

THE WAY OUT IS ALREADY IN THE BOOK. Week 35 refuses the move outright: "I am
not going to write you a paragraph about how far along we are." Weeks 26, 29,
41, 43, 44 and 47 already just say the specific thing he noticed, and the
auditor called them the strongest in the set.

WHAT A NOTE CAN BE INSTEAD. Something he noticed. Something Azlyn did that he
only heard about. A thing he got wrong that has nothing to do with distance.
Something about Kreston. Something about her that is observation rather than
praise. A joke. A memory from before the children. A note that asks for
nothing at all, of which the year has almost none. Two or three across the
year can be very short.

RULES THAT DO NOT CHANGE: five to eight sentences, specific to that week's own
seven days, never generic praise, never performed gratitude, never instructing
her. Vary the opening and do not start with "Brooklyn,". US English. No em
dashes, no adverbs, no binary contrasts, no dramatic fragments, no Wh-
sentence openers. Prose wraps near 78 columns. LF endings.

DO NOT TOUCH WEEK 1. It is the model and it owns the admission.
`

const M = [
  { k: 'jan', pre: '01', w: [1, 5],
    job: 'Weeks 2 and 4 carry the desk confession. Strip it from ONE of them and let that note be the specific thing he noticed instead. Leave week 1 completely alone.' },
  { k: 'feb', pre: '02', w: [6, 9],
    job: 'Weeks 7 and 8 both carry it. Strip it from both. Week 9 closes on an ask and should lose it: a note that asks for nothing is a shape the year barely has.' },
  { k: 'mar', pre: '03', w: [10, 13],
    job: 'Weeks 10, 11, 12 and 13 ALL carry it, four in a row. Keep it in at most one. Weeks 10 and 13 also close on the same request shape; cut one of those.' },
  { k: 'apr', pre: '04', w: [14, 18],
    job: 'Weeks 16 and 17 carry it. Strip both. Weeks 14, 15 and 16 all close on an ask; keep one. Week 16\'s "Send me the photograph. I want the whole set of four" is the most demanding line in the book and should go.' },
  { k: 'may', pre: '05', w: [19, 22],
    job: 'Week 20 carries it and week 22 half carries it. Strip week 20\'s. Weeks 19, 20 and 22 all close on an ask; keep at most one. Week 19 is Mother\'s Day and the auditor did not fault it, so change it as little as possible.' },
  { k: 'jun', pre: '06', w: [23, 26],
    job: 'Week 24 carries it AND contains a factual error: it claims something about his own writing that is off by half. Read the audit entry for week 24, check the claim against the actual day page, and correct it. Week 26 is one of the strongest in the book, so leave it alone.' },
  { k: 'jul', pre: '07', w: [27, 31],
    job: 'Week 31 carries it and begins the flat stretch. The arc goes dead across weeks 31 to 34: four notes in a row that all say the heat beat my planning. Week 31 must break that pattern and do something else entirely.' },
  { k: 'aug', pre: '08', w: [32, 35],
    job: 'THIS IS THE FLATTEST STRETCH IN THE BOOK. Weeks 32, 33 and 34 all run the same move and the auditor named this the place the year goes dead. Rewrite 32, 33 and 34 so each does something different: one about Kreston, one that is almost a joke, one very short. Week 32 also has a FACTUAL ERROR: it puts him home after bedtime, when about ten other notes put him home at six. Fix it. LEAVE WEEK 35 ALONE, it refuses the move and the auditor called its opening the best sentence in the book.' },
  { k: 'sep', pre: '09', w: [36, 39],
    job: 'Week 36 carries the confession. Strip it. Week 37 is Joseph\'s own birthday and the auditor verified its detail, so leave it.' },
  { k: 'oct', pre: '10', w: [40, 44],
    job: 'Weeks 41, 43 and 44 were named among the strongest in the book. Leave 41 and 43 alone. Week 44 closes on "Hold the phone low if you film it", one of the fourteen asks; cut that line only and change nothing else in it.' },
  { k: 'nov', pre: '11', w: [45, 48],
    job: 'Weeks 45 and 46 carry the confession. Strip both. Week 47 was named among the strongest, so leave it.' },
  { k: 'dec', pre: '12', w: [49, 52],
    job: 'Week 49 closes on an ask; cut it. Week 50 has the worst factual error in the set. It says "A trail of flour comes across the hall toward the door on Thursday night, laid by her for me to find. I get to walk in on that." The day page says the ADULT lays it on the KITCHEN floor on WEDNESDAY night after Azlyn is asleep, AZLYN finds it at eight the next morning with a flashlight, and it is wiped off the floor at four, two hours before he gets home. Wrong night, wrong person laying it, wrong person finding it, and gone before he arrives. Rewrite it to what actually happens: she wakes to it, and the thing he misses is her face at eight in the morning in the dark with a flashlight. WEEK 52 is the last note in the book. It currently repeats week 1 almost word for shape and slips a directive into her birthday week. It should not mirror week 1 and should not tell her to do anything. It is her birthday and the end of a year she carried.' },
]

phase('Revise')

const out = await pipeline(
  M,
  (m) => agent(
`Revise the Notes from Joseph for ${m.k.toUpperCase()}, weeks ${m.w[0]} to ${m.w[1]}.
${BRIEF}

THE FULL AUDIT: ${AUDIT} — read the findings that name your weeks.

YOUR FILES, the "### 💛 A Note from Joseph" section in each:
${Array.from({ length: m.w[1] - m.w[0] + 1 }, (_, i) =>
  `  ${REPO}/months/${m.pre}-${m.k}-w${m.w[0] + i}.md`).join('\n')}

YOUR SPECIFIC JOB:
${m.job}

READ EACH WEEK'S SEVEN DAYS before you rewrite its note. Every replacement
must name something that actually happens in that week. Check any factual
claim against the day page rather than trusting the note in front of you:
three of the fifty-two turned out to be wrong about their own week.

RETURN: for each week you changed, the old first six words, the new first six
words, and one line on what the note is about now.`,
    { label: `revise:${m.k}`, phase: 'Revise', effort: 'high' })
)

return out

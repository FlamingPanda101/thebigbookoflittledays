# HANDOFF — where this is, and how to carry on

Last session ended after October. Read `CLAUDE.md` and `CONTINUATION.md`
first; this file only covers what a fresh session cannot work out for itself.

## Where the book is

**308 of 365 days written, validated and pushed.** Weeks 1–44, January
through October. Last commit `a68849f`.

| Booklet | Weeks | Days | Status |
|---|---|---|---|
| January | 1–5 | 1–35 | done |
| February | 6–9 | 36–63 | done |
| March | 10–13 | 64–91 | done |
| April | 14–18 | 92–126 | done |
| May | 19–22 | 127–154 | done |
| June | 23–26 | 155–182 | done |
| July | 27–31 | 183–217 | done |
| August | 32–35 | 218–245 | done |
| September | 36–39 | 246–273 | done |
| October | 40–44 | 274–308 | done |
| **November** | **45–48** | **309–336** | **NOT WRITTEN** |
| **December** | **49–52** | **337–364** | **NOT WRITTEN** |

## What is left

1. **November, weeks 45–48.** A run was in flight when the session ended and
   its output is gone. Start it again from scratch.
2. **December, weeks 49–52.** Azlyn turns **four on Day 354**, so Days 354–365
   must call her four and Days 1–353 three. The briefs carry `azlyn_age` per
   day; do not work it out by hand.
3. **Day 365, the Grand Finale.** Sits outside the week structure and needs
   writing by itself. It opens the time capsule sealed on Day 1 and the
   message bottle sealed on Day 209.
4. **Week 52's Around the World sidebar.** The last of the three v1 gaps.
   Weeks 27 and 33 are written ("What Countries Eat on Their Big Day", "The
   Colour of the Cover"). Week 52 needs one for Reflection & Winter Holidays.
5. **Eleven booklet covers**, February through December. January's is
   `months/01-jan-00-cover.md` and is the model.
6. **Backup sections**, 12 months x (2 bad weather days, 2 sick days, 1 extras
   page) = 60 pieces, roughly 55,000 words. These are written against a
   month's real weather, so they belong in their own pass after Day 365.

## The pipeline, preserved in `tools/pipeline/`

Everything below lived in a session scratchpad and was copied into the repo so
it survives. Paths inside the workflow `.js` files still point at the old
scratchpad and **must be updated** before re-use.

| File | What it does |
|---|---|
| `buildyear.py` | Writes one JSON brief per week into `weeks/`. Computes every date from the real calendar, allocates insight headlines from the clean pool, and skips weeks already written. |
| `checkweeks.py` | The pre-merge gate. Run on generated weeks before they touch `months/`. |
| `mergeweeks.py` | Merges generated weeks into `months/` and regenerates `titles.tsv` from source. |
| `audit.py` | Whole-book audit. Run against `months/` any time. |
| `wc.py` | Per-day prose word counts. |
| `revertday.py` | Restores one day block from a baseline copy. |
| `workflows/writeweeks.workflow.js` | The six-stage week writer: plan, draft, tighten, opener, verify, repair. Takes `args: [45,46,47,48]`. |
| `workflows/polish.workflow.js` | Insight-body extensions only. See the warning below. |
| `weeks/wkNN.json` | Briefs for weeks 45–52, already generated. |

### Running a month

```powershell
# 1. write it (args = the weeks)
#    Workflow: tools/pipeline/workflows/writeweeks.workflow.js  args [45,46,47,48]
# 2. snapshot the output before any edit pass
# 3. gate it
python tools\pipeline\checkweeks.py 45 46 47 48
# 4. merge, validate, rebuild, audit
python tools\pipeline\mergeweeks.py 11 nov 45 46 47 48
python tools\validate.py
Get-ChildItem months\*.md | Sort-Object Name | Get-Content | Set-Content "The-Big-Book-of-Little-Days-2027.md"
python tools\pipeline\audit.py
# 5. commit and push
```

## Things learned the hard way. Do not relearn them.

**Do not run a separate trim pass over finished days.** It was tried on three
months and damaged content in all three: a day compressed by 67 words while
already in band, losing the only line identifying its experiment's control
condition; the interval between three handprints that its insight was built
on; the failure mode a squeezing step exists to prevent; the line telling
Brooklyn a baby refusing grass is normal. An agent trimming one day out of
context trades meaning for word count. Tightening belongs inside the
writeweeks stage, where the agent holds the whole week.

**Days over the word ceiling are acceptable.** Several ship 30–135 words over.
Intact and coherent beats tight and gutted.

**State the counting method whenever you give an agent a word target.** Agents
count prose about 78 words lower than `wc.py` does, because they exclude
materials lists. Twice an agent "corrected" a day its own count said was fine.

**Draft agents fail on long runs.** Writing seven days takes 38–41 minutes and
236–277k tokens, and transient API errors ("connection lost mid-response")
killed five agents across two months. Worse, one reported success having
written 1 day of 7. The draft stage now counts its own day anchors before
returning and the tighten stage refuses a file without exactly seven. If
failures stay frequent, split the draft into two half-week agents.

**Read whole days, not sections.** The three worst defects found were all
contradictions *between* correct-looking sections: a step inviting a child to
lick an ice block the Safety line kept off her face; a Get Outside handing her
cow parsley that the Safety block reserved for the adult because of hemlock
and giant hogweed lookalikes; a step giving a three-year-old scissors the
materials list marked adult-only. Section-by-section checking finds none of
these.

**Name the holiday.** Day 305 built a full Día de los Muertos ofrenda,
marigold path and photographs of the dead, without ever naming it. A parent
would have followed every step not knowing what they were making.

**`tools/insight-pool.md` is the clean pool, not `v1-insights.md`.** v1 wrote
its 425 headlines before the style rules existed; 35 carried em dashes,
adverbs, binary contrasts or hidden-actor passives and have been fixed. The
original harvest is kept untouched for reference.

## Verification status

`tools/validate.py` and `tools/pipeline/audit.py` both pass on all 308 days.

The audit checks day sequence, every date and weekday against the real 2027
calendar, 16 schedule rows and 2 page breaks per day, all nine sections,
Main Event 4–6 steps, Second Main 5–7, Afternoon Alternatives 3–4 bullets,
Out Again 4–6, Kreston's age against the month table on every day, Azlyn's
age flip at Day 354, sidebar placement, all 31 holidays, prose em dashes,
banned adverbs, duplicate titles across the whole book, and that every week
opener quotes its own seven insight headlines.

924 activity titles and 308 insight headlines, all unique.

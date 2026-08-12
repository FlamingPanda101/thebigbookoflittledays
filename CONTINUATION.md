# CONTINUATION SPEC
### Read this first if you're picking up *The Big Book of Little Days*

---

## ⚠️ RULE ZERO

**Never overwrite the working file.** Commit to git before any bulk edit. Never use `.` with the DOTALL flag inside a repeated group in a regex — a single one destroyed a completed version of this book. Parse the document into blocks and reassemble rather than doing regex surgery on the whole file. After every scripted pass, assert the day count is still correct and refuse to save if not.

---

## THE FAMILY

| Person | Role | Notes |
|---|---|---|
| **Brooklyn** | Mom — the book's reader | Birthday **Dec 29** → Day 363 |
| **Joseph** | Dad — the book's author | Birthday **Sep 13** → Day 256 |
| **Azlyn** | Primary learner, girl, he/she: **she** | Turns **4 on Dec 20** → Day 354 |
| **Kreston** | Secondary, boy, **he/him** | Turned **1 on June 5** → Day 156 |

Use their names throughout. Never "your child" or "the baby."

---

## CALENDAR

**Day 1 = Friday, January 1, 2027. Day 365 = Friday, December 31, 2027.**

Every day header carries its real date. Every week header carries its date range.

### Remaining holidays (verify by search before writing)

| Day | Date | Holiday |
|---|---|---|
| 249 | Sep 6 | Labor Day *(bonus note)* |
| **256** | **Sep 13** | **🎈 Joseph's birthday — full day** |
| 284 | Oct 11 | Columbus / Indigenous Peoples' Day *(bonus note)* |
| 302 | Oct 29 | 🪔 Diwali — full day |
| 304 | Oct 31 | 🎃 Halloween — full day |
| 305 | Nov 1 | 💀 Día de los Muertos — full day |
| 315 | Nov 11 | Veterans Day *(bonus note)* |
| 329 | Nov 25 | 🦃 Thanksgiving — full day |
| **354** | **Dec 20** | **🎈 Azlyn turns 4 — full day** |
| 358 | Dec 24 | 🕎 Hanukkah begins — full day |
| 359 | Dec 25 | 🎄 Christmas — full day |
| **363** | **Dec 29** | **🎈 Brooklyn's birthday — full day, she gets the day off** |
| 365 | Dec 31 | 🎂 Grand Finale + New Year's Eve |

---

## ⚡ PRE-WRITTEN HOLIDAY DAYS — ALL SLOTTED IN

All dated holiday days have been written and placed in their weeks.
`drafts/` is gone. Nothing is pending.

---

## REMAINING WEEK THEMES

| Wk | Days | Theme |
|---|---|---|
| 34 | 232–238 | Backyard Carnival |
| 35 | 239–245 | Music & Movement |
| 36 | 246–252 | Community Helpers *(Labor Day)* |
| 37 | 253–259 | Backyard Explorers *(Joseph's birthday)* |
| 38 | 260–266 | Colors & Shapes Studio |
| 39 | 267–273 | Letters & Sounds |
| 40 | 274–280 | Numbers & Counting |
| 41 | 281–287 | Things That Go *(Columbus/IPD)* |
| 42 | 288–294 | Space Explorers |
| 43 | 295–301 | Insects & Minibeasts |
| 44 | 302–308 | Dinosaur Discovery *(Diwali, Halloween, Muertos)* |
| 45 | 309–315 | On the Farm *(Veterans Day)* |
| 46 | 316–322 | Weather & Rainbows |
| 47 | 323–329 | Seasons & Nature Cycles *(Thanksgiving)* |
| 48 | 330–336 | Kitchen Helpers |
| 49 | 337–343 | Storybook Village |
| 50 | 344–350 | Animal Kingdom |
| 51 | 351–357 | Water & Weather Wonders |
| 52 | 358–364 | Reflection & Winter Holidays *(Hanukkah, Christmas)* |
| — | 365 | Grand Finale |

---

## WEEK OPENER FORMAT

Every week begins with a briefing page before the first day:

```markdown
<a id="week-N"></a>

## Week N: [Theme] [emoji]
**📅 [Month D – Month D, YYYY]**

---

### 🎯 What This Week Is About
[2 short paragraphs: the through-line of the week, and any holiday landing in it.]

---

### 🧒 What Azlyn Will Learn
- [5 bullets. Concrete skills, bolded lead-in, plain explanation after.]

---

### 👩 What You'll Learn
- [The 7 insight headlines from that week's days, listed verbatim minus the full stop.]

---

### 🛒 This Week's Shopping List

> *Everything the week's activities call for. Check what you've already got before Monday.*

- [ ] [every item from that week's Materials Lists, deduped, one flat list]

---

> 👶 **Kreston is around N months this week** — [capability].

---
```

**Rules:**
- Lists are drawn from the week's seven days only — **not** the backup days, which are optional.
- One flat list — **no buy/already-have split.** Complete, including things she probably owns, so she can check stock before Monday.
- There is **no monthly shopping list.** Booklet covers go straight from contents to safety reminders.

---

---

## 🌤️ THE AFTERNOON BLOCK

Every day runs **9:00 AM – 6:00 PM**. The morning is the taught part; the
afternoon is the lived part, and it is deliberately lighter.

**Schedule lines appended to every day, after `12:00 PM — Lunch`:**

```
- **12:45–2:30 PM** — Nap, or Quiet Time in her room
- **2:30–3:00 PM** — Slow Start: [named, low-demand]
- **3:00–4:00 PM** — Afternoon Thread: [named]
- **4:00–5:00 PM** — [Out Again / Jobs / Free Play — named]
- **5:00–5:45 PM** — Wind-Down: [named]
- **6:00 PM** — Dinner
```

Azlyn is three and may or may not still nap — **never assume she does.**
The line always reads "Nap, or Quiet Time in her room" so the block works
either way.

**Section, inserted immediately before the `---` that precedes the
Parenting Insight:**

```markdown
### 🌤️ The Afternoon
**Slow Start —** [1 sentence. Something to wake up into. No materials.]
**Afternoon Thread —** [2–3 sentences. USUALLY A RETURN to the morning's
activity, not a new one — the thing she built, planted, started or
half-finished. This is the core of the block.]
**Out Again —** [1–2 sentences. Second dose of outside, short, often the
same place as the morning.]
**Jobs —** [1 sentence. One real household job she owns, tied to dinner
where possible.]
**Wind-Down —** [1–2 sentences. Bath, book, quiet floor play. Lands at
dinner.]

> 👶 **Kreston's Afternoon:** [1 sentence, his real age]
```

**Rules**
- 120–160 words total. The afternoon is not a second Main Event.
- **No new materials lists.** If it needs shopping, it belongs in the morning.
- Prefer returning to the morning's work over introducing anything new.
- One real job per day — laying the table, sweeping, feeding the birds.
- Never schedule anything that must succeed. This block is allowed to
  dissolve into free play and still count as done.
- Days that already have Evening content (moon journal, candles,
  fireworks) keep it — the block wraps around it.

---

## DAILY PAGE FORMAT

Every day follows this structure exactly:

```markdown
<a id="day-N"></a>

## 🌟 Day N: [Title] 🌟
**📅 [Weekday, Month D, YYYY]**
**Theme:** [week theme]

### ⏰ At-a-Glance Schedule
- **9:00–9:15 AM** — Morning Meeting (15 min)
- [...through to] **12:00 PM** — Lunch & Nap Prep

### 🎨 The Main Event: [name]
**🧰 Complete Materials List:**
- [every item, with quantities]

**📝 Step-by-Step Instructions:**
1. [self-contained — never link out]

> 💡 **Tip:** [the practical "what actually helps" note]

### 🌳 Get Outside: [specific named activity]
[2–3 sentences]

> 👶 **Infant Integration:** [Kreston, at his real age that week]

---

> 🧠 **A Little Parenting Insight**
> **[Bold claim as a headline.]**
> [~100 words. Framed as "here's why what you already do works," never corrective.
> Real developmental content. Must not repeat an earlier insight.]

> 💛 **From Joseph:** [one line, specific and warm — never generic praise]

<div style="page-break-after: always;"></div>
```

### Hard requirements

- **Every Main Event unique** across all 365 days.
- **Every Get Outside is a specific named activity** — never generic "Park Trip." Season-matched.
- **One 🌍 Around the World box per week**, attached to one day. Fact + ✨ Try it (food-forward) + *Did you know?*
- **Insight count and love-note count must equal the day count** in each file.
- Tone: warm, practical, never preachy. Written to a competent adult.

---

## KRESTON'S AGE BANDS

| Days | Age | Capability |
|---|---|---|
| 226–285 | 14–16 mo | Toddling confidently, scribbling, first words |
| 286–345 | 16–18 mo | Running, climbing, playing alongside his sister |
| 346–365 | 18–19 mo | Full participant — follows directions, copies everything |

Each week header opens with his approximate age and what it means. By this stage he is **not** "watching from a blanket" — he has his own materials and real one-step jobs. Water-safety language stays firm.

---

## BOOKLET STRUCTURE

Twelve printable booklets, split by whole weeks:

Jan 1–5 · Feb 6–9 · Mar 10–13 · Apr 14–18 · May 19–22 · Jun 23–26 · Jul 27–31 · Aug 32–35 · Sep 36–39 · Oct 40–44 · Nov 45–48 · Dec 49–52 + Day 365

Each booklet opens with:
1. `<a id="booklet-[month]"></a>` + cover (title, "Booklet N of 12", date range, dedication)
2. **This Month** contents with links
3. Kreston's age note
4. *(No monthly shopping list — each week carries its own)*
5. **⚠️ Quick Safety Reminders** — season-specific

Each booklet **ends** with a backup section:
- `<a id="backup-[month]"></a>`
- **2 Bad Weather Days** — full day plans, written for *that month's* actual weather
- **2 Sick Days** — no outdoor section; a rest/wind-down block instead; vague schedules ("whenever she wakes")
- **1 Extra Ideas page** — split into 🎲 Alternative Activities and 🎨 Alternative Arts & Crafts, ~11 each, plus a "Kreston's Turn" entry
- Anchors: `[mon]-weather-1`, `[mon]-weather-2`, `[mon]-sick-1`, `[mon]-sick-2`, `[mon]-extras`
- Backup days carry insights and love notes too

---

## NAVIGATION

Use **explicit HTML anchors**, not auto-generated heading IDs — emoji in headings break slug generation in most markdown→PDF converters.

- `<a id="day-N"></a>` before every day header
- `<a id="week-N"></a>` before every week header
- `<a id="booklet-month"></a>` before every booklet cover
- `<div style="page-break-after: always;"></div>` after every day and every booklet

---

## STILL TO BUILD (back matter)

Once Day 365 is done, three things remain:

1. **Master Activity Index** — every backup day and extra-ideas entry across all 12 booklets, indexed by *need*: messy / no-mess / 10 minutes / burns energy / calms them down / cardboard box only / teaches letters / teaches counting. Each entry links **and** gives a human-readable location (`🌧️ January · Bad Weather Day 1`). Anchor: `<a id="index"></a>`
2. **Keepsake Tracker** — time capsule (Day 1, opened Day 365), growth chart, memory jar (Day 132), season journals, handprint art, birthday interviews. Anchor: `<a id="keepsake"></a>`
3. **Closing note** — short sign-off, ending on the line about how on the days when nothing gets done, they still got her all day, and that was always the actual curriculum.

Also update the front-matter TOC in `months/00-front.md` if any structure changes.

---

## WORKFLOW

1. Write each week-block to its own file in `months/`.
2. Reassemble with `cat`.
3. Validate day count, gaps, insight count, love-note count.
4. **Commit and push.**

Never edit the assembled file directly — it's generated.

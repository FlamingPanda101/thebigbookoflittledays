# ☀️ The Big Book of Little Days ☀️
### *A Year of Playing, Making & Growing with Azlyn & Kreston*
**365 Days · January 1 – December 31, 2027**

A complete day-by-day activity and lesson-plan book, written by Joseph for Brooklyn.

---

## What's here

| Path | What it is |
|---|---|
| `The-Big-Book-of-Little-Days-2027.md` | The assembled book. **This is the deliverable.** |
| `months/` | Source files, one or two per week-block. Edit these, then reassemble. |
| `CONTINUATION.md` | Build spec — read this first if you're picking the project up. |

---

## Current status

**Days 1–273 complete** (January 1 – September 30, 2027).

Remaining: Days 274–365 — October through December.

| Month | Days | Status |
|---|---|---|
| January | 1–35 | ✅ Complete |
| February | 36–63 | ✅ Complete |
| March | 64–91 | ✅ Complete |
| April | 92–126 | ✅ Complete |
| May | 127–154 | ✅ Complete |
| June | 155–182 | ✅ Complete |
| July | 183–217 | ✅ Complete |
| August | 218–245 | ✅ Complete |
| September | 246–273 | ✅ Complete |
| October | 274–308 | ⬜ Not started |
| November | 309–336 | ⬜ Not started |
| December | 337–365 | ⬜ Not started |

---

## Reassembling the book

```bash
cat months/00-front.md $(ls months/*.md | grep -v 00-front) \
  > The-Big-Book-of-Little-Days-2027.md
```

Then validate:

```bash
python3 -c "
import re
t=open('The-Big-Book-of-Little-Days-2027.md').read()
d=sorted(int(m.group(1)) for m in re.finditer(r'<a id=\"day-(\d+)\">',t))
print('days:',len(d),'| gaps:',[i for i in range(1,d[-1]+1) if i not in d])
print('insights:',t.count('A Little Parenting Insight'))
print('love notes:',t.count('**From Joseph:**'))
"
```

Day count and insight/note counts should always match.

---

## ⚠️ Rule Zero

**Never overwrite the working file.** Commit before any bulk edit. A single regex with `re.DOTALL` destroyed a completed version of this book once. Never use `.` with DOTALL inside a repeated group; parse into blocks and reassemble rather than doing regex surgery on the whole file.

After any scripted pass, assert the day count is still correct and refuse to save if not.

---

## Output

Intended for conversion to PDF — one master digital book with clickable navigation, plus twelve printable month booklets that can be bound separately.

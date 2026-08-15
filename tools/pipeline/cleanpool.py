"""Clean the 31 slop-carrying headlines in the v1 insight pool, once.

v1 wrote these before the stop-slop rules existed. Cleaning the pool up front
stops the same three-headline patch recurring for 47 more weeks.
Writes tools/insight-pool.md (clean) and leaves v1-insights.md untouched.
"""
import os
import re

REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"

SUBS = {
    # em dashes
    "Narrating beats quizzing — every time.":
        "Narrating beats quizzing, every time.",
    "Evidence and inference — a genuinely big idea, learnable at three.":
        "Evidence and inference, a big idea learnable at three.",
    "Interoception — the sense nobody lists.":
        "Interoception, the sense nobody lists.",
    "Naming a feeling reduces its intensity — measurably.":
        "Naming a feeling reduces its intensity, and the drop is measurable.",
    # adverbs
    "Working memory is the thing she's actually building.":
        "Working memory is the thing she is building.",
    "Patterns are the beginning of algebra, genuinely.":
        "Patterns are the beginning of algebra.",
    "Pretend play is where self-control is actually built.":
        "Pretend play is where self-control gets built.",
    "Ugly is fine. Actually, ugly is better.":
        "Ugly is fine. Ugly is better.",
    "The best activity is the one you actually have energy for.":
        "The best activity is the one you have energy for.",
    "Sensory bins buy focus, and it's not just novelty.":
        "Sensory bins buy focus, and novelty is not the reason.",
    "Two new years in one book is a genuinely useful idea.":
        "Two new years in one book is a useful idea.",
    "Sanctioned rule-breaking is genuinely good for a rule-following child.":
        "Sanctioned rule-breaking is good for a rule-following child.",
    "The transition seasons are the hardest, and it isn't just the weather.":
        "The transition seasons are the hardest, and the weather is only part of it.",
    "Symmetry is one of the first patterns children can produce, not just notice.":
        "Symmetry is one of the first patterns children can produce as well as notice.",
    "Family structure is genuinely confusing at three, and worth being explicit about.":
        "Family structure is confusing at three, and worth being explicit about.",
    "A sibling's birthday is genuinely hard, and preparation helps more than correction.":
        "A sibling's birthday is hard, and preparation helps more than correction.",
    "Repeating an activity across seasons produces a comparison she can actually make.":
        "Repeating an activity across seasons produces a comparison she can make herself.",
    "Historical injustice, explained honestly and simply, doesn't damage a three-year-old.":
        "Historical injustice, explained plainly, does not damage a three-year-old.",
    "The halfway point is worth marking for you, not just for her.":
        "The halfway point is worth marking for you as much as for her.",
    "Cozy is a real regulatory state, not just a mood.":
        "Cozy is a real regulatory state rather than a mood.",
    "Risk and reward is a genuinely new kind of decision.":
        "Risk and reward is a new kind of decision.",
    "A painted face changes behaviour, not just appearance.":
        "A painted face changes behaviour as well as appearance.",
    "High and low is a genuinely confusing pair of words.":
        "High and low is a confusing pair of words.",
    "Late summer is a genuinely low-energy stretch, and lowering the bar is the right response.":
        "Late summer is a low-energy stretch, and lowering the bar is the right response.",
    "What you actually do all day is more interesting to her than you think.":
        "Your own day's work is more interesting to her than you think.",
    "A field journal changes how she looks, not just what she records.":
        "A field journal changes how she looks as well as what she records.",
    "A copy of a thing teaches her what a fossil actually is.":
        "A copy of a thing teaches her what a fossil is.",
    "A character with a want is a story engine; a character with a name is just a doll.":
        "A character with a want is a story engine; a character with only a name is a doll.",
    "Thanking someone works when she can remember what the thing actually was.":
        "Thanking someone works when she can remember what the thing was.",
    "Writing to a future version of herself is a strange idea and she can just about hold it.":
        "Writing to a future version of herself is a strange idea, and she can almost hold it.",
    # binary contrast
    "Doing a job with her feet is not a joke, it's how she gets her whole body into it.":
        "Doing a job with her feet is how she gets her whole body into it.",
}

pool, seen = [], set()
with open(os.path.join(REPO, "tools", "v1-insights.md"), encoding="utf-8") as fh:
    for ln in fh:
        m = re.match(r"^- \*\*\d+\.\*\* (.+)$", ln.strip())
        if not m:
            continue
        h = SUBS.get(m.group(1).strip(), m.group(1).strip())
        k = h.lower().rstrip(".")
        if k in seen:
            continue
        seen.add(k)
        pool.append(h)

ADV = re.compile(r"\b(really|just|literally|genuinely|honestly|simply|actually|"
                 r"deeply|truly|fundamentally)\b", re.I)
bad = [h for h in pool if "—" in h or ADV.search(h)]
assert not bad, f"still dirty: {bad}"

out = os.path.join(REPO, "tools", "insight-pool.md")
with open(out, "w", encoding="utf-8", newline="\n") as fh:
    fh.write("# INSIGHT POOL — cleaned\n\n")
    fh.write("Harvested from v1, then cleaned under the writing-style rules in\n"
             "CLAUDE.md. v1 wrote these before those rules existed: 31 carried\n"
             "em dashes, adverbs or binary contrasts. `tools/v1-insights.md`\n"
             "keeps the untouched original.\n\n"
             "Draw from these. Log each one in `tools/titles.tsv` as it is used.\n\n")
    for i, h in enumerate(pool, 1):
        fh.write(f"- **{i}.** {h}\n")
    fh.write(f"\n_({len(pool)} headlines, all clean)_\n")

print(f"cleaned {len(SUBS)} headlines")
print(f"wrote tools/insight-pool.md: {len(pool)} unique, 0 style violations")

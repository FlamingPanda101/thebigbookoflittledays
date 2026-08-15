import io, sys

SP = r"C:\Users\Josep\AppData\Local\Temp\claude\C--Users-Josep--claude\f2051431-8954-4594-9860-3b743569602a\scratchpad"
src = SP + r"\blocks\opener.md"
dst = SP + r"\rewritten\opener.md"

t = io.open(src, encoding="utf-8", newline="").read()
orig_words = len(t.split())

R = [
# --- What This Week Is About, para 1 + 2 -------------------------------------
("""Building — towers, bridges, houses, forts. Every day asks the same question in
a different form: **what makes a structure stand up, and what makes it fall
down?** She will build seven things, knock most of them over, and rebuild them
better. That cycle is the week.

It is also the opening week of the year, so Day 1 seals the time capsule you
open on Day 365, starts the growth chart on the wall, and hangs the first of
twelve handprints. Those three threads run to December. Everything else this
week is cardboard.""",
"""This week she builds towers, bridges, houses and forts. Each day you put the
same question in front of her in a new shape: **what makes a structure stand
up, and what makes it fall down?** She knocks most of it over, rebuilds it
steadier, and runs that loop seven times.

This is also the first week of the year, so on Day 1 you seal the time capsule
you open on Day 365, start the growth chart on the wall, and hang the first of
twelve handprints. Those three threads run to December, and the rest of the
week runs on cardboard."""),

# --- What Azlyn Will Learn bullets -------------------------------------------
("- **Shape names in use** — circle, square, triangle — attached to real objects rather than flashcards.",
 "- **Shape names in use** (circle, square, triangle), attached to the boxes and cups in her hands."),

("- **That she can make a real thing** that stays in the house and gets used.",
 "- **That she can make a real thing** that stays in the house and that you use."),

# --- Shopping list em dashes --------------------------------------------------
("- [ ] Cardboard boxes, 10–15 in mixed sizes — start saving now",
 "- [ ] Cardboard boxes, 10–15 in mixed sizes (start saving now)"),

("- [ ] Washable non-toxic poster paint — red, blue, yellow, white",
 "- [ ] Washable non-toxic poster paint in red, blue, yellow and white"),

# --- A Note from Joseph -------------------------------------------------------
("""> *(Draft — rewrite this. I can guess the shape, not the feeling.)*
>
> Brooklyn — this is the first page of the first week, so let me be honest
> about what this book is. It is not a curriculum and it is not a standard to
> fall short of. It is me trying to hand you something at 8:00 in the morning
> so you don't have to invent a whole day from nothing while a six-month-old
> chews your sleeve. Skip what doesn't fit. Cross things out. The days you
> ignore this entirely will not be failures, they will be Tuesdays. I know
> exactly how long these hours are, and I know I am not the one in them.""",
"""> *(Draft. Rewrite this one in your own voice, the feeling is missing.)*
>
> Brooklyn, this is the first page of the first week. The book is me handing
> you something at 8:00 in the morning so you don't have to invent a whole day
> from nothing while a six-month-old chews your sleeve. Treat it as a menu.
> Skip what doesn't fit, cross things out, and leave whole pages blank. The
> days you ignore the page altogether are Tuesdays, and there will be plenty
> of them. I know how long these hours are, and I know I am not the one in
> them."""),

# --- Kreston box em dash ------------------------------------------------------
("**Kreston is 6 months this week** — he sits with his hands free, mouths",
 "**Kreston is 6 months this week**. He sits with his hands free, mouths"),
]

for old, new in R:
    if t.count(old) != 1:
        sys.exit("NO MATCH (%d): %r" % (t.count(old), old[:60]))
    t = t.replace(old, new)

assert "\r" not in t
assert not any(l != l.rstrip() for l in t.split("\n")), "trailing whitespace"
io.open(dst, "w", encoding="utf-8", newline="").write(t)
print("orig", orig_words, "new", len(t.split()),
      "delta %.1f%%" % ((len(t.split()) - orig_words) / orig_words * 100))

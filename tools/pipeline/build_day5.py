# builds rewritten/day5.md, splicing frozen lines byte-for-byte from the original
import io, os

SP = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(SP, "blocks", "day5.md")
dst = os.path.join(SP, "rewritten", "day5.md")

o = open(src, encoding="utf-8", newline="\n").read().split("\n")  # 0-based, o[0] == line 1

def K(*ns):            # keep original lines, 1-based
    return [o[n - 1] for n in ns]

def R(n, marker):      # reuse original prefix up to and including marker
    line = o[n - 1]
    i = line.index(marker) + len(marker)
    return line[:i]

out = []
out += K(1, 2, 3, 4, 5, 6, 7)                      # anchor, header, date, theme, prep heading
out += ["> The salt dough is mixed and waiting in the fridge. Take it out before bed so it comes to room temperature, and clear a low oven shelf."]
out += K(9, 10)                                    # blank, schedule heading
out += K(*range(11, 27))                           # schedule rows
out += K(27, 28, 29, 30, 31)                       # blank, opening heading, blank, materials, blank
out += [
"1. Give her a fist-sized lump and let her squash it for a few minutes before anything useful happens. The squashing is part of the hour, so let it run.",
"2. Let her roll it out to about a finger's thickness and leave the uneven patches where they are.",
"3. Cut rough rectangles with the table knife. They do not need to match, so aim for thirty and stop when she stops.",
]
out += K(35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45)   # main event heading + materials + steps label
out += [
"1. Lay the cut bricks on the lined tray without touching each other.",
"2. Let her press a mark into each one with her thumb, or scratch a line with the pencil. She owns the ones she marks.",
"3. Set them in the oven at its lowest setting. They need two to three hours, so put them in now and take them out around lunch.",
"4. While they bake, knead the leftover dough together. Give her a big lump, take one yourself, and sit with it for ten quiet minutes. She will come out of it calmer than she went in.",
"5. Make three or four larger pieces (a doorstep, an arch, a chimney) and add them to a second tray.",
"6. When they come out, spread them on a cold tray and leave them until 1:00, because warm bricks crumble.",
]
out += K(52)
out += [R(53, "**Tip:** ") + "They will not all survive. Bake ten more than you need and hand the broken ones back to her as rubble, which she will play with more than the whole ones."]
out += K(54, 55, 56)
out += [
"Keep it short and brisk today, because the oven is on. Look for frost on car",
"roofs and in the shade at the bottom of walls. Let her breathe out and watch",
"it. Find one brick wall and put her hand flat on it so she can feel how cold",
"stone gets and see how many bricks it took.",
]
out += K(61)
out += [
R(62, "**Kreston turns 7 months today.** ") + "He has started",
"> reaching across his own body for something on the far side, which is new, so",
"> seal a spare lump of dough in a freezer bag and set it a little past his",
"> midline for him to stretch towards. Keep it sealed, because salt dough is far",
"> too salty for him to eat. Say happy seven months out loud, because otherwise",
"> the day slides past unmarked.",
]
out += K(67, 68, 69, 70, 71)                       # page break, second main event heading
out += [
"She made the bricks this morning. This afternoon she finds out what they are",
"for, which is the lesson the whole week turns on.",
]
out += K(74, 75, 76, 77, 78, 79, 80, 81, 82, 83)   # materials list + steps label
out += [
"1. Lay a row of bricks in a straight line along the tray. Push them tight together.",
"2. Build a second row straight on top with every joint matching. Push it and watch the whole wall hinge apart.",
"3. Rebuild the second row offset, each brick bridging the gap below it. Push again. This one holds, and she will feel the difference in her hand.",
"4. Keep going up. Use the paste between rows like mortar if the wall gets tall enough to need it.",
"5. Leave a gap for a door and lay one long brick across the top of it. That is an arch, and it is holding up everything above it.",
"6. Build a second wall at a right angle to the first so they lean on each other.",
"7. Stand teddy inside. Photograph the wall next to the tower from Day 1.",
]
out += K(91)
out += [R(92, "**Tip:** ") + "Step three carries the whole activity. Do not explain the offset before she has seen the matched-joint wall fall apart, because she needs the collapse first for the fix to mean anything."]
out += K(93, 94, 95, 96, 97, 98, 99, 100)          # alternatives + out again heading
out += ["- **Swimming**, the weekly one and the first of fifty-two"]
out += K(102, 103, 104, 105, 106)
out += [
R(107, "**Kreston's Afternoon:** ") + "He has swimming today too if he is coming. At 7",
"> months he can sit supported in the water and splash with real intent. Keep it",
"> to twenty minutes and get him out before he is cold. Hold him chest to chest",
"> facing you for the first few minutes so the noise arrives with your face",
"> already in front of him.",
]
out += K(112, 113, 114, 115, 116)                  # rule, insight label, frozen headline
out += [
"> Push, squeeze and pull something that resists you, and you are doing what",
"> occupational therapists call heavy work, one of the steadiest ways to settle",
"> a small body. The pressure through her hands and joints feeds her",
"> proprioceptive sense, the one that tracks where her body is, and a kid who",
"> has lost track of it is the one climbing the back of the sofa. Dough costs",
"> pennies and pushes back for as long as she keeps working it. Ten minutes of",
"> it on a morning that has gone loud will settle her further than a talk about",
"> calming down.",
]
out += K(125)
out += [
R(126, "**Safety:** ") + "The oven is on for three hours today, so say it out loud",
"> when she comes near, and keep Kreston out of the kitchen while the trays",
"> move. Salt dough is dangerous if eaten, and worse for a 7-month-old and for",
"> any dog in the house. Count the bricks in and out and store them high.",
]
out += K(130, 131, 132)                            # blank, page break, trailing empty

txt = "\n".join(out)
assert not any(l.rstrip() != l for l in out), "trailing whitespace"
os.makedirs(os.path.dirname(dst), exist_ok=True)
open(dst, "w", encoding="utf-8", newline="\n").write(txt)

ow, nw = len(open(src, encoding="utf-8").read().split()), len(txt.split())
print("orig", ow, "new", nw, "delta %.1f%%" % ((nw - ow) / ow * 100))
print("ends same:", txt.endswith('<div style="page-break-after: always;"></div>\n'))

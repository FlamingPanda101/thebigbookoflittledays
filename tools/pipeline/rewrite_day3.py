# -*- coding: utf-8 -*-
"""Line-range surgery on day3.md so frozen lines stay byte-identical."""
import io, sys

SRC = r"C:\Users\Josep\AppData\Local\Temp\claude\C--Users-Josep--claude\f2051431-8954-4594-9860-3b743569602a\scratchpad\blocks\day3.md"
DST = r"C:\Users\Josep\AppData\Local\Temp\claude\C--Users-Josep--claude\f2051431-8954-4594-9860-3b743569602a\scratchpad\rewritten\day3.md"

orig = io.open(SRC, encoding="utf-8", newline="").read()
lines = orig.split("\n")          # keeps trailing '' from final newline

# (start, end) inclusive, 1-indexed -> replacement lines
EDITS = {
 (34, 34): [
  "3. Ask her where the next one should go so the bean keeps travelling. Tape it where she says, even if it will not work.",
 ],
 (46, 51): [
  "1. Put the catching box on the floor at the bottom. You aim the whole run at that box.",
  "2. Work upward. She chooses each next position, you tape it. Narrate as you go: *I'm taping this one steeper, let's see.*",
  "3. Send one bean down the whole run after each piece you add.",
  "4. It will fail somewhere. Look at where the bean stopped, change that one joint and nothing else, then test again.",
  "5. Once beans run the whole way, try pasta, then the ball. Each one takes the corners at its own speed, and she will spot that before you say anything.",
  "6. Leave it taped up. You take it down tomorrow as part of the demolition.",
 ],
 (53, 53): [
  "> \U0001F4A1 **Tip:** Hand her the words. *This end is higher than that end* teaches more here than *is this end higher or lower?*, and it keeps her building.",
 ],
 (57, 60): [
  "Find a puddle, a gutter or a gap between two stones and build a bridge across",
  "it with sticks. Test each one with a pebble. Most of them fall in. Ask her",
  "what a longer stick does, then what two sticks laid side by side do. Bring a",
  "spare pair of gloves, because these ones come home wet.",
 ],
 (62, 66): [
  "> \U0001F476 **Infant Integration:** Kreston is 6 months and tracks moving objects",
  "> across his whole field of view now. Sit him facing the ball run and drop a",
  "> bean down it while he watches. Do it four or five times. He loses the bean at",
  "> the top and finds it again at the bottom, which is early object permanence",
  "> work, and it costs you nothing beyond turning his seat toward the wall.",
 ],
 (72, 73): [
  "You spent the morning sending things downhill. This afternoon you both have to",
  "hold something up, and holding up is the harder job.",
 ],
 (86, 86): [
  "3. Ask *what could we change?* and wait. Odds are she says a bigger piece of card. Try it, and watch it sag again.",
 ],
 (88, 88): [
  "5. Test with teddy, then the tin of beans, then both at once.",
 ],
 (92, 92): [
  "> \U0001F4A1 **Tip:** Count to five in your head before you step in and help. She starts again on her own inside those five seconds most of the time, and she holds on to the fix she found herself.",
 ],
 (107, 110): [
  "> \U0001F476 **Kreston's Afternoon:** Lay him under the finished bridge and let him",
  "> look up through it. At 6 months he is rocking on hands and knees without",
  "> moving forward yet, so set the teddy a little past his reach on the far side",
  "> of the bridge. He rocks toward something he wants, and that is where crawling",
  "> starts.",
 ],
 (116, 123): [
  "> You will want to turn the morning into a quiz (*what colour is that? how",
  "> many? is it big or small?*), because her answers feel like proof that she",
  "> learned something. You end up with a three-year-old performing for an adult.",
  "> Give her the running commentary instead and she gets new vocabulary in a real",
  "> context, sentence structures she has not built yet, and no pressure to be",
  "> right. Parents who narrate hand their children more words to hear, and a",
  "> wider range of them. Save your questions for the ones you cannot answer",
  "> yourself, like *what could we change?* over a bridge that keeps sagging.",
 ],
 (125, 127): [
  "> \u26A0\uFE0F **Safety:** Dried beans and pasta are a choking hazard and they will end",
  "> up on the floor. Sweep before you put Kreston down, and keep the catching box",
  "> off the floor when he is loose in the room. Scissors stay with you.",
 ],
}

out, i = [], 0
n = len(lines)
starts = {s: (s, e) for (s, e) in EDITS}
while i < n:
    ln = i + 1
    if ln in starts:
        s, e = starts[ln]
        out.extend(EDITS[(s, e)])
        i = e
    else:
        out.append(lines[i])
        i += 1

text = "\n".join(out)
assert not any(l != l.rstrip() for l in text.split("\n")), "trailing whitespace"
io.open(DST, "w", encoding="utf-8", newline="").write(text)

# --- checks -------------------------------------------------------------
FROZEN_PREFIXES = ("<a id=", "## ", "**\U0001F4C5", "**Theme:**", "### ",
                   "- **", "<div style=", "> **")
o = orig.split("\n")
w = text.split("\n")
frozen_o = [l for l in o if l.startswith(FROZEN_PREFIXES)]
frozen_w = [l for l in w if l.startswith(FROZEN_PREFIXES)]
assert frozen_o == frozen_w, "FROZEN LINE CHANGED:\n" + "\n".join(
    "%r != %r" % (a, b) for a, b in zip(frozen_o, frozen_w) if a != b)
assert o[-1] == w[-1], "final line changed"

def count(t, pred):
    return sum(1 for l in t.split("\n") if pred(l))

ow, nw = len(orig.split()), len(text.split())
print("frozen lines identical:", len(frozen_o))
print("orig words", ow, "new words", nw, "delta %.1f%%" % ((nw - ow) * 100.0 / ow))
print("numbered steps orig/new:",
      count(orig, lambda l: l[:2] in ("1.", "2.", "3.", "4.", "5.", "6.", "7.")),
      count(text, lambda l: l[:2] in ("1.", "2.", "3.", "4.", "5.", "6.", "7.")))
print("bullets orig/new:", count(orig, lambda l: l.startswith("- ")),
      count(text, lambda l: l.startswith("- ")))
print("lines orig/new:", len(o), len(w))
print("em dash lines in new:", [l for l in w if "\u2014" in l and not l.startswith("- **")])

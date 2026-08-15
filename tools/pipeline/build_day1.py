# -*- coding: utf-8 -*-
import io, os

SRC = 'blocks/day1.md'
DST = 'rewritten/day1.md'

orig = io.open(SRC, encoding='utf-8', newline='').read().split('\n')
# orig[-1] == '' because file ends with newline

R = {}  # 0-based start index -> list of replacement lines (replaces run given in spans)

spans = []

def rep(start, end, lines):
    """replace orig[start:end] (0-based, end exclusive) with lines"""
    spans.append((start, end, lines))

# --- Prep Tonight prose (orig line 8) ---
rep(7, 8, [
 u'> Empty the recycling onto the kitchen table (boxes, tubes, cups) and put the shoebox, the paints and a stack of newspaper beside it.',
])

# --- Opening Activity steps (orig lines 32-34) ---
rep(31, 34, [
 u'1. Tip the pile into the middle of the floor and sit down in it with her.',
 u'2. Give her three bags and three words: **boxes**, **tubes**, **cups**. Let her sort. She will argue about the odd ones, so let the argument run.',
 u'3. Ask which shape she thinks will hold the most weight. Do not answer. Tell her you will find out at 9:15 and leave the question hanging.',
])

# --- Main Event steps (orig lines 45-50) ---
rep(44, 50, [
 u'1. Build a tower as tall as you can with no tape. Let her place every piece. Do not correct the wobbly ones.',
 u'2. It will fall. Say *what could we change?* instead of *that was too narrow,* and wait for her answer even when it takes a while.',
 u'3. Build again, this time widest boxes at the bottom. Ask her which is stronger and let her push it to find out.',
 u'4. Measure the tallest one against her. Mark the height on the wall with a pencil and write **TOWER, JAN 1** beside it.',
 u'5. Now hand her the tape and let her build a third one however she likes. Leave her to discover what tape lets her get away with.',
 u'6. Leave the best tower standing. She will come back to it at 4:15.',
])

# --- Tip after Main Event (orig line 52) ---
rep(51, 52, [
 u'> \U0001F4A1 **Tip:** Knocking it down is the measurement, so let her do it. She learns why a tower stands by watching this one go over.',
])

# --- Get Outside prose (orig lines 56-59) ---
rep(55, 59, [
 u'Bundle up and walk the route you will walk all year. Look at the trees today,',
 u'bare and sleeping, all structure and no leaves, the same thing she has been',
 u'stacking all morning. Hand her a paper bag and one instruction: find one thing',
 u'worth keeping. It goes in the capsule this afternoon, so tell her that now.',
])

# --- Infant Integration (orig lines 61-66) ---
rep(60, 66, [
 u'> \U0001F476 **Infant Integration:** Kreston is 6 months and sits with his hands free.',
 u'> Give him his own cardboard tube and one paper cup on the floor near the',
 u'> building. He will bang, mouth and drop them, running the same investigation',
 u'> Azlyn is running with the tower. On the walk, wear him facing out. He is',
 u'> alert enough now to take in the street, and cold air on his cheeks is a new',
 u'> sensation. Name three things you pass out loud.',
])

# --- Second Main Event intro (orig lines 72-73) ---
rep(71, 73, [
 u'Morning was tall, loud and falling over. This afternoon you seal a box and put',
 u'it away for a year.',
])

# --- Time Capsule steps (orig lines 86-92) ---
rep(85, 92, [
 u'1. Paint her palm with the brush rather than dipping her hand. Press flat, count to three, lift straight up. Write **January** and **3** beside it.',
 u"2. Do Kreston's on the same sheet while he is calm, flannel already in your hand.",
 u"3. Stand them both against the door frame. Mark, date and write the names. Draw round Azlyn's flat hand next to her mark. Do everyone in the house so she can see the row.",
 u'4. Ask her four questions and write the answers **word for word**: favourite colour, favourite food, favourite song, what she wants to do this year. Do not tidy her grammar. Her wrong words are the ones you will want to read next December.',
 u'5. Let her draw the family. Whatever comes out goes in.',
 u'6. Load the box: the drawing, her answers, the walk treasure, a photo. Photograph everything first. Boxes go missing, and the photos on your phone will still be there.',
 u'7. Tape it shut, write **OPEN DECEMBER 31, 2027** across the lid, and put it somewhere she can see and not reach.',
])

# --- Tip after Time Capsule (orig line 94) ---
rep(93, 94, [
 u'> \U0001F4A1 **Tip:** Let her shake it once it is sealed. Tell her it stays shut for a year, and let her sit with how long a year sounds.',
])

# --- Out Again bullets (orig lines 103-107) ---
rep(102, 107, [
 u"- A friend's house, if anyone is up for a visitor on New Year's Day",
 u'- The park, emptier today than any other day this year',
 u'- The same walk again in fading light, then ask what is different, and she will land on the sound',
 u'- Drive somewhere with a view and stay in the warm car',
 u'- Post a letter to Azlyn for her to open when she is five',
])

# --- Kreston's Afternoon (orig lines 109-113) ---
rep(108, 113, [
 u"> \U0001F476 **Kreston's Afternoon:** He goes on the growth chart too, lying down.",
 u'> Mark and date his length on the same wall as everyone else. After that, give',
 u'> him the flattened box to lie on. At six months he will stay with the crackle',
 u'> and the give under his hands longer than he stays with a toy, and down there',
 u'> he is at floor level with Azlyn while she works.',
])

# --- Around the World prose (orig lines 117-120) ---
rep(116, 120, [
 u'Houses come in shapes other than boxes. Mongolian families build round',
 u'felt **gers** they pack up and move with the seasons. Inuit builders cut snow',
 u'blocks and lay them in a spiral to close an **igloo**. In the American',
 u'Southwest, builders shape **adobe** homes from mud brick that keeps the',
 u'inside cool through the heat.',
])

# --- Try it (orig lines 122-123) ---
rep(121, 123, [
 u'> **✨ Try it:** Swap the square house for a round one. A blanket over a',
 u'> laundry basket makes a good ger. Ask Azlyn which shape feels stronger.',
])

# --- Parenting Insight BODY (orig lines 131-139) ---
rep(130, 139, [
 u'> Azlyn is in the fastest language stretch of her life, adding something like',
 u'> ten new words a day. Her mistakes are evidence of rule-building. She says *I',
 u'> goed outside* because she has worked out that adding *-ed* makes a thing',
 u'> past tense, and she applies that rule to the verbs she knows. Linguists call',
 u'> it overregularization, and it marks sophisticated thinking. You do not need',
 u'> to correct her. Feed the right form back in your next sentence (*you went',
 u'> outside? what did you see?*) and she picks up the exception on her own',
 u'> timeline.',
])

# --- Safety (orig lines 141-145) ---
rep(140, 145, [
 u'> ⚠️ **Safety:** Keep tape rolls, lolly sticks and walk treasure out of',
 u"> Kreston's reach the moment you stop watching him. Build the tower away from",
 u'> where he is sitting. Azlyn can step back when a cardboard tower comes down',
 u'> and Kreston cannot move out of the way. Washable non-toxic paint only.',
])

spans.sort()
out = []
i = 0
for s, e, lines in spans:
    out.extend(orig[i:s])
    out.extend(lines)
    i = e
out.extend(orig[i:])

text = u'\n'.join(out)
assert not any(l != l.rstrip() for l in out), 'trailing whitespace'
if not os.path.isdir('rewritten'):
    os.makedirs('rewritten')
with io.open(DST, 'w', encoding='utf-8', newline='') as f:
    f.write(text)

o = io.open(SRC, encoding='utf-8').read()
n = io.open(DST, encoding='utf-8').read()
print('orig words', len(o.split()), 'new words', len(n.split()))
print('delta pct %.2f' % (100.0 * (len(n.split()) - len(o.split())) / len(o.split())))
print('em dashes orig', o.count(u'—'), 'new', n.count(u'—'))
print('ends same', n.endswith(u'<div style="page-break-after: always;"></div>\n'))

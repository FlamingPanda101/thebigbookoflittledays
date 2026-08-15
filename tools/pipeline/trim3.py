import io
p = r"C:\Users\Josep\AppData\Local\Temp\claude\C--Users-Josep--claude\f2051431-8954-4594-9860-3b743569602a\scratchpad\newweeks\wk23-days.md"
t = io.open(p, encoding="utf-8").read()

R = [
# ---------- DAY 155 (-8) ----------
("matching a box on it: a brick, a car door, a geranium in a tub, a bottle cap in\nthe gutter. June puts more colour on one street than any other month, so let\nthe bag fill up.",
 "matching a box on it: a brick, a car door, a geranium in a tub, a bottle cap.\nJune puts more colour on one street than any other month, so let the bag fill\nup."),
("- Glue the whole bagful onto one sheet in no order at all.",
 "- Glue the whole bagful onto one sheet in no order."),
("> Children given that kind of descriptive feedback stay with hard work longer\n> and hold up better when it goes wrong, because their read on how it went sits\n> in the work rather than your face. Thank her for the board on the wall too.",
 "> Children given descriptive feedback stay with hard work longer and hold up\n> better when it goes wrong, because their read on how it went sits in the work\n> rather than your face. Thank her for the board on the wall too."),

# ---------- DAY 156 (-45) ----------
("Leave a spotty banana out on the side and find last June's photos on your phone. Check you have two ice-cube trays and a handful of lolly sticks for tomorrow.",
 "Leave a spotty banana on the side and find last June's photos on your phone. Check you have two ice-cube trays and lolly sticks for tomorrow."),
("1. Line the bottles up in front of her at breakfast and put one drop of each on the saucer, well apart.",
 "1. Line the bottles up at breakfast and put one drop of each on the saucer, well apart."),
("5. Wash the bowl. Cream cheese in, two drops of the colour she picked at breakfast, and she stirs until the streaks have gone.",
 "5. Wash the bowl. Cream cheese in, two drops of the colour she picked, and she stirs until the streaks have gone."),
("hip. Set him down and watch his feet come straight back up. Plenty of babies\nrefuse grass for weeks. Azlyn's job is to stand a few steps off and be worth\nthe crossing.",
 "hip. Set him down and watch his feet come up. Plenty of babies refuse grass for\nweeks, so Azlyn's job is to stand a few steps off and be worth the crossing."),
("1. Blow the balloons up yourself and let Azlyn bat them round the room while you spread the sheet flat.\n2. Cake in the middle of it, Kreston in front of the cake, everyone else on the floor at his level.\n3. Light the candle, sing, and blow it out after ten seconds. Pull it out of the icing and put it up on a high shelf.\n4. Hands off him. He goes in with one finger, then a fist, then his face. Azlyn will want to help and the answer is no, this one is his.\n5. Flannel over his face and hands at the end, rinsed in the bowl between passes.\n6. Paint his palm with your finger and press it onto one sheet of paper. Azlyn's on the second, with June and both ages written beside the prints.\n7. Both of them at the door frame, mark with the pencil, date and name each line. Then bring up last June's photos and hold the phone against the wall beside his mark.\n\n> \U0001f4a1 **Tip:** Some babies hate it. Kreston may stare at the cake, or object to the texture. Push one finger in for him, then leave him be, and hand the whole thing to Azlyn if nothing has happened in two minutes.",
 "1. Blow the balloons up yourself and let Azlyn bat them round while you spread the sheet flat.\n2. Cake in the middle, Kreston in front of it, everyone else on the floor at his level.\n3. Light the candle, sing, blow it out after ten seconds. Pull it out of the icing and put it up high.\n4. Hands off him. He goes in with one finger, then a fist, then his face. Azlyn will want to help, and the answer is no.\n5. Flannel over his face and hands at the end, rinsed in the bowl between passes.\n6. Paint his palm with your finger and press it onto paper. Azlyn's on the second sheet, June and both ages written beside them.\n7. Both of them at the door frame, mark with the pencil, date and name each line. Then bring up last June's photos and hold the phone against the wall.\n\n> \U0001f4a1 **Tip:** Some babies hate it. Kreston may stare at the cake, or object to the texture. Push one finger in for him, then leave him be, and hand it to Azlyn if nothing has happened in two minutes."),
("- Skip the cake and do the handprints and the wall marks.\n- One candle in a bowl of yoghurt, sung over, and out.\n- Photograph his hands, his feet and his teeth up close.\n- Let Azlyn open his presents, which is what she wants anyway.",
 "- Handprints and wall marks only, and skip the cake.\n- One candle in a bowl of yoghurt, sung over, and out.\n- Photograph his hands, his feet and his teeth up close.\n- Let Azlyn open his presents, which is what she wants."),
("- The park, for the wide flat path he can walk on",
 "- The park, for the flat path he can walk on"),
]

for old, new in R:
    n = t.count(old)
    assert n == 1, "count=%d for: %r" % (n, old[:70])
    t = t.replace(old, new)

io.open(p, "w", encoding="utf-8", newline="\n").write(t)
print("ok", len(R))

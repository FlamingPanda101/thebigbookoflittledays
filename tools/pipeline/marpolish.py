import os

p = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                 "newweeks", "wk11-days.md")

old = ("> from the adult running it. I wrote the plan on a full night of sleep, in\n"
       "> which it shows. Cross out the hard one, keep the snack and the walk, and let a low\n"
       "> day be a low day. The windowsill grows without either of you watching it.")
new = ("> from the adult running it. I wrote the plan on a full night of sleep, and\n"
       "> it shows. Cross out the hard one, keep the snack and the walk, and let a\n"
       "> low day be a low day. The windowsill grows without either of you watching it.")

txt = open(p, encoding="utf-8").read()
assert txt.count(old) == 1, f"{txt.count(old)} matches"
open(p, "w", encoding="utf-8", newline="\n").write(txt.replace(old, new))
print("wk11 D75 insight: rephrased and rewrapped")

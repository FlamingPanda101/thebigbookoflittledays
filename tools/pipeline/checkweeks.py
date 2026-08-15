"""Independent gate on generated weeks. Line-based. Refuses merge on failure.

usage: checkweeks.py 2 3 4 5
"""
import json
import os
import re
import sys
from collections import Counter

SP = os.path.dirname(os.path.abspath(__file__))
REPO = r"C:\Users\Josep\The-Big-Book-of-Little-Days-2027"
BRIEFS, NEW = os.path.join(SP, "weeks"), os.path.join(SP, "newweeks")
WEEKS = [int(a) for a in sys.argv[1:]] or [2, 3, 4, 5]

DAY_HDR = re.compile(r"^## 🌟 Day (\d+): (.+?) 🌟\s*$")
DATE_LN = re.compile(r"^\*\*📅 .+\*\*\s*$")
NAMED = re.compile(r"^### (?:🌅 Opening Activity|🎨 The Main Event|"
                   r"🎨 Second Main Event): (.+?)\s*$")
INSIGHT = re.compile(r"^> \*\*(.+?)\*\*\s*$")
SCHED = re.compile(r"^- \*\*\d.*\*\* — .+$")

fails, warns = [], []

# titles already in the book
existing = set()
with open(os.path.join(REPO, "tools", "titles.tsv"), encoding="utf-8") as fh:
    for ln in fh.read().splitlines()[1:]:
        p = ln.split("\t")
        if len(p) == 3:
            existing.add(p[2].strip().lower().rstrip("."))

all_new = []

for wk in WEEKS:
    brief = json.load(open(os.path.join(BRIEFS, f"wk{wk:02d}.json"),
                           encoding="utf-8"))
    dpath = os.path.join(NEW, f"wk{wk:02d}-days.md")
    opath = os.path.join(NEW, f"wk{wk:02d}-opener.md")
    tag = f"wk{wk:02d}"
    for p in (dpath, opath):
        if not os.path.exists(p):
            fails.append(f"{tag}: MISSING {os.path.basename(p)}")
    if any(f.startswith(f"{tag}: MISSING") for f in fails):
        continue

    dl = open(dpath, encoding="utf-8").read().split("\n")
    ol = open(opath, encoding="utf-8").read().split("\n")

    # --- days present and numbered right
    hdrs = [(i, int(m.group(1))) for i, ln in enumerate(dl)
            if (m := DAY_HDR.match(ln))]
    want = list(range(brief["days"][0], brief["days"][1] + 1))
    got = [n for _, n in hdrs]
    if got != want:
        fails.append(f"{tag}: day numbers {got} != expected {want}")
        continue

    # --- per-day checks
    for idx, (li, num) in enumerate(hdrs):
        spec = brief["day_specs"][idx]
        end = hdrs[idx + 1][0] if idx + 1 < len(hdrs) else len(dl)
        block = dl[li:end]

        date = next((x for x in block[:4] if DATE_LN.match(x)), None)
        if date is None:
            fails.append(f"{tag} D{num}: no date line")
        elif date.strip() != spec["header_date"]:
            fails.append(f"{tag} D{num}: date line\n"
                         f"      got  {date.strip()}\n"
                         f"      want {spec['header_date']}")

        txt = "\n".join(block)
        if f"{spec['kreston_months']} months" not in txt and \
           f"{spec['kreston_months']}-month" not in txt and \
           f"{spec['kreston_months']} mo" not in txt:
            warns.append(f"{tag} D{num}: Kreston {spec['kreston_months']}mo "
                         f"not stated plainly")

        # 16 rows: 8:00 through 5:00 plus the 6:00 PM dinner row (matches
        # the shipped week 1, which is the canonical example)
        n_sched = sum(1 for x in block if SCHED.match(x))
        if n_sched != 16:
            fails.append(f"{tag} D{num}: {n_sched} schedule rows, expected 16")

        n_pb = txt.count('page-break-after')
        if n_pb != 2:
            fails.append(f"{tag} D{num}: {n_pb} page-break divs, expected 2")

        atw = txt.count("### 🌍 Around the World")
        if idx == 0 and atw != 1:
            fails.append(f"{tag} D{num}: first day has {atw} Around the World")
        if idx > 0 and atw != 0:
            fails.append(f"{tag} D{num}: Around the World on a non-first day")

        # --- section-level structure: step counts, bullet counts, insight
        # length, and materials that no step uses (or steps needing an
        # unlisted item). Each of these has shipped a real defect.
        sec, cur = {}, None
        for x in block:
            if x.startswith("### "):
                cur = x[4:].split(":")[0].strip()
                sec[cur] = []
            elif cur:
                sec[cur].append(x)

        def steps(name):
            for k, v in sec.items():
                if k.endswith(name):
                    return [x for x in v if re.match(r"^\d+\. ", x)]
            return None

        for nm, lo, hi in (("The Main Event", 4, 6),
                           ("Second Main Event", 5, 7)):
            s = steps(nm)
            if s is None:
                fails.append(f"{tag} D{num}: no '{nm}' section")
            elif not (lo <= len(s) <= hi):
                fails.append(f"{tag} D{num}: {nm} has {len(s)} steps, want {lo}-{hi}")

        for nm, lo, hi in (("Afternoon Alternatives", 3, 4),
                           ("Out Again", 4, 6)):
            body = next((v for k, v in sec.items() if k.endswith(nm)), None)
            if body is None:
                fails.append(f"{tag} D{num}: no '{nm}' section")
            else:
                n_b = sum(1 for x in body if x.startswith("- "))
                if not (lo <= n_b <= hi):
                    fails.append(f"{tag} D{num}: {nm} has {n_b} bullets, want {lo}-{hi}")

        # NOTE: materials-vs-steps completeness is checked by the verifier
        # agents, not here. A lexical version of it was tried and removed: it
        # cannot tell that a step saying "write her name" uses the listed
        # marker, or that "you cut" uses the listed scissors, so it flagged
        # ~30 false positives per month. A check that cries wolf gets ignored,
        # which is the same reason the spec bans filler safety warnings.

        # insight body length
        for i2, x in enumerate(block):
            if x.startswith("> 🧠"):
                body = []
                for y in block[i2 + 2:]:
                    if not y.startswith("> ") or y.startswith("> ⚠️"):
                        break
                    body.append(y[2:])
                n_w = len(" ".join(body).split())
                if body and not (95 <= n_w <= 125):
                    warns.append(f"{tag} D{num}: insight body {n_w} words, want 100-120")
                break

        prose = [x for x in block if not x.startswith("- **") and
                 not x.startswith("###")]
        em = sum(x.count("—") for x in prose)
        if em:
            fails.append(f"{tag} D{num}: {em} em dash(es) in prose")

        adv = re.findall(r"\b(really|just|literally|genuinely|honestly|simply|"
                         r"actually|deeply|truly|fundamentally)\b",
                         " ".join(prose), re.I)
        if adv:
            fails.append(f"{tag} D{num}: adverbs {sorted(set(a.lower() for a in adv))}")

        w = len(txt.split())
        if not (1050 <= w <= 1500):
            warns.append(f"{tag} D{num}: {w} words total (schedule included)")

    # --- titles
    titles = [m.group(1).strip() for ln in dl if (m := NAMED.match(ln))]
    if len(titles) != 21:
        fails.append(f"{tag}: {len(titles)} activity titles, expected 21")
    ins, pend = [], False
    for ln in dl:
        if ln.startswith("> 🧠"):
            pend = True
            continue
        if pend and (m := INSIGHT.match(ln)):
            ins.append(m.group(1).strip())
            pend = False
    if len(ins) != 7:
        fails.append(f"{tag}: {len(ins)} insight headlines, expected 7")

    for h, want_h in zip(ins, brief["insight_headlines"]):
        if h.rstrip(".").lower() != want_h.rstrip(".").lower():
            warns.append(f"{tag}: insight not the assigned one\n"
                         f"      got  {h}\n      want {want_h}")

    # opener bullets must match the day headlines
    obul = [ln[2:].strip() for ln in ol if ln.startswith("- ") and
            not ln.startswith("- [ ]") and not ln.startswith("- **")]
    def hnorm(s):
        # the opener quotes headlines "verbatim minus the full stop", and that
        # full stop can sit INSIDE a closing quote: ...most "bad behavior."
        s = s.strip().lower()
        s = re.sub(r'\.(["”\'])\s*$', r"\1", s)
        return s.rstrip(". ")

    for h in ins:
        if not any(hnorm(h) == hnorm(b) for b in obul):
            fails.append(f"{tag}: opener 'What You'll Learn' missing headline: {h}")

    all_new.extend((tag, t) for t in titles + ins)

    # --- Out Again anchors
    for idx, spec in enumerate(brief["day_specs"]):
        li = hdrs[idx][0]
        end = hdrs[idx + 1][0] if idx + 1 < len(hdrs) else len(dl)
        seg = "\n".join(dl[li:end])
        k = re.sub(r"\*|\(.*?\)", "", spec["out_again_anchor"]).strip()
        head = k.split()[0].lower() if k else ""
        # the book writes "café"; match on the stem so the accent is not a
        # false positive
        if head.startswith("cafe"):
            head = "caf"
        if head and head not in seg.lower():
            warns.append(f"{tag} D{spec['day']}: Out Again anchor "
                         f"'{spec['out_again_anchor']}' not found")

    # --- shopping list sanity
    shop = [ln for ln in ol if ln.startswith("- [ ]")]
    if len(shop) < 12:
        warns.append(f"{tag}: shopping list only {len(shop)} items")

# --- collisions
norm = [(tag, t, t.lower().rstrip(".")) for tag, t in all_new]
for tag, t, k in norm:
    if k in existing:
        fails.append(f"{tag}: title collides with the shipped book: {t!r}")
dupes = [k for k, c in Counter(k for _, _, k in norm).items() if c > 1]
for k in dupes:
    where = [f"{tag}" for tag, _, kk in norm if kk == k]
    fails.append(f"duplicate title across new weeks {where}: {k!r}")

print(f"checked weeks {WEEKS}: {len(all_new)} new titles "
      f"({len(all_new) - len(dupes)} unique)")
if warns:
    print(f"\n{len(warns)} WARNING(S):")
    for w in warns[:40]:
        print("  ~", w)
if fails:
    print(f"\n{len(fails)} FAILURE(S) - REFUSING MERGE:")
    for f in fails[:40]:
        print("  -", f)
    sys.exit(1)
print("\nall structural checks passed")

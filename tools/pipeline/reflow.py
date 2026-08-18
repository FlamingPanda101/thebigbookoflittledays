"""Reflow ragged blockquote paragraphs to the house wrap of 78 columns.

Inserting a sentence into an already-wrapped block leaves a short line in the
middle of it. This finds those and rewraps only the affected paragraph.

Structure is preserved, which is the whole difficulty:
  > 🧠 **A Little Parenting Insight**     <- marker line, stays on its own
  > **The headline.**                     <- headline line, stays on its own
  > body text that wraps ...              <- only this gets reflowed

Single-line blockquotes (Prep Tonight, Tips) are left alone; they are one
long line by house convention, not a wrap failure.

    python tools/pipeline/reflow.py          # dry run, lists what it would do
    python tools/pipeline/reflow.py --write  # apply
"""
import glob
import io
import os
import re
import sys
import textwrap

WIDTH = 78
WRITE = "--write" in sys.argv

# lines that must keep a line to themselves
MARKER_ONLY = re.compile(r'^> (?:🧠 \*\*A Little Parenting Insight\*\*|\*\*[^*].*\*\*)\s*$')
# a paragraph we must not join: bullets, tables, code
NO_JOIN = re.compile(r'^> (?:[-*+] |\d+\. |\||```)')


def runs(lines):
    """Yield (start, end) index pairs for each run of consecutive '> ' lines."""
    i = 0
    while i < len(lines):
        if lines[i].startswith("> "):
            j = i
            while j + 1 < len(lines) and lines[j + 1].startswith("> "):
                j += 1
            yield i, j
            i = j + 1
        else:
            i += 1


def ragged(block):
    """True if a non-final line is short enough to be a leftover from an edit.

    60 columns, not 70: a correctly wrapped paragraph can end a line at 68 when
    the next word is long, and reflowing those is churn with no reader benefit.
    """
    if len(block) < 2:
        return False
    return any(len(l) < 60 for l in block[:-1])


def process(path):
    raw = io.open(path, encoding="utf-8", newline="").read()
    lines = raw.split("\n")
    changed = []
    for s, e in reversed(list(runs(lines))):
        block = lines[s:e + 1]
        if any(NO_JOIN.match(l) for l in block):
            continue
        # peel off leading structural lines
        head = 0
        while head < len(block) and MARKER_ONLY.match(block[head]):
            head += 1
        body = block[head:]
        if not ragged(body):
            continue
        text = re.sub(r'\s+', ' ', " ".join(l[2:].strip() for l in body)).strip()
        if not text:
            continue
        new = ["> " + x for x in textwrap.wrap(
            text, WIDTH - 2, break_long_words=False, break_on_hyphens=False)]
        if new == body:
            continue
        lines[s:e + 1] = block[:head] + new
        changed.append((s + 1, len(body), len(new), min(len(l) for l in body[:-1])))
    if changed and WRITE:
        io.open(path, "w", encoding="utf-8", newline="").write("\n".join(lines))
    return changed


total_files = 0
total_blocks = 0
for p in sorted(glob.glob(os.path.join("months", "*.md"))):
    ch = process(p)
    if ch:
        total_files += 1
        total_blocks += len(ch)
        print("%-26s %d block(s)" % (os.path.basename(p), len(ch)))
        for line, was, now, shortest in ch[:4]:
            print("    line %-5d %d lines -> %d, shortest was %d cols"
                  % (line, was, now, shortest))

print("\n%d blocks across %d files%s"
      % (total_blocks, total_files, "" if WRITE else "  (dry run, pass --write)"))

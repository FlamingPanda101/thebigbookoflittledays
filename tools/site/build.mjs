// Builds the static website into docs/ from months/*.md.
//   node tools/site/build.mjs
//
// Outputs:
//   docs/data/week-01.json .. week-53.json   parsed week data (parse-book.js)
//   docs/data/site.json                      the site index the SPA boots from
//   docs/booklets/NN-month.html              print-ready monthly booklets
//   docs/booklets/doc-page.js                page-sizing web component
//
// docs/index.html is authored by hand and not touched here.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..', '..');
const MONTHS = join(REPO, 'months');
const DOCS = join(REPO, 'docs');

// parse-book.js and build-booklets.js are browser-global scripts; eval them.
(0, eval)(readFileSync(join(HERE, 'parse-book.js'), 'utf8'));
(0, eval)(readFileSync(join(HERE, 'build-booklets.js'), 'utf8'));
const { parseWeek } = globalThis.BOOK;
const { booklet } = globalThis.BUILD;

// An array, not an object: integer-like keys such as '10' would iterate
// before '01' in a plain object and put October first in every list.
const MONTH_NAMES = [
  ['01', 'January'], ['02', 'February'], ['03', 'March'], ['04', 'April'],
  ['05', 'May'], ['06', 'June'], ['07', 'July'], ['08', 'August'],
  ['09', 'September'], ['10', 'October'], ['11', 'November'], ['12', 'December'],
];

// ---- discover week files: months/NN-mon-wNN[-suffix].md
const weekFiles = readdirSync(MONTHS)
  .map(f => {
    const m = f.match(/^(\d\d)-[a-z]+-w(\d+)(?:-[a-z]+)?\.md$/);
    return m ? { file: f, mm: m[1], week: Number(m[2]) } : null;
  })
  .filter(Boolean)
  .sort((a, b) => a.week - b.week);

if (weekFiles.length !== 53) {
  throw new Error(`expected 53 week files, found ${weekFiles.length}`);
}

// ---- parse every week
mkdirSync(join(DOCS, 'data'), { recursive: true });
const weeks = [];
for (const wf of weekFiles) {
  const src = readFileSync(join(MONTHS, wf.file), 'utf8');
  const wk = parseWeek(src);
  // The finale file has no "## Week N:" opener; give week 53 a browse label.
  if (!wk.opener.heading) {
    wk.opener.heading = 'Week 53: The Grand Finale';
    wk.opener.weekNo = 53;
  }
  if (wk.opener.weekNo !== wf.week) {
    throw new Error(`${wf.file}: opener says week ${wk.opener.weekNo}, filename says ${wf.week}`);
  }
  weeks.push({ mm: wf.mm, week: wf.week, data: wk });
  writeFileSync(
    join(DOCS, 'data', `week-${String(wf.week).padStart(2, '0')}.json`),
    JSON.stringify(wk));
}

// ---- validate before anything ships
const problems = [];
let dayCount = 0;
for (const w of weeks) {
  for (const d of w.data.days) {
    dayCount++;
    if (!d.title) problems.push(`day ${d.day}: no title`);
    if (!d.schedule || d.schedule.length !== 16) problems.push(`day ${d.day}: ${(d.schedule || []).length} schedule rows`);
    if (!d.insight) problems.push(`day ${d.day}: no insight`);
    if (!d.safety) problems.push(`day ${d.day}: no safety`);
    if (d.unknown.length) problems.push(`day ${d.day}: unknown sections ${d.unknown.join(', ')}`);
  }
}
if (dayCount !== 365) problems.push(`${dayCount} days parsed, want 365`);
if (problems.length) {
  console.error('PARSE PROBLEMS:\n  ' + problems.join('\n  '));
  process.exit(1);
}

// ---- site.json
const plain = s => String(s || '').replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const siteDays = [];
const siteWeeks = [];
for (const w of weeks) {
  siteWeeks.push({
    w: w.week,
    h: plain(w.data.opener.heading),
    dates: w.data.opener.dates,
    days: w.data.days.map(d => d.day),
  });
  for (const d of w.data.days) {
    const acts = [d.opening, d.main, d.second].filter(Boolean).map(a => plain(a.title));
    const mainRow = (d.schedule || []).find(r => r.label === 'The Main Event');
    const qBits = [
      plain(d.title), plain(d.theme), ...acts,
      d.outside ? plain(d.outside.title) : '',
      d.opening ? plain(d.opening.need) : '',
      ...(d.main ? d.main.materials.map(plain) : []),
      ...(d.second ? d.second.materials.map(plain) : []),
      d.insight ? plain(d.insight.headline) : '',
    ];
    siteDays.push({
      d: d.day,
      t: plain(d.title),
      dt: d.date,
      w: w.week,
      mm: w.mm,
      th: plain(d.theme),
      acts,
      out: d.outside ? plain(d.outside.title) : '',
      ins: d.insight ? plain(d.insight.headline) : '',
      mins: Number((mainRow && mainRow.dur.match(/\d+/) || [0])[0]),
      q: qBits.filter(Boolean).join(' ').toLowerCase(),
      pt: plain(d.prepTonight),
    });
  }
}

// ---- booklets
mkdirSync(join(DOCS, 'booklets'), { recursive: true });
copyFileSync(join(HERE, 'doc-page.js'), join(DOCS, 'booklets', 'doc-page.js'));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const bookletShell = (title, pages) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · The Big Book of Little Days</title>
<style>
doc-page:not(:defined){visibility:hidden}
body{margin:0}
a{color:#E4501E;text-decoration:none}
a:hover{color:#B93F14}
</style>
</head>
<body>
<doc-page size="letter">
${pages.join('\n')}
</doc-page>
<script src="doc-page.js"></script>
</body>
</html>
`;

const siteMonths = [];
let totalPages = 0;
for (const [mm, name] of MONTH_NAMES) {
  const mWeeks = weeks.filter(w => w.mm === mm);
  const pages = booklet(name, mWeeks.map(w => w.data));
  totalPages += pages.length;
  const file = `${mm}-${name.toLowerCase()}.html`;
  writeFileSync(join(DOCS, 'booklets', file), bookletShell(name + ' 2027', pages));
  const dayNums = mWeeks.flatMap(w => w.data.days.map(d => d.day));
  siteMonths.push({
    mm, name,
    days: dayNums,
    weeks: mWeeks.map(w => w.week),
    pages: pages.length,
    file: 'booklets/' + file,
  });
  console.log(`booklet ${file}: ${pages.length} pages, days ${dayNums[0]}-${dayNums[dayNums.length - 1]}`);
}

writeFileSync(join(DOCS, 'data', 'site.json'), JSON.stringify({
  days: siteDays, weeks: siteWeeks, months: siteMonths, totalPages,
}));

console.log(`\n${dayCount} days, ${weeks.length} weeks, ${siteMonths.length} booklets, ${totalPages} pages total`);
console.log('site.json: ' + siteDays.length + ' day entries');

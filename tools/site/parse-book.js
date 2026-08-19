// Parses one week-block markdown file from months/ into structured day data.
// Strict by design: callers should treat missing fields as defects, not tolerate them.
globalThis.BOOK = (function () {
  function inl(s) {
    if (!s) return '';
    let t = String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    t = t.replace(/\s*\n\s*/g, ' ');           // collapse first: markers span line breaks
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/(^|[\s(“"])\*([^*]+?)\*(?=[\s.,;:!?)”"]|$)/g, '$1<em>$2</em>');
    t = t.replace(/`([^`]+?)`/g, '$1');
    return t.trim();
  }
  function paras(s) {
    if (!s) return [];
    return String(s).split(/\n\s*\n/).map(p => inl(p)).filter(Boolean);
  }
  function splitQuotes(body) {
    const lines = body.split('\n'); const groups = []; const prose = []; let cur = null;
    for (const ln of lines) {
      if (/^>\s?/.test(ln)) { const t = ln.replace(/^>\s?/, ''); cur ? cur.push(t) : (cur = [t]); }
      else { if (cur) { groups.push(cur.join('\n').trim()); cur = null; } prose.push(ln); }
    }
    if (cur) groups.push(cur.join('\n').trim());
    return { groups, prose: prose.join('\n').trim() };
  }
  const find = (gs, re) => gs.find(g => re.test(g)) || '';
  const strip = (g, re) => g.replace(re, '').trim();
  const bullets = b => b.split('\n').filter(l => /^[-*]\s+/.test(l))
    .map(l => l.replace(/^[-*]\s+/, '').replace(/^\[\s?\]\s*/, '').trim());
  const numbered = b => b.split('\n').filter(l => /^\d+\.\s+/.test(l))
    .map(l => l.replace(/^\d+\.\s+/, '').trim());
  const clean = b => b.replace(/<div style="page-break-after: always;"><\/div>/g, '').replace(/^\s*---\s*$/gm, '');

  function parseSchedule(body) {
    return bullets(body).map(r => {
      const m = r.match(/^\*\*(.+?)\*\*\s*(?:—\s*(.*))?$/);
      const time = m ? m[1] : r;
      let rest = m && m[2] ? m[2] : '';
      const em = (rest.match(/^([\u{1F300}-\u{1FAFF}\u{2190}-\u{21FF}\u{2600}-\u{27BF}]️?)\s*/u) || [])[1] || '';
      if (em) rest = rest.slice(em.length).trim();
      const dur = (rest.match(/\(([^)]*?min)\)\s*$/) || [])[1] || '';
      rest = rest.replace(/\s*\([^)]*?min\)\s*$/, '');
      const lm = rest.match(/^(.+?):\s*(.+)$/);
      return {
        time: inl(time), emoji: em,
        label: lm ? inl(lm[1]) : inl(rest),
        name: lm ? inl(lm[2]) : '', dur
      };
    });
  }

  function parseDay(block, num) {
    const d = { day: num, unknown: [] };
    d.title = inl((block.match(/^##\s*🌟\s*Day\s*\d+:\s*(.+?)\s*🌟\s*$/m) || [])[1] || '');
    d.date = (block.match(/^\*\*📅\s*(.+?)\*\*\s*$/m) || [])[1] || '';
    d.theme = inl((block.match(/^\*\*Theme:\*\*\s*(.+?)\s*$/m) || [])[1] || '');

    const hs = [...block.matchAll(/^###\s+(.+?)\s*$/gm)];
    for (let j = 0; j < hs.length; j++) {
      const body = clean(block.slice(hs[j].index + hs[j][0].length, j + 1 < hs.length ? hs[j + 1].index : block.length));
      const head = hs[j][1];
      const { groups, prose } = splitQuotes(body);
      const preMat = body.split('**📝')[0] || '';
      const tipOf = () => inl(strip(find(groups, /^💡/), /^💡\s*\*\*Tip:?\*\*:?\s*/));

      if (/Prep Tonight/.test(head)) { d.prepTonight = inl(groups[0] || prose); continue; }
      if (/At-a-Glance/.test(head)) { d.schedule = parseSchedule(body); continue; }
      if (/Opening Activity/.test(head)) {
        d.opening = {
          title: inl(head.replace(/^.*?Opening Activity:\s*/, '').trim()),
          need: inl((body.match(/\*\*🧰 You need:\*\*\s*([\s\S]+?)(?:\n\s*\n|\n\d\.)/) || [])[1] || ''),
          steps: numbered(body).map(inl), tip: tipOf()
        }; continue;
      }
      if (/Main Event/.test(head) && !/Second/.test(head)) {
        d.main = {
          title: inl(head.replace(/^.*?Main Event:\s*/, '').trim()),
          intro: paras((prose.split(/\*\*🧰/)[0] || '')).join(' '),
          materials: bullets(preMat).map(inl), steps: numbered(body).map(inl), tip: tipOf()
        }; continue;
      }
      if (/Second Main Event/.test(head)) {
        d.second = {
          title: inl(head.replace(/^.*?Second Main Event:\s*/, '').trim()),
          intro: paras((prose.split(/\*\*🧰/)[0] || '')).join(' '),
          materials: bullets(preMat).map(inl), steps: numbered(body).map(inl), tip: tipOf()
        }; continue;
      }
      if (/Get Outside/.test(head)) {
        d.outside = { title: inl(head.replace(/^.*?Get Outside:\s*/, '').trim()), paras: paras(prose) };
        const inf = find(groups, /^👶\s*\*\*Infant Integration/);
        if (inf) d.infant = inl(strip(inf, /^👶\s*\*\*Infant Integration:?\*\*:?\s*/));
        continue;
      }
      if (/Afternoon Alternatives/.test(head)) { d.alternatives = bullets(body).map(inl); continue; }
      if (/Out Again/.test(head)) { d.outAgain = bullets(body).map(inl); continue; }
      if (/Around the World/.test(head)) {
        d.aroundWorld = {
          title: inl(head.replace(/^.*?Around the World:\s*/, '').trim()), paras: paras(prose),
          tryIt: inl(strip(find(groups, /Try it/), /^\*\*✨\s*Try it:?\*\*:?\s*/)),
          didYouKnow: inl(strip(find(groups, /Did you know/), /^\*Did you know\?\*\s*/))
        }; continue;
      }
      d.unknown.push(head);
    }

    // Callouts that sit outside a ### section, swept from the whole day block.
    const all = splitQuotes(block).groups;
    if (!d.infant) { const g = find(all, /^👶\s*\*\*Infant Integration/); if (g) d.infant = inl(strip(g, /^👶\s*\*\*Infant Integration:?\*\*:?\s*/)); }
    const kp = find(all, /^👶\s*\*\*Kreston/);
    if (kp) d.krestonPM = inl(strip(kp, /^👶\s*\*\*Kreston'?s? Afternoon:?\*\*:?\s*/));
    const ins = find(all, /^🧠/);
    if (ins) {
      const p = ins.replace(/^🧠\s*\*\*A Little Parenting Insight\*\*\s*/, '').trim();
      const hm = p.match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);
      d.insight = { headline: inl(hm ? hm[1] : ''), paras: paras(hm ? hm[2] : p) };
    }
    const sf = find(all, /^⚠️/);
    if (sf) d.safety = inl(strip(sf, /^⚠️\s*\*\*Safety:?\*\*:?\s*/));
    return d;
  }

  function parseWeek(src) {
    const marks = [...src.matchAll(/<a id="day-(\d+)"><\/a>/g)];
    const days = marks.map((m, i) =>
      parseDay(src.slice(m.index, i + 1 < marks.length ? marks[i + 1].index : src.length), Number(m[1])));

    const head = (src.match(/^##\s*(Week\s*\d+:\s*.+?)\s*$/m) || [])[1] || '';
    const opener = { heading: inl(head), weekNo: Number((head.match(/Week\s*(\d+)/) || [])[1] || 0) };
    opener.dates = (src.match(/^\*\*📅\s*([A-Z][a-z]+\s+\d+\s*[–-]\s*.+?)\*\*\s*$/m) || [])[1] || '';
    const secs = [...src.matchAll(/^###\s+(.+?)\s*$/gm)];
    const firstDay = marks.length ? marks[0].index : src.length;
    for (let j = 0; j < secs.length; j++) {
      if (secs[j].index > firstDay) break;
      const body = clean(src.slice(secs[j].index + secs[j][0].length, j + 1 < secs.length ? secs[j + 1].index : firstDay));
      const h = secs[j][1]; const { prose } = splitQuotes(body);
      if (/What This Week Is About/.test(h)) opener.about = paras(prose);
      else if (/What Azlyn Will Learn/.test(h)) opener.azlyn = bullets(body).map(inl);
      else if (/What You'?ll Learn/.test(h)) opener.you = bullets(body).map(inl);
      else if (/Shopping List/.test(h)) opener.shopping = bullets(body).map(inl);
    }
    const kn = splitQuotes(src.slice(0, firstDay)).groups.find(g => /^👶/.test(g));
    if (kn) opener.krestonNote = inl(kn.replace(/^👶\s*/, ''));
    return { opener, days };
  }

  return { parseWeek, inl };
})();

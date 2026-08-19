// Builds one monthly booklet .dc.html from parsed week data.
// Layout system: week opener (2pp) + 4pp per day. All styles inline and literal.
globalThis.BUILD = (function () {
  const SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
  const SERIF = "Georgia, 'Iowan Old Style', Palatino, serif";
  const MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";
  const PAPER = '#FAF2E4', INK = '#1E1B33', MUTED = '#5B5674', RULE = '#EDE3D6';
  const ORANGE = '#E4501E', TEAL = '#0B7F7C', VIOLET = '#5544CC', AMBER = '#FFB627';

  const MODE = {
    '🎨': { color: ORANGE, word: 'MAKE' },
    '🌳': { color: TEAL, word: 'OUTSIDE' },
    '🌅': { color: VIOLET, word: 'START' },
    '🤸': { color: TEAL, word: 'MOVE' },
    '📚': { color: VIOLET, word: 'CALM' },
    '🛁': { color: VIOLET, word: 'CALM' },
    '🧹': { color: MUTED, word: 'JOB' }
  };
  const mode = e => MODE[e] || { color: ORANGE, word: 'MAKE' };

  const CHIP = {
    time: 'background:#DFEEFA;color:#14456B',
    kit: 'background:#F5EAD6;color:#7A4E06',
    out: 'background:#DCF0D9;color:#22622C',
    neutral: 'background:#F1EDE6;color:#4A4757'
  };
  const chip = (tone, text) =>
    `<span style="display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:6px 10px;border-radius:999px;text-align:center;font-weight:700;font-size:13px;line-height:1.15;${CHIP[tone]}">${text}</span>`;
  const chipRow = chips =>
    `<div style="display:flex;flex-wrap:wrap;gap:5px">${chips.filter(Boolean).join('')}</div>`;

  const eyebrow = t =>
    `<div style="font-weight:700;font-size:11.5px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED}">${t}</div>`;
  const rule = () => `border-top:2px solid ${RULE}`;

  function foot(left, right) {
    return `<div style="margin-top:auto;display:flex;justify-content:space-between;gap:12px;font-family:${MONO};font-size:11.5px;color:${MUTED};${rule()};padding-top:6px">
<span>The Big Book of Little Days · ${left}</span><span>${right}</span></div>`;
  }

  function page(label, inner, gap) {
    return `<section class="page" data-screen-label="${label}" style="box-sizing:border-box;height:100%;padding:0.42in;background:${PAPER};color:${INK};font-family:${SANS};display:flex;flex-direction:column;gap:${gap || 12}px">
${inner}
</section>`;
  }

  // Zero-JS placeholder: 1,460 live components per book saturates the page, and a
  // print artifact does not need drag-and-drop. The frame names the file to drop in.
  function img(id, src, alt, style, placeholder) {
    if (src) return `<img src="${src}" alt="${alt}" style="display:block;${style};object-fit:cover;border-radius:13px" />`;
    return `<div data-photo="${id}" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;${style};background:#F1EDE6;border:1.5px dashed #C9BFAE;border-radius:13px;text-align:center;padding:8px;box-sizing:border-box">
<span style="font-weight:700;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8A8299">${placeholder}</span>
<span style="font-family:${MONO};font-size:10.5px;color:#A79E90">${id}.png</span>
</div>`;
  }

  function steps(list) {
    return `<ol style="margin:0;padding-left:1.25em;display:grid;gap:5px;font-weight:400;font-size:14.3px;line-height:1.38">${list.map(s => `<li>${s}</li>`).join('')}</ol>`;
  }
  function need(text) {
    return `<p style="margin:0;font-weight:500;font-size:14.5px;line-height:1.45;text-wrap:pretty"><strong style="color:${ORANGE}">You need:</strong> ${text}</p>`;
  }
  function tip(text) {
    if (!text) return '';
    return `<p style="display:flex;gap:9px;background:#FEEDE3;border-radius:11px;padding:10px 12px;margin:0;font-weight:600;font-size:13.8px;line-height:1.38"><span aria-hidden="true">💡</span><span>${text}</span></p>`;
  }
  function panel(bg, fg, head, inner) {
    return `<section style="background:${bg};border-radius:11px;padding:11px 13px"><div style="font-weight:700;font-size:11.5px;letter-spacing:0.12em;text-transform:uppercase;color:${fg};margin-bottom:6px">${head}</div>${inner}</section>`;
  }
  const ul = (list, size) =>
    `<ul style="margin:0;padding-left:15px;display:grid;gap:4px;font-size:${size || 13.5}px;line-height:1.34">${list.map(i => `<li>${i}</li>`).join('')}</ul>`;

  function card(o) {
    const m = mode(o.emoji);
    return `<section style="background:#FFFFFF;border:2px solid ${m.color};border-radius:14px;padding:13px 15px;display:flex;flex-direction:column;gap:8px">
<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
<span style="display:inline-flex;align-items:center;gap:6px;background:${m.color};color:#FFFFFF;border-radius:999px;padding:6px 12px;font-weight:800;font-size:13.5px;line-height:1;letter-spacing:0.06em">${o.emoji} ${m.word}</span>
${eyebrow(o.eyebrow)}
</div>
<h2 style="font-weight:800;font-size:22px;line-height:1.12;letter-spacing:-0.02em;margin:0">${o.title}</h2>
${o.intro ? `<p style="margin:0;font-family:${SERIF};font-style:italic;font-size:14.5px;line-height:1.45;color:${MUTED}">${o.intro}</p>` : ''}
${o.chips || ''}
${o.body || ''}
${tip(o.tip)}
</section>`;
  }

  // ---- schedule sidebar
  function schedule(d, width) {
    const rows = (d.schedule || []).map(r => {
      const major = /^(The Main Event|Second Main Event)$/.test(r.label);
      if (major) {
        const m = mode(r.emoji);
        return `<div style="margin:5px 0;padding:9px 10px;background:${m.color};border-radius:11px;color:#FFFFFF">
<div style="display:flex;justify-content:space-between;align-items:baseline;gap:6px">
<span style="font-family:${MONO};font-size:11.5px;font-weight:500">${r.time.replace(/\s*(AM|PM)$/, '')}</span>
<span style="font-family:${MONO};font-size:11px;letter-spacing:0.08em">${r.dur.replace(' min', 'm')}</span></div>
<div style="font-weight:800;font-size:15px;line-height:1.1;margin-top:3px">${r.name || r.label}</div></div>`;
      }
      const named = !!r.name;
      return `<div style="display:flex;gap:8px;padding:${named ? 4 : 3}px 0">
<span style="font-family:${MONO};font-size:11.5px;color:${MUTED};width:52px;flex:none">${r.time.replace(/\s*(AM|PM)$/, '').replace(/–.*$/, '')}</span>
<span style="font-size:${named ? 13.2 : 12.5}px;line-height:1.25;${named ? 'font-weight:600' : 'color:' + MUTED}">${named ? r.name : r.label}</span></div>`;
    }).join('');
    return `<aside style="width:${width};flex:none;min-height:0;display:flex;flex-direction:column;gap:8px">
<div style="font-weight:700;font-size:14px;line-height:1;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED}">Today, at a glance</div>
<div style="display:flex;flex-direction:column;border-left:2px solid ${RULE};padding-left:10px">${rows}</div>
</aside>`;
  }

  const durOf = (d, label) => {
    const r = (d.schedule || []).find(x => x.label === label);
    return r ? r.dur : '';
  };
  const startOf = (d, label) => {
    const r = (d.schedule || []).find(x => x.label === label);
    return r ? r.time : '';
  };
  const kit = n => (n ? chip('kit', '🧰 ' + n + (n === 1 ? ' item' : ' items')) : '');
  const timeChip = t => (t ? chip('time', '⏱️ ' + t) : '');

  // ---- the four day pages
  function dayPages(d, ctx) {
    const P = [];
    const wk = ctx.weekLabel;
    const dateBits = (d.date || '').split(', ');
    const weekday = dateBits[0] || '';
    const md = dateBits.length > 1 ? dateBits[1] : (d.date || '');
    const tag = `Day ${d.day}`;

    // ---------- p1 morning
    const hero = img(`d${d.day}-hero`, ctx.images.hero, `${d.title} — the finished result`,
      'width:2.7in;flex:none;aspect-ratio:3/2', 'Hero photo');
    const lastNight = ctx.lastNight
      ? `<div style="background:#F1EDE6;border-radius:11px;padding:10px 12px">${eyebrow('📦 Done last night')}<p style="margin:5px 0 0;font-size:13px;line-height:1.35;text-wrap:pretty">${ctx.lastNight}</p></div>`
      : '';
    const opening = d.opening ? card({
      emoji: '🌅', eyebrow: `Opening activity · ${startOf(d, 'Opening Activity')}`,
      title: d.opening.title,
      chips: chipRow([timeChip(durOf(d, 'Opening Activity'))]),
      body: (d.opening.need ? need(d.opening.need) : '') + steps(d.opening.steps),
      tip: d.opening.tip
    }) : '';
    const flat = img(`d${d.day}-materials`, ctx.images.materials, 'The materials for today, laid out',
      'width:100%;aspect-ratio:16/9', 'Materials, laid out');

    P.push(page(`${tag} p1 morning`, `<header style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:10px 16px;border-bottom:3px solid ${INK};padding-bottom:9px">
<span style="font-weight:800;font-size:58px;line-height:0.8;letter-spacing:-0.05em;color:${ORANGE}">${d.day}</span>
<div style="flex:1 1 230px;min-width:0">
<div style="font-weight:800;font-size:24px;line-height:1.05;letter-spacing:-0.02em">${weekday}, ${md}</div>
<div style="font-weight:600;font-size:14.5px;line-height:1.3;color:${MUTED}">2027 · ${d.theme || ''}</div></div>
<span style="display:inline-flex;align-items:center;gap:7px;background:${AMBER};color:#3A2300;border-radius:999px;padding:8px 13px;font-weight:800;font-size:14px;line-height:1">${wk}</span>
</header>
<div style="display:flex;gap:16px;align-items:flex-start">
<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:9px">
<div><h1 style="font-weight:800;font-size:34px;line-height:1.04;letter-spacing:-0.02em;margin:0">${d.title}</h1></div>
${lastNight}
</div>
${hero}
</div>
<div style="display:flex;gap:16px;flex:1;min-height:0">
${schedule(d, '2.1in')}
<main style="flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;gap:12px">
${opening}
${flat}
${foot(`${ctx.monthName} · ${wk.split(':')[0]}`, `${tag} · morning →`)}
</main>
</div>`));

    // ---------- p2 the main event
    const mainChips = chipRow([timeChip(durOf(d, 'The Main Event')), kit((d.main && d.main.materials.length) || 0)]);
    const mainCard = d.main ? card({
      emoji: '🎨', eyebrow: `The main event · ${startOf(d, 'The Main Event')}`,
      title: d.main.title, intro: d.main.intro, chips: mainChips,
      body: need(d.main.materials.join(', ')) + steps(d.main.steps), tip: d.main.tip
    }) : '';
    const outsideImg = img(`d${d.day}-outside`, ctx.images.outside, `${d.outside ? d.outside.title : 'Outside'} — outdoors`,
      'width:2in;flex:none;aspect-ratio:4/3', 'Outdoors');
    const outsideCard = d.outside ? `<section style="background:#FFFFFF;border:2px solid ${TEAL};border-radius:14px;padding:13px 15px;display:flex;flex-direction:column;gap:8px">
<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
<span style="display:inline-flex;align-items:center;gap:6px;background:${TEAL};color:#FFFFFF;border-radius:999px;padding:6px 12px;font-weight:800;font-size:13.5px;line-height:1;letter-spacing:0.06em">🌳 OUTSIDE</span>
${eyebrow(`Get outside · ${startOf(d, 'Get Outside')}`)}
</div>
<h2 style="font-weight:800;font-size:22px;line-height:1.12;letter-spacing:-0.02em;margin:0">${d.outside.title}</h2>
<div style="display:flex;gap:14px;align-items:flex-start">
<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:8px">
${chipRow([timeChip(durOf(d, 'Get Outside')), chip('out', '🌳 outdoors')])}
${d.outside.paras.map(p => `<p style="margin:0;font-weight:400;font-size:14.3px;line-height:1.38;text-wrap:pretty">${p}</p>`).join('')}
</div>
${outsideImg}
</div>
</section>` : '';

    P.push(page(`${tag} p2 main event`, `<header style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;border-bottom:3px solid ${INK};padding-bottom:8px">
<div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">
<span style="font-weight:800;font-size:24px;line-height:1.05;letter-spacing:-0.02em">${tag} · The main event</span>
<span style="font-family:${MONO};font-size:11.5px;color:${MUTED}">${d.title} · ${weekday}, ${md}</span></div>
${chip('time', '⏱️ ' + startOf(d, 'The Main Event').replace(/^(.+?)–.*$/, '$1') + ' onward')}
</header>
${mainCard}
${outsideCard}
${foot(`${ctx.monthName} · ${wk.split(':')[0]}`, `${tag} · main event →`)}`));

    // ---------- p3 afternoon
    const secChips = chipRow([timeChip(durOf(d, 'Second Main Event')), kit((d.second && d.second.materials.length) || 0)]);
    const secCard = d.second ? card({
      emoji: '🎨', eyebrow: `Second main event · ${startOf(d, 'Second Main Event')}`,
      title: d.second.title, intro: d.second.intro, chips: secChips,
      body: need(d.second.materials.join(', ')) + steps(d.second.steps), tip: d.second.tip
    }) : '';
    const resultImg = img(`d${d.day}-result`, ctx.images.result, `${d.second ? d.second.title : d.title} — finished`,
      'width:100%;aspect-ratio:3/2', 'Finished result');

    P.push(page(`${tag} p3 afternoon`, `<header style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;border-bottom:3px solid ${INK};padding-bottom:8px">
<div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">
<span style="font-weight:800;font-size:24px;line-height:1.05;letter-spacing:-0.02em">${tag} · Afternoon</span>
<span style="font-family:${MONO};font-size:11.5px;color:${MUTED}">${d.title} · ${weekday}, ${md}</span></div>
${chip('time', '⏱️ ' + startOf(d, 'Second Main Event').replace(/^(.+?)–.*$/, '$1') + ' onward')}
</header>
<div style="display:flex;gap:16px;flex:1;min-height:0">
<main style="flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;gap:12px">
${secCard}
${foot(`${ctx.monthName} · ${wk.split(':')[0]}`, `${tag} · afternoon →`)}
</main>
<aside style="width:1.95in;flex:none;min-height:0;display:flex;flex-direction:column;gap:11px">
${resultImg}
${d.alternatives ? panel('#EDEAFE', '#4436B8', '✨ Afternoon alternatives', ul(d.alternatives)) : ''}
${d.outAgain ? panel('#DCF0D9', '#22622C', '🌳 Out again · pick one', ul(d.outAgain)) : ''}
</aside>
</div>`));

    // ---------- p4 for the grown-up
    const babies = [
      d.infant ? `<div style="background:#DFEEFA;border-radius:11px;padding:12px 14px">
<div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:6px">
<span style="font-weight:800;font-size:16px;line-height:1.12;color:#14456B">👶 Infant integration</span>
<span style="font-family:${MONO};font-size:11.5px;color:#14456B">morning</span></div>
<p style="margin:0;font-size:14.3px;line-height:1.4;text-wrap:pretty">${d.infant}</p></div>` : '',
      d.krestonPM ? `<div style="background:#DFEEFA;border-radius:11px;padding:12px 14px">
<div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:6px">
<span style="font-weight:800;font-size:16px;line-height:1.12;color:#14456B">👶 Kreston's afternoon</span>
<span style="font-family:${MONO};font-size:11.5px;color:#14456B">1:00 onward</span></div>
<p style="margin:0;font-size:14.3px;line-height:1.4;text-wrap:pretty">${d.krestonPM}</p></div>` : ''
    ].filter(Boolean);

    const insight = d.insight ? `<section style="flex:none;border-top:3px solid ${INK};padding-top:14px">
${eyebrow('🧠 One thing worth knowing')}
<h2 style="font-family:${SERIF};font-weight:700;font-size:29px;line-height:1.18;letter-spacing:-0.01em;margin:10px 0 12px;max-width:32ch">${d.insight.headline}</h2>
<div style="font-family:${SERIF};font-weight:400;font-size:16.5px;line-height:1.6;column-count:2;column-gap:28px;orphans:3;widows:3;text-wrap:pretty">${d.insight.paras.map((p, i) => `<p style="margin:${i ? '0.7em' : '0'} 0 0">${p}</p>`).join('')}</div>
</section>` : '';

    const safety = d.safety ? `<section style="display:flex;gap:9px;background:#FBE9E9;border:2px solid #B3202B;border-radius:11px;padding:12px 14px;align-items:flex-start">
<span aria-hidden="true">⚠️</span>
<p style="margin:0;font-weight:600;font-size:13.8px;line-height:1.4;text-wrap:pretty"><span style="color:#B3202B;font-weight:700">Safety:</span> ${d.safety}</p></section>` : '';

    const strip = ctx.tonight ? `<div style="margin-top:auto;display:flex;gap:16px;align-items:flex-start;background:${INK};color:${PAPER};border-radius:11px;padding:13px 15px">
<div style="width:1.3in;flex:none">
<div style="font-family:${MONO};font-size:11.5px;letter-spacing:0.12em;color:${AMBER}">TONIGHT, 9 PM</div>
<div style="font-weight:800;font-size:18px;line-height:1.08;margin-top:3px">Prep for Day ${ctx.tonight.day}</div></div>
<p style="flex:1;margin:0;font-size:14.3px;line-height:1.4;text-wrap:pretty">${ctx.tonight.prep}</p>
<div style="width:1.15in;flex:none;text-align:right;font-family:${MONO};font-size:11.5px;line-height:1.45;color:${AMBER}">Day ${ctx.tonight.day}<br />${ctx.tonight.title}</div></div>` : '';

    P.push(page(`${tag} p4 for the grown-up`, `<header style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;border-bottom:3px solid ${INK};padding-bottom:8px">
<div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">
<span style="font-weight:800;font-size:24px;line-height:1.05;letter-spacing:-0.02em">${tag} · For the grown-up</span>
<span style="font-family:${MONO};font-size:11.5px;color:${MUTED}">${d.title} · ${weekday}, ${md}</span></div>
</header>
${babies.length ? `<section style="display:grid;grid-template-columns:${babies.length > 1 ? '1fr 1fr' : '1fr'};gap:12px">${babies.join('')}</section>` : ''}
${insight}
${safety}
${strip}
<div style="display:flex;justify-content:space-between;gap:12px;font-family:${MONO};font-size:11.5px;color:${MUTED};${rule()};padding-top:6px">
<span>The Big Book of Little Days · ${ctx.monthName} · ${wk.split(':')[0]}</span><span>${tag} · for the grown-up</span></div>`, 14));

    return P;
  }

  // ---- week opener, two pages
  function openerPages(wk, ctx) {
    const o = wk.opener;
    const atwDay = wk.days.find(d => d.aroundWorld);
    const atw = atwDay ? atwDay.aroundWorld : null;
    const label = o.heading.split(':')[0] || ('Week ' + o.weekNo);
    const P = [];

    P.push(page(`${label} opener`, `<header style="border-bottom:3px solid ${INK};padding-bottom:10px">
${eyebrow(ctx.monthName + ' · ' + label)}
<h1 style="font-weight:800;font-size:40px;line-height:1.04;letter-spacing:-0.025em;margin:8px 0 0;max-width:30ch">${o.heading.replace(/^Week\s*\d+:\s*/, '')}</h1>
<div style="font-family:${MONO};font-size:13px;color:${MUTED};margin-top:6px">${o.dates} · Days ${wk.days[0].day}–${wk.days[wk.days.length - 1].day}</div>
</header>
${(o.about || []).length ? `<div style="display:grid;grid-template-columns:${o.about.length > 1 ? '1fr 1fr' : '1fr'};gap:26px;align-items:start;font-family:${SERIF};font-size:16.5px;line-height:1.58;text-wrap:pretty">${o.about.map(p => `<p style="margin:0">${p}</p>`).join('')}</div>` : ''}
<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:16px;align-items:start">
${(o.azlyn || []).length ? panel('#F1EDE6', MUTED, '🧒 What Azlyn will learn', ul(o.azlyn, 13.4)) : ''}
${o.krestonNote ? `<section style="background:${INK};color:${PAPER};border-radius:11px;padding:13px 14px"><div style="font-family:${MONO};font-size:11px;letter-spacing:0.12em;color:${AMBER};margin-bottom:5px">👶 KRESTON THIS WEEK</div><p style="margin:0;font-size:13.4px;line-height:1.42">${o.krestonNote}</p></section>` : ''}
</div>
${foot(ctx.monthName, label + ' · opener →')}`));

    if (atw) {
      P.push(page(`${label} around the world`, `<header style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;border-bottom:3px solid ${INK};padding-bottom:9px">
<span style="font-weight:800;font-size:26px;line-height:1.05;letter-spacing:-0.02em">🌍 Around the world</span>
<span style="font-family:${MONO};font-size:11.5px;color:${MUTED}">${label} · read it on Day ${atwDay.day}</span>
</header>
<h1 style="font-weight:800;font-size:34px;line-height:1.08;letter-spacing:-0.02em;margin:0;max-width:28ch">${atw.title}</h1>
<div style="display:flex;gap:20px;flex:1;min-height:0">
<main style="flex:1;min-width:0;display:flex;flex-direction:column;gap:13px">
<div style="font-family:${SERIF};font-size:16.5px;line-height:1.58;text-wrap:pretty">${atw.paras.map((p, i) => `<p style="margin:${i ? '0.7em' : '0'} 0 0">${p}</p>`).join('')}</div>
${atw.tryIt ? `<section style="display:flex;gap:10px;background:#EDEAFE;border-radius:11px;padding:13px 15px">
<span aria-hidden="true">✨</span>
<div><div style="font-weight:700;font-size:11.5px;letter-spacing:0.12em;text-transform:uppercase;color:#4436B8;margin-bottom:4px">Try it</div>
<p style="margin:0;font-weight:600;font-size:14.3px;line-height:1.4;text-wrap:pretty">${atw.tryIt}</p></div></section>` : ''}
${foot(ctx.monthName, label + ' · around the world →')}
</main>
<aside style="width:2.5in;flex:none;display:flex;flex-direction:column;gap:12px">
${img('w' + o.weekNo + '-world', ctx.worldImage, atw.title, 'width:100%;aspect-ratio:4/5', 'Around the world')}
${(o.you || []).length ? panel('#DFEEFA', '#14456B', "👩 What you'll learn", ul(o.you, 12.8)) : ''}
${atw.didYouKnow ? `<section style="background:#F5EAD6;border-radius:11px;padding:12px 13px"><div style="font-weight:700;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7A4E06;margin-bottom:5px">Did you know</div><p style="margin:0;font-family:${SERIF};font-style:italic;font-size:14px;line-height:1.42">${atw.didYouKnow}</p></section>` : ''}
</aside>
</div>`));
    }

    const shop = o.shopping || [];
    const PER_PAGE = 60;
    const chunks = [];
    for (let i = 0; i < shop.length; i += PER_PAGE) chunks.push(shop.slice(i, i + PER_PAGE));
    if (!chunks.length) chunks.push([]);
    chunks.forEach((items, ci) => {
      const part = chunks.length > 1 ? ` · sheet ${ci + 1} of ${chunks.length}` : '';
      P.push(page(`${label} shopping${chunks.length > 1 ? ' ' + (ci + 1) : ''}`, `<header style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;border-bottom:3px solid ${INK};padding-bottom:8px">
<span style="font-weight:800;font-size:26px;line-height:1.05;letter-spacing:-0.02em">🛒 ${label} shopping list</span>
<span style="font-family:${MONO};font-size:11.5px;color:${MUTED}">${shop.length} items${part} · check before the week starts</span>
</header>
${ci === 0 ? `<p style="margin:0;font-family:${SERIF};font-style:italic;font-size:14.5px;line-height:1.4;color:${MUTED}">Everything both main events call for, all seven days. Check what you already have first.</p>` : ''}
<div style="flex:1;min-height:0;column-count:3;column-gap:26px;font-size:13.2px;line-height:1.4">
${items.map(i => `<div style="break-inside:avoid;display:flex;gap:8px;align-items:flex-start;padding:2.5px 0"><span style="flex:none;width:11px;height:11px;margin-top:3px;border:1.5px solid ${MUTED};border-radius:3px"></span><span style="flex:1">${i}</span></div>`).join('')}
</div>
${foot(ctx.monthName, `${label} · shopping${chunks.length > 1 ? ' ' + (ci + 1) : ''} →`)}`));
    });
    return P;
  }

  // Real photographs that exist in design/images/. Everything else renders a named
  // placeholder frame, so dropping a correctly-named file in wires it up.
  const KNOWN_IMAGES = {
    3: {
      hero: 'images/w01-d03-01-ballrun.png',
      materials: 'images/w01-d03-02-tubes-tape.png',
      outside: 'images/w01-d03-03-stick-bridge.png',
      result: 'images/w01-d03-04-bridge-teddy.png'
    }
  };
  const KNOWN_WORLD = {};

  function booklet(monthName, weeks) {
    const flat = [];
    weeks.forEach(wk => wk.days.forEach(d => flat.push(d)));
    const pages = [];
    weeks.forEach(wk => {
      if (wk.opener && wk.opener.heading) {
        pages.push(...openerPages(wk, { monthName, worldImage: KNOWN_WORLD[wk.opener.weekNo] }));
      }
      const label = (wk.opener.heading || '').split(':')[0] || ('Week ' + wk.opener.weekNo);
      wk.days.forEach(d => {
        const i = flat.indexOf(d);
        const prev = i > 0 ? flat[i - 1] : null;
        const next = i + 1 < flat.length ? flat[i + 1] : null;
        pages.push(...dayPages(d, {
          monthName,
          weekLabel: wk.opener.heading || label,
          lastNight: prev ? prev.prepTonight : '',
          tonight: next && d.prepTonight ? { day: next.day, title: next.title, prep: d.prepTonight } : null,
          images: KNOWN_IMAGES[d.day] || {}
        }));
      });
    });
    return pages;
  }

  return { booklet, dayPages, openerPages };
})();

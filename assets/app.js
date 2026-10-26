/* ==========================================================================
   Prof. Dr. Exx Yxx — single-page app in four languages (hash routing, works
   from file:// too). Language packs load on demand from assets/lang/.
   ========================================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const app = $('#app');
const PIC = 'assets/img/';
const VER = 1;

let lang = 'tr';
try { lang = localStorage.getItem('exx-lang') || 'tr'; } catch (e) {}
const qLang = new URLSearchParams(location.search).get('lang');
if (qLang) lang = qLang;
if (!LANGS.some((l) => l.code === lang)) lang = 'tr';
const P = () => PACK[lang] || PACK.tr;
const u = (k) => P().ui[k] ?? PACK.tr.ui[k] ?? k;
const H = () => P().home;
const S = (id) => P().services[id];
const intl = () => LANGS.find((l) => l.code === lang).intl;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function loadLang(code) {
  if (PACK[code]) return Promise.resolve();
  return new Promise((ok, no) => { const s = document.createElement('script'); s.src = `assets/lang/${code}.js?v=${VER}`; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
}

/* ---------------- Icons ---------------- */
const I = {
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 22s8-7.4 8-13a8 8 0 0 0-16 0c0 5.6 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  cal: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  plane: '<svg viewBox="0 0 24 24"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  face: '<svg viewBox="0 0 24 24"><path d="M14 3c-3 2-4 5-4 8 0 2-3 5-3 6 0 .6 2 .8 3 1-1 1 0 2 2 2-1 1 0 2.5 1.5 2.5"/><circle cx="16" cy="9" r=".6"/></svg>',
  nose: '<svg viewBox="0 0 24 24"><path d="M12 3c0 5-4 9-4 12 0 2 1.5 3 3 3h2.5c1 0 1.5-.8 1.5-1.6"/><path d="M9 18c-1 0-2-.6-2-1.6M15 16.4c1 0 2 .6 2 1.6"/></svg>',
  ear: '<svg viewBox="0 0 24 24"><path d="M6 8.5a6 6 0 1 1 12 0c0 3-2 4-3 5.5s-1 3-2.5 4.5A3 3 0 0 1 7 16"/><path d="M15 8.5a3 3 0 1 0-6 0"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
  ai: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
  drop: '<svg viewBox="0 0 24 24"><path d="M12 2.7s7 7.5 7 12.3a7 7 0 0 1-14 0c0-4.8 7-12.3 7-12.3z"/></svg>',
  leaf: '<svg viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.1-6"/></svg>',
  wind: '<svg viewBox="0 0 24 24"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',
  layers: '<svg viewBox="0 0 24 24"><path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/></svg>',
  flower: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 9a3 3 0 1 1 3-3M15 12a3 3 0 1 1 3 3M12 15a3 3 0 1 1-3 3M9 12a3 3 0 1 1-3-3M12 15v7"/></svg>',
  wave: '<svg viewBox="0 0 24 24"><path d="M2 12h2l2-6 3 12 3-9 3 6 2-3h5"/></svg>',
  spin: '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>',
  child: '<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2M10 7h.01M14 7h.01"/></svg>',
  mic: '<svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
  award: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.3 7 22l5-3 5 3-1.2-8.7"/></svg>',
  mega: '<svg viewBox="0 0 24 24"><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 8a5 5 0 0 1 0 8M18 5a9 9 0 0 1 0 14"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" class="f"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" class="f"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15V9l5.8 3z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" class="f"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/></svg>',
};
const LOGO = `<svg class="logo-svg" viewBox="0 0 210 48" role="img" aria-label="Prof. Dr. Exx Yxx">
  <circle class="lg-ring" cx="24" cy="24" r="22"/><path class="lg-prof" d="M27 6c-3.4 2.6-4.4 6.4-4.4 9.6 0 2.4-5 7.6-5 9.4 0 .9 2.6 1 4.2 1.6-.8 1.6.8 2.6 2.6 2.6-.8 1.8 0 3.4 1.8 3.4 2.6 0 3.4 2.8 3.4 7.6"/>
  <text x="56" y="23" class="lg-word">Exx Yxx</text><text x="57" y="38" class="lg-sub">PROF. DR. · KBB &amp; ESTETİK</text></svg>`;

/* facial-proportion overlay (coordinates in the hero photo's own pixel space) */
const RATIO = `<svg class="ratio" viewBox="0 0 1133 1700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  ${[470, 640, 815, 1040].map((y, i) => `<path class="ln dash" style="--dl:${0.5 + i * 0.15}s" d="M190 ${y}H760"/>`).join('')}
  ${[['I', 555], ['II', 728], ['III', 928]].map(([t, y], i) => `<text x="150" y="${y + 9}" text-anchor="middle" style="--dl:${1.4 + i * 0.1}s">${t}</text>`).join('')}
  <path class="ln" style="--len:260;--dl:.9s" d="M376 586 350 688 292 782"/>
  <path class="ln" style="--len:160;--dl:1.2s" d="M292 782 331 818 338 876"/>
  <path class="ln dash" style="--dl:1.5s" d="M292 782 374 1036"/>
  <path class="ln" style="--len:120;--dl:1.3s" d="M372 628a62 62 0 0 0-46 46"/>
  ${[[350, 688], [292, 782], [331, 818], [374, 1036]].map(([x, y], i) => `<circle class="pt" style="--dl:${1.5 + i * 0.12}s" cx="${x}" cy="${y}" r="9"/>`).join('')}
  <text x="410" y="600" style="--dl:1.8s">∠ NF</text><text x="214" y="866" style="--dl:1.9s">∠ NL</text><text x="400" y="1090" style="--dl:2s">E-line</text>
</svg>`;

/* ---------------- Shared pieces ---------------- */
function pageHead(title, crumbs = [], lead = '', kicker = '', img = '') {
  const bc = [[u('home'), '#/'], ...crumbs].map(([n, h], i, a) => (i < a.length - 1 && h ? `<a href="${h}">${esc(n)}</a>` : `<span>${esc(n)}</span>`)).join('<i>/</i>');
  return `<section class="phead ${img ? 'has-img' : ''}"><div class="wrap"><div><nav class="crumbs">${bc}</nav>${kicker ? `<span class="kicker">${kicker}</span>` : ''}<h1>${title}</h1>${lead ? `<p>${lead}</p>` : ''}</div>${img ? `<div class="phead-img fx-up" style="--d:.15s"><img src="${PIC + img}" alt=""></div>` : ''}</div></section>`;
}
const sec = (k, t, p, cls = '') => `<div class="sec-head ${cls} rv"><span class="kicker">${k}</span><h2>${t}</h2>${p ? `<p>${p}</p>` : ''}</div>`;
const grpName = (g) => P().groups[g][0];
const svcCard = (s) => `<a class="svc rv" data-g="${s.g}" href="#/tedavi/${s.id}"><span class="svc-img"><img src="${PIC + s.img}" alt="" loading="lazy"><span class="svc-grp">${grpName(s.g)}</span>${s.star ? `<span class="svc-star">${I[s.icon]}</span>` : ''}</span>
  <span class="svc-body"><h3>${S(s.id).t}</h3><p>${S(s.id).s}</p><span class="svc-more">${u('readMore')} ${I.arrow}</span></span></a>`;
const tabs = () => `<div class="tabs"><button class="on" data-tab="all">${u('all')} <small>${SERVICES.length}</small></button>${GROUPS.map((g) => `<button data-tab="${g.id}">${I[g.icon]} ${grpName(g.id)} <small>${SERVICES.filter((s) => s.g === g.id).length}</small></button>`).join('')}</div>`;
const postCard = (b) => { const T = P().blog[b.id]; return `<a class="post rv" href="#/blog/${b.id}"><span class="post-img"><img src="${PIC + b.img}" alt="" loading="lazy"></span><span class="post-body"><h3>${T.t}</h3><p>${T.s}</p><span class="post-meta"><span>${b.mins} ${u('minRead')}</span><b>${u('readMore')} ${I.arrow}</b></span></span></a>`; };
const cta = () => { const c = H().cta; return `<section class="cta"><div class="cta-bg"><img src="${PIC}profile-2.jpg" alt="" loading="lazy"></div><div class="wrap"><div class="cta-in rv"><span class="kicker" style="color:var(--gold-2)">${u('book')}</span><h2>${c[0]}</h2><p>${c[1]}</p>
  <div class="acts"><a class="btn btn-gold mag" href="#/iletisim">${I.cal} ${c[2]}</a><a class="btn btn-line" href="${CLINIC.whatsapp}" target="_blank" rel="noopener">${I.whatsapp} WhatsApp</a></div></div></div></section>`; };
const fmtDate = (d) => d.toLocaleDateString(intl(), { weekday: 'short', day: 'numeric', month: 'short' });

/* ==========================================================================
   Pages
   ========================================================================== */
const ROUTES = {
  '': home,
  tedaviler: servicesPage,
  tedavi: (q, id) => servicePage(id),
  rehber: toolsPage,
  yurtdisi: intlPage,
  hakkimda: aboutPage,
  sss: faqPage,
  blog: (q, id) => (id ? postPage(id) : blogPage()),
  iletisim: contactPage,
};
const WHY_ICONS = ['book', 'wind', 'nose', 'shield', 'heart', 'globe'];
const STAR = ['rinoplasti', 'otoplasti', 'blefaroplasti', 'septoplasti', 'sinuzit', 'horlama'];

function home() {
  const h = H();
  return `
  <section class="hero"><div class="wrap">
    <div class="hero-in">
      <div>
        <span class="kicker fx-up" style="--d:.1s">${h.kicker}</span>
        <h1 class="fx-up" style="--d:.2s">${h.h1}</h1>
        <p class="lead fx-up" style="--d:.35s">${h.lead}</p>
        <div class="acts fx-up" style="--d:.45s"><a class="btn btn-plum mag" href="#/iletisim">${I.cal} ${h.cta1}</a><a class="btn btn-ghost" href="#/tedavi/rinoplasti">${h.cta2} ${I.arrow}</a></div>
        <button class="hero-ai fx-up" style="--d:.55s" data-ai><span class="ai-av">${I.ai}</span><span><b>${h.ai[0]} <em>24/7</em></b><small>${h.ai[1]}</small></span>${I.arrow}</button>
      </div>
      <div class="hero-media fx-up" style="--d:.3s">
        <div class="hero-photo"><img src="${PIC}hero-profile.jpg" alt="">${RATIO}</div>
        <div class="float-card fc-a"><span class="fc-ico">${I.nose}</span><span><b>${h.fc1[0]}</b><small>${h.fc1[1]}</small></span></div>
        <div class="float-card fc-b"><span class="fc-ico">${I.globe}</span><span><b>${h.fc2[0]}</b><small>${h.fc2[1]}</small></span></div>
      </div>
    </div>
    <div class="stats">${h.stats.map(([n, s, l]) => `<div class="rv"><b>${/^(19|20)\d\d$/.test(n) && !s ? n : `<span data-count="${n}">0</span>`}<small>${s}</small></b><span>${l}</span></div>`).join('')}</div>
  </div></section>

  <section class="sec alt"><div class="wrap split">
    <div class="photo tall arch rv"><img src="${PIC}profile-bw.jpg" alt="" loading="lazy"></div>
    <div>${sec(h.ratio[0], h.ratio[1], h.ratio[2])}<div class="ratio-list">${h.ratio[3].map(([t, p], i) => `<div class="rv"><b><i>${i + 1}</i>${t}</b><span>${p}</span></div>`).join('')}</div>
      <div class="acts rv"><a class="btn btn-plum" href="#/tedavi/rinoplasti">${h.cta2} ${I.arrow}</a></div></div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-head row rv"><div><span class="kicker">${h.svc[0]}</span><h2>${h.svc[1]}</h2><p>${h.svc[2]}</p></div><a class="btn btn-ghost" href="#/tedaviler">${u('allServices')} ${I.arrow}</a></div>
    <div class="svc-grid">${STAR.map((id) => svcCard(SERVICES.find((s) => s.id === id))).join('')}</div>
  </div></section>

  <section class="sec plum"><div class="wrap">
    ${sec(h.why[0], h.why[1], '', 'center')}
    <div class="why">${h.why[2].map(([t, p], i) => `<div class="rv"><span class="ico">${I[WHY_ICONS[i]]}</span><h3>${t}</h3><p>${p}</p></div>`).join('')}</div>
  </div></section>

  <section class="sec" id="iyilesme"><div class="wrap">${sec(h.rec[0], h.rec[1], h.rec[2])}${recTool('rinoplasti')}</div></section>

  <section class="sec alt"><div class="wrap split">
    <div>${sec(h.intl[0], h.intl[1], h.intl[2])}
      <div class="intl-steps">${P().intl.steps.slice(0, 4).map(([t, p], i) => `<div class="istep rv"><b>${i + 1}</b><div><h3>${t}</h3><p>${p}</p></div></div>`).join('')}</div>
      <div class="lang-chips rv">${LANGS.map((l) => `<span><span class="lang-flag">${FLAGS[l.code]}</span>${l.name}</span>`).join('')}</div>
      <div class="acts rv"><a class="btn btn-plum" href="#/yurtdisi">${u('intl')} ${I.arrow}</a></div></div>
    <div class="photo tall arch rv"><img src="${PIC}plane.jpg" alt="" loading="lazy"></div>
  </div></section>

  <section class="sec" id="belirti"><div class="wrap">${sec(h.nav[0], h.nav[1], h.nav[2])}${navTool()}</div></section>

  <section class="sec alt"><div class="wrap">
    <div class="sec-head row rv"><div><span class="kicker">${h.blog[0]}</span><h2>${h.blog[1]}</h2></div><a class="btn btn-ghost" href="#/blog">${u('blog')} ${I.arrow}</a></div>
    <div class="posts">${BLOG.map(postCard).join('')}</div>
  </div></section>
  ${cta()}`;
}

function servicesPage() {
  const h = H();
  return pageHead(h.svc[1], [[u('services')]], h.svc[2], h.svc[0], 'rhino-men.jpg') +
    `<section class="sec"><div class="wrap">${tabs()}<div class="svc-grid" id="svcGrid">${SERVICES.map(svcCard).join('')}</div></div></section>
    <section class="sec alt" id="belirti"><div class="wrap">${sec(h.nav[0], h.nav[1], h.nav[2])}${navTool()}</div></section>${cta()}`;
}

function servicePage(id) {
  const s = SERVICES.find((x) => x.id === id); if (!s) return notFound();
  const T = S(id);
  let body = `<p class="lead-p rv">${T.i}</p><ul class="pts">${T.pts.map((x) => `<li class="rv">${I.check}<span>${x}</span></li>`).join('')}</ul>`;
  if (T.steps) body += `<h2 class="rv">${u('steps')}</h2><div class="steps">${T.steps.map(([t, p], i) => `<div class="step rv"><b>0${i + 1}</b><h3>${t}</h3><p class="muted">${p}</p></div>`).join('')}</div>`;
  if (T.x) body += T.x.map(([h2, p], i) => `<h2 class="rv">${h2}</h2><p class="rv">${p}</p>${i === 0 && T.cmp ? `<div class="cmp rv">${T.cmp.map((r) => `<div class="cmp-row">${r.map((c) => `<div>${c}</div>`).join('')}</div>`).join('')}</div>` : ''}`).join('');
  if (T.faq) body += `<h2 class="rv">${u('faqT')}</h2>${acc(T.faq)}`;
  body += `<div class="note rv">${I.info}<span>${u('disclaimer')}</span></div>`;
  const ask = { tr: `${T.t} hakkında bilgi`, en: `Tell me about ${T.t}`, de: `Mehr über ${T.t}`, id: `Informasi tentang ${T.t}` }[lang];
  return pageHead(T.t, [[u('services'), '#/tedaviler'], [T.t]], T.s, grpName(s.g), s.img) +
    `<section class="sec"><div class="wrap detail"><div class="prose">${body}</div>
      <aside class="side"><div class="side-card plum rv"><h4>${H().cta[0]}</h4><p>${H().cta[1]}</p><a class="btn btn-gold full" href="#/iletisim">${I.cal} ${u('book')}</a></div>
      <div class="side-card rv"><h4>${u('askAI')}</h4><button class="btn btn-ghost full" data-ai="${esc(ask)}">${I.ai} ${u('askAI')}</button></div>
      <div class="side-card rv"><h4>${u('related')}</h4><div class="side-links">${SERVICES.filter((x) => x.g === s.g && x !== s).map((x) => `<a href="#/tedavi/${x.id}"><span>${I[x.icon]}</span>${S(x.id).t}</a>`).join('')}<a href="#/tedaviler"><span>${I.layers}</span>${u('allServices')}</a></div></div></aside></div></section>
    ${RECOVERY[id] ? `<section class="sec alt" id="iyilesme"><div class="wrap">${sec(H().rec[0], H().rec[1], H().rec[2])}${recTool(id)}</div></section>` : ''}${cta()}`;
}
const acc = (items) => `<div class="acc">${items.map(([q, a], i) => `<details class="rv" ${i ? '' : 'open'}><summary>${q}${I.plus}</summary><p>${a}</p></details>`).join('')}</div>`;

/* ---------------- Recovery timeline ---------------- */
let recProc = 'rinoplasti', recDay = 0;
const recMax = { rinoplasti: 365, otoplasti: 60, blefaroplasti: 180 };
function recTool(proc) {
  recProc = proc; recDay = 0;
  const R = P().recovery;
  return `<div class="rec" id="recTool"><div class="card rv">
      <div class="seg">${Object.keys(RECOVERY).map((k) => `<button data-rec="${k}" class="${k === proc ? 'on' : ''}">${S(k).t.split(' (')[0]}</button>`).join('')}</div>
      <div class="rec-day" id="recDay"></div>
      <input type="range" id="recRange" min="0" max="${recMax[proc]}" value="0" aria-label="${u('day')}">
      <div class="rec-ticks" id="recTicks"></div>
      <div class="red-flag">${I.alert}<span>${R.alert}</span></div>
    </div><div class="card plum rv" id="recStage"></div></div>`;
}
function renderRec() {
  const box = $('#recTool'); if (!box) return;
  const days = RECOVERY[recProc], R = P().recovery[recProc];
  let k = 0; days.forEach((d, i) => { if (recDay >= d) k = i; });
  const d = recDay, label = d === 0 ? R[0][0] : d < 14 ? `${u('day')} ${d}` : d < 60 ? `${Math.round(d / 7)}. ${u('week')}` : `${Math.round(d / 30)}. ${u('month')}`;
  $('#recDay').innerHTML = `${label}<small>${d ? `· ${u('day')} ${d}` : ''}</small>`;
  $('#recTicks').innerHTML = [0, Math.round(recMax[recProc] / 2), recMax[recProc]].map((x) => `<span>${x}</span>`).join('');
  $('#recStage').innerHTML = `<div class="rec-stage"><span class="kicker" style="color:var(--gold-2);margin:0">${S(recProc).t.split(' (')[0]}</span><h3>${R[k][0]}</h3><p>${R[k][1]}</p><div class="rec-tip">${I.check}${R[k][2]}</div></div>
    <div class="rec-bar">${days.map((x, i) => `<i class="${i <= k ? 'on' : ''}"></i>`).join('')}</div>`;
}

/* ---------------- Symptom navigator ---------------- */
let navSel = new Set();
function navTool() {
  const N = P().nav;
  return `<div class="symp" id="navTool"><div class="rv"><h3 style="font-size:1.4rem">${N.pick}</h3><div class="chips">${SYMPTOMS.map((x) => `<button data-sym="${x.id}" class="${navSel.has(x.id) ? 'on' : ''}">${I[x.icon]} ${N.s[x.id]}</button>`).join('')}</div>
    <div class="red-flag">${I.alert}<span>${N.red}</span></div></div>
    <div class="symp-res rv"><div class="card" id="navRes"></div></div></div>`;
}
function renderNav() {
  const box = $('#navRes'); if (!box) return;
  const N = P().nav;
  if (!navSel.size) { box.innerHTML = `<h3 style="font-size:1.4rem">${N.res}</h3><p class="muted">${N.none}</p>`; return; }
  const score = {};
  SYMPTOMS.filter((x) => navSel.has(x.id)).forEach((x) => x.s.forEach((id, i) => { score[id] = (score[id] || 0) + 3 - Math.min(i, 2); }));
  const list = Object.keys(score).sort((a, b) => score[b] - score[a]);
  box.innerHTML = `<h3 style="font-size:1.4rem">${N.res}</h3><div class="res-list">${list.map((id) => { const s = SERVICES.find((x) => x.id === id); return `<a href="#/tedavi/${id}"><span>${I[s.icon]}</span><div>${S(id).t}<small>${S(id).s}</small></div>${I.arrow}</a>`; }).join('')}</div>
    <div class="acts"><a class="btn btn-plum" href="#/iletisim">${I.cal} ${u('book')}</a></div>`;
}

/* ---------------- International planner ---------------- */
let planProc = 'rinoplasti', planDate = '';
function planTool() {
  const L = P().intl.plan;
  if (!planDate) { const d = new Date(); d.setDate(d.getDate() + 30); planDate = d.toISOString().slice(0, 10); }
  return `<div class="card plum plan" id="planTool"><span class="kicker" style="color:var(--gold-2);margin:0">${L[0]}</span><p class="muted" style="margin:0">${L[1]}</p>
    <div class="plan-in"><label>${L[3]}<select id="planProc">${Object.keys(PLAN).map((k) => `<option value="${k}" ${k === planProc ? 'selected' : ''}>${S(k).t}</option>`).join('')}</select></label>
    <label>${L[2]}<input type="date" id="planDate" value="${planDate}"></label></div>
    <div class="plan-list" id="planList"></div><p class="small" style="color:var(--on-plum-muted);margin:0">${L[11]}</p></div>`;
}
function renderPlan() {
  const box = $('#planList'); if (!box) return;
  const L = P().intl.plan, p = PLAN[planProc], op = new Date(planDate + 'T12:00:00');
  if (isNaN(op)) return;
  const at = (n) => { const d = new Date(op); d.setDate(d.getDate() + n); return fmtDate(d); };
  const rows = [[p.arrive, L[4]], [0, L[5], 'op'], ...p.controls.map((c) => [c, L[6]]), [p.cast, L[7]], [p.fly, L[8]]].sort((a, b) => a[0] - b[0]);
  box.innerHTML = rows.map(([n, t, c]) => `<div class="plan-row ${c || ''}"><b>${at(n)}</b><span>${t}</span></div>`).join('') +
    `<div class="plan-sum"><span>${L[9]}</span><b>${p.fly - p.arrive + 1} <small style="font-size:1rem">${L[10]}</small></b></div>`;
}

/* ---------------- Other pages ---------------- */
function toolsPage() {
  const h = H();
  return pageHead(u('tools'), [[u('tools')]], h.rec[2], h.rec[0], 'care-hands.jpg') +
    `<section class="sec" id="iyilesme"><div class="wrap">${sec(h.rec[0], h.rec[1], h.rec[2])}${recTool('rinoplasti')}</div></section>
    <section class="sec alt" id="belirti"><div class="wrap">${sec(h.nav[0], h.nav[1], h.nav[2])}${navTool()}</div></section>
    <section class="sec" id="plan"><div class="wrap split"><div>${sec(h.intl[0], P().intl.plan[0], P().intl.plan[1])}<div class="photo tall arch rv"><img src="${PIC}hotel.jpg" alt="" loading="lazy"></div></div>${planTool()}</div></section>${cta()}`;
}
function intlPage() {
  const T = P().intl;
  return pageHead(T.t, [[u('intl')]], T.lead, T.k, 'plane.jpg') +
    `<section class="sec"><div class="wrap split" style="align-items:start"><div><div class="intl-steps">${T.steps.map(([t, p], i) => `<div class="istep rv"><b>${i + 1}</b><div><h3>${t}</h3><p>${p}</p></div></div>`).join('')}</div>
      <h3 class="rv" style="margin-top:2rem;font-size:1.4rem">${u('langsSpoken')}</h3><p class="muted rv">${T.langs}</p><div class="lang-chips rv">${LANGS.map((l) => `<span><span class="lang-flag">${FLAGS[l.code]}</span>${l.name}</span>`).join('')}</div></div>
      <div style="position:sticky;top:110px">${planTool()}</div></div></section>
    <section class="sec alt"><div class="wrap split"><div class="photo tall arch rv"><img src="${PIC}video-consult.jpg" alt="" loading="lazy"></div>
      <div>${sec(T.steps[0][0], H().intl[1], T.steps[0][1])}<div class="acts rv"><a class="btn btn-plum" href="#/iletisim">${I.cal} ${u('book')}</a><a class="btn btn-wa" href="${CLINIC.whatsapp}" target="_blank" rel="noopener">${I.whatsapp} WhatsApp</a></div></div></div></section>${cta()}`;
}
function aboutPage() {
  const A = P().about, h = H(), max = Math.max(...RESEARCH.map((r) => r.n));
  return pageHead(A.t, [[u('about')]], A.lead, A.k, 'doctor-coat.jpg') +
    `<section class="sec"><div class="wrap split" style="align-items:start"><div class="photo tall arch rv"><img src="${PIC}desk.jpg" alt="" loading="lazy"></div>
      <div class="prose"><p class="lead-p rv">${A.story[0]}</p>${A.story.slice(1).map((p) => `<p class="rv">${p}</p>`).join('')}<div class="acts rv"><a class="btn btn-plum" href="#/iletisim">${I.cal} ${u('book')}</a><a class="btn btn-ghost" href="#/tedaviler">${u('services')}</a></div></div></div></section>
    <section class="sec plum"><div class="wrap"><div class="tl">${A.tl.map(([y, t]) => `<div class="rv"><b>${y}</b><span>${t}</span></div>`).join('')}</div></div></section>
    <section class="sec"><div class="wrap research"><div>${sec(u('about'), A.research[0], A.research[1])}</div>
      <div class="rbars rv" id="rbars">${RESEARCH.map((r) => `<div><span>${A.research[2][r.k]}</span><i><em style="--w:${(r.n / max) * 100}%"></em></i><b>${r.n}</b></div>`).join('')}</div></div></section>
    <section class="sec alt"><div class="wrap"><div class="extra">${A.extra.map(([t, p], i) => `<div class="rv"><span class="ico">${I[['book', 'award', 'mega'][i]]}</span><h3>${t}</h3><p>${p}</p></div>`).join('')}</div></div></section>
    <section class="sec plum"><div class="wrap">${sec(h.why[0], h.why[1], '', 'center')}<div class="why">${h.why[2].map(([t, p], i) => `<div class="rv"><span class="ico">${I[WHY_ICONS[i]]}</span><h3>${t}</h3><p>${p}</p></div>`).join('')}</div></div></section>${cta()}`;
}
function faqPage() {
  return pageHead(u('faqT'), [[u('faq')]], '', u('faq')) +
    `<section class="sec"><div class="wrap" style="max-width:900px">${P().faq.map(([g, items]) => `<h2 class="rv" style="font-size:1.8rem;margin:2rem 0 .4rem">${g}</h2>${acc(items)}`).join('')}<div class="note rv">${I.info}<span>${u('disclaimer')}</span></div></div></section>${cta()}`;
}
function blogPage() {
  return pageHead(H().blog[1], [[u('blog')]], '', H().blog[0]) + `<section class="sec"><div class="wrap"><div class="posts">${BLOG.map(postCard).join('')}</div></div></section>${cta()}`;
}
function postPage(id) {
  const b = BLOG.find((x) => x.id === id); if (!b) return notFound();
  const T = P().blog[id];
  return pageHead(T.t, [[u('blog'), '#/blog'], [T.t]], T.s, `${b.mins} ${u('minRead')}`, b.img) +
    `<section class="sec"><div class="wrap detail"><div class="prose">${T.x.map(([h2, p], i) => `${h2 ? `<h2 class="rv">${h2}</h2>` : ''}<p class="rv ${!i && !h2 ? 'lead-p' : ''}">${p}</p>`).join('')}<div class="note rv">${I.info}<span>${u('disclaimer')}</span></div></div>
    <aside class="side"><div class="side-card plum rv"><h4>${H().cta[0]}</h4><p>${H().cta[1]}</p><a class="btn btn-gold full" href="#/iletisim">${I.cal} ${u('book')}</a></div>
    <div class="side-card rv"><h4>${H().blog[0]}</h4><div class="side-links">${BLOG.filter((x) => x !== b).map((x) => `<a href="#/blog/${x.id}"><span>${I.book}</span>${P().blog[x.id].t}</a>`).join('')}</div></div></aside></div></section>${cta()}`;
}
function contactPage() {
  const f = (k, type = 'text', req, full) => `<label class="${full ? 'full' : ''}">${u(k)}${req ? ' *' : ''}<input id="f-${k}" type="${type}" ${req ? 'required' : ''}></label>`;
  return pageHead(u('contactTitle'), [[u('contact')]], u('contactLead')) +
    `<section class="sec"><div class="wrap contact"><div>
      <div class="cinfo rv">
        <a class="ci" href="${CLINIC.whatsapp}" target="_blank" rel="noopener"><span>${I.whatsapp}</span><small>${u('mobileL')}</small><p>${u('waMsg')}</p></a>
        <a class="ci" href="${CLINIC.phoneHref}"><span>${I.phone}</span><small>${u('phoneL')}</small><p>${CLINIC.phone}</p></a>
        <a class="ci" href="mailto:${CLINIC.email}"><span>${I.mail}</span><small>${u('emailL')}</small><p>${CLINIC.email}</p></a>
        <div class="ci"><span>${I.clock}</span><small>${u('hoursL')}</small><p>${u('hours')}</p></div>
        <a class="ci wide" href="${CLINIC.maps}" target="_blank" rel="noopener"><span>${I.pin}</span><small>${u('addressL')}</small><p>${CLINIC.address}</p></a>
      </div>
      <div class="lang-chips rv">${LANGS.map((l) => `<span><span class="lang-flag">${FLAGS[l.code]}</span>${l.name}</span>`).join('')}</div>
      <div class="photo rv" style="margin-top:1rem;aspect-ratio:16/10"><img src="${PIC}corridor.jpg" alt="" loading="lazy"></div></div>
      <form class="frm rv" id="fContact" novalidate><h3>${u('book')}</h3><div class="frm-grid">
        ${f('name', 'text', 1)}${f('phone', 'tel', 1)}${f('email', 'email', 1)}${f('country')}
        <label class="full">${u('topic')}<select id="f-topic">${SERVICES.map((s) => `<option>${S(s.id).t}</option>`).join('')}<option>${u('intl')}</option></select></label>
        <label class="full">${u('message')} *<textarea id="f-message" rows="4" required></textarea></label>
        <label class="full">${u('photos')}<input id="f-photos" type="file" accept="image/*" multiple></label>
        <label class="consent full"><input type="checkbox" id="f-kvkk" required><span>${u('consent')}</span></label>
      </div><button class="btn btn-plum full" type="submit">${u('send')} ${I.arrow}</button><p class="frm-msg" role="status"></p></form>
    </div></section>`;
}
const notFound = () => pageHead('404', [['404']]) + `<section class="sec"><div class="wrap center"><a class="btn btn-plum" href="#/">${u('home')}</a></div></section>`;

/* ==========================================================================
   Chrome
   ========================================================================== */
function renderChrome() {
  document.documentElement.lang = lang;
  $('#logo').innerHTML = LOGO; $('#introMark').innerHTML = LOGO;
  $('#topbar').innerHTML = `<div class="wrap"><a href="${CLINIC.phoneHref}">${I.phone}${CLINIC.phone}</a><a class="tb-mail" href="mailto:${CLINIC.email}">${I.mail}${CLINIC.email}</a><span class="tb-hours">${I.clock}${u('hours')}</span><span class="tb-badge">TR · EN · DE · ID</span></div>`;
  $('#nav').innerHTML = [['', 'home'], ['hakkimda', 'about'], ['tedaviler', 'services', 'tedavi'], ['yurtdisi', 'intl'], ['rehber', 'tools'], ['sss', 'faq'], ['blog', 'blog'], ['iletisim', 'contact']]
    .map(([r, k, also]) => `<a href="#/${r}" data-r="${r}${also ? ' ' + also : ''}">${u(k)}</a>`).join('') +
    `<button class="nav-theme" type="button" data-theme-toggle><svg class="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="i-moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>☾ / ☀</button><a class="nav-book" href="#/iletisim">${u('book')}</a>`;
  $('#aiPill').innerHTML = `${I.ai}<span>${u('aiName')}</span>`;
  $('#langBtn').innerHTML = `<span class="lang-flag">${FLAGS[lang]}</span><span class="lang-code">${lang.toUpperCase()}</span><svg class="lang-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>`;
  $('#langMenu').innerHTML = `<span class="lang-title">${u('chooseLang')}</span>` + LANGS.map((l) => `<button role="menuitemradio" aria-checked="${l.code === lang}" data-lang="${l.code}" class="${l.code === lang ? 'on' : ''}"><span class="lang-flag">${FLAGS[l.code]}</span><span class="lang-name"><b>${l.name}</b><small>${l.code.toUpperCase()}</small></span><svg class="lang-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>`).join('');
  $('#hdrBook').innerHTML = `${I.cal} ${u('book')}`;
  $('#ftr').innerHTML = `<div class="wrap ftr-grid">
    <div><a href="#/" class="logo ftr-logo">${LOGO}</a><p>${u('footer')}</p>
      <div class="socials"><a href="${CLINIC.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.instagram}</a><a href="${CLINIC.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${I.youtube}</a><a href="${CLINIC.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${I.facebook}</a><a href="${CLINIC.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.whatsapp}</a></div></div>
    <div><h5>${u('services')}</h5>${SERVICES.slice(0, 8).map((s) => `<a href="#/tedavi/${s.id}">${S(s.id).t}</a>`).join('')}</div>
    <div><h5>${u('pages')}</h5><a href="#/hakkimda">${u('about')}</a><a href="#/yurtdisi">${u('intl')}</a><a href="#/rehber">${u('tools')}</a><a href="#/sss">${u('faq')}</a><a href="#/blog">${u('blog')}</a><a href="#/iletisim">${u('contact')}</a></div>
    <div class="ftr-c"><h5>${u('contact')}</h5><p>${I.pin}<span>${CLINIC.address}</span></p><p>${I.phone}<a href="${CLINIC.phoneHref}">${CLINIC.phone}</a></p><p>${I.mail}<a href="mailto:${CLINIC.email}">${CLINIC.email}</a></p><p>${I.clock}<span>${u('hours')}</span></p></div>
  </div>
  <div class="wrap"><p class="ftr-disc">${u('disclaimer')}</p></div>
  <div class="wrap ftr-bot"><span>© ${new Date().getFullYear()} ${CLINIC.doctor}. ${u('rights')}</span><span>KVKK · ${u('legal')}</span></div>`;
  $('#dock').innerHTML = `
    <a class="dk wa" href="${CLINIC.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.whatsapp}<span class="tip">WhatsApp</span></a>
    <a class="dk ig" href="${CLINIC.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.instagram}<span class="tip">Instagram</span></a>
    <a class="dk yt" href="${CLINIC.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${I.youtube}<span class="tip">YouTube</span></a>
    <div class="dk-ai-wrap">
      <div class="ai-teaser" id="aiTeaser" hidden><button class="ai-teaser-x" aria-label="×">${I.x}</button><p>${u('teaser')}</p><button class="ai-teaser-go" data-ai>${u('teaserGo')} ${I.arrow}</button></div>
      <button class="dk-ai" data-ai aria-label="${u('aiOpen')}"><span class="dk-ai-av">${I.ai}</span><span class="dk-ai-t"><b>${u('aiName')}</b><small><i class="dot"></i> ${u('online')}</small></span></button>
    </div>`;
  $('#aiAv').innerHTML = I.ai;
  $('#aiTitle').textContent = u('aiName');
  $('#aiStatus').textContent = P().ai.status;
  $('#aiText').placeholder = P().ai.ph;
  setSug();
}

/* ---------------- Router ---------------- */
function render() {
  if (location.hash && !location.hash.startsWith('#/')) return;
  const raw = location.hash.replace(/^#\/?/, '');
  const [pathQ, anchor] = raw.split('#');
  const [path, qs] = pathQ.split('?');
  const [name, ...args] = path.split('/').filter(Boolean);
  app.innerHTML = (ROUTES[name || ''] || notFound)(new URLSearchParams(qs || ''), ...args.map(decodeURIComponent));
  closeMenus();
  window.scrollTo({ top: 0, behavior: 'instant' });
  $$('#nav [data-r]').forEach((a) => a.classList.toggle('on', a.dataset.r.split(' ').includes(name || '')));
  after();
  if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 160);
}
window.addEventListener('hashchange', render);

let obs;
function after() {
  obs?.disconnect();
  obs = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; e.target.classList.add('in'); obs.unobserve(e.target); }), { threshold: 0.1 });
  $$('.rv', app).forEach((el, i) => { if (el.getBoundingClientRect().top < innerHeight) { el.classList.add('in'); return; } el.style.transitionDelay = (i % 4) * 0.06 + 's'; obs.observe(el); });
  if ($('#recTool')) { renderRec(); }
  if ($('#navTool')) renderNav();
  if ($('#planTool')) renderPlan();
  bindForms();
  window.FX?.mount();
}
function bindForms() {
  $$('form.frm').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault(); const msg = $('.frm-msg', f); let ok = true;
    $$('[required]', f).forEach((el) => { const bad = el.type === 'checkbox' ? !el.checked : (!el.value.trim() || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value))); (el.type === 'checkbox' ? el.parentElement : el).classList.toggle('bad', bad); if (bad) ok = false; });
    if (!ok) { msg.className = 'frm-msg err'; msg.textContent = u('formErr'); return; }
    const txt = `${u('book')}: ${$('#f-name').value} · ${$('#f-topic').value}${$('#f-country').value ? ' · ' + $('#f-country').value : ''}`;
    msg.className = 'frm-msg ok'; msg.innerHTML = `${u('formOk')}<br><a class="btn btn-wa" target="_blank" rel="noopener" href="${CLINIC.whatsapp}?text=${encodeURIComponent(txt)}">${I.whatsapp} WhatsApp</a>`;
  }));
}

/* ==========================================================================
   Global UI
   ========================================================================== */
const hdr = $('#hdr');
window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 30), { passive: true });
const burger = $('#burger'), nav = $('#nav');
burger.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.classList.toggle('lock', o); });
nav.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenus(); });
function closeMenus() { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('lock'); }
const langBox = $('#lang');
$('#langBtn').addEventListener('click', (e) => { e.stopPropagation(); const o = langBox.classList.toggle('open'); $('#langBtn').setAttribute('aria-expanded', o); });
document.addEventListener('click', (e) => { if (!e.target.closest('#lang')) { langBox.classList.remove('open'); $('#langBtn').setAttribute('aria-expanded', 'false'); } });
async function setLang(code) {
  langBox.classList.remove('open');
  if (code === lang) return;
  try { await loadLang(code); } catch (e) { toast('⚠️ ' + code); return; }
  lang = code; try { localStorage.setItem('exx-lang', lang); } catch (e2) {}
  window.FX?.curtain(() => { renderChrome(); render(); greeted = false; aiBody.innerHTML = ''; });
}
document.addEventListener('click', (e) => {
  if (e.target.closest('#themeBtn, [data-theme-toggle]')) {
    const r = document.documentElement; const dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    r.dataset.theme = dark ? 'light' : 'dark'; try { localStorage.setItem('exx-theme', r.dataset.theme); } catch (e2) {}
    return;
  }
  const lb = e.target.closest('[data-lang]'); if (lb) { setLang(lb.dataset.lang); return; }
  const tb = e.target.closest('[data-tab]'); if (tb) { $$('[data-tab]').forEach((x) => x.classList.toggle('on', x === tb)); $$('#svcGrid .svc').forEach((c) => { const show = tb.dataset.tab === 'all' || c.dataset.g === tb.dataset.tab; c.classList.toggle('hide', !show); if (show) c.classList.add('in'); }); return; }
  const rc = e.target.closest('[data-rec]'); if (rc) { recProc = rc.dataset.rec; recDay = 0; $$('[data-rec]').forEach((x) => x.classList.toggle('on', x === rc)); const r = $('#recRange'); r.max = recMax[recProc]; r.value = 0; renderRec(); return; }
  const sy = e.target.closest('[data-sym]'); if (sy) { const id = sy.dataset.sym; navSel.has(id) ? navSel.delete(id) : navSel.add(id); sy.classList.toggle('on', navSel.has(id)); renderNav(); return; }
  const ai = e.target.closest('[data-ai]'); if (ai) { e.preventDefault(); openAI(ai.dataset.ai); }
  if (e.target.closest('.ai-teaser-x, [data-ai]')) { $('#aiTeaser')?.setAttribute('hidden', ''); try { sessionStorage.setItem('exx-teaser', '1'); } catch (e2) {} }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'recRange') { recDay = +e.target.value; renderRec(); }
  if (e.target.id === 'planDate') { planDate = e.target.value; renderPlan(); }
});
document.addEventListener('change', (e) => { if (e.target.id === 'planProc') { planProc = e.target.value; renderPlan(); } });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeAI(); closeMenus(); } });
let toastT;
function toast(html) { const el = $('#toast'); el.innerHTML = html; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2600); }

/* ==========================================================================
   AI assistant — general patient information in four languages; it never
   diagnoses. For a production LLM, replace answer() with a backend call.
   ========================================================================== */
const KW = {
  emergency: ['kanama durm', 'durmayan kanama', 'nefes alamıyorum', 'nefes darlığı', 'ani işitme', 'yüksek ateş', 'acil', 'bleeding won', "can't breathe", 'cannot breathe', 'shortness of breath', 'sudden hearing', 'emergency', 'blutung', 'atemnot', 'hörsturz', 'notfall', 'pendarahan', 'sesak napas', 'tuli mendadak', 'darurat'],
  price: ['fiyat', 'ücret', 'ne kadar tutar', 'maliyet', 'price', 'cost', 'how much', 'fee', 'preis', 'kosten', 'was kostet', 'harga', 'biaya', 'berapa'],
  intl: ['yurt dışı', 'yurtdışı', 'yurtdisi', 'otel', 'vize', 'uçak', 'uçağa', 'abroad', 'international', 'travel', 'flight', 'hotel', 'visa', 'ausland', 'reise', 'flug', 'luar negeri', 'perjalanan', 'penerbangan', 'terbang'],
  book: ['randevu', 'appointment', 'book', 'termin', 'janji', 'konsultasi', 'konsültasyon', 'consultation'],
  recovery: ['iyileşme', 'işe dön', 'alçı', 'ödem', 'şişlik', 'morluk', 'ne zaman', 'recovery', 'swelling', 'bruis', 'cast', 'back to work', 'heilung', 'schwellung', 'gips', 'pemulihan', 'bengkak', 'kapan'],
  closed: ['kapalı teknik', 'açık teknik', 'closed technique', 'open technique', 'closed rhino', 'geschlossen', 'offene technik', 'teknik tertutup', 'teknik terbuka'],
  langs: ['dil ', 'ingilizce', 'almanca', 'language', 'english', 'german', 'sprache', 'englisch', 'deutsch', 'bahasa', 'indonesia'],
  which: ['hangi', 'şikayet', 'belirti', 'which', 'symptom', 'welche', 'beschwerde', 'gejala', 'keluhan'],
  hello: ['merhaba', 'selam', 'hello', 'hi ', 'hey', 'hallo', 'guten tag', 'halo', 'selamat'],
  thanks: ['teşekkür', 'sağol', 'thank', 'danke', 'terima kasih', 'makasih'],
};
const SVC_KW = {
  septoplasti: ['septum', 'eğri', 'deviat', 'nasenscheidewand', 'sekat'],
  rinoplasti: ['burun estetiği', 'rinoplasti', 'rhinoplast', 'nose job', 'nasenkorrektur', 'operasi hidung', 'hidung', 'burun', 'nose', 'nase'],
  otoplasti: ['kepçe', 'otoplast', 'abstehende', 'telinga caplang', 'prominent ear'],
  blefaroplasti: ['göz kapağı', 'blefaro', 'blepharo', 'eyelid', 'augenlid', 'kelopak'],
  botoks: ['botoks', 'botox', 'migren', 'migraine', 'terleme', 'sweat', 'schwitz', 'keringat'],
  dolgu: ['dolgu', 'filler', 'dudak', 'lip', 'lippe', 'bibir'],
  mezoterapi: ['saç', 'mezoterapi', 'mesotherap', 'hair', 'haar', 'rambut'],
  sinuzit: ['sinüzit', 'sinus', 'polip', 'nasennebenhöhle', 'sinusitis', 'koku', 'smell', 'geruch', 'penciuman'],
  alerji: ['alerji', 'allerg', 'alergi', 'burun eti', 'konka', 'turbinate', 'hapşır', 'sneez', 'bersin'],
  kulak: ['kulak tüpü', 'otit', 'ear infection', 'mittelohr', 'infeksi telinga', 'kulak ağrı', 'ear pain'],
  tinnitus: ['çınlama', 'baş dönmesi', 'vertigo', 'tinnitus', 'schwindel', 'ohrgeräusch', 'pusing', 'berdenging', 'dizz'],
  bademcik: ['bademcik', 'geniz', 'tonsil', 'adenoid', 'mandel', 'amandel'],
  ses: ['ses teli', 'ses kısık', 'kısıklık', 'voice', 'hoarse', 'stimme', 'heiser', 'suara', 'serak'],
  horlama: ['horla', 'snor', 'schnarch', 'dengkur', 'apne', 'apnea', 'apnoe'],
};
const low = (q) => ' ' + q.toLocaleLowerCase('tr') + ' ' + q.toLowerCase() + ' ';
const svcAI = (id) => { const s = SERVICES.find((x) => x.id === id); return `<div class="ai-svc"><span>${I[s.icon]}</span><div><b>${S(id).t}</b><small>${S(id).s}</small></div></div>`; };
function answer(q) {
  const s = low(q.trim()), A = P().ai;
  const has = (k) => KW[k].some((w) => s.includes(w));
  const svc = Object.keys(SVC_KW).find((id) => SVC_KW[id].some((w) => s.includes(w)));
  if (has('emergency')) return { html: A.emergency, actions: [{ tel: true, label: '112' }, { wa: q, label: 'WhatsApp' }] };
  if (has('price')) return { html: A.price, actions: [{ href: '#/iletisim', label: A.cta.book }, { wa: q, label: 'WhatsApp' }] };
  if (has('intl')) return { html: A.intl, actions: [{ href: '#/yurtdisi', label: A.cta.plan }, { href: '#/iletisim', label: A.cta.book }] };
  if (has('closed')) { const T = S('rinoplasti'); return { html: `<b>${T.x[0][0]}</b><p>${T.x[0][1]}</p><div class="jd">${T.cmp.slice(1).map((r) => `${r[0]}: <b>${r[1]}</b> / ${r[2]}`).join('<br>')}</div>`, actions: [{ href: '#/tedavi/rinoplasti', label: u('readMore') }] }; }
  if (has('recovery')) {
    const id = RECOVERY[svc] ? svc : 'rinoplasti', R = P().recovery[id];
    return { html: `${svcAI(id)}<div class="jd"><ul>${R.map(([t, p]) => `<li><b>${t}</b> — ${p}</li>`).join('')}</ul></div><small>${u('disclaimer').split('.')[0]}.</small>`, actions: [{ href: `#/tedavi/${id}#iyilesme`, label: A.cta.rec }] };
  }
  if (has('langs')) return { html: A.langs, actions: [{ href: '#/yurtdisi', label: u('intl') }] };
  if (svc) { const T = S(svc); return { html: `${svcAI(svc)}${T.i}<div class="jd"><ul>${T.pts.slice(0, 4).map((x) => `<li>${x}</li>`).join('')}</ul></div>`, actions: [{ href: `#/tedavi/${svc}`, label: u('readMore') }, { href: '#/iletisim', label: A.cta.book }] }; }
  if (has('book')) return { html: A.book, actions: [{ href: '#/iletisim', label: A.cta.book }, { wa: q, label: 'WhatsApp' }] };
  if (has('which')) return { html: A.nav, actions: [{ href: '#/rehber#belirti', label: A.cta.nav }] };
  if (has('hello')) return { html: A.hello };
  if (has('thanks')) return { html: A.thanks };
  return { html: A.fallback, actions: [{ href: '#/iletisim', label: A.cta.book }, { wa: q, label: 'WhatsApp' }] };
}
const aiEl = $('#ai'), aiBody = $('#aiBody');
let greeted = false;
function openAI(q) {
  aiEl.classList.add('open'); aiEl.setAttribute('aria-hidden', 'false');
  if (!greeted) { greeted = true; msg('bot', { html: P().ai.greet }); }
  if (q) ask(q);
  setTimeout(() => $('#aiText').focus(), 250);
}
function closeAI() { aiEl.classList.remove('open'); aiEl.setAttribute('aria-hidden', 'true'); }
$('#aiClose').addEventListener('click', closeAI);
function actionsHTML(acts = []) {
  if (!acts.length) return '';
  return `<div class="ai-acts">${acts.map((a) => a.wa ? `<a class="chip wa" target="_blank" rel="noopener" href="${CLINIC.whatsapp}?text=${encodeURIComponent(a.wa)}">${I.whatsapp}<span>${a.label}</span></a>`
    : a.tel ? `<a class="chip" href="tel:112">${I.phone}<span>${a.label}</span></a>`
    : `<a class="chip" href="${a.href}">${a.label} ${I.arrow}</a>`).join('')}</div>`;
}
function msg(who, r) { const m = document.createElement('div'); m.className = 'm ' + who; if (who === 'me') m.textContent = r; else m.innerHTML = r.html + actionsHTML(r.actions); aiBody.appendChild(m); aiBody.scrollTop = aiBody.scrollHeight; return m; }
function setSug(list) { $('#aiSug').innerHTML = (list || P().ai.sug).map((x) => `<button>${esc(x)}</button>`).join(''); }
function ask(q) {
  if (!q.trim()) return; msg('me', q);
  const tp = msg('bot', { html: '<span class="typing"><i></i><i></i><i></i></span>' });
  setTimeout(() => { const r = answer(q); tp.innerHTML = r.html + actionsHTML(r.actions); aiBody.scrollTop = aiBody.scrollHeight; }, 500 + Math.random() * 400);
}
$('#aiForm').addEventListener('submit', (e) => { e.preventDefault(); ask($('#aiText').value); $('#aiText').value = ''; });
$('#aiSug').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) ask(b.textContent); });

/* ---------------- Boot ---------------- */
(async () => {
  if (lang !== 'tr') { try { await loadLang(lang); } catch (e) { lang = 'tr'; } }
  renderChrome();
  render();
  if (new URLSearchParams(location.search).has('nointro')) { $('#intro')?.remove(); $$('.rv').forEach((e) => e.classList.add('in')); }
  setTimeout(() => $('#intro')?.classList.add('done'), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1100);
  setTimeout(() => { let seen = false; try { seen = sessionStorage.getItem('exx-teaser') === '1'; } catch (e) {} if (!seen && !aiEl.classList.contains('open')) $('#aiTeaser')?.removeAttribute('hidden'); }, 3500);
})();

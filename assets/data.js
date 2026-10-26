/* ==========================================================================
   Prof. Dr. Exx Yxx — KBB & yüz estetiği muayenehanesi. Site structure shared
   by every language. Identity anonymised for the proposal: name, hospitals,
   universities, publication titles and contact details are not shown.
   Texts live in assets/lang/<code>.js and are loaded on demand.
   ========================================================================== */
const CLINIC = {
  doctor: 'Prof. Dr. Exx Yxx', short: 'Exx Yxx', since: 2019,
  phone: '+90 000 000 00 00', phoneHref: 'tel:+900000000000',
  mobile: '+90 000 000 00 00', whatsapp: 'https://wa.me/900000000000',
  email: 'info@exxyxx.com', address: '00 İş Merkezi, B Blok, Kat 0, No: 00, Türkiye',
  maps: 'https://www.google.com/maps/search/?api=1&query=T%C3%BCrkiye',
  social: { instagram: 'https://www.instagram.com/', youtube: 'https://www.youtube.com/', facebook: 'https://www.facebook.com/' },
  team: 6,
};

/* the clinic's listing names English, German, Indonesian and Turkish as spoken languages */
const LANGS = [
  { code: 'tr', name: 'Türkçe', intl: 'tr-TR' },
  { code: 'en', name: 'English', intl: 'en-GB' },
  { code: 'de', name: 'Deutsch', intl: 'de-DE' },
  { code: 'id', name: 'Bahasa Indonesia', intl: 'id-ID' },
];
const FLAGS = {
  tr: '<svg class="flag" viewBox="1.5 0 20 20" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="30" height="20" fill="#E30A17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.25" cy="10" r="4" fill="#E30A17"/><polygon fill="#fff" points="13.20,10.00 14.83,9.44 14.86,7.72 15.89,9.10 17.54,8.59 16.55,10.00 17.54,11.41 15.89,10.90 14.86,12.28 14.83,10.56"/></svg>',
  en: '<svg class="flag" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0 0l60 30M60 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" stroke-width="2.5"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>',
  de: '<svg class="flag" viewBox="0 0 30 18" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="30" height="6" fill="#000"/><rect y="6" width="30" height="6" fill="#DD0000"/><rect y="12" width="30" height="6" fill="#FFCE00"/></svg>',
  id: '<svg class="flag" viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="30" height="10" fill="#CE1126"/><rect y="10" width="30" height="10" fill="#fff"/></svg>',
};

/* service groups and services */
const GROUPS = [
  { id: 'face', icon: 'face' },
  { id: 'soft', icon: 'drop' },
  { id: 'nose', icon: 'wind' },
  { id: 'ear', icon: 'ear' },
  { id: 'throat', icon: 'mic' },
];
const SERVICES = [
  { id: 'rinoplasti', g: 'face', icon: 'nose', img: 'rhino.jpg', star: true },
  { id: 'otoplasti', g: 'face', icon: 'ear', img: 'otoplasty.jpg', star: true },
  { id: 'blefaroplasti', g: 'face', icon: 'eye', img: 'eyes.jpg', star: true },
  { id: 'botoks', g: 'soft', icon: 'spark', img: 'botox.jpg' },
  { id: 'dolgu', g: 'soft', icon: 'drop', img: 'fillers.jpg' },
  { id: 'mezoterapi', g: 'soft', icon: 'leaf', img: 'skincare.jpg' },
  { id: 'septoplasti', g: 'nose', icon: 'wind', img: 'breathe.jpg' },
  { id: 'sinuzit', g: 'nose', icon: 'layers', img: 'sinus.jpg' },
  { id: 'alerji', g: 'nose', icon: 'flower', img: 'profile-bw.jpg' },
  { id: 'kulak', g: 'ear', icon: 'ear', img: 'child-ear.jpg' },
  { id: 'tinnitus', g: 'ear', icon: 'wave', img: 'ear-exam.jpg' },
  { id: 'bademcik', g: 'throat', icon: 'child', img: 'child-exam.jpg' },
  { id: 'ses', g: 'throat', icon: 'mic', img: 'voice.jpg' },
  { id: 'horlama', g: 'throat', icon: 'moon', img: 'sleep.jpg' },
];

/* recovery milestones (day after surgery) — texts in the packs, same order */
const RECOVERY = {
  rinoplasti: [0, 2, 6, 10, 14, 28, 42, 120, 270],
  otoplasti: [0, 7, 14, 21, 42],
  blefaroplasti: [0, 2, 6, 14, 120],
};

/* international patient planner: days relative to surgery day (0) */
const PLAN = {
  rinoplasti: { arrive: -1, controls: [3, 7], cast: 8, fly: 9 },
  otoplasti: { arrive: -1, controls: [1, 6], cast: 7, fly: 7 },
  blefaroplasti: { arrive: -1, controls: [2, 6], cast: 6, fly: 7 },
  septoplasti: { arrive: -1, controls: [2, 6], cast: 6, fly: 7 },
  sinuzit: { arrive: -1, controls: [2, 7], cast: 7, fly: 8 },
};

/* symptom navigator: symptom -> related services */
const SYMPTOMS = [
  { id: 'block', icon: 'wind', s: ['septoplasti', 'alerji', 'sinuzit'] },
  { id: 'snore', icon: 'moon', s: ['horlama', 'septoplasti', 'bademcik'] },
  { id: 'smell', icon: 'flower', s: ['sinuzit', 'alerji'] },
  { id: 'ring', icon: 'wave', s: ['tinnitus'] },
  { id: 'dizzy', icon: 'spin', s: ['tinnitus'] },
  { id: 'earpain', icon: 'ear', s: ['kulak'] },
  { id: 'voice', icon: 'mic', s: ['ses'] },
  { id: 'throat', icon: 'child', s: ['bademcik'] },
  { id: 'kidmouth', icon: 'child', s: ['bademcik', 'kulak', 'alerji'] },
  { id: 'noseshape', icon: 'nose', s: ['rinoplasti', 'septoplasti'] },
  { id: 'ears', icon: 'ear', s: ['otoplasti'] },
  { id: 'lids', icon: 'eye', s: ['blefaroplasti', 'dolgu'] },
  { id: 'lines', icon: 'spark', s: ['botoks', 'dolgu'] },
  { id: 'hair', icon: 'leaf', s: ['mezoterapi'] },
];

/* academic work by area (27 selected publications, 2011–2022; titles not shown) */
const RESEARCH = [
  { k: 'rhino', n: 5 }, { k: 'smell', n: 4 }, { k: 'allergy', n: 4 }, { k: 'face', n: 4 }, { k: 'heal', n: 4 },
  { k: 'sleep', n: 2 }, { k: 'headneck', n: 2 }, { k: 'voice', n: 1 }, { k: 'vertigo', n: 1 },
];

const BLOG = [
  { id: 'alerjik-rinit', img: 'profile-bw.jpg', mins: 5 },
  { id: 'burun-eti', img: 'breathe.jpg', mins: 5 },
  { id: 'geniz-eti', img: 'child-exam.jpg', mins: 5 },
];

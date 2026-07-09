/* ======================================================
   NERVYFOX HUB — components.js
   Header + Footer + Burger + Ticker + i18n MyMemory
   VERSION unique ici — ne pas dupliquer ailleurs
====================================================== */

const HUB_VERSION = 'V4.2.0';

const NAV_PAGES = [
  { id: 'accueil',      label: 'Accueil',            labelEn: 'Home',              href: '/' },
  { id: 'selecteur',   label: 'Sélecteur filament', labelEn: 'Filament selector', href: '/selecteur/' },
  { id: 'couleurs',    label: 'Couleurs',            labelEn: 'Colors',            href: '/couleurs/' },
  { id: 'sechage',     label: 'Séchage',             labelEn: 'Drying',            href: '/sechage/' },
  { id: 'diagnostique',label: 'Diagnostique',        labelEn: 'Diagnostic',        href: '/diagnostique/' },
];

const TICKER_TEXT = '&nbsp;&nbsp;&nbsp;✦ OUTILS GRATUITS POUR MAKERS &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; DESIGNED WITH A 70S BRAIN &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; IMPRESSION 3D ACCESSIBLE À TOUS &nbsp;&nbsp;&nbsp;';

/* ======================================================
   I18N — MyMemory
====================================================== */
let currentLang = localStorage.getItem('nf-lang') || 'fr';

/* Cache des traductions : { 'texte fr': 'translated text' } */
let translationCache = JSON.parse(localStorage.getItem('nf-cache') || '{}');

/* Tous les noeuds texte traduits : { node: texte original FR } */
const textNodes = new Map();

async function translateText(text) {
  if (!text.trim() || currentLang === 'fr') return text;
  if (translationCache[text]) return translationCache[text];
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|en`;
    const res  = await fetch(url);
    const json = await res.json();
    const translated = json.responseData?.translatedText || text;
    translationCache[text] = translated;
    localStorage.setItem('nf-cache', JSON.stringify(translationCache));
    return translated;
  } catch {
    return text;
  }
}

/* Collecte tous les noeuds texte visibles dans un élément */
function collectTextNodes(root) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (['SCRIPT','STYLE','NOSCRIPT'].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

async function applyTranslation() {
  const body = document.body;

  if (currentLang === 'fr') {
    // Restaurer les textes originaux
    textNodes.forEach((original, node) => { node.textContent = original; });
    return;
  }

  // Collecter les noeuds si pas encore fait
  if (textNodes.size === 0) {
    collectTextNodes(body).forEach(n => textNodes.set(n, n.textContent));
  }

  // Traduire par batch
  const entries = [...textNodes.entries()];
  await Promise.all(entries.map(async ([node, original]) => {
    const translated = await translateText(original);
    node.textContent = translated;
  }));
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('nf-lang', lang);

  // Mettre à jour le switcher
  const btnFr = document.getElementById('lang-fr');
  const btnEn = document.getElementById('lang-en');
  if (btnFr) { btnFr.classList.toggle('active', lang === 'fr'); }
  if (btnEn) { btnEn.classList.toggle('active', lang === 'en'); }

  // Mettre à jour les labels de nav
  document.querySelectorAll('.nav-label').forEach(el => {
    const page = NAV_PAGES.find(p => p.id === el.dataset.page);
    if (page) el.textContent = lang === 'fr' ? page.label : page.labelEn;
  });

  applyTranslation();
}

/* ======================================================
   HEADER
====================================================== */
function renderHeader(activePage) {
  const navLinks = NAV_PAGES.map(p => `
    <a href="${p.href}" class="${activePage === p.id ? 'active' : ''}">
      <span class="nav-label" data-page="${p.id}">${currentLang === 'fr' ? p.label : p.labelEn}</span>
    </a>`
  ).join('');

  const mobileLinks = NAV_PAGES.map(p => `
    <a href="${p.href}" class="${activePage === p.id ? 'active' : ''}" onclick="toggleMenu()">
      <span class="nav-label" data-page="${p.id}">${currentLang === 'fr' ? p.label : p.labelEn}</span>
    </a>`
  ).join('');

  document.getElementById('hub-header').innerHTML = `
    <div class="ticker-wrap"><span class="ticker" id="ticker">${TICKER_TEXT}${TICKER_TEXT}</span></div>
    <div class="orange-bar"></div>
    <div class="masthead">
      <a href="/"><img class="masthead-logo" src="/assets/logo-wordmark.png" alt="NervyFox"></a>
      <nav>${navLinks}</nav>
      <div class="lang-switcher">
        <button id="lang-fr" class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr" onclick="setLang('fr')">FR</button>
        <span class="lang-sep">·</span>
        <button id="lang-en" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" onclick="setLang('en')">EN</button>
      </div>
      <a href="https://nervyfox.fr" target="_blank" class="cta-site">nervyfox.fr →</a>
      <button class="burger" id="burger" onclick="toggleMenu()" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobile-menu">
      <button class="mobile-menu-close" onclick="toggleMenu()">✕</button>
      <img class="mobile-menu-logo" src="/assets/logo-wordmark.png" alt="NervyFox">
      ${mobileLinks}
      <a href="https://nervyfox.fr" target="_blank" onclick="toggleMenu()"
        style="font-size:18px;color:var(--orange);margin-top:16px;">nervyfox.fr →</a>
    </div>
  `;

  // Ticker
  const t = document.getElementById('ticker');
  let pos = 0;
  const half = t.scrollWidth / 2;
  setInterval(() => {
    pos -= 0.5;
    if (Math.abs(pos) >= half) pos = 0;
    t.style.transform = `translateX(${pos}px)`;
  }, 16);

  // Appliquer la langue mémorisée au chargement
  if (currentLang === 'en') {
    setTimeout(() => applyTranslation(), 200);
  }
}

/* ======================================================
   FOOTER
====================================================== */
function renderFooter() {
  document.getElementById('hub-footer').innerHTML = `
    <div class="footer">
      <img src="/assets/logo-pill.png" alt="">
      <div class="tag">NervyFox · Hub Maker · Designed with a 70s brain</div>
      <div class="version">${HUB_VERSION}</div>
    </div>
  `;
}

/* ======================================================
   BURGER
====================================================== */
function toggleMenu() {
  const menu   = document.getElementById('mobile-menu');
  const burger = document.getElementById('burger');
  const isOpen = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

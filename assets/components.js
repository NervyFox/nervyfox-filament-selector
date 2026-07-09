/* ======================================================
   NERVYFOX HUB — components.js
   Header + Footer + Burger + Ticker + Switcher FR/EN
   VERSION unique ici — ne pas dupliquer ailleurs
====================================================== */

const HUB_VERSION = 'V4.3.0';

const NAV_PAGES = [
  { id: 'accueil',      fr: 'Accueil',            en: 'Home',              href: '/' },
  { id: 'selecteur',   fr: 'Sélecteur filament', en: 'Filament selector', href: '/selecteur/' },
  { id: 'couleurs',    fr: 'Couleurs',            en: 'Colors',            href: '/couleurs/' },
  { id: 'sechage',     fr: 'Séchage',             en: 'Drying',            href: '/sechage/' },
  { id: 'diagnostique',fr: 'Diagnostique',        en: 'Diagnostic',        href: '/diagnostique/' },
];

const LANG = localStorage.getItem('nf-lang') || 'fr';

function setLang(lang) {
  localStorage.setItem('nf-lang', lang);
  location.reload();
}

function renderHeader(activePage) {
  const navLinks = NAV_PAGES.map(p =>
    `<a href="${p.href}" class="${activePage === p.id ? 'active' : ''}">${LANG === 'en' ? p.en : p.fr}</a>`
  ).join('');
  const mobileLinks = NAV_PAGES.map(p =>
    `<a href="${p.href}" class="${activePage === p.id ? 'active' : ''}" onclick="toggleMenu()">${LANG === 'en' ? p.en : p.fr}</a>`
  ).join('');

  document.getElementById('hub-header').innerHTML = `
    <div class="ticker-wrap"><span class="ticker" id="ticker">${LANG === 'en'
      ? '&nbsp;&nbsp;&nbsp;✦ FREE TOOLS FOR MAKERS &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; DESIGNED WITH A 70S BRAIN &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; 3D PRINTING FOR EVERYONE &nbsp;&nbsp;&nbsp;'
      : '&nbsp;&nbsp;&nbsp;✦ OUTILS GRATUITS POUR MAKERS &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; DESIGNED WITH A 70S BRAIN &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; IMPRESSION 3D ACCESSIBLE À TOUS &nbsp;&nbsp;&nbsp;'
    }${LANG === 'en'
      ? '&nbsp;&nbsp;&nbsp;✦ FREE TOOLS FOR MAKERS &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; DESIGNED WITH A 70S BRAIN &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; 3D PRINTING FOR EVERYONE &nbsp;&nbsp;&nbsp;'
      : '&nbsp;&nbsp;&nbsp;✦ OUTILS GRATUITS POUR MAKERS &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; DESIGNED WITH A 70S BRAIN &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; IMPRESSION 3D ACCESSIBLE À TOUS &nbsp;&nbsp;&nbsp;'
    }</span></div>
    <div class="orange-bar"></div>
    <div class="masthead">
      <a href="/"><img class="masthead-logo" src="/assets/logo-wordmark.png" alt="NervyFox"></a>
      <nav>${navLinks}</nav>
      <div class="lang-switcher">
        <button class="lang-btn ${LANG === 'fr' ? 'active' : ''}" onclick="setLang('fr')">FR</button>
        <span class="lang-sep">·</span>
        <button class="lang-btn ${LANG === 'en' ? 'active' : ''}" onclick="setLang('en')">EN</button>
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
      <div class="lang-switcher" style="margin-top:16px;">
        <button class="lang-btn ${LANG === 'fr' ? 'active' : ''}" onclick="setLang('fr')">FR</button>
        <span class="lang-sep">·</span>
        <button class="lang-btn ${LANG === 'en' ? 'active' : ''}" onclick="setLang('en')">EN</button>
      </div>
      <a href="https://nervyfox.fr" target="_blank" onclick="toggleMenu()"
        style="font-size:18px;color:var(--orange);margin-top:16px;">nervyfox.fr →</a>
    </div>
  `;

  const t = document.getElementById('ticker');
  let pos = 0;
  const half = t.scrollWidth / 2;
  setInterval(() => {
    pos -= 0.5;
    if (Math.abs(pos) >= half) pos = 0;
    t.style.transform = `translateX(${pos}px)`;
  }, 16);
}

function renderFooter() {
  document.getElementById('hub-footer').innerHTML = `
    <div class="footer">
      <img src="/assets/logo-pill.png" alt="">
      <div class="tag">NervyFox · Hub Maker · Designed with a 70s brain</div>
      <div class="version">${HUB_VERSION}</div>
    </div>
  `;
}

function toggleMenu() {
  const menu   = document.getElementById('mobile-menu');
  const burger = document.getElementById('burger');
  const isOpen = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

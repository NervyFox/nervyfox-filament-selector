/* ======================================================
   NERVYFOX HUB — components.js
   Header + Footer + Burger + Ticker
   VERSION unique ici — ne pas dupliquer ailleurs
====================================================== */

const HUB_VERSION = 'V4.0.0';

const NAV_PAGES = [
  { id: 'accueil',      label: 'Accueil',            href: '/' },
  { id: 'selecteur',   label: 'Sélecteur filament', href: '/selecteur/' },
  { id: 'couleurs',    label: 'Couleurs',           href: '/couleurs/' },
  { id: 'sechage',     label: 'Séchage',            href: '/sechage/' },
  { id: 'diagnostique',label: 'Diagnostique',       href: '/diagnostique/' },
];

const TICKER_TEXT = '&nbsp;&nbsp;&nbsp;✦ OUTILS GRATUITS POUR MAKERS &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; DESIGNED WITH A 70S BRAIN &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; IMPRESSION 3D ACCESSIBLE À TOUS &nbsp;&nbsp;&nbsp;';

function renderHeader(activePage) {
  const navLinks = NAV_PAGES.map(p =>
    `<a href="${p.href}" class="${activePage === p.id ? 'active' : ''}">${p.label}</a>`
  ).join('');
  const mobileLinks = NAV_PAGES.map(p =>
    `<a href="${p.href}" class="${activePage === p.id ? 'active' : ''}" onclick="toggleMenu()">${p.label}</a>`
  ).join('');

  document.getElementById('hub-header').innerHTML = `
    <div class="ticker-wrap"><span class="ticker" id="ticker">${TICKER_TEXT}${TICKER_TEXT}</span></div>
    <div class="orange-bar"></div>
    <div class="masthead">
      <a href="/"><img class="masthead-logo" src="/assets/logo-wordmark.png" alt="NervyFox"></a>
      <nav>${navLinks}</nav>
      <div id="google_translate_element"></div>
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

/* === GOOGLE TRANSLATE === */
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'fr',
    includedLanguages: 'en,fr',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
}

// Inject Google Translate script once
(function() {
  const s = document.createElement('script');
  s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.head.appendChild(s);
})();

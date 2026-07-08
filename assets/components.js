/* ======================================================
   NERVYFOX HUB — Composants partagés (components.js)
   Header + Footer + Ticker + Menu burger
   VERSION unique ici, pas ailleurs
====================================================== */

const HUB_VERSION = 'V1.1.0';

function renderHeader(activePage) {
  const pages = [
    { id: 'accueil',    label: 'Accueil',            href: '/' },
    { id: 'selecteur',  label: 'Sélecteur filament', href: '/selecteur/' },
    { id: 'couleurs',   label: 'Couleurs',           href: '#' },
    { id: 'guides',     label: 'Guides',             href: '#' },
    { id: 'ressources', label: 'Ressources',         href: '#' },
  ];

  const navLinks = pages.map(function(p) {
    return '<a href="' + p.href + '" class="' + (activePage === p.id ? 'active' : '') + '">' + p.label + '</a>';
  }).join('');

  const mobileLinks = pages.map(function(p) {
    return '<a href="' + p.href + '" class="' + (activePage === p.id ? 'active' : '') + '" onclick="toggleMenu()">' + p.label + '</a>';
  }).join('');

  document.getElementById('hub-header').innerHTML =
    '<div class="ticker-wrap">' +
      '<span class="ticker" id="ticker">' +
        '&nbsp;&nbsp;&nbsp;✦ OUTILS GRATUITS POUR MAKERS &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; DESIGNED WITH A 70S BRAIN &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; IMPRESSION 3D ACCESSIBLE À TOUS &nbsp;&nbsp;&nbsp;✦ OUTILS GRATUITS POUR MAKERS &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; DESIGNED WITH A 70S BRAIN &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp; IMPRESSION 3D ACCESSIBLE À TOUS &nbsp;&nbsp;&nbsp;' +
      '</span>' +
    '</div>' +
    '<div class="orange-bar"></div>' +
    '<div class="masthead">' +
      '<a href="/"><img class="masthead-logo" src="/assets/logo-wordmark.png" alt="NervyFox"></a>' +
      '<nav>' + navLinks + '</nav>' +
      '<a href="https://nervyfox.fr" target="_blank" class="cta-site">nervyfox.fr →</a>' +
      '<button class="burger" id="burger" onclick="toggleMenu()" aria-label="Menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</div>' +
    '<div class="mobile-menu" id="mobile-menu">' +
      '<button class="mobile-menu-close" onclick="toggleMenu()">✕</button>' +
      '<img class="mobile-menu-logo" src="/assets/logo-wordmark.png" alt="NervyFox">' +
      mobileLinks +
      '<a href="https://nervyfox.fr" target="_blank" onclick="toggleMenu()" style="font-size:18px;color:var(--orange);margin-top:16px;">nervyfox.fr →</a>' +
    '</div>';

  // Ticker infini
  var t = document.getElementById('ticker');
  var original = t.innerHTML;
  t.innerHTML = original + original;
  var pos = 0;
  var half = t.scrollWidth / 2;
  setInterval(function() {
    pos -= 0.5;
    if (Math.abs(pos) >= half) pos = 0;
    t.style.transform = 'translateX(' + pos + 'px)';
  }, 16);
}

function renderFooter() {
  document.getElementById('hub-footer').innerHTML =
    '<div class="footer">' +
      '<img src="/assets/logo-pill.png" alt="">' +
      '<div class="tag">NervyFox · Hub Maker · Designed with a 70s brain</div>' +
      '<div class="version">' + HUB_VERSION + '</div>' +
    '</div>';
}

function toggleMenu() {
  var menu = document.getElementById('mobile-menu');
  var burger = document.getElementById('burger');
  var isOpen = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

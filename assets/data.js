/* ======================================================
   NERVYFOX HUB — data.js
   Toutes les données métier centralisées
====================================================== */

/* === FILAMENTS === */
const FILAMENTS = {
  PLA: {
    color: '#F2641E', text: '#1A1510',
    affiliateLink: '',
    scores: { facilite:5, resistance:2, chaleur:1, eau:2, finition:5, cout:5 },
    core: "Le PLA est le filament idéal pour commencer : facile à imprimer, belle finition, pas de warping. Parfait pour tout ce qui ne subit pas de chaleur ni d'humidité.",
    whyNot: "Très simple à utiliser et joli à imprimer, mais il ramollit dès 60°C, n'aime pas l'humidité prolongée, et se dégrade aux UV. À éviter à l'extérieur."
  },
  PETG: {
    color: '#5B22D6', text: '#F8F0E3',
    affiliateLink: '',
    scores: { facilite:4, resistance:4, chaleur:3, eau:4, finition:4, cout:4 },
    core: "Le PETG est le filament polyvalent par excellence : presque aussi simple à imprimer que le PLA, mais bien plus résistant à l'humidité, aux chocs et aux températures modérées (jusqu'à ~80°C).",
    whyNot: "Très bon compromis solidité/facilité, mais se dégrade sous les UV intenses sur le long terme et ne tient pas aux très hautes températures (>80°C)."
  },
  ABS: {
    color: '#F8556B', text: '#1A1510',
    affiliateLink: '',
    scores: { facilite:2, resistance:4, chaleur:4, eau:3, finition:3, cout:4 },
    core: "L'ABS résiste bien à la chaleur (jusqu'à ~100°C) et aux chocs mécaniques. Un vrai filament technique, mais qui demande une imprimante fermée et un peu d'expérience.",
    whyNot: "Costaud et résistant à la chaleur, mais il se déforme souvent en imprimant (warping), dégage des vapeurs, et demande une imprimante fermée. Déconseillé aux débutants."
  },
  ASA: {
    color: '#1A1510', text: '#F8F0E3',
    affiliateLink: '',
    scores: { facilite:2, resistance:4, chaleur:4, eau:4, finition:3, cout:3 },
    core: "L'ASA combine les qualités de l'ABS avec une excellente résistance aux UV et aux intempéries. C'est LE choix pour l'extérieur exposé au soleil ou à la chaleur intense.",
    whyNot: "Champion de l'extérieur et des UV, mais plus cher, plus technique à imprimer que le PETG, et inutile pour un simple usage intérieur."
  },
  TPU: {
    color: '#F89B6C', text: '#1A1510',
    affiliateLink: '',
    scores: { facilite:2, resistance:3, chaleur:2, eau:3, finition:3, cout:3 },
    core: "Le TPU est le filament souple par excellence : il plie, s'étire, et revient à sa forme sans casser. Indispensable pour tout ce qui doit absorber les chocs ou rester flexible.",
    whyNot: "Parfait pour la souplesse, mais totalement inadapté si ta pièce doit rester rigide. Peut aussi être capricieux à imprimer (impression lente conseillée)."
  }
};
const ALL_FILAMENTS = Object.keys(FILAMENTS);
const SCORE_LABELS = { facilite:'Facilité', resistance:'Résistance', chaleur:'Chaleur', eau:'Eau / Humidité', finition:'Finition', cout:'Coût' };

/* === QUESTIONS SÉLECTEUR === */
const Q_TYPE = [
  { id:'deco',  label:"Objet décoratif",         icon:'✦', hint:"Figurine, vase, déco murale..." },
  { id:'proto', label:"Prototype / maquette",     icon:'◐', hint:"Test visuel, modèle de présentation" },
  { id:'func',  label:"Pièce fonctionnelle",      icon:'⌂', hint:"Support, boîtier, fixation, clip..." },
  { id:'flex',  label:"Pièce souple ou flexible", icon:'∿', hint:"Joint, grip, amortisseur, semelle..." },
  { id:'tech',  label:"Pièce technique",          icon:'⚙', hint:"Mécanique, haute résistance, engrenage..." },
];
const Q_ENV = [
  { id:'int',  label:"Intérieur uniquement", icon:'⌂', hint:"Bureau, salon, atelier..." },
  { id:'ext',  label:"Extérieur",            icon:'☀', hint:"Pluie, soleil, variations de temp." },
  { id:'both', label:"Les deux",             icon:'⟳', hint:"Parfois dehors, parfois dedans" },
];
const Q_CONSTRAINTS = [
  { id:'heat',  label:"Exposé à la chaleur",       icon:'♨', hint:">50°C — voiture, cuisine, lampe..." },
  { id:'water', label:"Contact avec l'eau",         icon:'≈', hint:"Humidité prolongée ou immersion" },
  { id:'shock', label:"Chocs ou poids à supporter", icon:'⚡', hint:"Résistance mécanique importante" },
  { id:'uv',    label:"Soleil direct / UV",         icon:'☀', hint:"Exposition prolongée au soleil" },
];
const Q_FINISH = [
  { id:'none',        label:"Peu importe",               icon:'—', hint:"C'est purement fonctionnel" },
  { id:'smooth',      label:"Surface lisse et propre",   icon:'◎', hint:"Visible, esthétique" },
  { id:'detail',      label:"Détails fins et précis",    icon:'⬡', hint:"Petits éléments, textes, relief" },
  { id:'transparent', label:"Transparent ou translucide", icon:'◐', hint:"Laisser passer la lumière" },
];
const Q_LEVEL = [
  { id:'total', label:"Débutant complet",                  hint:"Je n'ai jamais lancé une impression." },
  { id:'some',  label:"Quelques impressions déjà faites",  hint:"Je connais les bases, sans plus." },
  { id:'exp',   label:"Expérimenté",                       hint:"Je règle ma machine moi-même." },
];

/* === ARBRE DE DÉCISION === */
function decideFilament(type, env, constraints, finition, level) {
  const heat    = constraints.includes('heat');
  const water   = constraints.includes('water');
  const shock   = constraints.includes('shock');
  const flex    = constraints.includes('flex') || type === 'flex';
  const uv      = constraints.includes('uv');
  const outdoor = env === 'ext' || env === 'both';
  const expert  = level === 'exp';

  if (flex)    return 'TPU';
  if (heat)    return (outdoor || uv) ? 'ASA' : (expert ? 'ABS' : 'PETG');
  if (outdoor) return uv ? 'ASA' : 'PETG';
  if (water)   return 'PETG';
  if (type === 'deco' || type === 'proto') return 'PLA';
  if (type === 'tech') return expert ? 'ABS' : 'PETG';
  if (shock)   return 'PETG';
  if (finition === 'transparent') return 'PETG';
  return 'PLA';
}

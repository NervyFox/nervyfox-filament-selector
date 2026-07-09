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

/* ======================================================
   DIAGNOSTIQUE — Données
====================================================== */

const DEFAUTS = [
  { id: 'warping',     icon: '↗', label: 'Warping',          hint: 'Les coins se décollent du plateau' },
  { id: 'stringing',   icon: '≋', label: 'Stringing',        hint: 'Fils fins entre les parties de la pièce' },
  { id: 'sousex',      icon: '∿', label: 'Sous-extrusion',   hint: 'Gaps, couches incomplètes, trous' },
  { id: 'surex',       icon: '◉', label: 'Sur-extrusion',    hint: 'Boursouflures, excès de matière' },
  { id: 'bulles',      icon: '●', label: 'Bulles / bruits',  hint: 'Claquements ou bulles à la buse' },
  { id: 'premiere',    icon: '▱', label: '1ère couche',      hint: 'Ne colle pas ou écrase trop' },
  { id: 'layershift',  icon: '⇥', label: 'Décalage couches', hint: 'La pièce est décalée à mi-impression' },
  { id: 'surplomb',    icon: '⌒', label: 'Surplombs mous',   hint: 'Les parties en porte-à-faux s\'effondrent' },
  { id: 'surface',     icon: '◈', label: 'Surface rugueuse', hint: 'Finition irrégulière, granuleuse' },
  { id: 'elephant',    icon: '⊔', label: 'Elephant\'s foot', hint: 'La base de la pièce est évasée' },
];

const DIAG_DATA = {
  warping: {
    all: {
      dd:  [
        { prob: 'Principal',  cause: 'Plateau mal calibré ou température trop basse', difficulte: 'Facile', actions: ['Relancer le calibrage automatique du plateau', 'Augmenter la température du plateau de 5°C', 'Nettoyer le plateau à l\'IPA avant impression'] },
        { prob: 'Secondaire', cause: 'Pas assez de surface d\'adhérence',             difficulte: 'Facile', actions: ['Activer le brim dans le slicer (5-10mm)', 'Utiliser une colle en bâton ou laque sur le plateau'] },
      ],
      bow: [
        { prob: 'Principal',  cause: 'Plateau mal calibré ou température trop basse', difficulte: 'Facile', actions: ['Recalibrer le plateau manuellement', 'Augmenter la température du plateau de 5°C', 'Nettoyer le plateau à l\'IPA'] },
        { prob: 'Secondaire', cause: 'Courants d\'air autour de l\'imprimante',       difficulte: 'Facile', actions: ['Protéger l\'imprimante des courants d\'air', 'Activer le brim dans le slicer'] },
      ],
    },
    ABS: { all: [
      { prob: 'Principal',  cause: 'L\'ABS se rétracte beaucoup en refroidissant — il lui faut une enceinte fermée', difficulte: 'Moyen',  actions: ['Fermer l\'enceinte de l\'imprimante pendant l\'impression', 'Augmenter le plateau à 100-110°C', 'Désactiver le ventilateur de couche (ou réduire à 20%)'] },
      { prob: 'Secondaire', cause: 'Pas assez d\'adhérence',                                                          difficulte: 'Facile', actions: ['Appliquer une colle en bâton sur le plateau', 'Activer un brim de 8-10mm'] },
    ]},
    ASA: { all: [
      { prob: 'Principal', cause: 'L\'ASA se rétracte comme l\'ABS — enceinte fermée indispensable', difficulte: 'Moyen', actions: ['Fermer l\'enceinte de l\'imprimante', 'Plateau à 100°C minimum', 'Réduire le ventilateur de couche à 20% max'] },
    ]},
  },
  stringing: {
    all: {
      dd: [
        { prob: 'Principal',  cause: 'Température de buse trop élevée — le filament coule pendant les déplacements', difficulte: 'Facile', actions: ['Baisser la température de 5°C et retester', 'Activer le "combing" dans le slicer'] },
        { prob: 'Secondaire', cause: 'Rétraction insuffisante',                                                       difficulte: 'Moyen',  actions: ['Augmenter la distance de rétraction de 0.5mm (départ : 1-2mm en direct drive)', 'Augmenter la vitesse de rétraction'] },
      ],
      bow: [
        { prob: 'Principal',  cause: 'Rétraction insuffisante — le tube Bowden nécessite plus de rétraction', difficulte: 'Moyen', actions: ['Augmenter la distance de rétraction (départ : 4-6mm en Bowden)', 'Baisser la température de 5°C'] },
        { prob: 'Secondaire', cause: 'Tube Bowden usé ou mal clipé',                                          difficulte: 'Moyen', actions: ['Vérifier que le tube est bien enclipsé des deux côtés', 'Remplacer le tube PTFE si il est jauni ou déformé'] },
      ],
    },
    TPU: {
      dd:  [{ prob: 'Principal', cause: 'Le TPU est souple et difficile à rétracter — réduire au maximum',                              difficulte: 'Moyen',    actions: ['Désactiver la rétraction ou la mettre à 0.5mm max', 'Réduire la vitesse d\'impression à 20-30mm/s', 'Activer le combing dans le slicer'] }],
      bow: [{ prob: 'Principal', cause: 'Le TPU en Bowden est très difficile — le filament souple se comprime dans le tube',           difficulte: 'Technique', actions: ['Réduire la vitesse à 15-20mm/s', 'Désactiver la rétraction complètement', 'Envisager de passer en direct drive pour le TPU'] }],
    },
    PETG: { all: [{ prob: 'Principal', cause: 'Le PETG est naturellement collant et prone au stringing', difficulte: 'Moyen', actions: ['Baisser la température de 5-10°C (essayer 230°C)', 'Augmenter la vitesse de déplacement', 'Activer le "wipe on retract" dans le slicer'] }] },
  },
  sousex: {
    all: {
      dd: [
        { prob: 'Principal',  cause: 'Filament humide ou buse partiellement bouchée', difficulte: 'Facile', actions: ['Sécher le filament 4-8h à la température recommandée', 'Faire un "cold pull" pour nettoyer la buse', 'Augmenter la température de 5°C'] },
        { prob: 'Secondaire', cause: 'Vitesse trop élevée pour le filament',          difficulte: 'Facile', actions: ['Réduire la vitesse d\'impression de 20%', 'Vérifier que le multiplicateur d\'extrusion est à 100%'] },
      ],
      bow: [
        { prob: 'Principal',  cause: 'Glissement du filament dans l\'extrudeur ou buse bouchée',    difficulte: 'Moyen', actions: ['Vérifier la tension de l\'extrudeur (roue dentée)', 'Faire un cold pull pour nettoyer la buse', 'Sécher le filament'] },
        { prob: 'Secondaire', cause: 'Tube Bowden avec jeu — le filament recule pendant la rétraction', difficulte: 'Moyen', actions: ['Vérifier le raccord du tube côté buse', 'Remplacer le tube PTFE si usé'] },
      ],
    },
  },
  surex: {
    all: { all: [
      { prob: 'Principal',  cause: 'Multiplicateur d\'extrusion trop élevé',    difficulte: 'Facile', actions: ['Baisser le multiplicateur d\'extrusion à 95% et tester', 'Imprimer un cube de calibration et mesurer les murs'] },
      { prob: 'Secondaire', cause: 'Diamètre de filament mal configuré',         difficulte: 'Facile', actions: ['Mesurer le filament au pied à coulisse (doit être ~1.75mm)', 'Entrer la valeur exacte dans le slicer'] },
    ]},
  },
  bulles: {
    all:   { all: [
      { prob: 'Principal',  cause: 'Filament humide — l\'eau s\'évapore dans la buse', difficulte: 'Facile', actions: ['Sécher le filament immédiatement', 'Consulter l\'outil Séchage pour la durée et la température'] },
      { prob: 'Secondaire', cause: 'Température trop élevée',                          difficulte: 'Facile', actions: ['Baisser la température de 5-10°C', 'Vérifier que la température correspond aux recommandations du fabricant'] },
    ]},
    PETG:  { all: [{ prob: 'Principal', cause: 'Le PETG est très hygroscopique — les bulles sont souvent dues à l\'humidité', difficulte: 'Facile', actions: ['Sécher le filament 6-12h à 65°C', 'Stocker dans une boîte hermétique avec silicagel'] }] },
    Nylon: { all: [{ prob: 'Principal', cause: 'Le Nylon absorbe l\'humidité en 1-2h — séchage indispensable',               difficulte: 'Facile', actions: ['Sécher 8-24h à 80°C', 'Imprimer directement depuis le séchoir'] }] },
  },
  premiere: {
    all: { all: [
      { prob: 'Principal',  cause: 'Plateau mal nivelé — buse trop loin ou trop proche',  difficulte: 'Facile', actions: ['Recalibrer le Z-offset (buse trop loin : augmenter ; trop près : baisser)', 'Relancer le calibrage automatique du plateau'] },
      { prob: 'Secondaire', cause: 'Plateau sale ou non préparé',                          difficulte: 'Facile', actions: ['Nettoyer avec de l\'IPA 90°+', 'Appliquer colle ou laque si le filament n\'adhère pas'] },
      { prob: 'Secondaire', cause: 'Vitesse de première couche trop élevée',               difficulte: 'Facile', actions: ['Réduire la vitesse de première couche à 20-25mm/s dans le slicer'] },
    ]},
  },
  layershift: {
    all: { all: [
      { prob: 'Principal',  cause: 'Vitesse trop élevée — les moteurs perdent des pas',   difficulte: 'Facile',    actions: ['Réduire la vitesse d\'impression de 30%', 'Vérifier que les courroies sont bien tendues'] },
      { prob: 'Secondaire', cause: 'Collision de la tête avec la pièce',                   difficulte: 'Moyen',     actions: ['Activer le "Z-hop" dans le slicer pour les déplacements', 'Vérifier qu\'il n\'y a pas de blob ou de boursouflure sur la pièce'] },
      { prob: 'Secondaire', cause: 'Problème mécanique (courroie, vis)',                    difficulte: 'Technique', actions: ['Vérifier la tension des courroies X et Y', 'Vérifier le serrage des vis de fixation des poulies'] },
    ]},
  },
  surplomb: {
    all: {
      dd: [
        { prob: 'Principal',  cause: 'Ventilateur de refroidissement insuffisant',    difficulte: 'Facile', actions: ['Augmenter la vitesse du ventilateur à 100% pour les surplombs', 'Réduire la vitesse d\'impression sur les zones en surplomb'] },
        { prob: 'Secondaire', cause: 'Angle de surplomb trop important sans support', difficulte: 'Moyen',  actions: ['Activer les supports dans le slicer au-delà de 45°', 'Réorienter la pièce pour minimiser les surplombs'] },
      ],
      bow: [
        { prob: 'Principal',  cause: 'Refroidissement insuffisant', difficulte: 'Facile', actions: ['Augmenter le ventilateur à 100%', 'Réduire la vitesse d\'impression'] },
        { prob: 'Secondaire', cause: 'Angle trop important',        difficulte: 'Moyen',  actions: ['Ajouter des supports dans le slicer', 'Réorienter la pièce'] },
      ],
    },
    ABS: { all: [{ prob: 'Principal', cause: 'L\'ABS ne supporte pas un refroidissement fort — les surplombs sont naturellement plus difficiles', difficulte: 'Moyen', actions: ['Réduire la vitesse sur les surplombs', 'Ajouter des supports dès 40°', 'Ne pas augmenter le ventilateur au-delà de 30% pour éviter le warping'] }] },
  },
  surface: {
    all: { all: [
      { prob: 'Principal',  cause: 'Filament humide ou hauteur de couche trop grande',          difficulte: 'Facile', actions: ['Sécher le filament', 'Réduire la hauteur de couche (essayer 0.15mm au lieu de 0.2mm)'] },
      { prob: 'Secondaire', cause: 'Température trop basse — mauvaise fusion entre les couches', difficulte: 'Facile', actions: ['Augmenter la température de 5°C', 'Vérifier la vitesse d\'impression'] },
    ]},
  },
  elephant: {
    all: { all: [
      { prob: 'Principal',  cause: 'Buse trop proche du plateau — la première couche est écrasée et déborde', difficulte: 'Facile', actions: ['Augmenter légèrement le Z-offset (éloigner la buse du plateau)', 'Réduire la température du plateau de 5°C'] },
      { prob: 'Secondaire', cause: 'Multiplicateur d\'extrusion trop élevé sur la première couche',           difficulte: 'Facile', actions: ['Réduire le "first layer flow" à 95% dans le slicer'] },
    ]},
  },
};

function getDiagnostic(defautId, filament, extrudeur) {
  const data = DIAG_DATA[defautId];
  if (!data) return [];
  const filData = data[filament] || data['all'];
  if (!filData) return [];
  return filData[extrudeur] || filData['all'] || [];
}

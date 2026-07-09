/* ======================================================
   NERVYFOX HUB — data.fr.js
   Données en français
====================================================== */

const FILAMENTS_FR = {
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

const SCORE_LABELS_FR = {
  facilite:'Facilité', resistance:'Résistance', chaleur:'Chaleur',
  eau:'Eau / Humidité', finition:'Finition', cout:'Coût'
};

const Q_TYPE_FR = [
  { id:'deco',  label:"Objet décoratif",         icon:'✦', hint:"Figurine, vase, déco murale..." },
  { id:'proto', label:"Prototype / maquette",     icon:'◐', hint:"Test visuel, modèle de présentation" },
  { id:'func',  label:"Pièce fonctionnelle",      icon:'⌂', hint:"Support, boîtier, fixation, clip..." },
  { id:'flex',  label:"Pièce souple ou flexible", icon:'∿', hint:"Joint, grip, amortisseur, semelle..." },
  { id:'tech',  label:"Pièce technique",          icon:'⚙', hint:"Mécanique, haute résistance, engrenage..." },
];

const Q_ENV_FR = [
  { id:'int',  label:"Intérieur uniquement", icon:'⌂', hint:"Bureau, salon, atelier..." },
  { id:'ext',  label:"Extérieur",            icon:'☀', hint:"Pluie, soleil, variations de temp." },
  { id:'both', label:"Les deux",             icon:'⟳', hint:"Parfois dehors, parfois dedans" },
];

const Q_CONSTRAINTS_FR = [
  { id:'heat',  label:"Exposé à la chaleur",       icon:'♨', hint:">50°C — voiture, cuisine, lampe..." },
  { id:'water', label:"Contact avec l'eau",         icon:'≈', hint:"Humidité prolongée ou immersion" },
  { id:'shock', label:"Chocs ou poids à supporter", icon:'⚡', hint:"Résistance mécanique importante" },
  { id:'uv',    label:"Soleil direct / UV",         icon:'☀', hint:"Exposition prolongée au soleil" },
];

const Q_FINISH_FR = [
  { id:'none',        label:"Peu importe",                icon:'—', hint:"C'est purement fonctionnel" },
  { id:'smooth',      label:"Surface lisse et propre",    icon:'◎', hint:"Visible, esthétique" },
  { id:'detail',      label:"Détails fins et précis",     icon:'⬡', hint:"Petits éléments, textes, relief" },
  { id:'transparent', label:"Transparent ou translucide", icon:'◐', hint:"Laisser passer la lumière" },
];

const Q_LEVEL_FR = [
  { id:'total', label:"Débutant complet",                 hint:"Je n'ai jamais lancé une impression." },
  { id:'some',  label:"Quelques impressions déjà faites", hint:"Je connais les bases, sans plus." },
  { id:'exp',   label:"Expérimenté",                      hint:"Je règle ma machine moi-même." },
];

const STEP_META_FR = {
  1: { eyebrow:"Étape 1/5", color:'#F89B6C', title:"C'est quoi comme objet ?",          subtitle:"Choisis ce qui décrit le mieux ce que tu veux imprimer." },
  2: { eyebrow:"Étape 2/5", color:'#F8556B', title:"Où sera-t-il utilisé ?",             subtitle:"L'environnement, c'est souvent ce qui décide tout." },
  3: { eyebrow:"Étape 3/5", color:'#5B22D6', title:"Quelles contraintes physiques ?",    subtitle:"Sélectionne tout ce qui s'applique à ton objet. (0 à 3 choix)" },
  4: { eyebrow:"Étape 4/5", color:'#F2641E', title:"Quel rendu tu veux ?",               subtitle:"La finition souhaitée peut affiner le choix du filament." },
  5: { eyebrow:"Étape 5/5", color:'#F89B6C', title:"T'en es où avec l'impression 3D ?", subtitle:"Ça nous aide à ne pas te proposer quelque chose de trop technique." },
};

const DEFAUTS_FR = [
  { id: 'warping',    icon: '↗', label: 'Warping',          hint: 'Les coins se décollent du plateau' },
  { id: 'stringing',  icon: '≋', label: 'Stringing',        hint: 'Fils fins entre les parties de la pièce' },
  { id: 'sousex',     icon: '∿', label: 'Sous-extrusion',   hint: 'Gaps, couches incomplètes, trous' },
  { id: 'surex',      icon: '◉', label: 'Sur-extrusion',    hint: 'Boursouflures, excès de matière' },
  { id: 'bulles',     icon: '●', label: 'Bulles / bruits',  hint: 'Claquements ou bulles à la buse' },
  { id: 'premiere',   icon: '▱', label: '1ère couche',      hint: 'Ne colle pas ou écrase trop' },
  { id: 'layershift', icon: '⇥', label: 'Décalage couches', hint: 'La pièce est décalée à mi-impression' },
  { id: 'surplomb',   icon: '⌒', label: 'Surplombs mous',   hint: 'Les parties en porte-à-faux s\'effondrent' },
  { id: 'surface',    icon: '◈', label: 'Surface rugueuse', hint: 'Finition irrégulière, granuleuse' },
  { id: 'elephant',   icon: '⊔', label: 'Elephant\'s foot', hint: 'La base de la pièce est évasée' },
];

const FILAMENTS_SECHAGE_FR = {
  PLA:   { tips: ["Le PLA absorbe peu l'humidité mais se dégrade quand même avec le temps.", "Ne pas dépasser 55 °C — il risque de ramollir dans le séchoir.", "Un séchage préventif de 4 h suffit dans la plupart des cas."] },
  PETG:  { tips: ["Le PETG est très hygroscopique — il absorbe l'humidité en quelques heures seulement.", "Sécher systématiquement si la bobine est ouverte depuis plus d'une semaine.", "Conserver dans une boîte hermétique avec des sachets de silicagel entre les impressions."] },
  ABS:   { tips: ["L'ABS est moins hygroscopique que le PETG mais se dégrade à haute humidité.", "Ne pas dépasser 80 °C pour éviter la déformation de la bobine plastique.", "Un séchage de 4 à 6 h à 75 °C est généralement suffisant."] },
  ASA:   { tips: ["L'ASA se comporte comme l'ABS face à l'humidité — sensibilité similaire.", "Sécher à 70-80 °C pendant 4 à 8 h selon l'humidité ambiante.", "Moins absorbant que le PETG — le stockage en boîte ouverte est toléré sur courte durée."] },
  TPU:   { tips: ["Le TPU est très sensible à l'humidité — séchage quasi systématique recommandé.", "Ne pas dépasser 60 °C pour éviter de ramollir ou déformer le filament souple.", "Les signes sont souvent très visibles : bulles, stringing excessif, surface terne ou mate."] },
  Nylon: { tips: ["Le Nylon est le filament le plus hygroscopique — il absorbe l'humidité en 1 à 2 h en air libre.", "Sécher systématiquement, même si la bobine vient d'être ouverte.", "Idéalement, imprimer directement depuis le séchoir pour éviter toute réabsorption."] },
};

const URGENCY_META_FR = {
  non_necessaire: { icon:'✦', level:'Séchage non nécessaire',  sub:"Ton filament est probablement en bon état. Imprime sans crainte." },
  optionnel:      { icon:'◐', level:'Séchage optionnel',       sub:"Pas indispensable, mais recommandé si tu veux une qualité optimale." },
  recommande:     { icon:'♨', level:'Séchage recommandé',      sub:"Ton filament a probablement absorbé de l'humidité. Sèche-le avant d'imprimer." },
  urgent:         { icon:'⚡', level:'Séchage indispensable',   sub:"Ton filament est humide. Imprimer ainsi donnera de mauvais résultats." },
};

const HUMIDITY_ZONES_FR = [
  { max:35,  label:'Sec',         cls:'hz-dry'    },
  { max:55,  label:'Normal',      cls:'hz-normal' },
  { max:70,  label:'Humide',      cls:'hz-humid'  },
  { max:101, label:'Très humide', cls:'hz-wet'    },
];

const SENSITIVITY_LABEL_FR = {
  low:'Stable', medium:'Modéré', high:'Sensible', very_high:'Très sensible', extreme:'Extrême'
};

const COMBINATIONS_FR = [
  { id:'complementaire', title:'Complémentaire', slots:2, desc:"Deux couleurs à l'opposé sur la roue. Contraste maximum — idéal pour les pièces qui veulent s'imposer.", amsNote:"Il reste 2 slots libres dans l'AMS — complète avec du blanc et du noir pour plus de polyvalence." },
  { id:'analogue',       title:'Analogue',       slots:3, desc:"Trois voisines sur la roue. Une harmonie naturelle et douce, parfaite pour les objets décoratifs.",          amsNote:"Un slot reste libre — un neutre (blanc, gris ou noir) équilibre bien la palette." },
  { id:'triadique',      title:'Triadique',      slots:3, desc:"Trois couleurs à égale distance. Vibrant et équilibré — idéal pour les pièces techniques ou ludiques.",      amsNote:"Un slot reste libre — un neutre (blanc, gris ou noir) équilibre bien la palette." },
  { id:'tetradique',     title:'Tétradique',     slots:4, desc:"Quatre couleurs à 90° d'intervalle. Remplit exactement les 4 slots AMS — rendu maximal, zéro gaspillage.",  amsNote:null },
];

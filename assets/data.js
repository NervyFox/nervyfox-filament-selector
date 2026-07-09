/* ======================================================
   NERVYFOX HUB — data.js
   Loader : charge la bonne langue + données communes
====================================================== */

/* IS_EN lu depuis la variable LANG définie dans components.js */
var IS_EN = (localStorage.getItem('nf-lang') || 'fr') === 'en';

/* === FILAMENTS === */
var FILAMENTS     = IS_EN ? FILAMENTS_EN     : FILAMENTS_FR;
var SCORE_LABELS  = IS_EN ? SCORE_LABELS_EN  : SCORE_LABELS_FR;
var ALL_FILAMENTS = Object.keys(FILAMENTS);

/* === SÉLECTEUR === */
var Q_TYPE        = IS_EN ? Q_TYPE_EN        : Q_TYPE_FR;
var Q_ENV         = IS_EN ? Q_ENV_EN         : Q_ENV_FR;
var Q_CONSTRAINTS = IS_EN ? Q_CONSTRAINTS_EN : Q_CONSTRAINTS_FR;
var Q_FINISH      = IS_EN ? Q_FINISH_EN      : Q_FINISH_FR;
var Q_LEVEL       = IS_EN ? Q_LEVEL_EN       : Q_LEVEL_FR;
var STEP_META     = IS_EN ? STEP_META_EN     : STEP_META_FR;

/* === SÉCHAGE === */
var FILAMENTS_SECHAGE_LANG = IS_EN ? FILAMENTS_SECHAGE_EN : FILAMENTS_SECHAGE_FR;
var URGENCY_META_LANG      = IS_EN ? URGENCY_META_EN      : URGENCY_META_FR;
var HUMIDITY_ZONES_LANG    = IS_EN ? HUMIDITY_ZONES_EN    : HUMIDITY_ZONES_FR;
var SENSITIVITY_LABEL_LANG = IS_EN ? SENSITIVITY_LABEL_EN : SENSITIVITY_LABEL_FR;

/* === COULEURS === */
var COMBINATIONS_LANG = IS_EN ? COMBINATIONS_EN : COMBINATIONS_FR;

/* === DIAGNOSTIQUE === */
var DEFAUTS = IS_EN ? DEFAUTS_EN : DEFAUTS_FR;

/* ======================================================
   ARBRE DE DÉCISION (commun aux deux langues)
====================================================== */
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
   DONNÉES DIAGNOSTIQUE (communes, textes dans data.fr/en)
====================================================== */
var DIAG_DATA = {
  warping: {
    all: {
      dd: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Poorly calibrated bed or temperature too low'         : 'Plateau mal calibré ou température trop basse',        difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Re-run automatic bed leveling', 'Increase bed temperature by 5°C', 'Clean the bed with IPA before printing'] : ['Relancer le calibrage automatique du plateau', 'Augmenter la température du plateau de 5°C', 'Nettoyer le plateau à l\'IPA avant impression'] },
        { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Not enough adhesion surface'                          : 'Pas assez de surface d\'adhérence',                     difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Enable brim in slicer (5-10mm)', 'Use a glue stick or hairspray on the bed'] : ['Activer le brim dans le slicer (5-10mm)', 'Utiliser une colle en bâton ou laque sur le plateau'] },
      ],
      bow: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Poorly calibrated bed or temperature too low'         : 'Plateau mal calibré ou température trop basse',        difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Manually recalibrate the bed', 'Increase bed temperature by 5°C', 'Clean the bed with IPA'] : ['Recalibrer le plateau manuellement', 'Augmenter la température du plateau de 5°C', 'Nettoyer le plateau à l\'IPA'] },
        { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Drafts around the printer'                            : 'Courants d\'air autour de l\'imprimante',               difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Shield the printer from drafts', 'Enable brim in slicer'] : ['Protéger l\'imprimante des courants d\'air', 'Activer le brim dans le slicer'] },
      ],
    },
    ABS: {
      all: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'ABS shrinks a lot when cooling — it needs an enclosure' : 'L\'ABS se rétracte beaucoup en refroidissant — il lui faut une enceinte fermée', difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Close the printer enclosure during printing', 'Raise bed to 100-110°C', 'Disable layer fan (or reduce to 20%)'] : ['Fermer l\'enceinte de l\'imprimante pendant l\'impression', 'Augmenter le plateau à 100-110°C', 'Désactiver le ventilateur de couche (ou réduire à 20%)'] },
        { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Not enough adhesion'                                    : 'Pas assez d\'adhérence',                                                           difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Apply a glue stick on the bed', 'Enable a 8-10mm brim'] : ['Appliquer une colle en bâton sur le plateau', 'Activer un brim de 8-10mm'] },
      ],
    },
    ASA: {
      all: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'ASA shrinks like ABS — enclosed printer is essential'  : 'L\'ASA se rétracte comme l\'ABS — enceinte fermée indispensable',                 difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Close the printer enclosure', 'Bed at 100°C minimum', 'Reduce layer fan to 20% max'] : ['Fermer l\'enceinte de l\'imprimante', 'Plateau à 100°C minimum', 'Réduire le ventilateur de couche à 20% max'] },
      ],
    },
  },
  stringing: {
    all: {
      dd: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Nozzle temperature too high — filament oozes during travel' : 'Température de buse trop élevée — le filament coule pendant les déplacements', difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Lower temperature by 5°C and retest', 'Enable combing in slicer to avoid travel over voids'] : ['Baisser la température de 5°C et retester', 'Activer le "combing" dans le slicer pour éviter les déplacements au-dessus des vides'] },
        { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Insufficient retraction'                                    : 'Rétraction insuffisante',                                                       difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Increase retraction distance by 0.5mm (start: 1-2mm for direct drive)', 'Increase retraction speed'] : ['Augmenter la distance de rétraction de 0.5mm (départ : 1-2mm en direct drive)', 'Augmenter la vitesse de rétraction'] },
      ],
      bow: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Insufficient retraction — Bowden requires more retraction'  : 'Rétraction insuffisante — le tube Bowden nécessite plus de rétraction',         difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Increase retraction distance (start: 4-6mm for Bowden)', 'Lower temperature by 5°C'] : ['Augmenter la distance de rétraction (départ : 4-6mm en Bowden)', 'Baisser la température de 5°C'] },
        { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Worn or loose Bowden tube'                                  : 'Tube Bowden usé ou mal clipé',                                                  difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Check tube is properly clipped on both ends', 'Replace PTFE tube if yellowed or deformed'] : ['Vérifier que le tube est bien enclipsé des deux côtés', 'Remplacer le tube PTFE si il est jauni ou déformé'] },
      ],
    },
    TPU: {
      dd: [{ prob: IS_EN ? 'Main' : 'Principal', cause: IS_EN ? 'TPU is flexible and hard to retract — minimize it' : 'Le TPU est souple et difficile à rétracter — réduire au maximum', difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Disable retraction or set to 0.5mm max', 'Reduce print speed to 20-30mm/s', 'Enable combing in slicer'] : ['Désactiver la rétraction ou la mettre à 0.5mm max', 'Réduire la vitesse d\'impression à 20-30mm/s', 'Activer le combing dans le slicer'] }],
      bow: [{ prob: IS_EN ? 'Main' : 'Principal', cause: IS_EN ? 'TPU in Bowden is very difficult — flexible filament compresses in the tube' : 'Le TPU en Bowden est très difficile — le filament souple se comprime dans le tube', difficulte: IS_EN ? 'Technical' : 'Technique', actions: IS_EN ? ['Reduce speed to 15-20mm/s', 'Disable retraction completely', 'Consider switching to direct drive for TPU'] : ['Réduire la vitesse à 15-20mm/s', 'Désactiver la rétraction complètement', 'Envisager de passer en direct drive pour le TPU'] }],
    },
    PETG: {
      all: [{ prob: IS_EN ? 'Main' : 'Principal', cause: IS_EN ? 'PETG is naturally sticky and prone to stringing' : 'Le PETG est naturellement collant et prone au stringing', difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Lower temperature by 5-10°C (try 230°C)', 'Increase travel speed', 'Enable wipe on retract in slicer'] : ['Baisser la température de 5-10°C (essayer 230°C)', 'Augmenter la vitesse de déplacement', 'Activer le "wipe on retract" dans le slicer'] }],
    },
  },
  sousex: {
    all: {
      dd: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Wet filament or partially clogged nozzle' : 'Filament humide ou buse partiellement bouchée', difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Dry filament for 4-8h at recommended temperature', 'Do a cold pull to clean the nozzle', 'Increase temperature by 5°C'] : ['Sécher le filament 4-8h à la température recommandée', 'Faire un "cold pull" pour nettoyer la buse', 'Augmenter la température de 5°C'] },
        { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Speed too high for the filament'          : 'Vitesse trop élevée pour le filament',           difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Reduce print speed by 20%', 'Check that extrusion multiplier is at 100%'] : ['Réduire la vitesse d\'impression de 20%', 'Vérifier que le multiplicateur d\'extrusion est à 100%'] },
      ],
      bow: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Extruder slipping or clogged nozzle'      : 'Glissement du filament dans l\'extrudeur ou buse bouchée', difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Check extruder tension (drive gear)', 'Do a cold pull to clean the nozzle', 'Dry the filament'] : ['Vérifier la tension de l\'extrudeur (roue dentée)', 'Faire un cold pull pour nettoyer la buse', 'Sécher le filament'] },
        { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Bowden tube with play — filament backs up during retraction' : 'Tube Bowden avec jeu — le filament recule pendant la rétraction', difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Check tube fitting on nozzle side', 'Replace PTFE tube if worn'] : ['Vérifier le raccord du tube côté buse', 'Remplacer le tube PTFE si usé'] },
      ],
    },
  },
  surex: {
    all: { all: [
      { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Extrusion multiplier too high' : 'Multiplicateur d\'extrusion trop élevé',     difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Lower extrusion multiplier to 95% and test', 'Print a calibration cube and measure the walls'] : ['Baisser le multiplicateur d\'extrusion à 95% et tester', 'Imprimer un cube de calibration et mesurer les murs'] },
      { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Filament diameter incorrectly configured' : 'Diamètre de filament mal configuré', difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Measure filament with calipers (should be ~1.75mm)', 'Enter the exact value in the slicer'] : ['Mesurer le filament au pied à coulisse (doit être ~1.75mm)', 'Entrer la valeur exacte dans le slicer'] },
    ]},
  },
  bulles: {
    all: { all: [
      { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Wet filament — water evaporates in the nozzle' : 'Filament humide — l\'eau s\'évapore dans la buse', difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Dry filament immediately', 'Check the Drying tool for duration and temperature'] : ['Sécher le filament immédiatement', 'Consulter l\'outil Séchage pour la durée et la température'] },
      { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Temperature too high'                          : 'Température trop élevée',                         difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Lower temperature by 5-10°C', 'Check that temperature matches manufacturer recommendations'] : ['Baisser la température de 5-10°C', 'Vérifier que la température correspond aux recommandations du fabricant'] },
    ]},
    PETG: { all: [{ prob: IS_EN ? 'Main' : 'Principal', cause: IS_EN ? 'PETG is very hygroscopic — bubbles are usually caused by moisture' : 'Le PETG est très hygroscopique — les bulles sont souvent dues à l\'humidité', difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Dry filament for 6-12h at 65°C', 'Store in airtight box with silica gel'] : ['Sécher le filament 6-12h à 65°C', 'Stocker dans une boîte hermétique avec silicagel'] }] },
    Nylon: { all: [{ prob: IS_EN ? 'Main' : 'Principal', cause: IS_EN ? 'Nylon absorbs moisture in 1-2h — drying is mandatory' : 'Le Nylon absorbe l\'humidité en 1-2h — séchage indispensable', difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Dry for 8-24h at 80°C', 'Print directly from the dryer'] : ['Sécher 8-24h à 80°C', 'Imprimer directement depuis le séchoir'] }] },
  },
  premiere: {
    all: { all: [
      { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Poorly leveled bed — nozzle too far or too close'        : 'Plateau mal nivelé — buse trop loin ou trop proche',       difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Recalibrate Z-offset (too far: increase; too close: decrease)', 'Re-run automatic bed leveling'] : ['Recalibrer le Z-offset (buse trop loin : augmenter ; trop près : baisser)', 'Relancer le calibrage automatique du plateau'] },
      { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Dirty or unprepared bed'                                 : 'Plateau sale ou non préparé',                               difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Clean with 90%+ IPA', 'Apply glue or hairspray if filament won\'t stick'] : ['Nettoyer avec de l\'IPA 90°+', 'Appliquer colle ou laque si le filament n\'adhère pas'] },
      { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'First layer speed too high'                              : 'Vitesse de première couche trop élevée',                    difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Reduce first layer speed to 20-25mm/s in slicer'] : ['Réduire la vitesse de première couche à 20-25mm/s dans le slicer'] },
    ]},
  },
  layershift: {
    all: { all: [
      { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Speed too high — motors losing steps'  : 'Vitesse trop élevée — les moteurs perdent des pas',    difficulte: IS_EN ? 'Easy'      : 'Facile',    actions: IS_EN ? ['Reduce print speed by 30%', 'Check that belts are properly tensioned'] : ['Réduire la vitesse d\'impression de 30%', 'Vérifier que les courroies sont bien tendues'] },
      { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Print head colliding with the part'    : 'Collision de la tête avec la pièce',                    difficulte: IS_EN ? 'Medium'    : 'Moyen',     actions: IS_EN ? ['Enable Z-hop in slicer for travel moves', 'Check for blobs or bumps on the part'] : ['Activer le "Z-hop" dans le slicer pour les déplacements', 'Vérifier qu\'il n\'y a pas de blob ou de boursouflure sur la pièce'] },
      { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Mechanical issue (belt, screw)'        : 'Problème mécanique (courroie, vis)',                     difficulte: IS_EN ? 'Technical' : 'Technique', actions: IS_EN ? ['Check X and Y belt tension', 'Check pulley set screw tightness'] : ['Vérifier la tension des courroies X et Y', 'Vérifier le serrage des vis de fixation des poulies'] },
    ]},
  },
  surplomb: {
    all: {
      dd: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Insufficient cooling fan'       : 'Ventilateur de refroidissement insuffisant', difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Increase fan speed to 100% for overhangs', 'Reduce print speed on overhang areas'] : ['Augmenter la vitesse du ventilateur à 100% pour les surplombs', 'Réduire la vitesse d\'impression sur les zones en surplomb'] },
        { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Overhang angle too steep without supports' : 'Angle de surplomb trop important sans support', difficulte: IS_EN ? 'Medium' : 'Moyen',  actions: IS_EN ? ['Enable supports in slicer beyond 45°', 'Reorient part to minimize overhangs'] : ['Activer les supports dans le slicer au-delà de 45°', 'Réorienter la pièce pour minimiser les surplombs'] },
      ],
      bow: [
        { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Insufficient cooling'           : 'Refroidissement insuffisant', difficulte: IS_EN ? 'Easy'   : 'Facile', actions: IS_EN ? ['Increase fan to 100%', 'Reduce print speed'] : ['Augmenter le ventilateur à 100%', 'Réduire la vitesse d\'impression'] },
        { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Angle too steep'                : 'Angle trop important',        difficulte: IS_EN ? 'Medium' : 'Moyen',  actions: IS_EN ? ['Add supports in slicer', 'Reorient the part'] : ['Ajouter des supports dans le slicer', 'Réorienter la pièce'] },
      ],
    },
    ABS: { all: [{ prob: IS_EN ? 'Main' : 'Principal', cause: IS_EN ? 'ABS doesn\'t handle strong cooling well — overhangs are naturally harder' : 'L\'ABS ne supporte pas un refroidissement fort — les surplombs sont naturellement plus difficiles', difficulte: IS_EN ? 'Medium' : 'Moyen', actions: IS_EN ? ['Reduce speed on overhangs', 'Add supports from 40°', 'Don\'t exceed 30% fan to avoid warping'] : ['Réduire la vitesse sur les surplombs', 'Ajouter des supports dès 40°', 'Ne pas augmenter le ventilateur au-delà de 30% pour éviter le warping'] }] },
  },
  surface: {
    all: { all: [
      { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Wet filament or layer height too large' : 'Filament humide ou hauteur de couche trop grande',              difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Dry the filament', 'Reduce layer height (try 0.15mm instead of 0.2mm)'] : ['Sécher le filament', 'Réduire la hauteur de couche (essayer 0.15mm au lieu de 0.2mm)'] },
      { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Temperature too low — poor layer bonding' : 'Température trop basse — mauvaise fusion entre les couches', difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Increase temperature by 5°C', 'Check print speed'] : ['Augmenter la température de 5°C', 'Vérifier la vitesse d\'impression'] },
    ]},
  },
  elephant: {
    all: { all: [
      { prob: IS_EN ? 'Main'      : 'Principal',  cause: IS_EN ? 'Nozzle too close to bed — first layer is squished and spreads out' : 'Buse trop proche du plateau — la première couche est écrasée et déborde', difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Slightly increase Z-offset (move nozzle away from bed)', 'Reduce bed temperature by 5°C'] : ['Augmenter légèrement le Z-offset (éloigner la buse du plateau)', 'Réduire la température du plateau de 5°C'] },
      { prob: IS_EN ? 'Secondary' : 'Secondaire', cause: IS_EN ? 'Extrusion multiplier too high on first layer' : 'Multiplicateur d\'extrusion trop élevé sur la première couche', difficulte: IS_EN ? 'Easy' : 'Facile', actions: IS_EN ? ['Reduce first layer flow to 95% in slicer'] : ['Réduire le "first layer flow" à 95% dans le slicer'] },
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

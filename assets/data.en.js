/* ======================================================
   NERVYFOX HUB — data.en.js
   English data
====================================================== */

const FILAMENTS_EN = {
  PLA: {
    color: '#F2641E', text: '#1A1510',
    affiliateLink: '',
    scores: { facilite:5, resistance:2, chaleur:1, eau:2, finition:5, cout:5 },
    core: "PLA is the perfect filament to start with: easy to print, great finish, no warping. Ideal for anything that won't be exposed to heat or moisture.",
    whyNot: "Very easy to use and looks great, but it softens above 60°C, doesn't handle prolonged moisture, and degrades under UV. Avoid outdoors."
  },
  PETG: {
    color: '#5B22D6', text: '#F8F0E3',
    affiliateLink: '',
    scores: { facilite:4, resistance:4, chaleur:3, eau:4, finition:4, cout:4 },
    core: "PETG is the ultimate all-rounder: almost as easy to print as PLA, but much more resistant to moisture, impacts and moderate temperatures (up to ~80°C).",
    whyNot: "Great balance of strength and ease, but degrades under intense UV over time and can't handle very high temperatures (>80°C)."
  },
  ABS: {
    color: '#F8556B', text: '#1A1510',
    affiliateLink: '',
    scores: { facilite:2, resistance:4, chaleur:4, eau:3, finition:3, cout:4 },
    core: "ABS handles heat well (up to ~100°C) and mechanical stress. A true technical filament, but it requires an enclosed printer and some experience.",
    whyNot: "Strong and heat-resistant, but prone to warping, releases fumes, and requires an enclosed printer. Not recommended for beginners."
  },
  ASA: {
    color: '#1A1510', text: '#F8F0E3',
    affiliateLink: '',
    scores: { facilite:2, resistance:4, chaleur:4, eau:4, finition:3, cout:3 },
    core: "ASA combines ABS's strengths with excellent UV and weather resistance. THE choice for outdoor use in direct sunlight or intense heat.",
    whyNot: "Champion for outdoor and UV use, but more expensive and trickier to print than PETG. Overkill for simple indoor use."
  },
  TPU: {
    color: '#F89B6C', text: '#1A1510',
    affiliateLink: '',
    scores: { facilite:2, resistance:3, chaleur:2, eau:3, finition:3, cout:3 },
    core: "TPU is the go-to flexible filament: it bends, stretches, and bounces back without breaking. Essential for anything that needs to absorb impact or stay flexible.",
    whyNot: "Perfect for flexibility, but totally unsuitable if your part needs to stay rigid. Can also be tricky to print (slow speed recommended)."
  }
};

const SCORE_LABELS_EN = {
  facilite:'Ease', resistance:'Strength', chaleur:'Heat resistance',
  eau:'Water / Moisture', finition:'Finish', cout:'Cost'
};

const Q_TYPE_EN = [
  { id:'deco',  label:"Decorative object",     icon:'✦', hint:"Figurine, vase, wall art..." },
  { id:'proto', label:"Prototype / mockup",    icon:'◐', hint:"Visual test, presentation model" },
  { id:'func',  label:"Functional part",       icon:'⌂', hint:"Stand, case, bracket, clip..." },
  { id:'flex',  label:"Flexible / soft part",  icon:'∿', hint:"Gasket, grip, damper, sole..." },
  { id:'tech',  label:"Technical part",        icon:'⚙', hint:"Mechanical, high strength, gear..." },
];

const Q_ENV_EN = [
  { id:'int',  label:"Indoor only", icon:'⌂', hint:"Desk, living room, workshop..." },
  { id:'ext',  label:"Outdoor",     icon:'☀', hint:"Rain, sun, temperature changes" },
  { id:'both', label:"Both",        icon:'⟳', hint:"Sometimes outside, sometimes inside" },
];

const Q_CONSTRAINTS_EN = [
  { id:'heat',  label:"Exposed to heat",          icon:'♨', hint:">50°C — car, kitchen, lamp..." },
  { id:'water', label:"Contact with water",        icon:'≈', hint:"Prolonged moisture or immersion" },
  { id:'shock', label:"Impacts or load bearing",   icon:'⚡', hint:"Significant mechanical resistance" },
  { id:'uv',    label:"Direct sunlight / UV",      icon:'☀', hint:"Prolonged sun exposure" },
];

const Q_FINISH_EN = [
  { id:'none',        label:"Doesn't matter",          icon:'—', hint:"It's purely functional" },
  { id:'smooth',      label:"Smooth and clean surface", icon:'◎', hint:"Visible, aesthetic" },
  { id:'detail',      label:"Fine and precise details", icon:'⬡', hint:"Small features, text, relief" },
  { id:'transparent', label:"Transparent or translucent", icon:'◐', hint:"Let light through" },
];

const Q_LEVEL_EN = [
  { id:'total', label:"Complete beginner",          hint:"I've never started a print." },
  { id:'some',  label:"A few prints under my belt", hint:"I know the basics, not much more." },
  { id:'exp',   label:"Experienced",                hint:"I tune my machine myself." },
];

const STEP_META_EN = {
  1: { eyebrow:"Step 1/5", color:'#F89B6C', title:"What kind of object is it?",       subtitle:"Choose what best describes what you want to print." },
  2: { eyebrow:"Step 2/5", color:'#F8556B', title:"Where will it be used?",            subtitle:"The environment often makes all the difference." },
  3: { eyebrow:"Step 3/5", color:'#5B22D6', title:"Any physical constraints?",         subtitle:"Select everything that applies to your object. (0 to 3 choices)" },
  4: { eyebrow:"Step 4/5", color:'#F2641E', title:"What finish do you want?",          subtitle:"The desired finish can help narrow down the filament choice." },
  5: { eyebrow:"Step 5/5", color:'#F89B6C', title:"Where are you with 3D printing?",  subtitle:"This helps us avoid suggesting something too technical." },
};

const DEFAUTS_EN = [
  { id: 'warping',    icon: '↗', label: 'Warping',          hint: 'Corners lifting off the bed' },
  { id: 'stringing',  icon: '≋', label: 'Stringing',        hint: 'Thin strings between parts of the print' },
  { id: 'sousex',     icon: '∿', label: 'Under-extrusion',  hint: 'Gaps, incomplete layers, holes' },
  { id: 'surex',      icon: '◉', label: 'Over-extrusion',   hint: 'Blobs, excess material' },
  { id: 'bulles',     icon: '●', label: 'Bubbles / noise',  hint: 'Popping or bubbling at the nozzle' },
  { id: 'premiere',   icon: '▱', label: 'First layer',      hint: 'Not sticking or too squished' },
  { id: 'layershift', icon: '⇥', label: 'Layer shift',      hint: 'Print is offset mid-way through' },
  { id: 'surplomb',   icon: '⌒', label: 'Sagging overhangs', hint: 'Overhanging parts drooping' },
  { id: 'surface',    icon: '◈', label: 'Rough surface',    hint: 'Uneven, grainy finish' },
  { id: 'elephant',   icon: '⊔', label: "Elephant's foot",  hint: 'Base of the print is flared out' },
];

const FILAMENTS_SECHAGE_EN = {
  PLA:   { tips: ["PLA absorbs little moisture but still degrades over time.", "Don't exceed 55°C — it may soften inside the dryer.", "A preventive 4h drying session is enough in most cases."] },
  PETG:  { tips: ["PETG is very hygroscopic — it absorbs moisture within a few hours.", "Always dry if the spool has been open for more than a week.", "Store in an airtight box with silica gel packets between prints."] },
  ABS:   { tips: ["ABS is less hygroscopic than PETG but degrades at high humidity.", "Don't exceed 80°C to avoid deforming the plastic spool.", "4 to 6h at 75°C is generally sufficient."] },
  ASA:   { tips: ["ASA behaves like ABS regarding moisture — similar sensitivity.", "Dry at 70-80°C for 4 to 8h depending on ambient humidity.", "Less absorbent than PETG — short-term open storage is tolerated."] },
  TPU:   { tips: ["TPU is very moisture-sensitive — drying is almost always recommended.", "Don't exceed 60°C to avoid softening or deforming the flexible filament.", "Signs are often very visible: bubbles, excessive stringing, dull surface."] },
  Nylon: { tips: ["Nylon is the most hygroscopic filament — it absorbs moisture within 1-2h in open air.", "Always dry, even if the spool was just opened.", "Ideally, print directly from the dryer to avoid any reabsorption."] },
};

const URGENCY_META_EN = {
  non_necessaire: { icon:'✦', level:'No drying needed',          sub:"Your filament is probably in good shape. Print away." },
  optionnel:      { icon:'◐', level:'Drying optional',           sub:"Not essential, but recommended for optimal quality." },
  recommande:     { icon:'♨', level:'Drying recommended',        sub:"Your filament has likely absorbed moisture. Dry it before printing." },
  urgent:         { icon:'⚡', level:'Drying required',          sub:"Your filament is wet. Printing like this will give bad results." },
};

const HUMIDITY_ZONES_EN = [
  { max:35,  label:'Dry',       cls:'hz-dry'    },
  { max:55,  label:'Normal',    cls:'hz-normal' },
  { max:70,  label:'Humid',     cls:'hz-humid'  },
  { max:101, label:'Very humid',cls:'hz-wet'    },
];

const SENSITIVITY_LABEL_EN = {
  low:'Stable', medium:'Moderate', high:'Sensitive', very_high:'Very sensitive', extreme:'Extreme'
};

const COMBINATIONS_EN = [
  { id:'complementaire', title:'Complementary', slots:2, desc:"Two colors opposite each other on the wheel. Maximum contrast — ideal for parts that want to make a statement.", amsNote:"2 AMS slots remain free — add white and black for more versatility." },
  { id:'analogue',       title:'Analogous',     slots:3, desc:"Three neighboring colors on the wheel. A natural, soft harmony — perfect for decorative objects.",              amsNote:"One slot remains free — a neutral (white, grey or black) balances the palette well." },
  { id:'triadique',      title:'Triadic',        slots:3, desc:"Three evenly spaced colors. Vibrant and balanced — great for technical or playful parts.",                     amsNote:"One slot remains free — a neutral (white, grey or black) balances the palette well." },
  { id:'tetradique',     title:'Tetradic',       slots:4, desc:"Four colors at 90° intervals. Fills all 4 AMS slots exactly — maximum impact, zero waste.",                    amsNote:null },
];

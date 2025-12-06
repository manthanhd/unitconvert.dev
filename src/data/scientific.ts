import type { Category, Unit } from './types';

// ============================================================================
// FORCE
// ============================================================================

export const forceCategory: Category = {
  id: 'force',
  name: 'Force',
  conversionType: 'linear',
};

// Base unit: Newton
export const forceUnits: Unit[] = [
  {
    id: 'newton',
    categoryId: 'force',
    name: 'Newton',
    abbreviations: ['N'],
    aliases: ['newtons'],
    toBase: 1,
  },
  {
    id: 'kilonewton',
    categoryId: 'force',
    name: 'Kilonewton',
    abbreviations: ['kN'],
    aliases: ['kilonewtons'],
    toBase: 1000,
  },
  {
    id: 'meganewton',
    categoryId: 'force',
    name: 'Meganewton',
    abbreviations: ['MN'],
    aliases: ['meganewtons'],
    toBase: 1000000,
  },
  {
    id: 'millinewton',
    categoryId: 'force',
    name: 'Millinewton',
    abbreviations: ['mN'],
    aliases: ['millinewtons'],
    toBase: 0.001,
  },
  {
    id: 'dyne',
    categoryId: 'force',
    name: 'Dyne',
    abbreviations: ['dyn'],
    aliases: ['dynes'],
    toBase: 0.00001,
  },
  {
    id: 'pound-force',
    categoryId: 'force',
    name: 'Pound-force',
    abbreviations: ['lbf'],
    aliases: ['pounds force', 'pound force'],
    toBase: 4.44822,
  },
  {
    id: 'ounce-force',
    categoryId: 'force',
    name: 'Ounce-force',
    abbreviations: ['ozf'],
    aliases: ['ounces force', 'ounce force'],
    toBase: 0.278014,
  },
  {
    id: 'kilogram-force',
    categoryId: 'force',
    name: 'Kilogram-force',
    abbreviations: ['kgf', 'kp'],
    aliases: ['kilograms force', 'kilopond'],
    toBase: 9.80665,
  },
  {
    id: 'gram-force',
    categoryId: 'force',
    name: 'Gram-force',
    abbreviations: ['gf'],
    aliases: ['grams force'],
    toBase: 0.00980665,
  },
  {
    id: 'poundal',
    categoryId: 'force',
    name: 'Poundal',
    abbreviations: ['pdl'],
    aliases: ['poundals'],
    toBase: 0.138255,
  },
  {
    id: 'kip',
    categoryId: 'force',
    name: 'Kip',
    abbreviations: ['kip'],
    aliases: ['kips', 'kilopound'],
    toBase: 4448.22,
  },
  {
    id: 'micronewton',
    categoryId: 'force',
    name: 'Micronewton',
    abbreviations: ['μN', 'uN'],
    aliases: ['micronewtons'],
    toBase: 0.000001,
  },
  {
    id: 'ton-force-short',
    categoryId: 'force',
    name: 'Ton-force (short)',
    abbreviations: ['tonf'],
    aliases: ['ton force', 'short ton force'],
    toBase: 8896.44,
  },
  {
    id: 'ton-force-metric',
    categoryId: 'force',
    name: 'Ton-force (metric)',
    abbreviations: ['tf'],
    aliases: ['metric ton force', 'tonne force'],
    toBase: 9806.65,
  },
];

// ============================================================================
// TORQUE
// ============================================================================

export const torqueCategory: Category = {
  id: 'torque',
  name: 'Torque',
  conversionType: 'linear',
};

// Base unit: Newton-meter
export const torqueUnits: Unit[] = [
  {
    id: 'newton-meter',
    categoryId: 'torque',
    name: 'Newton-meter',
    abbreviations: ['N⋅m', 'Nm', 'N·m'],
    aliases: ['newton meters', 'newton metre'],
    toBase: 1,
  },
  {
    id: 'kilonewton-meter',
    categoryId: 'torque',
    name: 'Kilonewton-meter',
    abbreviations: ['kN⋅m', 'kNm'],
    aliases: ['kilonewton meters'],
    toBase: 1000,
  },
  {
    id: 'newton-centimeter',
    categoryId: 'torque',
    name: 'Newton-centimeter',
    abbreviations: ['N⋅cm', 'Ncm'],
    aliases: ['newton centimeters'],
    toBase: 0.01,
  },
  {
    id: 'foot-pound-torque',
    categoryId: 'torque',
    name: 'Foot-pound',
    abbreviations: ['ft⋅lb', 'ft-lb', 'ft⋅lbf'],
    aliases: ['foot pounds', 'pound feet', 'lb-ft'],
    toBase: 1.35582,
  },
  {
    id: 'inch-pound',
    categoryId: 'torque',
    name: 'Inch-pound',
    abbreviations: ['in⋅lb', 'in-lb', 'in⋅lbf'],
    aliases: ['inch pounds', 'pound inches'],
    toBase: 0.112985,
  },
  {
    id: 'kilogram-force-meter',
    categoryId: 'torque',
    name: 'Kilogram-force meter',
    abbreviations: ['kgf⋅m', 'kgm'],
    aliases: ['kilogram meters'],
    toBase: 9.80665,
  },
  {
    id: 'ounce-force-inch',
    categoryId: 'torque',
    name: 'Ounce-force inch',
    abbreviations: ['ozf⋅in', 'oz-in'],
    aliases: ['ounce inches'],
    toBase: 0.00706155,
  },
  {
    id: 'millinewton-meter',
    categoryId: 'torque',
    name: 'Millinewton-meter',
    abbreviations: ['mN⋅m', 'mNm'],
    aliases: ['millinewton meters'],
    toBase: 0.001,
  },
  {
    id: 'foot-ounce',
    categoryId: 'torque',
    name: 'Foot-ounce',
    abbreviations: ['ft⋅oz', 'ft-oz'],
    aliases: ['foot ounces'],
    toBase: 0.0847386,
  },
  {
    id: 'inch-ounce',
    categoryId: 'torque',
    name: 'Inch-ounce',
    abbreviations: ['in⋅oz', 'in-oz'],
    aliases: ['inch ounces'],
    toBase: 0.00706155,
  },
  {
    id: 'kilogram-force-centimeter',
    categoryId: 'torque',
    name: 'Kilogram-force centimeter',
    abbreviations: ['kgf⋅cm', 'kgfcm'],
    aliases: ['kilogram centimeters'],
    toBase: 0.0980665,
  },
  {
    id: 'gram-force-centimeter',
    categoryId: 'torque',
    name: 'Gram-force centimeter',
    abbreviations: ['gf⋅cm', 'gfcm'],
    aliases: ['gram centimeters'],
    toBase: 0.0000980665,
  },
  {
    id: 'dyne-centimeter',
    categoryId: 'torque',
    name: 'Dyne-centimeter',
    abbreviations: ['dyn⋅cm', 'dyncm'],
    aliases: ['dyne centimeters'],
    toBase: 0.0000001,
  },
];

// ============================================================================
// DENSITY
// ============================================================================

export const densityCategory: Category = {
  id: 'density',
  name: 'Density',
  conversionType: 'linear',
};

// Base unit: kilogram per cubic meter
export const densityUnits: Unit[] = [
  {
    id: 'kilogram-per-cubic-meter',
    categoryId: 'density',
    name: 'Kilogram per cubic meter',
    abbreviations: ['kg/m³', 'kg/m3'],
    aliases: ['kilograms per cubic meter'],
    toBase: 1,
  },
  {
    id: 'gram-per-cubic-centimeter',
    categoryId: 'density',
    name: 'Gram per cubic centimeter',
    abbreviations: ['g/cm³', 'g/cc', 'g/cm3'],
    aliases: ['grams per cubic centimeter', 'g/mL'],
    toBase: 1000,
  },
  {
    id: 'kilogram-per-liter',
    categoryId: 'density',
    name: 'Kilogram per liter',
    abbreviations: ['kg/L'],
    aliases: ['kilograms per liter'],
    toBase: 1000,
  },
  {
    id: 'gram-per-liter',
    categoryId: 'density',
    name: 'Gram per liter',
    abbreviations: ['g/L'],
    aliases: ['grams per liter'],
    toBase: 1,
  },
  {
    id: 'pound-per-cubic-foot',
    categoryId: 'density',
    name: 'Pound per cubic foot',
    abbreviations: ['lb/ft³', 'lb/ft3'],
    aliases: ['pounds per cubic foot'],
    toBase: 16.0185,
  },
  {
    id: 'pound-per-cubic-inch',
    categoryId: 'density',
    name: 'Pound per cubic inch',
    abbreviations: ['lb/in³', 'lb/in3'],
    aliases: ['pounds per cubic inch'],
    toBase: 27679.9,
  },
  {
    id: 'pound-per-gallon',
    categoryId: 'density',
    name: 'Pound per gallon (US)',
    abbreviations: ['lb/gal'],
    aliases: ['pounds per gallon'],
    toBase: 119.826,
  },
];

// ============================================================================
// FLOW RATE (VOLUME)
// ============================================================================

export const flowRateCategory: Category = {
  id: 'flow-rate',
  name: 'Flow Rate',
  conversionType: 'linear',
};

// Base unit: cubic meter per second
export const flowRateUnits: Unit[] = [
  {
    id: 'cubic-meter-per-second',
    categoryId: 'flow-rate',
    name: 'Cubic meter per second',
    abbreviations: ['m³/s', 'm3/s'],
    aliases: ['cubic meters per second'],
    toBase: 1,
  },
  {
    id: 'cubic-meter-per-hour',
    categoryId: 'flow-rate',
    name: 'Cubic meter per hour',
    abbreviations: ['m³/h', 'm3/h'],
    aliases: ['cubic meters per hour'],
    toBase: 0.000277778,
  },
  {
    id: 'liter-per-second',
    categoryId: 'flow-rate',
    name: 'Liter per second',
    abbreviations: ['L/s'],
    aliases: ['liters per second'],
    toBase: 0.001,
  },
  {
    id: 'liter-per-minute',
    categoryId: 'flow-rate',
    name: 'Liter per minute',
    abbreviations: ['L/min', 'LPM'],
    aliases: ['liters per minute'],
    toBase: 0.0000166667,
  },
  {
    id: 'liter-per-hour',
    categoryId: 'flow-rate',
    name: 'Liter per hour',
    abbreviations: ['L/h'],
    aliases: ['liters per hour'],
    toBase: 0.000000277778,
  },
  {
    id: 'gallon-per-minute',
    categoryId: 'flow-rate',
    name: 'Gallon per minute (US)',
    abbreviations: ['GPM', 'gal/min'],
    aliases: ['gallons per minute'],
    toBase: 0.0000630902,
  },
  {
    id: 'gallon-per-hour',
    categoryId: 'flow-rate',
    name: 'Gallon per hour (US)',
    abbreviations: ['GPH', 'gal/h'],
    aliases: ['gallons per hour'],
    toBase: 0.00000105150,
  },
  {
    id: 'cubic-foot-per-second',
    categoryId: 'flow-rate',
    name: 'Cubic foot per second',
    abbreviations: ['ft³/s', 'cfs'],
    aliases: ['cubic feet per second'],
    toBase: 0.0283168,
  },
  {
    id: 'cubic-foot-per-minute',
    categoryId: 'flow-rate',
    name: 'Cubic foot per minute',
    abbreviations: ['CFM', 'ft³/min'],
    aliases: ['cubic feet per minute'],
    toBase: 0.000471947,
  },
  {
    id: 'cubic-meter-per-minute',
    categoryId: 'flow-rate',
    name: 'Cubic meter per minute',
    abbreviations: ['m³/min', 'm3/min'],
    aliases: ['cubic meters per minute'],
    toBase: 0.0166667,
  },
  {
    id: 'milliliter-per-minute',
    categoryId: 'flow-rate',
    name: 'Milliliter per minute',
    abbreviations: ['mL/min'],
    aliases: ['milliliters per minute'],
    toBase: 1.66667e-8,
  },
  {
    id: 'gallon-per-second',
    categoryId: 'flow-rate',
    name: 'Gallon per second (US)',
    abbreviations: ['gal/s'],
    aliases: ['gallons per second'],
    toBase: 0.00378541,
  },
  {
    id: 'cubic-inch-per-second',
    categoryId: 'flow-rate',
    name: 'Cubic inch per second',
    abbreviations: ['in³/s', 'in3/s'],
    aliases: ['cubic inches per second'],
    toBase: 0.0000163871,
  },
  {
    id: 'cubic-foot-per-hour',
    categoryId: 'flow-rate',
    name: 'Cubic foot per hour',
    abbreviations: ['ft³/h', 'ft3/h'],
    aliases: ['cubic feet per hour'],
    toBase: 7.86579e-6,
  },
  {
    id: 'barrel-per-day',
    categoryId: 'flow-rate',
    name: 'Barrel per day',
    abbreviations: ['bbl/d', 'bpd'],
    aliases: ['barrels per day'],
    toBase: 1.84013e-6,
  },
];

// ============================================================================
// CONCENTRATION
// ============================================================================

export const concentrationCategory: Category = {
  id: 'concentration',
  name: 'Concentration',
  conversionType: 'linear',
};

// Base unit: parts per million
export const concentrationUnits: Unit[] = [
  {
    id: 'percent',
    categoryId: 'concentration',
    name: 'Percent',
    abbreviations: ['%'],
    aliases: ['percentage'],
    toBase: 10000,
  },
  {
    id: 'permille',
    categoryId: 'concentration',
    name: 'Permille',
    abbreviations: ['‰'],
    aliases: ['per mille', 'per thousand'],
    toBase: 1000,
  },
  {
    id: 'ppm',
    categoryId: 'concentration',
    name: 'Parts per million',
    abbreviations: ['ppm'],
    aliases: ['parts per million'],
    toBase: 1,
  },
  {
    id: 'ppb',
    categoryId: 'concentration',
    name: 'Parts per billion',
    abbreviations: ['ppb'],
    aliases: ['parts per billion'],
    toBase: 0.001,
  },
  {
    id: 'ppt',
    categoryId: 'concentration',
    name: 'Parts per trillion',
    abbreviations: ['ppt'],
    aliases: ['parts per trillion'],
    toBase: 0.000001,
  },
  {
    id: 'milligram-per-liter',
    categoryId: 'concentration',
    name: 'Milligram per liter',
    abbreviations: ['mg/L'],
    aliases: ['milligrams per liter', 'mg per liter'],
    toBase: 1,
  },
  {
    id: 'microgram-per-liter',
    categoryId: 'concentration',
    name: 'Microgram per liter',
    abbreviations: ['μg/L', 'ug/L'],
    aliases: ['micrograms per liter'],
    toBase: 0.001,
  },
  {
    id: 'gram-per-liter-concentration',
    categoryId: 'concentration',
    name: 'Gram per liter',
    abbreviations: ['g/L'],
    aliases: ['grams per liter'],
    toBase: 1000,
  },
  {
    id: 'gram-per-deciliter',
    categoryId: 'concentration',
    name: 'Gram per deciliter',
    abbreviations: ['g/dL', 'g/100mL'],
    aliases: ['grams per deciliter', 'grams per 100mL'],
    toBase: 10000,
  },
];

// ============================================================================
// DYNAMIC VISCOSITY
// ============================================================================

export const dynamicViscosityCategory: Category = {
  id: 'dynamic-viscosity',
  name: 'Dynamic Viscosity',
  conversionType: 'linear',
};

// Base unit: Pascal-second
export const dynamicViscosityUnits: Unit[] = [
  {
    id: 'pascal-second',
    categoryId: 'dynamic-viscosity',
    name: 'Pascal-second',
    abbreviations: ['Pa⋅s', 'Pa·s', 'Pa-s'],
    aliases: ['pascal seconds'],
    toBase: 1,
  },
  {
    id: 'millipascal-second',
    categoryId: 'dynamic-viscosity',
    name: 'Millipascal-second',
    abbreviations: ['mPa⋅s', 'mPa·s'],
    aliases: ['millipascal seconds'],
    toBase: 0.001,
  },
  {
    id: 'poise',
    categoryId: 'dynamic-viscosity',
    name: 'Poise',
    abbreviations: ['P'],
    aliases: ['poises'],
    toBase: 0.1,
  },
  {
    id: 'centipoise',
    categoryId: 'dynamic-viscosity',
    name: 'Centipoise',
    abbreviations: ['cP'],
    aliases: ['centipoises'],
    toBase: 0.001,
  },
  {
    id: 'pound-per-foot-second',
    categoryId: 'dynamic-viscosity',
    name: 'Pound per foot-second',
    abbreviations: ['lb/(ft⋅s)', 'lb/(ft·s)'],
    aliases: ['pounds per foot second'],
    toBase: 1.48816,
  },
  {
    id: 'pound-per-foot-hour',
    categoryId: 'dynamic-viscosity',
    name: 'Pound per foot-hour',
    abbreviations: ['lb/(ft⋅h)', 'lb/(ft·h)'],
    aliases: ['pounds per foot hour'],
    toBase: 0.000413378,
  },
  {
    id: 'slug-per-foot-second',
    categoryId: 'dynamic-viscosity',
    name: 'Slug per foot-second',
    abbreviations: ['slug/(ft⋅s)', 'slug/(ft·s)'],
    aliases: ['slugs per foot second'],
    toBase: 47.8803,
  },
];

// ============================================================================
// KINEMATIC VISCOSITY
// ============================================================================

export const kinematicViscosityCategory: Category = {
  id: 'kinematic-viscosity',
  name: 'Kinematic Viscosity',
  conversionType: 'linear',
};

// Base unit: square meter per second
export const kinematicViscosityUnits: Unit[] = [
  {
    id: 'square-meter-per-second',
    categoryId: 'kinematic-viscosity',
    name: 'Square meter per second',
    abbreviations: ['m²/s', 'm2/s'],
    aliases: ['square meters per second'],
    toBase: 1,
  },
  {
    id: 'square-centimeter-per-second',
    categoryId: 'kinematic-viscosity',
    name: 'Square centimeter per second',
    abbreviations: ['cm²/s', 'cm2/s'],
    aliases: ['square centimeters per second'],
    toBase: 0.0001,
  },
  {
    id: 'stokes',
    categoryId: 'kinematic-viscosity',
    name: 'Stokes',
    abbreviations: ['St'],
    aliases: ['stoke'],
    toBase: 0.0001,
  },
  {
    id: 'centistokes',
    categoryId: 'kinematic-viscosity',
    name: 'Centistokes',
    abbreviations: ['cSt'],
    aliases: ['centistoke'],
    toBase: 0.000001,
  },
  {
    id: 'square-foot-per-second',
    categoryId: 'kinematic-viscosity',
    name: 'Square foot per second',
    abbreviations: ['ft²/s', 'ft2/s'],
    aliases: ['square feet per second'],
    toBase: 0.092903,
  },
  {
    id: 'square-inch-per-second',
    categoryId: 'kinematic-viscosity',
    name: 'Square inch per second',
    abbreviations: ['in²/s', 'in2/s'],
    aliases: ['square inches per second'],
    toBase: 0.00064516,
  },
];

// ============================================================================
// MASS FLOW RATE
// ============================================================================

export const massFlowRateCategory: Category = {
  id: 'mass-flow-rate',
  name: 'Mass Flow Rate',
  conversionType: 'linear',
};

// Base unit: kilogram per second
export const massFlowRateUnits: Unit[] = [
  {
    id: 'kilogram-per-second',
    categoryId: 'mass-flow-rate',
    name: 'Kilogram per second',
    abbreviations: ['kg/s'],
    aliases: ['kilograms per second'],
    toBase: 1,
  },
  {
    id: 'kilogram-per-minute',
    categoryId: 'mass-flow-rate',
    name: 'Kilogram per minute',
    abbreviations: ['kg/min'],
    aliases: ['kilograms per minute'],
    toBase: 0.0166667,
  },
  {
    id: 'kilogram-per-hour',
    categoryId: 'mass-flow-rate',
    name: 'Kilogram per hour',
    abbreviations: ['kg/h'],
    aliases: ['kilograms per hour'],
    toBase: 0.000277778,
  },
  {
    id: 'gram-per-second',
    categoryId: 'mass-flow-rate',
    name: 'Gram per second',
    abbreviations: ['g/s'],
    aliases: ['grams per second'],
    toBase: 0.001,
  },
  {
    id: 'gram-per-minute',
    categoryId: 'mass-flow-rate',
    name: 'Gram per minute',
    abbreviations: ['g/min'],
    aliases: ['grams per minute'],
    toBase: 0.0000166667,
  },
  {
    id: 'pound-per-second',
    categoryId: 'mass-flow-rate',
    name: 'Pound per second',
    abbreviations: ['lb/s'],
    aliases: ['pounds per second'],
    toBase: 0.453592,
  },
  {
    id: 'pound-per-minute',
    categoryId: 'mass-flow-rate',
    name: 'Pound per minute',
    abbreviations: ['lb/min'],
    aliases: ['pounds per minute'],
    toBase: 0.00755987,
  },
  {
    id: 'pound-per-hour',
    categoryId: 'mass-flow-rate',
    name: 'Pound per hour',
    abbreviations: ['lb/h'],
    aliases: ['pounds per hour'],
    toBase: 0.000125998,
  },
  {
    id: 'metric-ton-per-hour',
    categoryId: 'mass-flow-rate',
    name: 'Ton per hour (metric)',
    abbreviations: ['t/h'],
    aliases: ['metric tons per hour', 'tonnes per hour'],
    toBase: 0.277778,
  },
  {
    id: 'short-ton-per-hour',
    categoryId: 'mass-flow-rate',
    name: 'Ton per hour (short)',
    abbreviations: ['ton/h'],
    aliases: ['short tons per hour'],
    toBase: 0.251996,
  },
];

// ============================================================================
// RADIOACTIVITY
// ============================================================================

export const radioactivityCategory: Category = {
  id: 'radioactivity',
  name: 'Radioactivity',
  conversionType: 'linear',
};

// Base unit: Becquerel
export const radioactivityUnits: Unit[] = [
  {
    id: 'becquerel',
    categoryId: 'radioactivity',
    name: 'Becquerel',
    abbreviations: ['Bq'],
    aliases: ['becquerels'],
    toBase: 1,
  },
  {
    id: 'kilobecquerel',
    categoryId: 'radioactivity',
    name: 'Kilobecquerel',
    abbreviations: ['kBq'],
    aliases: ['kilobecquerels'],
    toBase: 1000,
  },
  {
    id: 'megabecquerel',
    categoryId: 'radioactivity',
    name: 'Megabecquerel',
    abbreviations: ['MBq'],
    aliases: ['megabecquerels'],
    toBase: 1000000,
  },
  {
    id: 'gigabecquerel',
    categoryId: 'radioactivity',
    name: 'Gigabecquerel',
    abbreviations: ['GBq'],
    aliases: ['gigabecquerels'],
    toBase: 1000000000,
  },
  {
    id: 'curie',
    categoryId: 'radioactivity',
    name: 'Curie',
    abbreviations: ['Ci'],
    aliases: ['curies'],
    toBase: 3.7e10,
  },
  {
    id: 'millicurie',
    categoryId: 'radioactivity',
    name: 'Millicurie',
    abbreviations: ['mCi'],
    aliases: ['millicuries'],
    toBase: 3.7e7,
  },
  {
    id: 'microcurie',
    categoryId: 'radioactivity',
    name: 'Microcurie',
    abbreviations: ['μCi', 'uCi'],
    aliases: ['microcuries'],
    toBase: 37000,
  },
  {
    id: 'rutherford',
    categoryId: 'radioactivity',
    name: 'Rutherford',
    abbreviations: ['Rd'],
    aliases: ['rutherfords'],
    toBase: 1000000,
  },
  {
    id: 'disintegrations-per-second',
    categoryId: 'radioactivity',
    name: 'Disintegrations per second',
    abbreviations: ['dps'],
    aliases: ['disintegrations/second'],
    toBase: 1,
  },
  {
    id: 'disintegrations-per-minute',
    categoryId: 'radioactivity',
    name: 'Disintegrations per minute',
    abbreviations: ['dpm'],
    aliases: ['disintegrations/minute'],
    toBase: 0.0166667,
  },
];

// ============================================================================
// RADIATION ABSORBED DOSE
// ============================================================================

export const radiationAbsorbedDoseCategory: Category = {
  id: 'radiation-absorbed-dose',
  name: 'Radiation Absorbed Dose',
  conversionType: 'linear',
};

// Base unit: Gray
export const radiationAbsorbedDoseUnits: Unit[] = [
  {
    id: 'gray',
    categoryId: 'radiation-absorbed-dose',
    name: 'Gray',
    abbreviations: ['Gy'],
    aliases: ['grays'],
    toBase: 1,
  },
  {
    id: 'milligray',
    categoryId: 'radiation-absorbed-dose',
    name: 'Milligray',
    abbreviations: ['mGy'],
    aliases: ['milligrays'],
    toBase: 0.001,
  },
  {
    id: 'microgray',
    categoryId: 'radiation-absorbed-dose',
    name: 'Microgray',
    abbreviations: ['μGy', 'uGy'],
    aliases: ['micrograys'],
    toBase: 0.000001,
  },
  {
    id: 'rad',
    categoryId: 'radiation-absorbed-dose',
    name: 'Rad',
    abbreviations: ['rad'],
    aliases: ['rads'],
    toBase: 0.01,
  },
  {
    id: 'millirad',
    categoryId: 'radiation-absorbed-dose',
    name: 'Millirad',
    abbreviations: ['mrad'],
    aliases: ['millirads'],
    toBase: 0.00001,
  },
  {
    id: 'erg-per-gram',
    categoryId: 'radiation-absorbed-dose',
    name: 'Erg per gram',
    abbreviations: ['erg/g'],
    aliases: ['ergs per gram'],
    toBase: 0.0001,
  },
];

// ============================================================================
// RADIATION EQUIVALENT DOSE
// ============================================================================

export const radiationEquivalentDoseCategory: Category = {
  id: 'radiation-equivalent-dose',
  name: 'Radiation Equivalent Dose',
  conversionType: 'linear',
};

// Base unit: Sievert
export const radiationEquivalentDoseUnits: Unit[] = [
  {
    id: 'sievert',
    categoryId: 'radiation-equivalent-dose',
    name: 'Sievert',
    abbreviations: ['Sv'],
    aliases: ['sieverts'],
    toBase: 1,
  },
  {
    id: 'millisievert',
    categoryId: 'radiation-equivalent-dose',
    name: 'Millisievert',
    abbreviations: ['mSv'],
    aliases: ['millisieverts'],
    toBase: 0.001,
  },
  {
    id: 'microsievert',
    categoryId: 'radiation-equivalent-dose',
    name: 'Microsievert',
    abbreviations: ['μSv', 'uSv'],
    aliases: ['microsieverts'],
    toBase: 0.000001,
  },
  {
    id: 'rem',
    categoryId: 'radiation-equivalent-dose',
    name: 'Rem',
    abbreviations: ['rem'],
    aliases: ['rems'],
    toBase: 0.01,
  },
  {
    id: 'millirem',
    categoryId: 'radiation-equivalent-dose',
    name: 'Millirem',
    abbreviations: ['mrem'],
    aliases: ['millirems'],
    toBase: 0.00001,
  },
  {
    id: 'roentgen',
    categoryId: 'radiation-equivalent-dose',
    name: 'Roentgen',
    abbreviations: ['R'],
    aliases: ['roentgens'],
    toBase: 0.00877,
  },
  {
    id: 'milliroentgen',
    categoryId: 'radiation-equivalent-dose',
    name: 'Milliroentgen',
    abbreviations: ['mR'],
    aliases: ['milliroentgens'],
    toBase: 0.00000877,
  },
];

// ============================================================================
// LUMINOUS INTENSITY
// ============================================================================

export const luminousIntensityCategory: Category = {
  id: 'luminous-intensity',
  name: 'Luminous Intensity',
  conversionType: 'linear',
};

// Base unit: Candela
export const luminousIntensityUnits: Unit[] = [
  {
    id: 'candela',
    categoryId: 'luminous-intensity',
    name: 'Candela',
    abbreviations: ['cd'],
    aliases: ['candelas'],
    toBase: 1,
  },
  {
    id: 'millicandela',
    categoryId: 'luminous-intensity',
    name: 'Millicandela',
    abbreviations: ['mcd'],
    aliases: ['millicandelas'],
    toBase: 0.001,
  },
  {
    id: 'kilocandela',
    categoryId: 'luminous-intensity',
    name: 'Kilocandela',
    abbreviations: ['kcd'],
    aliases: ['kilocandelas'],
    toBase: 1000,
  },
  {
    id: 'candlepower',
    categoryId: 'luminous-intensity',
    name: 'Candlepower',
    abbreviations: ['cp'],
    aliases: ['candlepowers'],
    toBase: 1,
  },
  {
    id: 'hefnerkerze',
    categoryId: 'luminous-intensity',
    name: 'Hefnerkerze',
    abbreviations: ['HK'],
    aliases: ['hefner candle', 'hefner'],
    toBase: 0.903,
  },
  {
    id: 'carcel',
    categoryId: 'luminous-intensity',
    name: 'Carcel',
    abbreviations: ['carcel'],
    aliases: ['carcels'],
    toBase: 9.74,
  },
];

// ============================================================================
// LUMINOUS FLUX
// ============================================================================

export const luminousFluxCategory: Category = {
  id: 'luminous-flux',
  name: 'Luminous Flux',
  conversionType: 'linear',
};

// Base unit: Lumen
export const luminousFluxUnits: Unit[] = [
  {
    id: 'lumen',
    categoryId: 'luminous-flux',
    name: 'Lumen',
    abbreviations: ['lm'],
    aliases: ['lumens'],
    toBase: 1,
  },
  {
    id: 'millilumen',
    categoryId: 'luminous-flux',
    name: 'Millilumen',
    abbreviations: ['mlm'],
    aliases: ['millilumens'],
    toBase: 0.001,
  },
  {
    id: 'kilolumen',
    categoryId: 'luminous-flux',
    name: 'Kilolumen',
    abbreviations: ['klm'],
    aliases: ['kilolumens'],
    toBase: 1000,
  },
];

// ============================================================================
// ILLUMINANCE
// ============================================================================

export const illuminanceCategory: Category = {
  id: 'illuminance',
  name: 'Illuminance',
  conversionType: 'linear',
};

// Base unit: Lux
export const illuminanceUnits: Unit[] = [
  {
    id: 'lux',
    categoryId: 'illuminance',
    name: 'Lux',
    abbreviations: ['lx'],
    aliases: ['luxes'],
    toBase: 1,
  },
  {
    id: 'millilux',
    categoryId: 'illuminance',
    name: 'Millilux',
    abbreviations: ['mlx'],
    aliases: ['milliluxes'],
    toBase: 0.001,
  },
  {
    id: 'kilolux',
    categoryId: 'illuminance',
    name: 'Kilolux',
    abbreviations: ['klx'],
    aliases: ['kiloluxes'],
    toBase: 1000,
  },
  {
    id: 'foot-candle',
    categoryId: 'illuminance',
    name: 'Foot-candle',
    abbreviations: ['fc', 'ft-c'],
    aliases: ['foot candles', 'footcandles'],
    toBase: 10.7639,
  },
  {
    id: 'phot',
    categoryId: 'illuminance',
    name: 'Phot',
    abbreviations: ['ph'],
    aliases: ['phots'],
    toBase: 10000,
  },
  {
    id: 'nox',
    categoryId: 'illuminance',
    name: 'Nox',
    abbreviations: ['nox'],
    aliases: ['noxes'],
    toBase: 0.001,
  },
];

// ============================================================================
// LUMINANCE
// ============================================================================

export const luminanceCategory: Category = {
  id: 'luminance',
  name: 'Luminance',
  conversionType: 'linear',
};

// Base unit: Candela per square meter
export const luminanceUnits: Unit[] = [
  {
    id: 'candela-per-square-meter',
    categoryId: 'luminance',
    name: 'Candela per square meter',
    abbreviations: ['cd/m²', 'cd/m2'],
    aliases: ['candelas per square meter'],
    toBase: 1,
  },
  {
    id: 'nit',
    categoryId: 'luminance',
    name: 'Nit',
    abbreviations: ['nit'],
    aliases: ['nits'],
    toBase: 1,
  },
  {
    id: 'stilb',
    categoryId: 'luminance',
    name: 'Stilb',
    abbreviations: ['sb'],
    aliases: ['stilbs'],
    toBase: 10000,
  },
  {
    id: 'lambert',
    categoryId: 'luminance',
    name: 'Lambert',
    abbreviations: ['L'],
    aliases: ['lamberts'],
    toBase: 3183.1,
  },
  {
    id: 'millilambert',
    categoryId: 'luminance',
    name: 'Millilambert',
    abbreviations: ['mL'],
    aliases: ['millilamberts'],
    toBase: 3.1831,
  },
  {
    id: 'foot-lambert',
    categoryId: 'luminance',
    name: 'Foot-lambert',
    abbreviations: ['fL', 'ft-L'],
    aliases: ['foot lamberts', 'footlamberts'],
    toBase: 3.42626,
  },
  {
    id: 'apostilb',
    categoryId: 'luminance',
    name: 'Apostilb',
    abbreviations: ['asb'],
    aliases: ['apostilbs'],
    toBase: 0.318310,
  },
];

// Export all
export const scientificCategories = [
  forceCategory,
  torqueCategory,
  densityCategory,
  flowRateCategory,
  concentrationCategory,
  dynamicViscosityCategory,
  kinematicViscosityCategory,
  massFlowRateCategory,
  radioactivityCategory,
  radiationAbsorbedDoseCategory,
  radiationEquivalentDoseCategory,
  luminousIntensityCategory,
  luminousFluxCategory,
  illuminanceCategory,
  luminanceCategory,
];
export const scientificUnits = [
  ...forceUnits,
  ...torqueUnits,
  ...densityUnits,
  ...flowRateUnits,
  ...concentrationUnits,
  ...dynamicViscosityUnits,
  ...kinematicViscosityUnits,
  ...massFlowRateUnits,
  ...radioactivityUnits,
  ...radiationAbsorbedDoseUnits,
  ...radiationEquivalentDoseUnits,
  ...luminousIntensityUnits,
  ...luminousFluxUnits,
  ...illuminanceUnits,
  ...luminanceUnits,
];

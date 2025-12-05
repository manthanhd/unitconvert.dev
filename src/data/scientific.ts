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
];

// Export all
export const scientificCategories = [
  forceCategory,
  torqueCategory,
  densityCategory,
  flowRateCategory,
  concentrationCategory,
];
export const scientificUnits = [
  ...forceUnits,
  ...torqueUnits,
  ...densityUnits,
  ...flowRateUnits,
  ...concentrationUnits,
];

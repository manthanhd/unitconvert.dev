import type { Category, Unit } from './types';

// ============================================================================
// ELECTRIC CURRENT
// ============================================================================

export const currentCategory: Category = {
  id: 'current',
  name: 'Electric Current',
  conversionType: 'linear',
};

// Base unit: Ampere
export const currentUnits: Unit[] = [
  {
    id: 'ampere',
    categoryId: 'current',
    name: 'Ampere',
    abbreviations: ['A', 'amp'],
    aliases: ['amperes', 'amps'],
    toBase: 1,
  },
  {
    id: 'milliampere',
    categoryId: 'current',
    name: 'Milliampere',
    abbreviations: ['mA'],
    aliases: ['milliamperes', 'milliamps'],
    toBase: 0.001,
  },
  {
    id: 'microampere',
    categoryId: 'current',
    name: 'Microampere',
    abbreviations: ['μA', 'uA'],
    aliases: ['microamperes', 'microamps'],
    toBase: 0.000001,
  },
  {
    id: 'nanoampere',
    categoryId: 'current',
    name: 'Nanoampere',
    abbreviations: ['nA'],
    aliases: ['nanoamperes', 'nanoamps'],
    toBase: 0.000000001,
  },
  {
    id: 'kiloampere',
    categoryId: 'current',
    name: 'Kiloampere',
    abbreviations: ['kA'],
    aliases: ['kiloamperes', 'kiloamps'],
    toBase: 1000,
  },
];

// ============================================================================
// ELECTRIC VOLTAGE
// ============================================================================

export const voltageCategory: Category = {
  id: 'voltage',
  name: 'Electric Voltage',
  conversionType: 'linear',
};

// Base unit: Volt
export const voltageUnits: Unit[] = [
  {
    id: 'volt',
    categoryId: 'voltage',
    name: 'Volt',
    abbreviations: ['V'],
    aliases: ['volts'],
    toBase: 1,
  },
  {
    id: 'millivolt',
    categoryId: 'voltage',
    name: 'Millivolt',
    abbreviations: ['mV'],
    aliases: ['millivolts'],
    toBase: 0.001,
  },
  {
    id: 'microvolt',
    categoryId: 'voltage',
    name: 'Microvolt',
    abbreviations: ['μV', 'uV'],
    aliases: ['microvolts'],
    toBase: 0.000001,
  },
  {
    id: 'kilovolt',
    categoryId: 'voltage',
    name: 'Kilovolt',
    abbreviations: ['kV'],
    aliases: ['kilovolts'],
    toBase: 1000,
  },
  {
    id: 'megavolt',
    categoryId: 'voltage',
    name: 'Megavolt',
    abbreviations: ['MV'],
    aliases: ['megavolts'],
    toBase: 1000000,
  },
];

// ============================================================================
// ELECTRIC RESISTANCE
// ============================================================================

export const resistanceCategory: Category = {
  id: 'resistance',
  name: 'Electric Resistance',
  conversionType: 'linear',
};

// Base unit: Ohm
export const resistanceUnits: Unit[] = [
  {
    id: 'ohm',
    categoryId: 'resistance',
    name: 'Ohm',
    abbreviations: ['Ω', 'ohm'],
    aliases: ['ohms'],
    toBase: 1,
  },
  {
    id: 'milliohm',
    categoryId: 'resistance',
    name: 'Milliohm',
    abbreviations: ['mΩ'],
    aliases: ['milliohms'],
    toBase: 0.001,
  },
  {
    id: 'kilohm',
    categoryId: 'resistance',
    name: 'Kilohm',
    abbreviations: ['kΩ'],
    aliases: ['kilohms', 'k ohm'],
    toBase: 1000,
  },
  {
    id: 'megohm',
    categoryId: 'resistance',
    name: 'Megohm',
    abbreviations: ['MΩ'],
    aliases: ['megohms', 'megaohms'],
    toBase: 1000000,
  },
  {
    id: 'gigohm',
    categoryId: 'resistance',
    name: 'Gigohm',
    abbreviations: ['GΩ'],
    aliases: ['gigohms', 'gigaohms'],
    toBase: 1000000000,
  },
];

// ============================================================================
// ELECTRIC CAPACITANCE
// ============================================================================

export const capacitanceCategory: Category = {
  id: 'capacitance',
  name: 'Electric Capacitance',
  conversionType: 'linear',
};

// Base unit: Farad
export const capacitanceUnits: Unit[] = [
  {
    id: 'farad',
    categoryId: 'capacitance',
    name: 'Farad',
    abbreviations: ['F'],
    aliases: ['farads'],
    toBase: 1,
  },
  {
    id: 'millifarad',
    categoryId: 'capacitance',
    name: 'Millifarad',
    abbreviations: ['mF'],
    aliases: ['millifarads'],
    toBase: 0.001,
  },
  {
    id: 'microfarad',
    categoryId: 'capacitance',
    name: 'Microfarad',
    abbreviations: ['μF', 'uF'],
    aliases: ['microfarads'],
    toBase: 0.000001,
  },
  {
    id: 'nanofarad',
    categoryId: 'capacitance',
    name: 'Nanofarad',
    abbreviations: ['nF'],
    aliases: ['nanofarads'],
    toBase: 0.000000001,
  },
  {
    id: 'picofarad',
    categoryId: 'capacitance',
    name: 'Picofarad',
    abbreviations: ['pF'],
    aliases: ['picofarads'],
    toBase: 0.000000000001,
  },
];

// ============================================================================
// ELECTRIC CHARGE
// ============================================================================

export const chargeCategory: Category = {
  id: 'charge',
  name: 'Electric Charge',
  conversionType: 'linear',
};

// Base unit: Coulomb
export const chargeUnits: Unit[] = [
  {
    id: 'coulomb',
    categoryId: 'charge',
    name: 'Coulomb',
    abbreviations: ['C'],
    aliases: ['coulombs'],
    toBase: 1,
  },
  {
    id: 'millicoulomb',
    categoryId: 'charge',
    name: 'Millicoulomb',
    abbreviations: ['mC'],
    aliases: ['millicoulombs'],
    toBase: 0.001,
  },
  {
    id: 'microcoulomb',
    categoryId: 'charge',
    name: 'Microcoulomb',
    abbreviations: ['μC', 'uC'],
    aliases: ['microcoulombs'],
    toBase: 0.000001,
  },
  {
    id: 'nanocoulomb',
    categoryId: 'charge',
    name: 'Nanocoulomb',
    abbreviations: ['nC'],
    aliases: ['nanocoulombs'],
    toBase: 0.000000001,
  },
  {
    id: 'ampere-hour',
    categoryId: 'charge',
    name: 'Ampere-hour',
    abbreviations: ['Ah'],
    aliases: ['ampere hours', 'amp hours'],
    toBase: 3600,
  },
  {
    id: 'milliampere-hour',
    categoryId: 'charge',
    name: 'Milliampere-hour',
    abbreviations: ['mAh'],
    aliases: ['milliampere hours', 'milliamp hours'],
    toBase: 3.6,
  },
];

// Export all
export const electricalCategories = [
  currentCategory,
  voltageCategory,
  resistanceCategory,
  capacitanceCategory,
  chargeCategory,
];
export const electricalUnits = [
  ...currentUnits,
  ...voltageUnits,
  ...resistanceUnits,
  ...capacitanceUnits,
  ...chargeUnits,
];

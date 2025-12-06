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
  {
    id: 'abampere',
    categoryId: 'current',
    name: 'Abampere',
    abbreviations: ['abA'],
    aliases: ['abamperes', 'biot'],
    toBase: 10,
  },
  {
    id: 'statampere',
    categoryId: 'current',
    name: 'Statampere',
    abbreviations: ['statA'],
    aliases: ['statamperes'],
    toBase: 3.33564e-10,
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
  {
    id: 'nanovolt',
    categoryId: 'voltage',
    name: 'Nanovolt',
    abbreviations: ['nV'],
    aliases: ['nanovolts'],
    toBase: 0.000000001,
  },
  {
    id: 'abvolt',
    categoryId: 'voltage',
    name: 'Abvolt',
    abbreviations: ['abV'],
    aliases: ['abvolts'],
    toBase: 1e-8,
  },
  {
    id: 'statvolt',
    categoryId: 'voltage',
    name: 'Statvolt',
    abbreviations: ['statV'],
    aliases: ['statvolts'],
    toBase: 299.792,
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
  {
    id: 'microohm',
    categoryId: 'resistance',
    name: 'Microohm',
    abbreviations: ['μΩ', 'uΩ'],
    aliases: ['microohms'],
    toBase: 0.000001,
  },
  {
    id: 'abohm',
    categoryId: 'resistance',
    name: 'Abohm',
    abbreviations: ['abΩ'],
    aliases: ['abohms'],
    toBase: 1e-9,
  },
  {
    id: 'statohm',
    categoryId: 'resistance',
    name: 'Statohm',
    abbreviations: ['statΩ'],
    aliases: ['statohms'],
    toBase: 8.98755e11,
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
  {
    id: 'abfarad',
    categoryId: 'capacitance',
    name: 'Abfarad',
    abbreviations: ['abF'],
    aliases: ['abfarads'],
    toBase: 1e9,
  },
  {
    id: 'statfarad',
    categoryId: 'capacitance',
    name: 'Statfarad',
    abbreviations: ['statF'],
    aliases: ['statfarads'],
    toBase: 1.11265e-12,
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
  {
    id: 'picocoulomb',
    categoryId: 'charge',
    name: 'Picocoulomb',
    abbreviations: ['pC'],
    aliases: ['picocoulombs'],
    toBase: 1e-12,
  },
  {
    id: 'abcoulomb',
    categoryId: 'charge',
    name: 'Abcoulomb',
    abbreviations: ['abC'],
    aliases: ['abcoulombs'],
    toBase: 10,
  },
  {
    id: 'statcoulomb',
    categoryId: 'charge',
    name: 'Statcoulomb',
    abbreviations: ['statC'],
    aliases: ['statcoulombs'],
    toBase: 3.33564e-10,
  },
  {
    id: 'elementary-charge',
    categoryId: 'charge',
    name: 'Elementary charge',
    abbreviations: ['e'],
    aliases: ['electron charge'],
    toBase: 1.602176634e-19,
  },
  {
    id: 'faraday-charge',
    categoryId: 'charge',
    name: 'Faraday',
    abbreviations: ['F(charge)'],
    aliases: ['faradays', 'faraday constant'],
    toBase: 96485.33212,
  },
];

// ============================================================================
// ELECTRIC CONDUCTANCE
// ============================================================================

export const conductanceCategory: Category = {
  id: 'conductance',
  name: 'Electric Conductance',
  conversionType: 'linear',
};

// Base unit: Siemens
export const conductanceUnits: Unit[] = [
  {
    id: 'siemens',
    categoryId: 'conductance',
    name: 'Siemens',
    abbreviations: ['S'],
    aliases: ['siemenses'],
    toBase: 1,
  },
  {
    id: 'millisiemens',
    categoryId: 'conductance',
    name: 'Millisiemens',
    abbreviations: ['mS'],
    aliases: ['millisiemenses'],
    toBase: 0.001,
  },
  {
    id: 'microsiemens',
    categoryId: 'conductance',
    name: 'Microsiemens',
    abbreviations: ['μS', 'uS'],
    aliases: ['microsiemenses'],
    toBase: 0.000001,
  },
  {
    id: 'mho',
    categoryId: 'conductance',
    name: 'Mho',
    abbreviations: ['mho', '℧'],
    aliases: ['mhos'],
    toBase: 1,
  },
];

// ============================================================================
// ELECTRIC INDUCTANCE
// ============================================================================

export const inductanceCategory: Category = {
  id: 'inductance',
  name: 'Electric Inductance',
  conversionType: 'linear',
};

// Base unit: Henry
export const inductanceUnits: Unit[] = [
  {
    id: 'henry',
    categoryId: 'inductance',
    name: 'Henry',
    abbreviations: ['H'],
    aliases: ['henries', 'henrys'],
    toBase: 1,
  },
  {
    id: 'millihenry',
    categoryId: 'inductance',
    name: 'Millihenry',
    abbreviations: ['mH'],
    aliases: ['millihenries'],
    toBase: 0.001,
  },
  {
    id: 'microhenry',
    categoryId: 'inductance',
    name: 'Microhenry',
    abbreviations: ['μH', 'uH'],
    aliases: ['microhenries'],
    toBase: 0.000001,
  },
  {
    id: 'nanohenry',
    categoryId: 'inductance',
    name: 'Nanohenry',
    abbreviations: ['nH'],
    aliases: ['nanohenries'],
    toBase: 0.000000001,
  },
  {
    id: 'abhenry',
    categoryId: 'inductance',
    name: 'Abhenry',
    abbreviations: ['abH'],
    aliases: ['abhenries'],
    toBase: 1e-9,
  },
  {
    id: 'stathenry',
    categoryId: 'inductance',
    name: 'Stathenry',
    abbreviations: ['statH'],
    aliases: ['stathenries'],
    toBase: 8.98755e11,
  },
];

// ============================================================================
// MAGNETIC FIELD (FLUX DENSITY)
// ============================================================================

export const magneticFieldCategory: Category = {
  id: 'magnetic-field',
  name: 'Magnetic Field',
  conversionType: 'linear',
};

// Base unit: Tesla
export const magneticFieldUnits: Unit[] = [
  {
    id: 'tesla',
    categoryId: 'magnetic-field',
    name: 'Tesla',
    abbreviations: ['T'],
    aliases: ['teslas'],
    toBase: 1,
  },
  {
    id: 'millitesla',
    categoryId: 'magnetic-field',
    name: 'Millitesla',
    abbreviations: ['mT'],
    aliases: ['milliteslas'],
    toBase: 0.001,
  },
  {
    id: 'microtesla',
    categoryId: 'magnetic-field',
    name: 'Microtesla',
    abbreviations: ['μT', 'uT'],
    aliases: ['microteslas'],
    toBase: 0.000001,
  },
  {
    id: 'nanotesla',
    categoryId: 'magnetic-field',
    name: 'Nanotesla',
    abbreviations: ['nT'],
    aliases: ['nanoteslas'],
    toBase: 0.000000001,
  },
  {
    id: 'gauss',
    categoryId: 'magnetic-field',
    name: 'Gauss',
    abbreviations: ['G'],
    aliases: ['gausses'],
    toBase: 0.0001,
  },
  {
    id: 'milligauss',
    categoryId: 'magnetic-field',
    name: 'Milligauss',
    abbreviations: ['mG'],
    aliases: ['milligausses'],
    toBase: 0.0000001,
  },
  {
    id: 'weber-per-square-meter',
    categoryId: 'magnetic-field',
    name: 'Weber per square meter',
    abbreviations: ['Wb/m²', 'Wb/m2'],
    aliases: ['webers per square meter'],
    toBase: 1,
  },
  {
    id: 'gamma-magnetic',
    categoryId: 'magnetic-field',
    name: 'Gamma',
    abbreviations: ['γ'],
    aliases: ['gammas'],
    toBase: 0.000000001,
  },
];

// ============================================================================
// MAGNETIC FLUX
// ============================================================================

export const magneticFluxCategory: Category = {
  id: 'magnetic-flux',
  name: 'Magnetic Flux',
  conversionType: 'linear',
};

// Base unit: Weber
export const magneticFluxUnits: Unit[] = [
  {
    id: 'weber',
    categoryId: 'magnetic-flux',
    name: 'Weber',
    abbreviations: ['Wb'],
    aliases: ['webers'],
    toBase: 1,
  },
  {
    id: 'milliweber',
    categoryId: 'magnetic-flux',
    name: 'Milliweber',
    abbreviations: ['mWb'],
    aliases: ['milliwebers'],
    toBase: 0.001,
  },
  {
    id: 'microweber',
    categoryId: 'magnetic-flux',
    name: 'Microweber',
    abbreviations: ['μWb', 'uWb'],
    aliases: ['microwebers'],
    toBase: 0.000001,
  },
  {
    id: 'maxwell',
    categoryId: 'magnetic-flux',
    name: 'Maxwell',
    abbreviations: ['Mx'],
    aliases: ['maxwells'],
    toBase: 1e-8,
  },
  {
    id: 'volt-second',
    categoryId: 'magnetic-flux',
    name: 'Volt-second',
    abbreviations: ['V⋅s', 'V·s'],
    aliases: ['volt seconds'],
    toBase: 1,
  },
];

// ============================================================================
// MAGNETOMOTIVE FORCE
// ============================================================================

export const magnetomotiveForceCategory: Category = {
  id: 'magnetomotive-force',
  name: 'Magnetomotive Force',
  conversionType: 'linear',
};

// Base unit: Ampere-turn
export const magnetomotiveForceUnits: Unit[] = [
  {
    id: 'ampere-turn',
    categoryId: 'magnetomotive-force',
    name: 'Ampere-turn',
    abbreviations: ['At'],
    aliases: ['ampere turns'],
    toBase: 1,
  },
  {
    id: 'gilbert',
    categoryId: 'magnetomotive-force',
    name: 'Gilbert',
    abbreviations: ['Gb'],
    aliases: ['gilberts'],
    toBase: 0.795775,
  },
  {
    id: 'kiloampere-turn',
    categoryId: 'magnetomotive-force',
    name: 'Kiloampere-turn',
    abbreviations: ['kAt'],
    aliases: ['kiloampere turns'],
    toBase: 1000,
  },
];

// Export all
export const electricalCategories = [
  currentCategory,
  voltageCategory,
  resistanceCategory,
  capacitanceCategory,
  chargeCategory,
  conductanceCategory,
  inductanceCategory,
  magneticFieldCategory,
  magneticFluxCategory,
  magnetomotiveForceCategory,
];
export const electricalUnits = [
  ...currentUnits,
  ...voltageUnits,
  ...resistanceUnits,
  ...capacitanceUnits,
  ...chargeUnits,
  ...conductanceUnits,
  ...inductanceUnits,
  ...magneticFieldUnits,
  ...magneticFluxUnits,
  ...magnetomotiveForceUnits,
];

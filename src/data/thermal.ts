import type { Category, Unit } from './types';

// ============================================================================
// TEMPERATURE
// ============================================================================

export const temperatureCategory: Category = {
  id: 'temperature',
  name: 'Temperature',
  conversionType: 'offset',
};

// Base unit: Kelvin
export const temperatureUnits: Unit[] = [
  {
    id: 'kelvin',
    categoryId: 'temperature',
    name: 'Kelvin',
    abbreviations: ['K'],
    aliases: ['kelvins'],
    toBaseFormula: (k) => k,
    fromBaseFormula: (k) => k,
  },
  {
    id: 'celsius',
    categoryId: 'temperature',
    name: 'Celsius',
    abbreviations: ['°C', 'C'],
    aliases: ['centigrade', 'degrees celsius'],
    toBaseFormula: (c) => c + 273.15,
    fromBaseFormula: (k) => k - 273.15,
  },
  {
    id: 'fahrenheit',
    categoryId: 'temperature',
    name: 'Fahrenheit',
    abbreviations: ['°F', 'F'],
    aliases: ['degrees fahrenheit'],
    toBaseFormula: (f) => (f - 32) * (5 / 9) + 273.15,
    fromBaseFormula: (k) => (k - 273.15) * (9 / 5) + 32,
  },
  {
    id: 'rankine',
    categoryId: 'temperature',
    name: 'Rankine',
    abbreviations: ['°R', 'R'],
    aliases: ['degrees rankine'],
    toBaseFormula: (r) => r * (5 / 9),
    fromBaseFormula: (k) => k * (9 / 5),
  },
  {
    id: 'reaumur',
    categoryId: 'temperature',
    name: 'Réaumur',
    abbreviations: ['°Ré', '°Re'],
    aliases: ['reaumur', 'degrees reaumur'],
    toBaseFormula: (re) => re * (5 / 4) + 273.15,
    fromBaseFormula: (k) => (k - 273.15) * (4 / 5),
  },
  {
    id: 'delisle',
    categoryId: 'temperature',
    name: 'Delisle',
    abbreviations: ['°De'],
    aliases: ['degrees delisle'],
    toBaseFormula: (de) => 373.15 - de * (2 / 3),
    fromBaseFormula: (k) => (373.15 - k) * (3 / 2),
  },
  {
    id: 'newton-temp',
    categoryId: 'temperature',
    name: 'Newton',
    abbreviations: ['°N'],
    aliases: ['degrees newton'],
    toBaseFormula: (n) => n * (100 / 33) + 273.15,
    fromBaseFormula: (k) => (k - 273.15) * (33 / 100),
  },
  {
    id: 'romer',
    categoryId: 'temperature',
    name: 'Rømer',
    abbreviations: ['°Rø'],
    aliases: ['romer', 'degrees romer'],
    toBaseFormula: (ro) => (ro - 7.5) * (40 / 21) + 273.15,
    fromBaseFormula: (k) => (k - 273.15) * (21 / 40) + 7.5,
  },
];

// ============================================================================
// PRESSURE
// ============================================================================

export const pressureCategory: Category = {
  id: 'pressure',
  name: 'Pressure',
  conversionType: 'linear',
};

// Base unit: Pascal
export const pressureUnits: Unit[] = [
  {
    id: 'pascal',
    categoryId: 'pressure',
    name: 'Pascal',
    abbreviations: ['Pa'],
    aliases: ['pascals'],
    toBase: 1,
  },
  {
    id: 'kilopascal',
    categoryId: 'pressure',
    name: 'Kilopascal',
    abbreviations: ['kPa'],
    aliases: ['kilopascals'],
    toBase: 1000,
  },
  {
    id: 'megapascal',
    categoryId: 'pressure',
    name: 'Megapascal',
    abbreviations: ['MPa'],
    aliases: ['megapascals'],
    toBase: 1000000,
  },
  {
    id: 'hectopascal',
    categoryId: 'pressure',
    name: 'Hectopascal',
    abbreviations: ['hPa'],
    aliases: ['hectopascals'],
    toBase: 100,
  },
  {
    id: 'bar',
    categoryId: 'pressure',
    name: 'Bar',
    abbreviations: ['bar'],
    aliases: ['bars'],
    toBase: 100000,
  },
  {
    id: 'millibar',
    categoryId: 'pressure',
    name: 'Millibar',
    abbreviations: ['mbar'],
    aliases: ['millibars'],
    toBase: 100,
  },
  {
    id: 'atmosphere',
    categoryId: 'pressure',
    name: 'Atmosphere',
    abbreviations: ['atm'],
    aliases: ['atmospheres', 'standard atmosphere'],
    toBase: 101325,
  },
  {
    id: 'torr',
    categoryId: 'pressure',
    name: 'Torr',
    abbreviations: ['Torr'],
    aliases: ['torrs'],
    toBase: 101325 / 760, // exact: 133.32236842105263
  },
  {
    id: 'mmhg',
    categoryId: 'pressure',
    name: 'mmHg',
    abbreviations: ['mmHg'],
    aliases: ['millimeters of mercury', 'mm of mercury'],
    toBase: 133.322387415, // conventional value at 0°C
  },
  {
    id: 'inhg',
    categoryId: 'pressure',
    name: 'inHg',
    abbreviations: ['inHg'],
    aliases: ['inches of mercury', 'in of mercury'],
    toBase: 3386.389, // conventional value at 0°C
  },
  {
    id: 'psi',
    categoryId: 'pressure',
    name: 'PSI',
    abbreviations: ['psi', 'lb/in²'],
    aliases: ['pounds per square inch'],
    toBase: 6894.757293168361, // exact: lbf/in² = 0.45359237 × 9.80665 / 0.0254²
  },
  {
    id: 'psf',
    categoryId: 'pressure',
    name: 'PSF',
    abbreviations: ['psf', 'lb/ft²'],
    aliases: ['pounds per square foot'],
    toBase: 47.88025898033584, // exact: lbf/ft²
  },
  {
    id: 'technical-atmosphere',
    categoryId: 'pressure',
    name: 'Technical Atmosphere',
    abbreviations: ['at'],
    aliases: ['technical atmospheres', 'kilogram-force per cm2', 'kgf/cm²'],
    toBase: 98066.5, // 1 kgf/cm² = 98066.5 Pa
  },
];

// ============================================================================
// ENERGY
// ============================================================================

export const energyCategory: Category = {
  id: 'energy',
  name: 'Energy',
  conversionType: 'linear',
};

// Base unit: Joule
export const energyUnits: Unit[] = [
  {
    id: 'joule',
    categoryId: 'energy',
    name: 'Joule',
    abbreviations: ['J'],
    aliases: ['joules'],
    toBase: 1,
  },
  {
    id: 'kilojoule',
    categoryId: 'energy',
    name: 'Kilojoule',
    abbreviations: ['kJ'],
    aliases: ['kilojoules'],
    toBase: 1000,
  },
  {
    id: 'megajoule',
    categoryId: 'energy',
    name: 'Megajoule',
    abbreviations: ['MJ'],
    aliases: ['megajoules'],
    toBase: 1000000,
  },
  {
    id: 'calorie',
    categoryId: 'energy',
    name: 'Calorie (small)',
    abbreviations: ['cal'],
    aliases: ['calories', 'small calorie'],
    toBase: 4.184,
  },
  {
    id: 'kilocalorie',
    categoryId: 'energy',
    name: 'Kilocalorie',
    abbreviations: ['kcal', 'Cal'],
    aliases: ['kilocalories', 'food calorie', 'large calorie'],
    toBase: 4184,
  },
  {
    id: 'watt-hour',
    categoryId: 'energy',
    name: 'Watt-hour',
    abbreviations: ['Wh'],
    aliases: ['watt hours'],
    toBase: 3600,
  },
  {
    id: 'kilowatt-hour',
    categoryId: 'energy',
    name: 'Kilowatt-hour',
    abbreviations: ['kWh'],
    aliases: ['kilowatt hours'],
    toBase: 3600000,
  },
  {
    id: 'electronvolt',
    categoryId: 'energy',
    name: 'Electronvolt',
    abbreviations: ['eV'],
    aliases: ['electronvolts', 'electron volt'],
    toBase: 1.602176634e-19, // exact by 2019 SI redefinition
  },
  {
    id: 'btu',
    categoryId: 'energy',
    name: 'BTU',
    abbreviations: ['BTU', 'Btu'],
    aliases: ['british thermal unit', 'british thermal units'],
    toBase: 1055.05585262, // ISO BTU
  },
  {
    id: 'foot-pound',
    categoryId: 'energy',
    name: 'Foot-pound',
    abbreviations: ['ft⋅lb', 'ft-lb'],
    aliases: ['foot pounds', 'foot-pounds'],
    toBase: 1.3558179483314004, // exact: ft × lbf
  },
  {
    id: 'erg',
    categoryId: 'energy',
    name: 'Erg',
    abbreviations: ['erg'],
    aliases: ['ergs'],
    toBase: 1e-7,
  },
  {
    id: 'therm',
    categoryId: 'energy',
    name: 'Therm',
    abbreviations: ['therm'],
    aliases: ['therms'],
    toBase: 1.055e8,
  },
  {
    id: 'gigajoule',
    categoryId: 'energy',
    name: 'Gigajoule',
    abbreviations: ['GJ'],
    aliases: ['gigajoules'],
    toBase: 1e9,
  },
  {
    id: 'megawatt-hour',
    categoryId: 'energy',
    name: 'Megawatt-hour',
    abbreviations: ['MWh'],
    aliases: ['megawatt hours'],
    toBase: 3.6e9,
  },
  {
    id: 'kiloelectronvolt',
    categoryId: 'energy',
    name: 'Kiloelectronvolt',
    abbreviations: ['keV'],
    aliases: ['kiloelectronvolts', 'kilo electron volt'],
    toBase: 1.602176634e-16, // exact: 1000 × eV
  },
  {
    id: 'megaelectronvolt',
    categoryId: 'energy',
    name: 'Megaelectronvolt',
    abbreviations: ['MeV'],
    aliases: ['megaelectronvolts', 'mega electron volt'],
    toBase: 1.602176634e-13, // exact: 10^6 × eV
  },
  {
    id: 'ton-tnt',
    categoryId: 'energy',
    name: 'Ton of TNT',
    abbreviations: ['tTNT'],
    aliases: ['tons of tnt', 'ton tnt'],
    toBase: 4.184e9, // exact: 4.184 GJ by definition
  },
  {
    id: 'quad',
    categoryId: 'energy',
    name: 'Quad',
    abbreviations: ['quad'],
    aliases: ['quads', 'quadrillion btu'],
    toBase: 1.05505585262e18, // exact: 10^15 × ISO BTU
  },
];

// ============================================================================
// POWER
// ============================================================================

export const powerCategory: Category = {
  id: 'power',
  name: 'Power',
  conversionType: 'linear',
};

// Base unit: Watt
export const powerUnits: Unit[] = [
  {
    id: 'watt',
    categoryId: 'power',
    name: 'Watt',
    abbreviations: ['W'],
    aliases: ['watts'],
    toBase: 1,
  },
  {
    id: 'milliwatt',
    categoryId: 'power',
    name: 'Milliwatt',
    abbreviations: ['mW'],
    aliases: ['milliwatts'],
    toBase: 0.001,
  },
  {
    id: 'kilowatt',
    categoryId: 'power',
    name: 'Kilowatt',
    abbreviations: ['kW'],
    aliases: ['kilowatts'],
    toBase: 1000,
  },
  {
    id: 'megawatt',
    categoryId: 'power',
    name: 'Megawatt',
    abbreviations: ['MW'],
    aliases: ['megawatts'],
    toBase: 1000000,
  },
  {
    id: 'gigawatt',
    categoryId: 'power',
    name: 'Gigawatt',
    abbreviations: ['GW'],
    aliases: ['gigawatts'],
    toBase: 1000000000,
  },
  {
    id: 'horsepower',
    categoryId: 'power',
    name: 'Horsepower (mechanical)',
    abbreviations: ['hp'],
    aliases: ['horsepower', 'mechanical horsepower'],
    toBase: 745.69987158227022, // exact: 550 ft⋅lbf/s
  },
  {
    id: 'horsepower-metric',
    categoryId: 'power',
    name: 'Horsepower (metric)',
    abbreviations: ['PS', 'cv'],
    aliases: ['metric horsepower', 'pferdestärke'],
    toBase: 735.49875, // exact: 75 kgf⋅m/s
  },
  {
    id: 'btu-per-hour',
    categoryId: 'power',
    name: 'BTU per hour',
    abbreviations: ['BTU/h', 'BTU/hr'],
    aliases: ['btu per hour'],
    toBase: 1055.05585262 / 3600, // exact: ISO BTU/h = 0.29307107017222...
  },
  {
    id: 'ton-refrigeration',
    categoryId: 'power',
    name: 'Ton of Refrigeration',
    abbreviations: ['TR', 'RT'],
    aliases: ['tons of refrigeration', 'refrigeration ton'],
    toBase: 3516.8528420667, // exact: 12000 BTU/h
  },
  {
    id: 'horsepower-electrical',
    categoryId: 'power',
    name: 'Horsepower (electrical)',
    abbreviations: ['hp(E)'],
    aliases: ['electrical horsepower'],
    toBase: 746, // exactly 746 W by definition
  },
  {
    id: 'foot-pound-per-second',
    categoryId: 'power',
    name: 'Foot-pound per second',
    abbreviations: ['ft⋅lb/s', 'ft-lb/s'],
    aliases: ['foot pounds per second'],
    toBase: 1.3558179483314004, // exact: ft × lbf/s
  },
  {
    id: 'erg-per-second',
    categoryId: 'power',
    name: 'Erg per second',
    abbreviations: ['erg/s'],
    aliases: ['ergs per second'],
    toBase: 1e-7,
  },
  {
    id: 'calorie-per-second',
    categoryId: 'power',
    name: 'Calorie per second',
    abbreviations: ['cal/s'],
    aliases: ['calories per second'],
    toBase: 4.184,
  },
];

// Export all
export const thermalCategories = [temperatureCategory, pressureCategory, energyCategory, powerCategory];
export const thermalUnits = [...temperatureUnits, ...pressureUnits, ...energyUnits, ...powerUnits];

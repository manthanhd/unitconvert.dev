import type { Category, Unit } from './types';

// ============================================================================
// SPEED / VELOCITY
// ============================================================================

export const speedCategory: Category = {
  id: 'speed',
  name: 'Speed',
  conversionType: 'linear',
};

// Base unit: meter per second
export const speedUnits: Unit[] = [
  {
    id: 'meter-per-second',
    categoryId: 'speed',
    name: 'Meter per second',
    abbreviations: ['m/s', 'mps'],
    aliases: ['meters per second'],
    toBase: 1,
  },
  {
    id: 'kilometer-per-hour',
    categoryId: 'speed',
    name: 'Kilometer per hour',
    abbreviations: ['km/h', 'kph', 'kmh'],
    aliases: ['kilometers per hour', 'kmph'],
    toBase: 0.277778,
  },
  {
    id: 'mile-per-hour',
    categoryId: 'speed',
    name: 'Mile per hour',
    abbreviations: ['mph', 'mi/h'],
    aliases: ['miles per hour'],
    toBase: 0.44704,
  },
  {
    id: 'foot-per-second',
    categoryId: 'speed',
    name: 'Foot per second',
    abbreviations: ['ft/s', 'fps'],
    aliases: ['feet per second'],
    toBase: 0.3048,
  },
  {
    id: 'knot',
    categoryId: 'speed',
    name: 'Knot',
    abbreviations: ['kn', 'kt'],
    aliases: ['knots', 'nautical miles per hour'],
    toBase: 0.514444,
  },
  {
    id: 'mach',
    categoryId: 'speed',
    name: 'Mach',
    abbreviations: ['M', 'mach'],
    aliases: ['speed of sound'],
    toBase: 343, // at sea level, 20°C
  },
  {
    id: 'speed-of-light',
    categoryId: 'speed',
    name: 'Speed of light',
    abbreviations: ['c'],
    aliases: ['light speed'],
    toBase: 299792458,
  },
  {
    id: 'centimeter-per-second',
    categoryId: 'speed',
    name: 'Centimeter per second',
    abbreviations: ['cm/s'],
    aliases: ['centimeters per second'],
    toBase: 0.01,
  },
  {
    id: 'millimeter-per-second',
    categoryId: 'speed',
    name: 'Millimeter per second',
    abbreviations: ['mm/s'],
    aliases: ['millimeters per second'],
    toBase: 0.001,
  },
];

// ============================================================================
// ACCELERATION
// ============================================================================

export const accelerationCategory: Category = {
  id: 'acceleration',
  name: 'Acceleration',
  conversionType: 'linear',
};

// Base unit: meter per second squared
export const accelerationUnits: Unit[] = [
  {
    id: 'meter-per-second-squared',
    categoryId: 'acceleration',
    name: 'Meter per second²',
    abbreviations: ['m/s²', 'm/s2'],
    aliases: ['meters per second squared'],
    toBase: 1,
  },
  {
    id: 'foot-per-second-squared',
    categoryId: 'acceleration',
    name: 'Foot per second²',
    abbreviations: ['ft/s²', 'ft/s2'],
    aliases: ['feet per second squared'],
    toBase: 0.3048,
  },
  {
    id: 'standard-gravity',
    categoryId: 'acceleration',
    name: 'Standard gravity',
    abbreviations: ['g', 'g₀'],
    aliases: ['gee', 'g-force'],
    toBase: 9.80665,
  },
  {
    id: 'gal',
    categoryId: 'acceleration',
    name: 'Gal',
    abbreviations: ['Gal'],
    aliases: ['galileo', 'cm/s²'],
    toBase: 0.01,
  },
  {
    id: 'inch-per-second-squared',
    categoryId: 'acceleration',
    name: 'Inch per second²',
    abbreviations: ['in/s²', 'in/s2'],
    aliases: ['inches per second squared'],
    toBase: 0.0254,
  },
];

// ============================================================================
// FREQUENCY
// ============================================================================

export const frequencyCategory: Category = {
  id: 'frequency',
  name: 'Frequency',
  conversionType: 'linear',
};

// Base unit: Hertz
export const frequencyUnits: Unit[] = [
  {
    id: 'hertz',
    categoryId: 'frequency',
    name: 'Hertz',
    abbreviations: ['Hz'],
    aliases: ['hertz', 'cycles per second', 'cps'],
    toBase: 1,
  },
  {
    id: 'kilohertz',
    categoryId: 'frequency',
    name: 'Kilohertz',
    abbreviations: ['kHz'],
    aliases: ['kilohertz'],
    toBase: 1000,
  },
  {
    id: 'megahertz',
    categoryId: 'frequency',
    name: 'Megahertz',
    abbreviations: ['MHz'],
    aliases: ['megahertz'],
    toBase: 1000000,
  },
  {
    id: 'gigahertz',
    categoryId: 'frequency',
    name: 'Gigahertz',
    abbreviations: ['GHz'],
    aliases: ['gigahertz'],
    toBase: 1000000000,
  },
  {
    id: 'terahertz',
    categoryId: 'frequency',
    name: 'Terahertz',
    abbreviations: ['THz'],
    aliases: ['terahertz'],
    toBase: 1000000000000,
  },
  {
    id: 'rpm',
    categoryId: 'frequency',
    name: 'RPM',
    abbreviations: ['rpm', 'r/min'],
    aliases: ['revolutions per minute'],
    toBase: 1 / 60, // exact
  },
  {
    id: 'radian-per-second',
    categoryId: 'frequency',
    name: 'Radian per second',
    abbreviations: ['rad/s'],
    aliases: ['radians per second'],
    toBase: 1 / (2 * Math.PI), // 0.15915494309189535
  },
  {
    id: 'bpm',
    categoryId: 'frequency',
    name: 'BPM',
    abbreviations: ['bpm'],
    aliases: ['beats per minute'],
    toBase: 1 / 60, // exact
  },
  {
    id: 'degree-per-second',
    categoryId: 'frequency',
    name: 'Degree per second',
    abbreviations: ['°/s', 'deg/s'],
    aliases: ['degrees per second'],
    toBase: 1 / 360, // exact
  },
];

// ============================================================================
// ANGLE
// ============================================================================

export const angleCategory: Category = {
  id: 'angle',
  name: 'Angle',
  conversionType: 'linear',
};

// Base unit: radian
// Using Math.PI for maximum precision in JavaScript (15-17 significant digits)
const PI = Math.PI; // 3.141592653589793

export const angleUnits: Unit[] = [
  {
    id: 'radian',
    categoryId: 'angle',
    name: 'Radian',
    abbreviations: ['rad'],
    aliases: ['radians'],
    toBase: 1,
  },
  {
    id: 'degree',
    categoryId: 'angle',
    name: 'Degree',
    abbreviations: ['°', 'deg'],
    aliases: ['degrees'],
    toBase: PI / 180, // 0.017453292519943295
  },
  {
    id: 'gradian',
    categoryId: 'angle',
    name: 'Gradian',
    abbreviations: ['grad', 'gon'],
    aliases: ['gradians', 'gon', 'grade'],
    toBase: PI / 200, // 0.015707963267948967
  },
  {
    id: 'arcminute',
    categoryId: 'angle',
    name: 'Arcminute',
    abbreviations: ["'", 'arcmin'],
    aliases: ['arcminutes', 'minute of arc'],
    toBase: PI / 10800, // 0.0002908882086657216
  },
  {
    id: 'arcsecond',
    categoryId: 'angle',
    name: 'Arcsecond',
    abbreviations: ['"', 'arcsec'],
    aliases: ['arcseconds', 'second of arc'],
    toBase: PI / 648000, // 0.000004848136811095360
  },
  {
    id: 'turn',
    categoryId: 'angle',
    name: 'Turn',
    abbreviations: ['turn', 'rev'],
    aliases: ['turns', 'revolution', 'revolutions', 'cycle'],
    toBase: 2 * PI, // 6.283185307179586
  },
  {
    id: 'milliradian',
    categoryId: 'angle',
    name: 'Milliradian',
    abbreviations: ['mrad'],
    aliases: ['milliradians', 'mil'],
    toBase: 0.001,
  },
  {
    id: 'quadrant',
    categoryId: 'angle',
    name: 'Quadrant',
    abbreviations: ['quadrant'],
    aliases: ['quadrants', 'right angle'],
    toBase: PI / 2, // 1.5707963267948966
  },
  {
    id: 'sextant',
    categoryId: 'angle',
    name: 'Sextant',
    abbreviations: ['sextant'],
    aliases: ['sextants'],
    toBase: PI / 3, // 1.0471975511965976
  },
];

// Export all
export const motionCategories = [speedCategory, accelerationCategory, frequencyCategory, angleCategory];
export const motionUnits = [...speedUnits, ...accelerationUnits, ...frequencyUnits, ...angleUnits];

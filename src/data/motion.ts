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
    toBase: 0.0166667, // 1/60
  },
  {
    id: 'radian-per-second',
    categoryId: 'frequency',
    name: 'Radian per second',
    abbreviations: ['rad/s'],
    aliases: ['radians per second'],
    toBase: 0.159155, // 1/(2π)
  },
  {
    id: 'bpm',
    categoryId: 'frequency',
    name: 'BPM',
    abbreviations: ['bpm'],
    aliases: ['beats per minute'],
    toBase: 0.0166667, // 1/60
  },
  {
    id: 'degree-per-second',
    categoryId: 'frequency',
    name: 'Degree per second',
    abbreviations: ['°/s', 'deg/s'],
    aliases: ['degrees per second'],
    toBase: 0.00277778, // 1/360
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
    toBase: 0.0174533, // π/180
  },
  {
    id: 'gradian',
    categoryId: 'angle',
    name: 'Gradian',
    abbreviations: ['grad', 'gon'],
    aliases: ['gradians', 'gon', 'grade'],
    toBase: 0.015708, // π/200
  },
  {
    id: 'arcminute',
    categoryId: 'angle',
    name: 'Arcminute',
    abbreviations: ["'", 'arcmin'],
    aliases: ['arcminutes', 'minute of arc'],
    toBase: 0.000290888, // π/10800
  },
  {
    id: 'arcsecond',
    categoryId: 'angle',
    name: 'Arcsecond',
    abbreviations: ['"', 'arcsec'],
    aliases: ['arcseconds', 'second of arc'],
    toBase: 0.00000484814, // π/648000
  },
  {
    id: 'turn',
    categoryId: 'angle',
    name: 'Turn',
    abbreviations: ['turn', 'rev'],
    aliases: ['turns', 'revolution', 'revolutions', 'cycle'],
    toBase: 6.28319, // 2π
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
    toBase: 1.5708, // π/2 (90°)
  },
  {
    id: 'sextant',
    categoryId: 'angle',
    name: 'Sextant',
    abbreviations: ['sextant'],
    aliases: ['sextants'],
    toBase: 1.0472, // π/3 (60°)
  },
];

// Export all
export const motionCategories = [speedCategory, accelerationCategory, frequencyCategory, angleCategory];
export const motionUnits = [...speedUnits, ...accelerationUnits, ...frequencyUnits, ...angleUnits];

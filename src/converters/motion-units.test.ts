import { describe, it, expect } from 'vitest';
import { linearConvert } from './linear';
import { speedUnits, accelerationUnits, frequencyUnits, angleUnits } from '../data/motion';
import type { Unit } from '../data/types';

// Helper to find unit by ID
const findUnit = (units: Unit[], id: string): Unit => {
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`Unit not found: ${id}`);
  return unit;
};

// ============================================================================
// SPEED UNITS - All 9 units tested
// ============================================================================

describe('Speed Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(speedUnits, 'meter-per-second');

  describe('All speed units to base (m/s)', () => {
    speedUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to m/s`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 4);
      });
    });
  });

  describe('All speed units from base (m/s)', () => {
    speedUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} m/s to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 4);
      });
    });
  });

  describe('Known reference conversions', () => {
    const kmh = findUnit(speedUnits, 'kilometer-per-hour');
    const mph = findUnit(speedUnits, 'mile-per-hour');
    const knot = findUnit(speedUnits, 'knot');
    const mach = findUnit(speedUnits, 'mach');
    const c = findUnit(speedUnits, 'speed-of-light');

    it('1 m/s = 3.6 km/h', () => {
      expect(parseFloat(linearConvert(baseUnit, kmh, '1'))).toBeCloseTo(3.6, 2);
    });

    it('100 km/h ≈ 62.14 mph', () => {
      expect(parseFloat(linearConvert(kmh, mph, '100'))).toBeCloseTo(62.14, 1);
    });

    it('1 mph ≈ 1.609 km/h', () => {
      expect(parseFloat(linearConvert(mph, kmh, '1'))).toBeCloseTo(1.609, 2);
    });

    it('1 knot = 1.852 km/h (nautical)', () => {
      expect(parseFloat(linearConvert(knot, kmh, '1'))).toBeCloseTo(1.852, 2);
    });

    it('1 knot ≈ 1.151 mph', () => {
      expect(parseFloat(linearConvert(knot, mph, '1'))).toBeCloseTo(1.151, 2);
    });

    it('Mach 1 = 343 m/s (at sea level, 20°C)', () => {
      expect(parseFloat(linearConvert(mach, baseUnit, '1'))).toBeCloseTo(343, 0);
    });

    it('Mach 1 ≈ 1235 km/h', () => {
      expect(parseFloat(linearConvert(mach, kmh, '1'))).toBeCloseTo(1235, 0);
    });

    it('speed of light = 299,792,458 m/s', () => {
      expect(parseFloat(linearConvert(c, baseUnit, '1'))).toBeCloseTo(299792458, 0);
    });

    it('speed of light ≈ 1,079,252,848.8 km/h', () => {
      expect(parseFloat(linearConvert(c, kmh, '1'))).toBeCloseTo(1079252848.8, -4);
    });

    it('highway speed: 120 km/h ≈ 74.56 mph', () => {
      expect(parseFloat(linearConvert(kmh, mph, '120'))).toBeCloseTo(74.56, 1);
    });

    it('marathon pace: 12 km/h ≈ 7.46 mph', () => {
      expect(parseFloat(linearConvert(kmh, mph, '12'))).toBeCloseTo(7.46, 1);
    });
  });

  describe('Round-trip conversions', () => {
    const kmh = findUnit(speedUnits, 'kilometer-per-hour');
    const mph = findUnit(speedUnits, 'mile-per-hour');

    it('km/h → mph → km/h should return original', () => {
      const intermediate = linearConvert(kmh, mph, '100');
      const result = parseFloat(linearConvert(mph, kmh, intermediate));
      expect(result).toBeCloseTo(100, 5);
    });
  });
});

// ============================================================================
// ACCELERATION UNITS - All 5 units tested
// ============================================================================

describe('Acceleration Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(accelerationUnits, 'meter-per-second-squared');

  describe('All acceleration units to base (m/s²)', () => {
    accelerationUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to m/s²`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 5);
      });
    });
  });

  describe('All acceleration units from base (m/s²)', () => {
    accelerationUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} m/s² to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const g = findUnit(accelerationUnits, 'standard-gravity');
    const gal = findUnit(accelerationUnits, 'gal');
    const ftPerS2 = findUnit(accelerationUnits, 'foot-per-second-squared');

    it('1 g = 9.80665 m/s² (standard gravity)', () => {
      expect(parseFloat(linearConvert(g, baseUnit, '1'))).toBeCloseTo(9.80665, 4);
    });

    it('1 m/s² ≈ 0.102 g', () => {
      expect(parseFloat(linearConvert(baseUnit, g, '1'))).toBeCloseTo(0.102, 2);
    });

    it('1 Gal = 0.01 m/s² (CGS unit)', () => {
      expect(parseFloat(linearConvert(gal, baseUnit, '1'))).toBeCloseTo(0.01, 5);
    });

    it('1 g = 980.665 Gal', () => {
      expect(parseFloat(linearConvert(g, gal, '1'))).toBeCloseTo(980.665, 2);
    });

    it('1 ft/s² = 0.3048 m/s²', () => {
      expect(parseFloat(linearConvert(ftPerS2, baseUnit, '1'))).toBeCloseTo(0.3048, 4);
    });

    it('1 g ≈ 32.174 ft/s²', () => {
      expect(parseFloat(linearConvert(g, ftPerS2, '1'))).toBeCloseTo(32.174, 2);
    });

    it('roller coaster: 4 g ≈ 39.23 m/s²', () => {
      expect(parseFloat(linearConvert(g, baseUnit, '4'))).toBeCloseTo(39.23, 1);
    });
  });

  describe('Round-trip conversions', () => {
    const g = findUnit(accelerationUnits, 'standard-gravity');

    it('m/s² → g → m/s² should return original', () => {
      const intermediate = linearConvert(baseUnit, g, '10');
      const result = parseFloat(linearConvert(g, baseUnit, intermediate));
      expect(result).toBeCloseTo(10, 5);
    });
  });
});

// ============================================================================
// FREQUENCY UNITS - All 9 units tested
// ============================================================================

describe('Frequency Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(frequencyUnits, 'hertz');

  describe('All frequency units to base (Hz)', () => {
    frequencyUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Hz`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 8);
      });
    });
  });

  describe('All frequency units from base (Hz)', () => {
    frequencyUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} Hz to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const kHz = findUnit(frequencyUnits, 'kilohertz');
    const MHz = findUnit(frequencyUnits, 'megahertz');
    const GHz = findUnit(frequencyUnits, 'gigahertz');
    const rpm = findUnit(frequencyUnits, 'rpm');
    const bpm = findUnit(frequencyUnits, 'bpm');

    it('1 kHz = 1000 Hz', () => {
      expect(parseFloat(linearConvert(kHz, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 MHz = 1,000,000 Hz', () => {
      expect(parseFloat(linearConvert(MHz, baseUnit, '1'))).toBeCloseTo(1e6, 0);
    });

    it('1 GHz = 1,000,000,000 Hz', () => {
      expect(parseFloat(linearConvert(GHz, baseUnit, '1'))).toBeCloseTo(1e9, 0);
    });

    it('60 rpm = 1 Hz (1 revolution per second)', () => {
      expect(parseFloat(linearConvert(rpm, baseUnit, '60'))).toBeCloseTo(1, 5);
    });

    it('1 Hz = 60 rpm', () => {
      expect(parseFloat(linearConvert(baseUnit, rpm, '1'))).toBeCloseTo(60, 0);
    });

    it('60 bpm = 1 Hz (1 beat per second)', () => {
      expect(parseFloat(linearConvert(bpm, baseUnit, '60'))).toBeCloseTo(1, 5);
    });

    it('120 bpm = 2 Hz (fast tempo)', () => {
      expect(parseFloat(linearConvert(bpm, baseUnit, '120'))).toBeCloseTo(2, 5);
    });

    it('CPU: 3.5 GHz = 3,500 MHz', () => {
      expect(parseFloat(linearConvert(GHz, MHz, '3.5'))).toBeCloseTo(3500, 0);
    });

    it('FM radio: 100 MHz = 100,000 kHz', () => {
      expect(parseFloat(linearConvert(MHz, kHz, '100'))).toBeCloseTo(100000, 0);
    });

    it('car engine: 3000 rpm = 50 Hz', () => {
      expect(parseFloat(linearConvert(rpm, baseUnit, '3000'))).toBeCloseTo(50, 0);
    });
  });

  describe('Round-trip conversions', () => {
    const MHz = findUnit(frequencyUnits, 'megahertz');
    const GHz = findUnit(frequencyUnits, 'gigahertz');

    it('MHz → GHz → MHz should return original', () => {
      const intermediate = linearConvert(MHz, GHz, '2400');
      const result = parseFloat(linearConvert(GHz, MHz, intermediate));
      expect(result).toBeCloseTo(2400, 5);
    });
  });
});

// ============================================================================
// ANGLE UNITS - All 9 units tested
// ============================================================================

describe('Angle Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(angleUnits, 'radian');

  describe('All angle units to base (radian)', () => {
    angleUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to radians`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        // Use tolerance of 5 to account for π approximations in data file
        expect(result).toBeCloseTo(unit.toBase as number, 5);
      });
    });
  });

  describe('All angle units from base (radian)', () => {
    angleUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} rad to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const degree = findUnit(angleUnits, 'degree');
    const gradian = findUnit(angleUnits, 'gradian');
    const arcmin = findUnit(angleUnits, 'arcminute');
    const arcsec = findUnit(angleUnits, 'arcsecond');
    const turn = findUnit(angleUnits, 'turn');

    it('π radians = 180 degrees', () => {
      expect(parseFloat(linearConvert(baseUnit, degree, String(Math.PI)))).toBeCloseTo(180, 5);
    });

    it('180 degrees = π radians', () => {
      expect(parseFloat(linearConvert(degree, baseUnit, '180'))).toBeCloseTo(Math.PI, 5);
    });

    it('360 degrees = 2π radians', () => {
      expect(parseFloat(linearConvert(degree, baseUnit, '360'))).toBeCloseTo(2 * Math.PI, 5);
    });

    it('90 degrees = π/2 radians', () => {
      expect(parseFloat(linearConvert(degree, baseUnit, '90'))).toBeCloseTo(Math.PI / 2, 5);
    });

    it('1 turn = 360 degrees', () => {
      expect(parseFloat(linearConvert(turn, degree, '1'))).toBeCloseTo(360, 5);
    });

    it('1 turn = 2π radians', () => {
      expect(parseFloat(linearConvert(turn, baseUnit, '1'))).toBeCloseTo(2 * Math.PI, 5);
    });

    it('400 gradians = 360 degrees (full circle)', () => {
      expect(parseFloat(linearConvert(gradian, degree, '400'))).toBeCloseTo(360, 5);
    });

    it('100 gradians = 90 degrees (right angle)', () => {
      expect(parseFloat(linearConvert(gradian, degree, '100'))).toBeCloseTo(90, 5);
    });

    it('1 degree = 60 arcminutes', () => {
      expect(parseFloat(linearConvert(degree, arcmin, '1'))).toBeCloseTo(60, 0);
    });

    it('1 arcminute = 60 arcseconds', () => {
      expect(parseFloat(linearConvert(arcmin, arcsec, '1'))).toBeCloseTo(60, 0);
    });

    it('1 degree = 3600 arcseconds', () => {
      expect(parseFloat(linearConvert(degree, arcsec, '1'))).toBeCloseTo(3600, 0);
    });

    it('45 degrees = 50 gradians', () => {
      expect(parseFloat(linearConvert(degree, gradian, '45'))).toBeCloseTo(50, 5);
    });
  });

  describe('Trigonometric reference angles', () => {
    const degree = findUnit(angleUnits, 'degree');

    it('30° = π/6 radians', () => {
      expect(parseFloat(linearConvert(degree, baseUnit, '30'))).toBeCloseTo(Math.PI / 6, 5);
    });

    it('45° = π/4 radians', () => {
      expect(parseFloat(linearConvert(degree, baseUnit, '45'))).toBeCloseTo(Math.PI / 4, 5);
    });

    it('60° = π/3 radians', () => {
      expect(parseFloat(linearConvert(degree, baseUnit, '60'))).toBeCloseTo(Math.PI / 3, 5);
    });
  });

  describe('Round-trip conversions', () => {
    const degree = findUnit(angleUnits, 'degree');
    const gradian = findUnit(angleUnits, 'gradian');

    it('degree → radian → degree should return original', () => {
      const intermediate = linearConvert(degree, baseUnit, '45');
      const result = parseFloat(linearConvert(baseUnit, degree, intermediate));
      expect(result).toBeCloseTo(45, 5);
    });

    it('gradian → degree → gradian should return original', () => {
      const intermediate = linearConvert(gradian, degree, '100');
      const result = parseFloat(linearConvert(degree, gradian, intermediate));
      expect(result).toBeCloseTo(100, 5);
    });
  });
});

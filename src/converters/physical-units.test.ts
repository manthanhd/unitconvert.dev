import { describe, it, expect } from 'vitest';
import { linearConvert } from './linear';
import { lengthUnits, areaUnits, volumeUnits, massUnits } from '../data/physical';
import type { Unit } from '../data/types';

// Helper to find unit by ID
const findUnit = (units: Unit[], id: string): Unit => {
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`Unit not found: ${id}`);
  return unit;
};

// ============================================================================
// LENGTH UNITS - All 21 units tested
// ============================================================================

describe('Length Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(lengthUnits, 'meter');

  describe('All length units to base (meter)', () => {
    // Test every length unit converts to meter correctly
    lengthUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to meters`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        // Use relative tolerance for very large or small numbers
        const toBase = unit.toBase as number;
        if (toBase > 1e10 || toBase < 1e-10) {
          expect(result / toBase).toBeCloseTo(1, 4);
        } else {
          expect(result).toBeCloseTo(toBase, 2);
        }
      });
    });
  });

  describe('All length units from base (meter)', () => {
    // Test every length unit converts from meter correctly
    lengthUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} meters to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const km = findUnit(lengthUnits, 'kilometer');
    const mile = findUnit(lengthUnits, 'mile');
    const foot = findUnit(lengthUnits, 'foot');
    const inch = findUnit(lengthUnits, 'inch');
    const yard = findUnit(lengthUnits, 'yard');
    const cm = findUnit(lengthUnits, 'centimeter');
    const mm = findUnit(lengthUnits, 'millimeter');
    const nauticalMile = findUnit(lengthUnits, 'nautical-mile');

    it('1 kilometer = 1000 meters', () => {
      expect(parseFloat(linearConvert(km, baseUnit, '1'))).toBeCloseTo(1000, 5);
    });

    it('1 mile = 1.609344 kilometers', () => {
      expect(parseFloat(linearConvert(mile, km, '1'))).toBeCloseTo(1.609344, 5);
    });

    it('1 yard = 3 feet', () => {
      expect(parseFloat(linearConvert(yard, foot, '1'))).toBeCloseTo(3, 5);
    });

    it('1 foot = 12 inches', () => {
      expect(parseFloat(linearConvert(foot, inch, '1'))).toBeCloseTo(12, 5);
    });

    it('1 inch = 2.54 cm', () => {
      expect(parseFloat(linearConvert(inch, cm, '1'))).toBeCloseTo(2.54, 5);
    });

    it('1 meter = 100 cm', () => {
      expect(parseFloat(linearConvert(baseUnit, cm, '1'))).toBeCloseTo(100, 5);
    });

    it('1 meter = 1000 mm', () => {
      expect(parseFloat(linearConvert(baseUnit, mm, '1'))).toBeCloseTo(1000, 5);
    });

    it('1 nautical mile = 1852 meters', () => {
      expect(parseFloat(linearConvert(nauticalMile, baseUnit, '1'))).toBeCloseTo(1852, 5);
    });

    it('1 mile = 5280 feet', () => {
      expect(parseFloat(linearConvert(mile, foot, '1'))).toBeCloseTo(5280, 5);
    });

    it('marathon distance: 42.195 km = 26.219 miles', () => {
      expect(parseFloat(linearConvert(km, mile, '42.195'))).toBeCloseTo(26.21875, 3);
    });
  });

  describe('Round-trip conversions', () => {
    const km = findUnit(lengthUnits, 'kilometer');
    const mile = findUnit(lengthUnits, 'mile');

    it('km → mile → km should return original', () => {
      const intermediate = linearConvert(km, mile, '100');
      const result = parseFloat(linearConvert(mile, km, intermediate));
      expect(result).toBeCloseTo(100, 5);
    });

    it('meter → inch → meter should return original', () => {
      const inch = findUnit(lengthUnits, 'inch');
      const intermediate = linearConvert(baseUnit, inch, '2.54');
      const result = parseFloat(linearConvert(inch, baseUnit, intermediate));
      expect(result).toBeCloseTo(2.54, 5);
    });
  });

  describe('Astronomical distances', () => {
    const lightYear = findUnit(lengthUnits, 'light-year');
    const au = findUnit(lengthUnits, 'astronomical-unit');
    const parsec = findUnit(lengthUnits, 'parsec');

    it('1 light year is approximately 63,241 AU', () => {
      const result = parseFloat(linearConvert(lightYear, au, '1'));
      expect(result).toBeCloseTo(63241, -1);
    });

    it('1 parsec is approximately 3.26 light years', () => {
      const result = parseFloat(linearConvert(parsec, lightYear, '1'));
      expect(result).toBeCloseTo(3.26, 1);
    });
  });
});

// ============================================================================
// AREA UNITS - All 13 units tested
// ============================================================================

describe('Area Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(areaUnits, 'square-meter');

  describe('All area units to base (square meter)', () => {
    areaUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to square meters`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        const toBase = unit.toBase as number;
        if (toBase > 1e6 || toBase < 1e-6) {
          expect(result / toBase).toBeCloseTo(1, 4);
        } else {
          expect(result).toBeCloseTo(toBase, 2);
        }
      });
    });
  });

  describe('All area units from base (square meter)', () => {
    areaUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} sq m to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const sqKm = findUnit(areaUnits, 'square-kilometer');
    const hectare = findUnit(areaUnits, 'hectare');
    const acre = findUnit(areaUnits, 'acre');
    const sqMile = findUnit(areaUnits, 'square-mile');
    const sqFoot = findUnit(areaUnits, 'square-foot');
    const sqYard = findUnit(areaUnits, 'square-yard');
    const sqInch = findUnit(areaUnits, 'square-inch');

    it('1 square kilometer = 1,000,000 square meters', () => {
      expect(parseFloat(linearConvert(sqKm, baseUnit, '1'))).toBeCloseTo(1e6, 0);
    });

    it('1 hectare = 10,000 square meters', () => {
      expect(parseFloat(linearConvert(hectare, baseUnit, '1'))).toBeCloseTo(10000, 0);
    });

    it('1 square kilometer = 100 hectares', () => {
      expect(parseFloat(linearConvert(sqKm, hectare, '1'))).toBeCloseTo(100, 5);
    });

    it('1 acre = 4,046.86 square meters', () => {
      expect(parseFloat(linearConvert(acre, baseUnit, '1'))).toBeCloseTo(4046.86, 0);
    });

    it('1 square mile = 640 acres', () => {
      expect(parseFloat(linearConvert(sqMile, acre, '1'))).toBeCloseTo(640, 1);
    });

    it('1 square yard = 9 square feet', () => {
      expect(parseFloat(linearConvert(sqYard, sqFoot, '1'))).toBeCloseTo(9, 5);
    });

    it('1 square foot = 144 square inches', () => {
      expect(parseFloat(linearConvert(sqFoot, sqInch, '1'))).toBeCloseTo(144, 5);
    });

    it('football field (US): 1.32 acres = 5,351 sq m', () => {
      expect(parseFloat(linearConvert(acre, baseUnit, '1.32'))).toBeCloseTo(5341.85, 0);
    });
  });

  describe('Round-trip conversions', () => {
    const acre = findUnit(areaUnits, 'acre');
    const hectare = findUnit(areaUnits, 'hectare');

    it('acre → hectare → acre should return original', () => {
      const intermediate = linearConvert(acre, hectare, '10');
      const result = parseFloat(linearConvert(hectare, acre, intermediate));
      expect(result).toBeCloseTo(10, 5);
    });
  });
});

// ============================================================================
// VOLUME UNITS - All 25 units tested
// ============================================================================

describe('Volume Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(volumeUnits, 'cubic-meter');

  describe('All volume units to base (cubic meter)', () => {
    volumeUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to cubic meters`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 8);
      });
    });
  });

  describe('All volume units from base (cubic meter)', () => {
    volumeUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} m³ to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const liter = findUnit(volumeUnits, 'liter');
    const mL = findUnit(volumeUnits, 'milliliter');
    const galUS = findUnit(volumeUnits, 'gallon-us');
    const galImp = findUnit(volumeUnits, 'gallon-imperial');
    const flOzUS = findUnit(volumeUnits, 'fluid-ounce-us');
    const cup = findUnit(volumeUnits, 'cup-us');
    const tbsp = findUnit(volumeUnits, 'tablespoon');
    const tsp = findUnit(volumeUnits, 'teaspoon');
    const cubicFoot = findUnit(volumeUnits, 'cubic-foot');

    it('1 liter = 1000 milliliters', () => {
      expect(parseFloat(linearConvert(liter, mL, '1'))).toBeCloseTo(1000, 5);
    });

    it('1 US gallon = 3.785 liters', () => {
      expect(parseFloat(linearConvert(galUS, liter, '1'))).toBeCloseTo(3.785, 2);
    });

    it('1 Imperial gallon = 4.546 liters', () => {
      expect(parseFloat(linearConvert(galImp, liter, '1'))).toBeCloseTo(4.546, 2);
    });

    it('1 US gallon = 128 fluid ounces', () => {
      expect(parseFloat(linearConvert(galUS, flOzUS, '1'))).toBeCloseTo(128, 0);
    });

    it('1 cup = 8 fluid ounces', () => {
      expect(parseFloat(linearConvert(cup, flOzUS, '1'))).toBeCloseTo(8, 1);
    });

    it('1 tablespoon = 3 teaspoons', () => {
      expect(parseFloat(linearConvert(tbsp, tsp, '1'))).toBeCloseTo(3, 1);
    });

    it('1 cubic foot = 28.317 liters', () => {
      expect(parseFloat(linearConvert(cubicFoot, liter, '1'))).toBeCloseTo(28.317, 2);
    });

    it('1 cubic meter = 1000 liters', () => {
      expect(parseFloat(linearConvert(baseUnit, liter, '1'))).toBeCloseTo(1000, 0);
    });
  });

  describe('US vs Imperial volumes', () => {
    const galUS = findUnit(volumeUnits, 'gallon-us');
    const galImp = findUnit(volumeUnits, 'gallon-imperial');
    const pintUS = findUnit(volumeUnits, 'pint-us');
    const pintImp = findUnit(volumeUnits, 'pint-imperial');

    it('1 Imperial gallon > 1 US gallon', () => {
      const usInCubicM = parseFloat(linearConvert(galUS, baseUnit, '1'));
      const impInCubicM = parseFloat(linearConvert(galImp, baseUnit, '1'));
      expect(impInCubicM).toBeGreaterThan(usInCubicM);
    });

    it('1 Imperial pint > 1 US pint', () => {
      const usInCubicM = parseFloat(linearConvert(pintUS, baseUnit, '1'));
      const impInCubicM = parseFloat(linearConvert(pintImp, baseUnit, '1'));
      expect(impInCubicM).toBeGreaterThan(usInCubicM);
    });
  });

  describe('Round-trip conversions', () => {
    const liter = findUnit(volumeUnits, 'liter');
    const galUS = findUnit(volumeUnits, 'gallon-us');

    it('liter → gallon → liter should return original', () => {
      const intermediate = linearConvert(liter, galUS, '10');
      const result = parseFloat(linearConvert(galUS, liter, intermediate));
      expect(result).toBeCloseTo(10, 5);
    });
  });
});

// ============================================================================
// MASS UNITS - All 20 units tested
// ============================================================================

describe('Mass Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(massUnits, 'kilogram');

  describe('All mass units to base (kilogram)', () => {
    massUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to kilograms`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        const toBase = unit.toBase as number;
        if (toBase > 1e6 || toBase < 1e-6) {
          expect(result / toBase).toBeCloseTo(1, 4);
        } else {
          expect(result).toBeCloseTo(toBase, 2);
        }
      });
    });
  });

  describe('All mass units from base (kilogram)', () => {
    massUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} kg to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const gram = findUnit(massUnits, 'gram');
    const mg = findUnit(massUnits, 'milligram');
    const pound = findUnit(massUnits, 'pound');
    const ounce = findUnit(massUnits, 'ounce');
    const stone = findUnit(massUnits, 'stone');
    const metricTon = findUnit(massUnits, 'metric-ton');
    const shortTon = findUnit(massUnits, 'short-ton');
    const longTon = findUnit(massUnits, 'long-ton');
    const troyOz = findUnit(massUnits, 'troy-ounce');
    const carat = findUnit(massUnits, 'carat');

    it('1 kilogram = 1000 grams', () => {
      expect(parseFloat(linearConvert(baseUnit, gram, '1'))).toBeCloseTo(1000, 5);
    });

    it('1 gram = 1000 milligrams', () => {
      expect(parseFloat(linearConvert(gram, mg, '1'))).toBeCloseTo(1000, 5);
    });

    it('1 pound = 0.453592 kilograms', () => {
      expect(parseFloat(linearConvert(pound, baseUnit, '1'))).toBeCloseTo(0.453592, 5);
    });

    it('1 pound = 16 ounces', () => {
      expect(parseFloat(linearConvert(pound, ounce, '1'))).toBeCloseTo(16, 5);
    });

    it('1 stone = 14 pounds', () => {
      expect(parseFloat(linearConvert(stone, pound, '1'))).toBeCloseTo(14, 1);
    });

    it('1 kilogram = 2.20462 pounds', () => {
      expect(parseFloat(linearConvert(baseUnit, pound, '1'))).toBeCloseTo(2.20462, 3);
    });

    it('1 metric ton = 1000 kilograms', () => {
      expect(parseFloat(linearConvert(metricTon, baseUnit, '1'))).toBeCloseTo(1000, 5);
    });

    it('1 short ton = 2000 pounds', () => {
      expect(parseFloat(linearConvert(shortTon, pound, '1'))).toBeCloseTo(2000, 0);
    });

    it('1 long ton = 2240 pounds', () => {
      expect(parseFloat(linearConvert(longTon, pound, '1'))).toBeCloseTo(2240, 0);
    });

    it('1 troy ounce = 31.1035 grams', () => {
      expect(parseFloat(linearConvert(troyOz, gram, '1'))).toBeCloseTo(31.1035, 2);
    });

    it('1 carat = 0.2 grams (diamonds)', () => {
      expect(parseFloat(linearConvert(carat, gram, '1'))).toBeCloseTo(0.2, 5);
    });

    it('body weight: 70 kg = 154.32 pounds', () => {
      expect(parseFloat(linearConvert(baseUnit, pound, '70'))).toBeCloseTo(154.32, 0);
    });
  });

  describe('Round-trip conversions', () => {
    const pound = findUnit(massUnits, 'pound');

    it('kg → lb → kg should return original', () => {
      const intermediate = linearConvert(baseUnit, pound, '100');
      const result = parseFloat(linearConvert(pound, baseUnit, intermediate));
      expect(result).toBeCloseTo(100, 5);
    });
  });

  describe('Ton comparisons', () => {
    const metricTon = findUnit(massUnits, 'metric-ton');
    const shortTon = findUnit(massUnits, 'short-ton');
    const longTon = findUnit(massUnits, 'long-ton');

    it('metric ton > short ton', () => {
      const metric = metricTon.toBase as number;
      const short = shortTon.toBase as number;
      expect(metric).toBeGreaterThan(short);
    });

    it('long ton > metric ton', () => {
      const metric = metricTon.toBase as number;
      const long = longTon.toBase as number;
      expect(long).toBeGreaterThan(metric);
    });
  });
});

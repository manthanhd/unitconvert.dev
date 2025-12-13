import { describe, it, expect } from 'vitest';
import { linearConvert } from './linear';
import { formulaConvert } from './formula';
import { fuelEconomyUnits, cookingVolumeUnits, cookingWeightUnits } from '../data/everyday';
import { durationUnits } from '../data/time';
import type { Unit } from '../data/types';

// Helper to find unit by ID
const findUnit = (units: Unit[], id: string): Unit => {
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`Unit not found: ${id}`);
  return unit;
};

// ============================================================================
// FUEL ECONOMY UNITS - All 5 units tested (Formula-based)
// ============================================================================

describe('Fuel Economy Units - Comprehensive Tests', () => {
  describe('All fuel economy units conversion tests', () => {
    const kmL = findUnit(fuelEconomyUnits, 'kilometers-per-liter');
    const mpgUS = findUnit(fuelEconomyUnits, 'miles-per-gallon-us');
    const mpgImp = findUnit(fuelEconomyUnits, 'miles-per-gallon-imperial');
    const miL = findUnit(fuelEconomyUnits, 'miles-per-liter');

    it('should convert km/L to mpg (US)', () => {
      const result = parseFloat(formulaConvert(kmL, mpgUS, '10'));
      expect(result).toBeCloseTo(23.52, 1);
    });

    it('should convert mpg (US) to km/L', () => {
      const result = parseFloat(formulaConvert(mpgUS, kmL, '30'));
      expect(result).toBeCloseTo(12.75, 1);
    });

    it('should convert mpg (US) to mpg (Imperial)', () => {
      const result = parseFloat(formulaConvert(mpgUS, mpgImp, '30'));
      expect(result).toBeCloseTo(36.03, 1);
    });

    it('should convert mpg (Imperial) to mpg (US)', () => {
      const result = parseFloat(formulaConvert(mpgImp, mpgUS, '30'));
      expect(result).toBeCloseTo(24.98, 1);
    });

    it('should convert km/L to miles/L', () => {
      const result = parseFloat(formulaConvert(kmL, miL, '10'));
      expect(result).toBeCloseTo(6.21, 1);
    });
  });

  describe('km/L to L/100km (inverse relationship)', () => {
    const kmL = findUnit(fuelEconomyUnits, 'kilometers-per-liter');
    const L100km = findUnit(fuelEconomyUnits, 'liters-per-100km');

    it('10 km/L = 10 L/100km', () => {
      const result = parseFloat(formulaConvert(kmL, L100km, '10'));
      expect(result).toBeCloseTo(10, 5);
    });

    it('20 km/L = 5 L/100km', () => {
      const result = parseFloat(formulaConvert(kmL, L100km, '20'));
      expect(result).toBeCloseTo(5, 5);
    });

    it('5 km/L = 20 L/100km', () => {
      const result = parseFloat(formulaConvert(kmL, L100km, '5'));
      expect(result).toBeCloseTo(20, 5);
    });

    it('10 L/100km = 10 km/L', () => {
      const result = parseFloat(formulaConvert(L100km, kmL, '10'));
      expect(result).toBeCloseTo(10, 5);
    });

    it('5 L/100km = 20 km/L (efficient car)', () => {
      const result = parseFloat(formulaConvert(L100km, kmL, '5'));
      expect(result).toBeCloseTo(20, 5);
    });
  });

  describe('mpg (US) to L/100km', () => {
    const mpgUS = findUnit(fuelEconomyUnits, 'miles-per-gallon-us');
    const L100km = findUnit(fuelEconomyUnits, 'liters-per-100km');

    it('30 mpg (US) ≈ 7.84 L/100km', () => {
      const result = parseFloat(formulaConvert(mpgUS, L100km, '30'));
      expect(result).toBeCloseTo(7.84, 1);
    });

    it('25 mpg (US) ≈ 9.41 L/100km', () => {
      const result = parseFloat(formulaConvert(mpgUS, L100km, '25'));
      expect(result).toBeCloseTo(9.41, 1);
    });

    it('40 mpg (US) ≈ 5.88 L/100km', () => {
      const result = parseFloat(formulaConvert(mpgUS, L100km, '40'));
      expect(result).toBeCloseTo(5.88, 1);
    });

    it('50 mpg (US) ≈ 4.70 L/100km (hybrid)', () => {
      const result = parseFloat(formulaConvert(mpgUS, L100km, '50'));
      expect(result).toBeCloseTo(4.70, 1);
    });
  });

  describe('L/100km to mpg (US)', () => {
    const mpgUS = findUnit(fuelEconomyUnits, 'miles-per-gallon-us');
    const L100km = findUnit(fuelEconomyUnits, 'liters-per-100km');

    it('10 L/100km ≈ 23.52 mpg (US)', () => {
      const result = parseFloat(formulaConvert(L100km, mpgUS, '10'));
      expect(result).toBeCloseTo(23.52, 1);
    });

    it('8 L/100km ≈ 29.40 mpg (US)', () => {
      const result = parseFloat(formulaConvert(L100km, mpgUS, '8'));
      expect(result).toBeCloseTo(29.40, 1);
    });

    it('5 L/100km ≈ 47.04 mpg (US)', () => {
      const result = parseFloat(formulaConvert(L100km, mpgUS, '5'));
      expect(result).toBeCloseTo(47.04, 1);
    });

    it('15 L/100km ≈ 15.68 mpg (US) (SUV)', () => {
      const result = parseFloat(formulaConvert(L100km, mpgUS, '15'));
      expect(result).toBeCloseTo(15.68, 1);
    });
  });

  describe('Round-trip conversions', () => {
    const mpgUS = findUnit(fuelEconomyUnits, 'miles-per-gallon-us');
    const L100km = findUnit(fuelEconomyUnits, 'liters-per-100km');
    const kmL = findUnit(fuelEconomyUnits, 'kilometers-per-liter');

    it('mpg → L/100km → mpg should return original', () => {
      const intermediate = formulaConvert(mpgUS, L100km, '30');
      const result = parseFloat(formulaConvert(L100km, mpgUS, intermediate));
      expect(result).toBeCloseTo(30, 3);
    });

    it('L/100km → km/L → L/100km should return original', () => {
      const intermediate = formulaConvert(L100km, kmL, '8');
      const result = parseFloat(formulaConvert(kmL, L100km, intermediate));
      expect(result).toBeCloseTo(8, 3);
    });
  });
});

// ============================================================================
// COOKING VOLUME UNITS - All 27 units tested
// ============================================================================

describe('Cooking Volume Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(cookingVolumeUnits, 'milliliter-cooking');

  describe('All cooking volume units to base (mL)', () => {
    cookingVolumeUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to mL`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 2);
      });
    });
  });

  describe('All cooking volume units from base (mL)', () => {
    cookingVolumeUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} mL to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('US cooking measurements', () => {
    const cup = findUnit(cookingVolumeUnits, 'cup-us');
    const tbsp = findUnit(cookingVolumeUnits, 'tablespoon-us');
    const tsp = findUnit(cookingVolumeUnits, 'teaspoon-us');
    const flOz = findUnit(cookingVolumeUnits, 'fluid-ounce-us-cooking');
    const pint = findUnit(cookingVolumeUnits, 'pint-us-cooking');
    const quart = findUnit(cookingVolumeUnits, 'quart-us-cooking');
    const gallon = findUnit(cookingVolumeUnits, 'gallon-us-cooking');

    it('1 cup ≈ 236.6 mL', () => {
      expect(parseFloat(linearConvert(cup, baseUnit, '1'))).toBeCloseTo(236.6, 0);
    });

    it('1 cup = 16 tablespoons', () => {
      expect(parseFloat(linearConvert(cup, tbsp, '1'))).toBeCloseTo(16, 0);
    });

    it('1 tablespoon = 3 teaspoons', () => {
      expect(parseFloat(linearConvert(tbsp, tsp, '1'))).toBeCloseTo(3, 1);
    });

    it('1 cup = 8 fluid ounces', () => {
      expect(parseFloat(linearConvert(cup, flOz, '1'))).toBeCloseTo(8, 0);
    });

    it('1 pint = 2 cups', () => {
      expect(parseFloat(linearConvert(pint, cup, '1'))).toBeCloseTo(2, 0);
    });

    it('1 quart = 2 pints', () => {
      expect(parseFloat(linearConvert(quart, pint, '1'))).toBeCloseTo(2, 0);
    });

    it('1 quart = 4 cups', () => {
      expect(parseFloat(linearConvert(quart, cup, '1'))).toBeCloseTo(4, 0);
    });

    it('1 gallon = 4 quarts', () => {
      expect(parseFloat(linearConvert(gallon, quart, '1'))).toBeCloseTo(4, 0);
    });

    it('1 gallon = 16 cups', () => {
      expect(parseFloat(linearConvert(gallon, cup, '1'))).toBeCloseTo(16, 0);
    });

    it('1 gallon ≈ 3785 mL', () => {
      expect(parseFloat(linearConvert(gallon, baseUnit, '1'))).toBeCloseTo(3785, 0);
    });
  });

  describe('Metric cooking measurements', () => {
    const metricCup = findUnit(cookingVolumeUnits, 'metric-cup');
    const metricTbsp = findUnit(cookingVolumeUnits, 'metric-tablespoon');
    const metricTsp = findUnit(cookingVolumeUnits, 'metric-teaspoon');
    const liter = findUnit(cookingVolumeUnits, 'liter-cooking');
    const dL = findUnit(cookingVolumeUnits, 'deciliter');
    const cL = findUnit(cookingVolumeUnits, 'centiliter');

    it('1 metric cup = 250 mL', () => {
      expect(parseFloat(linearConvert(metricCup, baseUnit, '1'))).toBeCloseTo(250, 0);
    });

    it('1 metric tablespoon = 15 mL', () => {
      expect(parseFloat(linearConvert(metricTbsp, baseUnit, '1'))).toBeCloseTo(15, 0);
    });

    it('1 metric teaspoon = 5 mL', () => {
      expect(parseFloat(linearConvert(metricTsp, baseUnit, '1'))).toBeCloseTo(5, 0);
    });

    it('1 liter = 1000 mL', () => {
      expect(parseFloat(linearConvert(liter, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 liter = 4 metric cups', () => {
      expect(parseFloat(linearConvert(liter, metricCup, '1'))).toBeCloseTo(4, 0);
    });

    it('1 dL = 100 mL', () => {
      expect(parseFloat(linearConvert(dL, baseUnit, '1'))).toBeCloseTo(100, 0);
    });

    it('1 cL = 10 mL', () => {
      expect(parseFloat(linearConvert(cL, baseUnit, '1'))).toBeCloseTo(10, 0);
    });
  });

  describe('Imperial (UK) cooking measurements', () => {
    const impCup = findUnit(cookingVolumeUnits, 'imperial-cup');
    const impFlOz = findUnit(cookingVolumeUnits, 'imperial-fluid-ounce');
    const impPint = findUnit(cookingVolumeUnits, 'imperial-pint');

    it('1 imperial cup ≈ 284 mL', () => {
      expect(parseFloat(linearConvert(impCup, baseUnit, '1'))).toBeCloseTo(284, 0);
    });

    it('1 imperial pint ≈ 568 mL', () => {
      expect(parseFloat(linearConvert(impPint, baseUnit, '1'))).toBeCloseTo(568, 0);
    });

    it('1 imperial pint = 2 imperial cups', () => {
      expect(parseFloat(linearConvert(impPint, impCup, '1'))).toBeCloseTo(2, 0);
    });

    it('1 imperial pint = 20 imperial fl oz', () => {
      expect(parseFloat(linearConvert(impPint, impFlOz, '1'))).toBeCloseTo(20, 0);
    });

    it('imperial cup > US cup', () => {
      const usCup = findUnit(cookingVolumeUnits, 'cup-us');
      const impInMl = impCup.toBase as number;
      const usInMl = usCup.toBase as number;
      expect(impInMl).toBeGreaterThan(usInMl);
    });
  });

  describe('Small cooking measurements', () => {
    const pinch = findUnit(cookingVolumeUnits, 'pinch');
    const dash = findUnit(cookingVolumeUnits, 'dash');
    const drop = findUnit(cookingVolumeUnits, 'drop');
    const tsp = findUnit(cookingVolumeUnits, 'teaspoon-us');

    it('1 pinch ≈ 0.31 mL', () => {
      expect(parseFloat(linearConvert(pinch, baseUnit, '1'))).toBeCloseTo(0.31, 2);
    });

    it('1 dash ≈ 0.62 mL', () => {
      expect(parseFloat(linearConvert(dash, baseUnit, '1'))).toBeCloseTo(0.62, 2);
    });

    it('1 drop ≈ 0.05 mL', () => {
      expect(parseFloat(linearConvert(drop, baseUnit, '1'))).toBeCloseTo(0.05, 2);
    });

    it('16 pinches ≈ 1 teaspoon', () => {
      expect(parseFloat(linearConvert(pinch, tsp, '16'))).toBeCloseTo(1, 0);
    });
  });

  describe('Recipe conversions', () => {
    const cup = findUnit(cookingVolumeUnits, 'cup-us');
    const metricCup = findUnit(cookingVolumeUnits, 'metric-cup');
    const tbsp = findUnit(cookingVolumeUnits, 'tablespoon-us');

    it('1 US cup ≈ 0.95 metric cups', () => {
      expect(parseFloat(linearConvert(cup, metricCup, '1'))).toBeCloseTo(0.95, 1);
    });

    it('2 tbsp ≈ 30 mL', () => {
      expect(parseFloat(linearConvert(tbsp, baseUnit, '2'))).toBeCloseTo(29.6, 0);
    });
  });

  describe('Round-trip conversions', () => {
    const cup = findUnit(cookingVolumeUnits, 'cup-us');
    const tbsp = findUnit(cookingVolumeUnits, 'tablespoon-us');

    it('cup → tbsp → cup should return original', () => {
      const intermediate = linearConvert(cup, tbsp, '2');
      const result = parseFloat(linearConvert(tbsp, cup, intermediate));
      expect(result).toBeCloseTo(2, 5);
    });
  });
});

// ============================================================================
// COOKING WEIGHT UNITS - All 6 units tested
// ============================================================================

describe('Cooking Weight Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(cookingWeightUnits, 'gram-cooking');

  describe('All cooking weight units to base (gram)', () => {
    cookingWeightUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to grams`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 2);
      });
    });
  });

  describe('All cooking weight units from base (gram)', () => {
    cookingWeightUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} g to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const kg = findUnit(cookingWeightUnits, 'kilogram-cooking');
    const mg = findUnit(cookingWeightUnits, 'milligram-cooking');
    const oz = findUnit(cookingWeightUnits, 'ounce-cooking');
    const lb = findUnit(cookingWeightUnits, 'pound-cooking');
    const stick = findUnit(cookingWeightUnits, 'stick-butter');

    it('1 kg = 1000 g', () => {
      expect(parseFloat(linearConvert(kg, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 g = 1000 mg', () => {
      expect(parseFloat(linearConvert(baseUnit, mg, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 oz ≈ 28.35 g', () => {
      expect(parseFloat(linearConvert(oz, baseUnit, '1'))).toBeCloseTo(28.35, 1);
    });

    it('1 lb = 16 oz', () => {
      expect(parseFloat(linearConvert(lb, oz, '1'))).toBeCloseTo(16, 0);
    });

    it('1 lb ≈ 453.6 g', () => {
      expect(parseFloat(linearConvert(lb, baseUnit, '1'))).toBeCloseTo(453.6, 0);
    });

    it('1 stick butter = 113.4 g (US)', () => {
      expect(parseFloat(linearConvert(stick, baseUnit, '1'))).toBeCloseTo(113.4, 1);
    });

    it('1 stick butter = 4 oz', () => {
      expect(parseFloat(linearConvert(stick, oz, '1'))).toBeCloseTo(4, 0);
    });

    it('2 sticks butter = 1 cup butter ≈ 227 g', () => {
      expect(parseFloat(linearConvert(stick, baseUnit, '2'))).toBeCloseTo(226.8, 0);
    });
  });

  describe('Recipe conversions', () => {
    const oz = findUnit(cookingWeightUnits, 'ounce-cooking');
    const lb = findUnit(cookingWeightUnits, 'pound-cooking');

    it('8 oz flour ≈ 227 g', () => {
      expect(parseFloat(linearConvert(oz, baseUnit, '8'))).toBeCloseTo(227, 0);
    });

    it('2.2 lb = 1 kg', () => {
      const kg = findUnit(cookingWeightUnits, 'kilogram-cooking');
      expect(parseFloat(linearConvert(lb, kg, '2.2'))).toBeCloseTo(1, 1);
    });

    it('500 g ≈ 1.1 lb', () => {
      expect(parseFloat(linearConvert(baseUnit, lb, '500'))).toBeCloseTo(1.1, 1);
    });
  });

  describe('Round-trip conversions', () => {
    const lb = findUnit(cookingWeightUnits, 'pound-cooking');

    it('g → lb → g should return original', () => {
      const intermediate = linearConvert(baseUnit, lb, '500');
      const result = parseFloat(linearConvert(lb, baseUnit, intermediate));
      expect(result).toBeCloseTo(500, 3);
    });
  });
});

// ============================================================================
// DURATION / TIME UNITS - All 14 units tested
// ============================================================================

describe('Duration Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(durationUnits, 'second');

  describe('All duration units to base (second)', () => {
    durationUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to seconds`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 0);
      });
    });
  });

  describe('All duration units from base (second)', () => {
    durationUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} s to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Small time units', () => {
    const ms = findUnit(durationUnits, 'millisecond');
    const us = findUnit(durationUnits, 'microsecond');
    const ns = findUnit(durationUnits, 'nanosecond');

    it('1 s = 1000 ms', () => {
      expect(parseFloat(linearConvert(baseUnit, ms, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 ms = 1000 μs', () => {
      expect(parseFloat(linearConvert(ms, us, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 μs = 1000 ns', () => {
      expect(parseFloat(linearConvert(us, ns, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 s = 1,000,000,000 ns', () => {
      expect(parseFloat(linearConvert(baseUnit, ns, '1'))).toBeCloseTo(1e9, 0);
    });
  });

  describe('Common time conversions', () => {
    const minute = findUnit(durationUnits, 'minute');
    const hour = findUnit(durationUnits, 'hour');
    const day = findUnit(durationUnits, 'day');
    const week = findUnit(durationUnits, 'week');

    it('1 minute = 60 seconds', () => {
      expect(parseFloat(linearConvert(minute, baseUnit, '1'))).toBeCloseTo(60, 0);
    });

    it('1 hour = 60 minutes', () => {
      expect(parseFloat(linearConvert(hour, minute, '1'))).toBeCloseTo(60, 0);
    });

    it('1 hour = 3600 seconds', () => {
      expect(parseFloat(linearConvert(hour, baseUnit, '1'))).toBeCloseTo(3600, 0);
    });

    it('1 day = 24 hours', () => {
      expect(parseFloat(linearConvert(day, hour, '1'))).toBeCloseTo(24, 0);
    });

    it('1 day = 86,400 seconds', () => {
      expect(parseFloat(linearConvert(day, baseUnit, '1'))).toBeCloseTo(86400, 0);
    });

    it('1 week = 7 days', () => {
      expect(parseFloat(linearConvert(week, day, '1'))).toBeCloseTo(7, 0);
    });

    it('1 week = 168 hours', () => {
      expect(parseFloat(linearConvert(week, hour, '1'))).toBeCloseTo(168, 0);
    });
  });

  describe('Longer time periods', () => {
    const month = findUnit(durationUnits, 'month');
    const year = findUnit(durationUnits, 'year');
    const decade = findUnit(durationUnits, 'decade');
    const century = findUnit(durationUnits, 'century');
    const millennium = findUnit(durationUnits, 'millennium');
    const day = findUnit(durationUnits, 'day');

    it('1 month ≈ 30.44 days (average)', () => {
      expect(parseFloat(linearConvert(month, day, '1'))).toBeCloseTo(30.44, 1);
    });

    it('1 year ≈ 365.25 days (average)', () => {
      expect(parseFloat(linearConvert(year, day, '1'))).toBeCloseTo(365.25, 1);
    });

    it('1 year ≈ 12 months', () => {
      expect(parseFloat(linearConvert(year, month, '1'))).toBeCloseTo(12, 0);
    });

    it('1 decade = 10 years', () => {
      expect(parseFloat(linearConvert(decade, year, '1'))).toBeCloseTo(10, 0);
    });

    it('1 century = 100 years', () => {
      expect(parseFloat(linearConvert(century, year, '1'))).toBeCloseTo(100, 0);
    });

    it('1 millennium = 1000 years', () => {
      expect(parseFloat(linearConvert(millennium, year, '1'))).toBeCloseTo(1000, 0);
    });
  });

  describe('Special durations', () => {
    const fortnight = findUnit(durationUnits, 'fortnight');
    const day = findUnit(durationUnits, 'day');
    const week = findUnit(durationUnits, 'week');

    it('1 fortnight = 14 days', () => {
      expect(parseFloat(linearConvert(fortnight, day, '1'))).toBeCloseTo(14, 0);
    });

    it('1 fortnight = 2 weeks', () => {
      expect(parseFloat(linearConvert(fortnight, week, '1'))).toBeCloseTo(2, 0);
    });
  });

  describe('Real-world scenarios', () => {
    const hour = findUnit(durationUnits, 'hour');
    const minute = findUnit(durationUnits, 'minute');
    const year = findUnit(durationUnits, 'year');
    const day = findUnit(durationUnits, 'day');

    it('marathon: 4 hours = 240 minutes', () => {
      expect(parseFloat(linearConvert(hour, minute, '4'))).toBeCloseTo(240, 0);
    });

    it('work week: 40 hours = 144,000 seconds', () => {
      expect(parseFloat(linearConvert(hour, baseUnit, '40'))).toBeCloseTo(144000, 0);
    });

    it('human lifespan: 80 years ≈ 29,219 days', () => {
      // 80 years × 365.2425 days/year ≈ 29,219.4 days
      expect(parseFloat(linearConvert(year, day, '80'))).toBeCloseTo(29219, 0);
    });
  });

  describe('Round-trip conversions', () => {
    const hour = findUnit(durationUnits, 'hour');
    const minute = findUnit(durationUnits, 'minute');

    it('hour → minute → hour should return original', () => {
      const intermediate = linearConvert(hour, minute, '10');
      const result = parseFloat(linearConvert(minute, hour, intermediate));
      expect(result).toBeCloseTo(10, 5);
    });
  });
});

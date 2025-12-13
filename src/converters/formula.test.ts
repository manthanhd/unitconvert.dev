import { describe, it, expect } from 'vitest';
import { formulaConvert } from './formula';
import { createFormulaUnit } from '../test/helpers';

describe('formulaConvert', () => {
  // Define fuel economy units with formulas from production
  const kmPerLiter = createFormulaUnit(
    'kilometers-per-liter',
    'fuel-economy',
    (v) => v,
    (v) => v
  );

  const mpgUS = createFormulaUnit(
    'miles-per-gallon-us',
    'fuel-economy',
    (v) => v * 0.425144,
    (v) => v / 0.425144
  );

  const mpgImperial = createFormulaUnit(
    'miles-per-gallon-imperial',
    'fuel-economy',
    (v) => v * 0.354006,
    (v) => v / 0.354006
  );

  const litersPer100km = createFormulaUnit(
    'liters-per-100km',
    'fuel-economy',
    (v) => 100 / v,
    (v) => 100 / v
  );

  describe('MPG (US) to L/100km conversions', () => {
    it('should convert 30 mpg (US) to approximately 7.84 L/100km', () => {
      const result = parseFloat(formulaConvert(mpgUS, litersPer100km, '30'));
      expect(result).toBeCloseTo(7.84, 1);
    });

    it('should convert 25 mpg (US) to approximately 9.41 L/100km', () => {
      const result = parseFloat(formulaConvert(mpgUS, litersPer100km, '25'));
      expect(result).toBeCloseTo(9.41, 1);
    });

    it('should convert 20 mpg (US) to approximately 11.76 L/100km', () => {
      const result = parseFloat(formulaConvert(mpgUS, litersPer100km, '20'));
      expect(result).toBeCloseTo(11.76, 1);
    });

    it('should convert 50 mpg (US) to approximately 4.70 L/100km', () => {
      const result = parseFloat(formulaConvert(mpgUS, litersPer100km, '50'));
      expect(result).toBeCloseTo(4.70, 1);
    });

    it('should convert 40 mpg (US) to approximately 5.88 L/100km', () => {
      const result = parseFloat(formulaConvert(mpgUS, litersPer100km, '40'));
      expect(result).toBeCloseTo(5.88, 1);
    });
  });

  describe('L/100km to MPG (US) conversions', () => {
    it('should convert 10 L/100km to approximately 23.52 mpg (US)', () => {
      const result = parseFloat(formulaConvert(litersPer100km, mpgUS, '10'));
      expect(result).toBeCloseTo(23.52, 1);
    });

    it('should convert 5 L/100km to approximately 47.04 mpg (US)', () => {
      const result = parseFloat(formulaConvert(litersPer100km, mpgUS, '5'));
      expect(result).toBeCloseTo(47.04, 1);
    });

    it('should convert 8 L/100km to approximately 29.40 mpg (US)', () => {
      const result = parseFloat(formulaConvert(litersPer100km, mpgUS, '8'));
      expect(result).toBeCloseTo(29.40, 1);
    });

    it('should convert 15 L/100km to approximately 15.68 mpg (US)', () => {
      const result = parseFloat(formulaConvert(litersPer100km, mpgUS, '15'));
      expect(result).toBeCloseTo(15.68, 1);
    });
  });

  describe('km/L conversions', () => {
    it('should convert 10 km/L to approximately 23.52 mpg (US)', () => {
      const result = parseFloat(formulaConvert(kmPerLiter, mpgUS, '10'));
      expect(result).toBeCloseTo(23.52, 1);
    });

    it('should convert 15 km/L to approximately 35.28 mpg (US)', () => {
      const result = parseFloat(formulaConvert(kmPerLiter, mpgUS, '15'));
      expect(result).toBeCloseTo(35.28, 1);
    });

    it('should convert 10 km/L to 10 L/100km', () => {
      const result = parseFloat(formulaConvert(kmPerLiter, litersPer100km, '10'));
      expect(result).toBeCloseTo(10, 5);
    });

    it('should convert 20 km/L to 5 L/100km', () => {
      const result = parseFloat(formulaConvert(kmPerLiter, litersPer100km, '20'));
      expect(result).toBeCloseTo(5, 5);
    });
  });

  describe('US vs Imperial MPG', () => {
    it('should convert 30 mpg (US) to approximately 36.03 mpg (Imperial)', () => {
      // US gallon is smaller than Imperial, so Imperial MPG is higher
      const result = parseFloat(formulaConvert(mpgUS, mpgImperial, '30'));
      expect(result).toBeCloseTo(36.03, 1);
    });

    it('should convert 30 mpg (Imperial) to approximately 24.98 mpg (US)', () => {
      const result = parseFloat(formulaConvert(mpgImperial, mpgUS, '30'));
      expect(result).toBeCloseTo(24.98, 1);
    });
  });

  describe('Edge cases', () => {
    it('should return empty string for NaN input', () => {
      expect(formulaConvert(mpgUS, litersPer100km, 'abc')).toBe('');
    });

    it('should return empty string for empty input', () => {
      expect(formulaConvert(mpgUS, litersPer100km, '')).toBe('');
    });

    it('should handle division by zero gracefully (L/100km with 0)', () => {
      // 0 L/100km would mean infinite km/L
      const result = formulaConvert(litersPer100km, kmPerLiter, '0');
      expect(result).toBe('Invalid');
    });

    it('should handle zero mpg to L/100km (division by zero in reverse)', () => {
      // 0 mpg means 0 km/L, then 100/0 = Infinity
      const result = formulaConvert(mpgUS, litersPer100km, '0');
      expect(result).toBe('Invalid');
    });

    it('should return error if toBaseFormula is missing', () => {
      const invalid = {
        id: 'invalid',
        categoryId: 'fuel-economy',
        name: 'Invalid',
        abbreviations: [] as string[],
        aliases: [] as string[],
      };
      expect(formulaConvert(invalid, mpgUS, '30')).toBe('Error: Missing formula');
    });

    it('should return error if fromBaseFormula is missing', () => {
      const invalid = {
        id: 'invalid',
        categoryId: 'fuel-economy',
        name: 'Invalid',
        abbreviations: [] as string[],
        aliases: [] as string[],
      };
      expect(formulaConvert(mpgUS, invalid, '30')).toBe('Error: Missing formula');
    });
  });

  describe('Round-trip conversions', () => {
    it('should return original value after mpg -> L/100km -> mpg', () => {
      const intermediate = formulaConvert(mpgUS, litersPer100km, '30');
      const result = parseFloat(formulaConvert(litersPer100km, mpgUS, intermediate));
      expect(result).toBeCloseTo(30, 3);
    });

    it('should return original value after L/100km -> km/L -> L/100km', () => {
      const intermediate = formulaConvert(litersPer100km, kmPerLiter, '8');
      const result = parseFloat(formulaConvert(kmPerLiter, litersPer100km, intermediate));
      expect(result).toBeCloseTo(8, 3);
    });

    it('should return original value after mpgUS -> mpgImp -> mpgUS', () => {
      const intermediate = formulaConvert(mpgUS, mpgImperial, '25');
      const result = parseFloat(formulaConvert(mpgImperial, mpgUS, intermediate));
      expect(result).toBeCloseTo(25, 3);
    });

    it('should return original value after km/L -> mpg -> km/L', () => {
      const intermediate = formulaConvert(kmPerLiter, mpgUS, '12');
      const result = parseFloat(formulaConvert(mpgUS, kmPerLiter, intermediate));
      expect(result).toBeCloseTo(12, 3);
    });
  });

  describe('Same unit conversion', () => {
    it('should return same value when converting mpg to mpg', () => {
      const result = parseFloat(formulaConvert(mpgUS, mpgUS, '30'));
      expect(result).toBeCloseTo(30, 5);
    });

    it('should return same value when converting km/L to km/L', () => {
      const result = parseFloat(formulaConvert(kmPerLiter, kmPerLiter, '15'));
      expect(result).toBeCloseTo(15, 5);
    });
  });

  describe('Decimal input handling', () => {
    it('should handle decimal mpg values', () => {
      const result = parseFloat(formulaConvert(mpgUS, litersPer100km, '27.5'));
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(15);
    });

    it('should handle decimal L/100km values', () => {
      const result = parseFloat(formulaConvert(litersPer100km, mpgUS, '7.5'));
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(50);
    });
  });
});

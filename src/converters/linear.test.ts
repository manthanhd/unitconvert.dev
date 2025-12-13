import { describe, it, expect } from 'vitest';
import { linearConvert } from './linear';
import { createLinearUnit } from '../test/helpers';

describe('linearConvert', () => {
  describe('Length conversions', () => {
    it('should convert 1 kilometer to 1000 meters', () => {
      const km = createLinearUnit('kilometer', 'length', 1000);
      const m = createLinearUnit('meter', 'length', 1);
      expect(linearConvert(km, m, '1')).toBe('1000');
    });

    it('should convert 1000 meters to 1 kilometer', () => {
      const m = createLinearUnit('meter', 'length', 1);
      const km = createLinearUnit('kilometer', 'length', 1000);
      expect(linearConvert(m, km, '1000')).toBe('1');
    });

    it('should convert 1 mile to 1609.344 meters', () => {
      const mile = createLinearUnit('mile', 'length', 1609.344);
      const m = createLinearUnit('meter', 'length', 1);
      const result = parseFloat(linearConvert(mile, m, '1'));
      // formatNumber rounds to 2 decimals for values >= 1000
      expect(result).toBeCloseTo(1609.34, 2);
    });

    it('should convert 1 foot to 0.3048 meters', () => {
      const foot = createLinearUnit('foot', 'length', 0.3048);
      const m = createLinearUnit('meter', 'length', 1);
      const result = parseFloat(linearConvert(foot, m, '1'));
      expect(result).toBeCloseTo(0.3048, 4);
    });

    it('should convert 1 inch to 2.54 centimeters', () => {
      const inch = createLinearUnit('inch', 'length', 0.0254);
      const cm = createLinearUnit('centimeter', 'length', 0.01);
      const result = parseFloat(linearConvert(inch, cm, '1'));
      expect(result).toBeCloseTo(2.54, 2);
    });

    it('should convert 1 yard to 0.9144 meters', () => {
      const yard = createLinearUnit('yard', 'length', 0.9144);
      const m = createLinearUnit('meter', 'length', 1);
      const result = parseFloat(linearConvert(yard, m, '1'));
      expect(result).toBeCloseTo(0.9144, 4);
    });

    it('should convert 5280 feet to approximately 1 mile', () => {
      const foot = createLinearUnit('foot', 'length', 0.3048);
      const mile = createLinearUnit('mile', 'length', 1609.344);
      const result = parseFloat(linearConvert(foot, mile, '5280'));
      expect(result).toBeCloseTo(1, 5);
    });

    it('should convert 12 inches to 1 foot', () => {
      const inch = createLinearUnit('inch', 'length', 0.0254);
      const foot = createLinearUnit('foot', 'length', 0.3048);
      const result = parseFloat(linearConvert(inch, foot, '12'));
      expect(result).toBeCloseTo(1, 5);
    });

    it('should convert 1 nautical mile to 1852 meters', () => {
      const nmi = createLinearUnit('nautical-mile', 'length', 1852);
      const m = createLinearUnit('meter', 'length', 1);
      expect(linearConvert(nmi, m, '1')).toBe('1852');
    });
  });

  describe('Mass conversions', () => {
    it('should convert 1 kilogram to 1000 grams', () => {
      const kg = createLinearUnit('kilogram', 'mass', 1);
      const g = createLinearUnit('gram', 'mass', 0.001);
      expect(linearConvert(kg, g, '1')).toBe('1000');
    });

    it('should convert 1 kilogram to approximately 2.20462 pounds', () => {
      const kg = createLinearUnit('kilogram', 'mass', 1);
      const lb = createLinearUnit('pound', 'mass', 0.45359237);
      const result = parseFloat(linearConvert(kg, lb, '1'));
      expect(result).toBeCloseTo(2.20462, 4);
    });

    it('should convert 1 pound to 0.45359237 kilograms', () => {
      const lb = createLinearUnit('pound', 'mass', 0.45359237);
      const kg = createLinearUnit('kilogram', 'mass', 1);
      const result = parseFloat(linearConvert(lb, kg, '1'));
      expect(result).toBeCloseTo(0.45359237, 6);
    });

    it('should convert 1 pound to 16 ounces', () => {
      const lb = createLinearUnit('pound', 'mass', 0.45359237);
      const oz = createLinearUnit('ounce', 'mass', 0.028349523125);
      const result = parseFloat(linearConvert(lb, oz, '1'));
      expect(result).toBeCloseTo(16, 5);
    });

    it('should convert 1 metric ton to 1000 kilograms', () => {
      const ton = createLinearUnit('metric-ton', 'mass', 1000);
      const kg = createLinearUnit('kilogram', 'mass', 1);
      expect(linearConvert(ton, kg, '1')).toBe('1000');
    });

    it('should convert 1 stone to 6.35029318 kilograms', () => {
      const stone = createLinearUnit('stone', 'mass', 6.35029318);
      const kg = createLinearUnit('kilogram', 'mass', 1);
      const result = parseFloat(linearConvert(stone, kg, '1'));
      expect(result).toBeCloseTo(6.35029318, 6);
    });
  });

  describe('Volume conversions', () => {
    it('should convert 1 liter to 1000 milliliters', () => {
      const L = createLinearUnit('liter', 'volume', 0.001);
      const mL = createLinearUnit('milliliter', 'volume', 0.000001);
      expect(linearConvert(L, mL, '1')).toBe('1000');
    });

    it('should convert 1 US gallon to approximately 3.785 liters', () => {
      const gal = createLinearUnit('gallon-us', 'volume', 0.003785411784);
      const L = createLinearUnit('liter', 'volume', 0.001);
      const result = parseFloat(linearConvert(gal, L, '1'));
      expect(result).toBeCloseTo(3.785411784, 6);
    });

    it('should convert 1 cubic meter to 1000 liters', () => {
      const m3 = createLinearUnit('cubic-meter', 'volume', 1);
      const L = createLinearUnit('liter', 'volume', 0.001);
      expect(linearConvert(m3, L, '1')).toBe('1000');
    });

    it('should convert 1 US quart to approximately 0.946353 liters', () => {
      const qt = createLinearUnit('quart-us', 'volume', 0.000946352946);
      const L = createLinearUnit('liter', 'volume', 0.001);
      const result = parseFloat(linearConvert(qt, L, '1'));
      expect(result).toBeCloseTo(0.946352946, 6);
    });

    it('should convert 1 US fluid ounce to approximately 29.5735 milliliters', () => {
      const floz = createLinearUnit('fluid-ounce', 'volume', 0.0000295735295625);
      const mL = createLinearUnit('milliliter', 'volume', 0.000001);
      const result = parseFloat(linearConvert(floz, mL, '1'));
      expect(result).toBeCloseTo(29.5735, 3);
    });

    it('should convert 4 quarts to 1 gallon', () => {
      const qt = createLinearUnit('quart-us', 'volume', 0.000946352946);
      const gal = createLinearUnit('gallon-us', 'volume', 0.003785411784);
      const result = parseFloat(linearConvert(qt, gal, '4'));
      expect(result).toBeCloseTo(1, 5);
    });
  });

  describe('Edge cases', () => {
    it('should return empty string for NaN input', () => {
      const m = createLinearUnit('meter', 'length', 1);
      expect(linearConvert(m, m, 'abc')).toBe('');
    });

    it('should return empty string for empty input', () => {
      const m = createLinearUnit('meter', 'length', 1);
      expect(linearConvert(m, m, '')).toBe('');
    });

    it('should handle zero correctly', () => {
      const km = createLinearUnit('kilometer', 'length', 1000);
      const m = createLinearUnit('meter', 'length', 1);
      expect(linearConvert(km, m, '0')).toBe('0');
    });

    it('should handle negative values', () => {
      const m = createLinearUnit('meter', 'length', 1);
      const km = createLinearUnit('kilometer', 'length', 1000);
      expect(linearConvert(m, km, '-1000')).toBe('-1');
    });

    it('should handle very large numbers', () => {
      const m = createLinearUnit('meter', 'length', 1);
      const km = createLinearUnit('kilometer', 'length', 1000);
      const result = linearConvert(m, km, '1e15');
      expect(parseFloat(result)).toBeCloseTo(1e12, 0);
    });

    it('should handle very small numbers', () => {
      const m = createLinearUnit('meter', 'length', 1);
      const nm = createLinearUnit('nanometer', 'length', 0.000000001);
      const result = linearConvert(nm, m, '1');
      expect(parseFloat(result)).toBeCloseTo(1e-9, 12);
    });

    it('should handle decimal input', () => {
      const km = createLinearUnit('kilometer', 'length', 1000);
      const m = createLinearUnit('meter', 'length', 1);
      expect(linearConvert(km, m, '1.5')).toBe('1500');
    });

    it('should handle scientific notation input', () => {
      const m = createLinearUnit('meter', 'length', 1);
      const km = createLinearUnit('kilometer', 'length', 1000);
      const result = parseFloat(linearConvert(m, km, '1e6'));
      expect(result).toBeCloseTo(1000, 0);
    });

    it('should return error if fromUnit.toBase is undefined', () => {
      const invalid = {
        id: 'invalid',
        categoryId: 'test',
        name: 'Invalid',
        abbreviations: [] as string[],
        aliases: [] as string[],
      };
      const m = createLinearUnit('meter', 'length', 1);
      expect(linearConvert(invalid, m, '1')).toBe('Error: Missing conversion factor');
    });

    it('should return error if toUnit.toBase is undefined', () => {
      const m = createLinearUnit('meter', 'length', 1);
      const invalid = {
        id: 'invalid',
        categoryId: 'test',
        name: 'Invalid',
        abbreviations: [] as string[],
        aliases: [] as string[],
      };
      expect(linearConvert(m, invalid, '1')).toBe('Error: Missing conversion factor');
    });
  });

  describe('Round-trip conversions', () => {
    it('should return original value after km -> m -> km', () => {
      const km = createLinearUnit('kilometer', 'length', 1000);
      const m = createLinearUnit('meter', 'length', 1);
      const intermediate = linearConvert(km, m, '5.5');
      const result = parseFloat(linearConvert(m, km, intermediate));
      expect(result).toBeCloseTo(5.5, 6);
    });

    it('should return original value after lb -> oz -> lb', () => {
      const lb = createLinearUnit('pound', 'mass', 0.45359237);
      const oz = createLinearUnit('ounce', 'mass', 0.028349523125);
      const intermediate = linearConvert(lb, oz, '2.5');
      const result = parseFloat(linearConvert(oz, lb, intermediate));
      expect(result).toBeCloseTo(2.5, 6);
    });

    it('should return original value after mile -> km -> mile', () => {
      const mile = createLinearUnit('mile', 'length', 1609.344);
      const km = createLinearUnit('kilometer', 'length', 1000);
      const intermediate = linearConvert(mile, km, '10');
      const result = parseFloat(linearConvert(km, mile, intermediate));
      expect(result).toBeCloseTo(10, 6);
    });

    it('should return original value after gal -> L -> gal', () => {
      const gal = createLinearUnit('gallon-us', 'volume', 0.003785411784);
      const L = createLinearUnit('liter', 'volume', 0.001);
      const intermediate = linearConvert(gal, L, '5');
      const result = parseFloat(linearConvert(L, gal, intermediate));
      expect(result).toBeCloseTo(5, 6);
    });
  });

  describe('Precision and formatting', () => {
    it('should handle conversion resulting in whole number', () => {
      const km = createLinearUnit('kilometer', 'length', 1000);
      const m = createLinearUnit('meter', 'length', 1);
      expect(linearConvert(km, m, '2')).toBe('2000');
    });

    it('should handle conversion resulting in decimal', () => {
      const m = createLinearUnit('meter', 'length', 1);
      const km = createLinearUnit('kilometer', 'length', 1000);
      const result = linearConvert(m, km, '500');
      expect(result).toBe('0.5');
    });

    it('should preserve precision for small values', () => {
      const m = createLinearUnit('meter', 'length', 1);
      const km = createLinearUnit('kilometer', 'length', 1000);
      const result = linearConvert(m, km, '1');
      expect(result).toBe('0.001');
    });
  });
});

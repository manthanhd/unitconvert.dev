import { describe, it, expect } from 'vitest';
import { convert } from './index';
import type { Unit } from '../data/types';

// Helper to create mock units for testing
function createMockUnit(
  id: string,
  categoryId: string,
  options: Partial<Unit> = {}
): Unit {
  return {
    id,
    categoryId,
    name: id,
    abbreviations: [],
    aliases: [],
    ...options,
  };
}

describe('convert (main entry point)', () => {
  describe('Input validation', () => {
    it('should return empty string for empty value', () => {
      const meter = createMockUnit('meter', 'length', { toBase: 1 });
      expect(convert(meter, meter, '')).toBe('');
    });

    it('should return empty string for whitespace value', () => {
      const meter = createMockUnit('meter', 'length', { toBase: 1 });
      expect(convert(meter, meter, '   ')).toBe('');
    });

    it('should return empty string for tab-only value', () => {
      const meter = createMockUnit('meter', 'length', { toBase: 1 });
      expect(convert(meter, meter, '\t')).toBe('');
    });

    it('should return error for different categories', () => {
      const meter = createMockUnit('meter', 'length', { toBase: 1 });
      const celsius = createMockUnit('celsius', 'temperature', {
        toBaseFormula: (c) => c + 273.15,
        fromBaseFormula: (k) => k - 273.15,
      });
      expect(convert(meter, celsius, '100')).toBe('Error: Units must be in the same category');
    });

    it('should return error when from category differs from to category', () => {
      const kg = createMockUnit('kilogram', 'mass', { toBase: 1 });
      const liter = createMockUnit('liter', 'volume', { toBase: 0.001 });
      expect(convert(kg, liter, '10')).toBe('Error: Units must be in the same category');
    });
  });

  describe('Converter routing - Linear', () => {
    it('should route length to linear converter', () => {
      const km = createMockUnit('kilometer', 'length', { toBase: 1000 });
      const m = createMockUnit('meter', 'length', { toBase: 1 });
      const result = convert(km, m, '1');
      expect(result).toBe('1000');
    });

    it('should route mass to linear converter', () => {
      const kg = createMockUnit('kilogram', 'mass', { toBase: 1 });
      const g = createMockUnit('gram', 'mass', { toBase: 0.001 });
      const result = convert(kg, g, '1');
      expect(result).toBe('1000');
    });

    it('should route volume to linear converter', () => {
      const L = createMockUnit('liter', 'volume', { toBase: 0.001 });
      const mL = createMockUnit('milliliter', 'volume', { toBase: 0.000001 });
      const result = convert(L, mL, '1');
      expect(result).toBe('1000');
    });
  });

  describe('Converter routing - Temperature (offset)', () => {
    it('should route temperature to offset converter', () => {
      const celsius = createMockUnit('celsius', 'temperature', {
        toBaseFormula: (c) => c + 273.15,
        fromBaseFormula: (k) => k - 273.15,
      });
      const fahrenheit = createMockUnit('fahrenheit', 'temperature', {
        toBaseFormula: (f) => (f - 32) * (5 / 9) + 273.15,
        fromBaseFormula: (k) => (k - 273.15) * (9 / 5) + 32,
      });
      const result = parseFloat(convert(celsius, fahrenheit, '0'));
      expect(result).toBeCloseTo(32, 5);
    });
  });

  describe('Converter routing - Formula', () => {
    it('should route fuel economy to formula converter', () => {
      const kmPerLiter = createMockUnit('km-per-liter', 'fuel-economy', {
        toBaseFormula: (v) => v,
        fromBaseFormula: (v) => v,
      });
      const litersPer100km = createMockUnit('liters-per-100km', 'fuel-economy', {
        toBaseFormula: (v) => 100 / v,
        fromBaseFormula: (v) => 100 / v,
      });
      const result = parseFloat(convert(kmPerLiter, litersPer100km, '10'));
      expect(result).toBeCloseTo(10, 5);
    });
  });

  describe('Converter routing - Base', () => {
    it('should route number base to base converter', () => {
      const decimal = createMockUnit('decimal', 'number-base', { toBase: 10 });
      const binary = createMockUnit('binary', 'number-base', { toBase: 2 });
      const result = convert(decimal, binary, '10');
      expect(result).toBe('0b1010');
    });
  });

  describe('Converter routing - Color', () => {
    it('should route color to color converter', () => {
      const hex = createMockUnit('color-hex', 'color');
      const rgb = createMockUnit('color-rgb', 'color');
      const result = convert(hex, rgb, '#FF0000');
      expect(result).toBe('rgb(255, 0, 0)');
    });
  });

  describe('Converter routing - Timezone', () => {
    it('should route timezone to timezone converter', () => {
      const utc = createMockUnit('utc', 'timezone', { iana: 'UTC' });
      const tokyo = createMockUnit('tokyo', 'timezone', { iana: 'Asia/Tokyo' });
      // Using Z suffix for explicit UTC input
      const result = convert(utc, tokyo, '2024-01-15T12:00:00Z');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
      // Tokyo is UTC+9, so 12:00Z becomes 21:00 JST
      expect(result).toMatch(/21:00:00/);
    });
  });

  describe('Error handling', () => {
    it('should return error for unknown category', () => {
      const unknown = createMockUnit('unknown', 'nonexistent-category', { toBase: 1 });
      const result = convert(unknown, unknown, '100');
      expect(result).toBe('Error: Unknown category');
    });
  });

  describe('Decimal handling', () => {
    it('should handle decimal input for linear conversion', () => {
      const km = createMockUnit('kilometer', 'length', { toBase: 1000 });
      const m = createMockUnit('meter', 'length', { toBase: 1 });
      const result = convert(km, m, '1.5');
      expect(result).toBe('1500');
    });

    it('should handle negative input for linear conversion', () => {
      const m = createMockUnit('meter', 'length', { toBase: 1 });
      const km = createMockUnit('kilometer', 'length', { toBase: 1000 });
      const result = convert(m, km, '-1000');
      expect(result).toBe('-1');
    });
  });

  describe('Same unit conversion', () => {
    it('should return same value when converting unit to itself', () => {
      const m = createMockUnit('meter', 'length', { toBase: 1 });
      expect(convert(m, m, '100')).toBe('100');
    });

    it('should handle temperature same unit conversion', () => {
      const celsius = createMockUnit('celsius', 'temperature', {
        toBaseFormula: (c) => c + 273.15,
        fromBaseFormula: (k) => k - 273.15,
      });
      const result = parseFloat(convert(celsius, celsius, '25'));
      expect(result).toBeCloseTo(25, 5);
    });
  });
});

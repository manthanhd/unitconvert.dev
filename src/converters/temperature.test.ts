import { describe, it, expect } from 'vitest';
import { temperatureConvert } from './temperature';
import { createTemperatureUnit } from '../test/helpers';

describe('temperatureConvert', () => {
  // Define temperature units with actual formulas from production
  const kelvin = createTemperatureUnit(
    'kelvin',
    (k) => k,
    (k) => k
  );

  const celsius = createTemperatureUnit(
    'celsius',
    (c) => c + 273.15,
    (k) => k - 273.15
  );

  const fahrenheit = createTemperatureUnit(
    'fahrenheit',
    (f) => (f - 32) * (5 / 9) + 273.15,
    (k) => (k - 273.15) * (9 / 5) + 32
  );

  const rankine = createTemperatureUnit(
    'rankine',
    (r) => r * (5 / 9),
    (k) => k * (9 / 5)
  );

  const reaumur = createTemperatureUnit(
    'reaumur',
    (re) => re * (5 / 4) + 273.15,
    (k) => (k - 273.15) * (4 / 5)
  );

  describe('Celsius to Fahrenheit', () => {
    it('should convert 0°C to 32°F (water freezing)', () => {
      const result = parseFloat(temperatureConvert(celsius, fahrenheit, '0'));
      expect(result).toBeCloseTo(32, 5);
    });

    it('should convert 100°C to 212°F (water boiling)', () => {
      const result = parseFloat(temperatureConvert(celsius, fahrenheit, '100'));
      expect(result).toBeCloseTo(212, 5);
    });

    it('should convert -40°C to -40°F (equal point)', () => {
      const result = parseFloat(temperatureConvert(celsius, fahrenheit, '-40'));
      expect(result).toBeCloseTo(-40, 5);
    });

    it('should convert 37°C to approximately 98.6°F (body temperature)', () => {
      const result = parseFloat(temperatureConvert(celsius, fahrenheit, '37'));
      expect(result).toBeCloseTo(98.6, 1);
    });

    it('should convert 20°C to 68°F (room temperature)', () => {
      const result = parseFloat(temperatureConvert(celsius, fahrenheit, '20'));
      expect(result).toBeCloseTo(68, 5);
    });

    it('should convert 25°C to 77°F', () => {
      const result = parseFloat(temperatureConvert(celsius, fahrenheit, '25'));
      expect(result).toBeCloseTo(77, 5);
    });
  });

  describe('Fahrenheit to Celsius', () => {
    it('should convert 32°F to 0°C', () => {
      const result = parseFloat(temperatureConvert(fahrenheit, celsius, '32'));
      expect(result).toBeCloseTo(0, 5);
    });

    it('should convert 212°F to 100°C', () => {
      const result = parseFloat(temperatureConvert(fahrenheit, celsius, '212'));
      expect(result).toBeCloseTo(100, 5);
    });

    it('should convert 98.6°F to 37°C', () => {
      const result = parseFloat(temperatureConvert(fahrenheit, celsius, '98.6'));
      expect(result).toBeCloseTo(37, 1);
    });

    it('should convert 0°F to approximately -17.78°C', () => {
      const result = parseFloat(temperatureConvert(fahrenheit, celsius, '0'));
      expect(result).toBeCloseTo(-17.778, 2);
    });

    it('should convert 68°F to 20°C', () => {
      const result = parseFloat(temperatureConvert(fahrenheit, celsius, '68'));
      expect(result).toBeCloseTo(20, 5);
    });
  });

  describe('Kelvin conversions', () => {
    it('should convert 0K to -273.15°C (absolute zero)', () => {
      const result = parseFloat(temperatureConvert(kelvin, celsius, '0'));
      expect(result).toBeCloseTo(-273.15, 2);
    });

    it('should convert 273.15K to 0°C', () => {
      const result = parseFloat(temperatureConvert(kelvin, celsius, '273.15'));
      expect(result).toBeCloseTo(0, 5);
    });

    it('should convert 373.15K to 100°C', () => {
      const result = parseFloat(temperatureConvert(kelvin, celsius, '373.15'));
      expect(result).toBeCloseTo(100, 5);
    });

    it('should convert 0K to approximately -459.67°F', () => {
      const result = parseFloat(temperatureConvert(kelvin, fahrenheit, '0'));
      expect(result).toBeCloseTo(-459.67, 1);
    });

    it('should convert 273.15K to 32°F', () => {
      const result = parseFloat(temperatureConvert(kelvin, fahrenheit, '273.15'));
      expect(result).toBeCloseTo(32, 5);
    });

    it('should convert 373.15K to 212°F', () => {
      const result = parseFloat(temperatureConvert(kelvin, fahrenheit, '373.15'));
      expect(result).toBeCloseTo(212, 5);
    });
  });

  describe('Celsius to Kelvin', () => {
    it('should convert 0°C to 273.15K', () => {
      const result = parseFloat(temperatureConvert(celsius, kelvin, '0'));
      expect(result).toBeCloseTo(273.15, 2);
    });

    it('should convert 100°C to 373.15K', () => {
      const result = parseFloat(temperatureConvert(celsius, kelvin, '100'));
      expect(result).toBeCloseTo(373.15, 2);
    });

    it('should convert -273.15°C to 0K', () => {
      const result = parseFloat(temperatureConvert(celsius, kelvin, '-273.15'));
      expect(result).toBeCloseTo(0, 5);
    });
  });

  describe('Rankine conversions', () => {
    it('should convert 0R to 0K', () => {
      const result = parseFloat(temperatureConvert(rankine, kelvin, '0'));
      expect(result).toBeCloseTo(0, 5);
    });

    it('should convert 491.67R to approximately 273.15K (water freezing)', () => {
      const result = parseFloat(temperatureConvert(rankine, kelvin, '491.67'));
      expect(result).toBeCloseTo(273.15, 1);
    });

    it('should convert 671.67R to approximately 373.15K (water boiling)', () => {
      const result = parseFloat(temperatureConvert(rankine, kelvin, '671.67'));
      expect(result).toBeCloseTo(373.15, 1);
    });

    it('should convert 0K to 0R', () => {
      const result = parseFloat(temperatureConvert(kelvin, rankine, '0'));
      expect(result).toBeCloseTo(0, 5);
    });

    it('should convert 273.15K to approximately 491.67R', () => {
      const result = parseFloat(temperatureConvert(kelvin, rankine, '273.15'));
      expect(result).toBeCloseTo(491.67, 1);
    });
  });

  describe('Réaumur conversions', () => {
    it('should convert 0°Ré to 0°C', () => {
      const result = parseFloat(temperatureConvert(reaumur, celsius, '0'));
      expect(result).toBeCloseTo(0, 5);
    });

    it('should convert 80°Ré to 100°C (water boiling)', () => {
      const result = parseFloat(temperatureConvert(reaumur, celsius, '80'));
      expect(result).toBeCloseTo(100, 5);
    });

    it('should convert 0°C to 0°Ré', () => {
      const result = parseFloat(temperatureConvert(celsius, reaumur, '0'));
      expect(result).toBeCloseTo(0, 5);
    });

    it('should convert 100°C to 80°Ré', () => {
      const result = parseFloat(temperatureConvert(celsius, reaumur, '100'));
      expect(result).toBeCloseTo(80, 5);
    });
  });

  describe('Edge cases', () => {
    it('should return empty string for NaN input', () => {
      expect(temperatureConvert(celsius, fahrenheit, 'abc')).toBe('');
    });

    it('should return empty string for empty input', () => {
      expect(temperatureConvert(celsius, fahrenheit, '')).toBe('');
    });

    it('should handle decimal inputs', () => {
      const result = parseFloat(temperatureConvert(celsius, fahrenheit, '25.5'));
      expect(result).toBeCloseTo(77.9, 1);
    });

    it('should handle negative decimal inputs', () => {
      const result = parseFloat(temperatureConvert(celsius, fahrenheit, '-10.5'));
      expect(result).toBeCloseTo(13.1, 1);
    });

    it('should return error if toBaseFormula is missing', () => {
      const invalid = {
        id: 'invalid',
        categoryId: 'temperature',
        name: 'Invalid',
        abbreviations: [] as string[],
        aliases: [] as string[],
      };
      expect(temperatureConvert(invalid, celsius, '0')).toBe('Error: Missing temperature formula');
    });

    it('should return error if fromBaseFormula is missing', () => {
      const invalid = {
        id: 'invalid',
        categoryId: 'temperature',
        name: 'Invalid',
        abbreviations: [] as string[],
        aliases: [] as string[],
      };
      expect(temperatureConvert(celsius, invalid, '0')).toBe('Error: Missing temperature formula');
    });
  });

  describe('Round-trip conversions', () => {
    it('should return original value after C -> F -> C', () => {
      const intermediate = temperatureConvert(celsius, fahrenheit, '25.5');
      const result = parseFloat(temperatureConvert(fahrenheit, celsius, intermediate));
      expect(result).toBeCloseTo(25.5, 5);
    });

    it('should return original value after K -> C -> K', () => {
      const intermediate = temperatureConvert(kelvin, celsius, '300');
      const result = parseFloat(temperatureConvert(celsius, kelvin, intermediate));
      expect(result).toBeCloseTo(300, 5);
    });

    it('should return original value after F -> K -> F', () => {
      const intermediate = temperatureConvert(fahrenheit, kelvin, '72');
      const result = parseFloat(temperatureConvert(kelvin, fahrenheit, intermediate));
      expect(result).toBeCloseTo(72, 5);
    });

    it('should return original value after C -> R -> C', () => {
      const intermediate = temperatureConvert(celsius, rankine, '50');
      const result = parseFloat(temperatureConvert(rankine, celsius, intermediate));
      expect(result).toBeCloseTo(50, 5);
    });

    it('should return original value after C -> Ré -> C', () => {
      const intermediate = temperatureConvert(celsius, reaumur, '50');
      const result = parseFloat(temperatureConvert(reaumur, celsius, intermediate));
      expect(result).toBeCloseTo(50, 5);
    });
  });

  describe('Same unit conversion', () => {
    it('should return same value when converting C to C', () => {
      const result = parseFloat(temperatureConvert(celsius, celsius, '25'));
      expect(result).toBeCloseTo(25, 5);
    });

    it('should return same value when converting K to K', () => {
      const result = parseFloat(temperatureConvert(kelvin, kelvin, '300'));
      expect(result).toBeCloseTo(300, 5);
    });

    it('should return same value when converting F to F', () => {
      const result = parseFloat(temperatureConvert(fahrenheit, fahrenheit, '72'));
      expect(result).toBeCloseTo(72, 5);
    });
  });
});

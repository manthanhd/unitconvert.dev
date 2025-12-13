import { describe, it, expect } from 'vitest';
import { linearConvert } from './linear';
import { temperatureConvert } from './temperature';
import { temperatureUnits, pressureUnits, energyUnits, powerUnits } from '../data/thermal';
import type { Unit } from '../data/types';

// Helper to find unit by ID
const findUnit = (units: Unit[], id: string): Unit => {
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`Unit not found: ${id}`);
  return unit;
};

// ============================================================================
// TEMPERATURE UNITS - All 8 units tested
// ============================================================================

describe('Temperature Units - Comprehensive Tests', () => {
  describe('All temperature units to Kelvin (base)', () => {
    const kelvin = findUnit(temperatureUnits, 'kelvin');

    temperatureUnits.forEach((unit) => {
      it(`should convert from ${unit.name} to Kelvin`, () => {
        // Convert 300 in each unit to Kelvin
        const result = temperatureConvert(unit, kelvin, '300');
        expect(result).not.toBe('');
        expect(result).not.toContain('Error');
      });
    });
  });

  describe('All temperature units from Kelvin (base)', () => {
    const kelvin = findUnit(temperatureUnits, 'kelvin');

    temperatureUnits.forEach((unit) => {
      it(`should convert from Kelvin to ${unit.name}`, () => {
        // Convert 300K to each unit
        const result = temperatureConvert(kelvin, unit, '300');
        expect(result).not.toBe('');
        expect(result).not.toContain('Error');
      });
    });
  });

  describe('Celsius ↔ Fahrenheit conversions', () => {
    const celsius = findUnit(temperatureUnits, 'celsius');
    const fahrenheit = findUnit(temperatureUnits, 'fahrenheit');

    it('0°C = 32°F (water freezing point)', () => {
      expect(parseFloat(temperatureConvert(celsius, fahrenheit, '0'))).toBeCloseTo(32, 5);
    });

    it('100°C = 212°F (water boiling point)', () => {
      expect(parseFloat(temperatureConvert(celsius, fahrenheit, '100'))).toBeCloseTo(212, 5);
    });

    it('-40°C = -40°F (same value point)', () => {
      expect(parseFloat(temperatureConvert(celsius, fahrenheit, '-40'))).toBeCloseTo(-40, 5);
    });

    it('37°C = 98.6°F (body temperature)', () => {
      expect(parseFloat(temperatureConvert(celsius, fahrenheit, '37'))).toBeCloseTo(98.6, 1);
    });

    it('20°C = 68°F (room temperature)', () => {
      expect(parseFloat(temperatureConvert(celsius, fahrenheit, '20'))).toBeCloseTo(68, 5);
    });
  });

  describe('Kelvin conversions', () => {
    const kelvin = findUnit(temperatureUnits, 'kelvin');
    const celsius = findUnit(temperatureUnits, 'celsius');
    const fahrenheit = findUnit(temperatureUnits, 'fahrenheit');

    it('0K = -273.15°C (absolute zero)', () => {
      expect(parseFloat(temperatureConvert(kelvin, celsius, '0'))).toBeCloseTo(-273.15, 2);
    });

    it('273.15K = 0°C', () => {
      expect(parseFloat(temperatureConvert(kelvin, celsius, '273.15'))).toBeCloseTo(0, 5);
    });

    it('373.15K = 100°C', () => {
      expect(parseFloat(temperatureConvert(kelvin, celsius, '373.15'))).toBeCloseTo(100, 5);
    });

    it('0K = -459.67°F (absolute zero)', () => {
      expect(parseFloat(temperatureConvert(kelvin, fahrenheit, '0'))).toBeCloseTo(-459.67, 1);
    });
  });

  describe('Rankine conversions', () => {
    const rankine = findUnit(temperatureUnits, 'rankine');
    const kelvin = findUnit(temperatureUnits, 'kelvin');
    const fahrenheit = findUnit(temperatureUnits, 'fahrenheit');

    it('0°R = 0K (absolute zero)', () => {
      expect(parseFloat(temperatureConvert(rankine, kelvin, '0'))).toBeCloseTo(0, 5);
    });

    it('491.67°R = 273.15K = 0°C', () => {
      expect(parseFloat(temperatureConvert(rankine, kelvin, '491.67'))).toBeCloseTo(273.15, 1);
    });

    it('Rankine is Fahrenheit + 459.67', () => {
      // 32°F = 491.67°R
      const result = parseFloat(temperatureConvert(fahrenheit, rankine, '32'));
      expect(result).toBeCloseTo(491.67, 1);
    });
  });

  describe('Historic temperature scales', () => {
    const celsius = findUnit(temperatureUnits, 'celsius');
    const reaumur = findUnit(temperatureUnits, 'reaumur');
    const delisle = findUnit(temperatureUnits, 'delisle');
    const newton = findUnit(temperatureUnits, 'newton-temp');
    const romer = findUnit(temperatureUnits, 'romer');

    it('0°C = 0°Ré (Réaumur)', () => {
      expect(parseFloat(temperatureConvert(celsius, reaumur, '0'))).toBeCloseTo(0, 5);
    });

    it('100°C = 80°Ré (Réaumur scale is 0.8x Celsius)', () => {
      expect(parseFloat(temperatureConvert(celsius, reaumur, '100'))).toBeCloseTo(80, 5);
    });

    it('100°C = 0°De (Delisle - inverse scale)', () => {
      expect(parseFloat(temperatureConvert(celsius, delisle, '100'))).toBeCloseTo(0, 5);
    });

    it('0°C = 150°De (Delisle)', () => {
      expect(parseFloat(temperatureConvert(celsius, delisle, '0'))).toBeCloseTo(150, 5);
    });

    it('0°C = 0°N (Newton)', () => {
      expect(parseFloat(temperatureConvert(celsius, newton, '0'))).toBeCloseTo(0, 5);
    });

    it('100°C = 33°N (Newton)', () => {
      expect(parseFloat(temperatureConvert(celsius, newton, '100'))).toBeCloseTo(33, 5);
    });

    it('0°C = 7.5°Rø (Rømer)', () => {
      expect(parseFloat(temperatureConvert(celsius, romer, '0'))).toBeCloseTo(7.5, 5);
    });

    it('100°C = 60°Rø (Rømer)', () => {
      expect(parseFloat(temperatureConvert(celsius, romer, '100'))).toBeCloseTo(60, 5);
    });
  });

  describe('Round-trip conversions', () => {
    const celsius = findUnit(temperatureUnits, 'celsius');
    const fahrenheit = findUnit(temperatureUnits, 'fahrenheit');
    const kelvin = findUnit(temperatureUnits, 'kelvin');

    it('C → F → C should return original', () => {
      const intermediate = temperatureConvert(celsius, fahrenheit, '25');
      const result = parseFloat(temperatureConvert(fahrenheit, celsius, intermediate));
      expect(result).toBeCloseTo(25, 5);
    });

    it('K → C → K should return original', () => {
      const intermediate = temperatureConvert(kelvin, celsius, '300');
      const result = parseFloat(temperatureConvert(celsius, kelvin, intermediate));
      expect(result).toBeCloseTo(300, 5);
    });

    it('F → K → F should return original', () => {
      const intermediate = temperatureConvert(fahrenheit, kelvin, '100');
      const result = parseFloat(temperatureConvert(kelvin, fahrenheit, intermediate));
      expect(result).toBeCloseTo(100, 5);
    });
  });
});

// ============================================================================
// PRESSURE UNITS - All 13 units tested
// ============================================================================

describe('Pressure Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(pressureUnits, 'pascal');

  describe('All pressure units to base (Pascal)', () => {
    pressureUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Pascals`, () => {
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

  describe('All pressure units from base (Pascal)', () => {
    pressureUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} Pa to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const kPa = findUnit(pressureUnits, 'kilopascal');
    const bar = findUnit(pressureUnits, 'bar');
    const atm = findUnit(pressureUnits, 'atmosphere');
    const psi = findUnit(pressureUnits, 'psi');
    const torr = findUnit(pressureUnits, 'torr');
    const mmHg = findUnit(pressureUnits, 'mmhg');

    it('1 atmosphere = 101,325 Pa (definition)', () => {
      expect(parseFloat(linearConvert(atm, baseUnit, '1'))).toBeCloseTo(101325, 0);
    });

    it('1 bar = 100,000 Pa', () => {
      expect(parseFloat(linearConvert(bar, baseUnit, '1'))).toBeCloseTo(100000, 0);
    });

    it('1 atmosphere ≈ 1.01325 bar', () => {
      expect(parseFloat(linearConvert(atm, bar, '1'))).toBeCloseTo(1.01325, 4);
    });

    it('1 atmosphere ≈ 14.7 psi', () => {
      expect(parseFloat(linearConvert(atm, psi, '1'))).toBeCloseTo(14.696, 1);
    });

    it('1 atmosphere = 760 torr (definition)', () => {
      expect(parseFloat(linearConvert(atm, torr, '1'))).toBeCloseTo(760, 0);
    });

    it('1 torr ≈ 1 mmHg', () => {
      // They are slightly different due to convention
      const torrInPa = torr.toBase as number;
      const mmHgInPa = mmHg.toBase as number;
      expect(torrInPa / mmHgInPa).toBeCloseTo(1, 2);
    });

    it('1 kPa = 1000 Pa', () => {
      expect(parseFloat(linearConvert(kPa, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('tire pressure: 32 psi ≈ 220.6 kPa', () => {
      expect(parseFloat(linearConvert(psi, kPa, '32'))).toBeCloseTo(220.6, 0);
    });
  });

  describe('Round-trip conversions', () => {
    const atm = findUnit(pressureUnits, 'atmosphere');
    const psi = findUnit(pressureUnits, 'psi');

    it('atm → psi → atm should return original', () => {
      const intermediate = linearConvert(atm, psi, '2');
      const result = parseFloat(linearConvert(psi, atm, intermediate));
      expect(result).toBeCloseTo(2, 5);
    });
  });
});

// ============================================================================
// ENERGY UNITS - All 18 units tested
// ============================================================================

describe('Energy Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(energyUnits, 'joule');

  describe('All energy units to base (Joule)', () => {
    energyUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Joules`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        const toBase = unit.toBase as number;
        if (toBase > 1e10 || toBase < 1e-10) {
          expect(result / toBase).toBeCloseTo(1, 4);
        } else {
          expect(result).toBeCloseTo(toBase, 2);
        }
      });
    });
  });

  describe('All energy units from base (Joule)', () => {
    energyUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} J to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const kJ = findUnit(energyUnits, 'kilojoule');
    const kWh = findUnit(energyUnits, 'kilowatt-hour');
    const cal = findUnit(energyUnits, 'calorie');
    const kcal = findUnit(energyUnits, 'kilocalorie');
    const btu = findUnit(energyUnits, 'btu');

    it('1 kJ = 1000 J', () => {
      expect(parseFloat(linearConvert(kJ, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 kWh = 3,600,000 J', () => {
      expect(parseFloat(linearConvert(kWh, baseUnit, '1'))).toBeCloseTo(3600000, 0);
    });

    it('1 kWh = 3.6 MJ', () => {
      const MJ = findUnit(energyUnits, 'megajoule');
      expect(parseFloat(linearConvert(kWh, MJ, '1'))).toBeCloseTo(3.6, 5);
    });

    it('1 calorie = 4.184 J (thermochemical)', () => {
      expect(parseFloat(linearConvert(cal, baseUnit, '1'))).toBeCloseTo(4.184, 3);
    });

    it('1 kilocalorie = 1000 calories', () => {
      expect(parseFloat(linearConvert(kcal, cal, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 kilocalorie ≈ 4,184 J (food calorie)', () => {
      expect(parseFloat(linearConvert(kcal, baseUnit, '1'))).toBeCloseTo(4184, 0);
    });

    it('1 BTU ≈ 1,055 J', () => {
      expect(parseFloat(linearConvert(btu, baseUnit, '1'))).toBeCloseTo(1055, 0);
    });

    it('electricity bill: 500 kWh = 1.8 GJ', () => {
      const GJ = findUnit(energyUnits, 'gigajoule');
      expect(parseFloat(linearConvert(kWh, GJ, '500'))).toBeCloseTo(1.8, 1);
    });
  });

  describe('Round-trip conversions', () => {
    const kWh = findUnit(energyUnits, 'kilowatt-hour');
    const kcal = findUnit(energyUnits, 'kilocalorie');

    it('kWh → kcal → kWh should return original', () => {
      const intermediate = linearConvert(kWh, kcal, '10');
      const result = parseFloat(linearConvert(kcal, kWh, intermediate));
      expect(result).toBeCloseTo(10, 5);
    });
  });
});

// ============================================================================
// POWER UNITS - All 13 units tested
// ============================================================================

describe('Power Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(powerUnits, 'watt');

  describe('All power units to base (Watt)', () => {
    powerUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Watts`, () => {
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

  describe('All power units from base (Watt)', () => {
    powerUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} W to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const kW = findUnit(powerUnits, 'kilowatt');
    const MW = findUnit(powerUnits, 'megawatt');
    const hp = findUnit(powerUnits, 'horsepower');
    const hpMetric = findUnit(powerUnits, 'horsepower-metric');
    const btuPerHour = findUnit(powerUnits, 'btu-per-hour');

    it('1 kW = 1000 W', () => {
      expect(parseFloat(linearConvert(kW, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 MW = 1,000,000 W', () => {
      expect(parseFloat(linearConvert(MW, baseUnit, '1'))).toBeCloseTo(1e6, 0);
    });

    it('1 mechanical horsepower ≈ 745.7 W', () => {
      expect(parseFloat(linearConvert(hp, baseUnit, '1'))).toBeCloseTo(745.7, 0);
    });

    it('1 metric horsepower ≈ 735.5 W', () => {
      expect(parseFloat(linearConvert(hpMetric, baseUnit, '1'))).toBeCloseTo(735.5, 0);
    });

    it('1 hp ≈ 1.014 metric hp', () => {
      expect(parseFloat(linearConvert(hp, hpMetric, '1'))).toBeCloseTo(1.014, 2);
    });

    it('1 kW ≈ 1.34 hp', () => {
      expect(parseFloat(linearConvert(kW, hp, '1'))).toBeCloseTo(1.341, 2);
    });

    it('car engine: 200 hp ≈ 149 kW', () => {
      expect(parseFloat(linearConvert(hp, kW, '200'))).toBeCloseTo(149.14, 0);
    });

    it('1 BTU/hr ≈ 0.293 W', () => {
      expect(parseFloat(linearConvert(btuPerHour, baseUnit, '1'))).toBeCloseTo(0.293, 2);
    });

    it('AC unit: 12,000 BTU/hr ≈ 3.52 kW', () => {
      expect(parseFloat(linearConvert(btuPerHour, kW, '12000'))).toBeCloseTo(3.517, 1);
    });
  });

  describe('Round-trip conversions', () => {
    const kW = findUnit(powerUnits, 'kilowatt');
    const hp = findUnit(powerUnits, 'horsepower');

    it('kW → hp → kW should return original', () => {
      const intermediate = linearConvert(kW, hp, '100');
      const result = parseFloat(linearConvert(hp, kW, intermediate));
      expect(result).toBeCloseTo(100, 5);
    });
  });
});

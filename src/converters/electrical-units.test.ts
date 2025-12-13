import { describe, it, expect } from 'vitest';
import { linearConvert } from './linear';
import {
  currentUnits,
  voltageUnits,
  resistanceUnits,
  capacitanceUnits,
  chargeUnits,
  conductanceUnits,
  inductanceUnits,
  magneticFieldUnits,
  magneticFluxUnits,
  magnetomotiveForceUnits,
} from '../data/electrical';
import type { Unit } from '../data/types';

// Helper to find unit by ID
const findUnit = (units: Unit[], id: string): Unit => {
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`Unit not found: ${id}`);
  return unit;
};

// ============================================================================
// ELECTRIC CURRENT UNITS - All 7 units tested
// ============================================================================

describe('Electric Current Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(currentUnits, 'ampere');

  describe('All current units to base (Ampere)', () => {
    currentUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Amperes`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 12);
      });
    });
  });

  describe('All current units from base (Ampere)', () => {
    currentUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} A to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mA = findUnit(currentUnits, 'milliampere');
    const uA = findUnit(currentUnits, 'microampere');
    const kA = findUnit(currentUnits, 'kiloampere');

    it('1 A = 1000 mA', () => {
      expect(parseFloat(linearConvert(baseUnit, mA, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 mA = 1000 μA', () => {
      expect(parseFloat(linearConvert(mA, uA, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 kA = 1000 A', () => {
      expect(parseFloat(linearConvert(kA, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('household circuit: 15 A = 15000 mA', () => {
      expect(parseFloat(linearConvert(baseUnit, mA, '15'))).toBeCloseTo(15000, 0);
    });

    it('LED current: 20 mA = 0.02 A', () => {
      expect(parseFloat(linearConvert(mA, baseUnit, '20'))).toBeCloseTo(0.02, 5);
    });
  });
});

// ============================================================================
// ELECTRIC VOLTAGE UNITS - All 8 units tested
// ============================================================================

describe('Electric Voltage Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(voltageUnits, 'volt');

  describe('All voltage units to base (Volt)', () => {
    voltageUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Volts`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 5);
      });
    });
  });

  describe('All voltage units from base (Volt)', () => {
    voltageUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} V to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mV = findUnit(voltageUnits, 'millivolt');
    const kV = findUnit(voltageUnits, 'kilovolt');
    const MV = findUnit(voltageUnits, 'megavolt');

    it('1 V = 1000 mV', () => {
      expect(parseFloat(linearConvert(baseUnit, mV, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 kV = 1000 V', () => {
      expect(parseFloat(linearConvert(kV, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 MV = 1000 kV', () => {
      expect(parseFloat(linearConvert(MV, kV, '1'))).toBeCloseTo(1000, 0);
    });

    it('US household: 120 V = 0.12 kV', () => {
      expect(parseFloat(linearConvert(baseUnit, kV, '120'))).toBeCloseTo(0.12, 5);
    });

    it('AA battery: 1.5 V = 1500 mV', () => {
      expect(parseFloat(linearConvert(baseUnit, mV, '1.5'))).toBeCloseTo(1500, 0);
    });

    it('power line: 115 kV = 115,000 V', () => {
      expect(parseFloat(linearConvert(kV, baseUnit, '115'))).toBeCloseTo(115000, 0);
    });
  });
});

// ============================================================================
// ELECTRIC RESISTANCE UNITS - All 8 units tested
// ============================================================================

describe('Electric Resistance Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(resistanceUnits, 'ohm');

  describe('All resistance units to base (Ohm)', () => {
    resistanceUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Ohms`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 0);
      });
    });
  });

  describe('All resistance units from base (Ohm)', () => {
    resistanceUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} Ω to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mOhm = findUnit(resistanceUnits, 'milliohm');
    const kOhm = findUnit(resistanceUnits, 'kilohm');
    const MOhm = findUnit(resistanceUnits, 'megohm');

    it('1 Ω = 1000 mΩ', () => {
      expect(parseFloat(linearConvert(baseUnit, mOhm, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 kΩ = 1000 Ω', () => {
      expect(parseFloat(linearConvert(kOhm, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 MΩ = 1000 kΩ', () => {
      expect(parseFloat(linearConvert(MOhm, kOhm, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 MΩ = 1,000,000 Ω', () => {
      expect(parseFloat(linearConvert(MOhm, baseUnit, '1'))).toBeCloseTo(1e6, 0);
    });

    it('4.7 kΩ resistor = 4700 Ω', () => {
      expect(parseFloat(linearConvert(kOhm, baseUnit, '4.7'))).toBeCloseTo(4700, 0);
    });
  });
});

// ============================================================================
// ELECTRIC CAPACITANCE UNITS - All 7 units tested
// ============================================================================

describe('Electric Capacitance Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(capacitanceUnits, 'farad');

  describe('All capacitance units to base (Farad)', () => {
    capacitanceUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Farads`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 15);
      });
    });
  });

  describe('All capacitance units from base (Farad)', () => {
    capacitanceUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} F to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mF = findUnit(capacitanceUnits, 'millifarad');
    const uF = findUnit(capacitanceUnits, 'microfarad');
    const nF = findUnit(capacitanceUnits, 'nanofarad');
    const pF = findUnit(capacitanceUnits, 'picofarad');

    it('1 F = 1000 mF', () => {
      expect(parseFloat(linearConvert(baseUnit, mF, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 mF = 1000 μF', () => {
      expect(parseFloat(linearConvert(mF, uF, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 μF = 1000 nF', () => {
      expect(parseFloat(linearConvert(uF, nF, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 nF = 1000 pF', () => {
      expect(parseFloat(linearConvert(nF, pF, '1'))).toBeCloseTo(1000, 0);
    });

    it('100 μF electrolytic = 100,000 nF', () => {
      expect(parseFloat(linearConvert(uF, nF, '100'))).toBeCloseTo(100000, 0);
    });

    it('22 pF ceramic = 0.022 nF', () => {
      expect(parseFloat(linearConvert(pF, nF, '22'))).toBeCloseTo(0.022, 5);
    });
  });
});

// ============================================================================
// ELECTRIC CHARGE UNITS - All 11 units tested
// ============================================================================

describe('Electric Charge Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(chargeUnits, 'coulomb');

  describe('All charge units to base (Coulomb)', () => {
    chargeUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Coulombs`, () => {
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

  describe('All charge units from base (Coulomb)', () => {
    chargeUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} C to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mC = findUnit(chargeUnits, 'millicoulomb');
    const Ah = findUnit(chargeUnits, 'ampere-hour');
    const mAh = findUnit(chargeUnits, 'milliampere-hour');

    it('1 C = 1000 mC', () => {
      expect(parseFloat(linearConvert(baseUnit, mC, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 Ah = 3600 C', () => {
      expect(parseFloat(linearConvert(Ah, baseUnit, '1'))).toBeCloseTo(3600, 0);
    });

    it('1 Ah = 1000 mAh', () => {
      expect(parseFloat(linearConvert(Ah, mAh, '1'))).toBeCloseTo(1000, 0);
    });

    it('phone battery: 3000 mAh = 3 Ah', () => {
      expect(parseFloat(linearConvert(mAh, Ah, '3000'))).toBeCloseTo(3, 5);
    });

    it('car battery: 60 Ah = 216,000 C', () => {
      expect(parseFloat(linearConvert(Ah, baseUnit, '60'))).toBeCloseTo(216000, 0);
    });
  });
});

// ============================================================================
// ELECTRIC CONDUCTANCE UNITS - All 4 units tested
// ============================================================================

describe('Electric Conductance Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(conductanceUnits, 'siemens');

  describe('All conductance units to base (Siemens)', () => {
    conductanceUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Siemens`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 6);
      });
    });
  });

  describe('All conductance units from base (Siemens)', () => {
    conductanceUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} S to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mS = findUnit(conductanceUnits, 'millisiemens');
    const uS = findUnit(conductanceUnits, 'microsiemens');
    const mho = findUnit(conductanceUnits, 'mho');

    it('1 S = 1000 mS', () => {
      expect(parseFloat(linearConvert(baseUnit, mS, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 mS = 1000 μS', () => {
      expect(parseFloat(linearConvert(mS, uS, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 mho = 1 S (mho is inverse of ohm)', () => {
      expect(parseFloat(linearConvert(mho, baseUnit, '1'))).toBeCloseTo(1, 5);
    });
  });
});

// ============================================================================
// ELECTRIC INDUCTANCE UNITS - All 6 units tested
// ============================================================================

describe('Electric Inductance Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(inductanceUnits, 'henry');

  describe('All inductance units to base (Henry)', () => {
    inductanceUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Henries`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 12);
      });
    });
  });

  describe('All inductance units from base (Henry)', () => {
    inductanceUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} H to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mH = findUnit(inductanceUnits, 'millihenry');
    const uH = findUnit(inductanceUnits, 'microhenry');
    const nH = findUnit(inductanceUnits, 'nanohenry');

    it('1 H = 1000 mH', () => {
      expect(parseFloat(linearConvert(baseUnit, mH, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 mH = 1000 μH', () => {
      expect(parseFloat(linearConvert(mH, uH, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 μH = 1000 nH', () => {
      expect(parseFloat(linearConvert(uH, nH, '1'))).toBeCloseTo(1000, 0);
    });

    it('audio inductor: 10 mH = 10,000 μH', () => {
      expect(parseFloat(linearConvert(mH, uH, '10'))).toBeCloseTo(10000, 0);
    });
  });
});

// ============================================================================
// MAGNETIC FIELD UNITS - All 8 units tested
// ============================================================================

describe('Magnetic Field Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(magneticFieldUnits, 'tesla');

  describe('All magnetic field units to base (Tesla)', () => {
    magneticFieldUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Tesla`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 12);
      });
    });
  });

  describe('All magnetic field units from base (Tesla)', () => {
    magneticFieldUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} T to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mT = findUnit(magneticFieldUnits, 'millitesla');
    const gauss = findUnit(magneticFieldUnits, 'gauss');

    it('1 T = 1000 mT', () => {
      expect(parseFloat(linearConvert(baseUnit, mT, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 T = 10,000 Gauss', () => {
      expect(parseFloat(linearConvert(baseUnit, gauss, '1'))).toBeCloseTo(10000, 0);
    });

    it('1 Gauss = 0.0001 T', () => {
      expect(parseFloat(linearConvert(gauss, baseUnit, '1'))).toBeCloseTo(0.0001, 6);
    });

    it("Earth's magnetic field: 50 μT = 0.5 Gauss", () => {
      const uT = findUnit(magneticFieldUnits, 'microtesla');
      expect(parseFloat(linearConvert(uT, gauss, '50'))).toBeCloseTo(0.5, 2);
    });

    it('MRI scanner: 1.5 T = 15,000 Gauss', () => {
      expect(parseFloat(linearConvert(baseUnit, gauss, '1.5'))).toBeCloseTo(15000, 0);
    });
  });
});

// ============================================================================
// MAGNETIC FLUX UNITS - All 5 units tested
// ============================================================================

describe('Magnetic Flux Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(magneticFluxUnits, 'weber');

  describe('All magnetic flux units to base (Weber)', () => {
    magneticFluxUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Webers`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 10);
      });
    });
  });

  describe('All magnetic flux units from base (Weber)', () => {
    magneticFluxUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} Wb to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mWb = findUnit(magneticFluxUnits, 'milliweber');
    const maxwell = findUnit(magneticFluxUnits, 'maxwell');

    it('1 Wb = 1000 mWb', () => {
      expect(parseFloat(linearConvert(baseUnit, mWb, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 Wb = 10^8 Maxwell', () => {
      expect(parseFloat(linearConvert(baseUnit, maxwell, '1'))).toBeCloseTo(1e8, 0);
    });

    it('1 Maxwell = 10^-8 Wb', () => {
      expect(parseFloat(linearConvert(maxwell, baseUnit, '1'))).toBeCloseTo(1e-8, 12);
    });
  });
});

// ============================================================================
// MAGNETOMOTIVE FORCE UNITS - All 3 units tested
// ============================================================================

describe('Magnetomotive Force Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(magnetomotiveForceUnits, 'ampere-turn');

  describe('All MMF units to base (Ampere-turn)', () => {
    magnetomotiveForceUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Ampere-turns`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 4);
      });
    });
  });

  describe('All MMF units from base (Ampere-turn)', () => {
    magnetomotiveForceUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} At to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const gilbert = findUnit(magnetomotiveForceUnits, 'gilbert');
    const kAt = findUnit(magnetomotiveForceUnits, 'kiloampere-turn');

    it('1 gilbert ≈ 0.796 At', () => {
      expect(parseFloat(linearConvert(gilbert, baseUnit, '1'))).toBeCloseTo(0.796, 2);
    });

    it('1 kAt = 1000 At', () => {
      expect(parseFloat(linearConvert(kAt, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });
  });
});

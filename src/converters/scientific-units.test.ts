import { describe, it, expect } from 'vitest';
import { linearConvert } from './linear';
import {
  forceUnits,
  torqueUnits,
  densityUnits,
  flowRateUnits,
  concentrationUnits,
  dynamicViscosityUnits,
  kinematicViscosityUnits,
  massFlowRateUnits,
  radioactivityUnits,
  radiationAbsorbedDoseUnits,
  radiationEquivalentDoseUnits,
  luminousIntensityUnits,
  luminousFluxUnits,
  illuminanceUnits,
  luminanceUnits,
} from '../data/scientific';
import type { Unit } from '../data/types';

// Helper to find unit by ID
const findUnit = (units: Unit[], id: string): Unit => {
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`Unit not found: ${id}`);
  return unit;
};

// Helper to check conversion with appropriate precision for the magnitude
const expectCloseTo = (result: number, expected: number, basePrecision: number = 2) => {
  if (expected > 1e10 || expected < 1e-10) {
    // For very large/small numbers, use relative tolerance
    expect(result / expected).toBeCloseTo(1, 4);
  } else if (expected > 1e6 || expected < 1e-6) {
    expect(result / expected).toBeCloseTo(1, 5);
  } else {
    expect(result).toBeCloseTo(expected, basePrecision);
  }
};

// ============================================================================
// FORCE UNITS - All 14 units tested
// ============================================================================

describe('Force Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(forceUnits, 'newton');

  describe('All force units to base (Newton)', () => {
    forceUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Newtons`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expectCloseTo(result, unit.toBase as number);
      });
    });
  });

  describe('All force units from base (Newton)', () => {
    forceUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} N to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 4);
      });
    });
  });

  describe('Known reference conversions', () => {
    const kN = findUnit(forceUnits, 'kilonewton');
    const lbf = findUnit(forceUnits, 'pound-force');
    const kgf = findUnit(forceUnits, 'kilogram-force');
    const dyne = findUnit(forceUnits, 'dyne');

    it('1 kN = 1000 N', () => {
      expect(parseFloat(linearConvert(kN, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 lbf ≈ 4.448 N', () => {
      expect(parseFloat(linearConvert(lbf, baseUnit, '1'))).toBeCloseTo(4.448, 2);
    });

    it('1 kgf = 9.80665 N (weight of 1 kg)', () => {
      expect(parseFloat(linearConvert(kgf, baseUnit, '1'))).toBeCloseTo(9.80665, 4);
    });

    it('1 N = 100,000 dynes', () => {
      expect(parseFloat(linearConvert(baseUnit, dyne, '1'))).toBeCloseTo(100000, 0);
    });

    it('1 N ≈ 0.2248 lbf', () => {
      expect(parseFloat(linearConvert(baseUnit, lbf, '1'))).toBeCloseTo(0.2248, 3);
    });

    it('body weight: 70 kgf = 686.5 N', () => {
      expect(parseFloat(linearConvert(kgf, baseUnit, '70'))).toBeCloseTo(686.5, 0);
    });
  });
});

// ============================================================================
// TORQUE UNITS - All 13 units tested
// ============================================================================

describe('Torque Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(torqueUnits, 'newton-meter');

  describe('All torque units to base (N⋅m)', () => {
    torqueUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to N⋅m`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expectCloseTo(result, unit.toBase as number);
      });
    });
  });

  describe('All torque units from base (N⋅m)', () => {
    torqueUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} N⋅m to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 4);
      });
    });
  });

  describe('Known reference conversions', () => {
    const ftLb = findUnit(torqueUnits, 'foot-pound-torque');
    const inLb = findUnit(torqueUnits, 'inch-pound');
    const kgfm = findUnit(torqueUnits, 'kilogram-force-meter');

    it('1 ft⋅lb ≈ 1.356 N⋅m', () => {
      expect(parseFloat(linearConvert(ftLb, baseUnit, '1'))).toBeCloseTo(1.356, 2);
    });

    it('1 ft⋅lb = 12 in⋅lb', () => {
      expect(parseFloat(linearConvert(ftLb, inLb, '1'))).toBeCloseTo(12, 0);
    });

    it('1 kgf⋅m ≈ 9.81 N⋅m', () => {
      expect(parseFloat(linearConvert(kgfm, baseUnit, '1'))).toBeCloseTo(9.81, 1);
    });

    it('car lug nut: 100 ft⋅lb ≈ 135.6 N⋅m', () => {
      expect(parseFloat(linearConvert(ftLb, baseUnit, '100'))).toBeCloseTo(135.6, 0);
    });

    it('bike pedal: 40 N⋅m ≈ 29.5 ft⋅lb', () => {
      expect(parseFloat(linearConvert(baseUnit, ftLb, '40'))).toBeCloseTo(29.5, 0);
    });
  });
});

// ============================================================================
// DENSITY UNITS - All 7 units tested
// ============================================================================

describe('Density Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(densityUnits, 'kilogram-per-cubic-meter');

  describe('All density units to base (kg/m³)', () => {
    densityUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to kg/m³`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 2);
      });
    });
  });

  describe('All density units from base (kg/m³)', () => {
    densityUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} kg/m³ to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const gCm3 = findUnit(densityUnits, 'gram-per-cubic-centimeter');
    const gL = findUnit(densityUnits, 'gram-per-liter');
    const lbFt3 = findUnit(densityUnits, 'pound-per-cubic-foot');

    it('1 g/cm³ = 1000 kg/m³', () => {
      expect(parseFloat(linearConvert(gCm3, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 g/L = 1 kg/m³', () => {
      expect(parseFloat(linearConvert(gL, baseUnit, '1'))).toBeCloseTo(1, 5);
    });

    it('water: 1 g/cm³ = 62.4 lb/ft³', () => {
      expect(parseFloat(linearConvert(gCm3, lbFt3, '1'))).toBeCloseTo(62.4, 0);
    });

    it('water at 4°C: 1000 kg/m³ = 1 g/cm³', () => {
      expect(parseFloat(linearConvert(baseUnit, gCm3, '1000'))).toBeCloseTo(1, 5);
    });

    it('air at STP: 1.225 kg/m³ = 0.001225 g/cm³', () => {
      expect(parseFloat(linearConvert(baseUnit, gCm3, '1.225'))).toBeCloseTo(0.001225, 5);
    });
  });
});

// ============================================================================
// FLOW RATE UNITS - All 15 units tested
// ============================================================================

describe('Flow Rate Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(flowRateUnits, 'cubic-meter-per-second');

  describe('All flow rate units to base (m³/s)', () => {
    flowRateUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to m³/s`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expectCloseTo(result, unit.toBase as number);
      });
    });
  });

  describe('All flow rate units from base (m³/s)', () => {
    flowRateUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} m³/s to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const LperS = findUnit(flowRateUnits, 'liter-per-second');
    const LperMin = findUnit(flowRateUnits, 'liter-per-minute');
    const GPM = findUnit(flowRateUnits, 'gallon-per-minute');
    const CFM = findUnit(flowRateUnits, 'cubic-foot-per-minute');

    it('1 L/s = 60 L/min', () => {
      expect(parseFloat(linearConvert(LperS, LperMin, '1'))).toBeCloseTo(60, 0);
    });

    it('1 m³/s = 1000 L/s', () => {
      expect(parseFloat(linearConvert(baseUnit, LperS, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 GPM ≈ 3.785 L/min', () => {
      expect(parseFloat(linearConvert(GPM, LperMin, '1'))).toBeCloseTo(3.785, 2);
    });

    it('1 CFM ≈ 28.32 L/min', () => {
      expect(parseFloat(linearConvert(CFM, LperMin, '1'))).toBeCloseTo(28.32, 1);
    });

    it('shower: 10 L/min ≈ 2.64 GPM', () => {
      expect(parseFloat(linearConvert(LperMin, GPM, '10'))).toBeCloseTo(2.64, 1);
    });

    it('HVAC: 1000 CFM ≈ 472 L/s', () => {
      expect(parseFloat(linearConvert(CFM, LperS, '1000'))).toBeCloseTo(472, 0);
    });
  });
});

// ============================================================================
// CONCENTRATION UNITS - All 15 units tested
// ============================================================================

describe('Concentration Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(concentrationUnits, 'ppm');

  describe('All concentration units to base (ppm)', () => {
    concentrationUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to ppm`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 3);
      });
    });
  });

  describe('All concentration units from base (ppm)', () => {
    concentrationUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} ppm to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const percent = findUnit(concentrationUnits, 'percent');
    const permille = findUnit(concentrationUnits, 'permille');
    const ppb = findUnit(concentrationUnits, 'ppb');
    const mgL = findUnit(concentrationUnits, 'milligram-per-liter');

    it('1% = 10,000 ppm', () => {
      expect(parseFloat(linearConvert(percent, baseUnit, '1'))).toBeCloseTo(10000, 0);
    });

    it('1‰ = 1000 ppm', () => {
      expect(parseFloat(linearConvert(permille, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 ppm = 1000 ppb', () => {
      expect(parseFloat(linearConvert(baseUnit, ppb, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 mg/L = 1 ppm (for dilute aqueous solutions)', () => {
      expect(parseFloat(linearConvert(mgL, baseUnit, '1'))).toBeCloseTo(1, 5);
    });

    it('alcohol: 0.08% BAC = 800 ppm', () => {
      expect(parseFloat(linearConvert(percent, baseUnit, '0.08'))).toBeCloseTo(800, 0);
    });

    it('CO2 in air: 400 ppm = 0.04%', () => {
      expect(parseFloat(linearConvert(baseUnit, percent, '400'))).toBeCloseTo(0.04, 5);
    });
  });
});

// ============================================================================
// DYNAMIC VISCOSITY UNITS - All 7 units tested
// ============================================================================

describe('Dynamic Viscosity Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(dynamicViscosityUnits, 'pascal-second');

  describe('All dynamic viscosity units to base (Pa⋅s)', () => {
    dynamicViscosityUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Pa⋅s`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 4);
      });
    });
  });

  describe('All dynamic viscosity units from base (Pa⋅s)', () => {
    dynamicViscosityUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} Pa⋅s to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mPaS = findUnit(dynamicViscosityUnits, 'millipascal-second');
    const poise = findUnit(dynamicViscosityUnits, 'poise');
    const cP = findUnit(dynamicViscosityUnits, 'centipoise');

    it('1 Pa⋅s = 1000 mPa⋅s', () => {
      expect(parseFloat(linearConvert(baseUnit, mPaS, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 Pa⋅s = 10 Poise', () => {
      expect(parseFloat(linearConvert(baseUnit, poise, '1'))).toBeCloseTo(10, 0);
    });

    it('1 Poise = 100 centipoise', () => {
      expect(parseFloat(linearConvert(poise, cP, '1'))).toBeCloseTo(100, 0);
    });

    it('1 mPa⋅s = 1 cP (water at 20°C)', () => {
      expect(parseFloat(linearConvert(mPaS, cP, '1'))).toBeCloseTo(1, 5);
    });

    it('water: 1 cP = 0.001 Pa⋅s', () => {
      expect(parseFloat(linearConvert(cP, baseUnit, '1'))).toBeCloseTo(0.001, 5);
    });

    it('honey: 10,000 cP = 10 Pa⋅s', () => {
      expect(parseFloat(linearConvert(cP, baseUnit, '10000'))).toBeCloseTo(10, 0);
    });
  });
});

// ============================================================================
// KINEMATIC VISCOSITY UNITS - All 6 units tested
// ============================================================================

describe('Kinematic Viscosity Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(kinematicViscosityUnits, 'square-meter-per-second');

  describe('All kinematic viscosity units to base (m²/s)', () => {
    kinematicViscosityUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to m²/s`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 6);
      });
    });
  });

  describe('All kinematic viscosity units from base (m²/s)', () => {
    kinematicViscosityUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} m²/s to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const stokes = findUnit(kinematicViscosityUnits, 'stokes');
    const cSt = findUnit(kinematicViscosityUnits, 'centistokes');

    it('1 m²/s = 10,000 Stokes', () => {
      expect(parseFloat(linearConvert(baseUnit, stokes, '1'))).toBeCloseTo(10000, 0);
    });

    it('1 Stokes = 100 centistokes', () => {
      expect(parseFloat(linearConvert(stokes, cSt, '1'))).toBeCloseTo(100, 0);
    });

    it('water at 20°C: 1 cSt = 10⁻⁶ m²/s', () => {
      expect(parseFloat(linearConvert(cSt, baseUnit, '1'))).toBeCloseTo(1e-6, 8);
    });

    it('motor oil SAE 30: ~100 cSt at 40°C', () => {
      expect(parseFloat(linearConvert(cSt, stokes, '100'))).toBeCloseTo(1, 5);
    });
  });
});

// ============================================================================
// MASS FLOW RATE UNITS - All 10 units tested
// ============================================================================

describe('Mass Flow Rate Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(massFlowRateUnits, 'kilogram-per-second');

  describe('All mass flow rate units to base (kg/s)', () => {
    massFlowRateUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to kg/s`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 4);
      });
    });
  });

  describe('All mass flow rate units from base (kg/s)', () => {
    massFlowRateUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} kg/s to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const kgMin = findUnit(massFlowRateUnits, 'kilogram-per-minute');
    const kgH = findUnit(massFlowRateUnits, 'kilogram-per-hour');
    const lbH = findUnit(massFlowRateUnits, 'pound-per-hour');

    it('1 kg/s = 60 kg/min', () => {
      expect(parseFloat(linearConvert(baseUnit, kgMin, '1'))).toBeCloseTo(60, 0);
    });

    it('1 kg/s = 3600 kg/h', () => {
      expect(parseFloat(linearConvert(baseUnit, kgH, '1'))).toBeCloseTo(3600, 0);
    });

    it('1 kg/h ≈ 2.205 lb/h', () => {
      expect(parseFloat(linearConvert(kgH, lbH, '1'))).toBeCloseTo(2.205, 2);
    });

    it('fuel flow: 100 kg/h ≈ 220.5 lb/h', () => {
      expect(parseFloat(linearConvert(kgH, lbH, '100'))).toBeCloseTo(220.5, 0);
    });
  });
});

// ============================================================================
// RADIOACTIVITY UNITS - All 10 units tested
// ============================================================================

describe('Radioactivity Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(radioactivityUnits, 'becquerel');

  describe('All radioactivity units to base (Bq)', () => {
    radioactivityUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Bq`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expectCloseTo(result, unit.toBase as number, 0);
      });
    });
  });

  describe('All radioactivity units from base (Bq)', () => {
    radioactivityUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} Bq to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const kBq = findUnit(radioactivityUnits, 'kilobecquerel');
    const MBq = findUnit(radioactivityUnits, 'megabecquerel');
    const curie = findUnit(radioactivityUnits, 'curie');
    const mCi = findUnit(radioactivityUnits, 'millicurie');

    it('1 kBq = 1000 Bq', () => {
      expect(parseFloat(linearConvert(kBq, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 MBq = 1,000,000 Bq', () => {
      expect(parseFloat(linearConvert(MBq, baseUnit, '1'))).toBeCloseTo(1e6, 0);
    });

    it('1 Curie = 37 GBq (3.7 × 10¹⁰ Bq)', () => {
      expect(parseFloat(linearConvert(curie, baseUnit, '1'))).toBeCloseTo(3.7e10, -7);
    });

    it('1 mCi = 37 MBq', () => {
      expect(parseFloat(linearConvert(mCi, MBq, '1'))).toBeCloseTo(37, 0);
    });

    it('1 Curie = 1000 mCi', () => {
      expect(parseFloat(linearConvert(curie, mCi, '1'))).toBeCloseTo(1000, 0);
    });
  });
});

// ============================================================================
// RADIATION ABSORBED DOSE UNITS - All 6 units tested
// ============================================================================

describe('Radiation Absorbed Dose Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(radiationAbsorbedDoseUnits, 'gray');

  describe('All absorbed dose units to base (Gray)', () => {
    radiationAbsorbedDoseUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Gy`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 5);
      });
    });
  });

  describe('All absorbed dose units from base (Gray)', () => {
    radiationAbsorbedDoseUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} Gy to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mGy = findUnit(radiationAbsorbedDoseUnits, 'milligray');
    const rad = findUnit(radiationAbsorbedDoseUnits, 'rad');

    it('1 Gy = 1000 mGy', () => {
      expect(parseFloat(linearConvert(baseUnit, mGy, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 Gy = 100 rad', () => {
      expect(parseFloat(linearConvert(baseUnit, rad, '1'))).toBeCloseTo(100, 0);
    });

    it('1 rad = 0.01 Gy', () => {
      expect(parseFloat(linearConvert(rad, baseUnit, '1'))).toBeCloseTo(0.01, 5);
    });

    it('CT scan: 10 mGy = 1 rad', () => {
      expect(parseFloat(linearConvert(mGy, rad, '10'))).toBeCloseTo(1, 5);
    });
  });
});

// ============================================================================
// RADIATION EQUIVALENT DOSE UNITS - All 7 units tested
// ============================================================================

describe('Radiation Equivalent Dose Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(radiationEquivalentDoseUnits, 'sievert');

  describe('All equivalent dose units to base (Sievert)', () => {
    radiationEquivalentDoseUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to Sv`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 5);
      });
    });
  });

  describe('All equivalent dose units from base (Sievert)', () => {
    radiationEquivalentDoseUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} Sv to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mSv = findUnit(radiationEquivalentDoseUnits, 'millisievert');
    const uSv = findUnit(radiationEquivalentDoseUnits, 'microsievert');
    const rem = findUnit(radiationEquivalentDoseUnits, 'rem');
    const mrem = findUnit(radiationEquivalentDoseUnits, 'millirem');

    it('1 Sv = 1000 mSv', () => {
      expect(parseFloat(linearConvert(baseUnit, mSv, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 mSv = 1000 μSv', () => {
      expect(parseFloat(linearConvert(mSv, uSv, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 Sv = 100 rem', () => {
      expect(parseFloat(linearConvert(baseUnit, rem, '1'))).toBeCloseTo(100, 0);
    });

    it('1 rem = 10 mSv', () => {
      expect(parseFloat(linearConvert(rem, mSv, '1'))).toBeCloseTo(10, 0);
    });

    it('1 rem = 1000 mrem', () => {
      expect(parseFloat(linearConvert(rem, mrem, '1'))).toBeCloseTo(1000, 0);
    });

    it('annual background: 3 mSv = 300 mrem', () => {
      expect(parseFloat(linearConvert(mSv, mrem, '3'))).toBeCloseTo(300, 0);
    });

    it('chest X-ray: 100 μSv = 0.1 mSv', () => {
      expect(parseFloat(linearConvert(uSv, mSv, '100'))).toBeCloseTo(0.1, 5);
    });
  });
});

// ============================================================================
// LUMINOUS INTENSITY UNITS - All 6 units tested
// ============================================================================

describe('Luminous Intensity Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(luminousIntensityUnits, 'candela');

  describe('All luminous intensity units to base (Candela)', () => {
    luminousIntensityUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to cd`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 3);
      });
    });
  });

  describe('All luminous intensity units from base (Candela)', () => {
    luminousIntensityUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} cd to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mcd = findUnit(luminousIntensityUnits, 'millicandela');
    const cp = findUnit(luminousIntensityUnits, 'candlepower');

    it('1 cd = 1000 mcd', () => {
      expect(parseFloat(linearConvert(baseUnit, mcd, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 candlepower = 1 candela (modern definition)', () => {
      expect(parseFloat(linearConvert(cp, baseUnit, '1'))).toBeCloseTo(1, 5);
    });
  });
});

// ============================================================================
// LUMINOUS FLUX UNITS - All 3 units tested
// ============================================================================

describe('Luminous Flux Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(luminousFluxUnits, 'lumen');

  describe('All luminous flux units to base (Lumen)', () => {
    luminousFluxUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to lm`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 3);
      });
    });
  });

  describe('All luminous flux units from base (Lumen)', () => {
    luminousFluxUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} lm to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const mlm = findUnit(luminousFluxUnits, 'millilumen');
    const klm = findUnit(luminousFluxUnits, 'kilolumen');

    it('1 lm = 1000 mlm', () => {
      expect(parseFloat(linearConvert(baseUnit, mlm, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 klm = 1000 lm', () => {
      expect(parseFloat(linearConvert(klm, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('LED bulb: 800 lm = 0.8 klm', () => {
      expect(parseFloat(linearConvert(baseUnit, klm, '800'))).toBeCloseTo(0.8, 5);
    });
  });
});

// ============================================================================
// ILLUMINANCE UNITS - All 6 units tested
// ============================================================================

describe('Illuminance Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(illuminanceUnits, 'lux');

  describe('All illuminance units to base (Lux)', () => {
    illuminanceUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to lux`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 2);
      });
    });
  });

  describe('All illuminance units from base (Lux)', () => {
    illuminanceUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} lux to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const fc = findUnit(illuminanceUnits, 'foot-candle');
    const phot = findUnit(illuminanceUnits, 'phot');
    const klux = findUnit(illuminanceUnits, 'kilolux');

    it('1 foot-candle ≈ 10.76 lux', () => {
      expect(parseFloat(linearConvert(fc, baseUnit, '1'))).toBeCloseTo(10.76, 1);
    });

    it('1 phot = 10,000 lux', () => {
      expect(parseFloat(linearConvert(phot, baseUnit, '1'))).toBeCloseTo(10000, 0);
    });

    it('1 klux = 1000 lux', () => {
      expect(parseFloat(linearConvert(klux, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('office lighting: 500 lux ≈ 46.5 fc', () => {
      expect(parseFloat(linearConvert(baseUnit, fc, '500'))).toBeCloseTo(46.5, 0);
    });

    it('sunny day: 100,000 lux = 100 klux', () => {
      expect(parseFloat(linearConvert(baseUnit, klux, '100000'))).toBeCloseTo(100, 0);
    });
  });
});

// ============================================================================
// LUMINANCE UNITS - All 7 units tested
// ============================================================================

describe('Luminance Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(luminanceUnits, 'candela-per-square-meter');

  describe('All luminance units to base (cd/m²)', () => {
    luminanceUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to cd/m²`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 2);
      });
    });
  });

  describe('All luminance units from base (cd/m²)', () => {
    luminanceUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} cd/m² to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('Known reference conversions', () => {
    const nit = findUnit(luminanceUnits, 'nit');
    const footLambert = findUnit(luminanceUnits, 'foot-lambert');
    const stilb = findUnit(luminanceUnits, 'stilb');

    it('1 nit = 1 cd/m²', () => {
      expect(parseFloat(linearConvert(nit, baseUnit, '1'))).toBeCloseTo(1, 5);
    });

    it('1 stilb = 10,000 cd/m²', () => {
      expect(parseFloat(linearConvert(stilb, baseUnit, '1'))).toBeCloseTo(10000, 0);
    });

    it('1 foot-lambert ≈ 3.426 cd/m²', () => {
      expect(parseFloat(linearConvert(footLambert, baseUnit, '1'))).toBeCloseTo(3.426, 2);
    });

    it('monitor: 300 cd/m² = 300 nits', () => {
      expect(parseFloat(linearConvert(baseUnit, nit, '300'))).toBeCloseTo(300, 0);
    });

    it('HDR display: 1000 nits = 1000 cd/m²', () => {
      expect(parseFloat(linearConvert(nit, baseUnit, '1000'))).toBeCloseTo(1000, 0);
    });
  });
});

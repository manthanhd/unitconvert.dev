import { describe, it, expect } from 'vitest';
import { linearConvert } from './linear';
import { dataStorageUnits, dataTransferUnits, typographyUnits } from '../data/digital';
import type { Unit } from '../data/types';

// Helper to find unit by ID
const findUnit = (units: Unit[], id: string): Unit => {
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`Unit not found: ${id}`);
  return unit;
};

// ============================================================================
// DATA STORAGE UNITS - All 19 units tested
// ============================================================================

describe('Data Storage Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(dataStorageUnits, 'byte');

  describe('All data storage units to base (byte)', () => {
    dataStorageUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to bytes`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        const toBase = unit.toBase as number;
        // Use relative tolerance for very large values (TiB, PiB, etc.)
        if (toBase > 1e12) {
          expect(result / toBase).toBeCloseTo(1, 4);
        } else {
          expect(result).toBeCloseTo(toBase, 0);
        }
      });
    });
  });

  describe('All data storage units from base (byte)', () => {
    dataStorageUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} bytes to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Decimal (SI) units', () => {
    const KB = findUnit(dataStorageUnits, 'kilobyte');
    const MB = findUnit(dataStorageUnits, 'megabyte');
    const GB = findUnit(dataStorageUnits, 'gigabyte');
    const TB = findUnit(dataStorageUnits, 'terabyte');
    const PB = findUnit(dataStorageUnits, 'petabyte');

    it('1 KB = 1000 bytes', () => {
      expect(parseFloat(linearConvert(KB, baseUnit, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 MB = 1,000,000 bytes', () => {
      expect(parseFloat(linearConvert(MB, baseUnit, '1'))).toBeCloseTo(1e6, 0);
    });

    it('1 GB = 1,000,000,000 bytes', () => {
      expect(parseFloat(linearConvert(GB, baseUnit, '1'))).toBeCloseTo(1e9, 0);
    });

    it('1 TB = 1,000,000,000,000 bytes', () => {
      expect(parseFloat(linearConvert(TB, baseUnit, '1'))).toBeCloseTo(1e12, 0);
    });

    it('1 TB = 1000 GB', () => {
      expect(parseFloat(linearConvert(TB, GB, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 PB = 1000 TB', () => {
      expect(parseFloat(linearConvert(PB, TB, '1'))).toBeCloseTo(1000, 0);
    });
  });

  describe('Binary (IEC) units', () => {
    const KiB = findUnit(dataStorageUnits, 'kibibyte');
    const MiB = findUnit(dataStorageUnits, 'mebibyte');
    const GiB = findUnit(dataStorageUnits, 'gibibyte');
    const TiB = findUnit(dataStorageUnits, 'tebibyte');
    const PiB = findUnit(dataStorageUnits, 'pebibyte');

    it('1 KiB = 1024 bytes', () => {
      expect(parseFloat(linearConvert(KiB, baseUnit, '1'))).toBeCloseTo(1024, 0);
    });

    it('1 MiB = 1,048,576 bytes (1024²)', () => {
      expect(parseFloat(linearConvert(MiB, baseUnit, '1'))).toBeCloseTo(1048576, 0);
    });

    it('1 GiB = 1,073,741,824 bytes (1024³)', () => {
      expect(parseFloat(linearConvert(GiB, baseUnit, '1'))).toBeCloseTo(1073741824, 0);
    });

    it('1 TiB = 1024 GiB', () => {
      expect(parseFloat(linearConvert(TiB, GiB, '1'))).toBeCloseTo(1024, 0);
    });

    it('1 PiB = 1024 TiB', () => {
      expect(parseFloat(linearConvert(PiB, TiB, '1'))).toBeCloseTo(1024, 0);
    });
  });

  describe('SI vs IEC comparison', () => {
    const GB = findUnit(dataStorageUnits, 'gigabyte');
    const GiB = findUnit(dataStorageUnits, 'gibibyte');
    const TB = findUnit(dataStorageUnits, 'terabyte');
    const TiB = findUnit(dataStorageUnits, 'tebibyte');

    it('1 GiB > 1 GB (binary vs decimal)', () => {
      const gibibyte = GiB.toBase as number;
      const gigabyte = GB.toBase as number;
      expect(gibibyte).toBeGreaterThan(gigabyte);
    });

    it('1 GiB ≈ 1.074 GB', () => {
      expect(parseFloat(linearConvert(GiB, GB, '1'))).toBeCloseTo(1.074, 2);
    });

    it('1 TiB ≈ 1.1 TB', () => {
      expect(parseFloat(linearConvert(TiB, TB, '1'))).toBeCloseTo(1.1, 1);
    });

    it('HDD: 1 TB = 931 GiB (why your drive shows less)', () => {
      expect(parseFloat(linearConvert(TB, GiB, '1'))).toBeCloseTo(931, 0);
    });
  });

  describe('Bits and bytes', () => {
    const bit = findUnit(dataStorageUnits, 'bit');
    const nibble = findUnit(dataStorageUnits, 'nibble');

    it('8 bits = 1 byte', () => {
      expect(parseFloat(linearConvert(bit, baseUnit, '8'))).toBeCloseTo(1, 0);
    });

    it('1 byte = 8 bits', () => {
      expect(parseFloat(linearConvert(baseUnit, bit, '1'))).toBeCloseTo(8, 0);
    });

    it('1 nibble = 4 bits = 0.5 bytes', () => {
      expect(parseFloat(linearConvert(nibble, baseUnit, '1'))).toBeCloseTo(0.5, 0);
    });

    it('1 nibble = 4 bits', () => {
      expect(parseFloat(linearConvert(nibble, bit, '1'))).toBeCloseTo(4, 0);
    });
  });

  describe('Real-world scenarios', () => {
    const MB = findUnit(dataStorageUnits, 'megabyte');
    const GB = findUnit(dataStorageUnits, 'gigabyte');
    const GiB = findUnit(dataStorageUnits, 'gibibyte');

    it('photo: 5 MB = 5,000,000 bytes', () => {
      expect(parseFloat(linearConvert(MB, baseUnit, '5'))).toBeCloseTo(5e6, 0);
    });

    it('movie: 4 GB = 4,000 MB', () => {
      expect(parseFloat(linearConvert(GB, MB, '4'))).toBeCloseTo(4000, 0);
    });

    it('RAM: 16 GiB = 17.18 GB', () => {
      expect(parseFloat(linearConvert(GiB, GB, '16'))).toBeCloseTo(17.18, 1);
    });
  });

  describe('Round-trip conversions', () => {
    const GB = findUnit(dataStorageUnits, 'gigabyte');
    const MB = findUnit(dataStorageUnits, 'megabyte');

    it('GB → MB → GB should return original', () => {
      const intermediate = linearConvert(GB, MB, '10');
      const result = parseFloat(linearConvert(MB, GB, intermediate));
      expect(result).toBeCloseTo(10, 5);
    });
  });
});

// ============================================================================
// DATA TRANSFER UNITS - All 12 units tested
// ============================================================================

describe('Data Transfer Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(dataTransferUnits, 'bit-per-second');

  describe('All data transfer units to base (bps)', () => {
    dataTransferUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to bps`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 0);
      });
    });
  });

  describe('All data transfer units from base (bps)', () => {
    dataTransferUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} bps to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Known reference conversions', () => {
    const Kbps = findUnit(dataTransferUnits, 'kilobit-per-second');
    const Mbps = findUnit(dataTransferUnits, 'megabit-per-second');
    const Gbps = findUnit(dataTransferUnits, 'gigabit-per-second');
    const MBps = findUnit(dataTransferUnits, 'megabyte-per-second');
    const KBps = findUnit(dataTransferUnits, 'kilobyte-per-second');

    it('1 Mbps = 1000 Kbps', () => {
      expect(parseFloat(linearConvert(Mbps, Kbps, '1'))).toBeCloseTo(1000, 0);
    });

    it('1 Gbps = 1000 Mbps', () => {
      expect(parseFloat(linearConvert(Gbps, Mbps, '1'))).toBeCloseTo(1000, 0);
    });

    it('8 Mbps = 1 MB/s', () => {
      expect(parseFloat(linearConvert(Mbps, MBps, '8'))).toBeCloseTo(1, 5);
    });

    it('1 MB/s = 8 Mbps', () => {
      expect(parseFloat(linearConvert(MBps, Mbps, '1'))).toBeCloseTo(8, 0);
    });

    it('1 KB/s = 8 Kbps', () => {
      expect(parseFloat(linearConvert(KBps, Kbps, '1'))).toBeCloseTo(8, 0);
    });

    it('1 Gbps = 125 MB/s', () => {
      expect(parseFloat(linearConvert(Gbps, MBps, '1'))).toBeCloseTo(125, 0);
    });
  });

  describe('Internet speed scenarios', () => {
    const Mbps = findUnit(dataTransferUnits, 'megabit-per-second');
    const MBps = findUnit(dataTransferUnits, 'megabyte-per-second');
    const Gbps = findUnit(dataTransferUnits, 'gigabit-per-second');

    it('100 Mbps internet = 12.5 MB/s download', () => {
      expect(parseFloat(linearConvert(Mbps, MBps, '100'))).toBeCloseTo(12.5, 1);
    });

    it('1 Gbps fiber = 125 MB/s download', () => {
      expect(parseFloat(linearConvert(Gbps, MBps, '1'))).toBeCloseTo(125, 0);
    });

    it('25 Mbps (HD streaming) = 3.125 MB/s', () => {
      expect(parseFloat(linearConvert(Mbps, MBps, '25'))).toBeCloseTo(3.125, 2);
    });
  });

  describe('Binary transfer rates', () => {
    const MiBps = findUnit(dataTransferUnits, 'mebibyte-per-second');
    const MBps = findUnit(dataTransferUnits, 'megabyte-per-second');

    it('1 MiB/s ≈ 1.049 MB/s', () => {
      expect(parseFloat(linearConvert(MiBps, MBps, '1'))).toBeCloseTo(1.049, 2);
    });
  });

  describe('Round-trip conversions', () => {
    const Mbps = findUnit(dataTransferUnits, 'megabit-per-second');
    const MBps = findUnit(dataTransferUnits, 'megabyte-per-second');

    it('Mbps → MB/s → Mbps should return original', () => {
      const intermediate = linearConvert(Mbps, MBps, '100');
      const result = parseFloat(linearConvert(MBps, Mbps, intermediate));
      expect(result).toBeCloseTo(100, 5);
    });
  });
});

// ============================================================================
// TYPOGRAPHY UNITS - All 14 units tested
// ============================================================================

describe('Typography Units - Comprehensive Tests', () => {
  const baseUnit = findUnit(typographyUnits, 'pixel');

  describe('All typography units to base (pixel)', () => {
    typographyUnits.forEach((unit) => {
      it(`should convert 1 ${unit.name} to pixels`, () => {
        const result = parseFloat(linearConvert(unit, baseUnit, '1'));
        expect(result).toBeCloseTo(unit.toBase as number, 3);
      });
    });
  });

  describe('All typography units from base (pixel)', () => {
    typographyUnits.forEach((unit) => {
      it(`should convert ${unit.toBase} px to 1 ${unit.name}`, () => {
        const result = parseFloat(linearConvert(baseUnit, unit, String(unit.toBase)));
        expect(result).toBeCloseTo(1, 3);
      });
    });
  });

  describe('CSS absolute units', () => {
    const pt = findUnit(typographyUnits, 'point');
    const pc = findUnit(typographyUnits, 'pica');
    const inCSS = findUnit(typographyUnits, 'inch-css');
    const cm = findUnit(typographyUnits, 'centimeter-css');
    const mm = findUnit(typographyUnits, 'millimeter-css');

    it('1 inch = 96 pixels (CSS definition)', () => {
      expect(parseFloat(linearConvert(inCSS, baseUnit, '1'))).toBeCloseTo(96, 0);
    });

    it('1 inch = 72 points', () => {
      expect(parseFloat(linearConvert(inCSS, pt, '1'))).toBeCloseTo(72, 0);
    });

    it('1 inch = 6 picas', () => {
      expect(parseFloat(linearConvert(inCSS, pc, '1'))).toBeCloseTo(6, 0);
    });

    it('1 pica = 12 points', () => {
      expect(parseFloat(linearConvert(pc, pt, '1'))).toBeCloseTo(12, 0);
    });

    it('1 inch = 2.54 cm (CSS)', () => {
      expect(parseFloat(linearConvert(inCSS, cm, '1'))).toBeCloseTo(2.54, 1);
    });

    it('1 cm = 10 mm (CSS)', () => {
      expect(parseFloat(linearConvert(cm, mm, '1'))).toBeCloseTo(10, 0);
    });

    it('1 point ≈ 1.333 pixels', () => {
      expect(parseFloat(linearConvert(pt, baseUnit, '1'))).toBeCloseTo(1.333, 2);
    });
  });

  describe('CSS relative units', () => {
    const em = findUnit(typographyUnits, 'em');
    const rem = findUnit(typographyUnits, 'rem');
    const ch = findUnit(typographyUnits, 'ch');
    const ex = findUnit(typographyUnits, 'ex');

    it('1 em = 16 pixels (default browser)', () => {
      expect(parseFloat(linearConvert(em, baseUnit, '1'))).toBeCloseTo(16, 0);
    });

    it('1 rem = 16 pixels (root default)', () => {
      expect(parseFloat(linearConvert(rem, baseUnit, '1'))).toBeCloseTo(16, 0);
    });

    it('1 em = 1 rem (when root is default)', () => {
      expect(parseFloat(linearConvert(em, rem, '1'))).toBeCloseTo(1, 5);
    });

    it('1 ch ≈ 8 pixels (character width)', () => {
      expect(parseFloat(linearConvert(ch, baseUnit, '1'))).toBeCloseTo(8, 0);
    });

    it('1 ex ≈ 8 pixels (x-height)', () => {
      expect(parseFloat(linearConvert(ex, baseUnit, '1'))).toBeCloseTo(8, 0);
    });

    it('2 ch = 1 em (approximately)', () => {
      expect(parseFloat(linearConvert(ch, em, '2'))).toBeCloseTo(1, 1);
    });
  });

  describe('CSS font size conversions', () => {
    const pt = findUnit(typographyUnits, 'point');
    const em = findUnit(typographyUnits, 'em');

    it('12 pt body text ≈ 16 px (browser default)', () => {
      expect(parseFloat(linearConvert(pt, baseUnit, '12'))).toBeCloseTo(16, 0);
    });

    it('10 pt ≈ 0.83 em', () => {
      expect(parseFloat(linearConvert(pt, em, '10'))).toBeCloseTo(0.83, 1);
    });

    it('14 pt ≈ 1.17 em', () => {
      expect(parseFloat(linearConvert(pt, em, '14'))).toBeCloseTo(1.17, 1);
    });
  });

  describe('Viewport units (1920x1080)', () => {
    const vw = findUnit(typographyUnits, 'viewport-width');
    const vh = findUnit(typographyUnits, 'viewport-height');

    it('100 vw = 1920 px (full width)', () => {
      expect(parseFloat(linearConvert(vw, baseUnit, '100'))).toBeCloseTo(1920, 0);
    });

    it('100 vh = 1080 px (full height)', () => {
      expect(parseFloat(linearConvert(vh, baseUnit, '100'))).toBeCloseTo(1080, 0);
    });

    it('50 vw = 960 px (half width)', () => {
      expect(parseFloat(linearConvert(vw, baseUnit, '50'))).toBeCloseTo(960, 0);
    });
  });

  describe('Round-trip conversions', () => {
    const pt = findUnit(typographyUnits, 'point');

    it('px → pt → px should return original', () => {
      const intermediate = linearConvert(baseUnit, pt, '16');
      const result = parseFloat(linearConvert(pt, baseUnit, intermediate));
      expect(result).toBeCloseTo(16, 5);
    });
  });
});

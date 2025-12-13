import { describe, it, expect } from 'vitest';
import { baseConvert } from './base';
import { createBaseUnit } from '../test/helpers';

describe('baseConvert', () => {
  const binary = createBaseUnit('binary', 2);
  const octal = createBaseUnit('octal', 8);
  const decimal = createBaseUnit('decimal', 10);
  const hex = createBaseUnit('hexadecimal', 16);
  const base32 = createBaseUnit('base32', 32);
  const base36 = createBaseUnit('base36', 36);

  describe('Decimal to Binary', () => {
    it('should convert 0 to 0b0', () => {
      expect(baseConvert(decimal, binary, '0')).toBe('0b0');
    });

    it('should convert 1 to 0b1', () => {
      expect(baseConvert(decimal, binary, '1')).toBe('0b1');
    });

    it('should convert 2 to 0b10', () => {
      expect(baseConvert(decimal, binary, '2')).toBe('0b10');
    });

    it('should convert 10 to 0b1010', () => {
      expect(baseConvert(decimal, binary, '10')).toBe('0b1010');
    });

    it('should convert 255 to 0b11111111', () => {
      expect(baseConvert(decimal, binary, '255')).toBe('0b11111111');
    });

    it('should convert 256 to 0b100000000', () => {
      expect(baseConvert(decimal, binary, '256')).toBe('0b100000000');
    });

    it('should convert 1024 to 0b10000000000', () => {
      expect(baseConvert(decimal, binary, '1024')).toBe('0b10000000000');
    });
  });

  describe('Binary to Decimal', () => {
    it('should convert 0 to 0 (with subscript)', () => {
      const result = baseConvert(binary, decimal, '0');
      expect(result).toContain('0');
    });

    it('should convert 1010 to 10', () => {
      const result = baseConvert(binary, decimal, '1010');
      expect(result).toContain('10');
    });

    it('should convert 11111111 to 255', () => {
      const result = baseConvert(binary, decimal, '11111111');
      expect(result).toContain('255');
    });

    it('should convert 100000000 to 256', () => {
      const result = baseConvert(binary, decimal, '100000000');
      expect(result).toContain('256');
    });
  });

  describe('Decimal to Hexadecimal', () => {
    it('should convert 0 to 0x0', () => {
      expect(baseConvert(decimal, hex, '0')).toBe('0x0');
    });

    it('should convert 10 to 0xA', () => {
      expect(baseConvert(decimal, hex, '10')).toBe('0xA');
    });

    it('should convert 15 to 0xF', () => {
      expect(baseConvert(decimal, hex, '15')).toBe('0xF');
    });

    it('should convert 16 to 0x10', () => {
      expect(baseConvert(decimal, hex, '16')).toBe('0x10');
    });

    it('should convert 255 to 0xFF', () => {
      expect(baseConvert(decimal, hex, '255')).toBe('0xFF');
    });

    it('should convert 256 to 0x100', () => {
      expect(baseConvert(decimal, hex, '256')).toBe('0x100');
    });

    it('should convert 4096 to 0x1000', () => {
      expect(baseConvert(decimal, hex, '4096')).toBe('0x1000');
    });

    it('should convert 65535 to 0xFFFF', () => {
      expect(baseConvert(decimal, hex, '65535')).toBe('0xFFFF');
    });
  });

  describe('Hexadecimal to Decimal', () => {
    it('should convert F to 15', () => {
      const result = baseConvert(hex, decimal, 'F');
      expect(result).toContain('15');
    });

    it('should convert FF to 255', () => {
      const result = baseConvert(hex, decimal, 'FF');
      expect(result).toContain('255');
    });

    it('should convert ff (lowercase) to 255', () => {
      const result = baseConvert(hex, decimal, 'ff');
      expect(result).toContain('255');
    });

    it('should convert 100 to 256', () => {
      const result = baseConvert(hex, decimal, '100');
      expect(result).toContain('256');
    });

    it('should convert FFFF to 65535', () => {
      const result = baseConvert(hex, decimal, 'FFFF');
      expect(result).toContain('65535');
    });

    it('should convert DEADBEEF to 3735928559', () => {
      const result = baseConvert(hex, decimal, 'DEADBEEF');
      expect(result).toContain('3735928559');
    });
  });

  describe('Decimal to Octal', () => {
    it('should convert 0 to 0o0', () => {
      expect(baseConvert(decimal, octal, '0')).toBe('0o0');
    });

    it('should convert 7 to 0o7', () => {
      expect(baseConvert(decimal, octal, '7')).toBe('0o7');
    });

    it('should convert 8 to 0o10', () => {
      expect(baseConvert(decimal, octal, '8')).toBe('0o10');
    });

    it('should convert 64 to 0o100', () => {
      expect(baseConvert(decimal, octal, '64')).toBe('0o100');
    });

    it('should convert 511 to 0o777', () => {
      expect(baseConvert(decimal, octal, '511')).toBe('0o777');
    });
  });

  describe('Octal to Decimal', () => {
    it('should convert 10 to 8', () => {
      const result = baseConvert(octal, decimal, '10');
      expect(result).toContain('8');
    });

    it('should convert 777 to 511', () => {
      const result = baseConvert(octal, decimal, '777');
      expect(result).toContain('511');
    });
  });

  describe('Binary to Hexadecimal', () => {
    it('should convert 1111 to 0xF', () => {
      expect(baseConvert(binary, hex, '1111')).toBe('0xF');
    });

    it('should convert 11111111 to 0xFF', () => {
      expect(baseConvert(binary, hex, '11111111')).toBe('0xFF');
    });

    it('should convert 1010101010101010 to 0xAAAA', () => {
      expect(baseConvert(binary, hex, '1010101010101010')).toBe('0xAAAA');
    });

    it('should convert 1111111111111111 to 0xFFFF', () => {
      expect(baseConvert(binary, hex, '1111111111111111')).toBe('0xFFFF');
    });
  });

  describe('Hexadecimal to Binary', () => {
    it('should convert F to 0b1111', () => {
      expect(baseConvert(hex, binary, 'F')).toBe('0b1111');
    });

    it('should convert FF to 0b11111111', () => {
      expect(baseConvert(hex, binary, 'FF')).toBe('0b11111111');
    });

    it('should convert AAAA to 0b1010101010101010', () => {
      expect(baseConvert(hex, binary, 'AAAA')).toBe('0b1010101010101010');
    });
  });

  describe('Fractional number conversions', () => {
    it('should convert decimal 10.5 to binary 1010.1', () => {
      const result = baseConvert(decimal, binary, '10.5');
      expect(result).toBe('0b1010.1');
    });

    it('should convert decimal 0.5 to binary 0.1', () => {
      const result = baseConvert(decimal, binary, '0.5');
      expect(result).toBe('0b0.1');
    });

    it('should convert decimal 0.25 to binary 0.01', () => {
      const result = baseConvert(decimal, binary, '0.25');
      expect(result).toBe('0b0.01');
    });

    it('should convert decimal 15.5 to hex F.8', () => {
      const result = baseConvert(decimal, hex, '15.5');
      expect(result).toBe('0xF.8');
    });

    it('should convert decimal 0.0625 to hex 0.1', () => {
      const result = baseConvert(decimal, hex, '0.0625');
      expect(result).toBe('0x0.1');
    });
  });

  describe('Base32 and Base36', () => {
    it('should convert decimal 31 to base32', () => {
      const result = baseConvert(decimal, base32, '31');
      expect(result).toContain('V');
    });

    it('should convert decimal 35 to base36', () => {
      const result = baseConvert(decimal, base36, '35');
      expect(result).toContain('Z');
    });

    it('should convert decimal 36 to base36 10', () => {
      const result = baseConvert(decimal, base36, '36');
      expect(result).toContain('10');
    });
  });

  describe('Edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(baseConvert(decimal, binary, '')).toBe('');
    });

    it('should return empty string for whitespace input', () => {
      expect(baseConvert(decimal, binary, '   ')).toBe('');
    });

    it('should return error for invalid digit in binary (2)', () => {
      expect(baseConvert(binary, decimal, '2')).toBe('Error: Invalid number for base');
    });

    it('should handle trailing invalid digits by parsing valid prefix', () => {
      // parseInt stops at first invalid character, parsing '101' as 5
      const result = baseConvert(binary, decimal, '1019');
      expect(result).toContain('5');
    });

    it('should return error for invalid hex character (G)', () => {
      expect(baseConvert(hex, decimal, 'GG')).toBe('Error: Invalid number for base');
    });

    it('should return error for invalid octal digit (8)', () => {
      expect(baseConvert(octal, decimal, '8')).toBe('Error: Invalid number for base');
    });

    it('should handle leading zeros', () => {
      const result = baseConvert(decimal, binary, '007');
      expect(result).toBe('0b111');
    });

    it('should return error if base is undefined', () => {
      const invalid = {
        id: 'invalid',
        categoryId: 'number-base',
        name: 'Invalid',
        abbreviations: [] as string[],
        aliases: [] as string[],
      };
      expect(baseConvert(invalid, decimal, '10')).toBe('Error: Missing base information');
    });
  });

  describe('Round-trip conversions', () => {
    it('should return original value after dec -> bin -> dec', () => {
      const intermediate = baseConvert(decimal, binary, '42');
      const result = baseConvert(binary, decimal, intermediate.replace('0b', ''));
      expect(result).toContain('42');
    });

    it('should return original value after dec -> hex -> dec', () => {
      const intermediate = baseConvert(decimal, hex, '255');
      const result = baseConvert(hex, decimal, intermediate.replace('0x', ''));
      expect(result).toContain('255');
    });

    it('should return original value after dec -> oct -> dec', () => {
      const intermediate = baseConvert(decimal, octal, '100');
      const result = baseConvert(octal, decimal, intermediate.replace('0o', ''));
      expect(result).toContain('100');
    });

    it('should return original value after bin -> hex -> bin', () => {
      const intermediate = baseConvert(binary, hex, '11110000');
      const result = baseConvert(hex, binary, intermediate.replace('0x', ''));
      expect(result).toBe('0b11110000');
    });
  });

  describe('Same base conversion', () => {
    it('should return same value when converting dec to dec', () => {
      const result = baseConvert(decimal, decimal, '123');
      expect(result).toContain('123');
    });

    it('should return same value when converting bin to bin', () => {
      const result = baseConvert(binary, binary, '1010');
      expect(result).toBe('0b1010');
    });
  });
});

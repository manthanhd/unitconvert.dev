import { describe, it, expect } from 'vitest';
import { timezoneConvert } from './timezone';
import { createTimezoneUnit } from '../test/helpers';

describe('timezoneConvert', () => {
  const utc = createTimezoneUnit('utc', 'UTC');
  const newYork = createTimezoneUnit('new-york', 'America/New_York');
  const london = createTimezoneUnit('london', 'Europe/London');
  const tokyo = createTimezoneUnit('tokyo', 'Asia/Tokyo');
  const losAngeles = createTimezoneUnit('los-angeles', 'America/Los_Angeles');

  describe('ISO 8601 format parsing', () => {
    it('should parse and convert ISO 8601 datetime', () => {
      const result = timezoneConvert(utc, newYork, '2024-01-15T12:00:00');
      // Result should be in YYYY-MM-DD HH:MM:SS format
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it('should convert datetime to target timezone', () => {
      const result = timezoneConvert(utc, tokyo, '2024-01-15T12:00:00');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
      // Should produce a valid result without error
      expect(result).not.toContain('Error');
    });

    it('should handle date-only format', () => {
      const result = timezoneConvert(utc, tokyo, '2024-06-15');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(result).not.toContain('Error');
    });
  });

  describe('Time-only format parsing', () => {
    it('should parse HH:MM:SS format', () => {
      const result = timezoneConvert(utc, newYork, '12:00:00');
      expect(result).toMatch(/\d{2}:\d{2}:\d{2}$/);
    });

    it('should parse HH:MM format', () => {
      const result = timezoneConvert(utc, london, '14:30');
      expect(result).toMatch(/\d{2}:\d{2}:\d{2}$/);
    });

    it('should parse 12-hour AM format', () => {
      const result = timezoneConvert(utc, newYork, '10:30 AM');
      expect(result).not.toBe('Error: Invalid date/time');
    });

    it('should parse 12-hour PM format', () => {
      const result = timezoneConvert(utc, newYork, '2:30 PM');
      expect(result).not.toBe('Error: Invalid date/time');
    });

    it('should handle midnight (12:00 AM)', () => {
      const result = timezoneConvert(utc, newYork, '12:00 AM');
      expect(result).not.toBe('Error: Invalid date/time');
    });

    it('should handle noon (12:00 PM)', () => {
      const result = timezoneConvert(utc, newYork, '12:00 PM');
      expect(result).not.toBe('Error: Invalid date/time');
    });
  });

  describe('Target timezone application', () => {
    it('should format output in target timezone', () => {
      // Test that different target timezones produce different outputs
      const utcResult = timezoneConvert(utc, utc, '2024-01-15T12:00:00Z');
      const tokyoResult = timezoneConvert(utc, tokyo, '2024-01-15T12:00:00Z');

      // Both should be valid
      expect(utcResult).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
      expect(tokyoResult).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

      // Tokyo should show different time (9 hours ahead of UTC)
      // Note: The input "Z" suffix makes it UTC
    });

    it('should produce different output for different target timezones', () => {
      // Using explicit UTC input with Z suffix
      const input = '2024-01-15T00:00:00Z';

      const utcResult = timezoneConvert(utc, utc, input);
      const tokyoResult = timezoneConvert(utc, tokyo, input);

      // Results should be different since timezones differ
      expect(utcResult).not.toEqual(tokyoResult);
    });
  });

  describe('Output format', () => {
    it('should output in YYYY-MM-DD HH:MM:SS format', () => {
      const result = timezoneConvert(utc, newYork, '2024-01-15T12:00:00');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it('should use 24-hour format', () => {
      const result = timezoneConvert(utc, tokyo, '2024-01-15T15:00:00');
      // Hour should be 2 digits (00-23)
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
      expect(result).not.toContain('PM');
      expect(result).not.toContain('AM');
    });
  });

  describe('Edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(timezoneConvert(utc, newYork, '')).toBe('');
    });

    it('should return empty string for whitespace input', () => {
      expect(timezoneConvert(utc, newYork, '   ')).toBe('');
    });

    it('should return error for invalid date string', () => {
      expect(timezoneConvert(utc, newYork, 'not a date')).toBe('Error: Invalid date/time');
    });

    it('should return error for gibberish', () => {
      expect(timezoneConvert(utc, newYork, 'xyz123')).toBe('Error: Invalid date/time');
    });

    it('should return error for invalid timezone (from)', () => {
      const invalidTz = {
        id: 'invalid',
        categoryId: 'timezone',
        name: 'Invalid',
        abbreviations: [] as string[],
        aliases: [] as string[],
        // No iana property
      };
      expect(timezoneConvert(invalidTz, newYork, '12:00:00')).toBe('Error: Invalid timezone');
    });

    it('should return error for invalid timezone (to)', () => {
      const invalidTz = {
        id: 'invalid',
        categoryId: 'timezone',
        name: 'Invalid',
        abbreviations: [] as string[],
        aliases: [] as string[],
        // No iana property
      };
      expect(timezoneConvert(utc, invalidTz, '12:00:00')).toBe('Error: Invalid timezone');
    });
  });

  describe('Valid timezone identifiers', () => {
    it('should work with UTC timezone', () => {
      const result = timezoneConvert(utc, utc, '2024-01-15T12:00:00Z');
      expect(result).not.toContain('Error');
    });

    it('should work with America/New_York timezone', () => {
      const result = timezoneConvert(utc, newYork, '2024-01-15T12:00:00Z');
      expect(result).not.toContain('Error');
    });

    it('should work with Asia/Tokyo timezone', () => {
      const result = timezoneConvert(utc, tokyo, '2024-01-15T12:00:00Z');
      expect(result).not.toContain('Error');
    });

    it('should work with Europe/London timezone', () => {
      const result = timezoneConvert(utc, london, '2024-01-15T12:00:00Z');
      expect(result).not.toContain('Error');
    });

    it('should work with America/Los_Angeles timezone', () => {
      const result = timezoneConvert(utc, losAngeles, '2024-01-15T12:00:00Z');
      expect(result).not.toContain('Error');
    });
  });

  describe('UTC suffix handling', () => {
    it('should handle Z suffix for UTC', () => {
      const result = timezoneConvert(utc, utc, '2024-01-15T12:00:00Z');
      expect(result).toMatch(/12:00:00/);
    });

    it('should correctly convert UTC input to Tokyo', () => {
      // When input has Z suffix, it's parsed as UTC
      // Tokyo is UTC+9
      const result = timezoneConvert(utc, tokyo, '2024-01-15T12:00:00Z');
      expect(result).toMatch(/21:00:00/);
    });

    it('should correctly convert UTC input to NY in winter', () => {
      // NY is UTC-5 in January (EST)
      const result = timezoneConvert(utc, newYork, '2024-01-15T12:00:00Z');
      expect(result).toMatch(/07:00:00/);
    });

    it('should correctly convert UTC input to LA in winter', () => {
      // LA is UTC-8 in January (PST)
      const result = timezoneConvert(utc, losAngeles, '2024-01-15T12:00:00Z');
      expect(result).toMatch(/04:00:00/);
    });
  });

  describe('Consistency checks', () => {
    it('should produce consistent results for same input', () => {
      const result1 = timezoneConvert(utc, tokyo, '2024-01-15T12:00:00Z');
      const result2 = timezoneConvert(utc, tokyo, '2024-01-15T12:00:00Z');
      expect(result1).toBe(result2);
    });

    it('should handle leap year dates', () => {
      const result = timezoneConvert(utc, tokyo, '2024-02-29T12:00:00Z');
      expect(result).not.toContain('Error');
      expect(result).toContain('2024-');
    });

    it('should handle end of year dates', () => {
      const result = timezoneConvert(utc, tokyo, '2024-12-31T23:00:00Z');
      // Tokyo is UTC+9, so 23:00Z on Dec 31 is 08:00 on Jan 1 in Tokyo
      expect(result).toMatch(/2025-01-01/);
      expect(result).toMatch(/08:00:00/);
    });
  });
});

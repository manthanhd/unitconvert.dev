import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/preact';
import { useRecentConversions, isValidRecentConversion } from './useRecentConversions';
import type { Unit } from '../data/types';

// Helper to create mock units
function createMockUnit(id: string, name: string, categoryId: string = 'length'): Unit {
  return {
    id,
    categoryId,
    name,
    abbreviations: [id],
    aliases: [],
    toBase: 1,
  };
}

describe('useRecentConversions', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial state', () => {
    it('should return empty array initially when localStorage is empty', () => {
      const { result } = renderHook(() => useRecentConversions());
      expect(result.current.recents).toEqual([]);
    });
  });

  describe('addRecent', () => {
    it('should add a new conversion to recents', () => {
      const { result } = renderHook(() => useRecentConversions());

      const fromUnit = createMockUnit('meter', 'Meter');
      const toUnit = createMockUnit('kilometer', 'Kilometer');

      act(() => {
        result.current.addRecent(fromUnit, toUnit, '1000', '1');
      });

      expect(result.current.recents).toHaveLength(1);
      expect(result.current.recents[0].fromUnitId).toBe('meter');
      expect(result.current.recents[0].toUnitId).toBe('kilometer');
      expect(result.current.recents[0].fromValue).toBe('1000');
      expect(result.current.recents[0].toValue).toBe('1');
    });

    it('should add new conversions at the front', () => {
      const { result } = renderHook(() => useRecentConversions());

      const meter = createMockUnit('meter', 'Meter');
      const kilometer = createMockUnit('kilometer', 'Kilometer');
      const gram = createMockUnit('gram', 'Gram', 'mass');
      const kilogram = createMockUnit('kilogram', 'Kilogram', 'mass');

      act(() => {
        result.current.addRecent(meter, kilometer, '1000', '1');
      });

      act(() => {
        result.current.addRecent(gram, kilogram, '1000', '1');
      });

      expect(result.current.recents).toHaveLength(2);
      expect(result.current.recents[0].fromUnitId).toBe('gram');
      expect(result.current.recents[1].fromUnitId).toBe('meter');
    });

    it('should move existing conversion to front if already exists', () => {
      const { result } = renderHook(() => useRecentConversions());

      const meter = createMockUnit('meter', 'Meter');
      const kilometer = createMockUnit('kilometer', 'Kilometer');
      const gram = createMockUnit('gram', 'Gram', 'mass');
      const kilogram = createMockUnit('kilogram', 'Kilogram', 'mass');

      act(() => {
        result.current.addRecent(meter, kilometer, '1000', '1');
      });

      act(() => {
        result.current.addRecent(gram, kilogram, '1000', '1');
      });

      // Add meter->kilometer again with different values
      act(() => {
        result.current.addRecent(meter, kilometer, '2000', '2');
      });

      expect(result.current.recents).toHaveLength(2);
      expect(result.current.recents[0].fromUnitId).toBe('meter');
      expect(result.current.recents[0].fromValue).toBe('2000');
    });

    it('should limit to MAX_RECENT (10) items', () => {
      const { result } = renderHook(() => useRecentConversions());

      // Add 12 different conversions
      for (let i = 0; i < 12; i++) {
        const fromUnit = createMockUnit(`unit-${i}-from`, `Unit ${i} From`);
        const toUnit = createMockUnit(`unit-${i}-to`, `Unit ${i} To`);

        act(() => {
          result.current.addRecent(fromUnit, toUnit, `${i}`, `${i * 2}`);
        });
      }

      expect(result.current.recents).toHaveLength(10);
      // Most recent should be at front
      expect(result.current.recents[0].fromUnitId).toBe('unit-11-from');
    });
  });

  describe('removeRecent', () => {
    it('should remove a conversion from recents', () => {
      const { result } = renderHook(() => useRecentConversions());

      const meter = createMockUnit('meter', 'Meter');
      const kilometer = createMockUnit('kilometer', 'Kilometer');

      act(() => {
        result.current.addRecent(meter, kilometer, '1000', '1');
      });

      expect(result.current.recents).toHaveLength(1);

      act(() => {
        result.current.removeRecent('meter', 'kilometer');
      });

      expect(result.current.recents).toHaveLength(0);
    });

    it('should only remove the matching conversion', () => {
      const { result } = renderHook(() => useRecentConversions());

      const meter = createMockUnit('meter', 'Meter');
      const kilometer = createMockUnit('kilometer', 'Kilometer');
      const gram = createMockUnit('gram', 'Gram', 'mass');
      const kilogram = createMockUnit('kilogram', 'Kilogram', 'mass');

      act(() => {
        result.current.addRecent(meter, kilometer, '1000', '1');
        result.current.addRecent(gram, kilogram, '1000', '1');
      });

      act(() => {
        result.current.removeRecent('meter', 'kilometer');
      });

      expect(result.current.recents).toHaveLength(1);
      expect(result.current.recents[0].fromUnitId).toBe('gram');
    });

    it('should do nothing if conversion not found', () => {
      const { result } = renderHook(() => useRecentConversions());

      const meter = createMockUnit('meter', 'Meter');
      const kilometer = createMockUnit('kilometer', 'Kilometer');

      act(() => {
        result.current.addRecent(meter, kilometer, '1000', '1');
      });

      act(() => {
        result.current.removeRecent('nonexistent', 'unit');
      });

      expect(result.current.recents).toHaveLength(1);
    });
  });

  describe('Persistence', () => {
    it('should save recents to localStorage when changed', () => {
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

      const { result } = renderHook(() => useRecentConversions());

      const meter = createMockUnit('meter', 'Meter');
      const kilometer = createMockUnit('kilometer', 'Kilometer');

      act(() => {
        result.current.addRecent(meter, kilometer, '1000', '1');
      });

      expect(setItemSpy).toHaveBeenCalled();
    });

    it('should load recents from localStorage on mount', async () => {
      // Pre-populate localStorage
      const existingRecents = [
        {
          fromUnitId: 'meter',
          toUnitId: 'kilometer',
          fromUnitName: 'Meter',
          toUnitName: 'Kilometer',
          fromValue: '1000',
          toValue: '1',
          timestamp: Date.now(),
        },
      ];
      localStorage.setItem('converter-recent-conversions', JSON.stringify(existingRecents));

      const { result } = renderHook(() => useRecentConversions());

      // Wait for useEffect to load
      await waitFor(() => {
        expect(result.current.recents.length).toBe(1);
      });

      expect(result.current.recents[0].fromUnitId).toBe('meter');
    });

    it('should filter out invalid items from localStorage', async () => {
      // Pre-populate localStorage with mixed valid and invalid items
      const mixedData = [
        {
          fromUnitId: 'meter',
          toUnitId: 'kilometer',
          fromUnitName: 'Meter',
          toUnitName: 'Kilometer',
          fromValue: '1000',
          toValue: '1',
          timestamp: Date.now(),
        },
        {
          // Missing required fields
          fromUnitId: 'gram',
          toUnitId: 'kilogram',
        },
        {
          // Wrong types
          fromUnitId: 123,
          toUnitId: 'foot',
          fromUnitName: 'Inch',
          toUnitName: 'Foot',
          fromValue: '12',
          toValue: '1',
          timestamp: 'not-a-number',
        },
        null,
        'invalid string',
      ];
      localStorage.setItem('converter-recent-conversions', JSON.stringify(mixedData));

      const { result } = renderHook(() => useRecentConversions());

      // Wait for useEffect to load
      await waitFor(() => {
        expect(result.current.recents.length).toBe(1);
      });

      // Only the valid item should be loaded
      expect(result.current.recents[0].fromUnitId).toBe('meter');
    });

    it('should handle non-array localStorage data gracefully', async () => {
      // Store a non-array value
      localStorage.setItem('converter-recent-conversions', JSON.stringify({ not: 'an array' }));

      const { result } = renderHook(() => useRecentConversions());

      // Should return empty array since data is not an array
      await waitFor(() => {
        expect(result.current.recents).toEqual([]);
      });
    });

    it('should handle malformed JSON in localStorage gracefully', async () => {
      // Store invalid JSON
      localStorage.setItem('converter-recent-conversions', 'not valid json{');

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useRecentConversions());

      // Should return empty array and log error
      await waitFor(() => {
        expect(result.current.recents).toEqual([]);
      });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('isValidRecentConversion', () => {
    it('should return true for valid RecentConversion objects', () => {
      const valid = {
        fromUnitId: 'meter',
        toUnitId: 'kilometer',
        fromUnitName: 'Meter',
        toUnitName: 'Kilometer',
        fromValue: '1000',
        toValue: '1',
        timestamp: Date.now(),
      };
      expect(isValidRecentConversion(valid)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidRecentConversion(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidRecentConversion(undefined)).toBe(false);
    });

    it('should return false for primitive values', () => {
      expect(isValidRecentConversion('string')).toBe(false);
      expect(isValidRecentConversion(123)).toBe(false);
      expect(isValidRecentConversion(true)).toBe(false);
    });

    it('should return false for empty object', () => {
      expect(isValidRecentConversion({})).toBe(false);
    });

    it('should return false for object missing required fields', () => {
      expect(isValidRecentConversion({
        fromUnitId: 'meter',
        toUnitId: 'kilometer',
        // missing other fields
      })).toBe(false);
    });

    it('should return false for object with wrong field types', () => {
      expect(isValidRecentConversion({
        fromUnitId: 123, // should be string
        toUnitId: 'kilometer',
        fromUnitName: 'Meter',
        toUnitName: 'Kilometer',
        fromValue: '1000',
        toValue: '1',
        timestamp: Date.now(),
      })).toBe(false);

      expect(isValidRecentConversion({
        fromUnitId: 'meter',
        toUnitId: 'kilometer',
        fromUnitName: 'Meter',
        toUnitName: 'Kilometer',
        fromValue: '1000',
        toValue: '1',
        timestamp: 'not a number', // should be number
      })).toBe(false);
    });

    it('should return false for arrays', () => {
      expect(isValidRecentConversion([])).toBe(false);
    });
  });
});

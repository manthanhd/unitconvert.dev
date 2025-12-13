import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/preact';
import { useRecentConversions } from './useRecentConversions';
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
  });
});

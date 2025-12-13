import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/preact';
import { useAutocomplete } from './useAutocomplete';
import type { SearchableUnit } from '../data/types';

// Mock Fuse.js
vi.mock('fuse.js', () => {
  return {
    default: class MockFuse {
      items: SearchableUnit[];

      constructor(items: SearchableUnit[]) {
        this.items = items;
      }

      search(query: string) {
        // Simple mock search - filter by query in name or searchTerms
        return this.items
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.searchTerms.some((term: string) => term.toLowerCase().includes(query.toLowerCase())))
          .map((item) => ({ item, score: 0 }));
      }
    },
  };
});

// Mock data module
vi.mock('../data', () => ({
  buildSearchableUnits: vi.fn(() => [
    { id: 'meter', name: 'Meter', searchTerms: ['m', 'meter'], categoryId: 'length', categoryName: 'Length' },
    { id: 'kilometer', name: 'Kilometer', searchTerms: ['km', 'kilometer'], categoryId: 'length', categoryName: 'Length' },
    { id: 'mile', name: 'Mile', searchTerms: ['mi', 'mile'], categoryId: 'length', categoryName: 'Length' },
    { id: 'gram', name: 'Gram', searchTerms: ['g', 'gram'], categoryId: 'mass', categoryName: 'Mass' },
    { id: 'kilogram', name: 'Kilogram', searchTerms: ['kg', 'kilogram'], categoryId: 'mass', categoryName: 'Mass' },
    { id: 'celsius', name: 'Celsius', searchTerms: ['C', 'celsius'], categoryId: 'temperature', categoryName: 'Temperature' },
    { id: 'fahrenheit', name: 'Fahrenheit', searchTerms: ['F', 'fahrenheit'], categoryId: 'temperature', categoryName: 'Temperature' },
  ]),
}));

// Mock search config
vi.mock('../search/fuseConfig', () => ({
  fuseOptions: {
    keys: ['name', 'abbreviations', 'aliases'],
    threshold: 0.3,
  },
}));

describe('useAutocomplete', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Empty query', () => {
    it('should return all units when query is empty', () => {
      const { result } = renderHook(() => useAutocomplete(''));

      // Should have all 7 mock units
      expect(result.current.length).toBe(7);
    });

    it('should return all units when query is whitespace', () => {
      const { result } = renderHook(() => useAutocomplete('   '));

      expect(result.current.length).toBe(7);
    });
  });

  describe('Search by query', () => {
    it('should filter results by name', () => {
      const { result } = renderHook(() => useAutocomplete('meter'));

      // Should match "Meter" and "Kilometer"
      expect(result.current.length).toBe(2);
      expect(result.current.map((u) => u.id)).toContain('meter');
      expect(result.current.map((u) => u.id)).toContain('kilometer');
    });

    it('should filter results by abbreviation', () => {
      const { result } = renderHook(() => useAutocomplete('km'));

      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('kilometer');
    });

    it('should be case insensitive', () => {
      const { result } = renderHook(() => useAutocomplete('METER'));

      expect(result.current.length).toBe(2);
    });

    it('should return empty array when no matches', () => {
      const { result } = renderHook(() => useAutocomplete('xyz123'));

      expect(result.current.length).toBe(0);
    });
  });

  describe('Category filtering', () => {
    it('should filter by category when filterCategoryId is provided', () => {
      const { result } = renderHook(() => useAutocomplete('', 'length'));

      // Should only have length units (meter, kilometer, mile)
      expect(result.current.length).toBe(3);
      expect(result.current.every((u) => u.categoryId === 'length')).toBe(true);
    });

    it('should filter by category AND query', () => {
      const { result } = renderHook(() => useAutocomplete('meter', 'length'));

      // Should match "Meter" and "Kilometer" in length category
      expect(result.current.length).toBe(2);
      expect(result.current.every((u) => u.categoryId === 'length')).toBe(true);
    });

    it('should return empty when category has no matches for query', () => {
      const { result } = renderHook(() => useAutocomplete('celsius', 'length'));

      expect(result.current.length).toBe(0);
    });
  });

  describe('Priority category', () => {
    it('should prioritize units from priorityCategoryId when query is empty', () => {
      const { result } = renderHook(() => useAutocomplete('', undefined, 'mass'));

      // Mass units should come first
      const firstTwoIds = result.current.slice(0, 2).map((u) => u.id);
      expect(firstTwoIds).toContain('gram');
      expect(firstTwoIds).toContain('kilogram');
    });

    it('should still show all units even with priority', () => {
      const { result } = renderHook(() => useAutocomplete('', undefined, 'mass'));

      // Should still have all units
      expect(result.current.length).toBe(7);
    });

    it('should ignore priority when filterCategoryId is set', () => {
      const { result } = renderHook(() => useAutocomplete('', 'length', 'mass'));

      // Should only return length units (priority is ignored)
      expect(result.current.length).toBe(3);
      expect(result.current.every((u) => u.categoryId === 'length')).toBe(true);
    });
  });

  describe('Memoization', () => {
    it('should return same results reference for same inputs', () => {
      const { result, rerender } = renderHook(({ query, filter, priority }) => useAutocomplete(query, filter, priority), {
        initialProps: { query: 'meter', filter: undefined, priority: undefined },
      });

      const firstResult = result.current;

      rerender({ query: 'meter', filter: undefined, priority: undefined });

      // Results should be referentially equal (memoized)
      expect(result.current).toBe(firstResult);
    });

    it('should update results when query changes', () => {
      const { result, rerender } = renderHook(({ query }) => useAutocomplete(query), {
        initialProps: { query: 'meter' },
      });

      expect(result.current.length).toBe(2);

      rerender({ query: 'gram' });

      expect(result.current.length).toBe(2);
      expect(result.current.map((u) => u.id)).toContain('gram');
      expect(result.current.map((u) => u.id)).toContain('kilogram');
    });

    it('should update results when filter changes', () => {
      const { result, rerender } = renderHook(({ query, filter }) => useAutocomplete(query, filter), {
        initialProps: { query: '', filter: undefined as string | undefined },
      });

      expect(result.current.length).toBe(7);

      rerender({ query: '', filter: 'mass' });

      expect(result.current.length).toBe(2);
    });
  });

  describe('Diverse results (no filter, no priority)', () => {
    it('should interleave categories when no filter or priority', () => {
      const { result } = renderHook(() => useAutocomplete(''));

      // Should have units from multiple categories interleaved
      const firstThreeCategoryIds = result.current.slice(0, 3).map((u) => u.categoryId);

      // Check that we don't have all same category in first 3
      const uniqueCategories = new Set(firstThreeCategoryIds);
      expect(uniqueCategories.size).toBeGreaterThan(1);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/preact';
import { useConversion } from './useConversion';
import type { Unit } from '../data/types';

// Helper to create mock units
function createMockUnit(id: string, categoryId: string, toBase: number): Unit {
  return {
    id,
    categoryId,
    name: id,
    abbreviations: [id],
    aliases: [],
    toBase,
  };
}

describe('useConversion', () => {
  const meter = createMockUnit('meter', 'length', 1);
  const kilometer = createMockUnit('kilometer', 'length', 1000);

  describe('Empty/null inputs', () => {
    it('should return empty string when fromUnit is null', () => {
      const { result } = renderHook(() => useConversion(null, meter, '100'));
      expect(result.current).toBe('');
    });

    it('should return empty string when toUnit is null', () => {
      const { result } = renderHook(() => useConversion(meter, null, '100'));
      expect(result.current).toBe('');
    });

    it('should return empty string when fromValue is empty', () => {
      const { result } = renderHook(() => useConversion(meter, kilometer, ''));
      expect(result.current).toBe('');
    });

    it('should return empty string when fromValue is whitespace', () => {
      const { result } = renderHook(() => useConversion(meter, kilometer, '   '));
      expect(result.current).toBe('');
    });

    it('should return empty string when fromValue is tab only', () => {
      const { result } = renderHook(() => useConversion(meter, kilometer, '\t'));
      expect(result.current).toBe('');
    });

    it('should return empty string when all inputs are null/empty', () => {
      const { result } = renderHook(() => useConversion(null, null, ''));
      expect(result.current).toBe('');
    });
  });

  describe('Valid conversions', () => {
    it('should convert meters to kilometers', () => {
      const { result } = renderHook(() => useConversion(meter, kilometer, '1000'));
      expect(result.current).toBe('1');
    });

    it('should convert kilometers to meters', () => {
      const { result } = renderHook(() => useConversion(kilometer, meter, '1'));
      expect(result.current).toBe('1000');
    });

    it('should handle decimal values', () => {
      const { result } = renderHook(() => useConversion(kilometer, meter, '1.5'));
      expect(result.current).toBe('1500');
    });

    it('should handle negative values', () => {
      const { result } = renderHook(() => useConversion(meter, kilometer, '-1000'));
      expect(result.current).toBe('-1');
    });
  });

  describe('Same unit conversion', () => {
    it('should return same value when converting unit to itself', () => {
      const { result } = renderHook(() => useConversion(meter, meter, '100'));
      expect(result.current).toBe('100');
    });
  });

  describe('Memoization', () => {
    it('should return same result reference for same inputs', () => {
      const { result, rerender } = renderHook(
        ({ fromUnit, toUnit, value }) => useConversion(fromUnit, toUnit, value),
        { initialProps: { fromUnit: meter, toUnit: kilometer, value: '1000' } }
      );

      const firstResult = result.current;

      // Rerender with same props
      rerender({ fromUnit: meter, toUnit: kilometer, value: '1000' });

      expect(result.current).toBe(firstResult);
    });

    it('should update result when value changes', () => {
      const { result, rerender } = renderHook(
        ({ fromUnit, toUnit, value }) => useConversion(fromUnit, toUnit, value),
        { initialProps: { fromUnit: meter, toUnit: kilometer, value: '1000' } }
      );

      expect(result.current).toBe('1');

      rerender({ fromUnit: meter, toUnit: kilometer, value: '2000' });

      expect(result.current).toBe('2');
    });

    it('should update result when units change', () => {
      const { result, rerender } = renderHook(
        ({ fromUnit, toUnit, value }) => useConversion(fromUnit, toUnit, value),
        { initialProps: { fromUnit: meter, toUnit: kilometer, value: '1000' } }
      );

      expect(result.current).toBe('1');

      rerender({ fromUnit: kilometer, toUnit: meter, value: '1000' });

      expect(result.current).toBe('1000000');
    });
  });
});

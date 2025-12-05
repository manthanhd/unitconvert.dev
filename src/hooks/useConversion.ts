import { useMemo } from 'preact/hooks';
import { convert } from '../converters';
import type { Unit } from '../data/types';

/**
 * Hook to perform conversion between units
 */
export function useConversion(
  fromUnit: Unit | null,
  toUnit: Unit | null,
  fromValue: string
): string {
  return useMemo(() => {
    if (!fromUnit || !toUnit || !fromValue.trim()) {
      return '';
    }

    return convert(fromUnit, toUnit, fromValue);
  }, [fromUnit, toUnit, fromValue]);
}

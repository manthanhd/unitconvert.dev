import type { Unit } from '../data/types';
import { formatNumber } from '../utils/format';

/**
 * Linear conversion: value * fromFactor / toFactor
 * Used for most units (length, mass, volume, etc.)
 */
export function linearConvert(from: Unit, to: Unit, value: string): string {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return '';
  }

  if (from.toBase === undefined || to.toBase === undefined) {
    return 'Error: Missing conversion factor';
  }

  // Convert: value -> base -> target
  const baseValue = numValue * from.toBase;
  const result = baseValue / to.toBase;

  return formatNumber(result);
}

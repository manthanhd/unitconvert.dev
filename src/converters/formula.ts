import type { Unit } from '../data/types';
import { formatNumber } from '../utils/format';

/**
 * Formula-based conversion using to/from base formulas
 * Used for non-linear conversions like fuel economy
 * where the relationship is not a simple ratio (e.g., MPG vs L/100km)
 */
export function formulaConvert(from: Unit, to: Unit, value: string): string {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return '';
  }

  if (!from.toBaseFormula || !to.fromBaseFormula) {
    return 'Error: Missing formula';
  }

  // Convert: value -> base -> target
  const baseValue = from.toBaseFormula(numValue);
  const result = to.fromBaseFormula(baseValue);

  return formatNumber(result);
}

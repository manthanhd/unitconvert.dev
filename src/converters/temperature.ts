import type { Unit } from '../data/types';
import { formatNumber } from '../utils/format';

/**
 * Temperature conversion using to/from base formulas
 * Base unit is Kelvin
 */
export function temperatureConvert(from: Unit, to: Unit, value: string): string {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return '';
  }

  if (!from.toBaseFormula || !to.fromBaseFormula) {
    return 'Error: Missing temperature formula';
  }

  // Convert: value -> Kelvin (base) -> target
  const kelvin = from.toBaseFormula(numValue);
  const result = to.fromBaseFormula(kelvin);

  return formatNumber(result);
}

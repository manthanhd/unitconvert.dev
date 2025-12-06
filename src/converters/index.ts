import type { Unit, ConversionType } from '../data/types';
import { getCategory } from '../data';
import { linearConvert } from './linear';
import { temperatureConvert } from './temperature';
import { formulaConvert } from './formula';
import { colorConvert } from './color';
import { timezoneConvert } from './timezone';
import { baseConvert } from './base';

type ConverterFn = (from: Unit, to: Unit, value: string) => string;

const converters: Record<ConversionType, ConverterFn> = {
  linear: linearConvert,
  offset: temperatureConvert,
  formula: formulaConvert,
  timezone: timezoneConvert,
  base: baseConvert,
  color: colorConvert,
};

/**
 * Convert a value between two units
 */
export function convert(from: Unit, to: Unit, value: string): string {
  // Don't convert if no value
  if (!value.trim()) {
    return '';
  }

  // Get the category to determine conversion type
  const category = getCategory(from.categoryId);

  if (!category) {
    return 'Error: Unknown category';
  }

  // Ensure units are in the same category
  if (from.categoryId !== to.categoryId) {
    return 'Error: Units must be in the same category';
  }

  // Get the appropriate converter
  const converterFn = converters[category.conversionType];

  if (!converterFn) {
    return 'Error: No converter for this type';
  }

  return converterFn(from, to, value);
}

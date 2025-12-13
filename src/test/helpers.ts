import type { Unit } from '../data/types';

/**
 * Create a mock linear unit for testing
 */
export function createLinearUnit(
  id: string,
  categoryId: string,
  toBase: number
): Unit {
  return {
    id,
    categoryId,
    name: id,
    abbreviations: [],
    aliases: [],
    toBase,
  };
}

/**
 * Create a mock temperature unit for testing
 */
export function createTemperatureUnit(
  id: string,
  toBaseFormula: (v: number) => number,
  fromBaseFormula: (v: number) => number
): Unit {
  return {
    id,
    categoryId: 'temperature',
    name: id,
    abbreviations: [],
    aliases: [],
    toBaseFormula,
    fromBaseFormula,
  };
}

/**
 * Create a mock base unit for testing
 */
export function createBaseUnit(id: string, base: number): Unit {
  return {
    id,
    categoryId: 'number-base',
    name: id,
    abbreviations: [],
    aliases: [],
    toBase: base,
  };
}

/**
 * Create a mock color unit for testing
 */
export function createColorUnit(format: string): Unit {
  return {
    id: `color-${format}`,
    categoryId: 'color',
    name: format.toUpperCase(),
    abbreviations: [],
    aliases: [],
  };
}

/**
 * Create a mock timezone unit for testing
 */
export function createTimezoneUnit(id: string, iana: string): Unit {
  return {
    id,
    categoryId: 'timezone',
    name: id,
    abbreviations: [],
    aliases: [],
    iana,
  };
}

/**
 * Create a mock formula unit for testing
 */
export function createFormulaUnit(
  id: string,
  categoryId: string,
  toBaseFormula: (v: number) => number,
  fromBaseFormula: (v: number) => number
): Unit {
  return {
    id,
    categoryId,
    name: id,
    abbreviations: [],
    aliases: [],
    toBaseFormula,
    fromBaseFormula,
  };
}

/**
 * Parse a numeric string result for comparison
 */
export function parseResult(result: string): number {
  return parseFloat(result);
}

/**
 * Type of conversion algorithm used for a category
 */
export type ConversionType =
  | 'linear'    // Simple ratio (most units)
  | 'offset'    // Temperature-style (requires formula)
  | 'formula'   // Custom formula (fuel economy)
  | 'timezone'  // DateTime conversions
  | 'base'      // Number base conversions
  | 'color';    // Color format conversions

/**
 * Category groups units that can convert between each other
 */
export interface Category {
  id: string;
  name: string;
  conversionType: ConversionType;
}

/**
 * Single unit definition
 */
export interface Unit {
  id: string;
  categoryId: string;
  name: string;
  abbreviations: string[];
  aliases: string[];
  /** For linear conversions: factor to convert TO base unit */
  toBase?: number;
  /** For offset conversions (temperature): convert value to base unit */
  toBaseFormula?: (value: number) => number;
  /** For offset conversions (temperature): convert from base unit to this unit */
  fromBaseFormula?: (value: number) => number;
}

/**
 * Entry in the search index (denormalized for Fuse.js)
 */
export interface SearchableUnit {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  searchTerms: string[];
}

/**
 * Converter state shape
 */
export interface ConverterState {
  fromUnit: Unit | null;
  toUnit: Unit | null;
  fromValue: string;
  result: string | null;
}

/**
 * Focusable fields in the converter
 */
export type FocusableField = 'fromUnit' | 'toUnit' | 'fromValue' | 'result';

import type { Category, Unit } from './types';

// ============================================================================
// FUEL ECONOMY
// ============================================================================

export const fuelEconomyCategory: Category = {
  id: 'fuel-economy',
  name: 'Fuel Economy',
  conversionType: 'formula',
};

// Base unit: kilometers per liter (km/L)
// Fuel economy conversions use formulas because some units have inverse relationships
// (e.g., L/100km is the inverse of km/L)
export const fuelEconomyUnits: Unit[] = [
  {
    id: 'kilometers-per-liter',
    categoryId: 'fuel-economy',
    name: 'Kilometers per liter',
    abbreviations: ['km/L'],
    aliases: ['kilometers per litre'],
    toBaseFormula: (value) => value, // Base unit
    fromBaseFormula: (value) => value,
  },
  {
    id: 'miles-per-gallon-us',
    categoryId: 'fuel-economy',
    name: 'Miles per gallon (US)',
    abbreviations: ['mpg', 'mpg (US)'],
    aliases: ['miles per gallon', 'mpg us'],
    toBaseFormula: (value) => value * 0.425144, // 1 mpg (US) = 0.425144 km/L
    fromBaseFormula: (value) => value / 0.425144,
  },
  {
    id: 'miles-per-gallon-imperial',
    categoryId: 'fuel-economy',
    name: 'Miles per gallon (Imperial)',
    abbreviations: ['mpg (imp)', 'mpg (UK)'],
    aliases: ['imperial mpg', 'uk mpg'],
    toBaseFormula: (value) => value * 0.354006, // 1 mpg (imp) = 0.354006 km/L
    fromBaseFormula: (value) => value / 0.354006,
  },
  {
    id: 'miles-per-liter',
    categoryId: 'fuel-economy',
    name: 'Miles per liter',
    abbreviations: ['mi/L'],
    aliases: ['miles per litre'],
    toBaseFormula: (value) => value * 1.609344, // 1 mi/L = 1.609344 km/L
    fromBaseFormula: (value) => value / 1.609344,
  },
  {
    id: 'liters-per-100km',
    categoryId: 'fuel-economy',
    name: 'Liters per 100 kilometers',
    abbreviations: ['L/100km'],
    aliases: ['liters per 100 km', 'litres per 100km'],
    // L/100km is inverse: km/L = 100 / (L/100km)
    toBaseFormula: (value) => 100 / value,
    fromBaseFormula: (value) => 100 / value,
  },
];

// ============================================================================
// COOKING VOLUMES (Simplified - main volumes are in physical.ts)
// ============================================================================

// Cooking-specific measurements are included in physical.ts volume section

// Export all
export const everydayCategories = [fuelEconomyCategory];
export const everydayUnits = [...fuelEconomyUnits];

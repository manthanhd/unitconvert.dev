import type { Category, Unit } from './types';

// ============================================================================
// FUEL ECONOMY
// ============================================================================

export const fuelEconomyCategory: Category = {
  id: 'fuel-economy',
  name: 'Fuel Economy',
  conversionType: 'linear', // We'll handle the inverse relationship in the conversion factor
};

// Base unit: kilometers per liter
// Note: mpg and L/100km have inverse relationships, handled via conversion factors
export const fuelEconomyUnits: Unit[] = [
  {
    id: 'kilometers-per-liter',
    categoryId: 'fuel-economy',
    name: 'Kilometers per liter',
    abbreviations: ['km/L'],
    aliases: ['kilometers per litre'],
    toBase: 1,
  },
  {
    id: 'miles-per-gallon-us',
    categoryId: 'fuel-economy',
    name: 'Miles per gallon (US)',
    abbreviations: ['mpg', 'mpg (US)'],
    aliases: ['miles per gallon', 'mpg us'],
    toBase: 0.425144, // 1 mpg = 0.425144 km/L
  },
  {
    id: 'miles-per-gallon-imperial',
    categoryId: 'fuel-economy',
    name: 'Miles per gallon (Imperial)',
    abbreviations: ['mpg (imp)', 'mpg (UK)'],
    aliases: ['imperial mpg', 'uk mpg'],
    toBase: 0.354006, // 1 imp mpg = 0.354006 km/L
  },
  {
    id: 'miles-per-liter',
    categoryId: 'fuel-economy',
    name: 'Miles per liter',
    abbreviations: ['mi/L'],
    aliases: ['miles per litre'],
    toBase: 0.621371,
  },
];

// Note: L/100km is an inverse unit - would need special handling
// For simplicity, keeping only "per distance" units for now

// ============================================================================
// COOKING VOLUMES (Simplified - main volumes are in physical.ts)
// ============================================================================

// Cooking-specific measurements are included in physical.ts volume section

// Export all
export const everydayCategories = [fuelEconomyCategory];
export const everydayUnits = [...fuelEconomyUnits];

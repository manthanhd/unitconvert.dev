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
// COOKING VOLUMES
// ============================================================================

export const cookingVolumeCategory: Category = {
  id: 'cooking-volume',
  name: 'Cooking Volume',
  conversionType: 'linear',
};

// Base unit: milliliter
export const cookingVolumeUnits: Unit[] = [
  // US cooking units
  {
    id: 'cup-us',
    categoryId: 'cooking-volume',
    name: 'Cup (US)',
    abbreviations: ['cup', 'c'],
    aliases: ['cups', 'us cup'],
    toBase: 236.588,
  },
  {
    id: 'tablespoon-us',
    categoryId: 'cooking-volume',
    name: 'Tablespoon (US)',
    abbreviations: ['tbsp', 'Tbsp', 'T'],
    aliases: ['tablespoons'],
    toBase: 14.7868,
  },
  {
    id: 'teaspoon-us',
    categoryId: 'cooking-volume',
    name: 'Teaspoon (US)',
    abbreviations: ['tsp', 't'],
    aliases: ['teaspoons'],
    toBase: 4.92892,
  },
  {
    id: 'fluid-ounce-us-cooking',
    categoryId: 'cooking-volume',
    name: 'Fluid Ounce (US)',
    abbreviations: ['fl oz'],
    aliases: ['fluid ounces'],
    toBase: 29.5735,
  },
  {
    id: 'pint-us-cooking',
    categoryId: 'cooking-volume',
    name: 'Pint (US)',
    abbreviations: ['pt'],
    aliases: ['pints'],
    toBase: 473.176,
  },
  {
    id: 'quart-us-cooking',
    categoryId: 'cooking-volume',
    name: 'Quart (US)',
    abbreviations: ['qt'],
    aliases: ['quarts'],
    toBase: 946.353,
  },
  {
    id: 'gallon-us-cooking',
    categoryId: 'cooking-volume',
    name: 'Gallon (US)',
    abbreviations: ['gal'],
    aliases: ['gallons'],
    toBase: 3785.41,
  },
  {
    id: 'gill-us',
    categoryId: 'cooking-volume',
    name: 'Gill (US)',
    abbreviations: ['gi'],
    aliases: ['gills'],
    toBase: 118.294,
  },
  {
    id: 'pinch',
    categoryId: 'cooking-volume',
    name: 'Pinch',
    abbreviations: ['pinch'],
    aliases: ['pinches'],
    toBase: 0.31,
  },
  {
    id: 'dash',
    categoryId: 'cooking-volume',
    name: 'Dash',
    abbreviations: ['dash'],
    aliases: ['dashes'],
    toBase: 0.62,
  },
  {
    id: 'smidgen',
    categoryId: 'cooking-volume',
    name: 'Smidgen',
    abbreviations: ['smidgen'],
    aliases: ['smidgens'],
    toBase: 0.12,
  },
  {
    id: 'drop',
    categoryId: 'cooking-volume',
    name: 'Drop',
    abbreviations: ['drop'],
    aliases: ['drops'],
    toBase: 0.05,
  },
  // Metric cooking units
  {
    id: 'milliliter-cooking',
    categoryId: 'cooking-volume',
    name: 'Milliliter',
    abbreviations: ['ml', 'mL'],
    aliases: ['milliliters'],
    toBase: 1,
  },
  {
    id: 'centiliter',
    categoryId: 'cooking-volume',
    name: 'Centiliter',
    abbreviations: ['cl', 'cL'],
    aliases: ['centiliters'],
    toBase: 10,
  },
  {
    id: 'deciliter',
    categoryId: 'cooking-volume',
    name: 'Deciliter',
    abbreviations: ['dl', 'dL'],
    aliases: ['deciliters'],
    toBase: 100,
  },
  {
    id: 'liter-cooking',
    categoryId: 'cooking-volume',
    name: 'Liter',
    abbreviations: ['L', 'l'],
    aliases: ['liters', 'litres'],
    toBase: 1000,
  },
  {
    id: 'metric-cup',
    categoryId: 'cooking-volume',
    name: 'Metric Cup',
    abbreviations: ['metric cup'],
    aliases: ['metric cups'],
    toBase: 250,
  },
  {
    id: 'metric-tablespoon',
    categoryId: 'cooking-volume',
    name: 'Metric Tablespoon',
    abbreviations: ['metric tbsp'],
    aliases: ['metric tablespoons'],
    toBase: 15,
  },
  {
    id: 'metric-teaspoon',
    categoryId: 'cooking-volume',
    name: 'Metric Teaspoon',
    abbreviations: ['metric tsp'],
    aliases: ['metric teaspoons'],
    toBase: 5,
  },
  // Imperial (UK) cooking units
  {
    id: 'imperial-cup',
    categoryId: 'cooking-volume',
    name: 'Imperial Cup',
    abbreviations: ['imp cup'],
    aliases: ['imperial cups'],
    toBase: 284.131,
  },
  {
    id: 'imperial-tablespoon',
    categoryId: 'cooking-volume',
    name: 'Imperial Tablespoon',
    abbreviations: ['imp tbsp'],
    aliases: ['imperial tablespoons'],
    toBase: 17.7582,
  },
  {
    id: 'imperial-teaspoon',
    categoryId: 'cooking-volume',
    name: 'Imperial Teaspoon',
    abbreviations: ['imp tsp'],
    aliases: ['imperial teaspoons'],
    toBase: 5.91939,
  },
  {
    id: 'imperial-fluid-ounce',
    categoryId: 'cooking-volume',
    name: 'Imperial Fluid Ounce',
    abbreviations: ['imp fl oz'],
    aliases: ['imperial fluid ounces'],
    toBase: 28.4131,
  },
  {
    id: 'imperial-pint',
    categoryId: 'cooking-volume',
    name: 'Imperial Pint',
    abbreviations: ['imp pt'],
    aliases: ['imperial pints'],
    toBase: 568.261,
  },
  {
    id: 'imperial-quart',
    categoryId: 'cooking-volume',
    name: 'Imperial Quart',
    abbreviations: ['imp qt'],
    aliases: ['imperial quarts'],
    toBase: 1136.52,
  },
  {
    id: 'imperial-gallon',
    categoryId: 'cooking-volume',
    name: 'Imperial Gallon',
    abbreviations: ['imp gal'],
    aliases: ['imperial gallons'],
    toBase: 4546.09,
  },
];

// ============================================================================
// COOKING WEIGHT
// ============================================================================

export const cookingWeightCategory: Category = {
  id: 'cooking-weight',
  name: 'Cooking Weight',
  conversionType: 'linear',
};

// Base unit: gram
export const cookingWeightUnits: Unit[] = [
  {
    id: 'gram-cooking',
    categoryId: 'cooking-weight',
    name: 'Gram',
    abbreviations: ['g'],
    aliases: ['grams'],
    toBase: 1,
  },
  {
    id: 'kilogram-cooking',
    categoryId: 'cooking-weight',
    name: 'Kilogram',
    abbreviations: ['kg'],
    aliases: ['kilograms'],
    toBase: 1000,
  },
  {
    id: 'milligram-cooking',
    categoryId: 'cooking-weight',
    name: 'Milligram',
    abbreviations: ['mg'],
    aliases: ['milligrams'],
    toBase: 0.001,
  },
  {
    id: 'ounce-cooking',
    categoryId: 'cooking-weight',
    name: 'Ounce',
    abbreviations: ['oz'],
    aliases: ['ounces'],
    toBase: 28.3495,
  },
  {
    id: 'pound-cooking',
    categoryId: 'cooking-weight',
    name: 'Pound',
    abbreviations: ['lb'],
    aliases: ['pounds'],
    toBase: 453.592,
  },
  {
    id: 'stick-butter',
    categoryId: 'cooking-weight',
    name: 'Stick (butter)',
    abbreviations: ['stick'],
    aliases: ['sticks', 'butter stick'],
    toBase: 113.4,
  },
];

// Export all
export const everydayCategories = [fuelEconomyCategory, cookingVolumeCategory, cookingWeightCategory];
export const everydayUnits = [...fuelEconomyUnits, ...cookingVolumeUnits, ...cookingWeightUnits];

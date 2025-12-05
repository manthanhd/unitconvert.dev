import type { Category, Unit, SearchableUnit } from './types';
import { physicalCategories, physicalUnits } from './physical';
import { thermalCategories, thermalUnits } from './thermal';
import { motionCategories, motionUnits } from './motion';
import { timeCategories, timeUnits } from './time';
import { digitalCategories, digitalUnits } from './digital';
import { electricalCategories, electricalUnits } from './electrical';
import { scientificCategories, scientificUnits } from './scientific';
import { everydayCategories, everydayUnits } from './everyday';

// Aggregate all categories and units
const allCategories: Category[] = [
  ...physicalCategories,
  ...thermalCategories,
  ...motionCategories,
  ...timeCategories,
  ...digitalCategories,
  ...electricalCategories,
  ...scientificCategories,
  ...everydayCategories,
];

const allUnits: Unit[] = [
  ...physicalUnits,
  ...thermalUnits,
  ...motionUnits,
  ...timeUnits,
  ...digitalUnits,
  ...electricalUnits,
  ...scientificUnits,
  ...everydayUnits,
];

// Create lookup maps for fast access
const categoryMap = new Map<string, Category>(
  allCategories.map((cat) => [cat.id, cat])
);

const unitMap = new Map<string, Unit>(allUnits.map((unit) => [unit.id, unit]));

// Create abbreviation/alias lookup (maps abbreviation -> unit id)
const abbreviationMap = new Map<string, string>();
for (const unit of allUnits) {
  // Add unit id itself
  abbreviationMap.set(unit.id.toLowerCase(), unit.id);
  // Add all abbreviations
  for (const abbr of unit.abbreviations) {
    abbreviationMap.set(abbr.toLowerCase(), unit.id);
  }
  // Add all aliases
  for (const alias of unit.aliases) {
    abbreviationMap.set(alias.toLowerCase(), unit.id);
  }
}

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  return allCategories;
}

/**
 * Get all units
 */
export function getAllUnits(): Unit[] {
  return allUnits;
}

/**
 * Get a category by ID
 */
export function getCategory(id: string): Category | undefined {
  return categoryMap.get(id);
}

/**
 * Get a unit by ID
 */
export function getUnit(id: string): Unit | undefined {
  return unitMap.get(id);
}

/**
 * Find a unit by ID, abbreviation, or alias
 */
export function findUnit(query: string): Unit | undefined {
  const normalized = query.toLowerCase().trim();
  const unitId = abbreviationMap.get(normalized);
  return unitId ? unitMap.get(unitId) : undefined;
}

/**
 * Get all units in a category
 */
export function getUnitsInCategory(categoryId: string): Unit[] {
  return allUnits.filter((unit) => unit.categoryId === categoryId);
}

/**
 * Build searchable unit list for Fuse.js
 */
export function buildSearchableUnits(): SearchableUnit[] {
  return allUnits.map((unit) => {
    const category = categoryMap.get(unit.categoryId);
    return {
      id: unit.id,
      categoryId: unit.categoryId,
      categoryName: category?.name ?? '',
      name: unit.name,
      searchTerms: [
        unit.name.toLowerCase(),
        ...unit.abbreviations.map((a) => a.toLowerCase()),
        ...unit.aliases.map((a) => a.toLowerCase()),
      ],
    };
  });
}

// Re-export types
export type { Category, Unit, SearchableUnit } from './types';

import { useMemo } from 'preact/hooks';
import Fuse from 'fuse.js';
import { buildSearchableUnits } from '../data';
import { fuseOptions } from '../search/fuseConfig';
import type { SearchableUnit } from '../data/types';

// Build the search index once
const searchableUnits = buildSearchableUnits();

/**
 * Hook for fuzzy searching units
 * Returns all matching results - progressive loading is handled by the Dropdown component
 */
export function useAutocomplete(
  query: string,
  filterCategoryId?: string,
  priorityCategoryId?: string
): SearchableUnit[] {
  // Create fuse instance, optionally filtered by category
  const fuse = useMemo(() => {
    const units = filterCategoryId
      ? searchableUnits.filter((u) => u.categoryId === filterCategoryId)
      : searchableUnits;
    return new Fuse(units, fuseOptions);
  }, [filterCategoryId]);

  // Search results
  const results = useMemo(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      // When no query, show all units
      const units = filterCategoryId
        ? searchableUnits.filter((u) => u.categoryId === filterCategoryId)
        : searchableUnits;

      // If priorityCategoryId is set and we're not already filtering, show priority category first
      if (priorityCategoryId && !filterCategoryId) {
        const priorityUnits = units.filter((u) => u.categoryId === priorityCategoryId);
        const otherUnits = units.filter((u) => u.categoryId !== priorityCategoryId);
        return [...priorityUnits, ...otherUnits];
      }

      // No filter and no priority - group by category for better organization
      if (!filterCategoryId) {
        const byCategory = new Map<string, SearchableUnit[]>();
        for (const unit of units) {
          const list = byCategory.get(unit.categoryId) || [];
          list.push(unit);
          byCategory.set(unit.categoryId, list);
        }
        // Interleave: take one from each category in round-robin fashion
        const diverse: SearchableUnit[] = [];
        const categories = Array.from(byCategory.values());
        let index = 0;
        while (categories.some((c) => c.length > index)) {
          for (const catUnits of categories) {
            if (catUnits[index]) {
              diverse.push(catUnits[index]);
            }
          }
          index++;
        }
        return diverse;
      }

      return units;
    }

    return fuse
      .search(trimmedQuery)
      .map((r) => r.item);
  }, [query, fuse, filterCategoryId, priorityCategoryId]);

  return results;
}

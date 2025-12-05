import { useMemo } from 'preact/hooks';
import Fuse from 'fuse.js';
import { buildSearchableUnits } from '../data';
import { fuseOptions } from '../search/fuseConfig';
import type { SearchableUnit } from '../data/types';

// Build the search index once
const searchableUnits = buildSearchableUnits();

/**
 * Hook for fuzzy searching units
 */
export function useAutocomplete(
  query: string,
  filterCategoryId?: string,
  priorityCategoryId?: string,
  maxResults = 10
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
      // When no query, show units
      const units = filterCategoryId
        ? searchableUnits.filter((u) => u.categoryId === filterCategoryId)
        : searchableUnits;

      // If priorityCategoryId is set and we're not already filtering, show priority category first
      if (priorityCategoryId && !filterCategoryId) {
        const priorityUnits = units.filter((u) => u.categoryId === priorityCategoryId);
        const otherUnits = units.filter((u) => u.categoryId !== priorityCategoryId);
        return [...priorityUnits, ...otherUnits].slice(0, maxResults);
      }

      // No filter and no priority - show diverse set from different categories
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
        while (diverse.length < maxResults && categories.some((c) => c.length > index)) {
          for (const catUnits of categories) {
            if (catUnits[index] && diverse.length < maxResults) {
              diverse.push(catUnits[index]);
            }
          }
          index++;
        }
        return diverse;
      }

      return units.slice(0, maxResults);
    }

    return fuse
      .search(trimmedQuery)
      .slice(0, maxResults)
      .map((r) => r.item);
  }, [query, fuse, maxResults, filterCategoryId, priorityCategoryId]);

  return results;
}

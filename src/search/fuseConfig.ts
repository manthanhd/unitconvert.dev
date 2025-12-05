import Fuse, { IFuseOptions } from 'fuse.js';
import type { SearchableUnit } from '../data/types';

export const fuseOptions: IFuseOptions<SearchableUnit> = {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'searchTerms', weight: 1.5 },
    { name: 'categoryName', weight: 0.5 },
  ],
  threshold: 0.4, // Fuzzy tolerance (0 = exact, 1 = match anything)
  distance: 100, // How far from expected location characters can be
  minMatchCharLength: 1, // Start matching from first character
  includeScore: true,
  shouldSort: true,
  ignoreLocation: true, // Match anywhere in string
};

export function createSearchIndex(units: SearchableUnit[]): Fuse<SearchableUnit> {
  return new Fuse(units, fuseOptions);
}

import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { findUnit, getUnit, getCategory } from '../data';
import type { Unit } from '../data/types';
import { debounce } from '../utils/format';

export interface UrlState {
  fromUnit: Unit | null;
  toUnit: Unit | null;
  fromValue: string;
  categoryId: string | null;
  isCategoryPage: boolean;
}

/**
 * Parse URL pathname into state
 * Format: /{categoryId} or /{from}/{to}/{value}
 */
function parseUrl(pathname: string): UrlState {
  const parts = pathname.split('/').filter(Boolean);

  // No parts - home page
  if (parts.length === 0) {
    return { fromUnit: null, toUnit: null, fromValue: '', categoryId: null, isCategoryPage: false };
  }

  // One part - check if it's a category
  if (parts.length === 1) {
    const category = getCategory(parts[0]);
    if (category) {
      return { fromUnit: null, toUnit: null, fromValue: '', categoryId: category.id, isCategoryPage: true };
    }
  }

  // Try to parse as unit conversion
  const fromUnit = parts[0] ? findUnit(parts[0]) ?? getUnit(parts[0]) ?? null : null;
  const toUnit = parts[1] ? findUnit(parts[1]) ?? getUnit(parts[1]) ?? null : null;
  const fromValue = parts[2] ?? '';

  return { fromUnit, toUnit, fromValue, categoryId: null, isCategoryPage: false };
}

/**
 * Build URL from state
 */
function buildUrl(state: UrlState): string {
  const parts: string[] = [];

  // Category page
  if (state.isCategoryPage && state.categoryId) {
    parts.push(state.categoryId);
    return '/' + parts.join('/');
  }

  // Unit conversion page
  if (state.fromUnit) {
    parts.push(state.fromUnit.id);

    if (state.toUnit) {
      parts.push(state.toUnit.id);

      if (state.fromValue) {
        parts.push(state.fromValue);
      }
    }
  }

  return '/' + parts.join('/');
}

/**
 * Hook to sync state with URL
 */
export function useUrlState(): [UrlState, (state: Partial<UrlState>) => void] {
  const [state, setState] = useState<UrlState>(() =>
    typeof window !== 'undefined' ? parseUrl(window.location.pathname) : { fromUnit: null, toUnit: null, fromValue: '', categoryId: null, isCategoryPage: false }
  );

  // Track if we should skip URL update (to avoid loops)
  const skipUrlUpdate = useRef(false);

  // Handle browser back/forward
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      skipUrlUpdate.current = true;
      setState(parseUrl(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Debounced URL update
  const updateUrl = useCallback(
    debounce((newState: UrlState) => {
      if (typeof window === 'undefined') return;

      const url = buildUrl(newState);
      if (window.location.pathname !== url) {
        window.history.pushState(null, '', url);
      }
    }, 300),
    []
  );

  // Update state and URL
  const updateState = useCallback(
    (partial: Partial<UrlState>) => {
      setState((prev) => {
        const next = { ...prev, ...partial };

        // Update URL (debounced)
        if (!skipUrlUpdate.current) {
          updateUrl(next);
        }
        skipUrlUpdate.current = false;

        return next;
      });
    },
    [updateUrl]
  );

  return [state, updateState];
}

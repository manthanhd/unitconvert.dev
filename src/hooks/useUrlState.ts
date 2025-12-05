import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { findUnit, getUnit } from '../data';
import type { Unit } from '../data/types';
import { debounce } from '../utils/format';

export interface UrlState {
  fromUnit: Unit | null;
  toUnit: Unit | null;
  fromValue: string;
}

/**
 * Parse URL pathname into state
 * Format: /{from}/{to}/{value}
 */
function parseUrl(pathname: string): UrlState {
  const parts = pathname.split('/').filter(Boolean);

  const fromUnit = parts[0] ? findUnit(parts[0]) ?? getUnit(parts[0]) ?? null : null;
  const toUnit = parts[1] ? findUnit(parts[1]) ?? getUnit(parts[1]) ?? null : null;
  const fromValue = parts[2] ?? '';

  return { fromUnit, toUnit, fromValue };
}

/**
 * Build URL from state
 */
function buildUrl(state: UrlState): string {
  const parts: string[] = [];

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
  const [state, setState] = useState<UrlState>(() => parseUrl(window.location.pathname));

  // Track if we should skip URL update (to avoid loops)
  const skipUrlUpdate = useRef(false);

  // Handle browser back/forward
  useEffect(() => {
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

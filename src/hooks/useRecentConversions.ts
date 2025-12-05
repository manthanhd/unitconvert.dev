import { useState, useEffect, useCallback } from 'preact/hooks';
import type { Unit } from '../data/types';

export interface RecentConversion {
  fromUnitId: string;
  toUnitId: string;
  fromUnitName: string;
  toUnitName: string;
  fromValue: string;
  toValue: string;
  timestamp: number;
}

const STORAGE_KEY = 'converter-recent-conversions';
const MAX_RECENT = 10;

/**
 * Hook for managing recent conversions in localStorage
 */
export function useRecentConversions() {
  const [recents, setRecents] = useState<RecentConversion[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecents(parsed);
      }
    } catch (error) {
      console.error('Failed to load recent conversions:', error);
    }
  }, []);

  // Save to localStorage whenever recents change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recents));
    } catch (error) {
      console.error('Failed to save recent conversions:', error);
    }
  }, [recents]);

  // Add a conversion to recents
  const addRecent = useCallback((fromUnit: Unit, toUnit: Unit, fromValue: string, toValue: string) => {
    setRecents((prev) => {
      // Check if this conversion already exists
      const existingIndex = prev.findIndex(
        (r) => r.fromUnitId === fromUnit.id && r.toUnitId === toUnit.id
      );

      const newItem: RecentConversion = {
        fromUnitId: fromUnit.id,
        toUnitId: toUnit.id,
        fromUnitName: fromUnit.name,
        toUnitName: toUnit.name,
        fromValue,
        toValue,
        timestamp: Date.now(),
      };

      // If it exists, remove it (we'll add it to the front)
      let updated = existingIndex >= 0
        ? prev.filter((_, i) => i !== existingIndex)
        : prev;

      // Add to front
      updated = [newItem, ...updated];

      // Limit to MAX_RECENT
      return updated.slice(0, MAX_RECENT);
    });
  }, []);

  // Remove a conversion from recents
  const removeRecent = useCallback((fromUnitId: string, toUnitId: string) => {
    setRecents((prev) =>
      prev.filter((r) => !(r.fromUnitId === fromUnitId && r.toUnitId === toUnitId))
    );
  }, []);

  return {
    recents,
    addRecent,
    removeRecent,
  };
}

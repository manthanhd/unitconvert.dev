import { useRef, useCallback } from 'preact/hooks';

export type FocusableField = 'fromUnit' | 'toUnit' | 'fromValue' | 'result';

interface FocusRefs {
  fromUnit: HTMLInputElement | null;
  toUnit: HTMLInputElement | null;
  fromValue: HTMLInputElement | null;
  result: HTMLInputElement | null;
}

const focusOrder: FocusableField[] = ['fromUnit', 'toUnit', 'fromValue', 'result'];

/**
 * Hook to manage focus flow between converter fields
 */
export function useFocusManager() {
  const refs = useRef<FocusRefs>({
    fromUnit: null,
    toUnit: null,
    fromValue: null,
    result: null,
  });

  const setRef = useCallback((field: FocusableField) => {
    return (el: HTMLInputElement | null) => {
      refs.current[field] = el;
    };
  }, []);

  const focusField = useCallback((field: FocusableField) => {
    const el = refs.current[field];
    if (el) {
      el.focus();
    }
  }, []);

  const focusNext = useCallback((current: FocusableField) => {
    const idx = focusOrder.indexOf(current);
    const next = focusOrder[(idx + 1) % focusOrder.length];
    focusField(next);
    return next;
  }, [focusField]);

  const focusPrev = useCallback((current: FocusableField) => {
    const idx = focusOrder.indexOf(current);
    const prev = focusOrder[(idx - 1 + focusOrder.length) % focusOrder.length];
    focusField(prev);
    return prev;
  }, [focusField]);

  return {
    setRef,
    focusField,
    focusNext,
    focusPrev,
  };
}

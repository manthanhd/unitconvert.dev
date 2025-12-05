import { useEffect, useRef } from 'preact/hooks';

interface KeyboardActions {
  copyResult: () => void;
  copyLink: () => void;
  share: () => void;
  reset: () => void;
  isDropdownOpen?: boolean;
  showToast?: (message: string) => void;
}

/**
 * Hook for global keyboard shortcuts
 */
export function useKeyboardShortcuts(actions: KeyboardActions) {
  const lastResetPressRef = useRef<number>(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;

      // Cmd+C with no text selection: copy result
      if (isMeta && e.key === 'c') {
        const selection = window.getSelection()?.toString();
        if (!selection) {
          e.preventDefault();
          actions.copyResult();
        }
      }

      // Cmd+L: copy link
      if (isMeta && e.key === 'l') {
        e.preventDefault();
        actions.copyLink();
      }

      // Cmd+S: share
      if (isMeta && e.key === 's') {
        e.preventDefault();
        actions.share();
      }

      // Cmd+K: reset with double-press confirmation
      if (isMeta && e.key === 'k') {
        e.preventDefault();
        const now = Date.now();
        const timeSinceLastPress = now - lastResetPressRef.current;

        if (timeSinceLastPress < 1000) {
          // Double press detected - execute reset
          actions.reset();
          lastResetPressRef.current = 0;
        } else {
          // First press - show confirmation
          lastResetPressRef.current = now;
          actions.showToast?.('Press again to reset');
        }
      }

      // Escape: reset (only if no dropdown is open)
      if (e.key === 'Escape') {
        // For Escape, only reset if no dropdown is open
        if (actions.isDropdownOpen) {
          return; // Let dropdown handle it
        }
        e.preventDefault();
        actions.reset();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [actions]);
}

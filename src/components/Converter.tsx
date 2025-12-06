import { useCallback, useEffect, useState, useMemo } from 'preact/hooks';
import { UnitInput } from './UnitInput';
import { ValueInput } from './ValueInput';
import { Output } from './Output';
import { KeyboardHints } from './KeyboardHints';
import { ShareModal } from './ShareModal';
import { Toast } from './Toast';
import { RecentConversions } from './RecentConversions';
import { useUrlState } from '../hooks/useUrlState';
import { useConversion } from '../hooks/useConversion';
import { useFocusManager } from '../hooks/useFocusManager';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useRecentConversions } from '../hooks/useRecentConversions';
import { useSEO } from '../hooks/useSEO';
import { copyToClipboard } from '../utils/clipboard';
import { debounce } from '../utils/format';
import { convert } from '../converters';
import { getUnit, getCategory } from '../data';
import type { Unit } from '../data/types';
import {
  trackConversion,
  trackCopyResult,
  trackCopyLink,
  trackKeyboardShortcut,
  trackReverseConversion,
  trackRecentClick,
  trackShareOpen,
} from '../lib/analytics';

export function Converter() {
  const [state, updateState] = useUrlState();
  const { setRef, focusField } = useFocusManager();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false);
  const { recents, addRecent, removeRecent } = useRecentConversions();

  // Calculate result
  const result = useConversion(state.fromUnit, state.toUnit, state.fromValue);

  // Update SEO meta tags based on current state
  useSEO({
    fromUnit: state.fromUnit,
    toUnit: state.toUnit,
    fromValue: state.fromValue,
    result,
  });

  // Debounced save to recents and track conversion (500ms delay)
  const debouncedAddRecent = useMemo(
    () =>
      debounce((fromUnit: Unit, toUnit: Unit, fromValue: string, toValue: string, source: 'search' | 'recent' | 'url') => {
        addRecent(fromUnit, toUnit, fromValue, toValue);
        // Track conversion analytics
        const category = getCategory(fromUnit.categoryId);
        trackConversion(fromUnit.id, toUnit.id, category?.name ?? 'unknown', source);
      }, 500),
    [addRecent]
  );

  // Focus first field on mount
  useEffect(() => {
    focusField('fromUnit');
  }, [focusField]);

  // Handle from unit change
  const handleFromUnitChange = useCallback(
    (unit: Unit | null) => {
      if (unit === null) {
        // User cleared the selection
        updateState({ fromUnit: null, toUnit: null, fromValue: '' });
      } else if (state.fromUnit && unit.categoryId !== state.fromUnit.categoryId) {
        // Category changed, reset toUnit and values
        updateState({ fromUnit: unit, toUnit: null, fromValue: '' });
      } else {
        updateState({ fromUnit: unit });
      }
    },
    [state.fromUnit, updateState]
  );

  // Handle to unit change
  const handleToUnitChange = useCallback(
    (unit: Unit | null) => {
      if (unit === null) {
        updateState({ toUnit: null });
      } else {
        updateState({ toUnit: unit });
      }
    },
    [updateState]
  );

  // Handle from value change
  const handleFromValueChange = useCallback(
    (value: string) => {
      updateState({ fromValue: value });
      // Save to recents (debounced) when both units are selected and value is entered
      if (state.fromUnit && state.toUnit && value) {
        const toValue = convert(state.fromUnit, state.toUnit, value);
        debouncedAddRecent(state.fromUnit, state.toUnit, value, toValue, 'search');
      }
    },
    [updateState, state.fromUnit, state.toUnit, debouncedAddRecent]
  );

  // Handle reverse conversion (typing in output)
  const handleResultChange = useCallback(
    (value: string) => {
      if (state.toUnit && state.fromUnit) {
        // Reverse convert: toUnit -> fromUnit
        const reversed = convert(state.toUnit, state.fromUnit, value);
        updateState({ fromValue: reversed });
        trackReverseConversion();
      }
    },
    [state.fromUnit, state.toUnit, updateState]
  );

  // Handle Tab on result field to cycle back to fromUnit
  const handleResultKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        focusField('fromUnit');
      }
    },
    [focusField]
  );

  // Handle Shift+Tab on fromUnit to cycle to result
  const handleFromUnitKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        focusField('result');
      }
    },
    [focusField]
  );

  // Show toast notification
  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    copyResult: () => {
      if (result) {
        copyToClipboard(result);
        showToast('Copied!');
        trackCopyResult();
        trackKeyboardShortcut('cmd+c');
      }
    },
    copyLink: () => {
      copyToClipboard(window.location.href);
      showToast('Link copied!');
      trackCopyLink();
      trackKeyboardShortcut('cmd+l');
    },
    share: () => {
      setIsShareModalOpen(true);
      trackShareOpen();
      trackKeyboardShortcut('cmd+s');
    },
    reset: () => {
      updateState({ fromUnit: null, toUnit: null, fromValue: '' });
      window.history.pushState(null, '', '/');
      focusField('fromUnit');
      trackKeyboardShortcut('cmd+k');
    },
    isDropdownOpen: isAnyDropdownOpen,
    showToast,
  });

  // Handle recent conversion selection
  const handleRecentSelect = useCallback(
    (fromUnitId: string, toUnitId: string, fromValue: string) => {
      const fromUnit = getUnit(fromUnitId);
      const toUnit = getUnit(toUnitId);
      if (fromUnit && toUnit) {
        updateState({ fromUnit, toUnit, fromValue });
        focusField('fromValue');
        trackRecentClick();
        // Track as a conversion from recent
        const category = getCategory(fromUnit.categoryId);
        trackConversion(fromUnit.id, toUnit.id, category?.name ?? 'unknown', 'recent');
      }
    },
    [updateState, focusField]
  );

  // Handle recent conversion removal
  const handleRecentRemove = useCallback(
    (fromUnitId: string, toUnitId: string) => {
      removeRecent(fromUnitId, toUnitId);
    },
    [removeRecent]
  );

  // Filter to unit dropdown to same category as from unit
  const toUnitFilterCategory = state.fromUnit?.categoryId;

  // Get conversion type from the fromUnit's category
  const conversionType = state.fromUnit ? getCategory(state.fromUnit.categoryId)?.conversionType ?? 'linear' : 'linear';

  return (
    <div id="converter" className="converter">
      <div className="converter__units">
        <UnitInput
          id="from-unit"
          value={state.fromUnit}
          onChange={handleFromUnitChange}
          placeholder="From unit..."
          priorityCategoryId={state.fromUnit?.categoryId}
          onSelect={() => focusField('toUnit')}
          onKeyDown={handleFromUnitKeyDown}
          inputRef={setRef('fromUnit')}
          onDropdownOpenChange={setIsAnyDropdownOpen}
        />
        <span className="converter__arrow">→</span>
        <UnitInput
          id="to-unit"
          value={state.toUnit}
          onChange={handleToUnitChange}
          placeholder="To unit..."
          filterCategoryId={toUnitFilterCategory}
          onSelect={() => focusField('fromValue')}
          inputRef={setRef('toUnit')}
          onDropdownOpenChange={setIsAnyDropdownOpen}
        />
      </div>

      <div className="converter__values">
        <ValueInput
          conversionType={conversionType}
          value={state.fromValue}
          onChange={handleFromValueChange}
          placeholder={!state.fromUnit || !state.toUnit ? 'Select units first' : '0'}
          disabled={!state.fromUnit || !state.toUnit}
          inputRef={setRef('fromValue')}
        />
        <span className="converter__arrow">=</span>
        <Output
          value={result}
          onChange={handleResultChange}
          onKeyDown={handleResultKeyDown}
          inputRef={setRef('result')}
        />
      </div>

      <div className="converter__footer">
        <KeyboardHints />
        <button
          type="button"
          className="share-button"
          onClick={() => {
            setIsShareModalOpen(true);
            trackShareOpen();
          }}
          aria-label="Share conversion"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Share
        </button>
      </div>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

      <RecentConversions
        recents={recents}
        onSelect={handleRecentSelect}
        onRemove={handleRecentRemove}
      />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

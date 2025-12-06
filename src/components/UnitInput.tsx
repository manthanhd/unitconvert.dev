import { useState, useRef, useEffect } from 'preact/hooks';
import type { JSX } from 'preact';
import { useAutocomplete } from '../hooks/useAutocomplete';
import { Dropdown } from './Dropdown';
import type { Unit, SearchableUnit } from '../data/types';
import { getUnit, getCategory } from '../data';
import { trackSearchNoResults } from '../lib/analytics';

interface UnitInputProps {
  value: Unit | null;
  onChange: (unit: Unit | null) => void;
  placeholder?: string;
  filterCategoryId?: string;
  priorityCategoryId?: string;
  onSelect?: () => void; // Called after selection (for focus advance)
  onKeyDown?: (e: KeyboardEvent) => void; // External keyboard handler
  inputRef?: (el: HTMLInputElement | null) => void;
  onDropdownOpenChange?: (isOpen: boolean) => void; // Track dropdown state
}

export function UnitInput({
  value,
  onChange,
  placeholder = 'Type to search...',
  filterCategoryId,
  priorityCategoryId,
  onSelect,
  onKeyDown: externalKeyDown,
  inputRef,
  onDropdownOpenChange,
}: UnitInputProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [hasUserTyped, setHasUserTyped] = useState(false);

  // Notify parent when dropdown state changes
  useEffect(() => {
    onDropdownOpenChange?.(isOpen);
  }, [isOpen, onDropdownOpenChange]);

  // Reset hasUserTyped when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setHasUserTyped(false);
    }
  }, [isOpen]);

  const internalRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fuzzy search results
  // Only apply priority when user hasn't typed (initial dropdown open)
  const effectivePriorityCategory = hasUserTyped ? undefined : priorityCategoryId;
  const results = useAutocomplete(query, filterCategoryId, effectivePriorityCategory);

  // Forward ref
  useEffect(() => {
    if (inputRef) {
      inputRef(internalRef.current);
    }
  }, [inputRef]);

  // Reset highlighted index when results change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [results]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // Reset query to show selected value
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle selection
  const handleSelect = (item: SearchableUnit) => {
    const unit = getUnit(item.id);
    if (unit) {
      onChange(unit);
      setQuery('');
      setIsOpen(false);
      // Delay focus to allow parent state to propagate
      setTimeout(() => onSelect?.(), 0);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((i) => Math.min(i + 1, results.length - 1));
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex((i) => Math.max(i - 1, 0));
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (isOpen && results[highlightedIndex]) {
          handleSelect(results[highlightedIndex]);
        } else if (!isOpen) {
          setIsOpen(true);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setQuery('');
        break;

      case 'Tab':
        // Close dropdown and call external handler if provided
        setIsOpen(false);
        setQuery('');
        // Let external handler manage focus cycling
        externalKeyDown?.(e);
        break;
    }
  };

  // Track no results when dropdown closes with no selection
  useEffect(() => {
    if (!isOpen && hasUserTyped && query.trim() && results.length === 0) {
      trackSearchNoResults(query.trim());
    }
  }, [isOpen, hasUserTyped, query, results.length]);

  // Handle input changes
  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const newQuery = e.currentTarget.value;
    setQuery(newQuery);
    setIsOpen(true);
    setHasUserTyped(true); // User has typed, disable priority filtering

    // If user cleared all text and there's a current selection, clear it
    if (newQuery === '' && value) {
      onChange(null);
    }
  };

  // Handle focus
  const handleFocus = () => {
    setIsOpen(true);
  };

  // Display value: query while typing, or selected unit name
  const displayValue = query || (value ? value.name : '');

  // Get category name for badge
  const categoryName = value ? getCategory(value.categoryId)?.name : null;

  return (
    <div className="unit-input" ref={containerRef}>
      <div className="unit-input__wrapper">
        <input
          ref={internalRef}
          type="text"
          className={`unit-input__field ${value ? 'unit-input__field--has-value' : ''}`}
          value={displayValue}
          onInput={handleInput}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown as JSX.KeyboardEventHandler<HTMLInputElement>}
          placeholder={placeholder}
          autocomplete="off"
          spellcheck={false}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        {value && !query && (
          <div className="unit-input__indicators">
            {categoryName && (
              <span className="unit-input__badge">{categoryName}</span>
            )}
            <svg className="unit-input__checkmark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      <Dropdown
        items={results}
        highlightedIndex={highlightedIndex}
        onSelect={handleSelect}
        onHighlight={setHighlightedIndex}
        isOpen={isOpen}
      />
    </div>
  );
}

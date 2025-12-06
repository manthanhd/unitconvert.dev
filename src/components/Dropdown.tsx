import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import type { SearchableUnit } from '../data/types';
import { DropdownItem } from './DropdownItem';

const INITIAL_ITEMS = 20;
const LOAD_MORE_ITEMS = 20;
const SCROLL_THRESHOLD = 50; // pixels from bottom to trigger load

interface DropdownProps {
  items: SearchableUnit[];
  highlightedIndex: number;
  onSelect: (item: SearchableUnit) => void;
  onHighlight: (index: number) => void;
  isOpen: boolean;
}

export function Dropdown({
  items,
  highlightedIndex,
  onSelect,
  onHighlight,
  isOpen,
}: DropdownProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset visible count when items change (new search) or dropdown opens
  useEffect(() => {
    setVisibleCount(INITIAL_ITEMS);
  }, [items, isOpen]);

  // Handle scroll to load more items
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < SCROLL_THRESHOLD && visibleCount < items.length) {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_ITEMS, items.length));
    }
  }, [visibleCount, items.length]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const highlightedElement = container.children[highlightedIndex] as HTMLElement;

    if (highlightedElement) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = highlightedElement.getBoundingClientRect();

      if (elementRect.bottom > containerRect.bottom) {
        highlightedElement.scrollIntoView({ block: 'nearest' });
      } else if (elementRect.top < containerRect.top) {
        highlightedElement.scrollIntoView({ block: 'nearest' });
      }
    }

    // If highlighted index is beyond visible items, load more
    if (highlightedIndex >= visibleCount) {
      setVisibleCount(Math.min(highlightedIndex + LOAD_MORE_ITEMS, items.length));
    }
  }, [highlightedIndex, isOpen, visibleCount, items.length]);

  if (!isOpen || items.length === 0) {
    return null;
  }

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div
      className="dropdown"
      role="listbox"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {visibleItems.map((item, index) => (
        <DropdownItem
          key={item.id}
          item={item}
          isHighlighted={index === highlightedIndex}
          onSelect={onSelect}
          onMouseEnter={() => onHighlight(index)}
        />
      ))}
      {hasMore && (
        <div className="dropdown__load-more">
          {items.length - visibleCount} more...
        </div>
      )}
    </div>
  );
}

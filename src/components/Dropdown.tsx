import type { SearchableUnit } from '../data/types';
import { DropdownItem } from './DropdownItem';

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
  if (!isOpen || items.length === 0) {
    return null;
  }

  return (
    <div className="dropdown" role="listbox">
      {items.map((item, index) => (
        <DropdownItem
          key={item.id}
          item={item}
          isHighlighted={index === highlightedIndex}
          onSelect={onSelect}
          onMouseEnter={() => onHighlight(index)}
        />
      ))}
    </div>
  );
}

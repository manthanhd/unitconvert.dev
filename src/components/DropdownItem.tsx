import type { SearchableUnit } from '../data/types';

interface DropdownItemProps {
  item: SearchableUnit;
  isHighlighted: boolean;
  onSelect: (item: SearchableUnit) => void;
  onMouseEnter: () => void;
}

export function DropdownItem({
  item,
  isHighlighted,
  onSelect,
  onMouseEnter,
}: DropdownItemProps) {
  return (
    <div
      className={`dropdown-item ${isHighlighted ? 'dropdown-item--highlighted' : ''}`}
      onClick={() => onSelect(item)}
      onMouseEnter={onMouseEnter}
      role="option"
      aria-selected={isHighlighted}
    >
      <span className="dropdown-item__name">{item.name}</span>
      <span className="dropdown-item__category">{item.categoryName}</span>
    </div>
  );
}

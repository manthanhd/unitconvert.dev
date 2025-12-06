import { getAllCategories } from '../data';

interface CategorySelectorProps {
  onCategorySelect: (categoryId: string) => void;
}

export function CategorySelector({ onCategorySelect }: CategorySelectorProps) {
  const categories = getAllCategories();

  return (
    <div className="category-selector">
      <h2 className="category-selector__title">Select a Category</h2>
      <div className="category-selector__grid">
        {categories.map(category => (
          <button
            key={category.id}
            type="button"
            className="category-card"
            onClick={() => onCategorySelect(category.id)}
          >
            <span className="category-card__name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

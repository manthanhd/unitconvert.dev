import { useMemo } from 'preact/hooks';
import { getCategory, getUnitsInCategory } from '../data';
import type { Unit } from '../data/types';

interface CategoryPageProps {
  categoryId: string;
  onUnitSelect: (fromUnit: Unit, toUnit: Unit) => void;
  onBackToHome: () => void;
}

interface PopularConversion {
  fromUnit: Unit;
  toUnit: Unit;
  label: string;
}

interface PopularConversionConfig {
  fromUnitId: string;
  toUnitId: string;
  label: string;
}

// Define popular conversions for each category (using IDs)
const POPULAR_CONVERSIONS: Record<string, PopularConversionConfig[]> = {
  length: [
    { fromUnitId: 'meter', toUnitId: 'foot', label: 'Meters to Feet' },
    { fromUnitId: 'kilometer', toUnitId: 'mile', label: 'Kilometers to Miles' },
    { fromUnitId: 'inch', toUnitId: 'centimeter', label: 'Inches to Centimeters' },
    { fromUnitId: 'yard', toUnitId: 'meter', label: 'Yards to Meters' },
  ],
  temperature: [
    { fromUnitId: 'celsius', toUnitId: 'fahrenheit', label: 'Celsius to Fahrenheit' },
    { fromUnitId: 'fahrenheit', toUnitId: 'celsius', label: 'Fahrenheit to Celsius' },
    { fromUnitId: 'celsius', toUnitId: 'kelvin', label: 'Celsius to Kelvin' },
  ],
  mass: [
    { fromUnitId: 'kilogram', toUnitId: 'pound', label: 'Kilograms to Pounds' },
    { fromUnitId: 'pound', toUnitId: 'kilogram', label: 'Pounds to Kilograms' },
    { fromUnitId: 'gram', toUnitId: 'ounce', label: 'Grams to Ounces' },
  ],
  volume: [
    { fromUnitId: 'liter', toUnitId: 'gallon', label: 'Liters to Gallons' },
    { fromUnitId: 'gallon', toUnitId: 'liter', label: 'Gallons to Liters' },
    { fromUnitId: 'milliliter', toUnitId: 'fluid-ounce', label: 'Milliliters to Fluid Ounces' },
  ],
  area: [
    { fromUnitId: 'square-meter', toUnitId: 'square-foot', label: 'Square Meters to Square Feet' },
    { fromUnitId: 'acre', toUnitId: 'hectare', label: 'Acres to Hectares' },
    { fromUnitId: 'square-kilometer', toUnitId: 'square-mile', label: 'Square Kilometers to Square Miles' },
  ],
  speed: [
    { fromUnitId: 'kilometer-per-hour', toUnitId: 'mile-per-hour', label: 'km/h to mph' },
    { fromUnitId: 'meter-per-second', toUnitId: 'kilometer-per-hour', label: 'm/s to km/h' },
    { fromUnitId: 'knot', toUnitId: 'kilometer-per-hour', label: 'Knots to km/h' },
  ],
  data: [
    { fromUnitId: 'gigabyte', toUnitId: 'megabyte', label: 'Gigabytes to Megabytes' },
    { fromUnitId: 'megabyte', toUnitId: 'gigabyte', label: 'Megabytes to Gigabytes' },
    { fromUnitId: 'terabyte', toUnitId: 'gigabyte', label: 'Terabytes to Gigabytes' },
  ],
  time: [
    { fromUnitId: 'hour', toUnitId: 'minute', label: 'Hours to Minutes' },
    { fromUnitId: 'day', toUnitId: 'hour', label: 'Days to Hours' },
    { fromUnitId: 'week', toUnitId: 'day', label: 'Weeks to Days' },
  ],
};

export function CategoryPage({ categoryId, onUnitSelect, onBackToHome }: CategoryPageProps) {
  const category = getCategory(categoryId);
  const units = useMemo(() => getUnitsInCategory(categoryId), [categoryId]);

  // Get popular conversions for this category
  const popularConversions = useMemo(() => {
    const conversions = POPULAR_CONVERSIONS[categoryId] || [];
    return conversions
      .map(conv => {
        const fromUnit = units.find(u => u.id === conv.fromUnitId);
        const toUnit = units.find(u => u.id === conv.toUnitId);
        return fromUnit && toUnit ? { fromUnit, toUnit, label: conv.label } : null;
      })
      .filter((conv): conv is PopularConversion => conv !== null);
  }, [categoryId, units]);

  if (!category) {
    return (
      <div className="category-page">
        <div className="category-page__header">
          <button
            type="button"
            className="category-page__back"
            onClick={onBackToHome}
            aria-label="Back to home"
          >
            ← Back
          </button>
        </div>
        <div className="category-page__content">
          <p className="category-page__error">Category not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-page__header">
        <button
          type="button"
          className="category-page__back"
          onClick={onBackToHome}
          aria-label="Back to home"
        >
          ← Back
        </button>
        <h2 className="category-page__title">{category.name}</h2>
      </div>

      <div className="category-page__content">
        {popularConversions.length > 0 && (
          <section className="category-page__section">
            <h3 className="category-page__section-title">Popular Conversions</h3>
            <div className="category-page__popular-grid">
              {popularConversions.map(({ fromUnit, toUnit, label }) => (
                <button
                  key={`${fromUnit.id}-${toUnit.id}`}
                  type="button"
                  className="popular-conversion-card"
                  onClick={() => onUnitSelect(fromUnit, toUnit)}
                >
                  <span className="popular-conversion-card__label">{label}</span>
                  <span className="popular-conversion-card__units">
                    {fromUnit.abbreviations[0] || fromUnit.name} → {toUnit.abbreviations[0] || toUnit.name}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="category-page__section">
          <h3 className="category-page__section-title">All {category.name} Units</h3>
          <div className="category-page__units-grid">
            {units.map(unit => (
              <div key={unit.id} className="unit-card">
                <div className="unit-card__name">{unit.name}</div>
                {unit.abbreviations.length > 0 && (
                  <div className="unit-card__abbr">
                    {unit.abbreviations.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

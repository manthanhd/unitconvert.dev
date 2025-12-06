import { useCallback } from 'preact/hooks';
import { Converter } from './components/Converter';
import { CategoryPage } from './components/CategoryPage';
import { useUrlState } from './hooks/useUrlState';
import type { Unit } from './data/types';

export function App() {
  const [state, updateState] = useUrlState();

  // Handle unit selection from category page
  const handleUnitSelect = useCallback((fromUnit: Unit, toUnit: Unit) => {
    updateState({
      fromUnit,
      toUnit,
      fromValue: '',
      isCategoryPage: false,
      categoryId: null
    });
  }, [updateState]);

  // Handle back to home from category page
  const handleBackToHome = useCallback(() => {
    updateState({
      fromUnit: null,
      toUnit: null,
      fromValue: '',
      isCategoryPage: false,
      categoryId: null
    });
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
    }
  }, [updateState]);

  return (
    <>
      {/* Visually hidden h1 for SEO - screen readers and crawlers will see this */}
      <h1 className="visually-hidden">
        Unit Converter - Convert Length, Temperature, Data, Colors and More
      </h1>
      <main role="main" aria-label="Unit Converter">
        {state.isCategoryPage && state.categoryId ? (
          <CategoryPage
            categoryId={state.categoryId}
            onUnitSelect={handleUnitSelect}
            onBackToHome={handleBackToHome}
          />
        ) : (
          <Converter />
        )}
      </main>
    </>
  );
}

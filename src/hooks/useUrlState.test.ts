import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/preact';
import { useUrlState } from './useUrlState';

// Mock the data module
vi.mock('../data', () => ({
  findUnit: vi.fn(),
  getUnit: vi.fn(),
  getCategory: vi.fn(),
}));

import { findUnit, getUnit, getCategory } from '../data';

describe('useUrlState', () => {
  const mockFindUnit = findUnit as ReturnType<typeof vi.fn>;
  const mockGetUnit = getUnit as ReturnType<typeof vi.fn>;
  const mockGetCategory = getCategory as ReturnType<typeof vi.fn>;

  let originalLocation: Location;
  let originalHistory: History;

  beforeEach(() => {
    vi.useFakeTimers();

    // Save originals
    originalLocation = window.location;
    originalHistory = window.history;

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/',
        href: 'http://localhost/',
      },
      writable: true,
      configurable: true,
    });

    // Mock window.history
    Object.defineProperty(window, 'history', {
      value: {
        pushState: vi.fn(),
      },
      writable: true,
      configurable: true,
    });

    // Reset mocks
    mockFindUnit.mockReset();
    mockGetUnit.mockReset();
    mockGetCategory.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();

    // Restore originals
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'history', {
      value: originalHistory,
      writable: true,
      configurable: true,
    });
  });

  describe('Initial state', () => {
    it('should return empty state for root path', () => {
      window.location.pathname = '/';

      const { result } = renderHook(() => useUrlState());
      const [state] = result.current;

      expect(state.fromUnit).toBeNull();
      expect(state.toUnit).toBeNull();
      expect(state.fromValue).toBe('');
      expect(state.categoryId).toBeNull();
      expect(state.isCategoryPage).toBe(false);
    });

    it('should parse category page URL', () => {
      window.location.pathname = '/length';
      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      const { result } = renderHook(() => useUrlState());
      const [state] = result.current;

      expect(state.categoryId).toBe('length');
      expect(state.isCategoryPage).toBe(true);
    });

    it('should parse unit conversion URL with two units', () => {
      window.location.pathname = '/meter/kilometer';

      const mockMeter = { id: 'meter', name: 'Meter', categoryId: 'length', abbreviations: ['m'], aliases: [] };
      const mockKilometer = { id: 'kilometer', name: 'Kilometer', categoryId: 'length', abbreviations: ['km'], aliases: [] };

      mockFindUnit.mockImplementation((id: string) => {
        if (id === 'meter') return mockMeter;
        if (id === 'kilometer') return mockKilometer;
        return null;
      });
      mockGetUnit.mockReturnValue(null);
      mockGetCategory.mockReturnValue(null);

      const { result } = renderHook(() => useUrlState());
      const [state] = result.current;

      expect(state.fromUnit).toEqual(mockMeter);
      expect(state.toUnit).toEqual(mockKilometer);
      expect(state.fromValue).toBe('');
    });

    it('should parse unit conversion URL with value', () => {
      window.location.pathname = '/meter/kilometer/1000';

      const mockMeter = { id: 'meter', name: 'Meter', categoryId: 'length', abbreviations: ['m'], aliases: [] };
      const mockKilometer = { id: 'kilometer', name: 'Kilometer', categoryId: 'length', abbreviations: ['km'], aliases: [] };

      mockFindUnit.mockImplementation((id: string) => {
        if (id === 'meter') return mockMeter;
        if (id === 'kilometer') return mockKilometer;
        return null;
      });
      mockGetUnit.mockReturnValue(null);
      mockGetCategory.mockReturnValue(null);

      const { result } = renderHook(() => useUrlState());
      const [state] = result.current;

      expect(state.fromUnit).toEqual(mockMeter);
      expect(state.toUnit).toEqual(mockKilometer);
      expect(state.fromValue).toBe('1000');
    });
  });

  describe('updateState', () => {
    it('should update state with partial values', () => {
      window.location.pathname = '/';

      const { result } = renderHook(() => useUrlState());

      const mockMeter = { id: 'meter', name: 'Meter', categoryId: 'length', abbreviations: ['m'], aliases: [] };

      act(() => {
        const [, updateState] = result.current;
        updateState({ fromUnit: mockMeter });
      });

      const [state] = result.current;
      expect(state.fromUnit).toEqual(mockMeter);
    });

    it('should update URL when state changes (debounced)', () => {
      window.location.pathname = '/';

      const { result } = renderHook(() => useUrlState());

      const mockMeter = { id: 'meter', name: 'Meter', categoryId: 'length', abbreviations: ['m'], aliases: [] };
      const mockKilometer = { id: 'kilometer', name: 'Kilometer', categoryId: 'length', abbreviations: ['km'], aliases: [] };

      act(() => {
        const [, updateState] = result.current;
        updateState({ fromUnit: mockMeter, toUnit: mockKilometer, fromValue: '1000' });
      });

      // Advance timers to trigger debounced URL update
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '/meter/kilometer/1000');
    });

    it('should not update URL if pathname already matches', () => {
      window.location.pathname = '/meter/kilometer';

      const mockMeter = { id: 'meter', name: 'Meter', categoryId: 'length', abbreviations: ['m'], aliases: [] };
      const mockKilometer = { id: 'kilometer', name: 'Kilometer', categoryId: 'length', abbreviations: ['km'], aliases: [] };

      mockFindUnit.mockImplementation((id: string) => {
        if (id === 'meter') return mockMeter;
        if (id === 'kilometer') return mockKilometer;
        return null;
      });
      mockGetUnit.mockReturnValue(null);
      mockGetCategory.mockReturnValue(null);

      const { result } = renderHook(() => useUrlState());

      // State already matches URL, so update shouldn't push
      act(() => {
        const [, updateState] = result.current;
        updateState({ fromValue: '' });
      });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      // pushState should not be called since URL matches
      expect(window.history.pushState).not.toHaveBeenCalled();
    });
  });

  describe('Browser navigation', () => {
    it('should update state on popstate event', () => {
      window.location.pathname = '/';

      const { result } = renderHook(() => useUrlState());

      // Initial state
      expect(result.current[0].fromUnit).toBeNull();

      // Simulate navigation
      const mockMeter = { id: 'meter', name: 'Meter', categoryId: 'length', abbreviations: ['m'], aliases: [] };
      mockFindUnit.mockImplementation((id: string) => {
        if (id === 'meter') return mockMeter;
        return null;
      });
      mockGetUnit.mockReturnValue(null);
      mockGetCategory.mockReturnValue(null);

      // Change pathname and trigger popstate
      window.location.pathname = '/meter';

      act(() => {
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      expect(result.current[0].fromUnit).toEqual(mockMeter);
    });

    it('should remove popstate listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useUrlState());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('popstate', expect.any(Function));
    });
  });

  describe('URL building', () => {
    it('should build category page URL', () => {
      window.location.pathname = '/';

      const { result } = renderHook(() => useUrlState());

      act(() => {
        const [, updateState] = result.current;
        updateState({ categoryId: 'length', isCategoryPage: true });
      });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '/length');
    });

    it('should build URL with just fromUnit', () => {
      window.location.pathname = '/';

      const { result } = renderHook(() => useUrlState());

      const mockMeter = { id: 'meter', name: 'Meter', categoryId: 'length', abbreviations: ['m'], aliases: [] };

      act(() => {
        const [, updateState] = result.current;
        updateState({ fromUnit: mockMeter });
      });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '/meter');
    });

    it('should build root URL when state is cleared', () => {
      window.location.pathname = '/meter/kilometer';

      const mockMeter = { id: 'meter', name: 'Meter', categoryId: 'length', abbreviations: ['m'], aliases: [] };
      const mockKilometer = { id: 'kilometer', name: 'Kilometer', categoryId: 'length', abbreviations: ['km'], aliases: [] };

      mockFindUnit.mockImplementation((id: string) => {
        if (id === 'meter') return mockMeter;
        if (id === 'kilometer') return mockKilometer;
        return null;
      });
      mockGetUnit.mockReturnValue(null);
      mockGetCategory.mockReturnValue(null);

      const { result } = renderHook(() => useUrlState());

      act(() => {
        const [, updateState] = result.current;
        updateState({ fromUnit: null, toUnit: null, fromValue: '' });
      });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '/');
    });
  });
});

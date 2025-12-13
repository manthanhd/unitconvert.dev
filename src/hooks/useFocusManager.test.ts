import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/preact';
import { useFocusManager, FocusableField } from './useFocusManager';

describe('useFocusManager', () => {
  describe('setRef', () => {
    it('should return a ref callback function', () => {
      const { result } = renderHook(() => useFocusManager());
      const refCallback = result.current.setRef('fromUnit');
      expect(typeof refCallback).toBe('function');
    });

    it('should store element reference when called', () => {
      const { result } = renderHook(() => useFocusManager());

      const mockElement = { focus: vi.fn() } as unknown as HTMLInputElement;
      const refCallback = result.current.setRef('fromUnit');

      act(() => {
        refCallback(mockElement);
      });

      // Verify by testing focusField
      act(() => {
        result.current.focusField('fromUnit');
      });

      expect(mockElement.focus).toHaveBeenCalled();
    });

    it('should handle null element', () => {
      const { result } = renderHook(() => useFocusManager());
      const refCallback = result.current.setRef('fromUnit');

      expect(() => {
        act(() => {
          refCallback(null);
        });
      }).not.toThrow();
    });
  });

  describe('focusField', () => {
    it('should focus the specified field', () => {
      const { result } = renderHook(() => useFocusManager());

      const mockElement = { focus: vi.fn() } as unknown as HTMLInputElement;

      act(() => {
        result.current.setRef('toUnit')(mockElement);
      });

      act(() => {
        result.current.focusField('toUnit');
      });

      expect(mockElement.focus).toHaveBeenCalledTimes(1);
    });

    it('should not throw when ref is not set', () => {
      const { result } = renderHook(() => useFocusManager());

      expect(() => {
        act(() => {
          result.current.focusField('fromUnit');
        });
      }).not.toThrow();
    });

    it('should focus different fields independently', () => {
      const { result } = renderHook(() => useFocusManager());

      const mockFromUnit = { focus: vi.fn() } as unknown as HTMLInputElement;
      const mockToUnit = { focus: vi.fn() } as unknown as HTMLInputElement;

      act(() => {
        result.current.setRef('fromUnit')(mockFromUnit);
        result.current.setRef('toUnit')(mockToUnit);
      });

      act(() => {
        result.current.focusField('fromUnit');
      });
      expect(mockFromUnit.focus).toHaveBeenCalledTimes(1);
      expect(mockToUnit.focus).not.toHaveBeenCalled();

      act(() => {
        result.current.focusField('toUnit');
      });
      expect(mockToUnit.focus).toHaveBeenCalledTimes(1);
    });
  });

  describe('focusNext', () => {
    it('should focus the next field in order', () => {
      const { result } = renderHook(() => useFocusManager());

      const mockFromUnit = { focus: vi.fn() } as unknown as HTMLInputElement;
      const mockToUnit = { focus: vi.fn() } as unknown as HTMLInputElement;

      act(() => {
        result.current.setRef('fromUnit')(mockFromUnit);
        result.current.setRef('toUnit')(mockToUnit);
      });

      act(() => {
        const next = result.current.focusNext('fromUnit');
        expect(next).toBe('toUnit');
      });

      expect(mockToUnit.focus).toHaveBeenCalled();
    });

    it('should wrap around from result to fromUnit', () => {
      const { result } = renderHook(() => useFocusManager());

      const mockFromUnit = { focus: vi.fn() } as unknown as HTMLInputElement;

      act(() => {
        result.current.setRef('fromUnit')(mockFromUnit);
      });

      act(() => {
        const next = result.current.focusNext('result');
        expect(next).toBe('fromUnit');
      });

      expect(mockFromUnit.focus).toHaveBeenCalled();
    });
  });

  describe('focusPrev', () => {
    it('should focus the previous field in order', () => {
      const { result } = renderHook(() => useFocusManager());

      const mockFromUnit = { focus: vi.fn() } as unknown as HTMLInputElement;

      act(() => {
        result.current.setRef('fromUnit')(mockFromUnit);
      });

      act(() => {
        const prev = result.current.focusPrev('toUnit');
        expect(prev).toBe('fromUnit');
      });

      expect(mockFromUnit.focus).toHaveBeenCalled();
    });

    it('should wrap around from fromUnit to result', () => {
      const { result } = renderHook(() => useFocusManager());

      const mockResult = { focus: vi.fn() } as unknown as HTMLInputElement;

      act(() => {
        result.current.setRef('result')(mockResult);
      });

      act(() => {
        const prev = result.current.focusPrev('fromUnit');
        expect(prev).toBe('result');
      });

      expect(mockResult.focus).toHaveBeenCalled();
    });
  });

  describe('Focus order', () => {
    const fields: FocusableField[] = ['fromUnit', 'toUnit', 'fromValue', 'result'];

    it('should follow correct order for focusNext', () => {
      const { result } = renderHook(() => useFocusManager());

      const expectedOrder = ['toUnit', 'fromValue', 'result', 'fromUnit'];

      fields.forEach((field, index) => {
        act(() => {
          const next = result.current.focusNext(field);
          expect(next).toBe(expectedOrder[index]);
        });
      });
    });

    it('should follow correct order for focusPrev', () => {
      const { result } = renderHook(() => useFocusManager());

      const expectedOrder = ['result', 'fromUnit', 'toUnit', 'fromValue'];

      fields.forEach((field, index) => {
        act(() => {
          const prev = result.current.focusPrev(field);
          expect(prev).toBe(expectedOrder[index]);
        });
      });
    });
  });
});

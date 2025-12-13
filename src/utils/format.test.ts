import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatNumber, debounce } from './format';

describe('formatNumber', () => {
  describe('Basic formatting', () => {
    it('should format 0 as "0"', () => {
      expect(formatNumber(0)).toBe('0');
    });

    it('should format integers without decimal', () => {
      expect(formatNumber(42)).toBe('42');
    });

    it('should format simple decimals', () => {
      expect(formatNumber(3.14)).toBe('3.14');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-42.5)).toBe('-42.5');
    });

    it('should handle negative integers', () => {
      expect(formatNumber(-100)).toBe('-100');
    });
  });

  describe('Trailing zero removal', () => {
    it('should remove trailing zeros after decimal', () => {
      expect(formatNumber(1.5)).toBe('1.5');
    });

    it('should remove decimal point if no decimals remain', () => {
      expect(formatNumber(10.0)).toBe('10');
    });

    it('should preserve significant digits', () => {
      expect(formatNumber(1.000001)).toBe('1.000001');
    });

    it('should handle values like 1.100000', () => {
      expect(formatNumber(1.1)).toBe('1.1');
    });
  });

  describe('Scientific notation for very large numbers', () => {
    it('should use scientific notation for numbers >= 1e12', () => {
      const result = formatNumber(1e12);
      expect(result).toMatch(/e\+/);
    });

    it('should use scientific notation for 1e15', () => {
      const result = formatNumber(1e15);
      expect(result).toMatch(/e\+/);
    });

    it('should not use scientific notation for numbers < 1e12', () => {
      const result = formatNumber(1e11);
      expect(result).not.toMatch(/e/);
    });

    it('should format 999999999999 without scientific notation', () => {
      const result = formatNumber(999999999999);
      expect(result).not.toMatch(/e/);
    });
  });

  describe('Scientific notation for very small numbers', () => {
    it('should use scientific notation for numbers < 1e-6', () => {
      const result = formatNumber(1e-7);
      expect(result).toMatch(/e-/);
    });

    it('should use scientific notation for 1e-10', () => {
      const result = formatNumber(1e-10);
      expect(result).toMatch(/e-/);
    });

    it('should not use scientific notation for numbers >= 1e-6', () => {
      const result = formatNumber(1e-6);
      expect(result).not.toMatch(/e/);
    });
  });

  describe('Precision by magnitude', () => {
    it('should use 2 decimals for numbers >= 1000', () => {
      const result = formatNumber(1234.56789);
      expect(result).toBe('1234.57');
    });

    it('should use 2 decimals for numbers >= 1000 (round down)', () => {
      const result = formatNumber(1234.561);
      expect(result).toBe('1234.56');
    });

    it('should preserve up to 6 decimals for numbers >= 1', () => {
      const result = formatNumber(1.123456789);
      expect(result).toBe('1.123457');
    });

    it('should preserve up to 8 decimals for numbers >= 0.001', () => {
      const result = formatNumber(0.00123456789);
      expect(result).toBe('0.00123457');
    });

    it('should preserve up to 10 decimals for numbers < 0.001', () => {
      const result = formatNumber(0.0001234567891);
      expect(result).toBe('0.0001234568');
    });
  });

  describe('Special values', () => {
    it('should return "Invalid" for NaN', () => {
      expect(formatNumber(NaN)).toBe('Invalid');
    });

    it('should return "Invalid" for Infinity', () => {
      expect(formatNumber(Infinity)).toBe('Invalid');
    });

    it('should return "Invalid" for -Infinity', () => {
      expect(formatNumber(-Infinity)).toBe('Invalid');
    });
  });

  describe('Edge cases with negative values', () => {
    it('should format negative zero as "0"', () => {
      expect(formatNumber(-0)).toBe('0');
    });

    it('should format small negative numbers correctly', () => {
      const result = formatNumber(-0.001);
      expect(result).toBe('-0.001');
    });

    it('should format very small negative numbers with scientific notation', () => {
      const result = formatNumber(-1e-10);
      expect(result).toMatch(/e-/);
      expect(result.startsWith('-')).toBe(true);
    });
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should delay function execution', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should only execute once for rapid calls', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should reset timer on each call', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    vi.advanceTimersByTime(50);
    debouncedFn();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to the function', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('arg1', 'arg2');
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should use the last call arguments', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('third');
  });

  it('should allow multiple executions if waited', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    debouncedFn();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should work with zero delay', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 0);

    debouncedFn();
    vi.advanceTimersByTime(0);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

/**
 * Format a number for display
 * - Removes trailing zeros
 * - Uses scientific notation for very large/small numbers
 * - Limits decimal places for readability
 */
export function formatNumber(value: number): string {
  // Handle special cases
  if (!Number.isFinite(value)) {
    return 'Invalid';
  }

  if (value === 0) {
    return '0';
  }

  const absValue = Math.abs(value);

  // Use scientific notation for very large or very small numbers
  if (absValue >= 1e12 || (absValue < 1e-6 && absValue > 0)) {
    return value.toExponential(6);
  }

  // Determine appropriate decimal places based on magnitude
  let decimals: number;
  if (absValue >= 1000) {
    decimals = 2;
  } else if (absValue >= 1) {
    decimals = 6;
  } else if (absValue >= 0.001) {
    decimals = 8;
  } else {
    decimals = 10;
  }

  // Format and remove trailing zeros
  const formatted = value.toFixed(decimals);
  return removeTrailingZeros(formatted);
}

/**
 * Remove trailing zeros after decimal point
 */
function removeTrailingZeros(str: string): string {
  if (!str.includes('.')) {
    return str;
  }

  // Remove trailing zeros
  let result = str.replace(/0+$/, '');

  // Remove trailing decimal point
  if (result.endsWith('.')) {
    result = result.slice(0, -1);
  }

  return result;
}

/**
 * Debounce function for URL updates
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

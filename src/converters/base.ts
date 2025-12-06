import type { Unit } from '../data/types';

/**
 * Base conversion: converts between number bases (binary, octal, decimal, hexadecimal)
 * Handles integers and fractional parts
 */
export function baseConvert(from: Unit, to: Unit, value: string): string {
  // Clean the input value
  const cleanValue = value.trim();

  if (!cleanValue) {
    return '';
  }

  // Extract the base from the unit's toBase property
  const fromBase = from.toBase;
  const toBase = to.toBase;

  if (fromBase === undefined || toBase === undefined) {
    return 'Error: Missing base information';
  }

  if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
    return 'Error: Base must be between 2 and 36';
  }

  try {
    // Parse the input value in the source base
    // Split into integer and fractional parts
    const parts = cleanValue.toLowerCase().split('.');
    const integerPart = parts[0] || '0';
    const fractionalPart = parts[1] || '';

    // Convert integer part to decimal
    const decimalInteger = parseInt(integerPart, fromBase);

    if (isNaN(decimalInteger)) {
      return 'Error: Invalid number for base';
    }

    // Convert fractional part to decimal if it exists
    let decimalFraction = 0;
    if (fractionalPart) {
      for (let i = 0; i < fractionalPart.length; i++) {
        const digit = parseInt(fractionalPart[i], fromBase);
        if (isNaN(digit)) {
          return 'Error: Invalid number for base';
        }
        decimalFraction += digit / Math.pow(fromBase, i + 1);
      }
    }

    // Convert from decimal to target base
    const resultInteger = decimalInteger.toString(toBase);

    // Convert fractional part if it exists
    let resultFraction = '';
    if (decimalFraction > 0) {
      let frac = decimalFraction;
      const maxDigits = 10; // Limit fractional digits to prevent infinite loops

      for (let i = 0; i < maxDigits && frac > 0; i++) {
        frac *= toBase;
        const digit = Math.floor(frac);
        resultFraction += digit.toString(toBase);
        frac -= digit;
      }
    }

    // Format the output with appropriate prefix/suffix
    let result = resultInteger.toUpperCase();
    if (resultFraction) {
      result += '.' + resultFraction.toUpperCase();
    }

    // Add prefix based on target base
    return formatWithPrefix(result, toBase);
  } catch (error) {
    return 'Error: Conversion failed';
  }
}

/**
 * Format number with appropriate prefix for the base
 */
function formatWithPrefix(value: string, base: number): string {
  switch (base) {
    case 2:
      return '0b' + value;
    case 8:
      return '0o' + value;
    case 16:
      return '0x' + value;
    default:
      // For other bases, append the base as subscript notation
      return value + '₁₀'.replace('₁₀', subscriptNumber(base));
  }
}

/**
 * Convert a number to subscript notation
 */
function subscriptNumber(num: number): string {
  const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  return num.toString().split('').map(d => subscripts[parseInt(d)]).join('');
}

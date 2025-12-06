import type { Category, Unit } from './types';

// ============================================================================
// NUMBER BASES
// ============================================================================

export const numberBaseCategory: Category = {
  id: 'number-base',
  name: 'Number Base',
  conversionType: 'base',
};

// The toBase property represents the numeric radix for each base
export const numberBaseUnits: Unit[] = [
  {
    id: 'base-binary',
    categoryId: 'number-base',
    name: 'Binary',
    abbreviations: ['bin', 'base2'],
    aliases: ['base 2', 'base-2', 'binary number', '0b'],
    toBase: 2,
  },
  {
    id: 'base-octal',
    categoryId: 'number-base',
    name: 'Octal',
    abbreviations: ['oct', 'base8'],
    aliases: ['base 8', 'base-8', 'octal number', '0o'],
    toBase: 8,
  },
  {
    id: 'base-decimal',
    categoryId: 'number-base',
    name: 'Decimal',
    abbreviations: ['dec', 'base10'],
    aliases: ['base 10', 'base-10', 'decimal number'],
    toBase: 10,
  },
  {
    id: 'base-hexadecimal',
    categoryId: 'number-base',
    name: 'Hexadecimal',
    abbreviations: ['hex', 'base16'],
    aliases: ['base 16', 'base-16', 'hexadecimal number', '0x'],
    toBase: 16,
  },
  {
    id: 'base-32',
    categoryId: 'number-base',
    name: 'Base32',
    abbreviations: ['base32'],
    aliases: ['base 32', 'base-32'],
    toBase: 32,
  },
  {
    id: 'base-36',
    categoryId: 'number-base',
    name: 'Base36',
    abbreviations: ['base36'],
    aliases: ['base 36', 'base-36', 'alphanumeric'],
    toBase: 36,
  },
];

// Export all
export const encodingCategories = [numberBaseCategory];
export const encodingUnits = [...numberBaseUnits];

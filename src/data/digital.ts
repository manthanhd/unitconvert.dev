import type { Category, Unit } from './types';

// ============================================================================
// DATA STORAGE
// ============================================================================

export const dataStorageCategory: Category = {
  id: 'data-storage',
  name: 'Data Storage',
  conversionType: 'linear',
};

// Base unit: byte
export const dataStorageUnits: Unit[] = [
  {
    id: 'bit',
    categoryId: 'data-storage',
    name: 'Bit',
    abbreviations: ['b', 'bit'],
    aliases: ['bits'],
    toBase: 0.125,
  },
  {
    id: 'nibble',
    categoryId: 'data-storage',
    name: 'Nibble',
    abbreviations: ['nibble'],
    aliases: ['nibbles', 'nybble'],
    toBase: 0.5,
  },
  {
    id: 'byte',
    categoryId: 'data-storage',
    name: 'Byte',
    abbreviations: ['B', 'byte'],
    aliases: ['bytes'],
    toBase: 1,
  },
  // Decimal (SI) units
  {
    id: 'kilobyte',
    categoryId: 'data-storage',
    name: 'Kilobyte',
    abbreviations: ['KB'],
    aliases: ['kilobytes'],
    toBase: 1000,
  },
  {
    id: 'megabyte',
    categoryId: 'data-storage',
    name: 'Megabyte',
    abbreviations: ['MB'],
    aliases: ['megabytes'],
    toBase: 1000000,
  },
  {
    id: 'gigabyte',
    categoryId: 'data-storage',
    name: 'Gigabyte',
    abbreviations: ['GB'],
    aliases: ['gigabytes'],
    toBase: 1000000000,
  },
  {
    id: 'terabyte',
    categoryId: 'data-storage',
    name: 'Terabyte',
    abbreviations: ['TB'],
    aliases: ['terabytes'],
    toBase: 1000000000000,
  },
  {
    id: 'petabyte',
    categoryId: 'data-storage',
    name: 'Petabyte',
    abbreviations: ['PB'],
    aliases: ['petabytes'],
    toBase: 1000000000000000,
  },
  {
    id: 'exabyte',
    categoryId: 'data-storage',
    name: 'Exabyte',
    abbreviations: ['EB'],
    aliases: ['exabytes'],
    toBase: 1000000000000000000,
  },
  // Binary (IEC) units
  {
    id: 'kibibyte',
    categoryId: 'data-storage',
    name: 'Kibibyte',
    abbreviations: ['KiB'],
    aliases: ['kibibytes'],
    toBase: 1024,
  },
  {
    id: 'mebibyte',
    categoryId: 'data-storage',
    name: 'Mebibyte',
    abbreviations: ['MiB'],
    aliases: ['mebibytes'],
    toBase: 1048576,
  },
  {
    id: 'gibibyte',
    categoryId: 'data-storage',
    name: 'Gibibyte',
    abbreviations: ['GiB'],
    aliases: ['gibibytes'],
    toBase: 1073741824,
  },
  {
    id: 'tebibyte',
    categoryId: 'data-storage',
    name: 'Tebibyte',
    abbreviations: ['TiB'],
    aliases: ['tebibytes'],
    toBase: 1099511627776,
  },
  {
    id: 'pebibyte',
    categoryId: 'data-storage',
    name: 'Pebibyte',
    abbreviations: ['PiB'],
    aliases: ['pebibytes'],
    toBase: 1125899906842624,
  },
];

// ============================================================================
// DATA TRANSFER RATE
// ============================================================================

export const dataTransferCategory: Category = {
  id: 'data-transfer',
  name: 'Data Transfer Rate',
  conversionType: 'linear',
};

// Base unit: bit per second
export const dataTransferUnits: Unit[] = [
  {
    id: 'bit-per-second',
    categoryId: 'data-transfer',
    name: 'Bit per second',
    abbreviations: ['bps', 'b/s'],
    aliases: ['bits per second'],
    toBase: 1,
  },
  {
    id: 'kilobit-per-second',
    categoryId: 'data-transfer',
    name: 'Kilobit per second',
    abbreviations: ['Kbps', 'Kb/s'],
    aliases: ['kilobits per second'],
    toBase: 1000,
  },
  {
    id: 'megabit-per-second',
    categoryId: 'data-transfer',
    name: 'Megabit per second',
    abbreviations: ['Mbps', 'Mb/s'],
    aliases: ['megabits per second'],
    toBase: 1000000,
  },
  {
    id: 'gigabit-per-second',
    categoryId: 'data-transfer',
    name: 'Gigabit per second',
    abbreviations: ['Gbps', 'Gb/s'],
    aliases: ['gigabits per second'],
    toBase: 1000000000,
  },
  {
    id: 'terabit-per-second',
    categoryId: 'data-transfer',
    name: 'Terabit per second',
    abbreviations: ['Tbps', 'Tb/s'],
    aliases: ['terabits per second'],
    toBase: 1000000000000,
  },
  {
    id: 'byte-per-second',
    categoryId: 'data-transfer',
    name: 'Byte per second',
    abbreviations: ['B/s', 'Bps'],
    aliases: ['bytes per second'],
    toBase: 8,
  },
  {
    id: 'kilobyte-per-second',
    categoryId: 'data-transfer',
    name: 'Kilobyte per second',
    abbreviations: ['KB/s', 'KBps'],
    aliases: ['kilobytes per second'],
    toBase: 8000,
  },
  {
    id: 'megabyte-per-second',
    categoryId: 'data-transfer',
    name: 'Megabyte per second',
    abbreviations: ['MB/s', 'MBps'],
    aliases: ['megabytes per second'],
    toBase: 8000000,
  },
  {
    id: 'gigabyte-per-second',
    categoryId: 'data-transfer',
    name: 'Gigabyte per second',
    abbreviations: ['GB/s', 'GBps'],
    aliases: ['gigabytes per second'],
    toBase: 8000000000,
  },
];

// ============================================================================
// TYPOGRAPHY / CSS
// ============================================================================

export const typographyCategory: Category = {
  id: 'typography',
  name: 'Typography / CSS',
  conversionType: 'linear',
};

// Base unit: pixel (assuming 96 DPI, 16px = 1rem)
export const typographyUnits: Unit[] = [
  {
    id: 'pixel',
    categoryId: 'typography',
    name: 'Pixel',
    abbreviations: ['px'],
    aliases: ['pixels'],
    toBase: 1,
  },
  {
    id: 'point',
    categoryId: 'typography',
    name: 'Point',
    abbreviations: ['pt'],
    aliases: ['points'],
    toBase: 1.333333, // 96/72
  },
  {
    id: 'pica',
    categoryId: 'typography',
    name: 'Pica',
    abbreviations: ['pc'],
    aliases: ['picas'],
    toBase: 16, // 12 points
  },
  {
    id: 'em',
    categoryId: 'typography',
    name: 'Em',
    abbreviations: ['em'],
    aliases: ['ems'],
    toBase: 16, // assuming 16px base
  },
  {
    id: 'rem',
    categoryId: 'typography',
    name: 'Rem',
    abbreviations: ['rem'],
    aliases: ['rems', 'root em'],
    toBase: 16, // assuming 16px root
  },
  {
    id: 'inch-css',
    categoryId: 'typography',
    name: 'Inch (CSS)',
    abbreviations: ['in'],
    aliases: ['inches'],
    toBase: 96,
  },
  {
    id: 'centimeter-css',
    categoryId: 'typography',
    name: 'Centimeter (CSS)',
    abbreviations: ['cm'],
    aliases: ['centimeters'],
    toBase: 37.7953, // 96/2.54
  },
  {
    id: 'millimeter-css',
    categoryId: 'typography',
    name: 'Millimeter (CSS)',
    abbreviations: ['mm'],
    aliases: ['millimeters'],
    toBase: 3.77953, // 96/25.4
  },
];

// ============================================================================
// NUMBER BASE
// ============================================================================

export const numberBaseCategory: Category = {
  id: 'number-base',
  name: 'Number Base',
  conversionType: 'base',
};

// The toBase property here represents the numeric base (radix) itself
export const numberBaseUnits: Unit[] = [
  {
    id: 'binary',
    categoryId: 'number-base',
    name: 'Binary',
    abbreviations: ['bin', 'base-2'],
    aliases: ['base 2', 'base2'],
    toBase: 2,
  },
  {
    id: 'octal',
    categoryId: 'number-base',
    name: 'Octal',
    abbreviations: ['oct', 'base-8'],
    aliases: ['base 8', 'base8'],
    toBase: 8,
  },
  {
    id: 'decimal',
    categoryId: 'number-base',
    name: 'Decimal',
    abbreviations: ['dec', 'base-10'],
    aliases: ['base 10', 'base10'],
    toBase: 10,
  },
  {
    id: 'hexadecimal',
    categoryId: 'number-base',
    name: 'Hexadecimal',
    abbreviations: ['hex', 'base-16'],
    aliases: ['base 16', 'base16'],
    toBase: 16,
  },
];

// Export all
export const digitalCategories = [dataStorageCategory, dataTransferCategory, typographyCategory, numberBaseCategory];
export const digitalUnits = [...dataStorageUnits, ...dataTransferUnits, ...typographyUnits, ...numberBaseUnits];

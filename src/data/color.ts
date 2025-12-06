import type { Category, Unit } from './types';

// ============================================================================
// COLOR
// ============================================================================

export const colorCategory: Category = {
  id: 'color',
  name: 'Color',
  conversionType: 'color',
};

export const colorUnits: Unit[] = [
  {
    id: 'color-hex',
    categoryId: 'color',
    name: 'Hex',
    abbreviations: ['hex', '#'],
    aliases: ['hexadecimal', 'hex color', 'hex code', 'hexadecimal color'],
  },
  {
    id: 'color-rgb',
    categoryId: 'color',
    name: 'RGB',
    abbreviations: ['rgb'],
    aliases: ['rgb color', 'red green blue', 'rgb()'],
  },
  {
    id: 'color-rgba',
    categoryId: 'color',
    name: 'RGBA',
    abbreviations: ['rgba'],
    aliases: ['rgba color', 'rgb alpha', 'red green blue alpha', 'rgba()'],
  },
  {
    id: 'color-hsl',
    categoryId: 'color',
    name: 'HSL',
    abbreviations: ['hsl'],
    aliases: ['hsl color', 'hue saturation lightness', 'hsl()'],
  },
  {
    id: 'color-hsla',
    categoryId: 'color',
    name: 'HSLA',
    abbreviations: ['hsla'],
    aliases: ['hsla color', 'hsl alpha', 'hue saturation lightness alpha', 'hsla()'],
  },
  {
    id: 'color-hsv',
    categoryId: 'color',
    name: 'HSV',
    abbreviations: ['hsv', 'hsb'],
    aliases: ['hsv color', 'hue saturation value', 'hsb color', 'hue saturation brightness', 'hsv()', 'hsb()'],
  },
  {
    id: 'color-cmyk',
    categoryId: 'color',
    name: 'CMYK',
    abbreviations: ['cmyk'],
    aliases: ['cmyk color', 'cyan magenta yellow black', 'print color', 'cmyk()'],
  },
];

// Export all
export const colorCategories = [colorCategory];

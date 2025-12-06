import type { Unit } from '../data/types';

/**
 * RGB color representation (0-255 for each channel)
 */
interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * HSL color representation (h: 0-360, s: 0-100, l: 0-100)
 */
interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Parse color input into RGB
 */
function parseColorToRGB(value: string, format: string): RGB | null {
  const trimmed = value.trim();

  if (format === 'hex') {
    return parseHex(trimmed);
  } else if (format === 'rgb') {
    return parseRGB(trimmed);
  } else if (format === 'hsl') {
    const hsl = parseHSL(trimmed);
    return hsl ? hslToRGB(hsl) : null;
  }

  return null;
}

/**
 * Parse hex color (#RGB or #RRGGBB)
 */
function parseHex(hex: string): RGB | null {
  let cleaned = hex.replace(/^#/, '');

  // Handle 3-digit hex
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (cleaned.length !== 6) {
    return null;
  }

  const num = parseInt(cleaned, 16);
  if (isNaN(num)) {
    return null;
  }

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Parse RGB color (rgb(r, g, b) or r,g,b)
 */
function parseRGB(rgb: string): RGB | null {
  // Match rgb(r, g, b) or rgba(r, g, b, a) format
  const rgbMatch = rgb.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  // Try simple comma-separated format
  const parts = rgb.split(',').map((p) => p.trim());
  if (parts.length === 3) {
    const [r, g, b] = parts.map((p) => parseInt(p, 10));
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return { r, g, b };
    }
  }

  return null;
}

/**
 * Parse HSL color (hsl(h, s%, l%))
 */
function parseHSL(hsl: string): HSL | null {
  // Match hsl(h, s%, l%) or hsla(h, s%, l%, a) format
  const hslMatch = hsl.match(/hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?/i);
  if (hslMatch) {
    return {
      h: parseFloat(hslMatch[1]),
      s: parseFloat(hslMatch[2]),
      l: parseFloat(hslMatch[3]),
    };
  }

  // Try simple comma-separated format (h, s, l)
  const parts = hsl.split(',').map((p) => p.trim().replace('%', ''));
  if (parts.length === 3) {
    const [h, s, l] = parts.map((p) => parseFloat(p));
    if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
      return { h, s, l };
    }
  }

  return null;
}

/**
 * Convert RGB to Hex
 */
function rgbToHex(rgb: RGB): string {
  const { r, g, b } = rgb;
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGB to HSL
 */
function rgbToHSL(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / delta + 2) / 6;
        break;
      case b:
        h = ((r - g) / delta + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 */
function hslToRGB(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Format RGB to string
 */
function formatRGB(rgb: RGB): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return `rgb(${clamp(rgb.r)}, ${clamp(rgb.g)}, ${clamp(rgb.b)})`;
}

/**
 * Format HSL to string
 */
function formatHSL(hsl: HSL): string {
  const h = Math.round(hsl.h) % 360;
  const s = Math.max(0, Math.min(100, Math.round(hsl.s)));
  const l = Math.max(0, Math.min(100, Math.round(hsl.l)));
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Color conversion function
 * Converts between hex, RGB, and HSL color formats
 */
export function colorConvert(from: Unit, to: Unit, value: string): string {
  if (!value.trim()) {
    return '';
  }

  // Determine format from unit ID
  const fromFormat = from.id.replace('color-', '');
  const toFormat = to.id.replace('color-', '');

  // Parse input to RGB (universal intermediate format)
  const rgb = parseColorToRGB(value, fromFormat);

  if (!rgb) {
    return 'Error: Invalid color format';
  }

  // Validate RGB values
  if (rgb.r < 0 || rgb.r > 255 || rgb.g < 0 || rgb.g > 255 || rgb.b < 0 || rgb.b > 255) {
    return 'Error: RGB values must be 0-255';
  }

  // Convert to target format
  if (toFormat === 'hex') {
    return rgbToHex(rgb);
  } else if (toFormat === 'rgb') {
    return formatRGB(rgb);
  } else if (toFormat === 'hsl') {
    const hsl = rgbToHSL(rgb);
    return formatHSL(hsl);
  }

  return 'Error: Unknown color format';
}

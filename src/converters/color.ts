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
 * CMYK color representation (0-100 for each channel)
 */
interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

/**
 * Parse color input into RGB
 */
function parseColorToRGB(value: string, format: string): RGB | null {
  const trimmed = value.trim();

  if (format === 'hex') {
    return parseHex(trimmed);
  } else if (format === 'rgb' || format === 'rgba') {
    return parseRGB(trimmed);
  } else if (format === 'hsl' || format === 'hsla') {
    const hsl = parseHSL(trimmed);
    return hsl ? hslToRGB(hsl) : null;
  } else if (format === 'cmyk') {
    const cmyk = parseCMYK(trimmed);
    return cmyk ? cmykToRGB(cmyk) : null;
  } else if (format === 'hsv') {
    const hsv = parseHSV(trimmed);
    return hsv ? hsvToRGB(hsv) : null;
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
 * Parse CMYK color (cmyk(c%, m%, y%, k%) or c,m,y,k)
 */
function parseCMYK(cmyk: string): CMYK | null {
  // Match cmyk(c, m, y, k) format
  const cmykMatch = cmyk.match(/cmyk\s*\(\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?/i);
  if (cmykMatch) {
    return {
      c: parseFloat(cmykMatch[1]),
      m: parseFloat(cmykMatch[2]),
      y: parseFloat(cmykMatch[3]),
      k: parseFloat(cmykMatch[4]),
    };
  }

  // Try simple comma-separated format (c, m, y, k)
  const parts = cmyk.split(',').map((p) => p.trim().replace('%', ''));
  if (parts.length === 4) {
    const [c, m, y, k] = parts.map((p) => parseFloat(p));
    if (!isNaN(c) && !isNaN(m) && !isNaN(y) && !isNaN(k)) {
      return { c, m, y, k };
    }
  }

  return null;
}

/**
 * Parse HSV/HSB color (hsv(h, s%, v%) or h,s,v)
 */
function parseHSV(hsv: string): HSL | null {
  // Match hsv(h, s%, v%) or hsb format
  const hsvMatch = hsv.match(/hs[vb]\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?/i);
  if (hsvMatch) {
    return {
      h: parseFloat(hsvMatch[1]),
      s: parseFloat(hsvMatch[2]),
      l: parseFloat(hsvMatch[3]), // Using l to store v
    };
  }

  // Try simple comma-separated format (h, s, v)
  const parts = hsv.split(',').map((p) => p.trim().replace('%', ''));
  if (parts.length === 3) {
    const [h, s, v] = parts.map((p) => parseFloat(p));
    if (!isNaN(h) && !isNaN(s) && !isNaN(v)) {
      return { h, s, l: v };
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
 * Convert CMYK to RGB
 */
function cmykToRGB(cmyk: CMYK): RGB {
  const c = cmyk.c / 100;
  const m = cmyk.m / 100;
  const y = cmyk.y / 100;
  const k = cmyk.k / 100;

  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k)),
  };
}

/**
 * Convert RGB to CMYK
 */
function rgbToCMYK(rgb: RGB): CMYK {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const k = 1 - Math.max(r, g, b);

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

/**
 * Format CMYK to string
 */
function formatCMYK(cmyk: CMYK): string {
  return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
}

/**
 * Convert HSV to RGB
 */
function hsvToRGB(hsv: HSL): RGB {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.l / 100; // l stores v

  let r: number, g: number, b: number;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = 0; g = 0; b = 0;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Convert RGB to HSV
 */
function rgbToHSV(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
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
    l: Math.round(v * 100), // l stores v
  };
}

/**
 * Format HSV to string
 */
function formatHSV(hsv: HSL): string {
  return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.l}%)`;
}

/**
 * Color conversion function
 * Converts between hex, RGB, HSL, CMYK, and HSV color formats
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
  switch (toFormat) {
    case 'hex':
      return rgbToHex(rgb);
    case 'rgb':
    case 'rgba':
      return formatRGB(rgb);
    case 'hsl':
    case 'hsla':
      return formatHSL(rgbToHSL(rgb));
    case 'cmyk':
      return formatCMYK(rgbToCMYK(rgb));
    case 'hsv':
      return formatHSV(rgbToHSV(rgb));
    default:
      return `Error: Unsupported format "${toFormat}"`;
  }
}

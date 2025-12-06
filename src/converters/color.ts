import type { Unit } from '../data/types';
import { cssNamedColors } from '../data/color';

/**
 * RGBA color representation (0-255 for each channel, alpha 0-1)
 */
interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

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
 * LAB color representation (L: 0-100, a: -128 to 127, b: -128 to 127)
 */
interface LAB {
  l: number;
  a: number;
  b: number;
}

/**
 * LCH color representation (L: 0-100, C: 0-150+, H: 0-360)
 */
interface LCH {
  l: number;
  c: number;
  h: number;
}

/**
 * XYZ color representation (intermediate for LAB conversions)
 */
interface XYZ {
  x: number;
  y: number;
  z: number;
}

/**
 * Parse color input into RGBA (with alpha channel)
 */
function parseColorToRGBA(value: string, format: string): RGBA | null {
  const trimmed = value.trim();

  if (format === 'hex') {
    return parseHex(trimmed);
  } else if (format === 'rgb') {
    return parseRGB(trimmed);
  } else if (format === 'rgba') {
    return parseRGBA(trimmed);
  } else if (format === 'hsl') {
    const hsl = parseHSL(trimmed);
    return hsl ? { ...hslToRGB(hsl), a: 1 } : null;
  } else if (format === 'hsla') {
    const result = parseHSLA(trimmed);
    if (result) {
      const rgb = hslToRGB(result.hsl);
      return { ...rgb, a: result.a };
    }
    return null;
  } else if (format === 'cmyk') {
    const cmyk = parseCMYK(trimmed);
    return cmyk ? { ...cmykToRGB(cmyk), a: 1 } : null;
  } else if (format === 'hsv') {
    const hsv = parseHSV(trimmed);
    return hsv ? { ...hsvToRGB(hsv), a: 1 } : null;
  } else if (format === 'named') {
    return parseNamedColor(trimmed);
  } else if (format === 'lab') {
    const lab = parseLAB(trimmed);
    return lab ? { ...labToRGB(lab), a: 1 } : null;
  } else if (format === 'lch') {
    const lch = parseLCH(trimmed);
    return lch ? { ...lchToRGB(lch), a: 1 } : null;
  } else if (format === 'oklch') {
    const oklch = parseOKLCH(trimmed);
    return oklch ? { ...oklchToRGB(oklch), a: 1 } : null;
  } else if (format === 'oklab') {
    const oklab = parseOKLAB(trimmed);
    return oklab ? { ...oklabToRGB(oklab), a: 1 } : null;
  }

  return null;
}

/**
 * Parse CSS named color
 */
function parseNamedColor(name: string): RGBA | null {
  const normalized = name.toLowerCase().trim();
  const hex = cssNamedColors[normalized];
  if (hex) {
    const rgb = parseHex(hex);
    return rgb;
  }
  return null;
}

/**
 * Find closest named color for RGB value
 */
function findClosestNamedColor(rgba: RGBA): string {
  let closestName = 'black';
  let closestDistance = Infinity;

  for (const [name, hex] of Object.entries(cssNamedColors)) {
    const namedRgb = parseHex(hex);
    if (namedRgb) {
      // Calculate Euclidean distance in RGB space
      const distance = Math.sqrt(
        Math.pow(rgba.r - namedRgb.r, 2) +
        Math.pow(rgba.g - namedRgb.g, 2) +
        Math.pow(rgba.b - namedRgb.b, 2)
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestName = name;
      }
    }
  }

  return closestName;
}

/**
 * Parse hex color (#RGB, #RRGGBB, #RGBA, or #RRGGBBAA)
 */
function parseHex(hex: string): RGBA | null {
  let cleaned = hex.replace(/^#/, '');

  // Handle 3-digit hex (#RGB)
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((char) => char + char)
      .join('') + 'ff'; // Add full opacity
  }

  // Handle 4-digit hex (#RGBA)
  if (cleaned.length === 4) {
    cleaned = cleaned
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Handle 6-digit hex (#RRGGBB)
  if (cleaned.length === 6) {
    cleaned = cleaned + 'ff'; // Add full opacity
  }

  if (cleaned.length !== 8) {
    return null;
  }

  const num = parseInt(cleaned, 16);
  if (isNaN(num)) {
    return null;
  }

  return {
    r: (num >> 24) & 255,
    g: (num >> 16) & 255,
    b: (num >> 8) & 255,
    a: (num & 255) / 255,
  };
}

/**
 * Parse RGB color (rgb(r, g, b) or r,g,b)
 */
function parseRGB(rgb: string): RGBA | null {
  // Match rgb(r, g, b) format
  const rgbMatch = rgb.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
      a: 1,
    };
  }

  // Try simple comma-separated format
  const parts = rgb.split(',').map((p) => p.trim());
  if (parts.length === 3) {
    const [r, g, b] = parts.map((p) => parseInt(p, 10));
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return { r, g, b, a: 1 };
    }
  }

  return null;
}

/**
 * Parse RGBA color (rgba(r, g, b, a) or r,g,b,a)
 */
function parseRGBA(rgba: string): RGBA | null {
  // Match rgba(r, g, b, a) format
  const rgbaMatch = rgba.match(/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/i);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: parseFloat(rgbaMatch[4]),
    };
  }

  // Try simple comma-separated format
  const parts = rgba.split(',').map((p) => p.trim());
  if (parts.length === 4) {
    const [r, g, b] = parts.slice(0, 3).map((p) => parseInt(p, 10));
    const a = parseFloat(parts[3]);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b) && !isNaN(a)) {
      return { r, g, b, a };
    }
  }

  // Fallback to RGB parsing with default alpha
  return parseRGB(rgba);
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
 * Parse HSLA color (hsla(h, s%, l%, a))
 */
function parseHSLA(hsla: string): { hsl: HSL; a: number } | null {
  // Match hsla(h, s%, l%, a) format
  const hslaMatch = hsla.match(/hsla\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)\s*\)/i);
  if (hslaMatch) {
    return {
      hsl: {
        h: parseFloat(hslaMatch[1]),
        s: parseFloat(hslaMatch[2]),
        l: parseFloat(hslaMatch[3]),
      },
      a: parseFloat(hslaMatch[4]),
    };
  }

  // Try simple comma-separated format (h, s, l, a)
  const parts = hsla.split(',').map((p) => p.trim().replace('%', ''));
  if (parts.length === 4) {
    const [h, s, l] = parts.slice(0, 3).map((p) => parseFloat(p));
    const a = parseFloat(parts[3]);
    if (!isNaN(h) && !isNaN(s) && !isNaN(l) && !isNaN(a)) {
      return { hsl: { h, s, l }, a };
    }
  }

  // Fallback to HSL with default alpha
  const hsl = parseHSL(hsla);
  return hsl ? { hsl, a: 1 } : null;
}

/**
 * Parse LAB color (lab(l% a b) or lab(l, a, b))
 */
function parseLAB(lab: string): LAB | null {
  // Match lab(l% a b) CSS format
  const labMatch = lab.match(/lab\s*\(\s*([\d.]+)%?\s+(-?[\d.]+)\s+(-?[\d.]+)\s*\)/i);
  if (labMatch) {
    return {
      l: parseFloat(labMatch[1]),
      a: parseFloat(labMatch[2]),
      b: parseFloat(labMatch[3]),
    };
  }

  // Match comma-separated format
  const labCommaMatch = lab.match(/lab\s*\(\s*([\d.]+)%?\s*,\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\)/i);
  if (labCommaMatch) {
    return {
      l: parseFloat(labCommaMatch[1]),
      a: parseFloat(labCommaMatch[2]),
      b: parseFloat(labCommaMatch[3]),
    };
  }

  // Try simple comma-separated format
  const parts = lab.split(',').map((p) => p.trim().replace('%', ''));
  if (parts.length === 3) {
    const [l, a, b] = parts.map((p) => parseFloat(p));
    if (!isNaN(l) && !isNaN(a) && !isNaN(b)) {
      return { l, a, b };
    }
  }

  return null;
}

/**
 * Parse LCH color (lch(l% c h) or lch(l, c, h))
 */
function parseLCH(lch: string): LCH | null {
  // Match lch(l% c h) CSS format
  const lchMatch = lch.match(/lch\s*\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/i);
  if (lchMatch) {
    return {
      l: parseFloat(lchMatch[1]),
      c: parseFloat(lchMatch[2]),
      h: parseFloat(lchMatch[3]),
    };
  }

  // Match comma-separated format
  const lchCommaMatch = lch.match(/lch\s*\(\s*([\d.]+)%?\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/i);
  if (lchCommaMatch) {
    return {
      l: parseFloat(lchCommaMatch[1]),
      c: parseFloat(lchCommaMatch[2]),
      h: parseFloat(lchCommaMatch[3]),
    };
  }

  // Try simple comma-separated format
  const parts = lch.split(',').map((p) => p.trim().replace('%', ''));
  if (parts.length === 3) {
    const [l, c, h] = parts.map((p) => parseFloat(p));
    if (!isNaN(l) && !isNaN(c) && !isNaN(h)) {
      return { l, c, h };
    }
  }

  return null;
}

/**
 * Parse OKLCH color (oklch(l% c h) or oklch(l, c, h))
 */
function parseOKLCH(oklch: string): LCH | null {
  // Match oklch(l% c h) CSS format (l is 0-1 or 0-100%)
  const oklchMatch = oklch.match(/oklch\s*\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/i);
  if (oklchMatch) {
    let l = parseFloat(oklchMatch[1]);
    // If value > 1, assume percentage
    if (l > 1) l = l / 100;
    return {
      l: l * 100, // Store as 0-100 internally
      c: parseFloat(oklchMatch[2]),
      h: parseFloat(oklchMatch[3]),
    };
  }

  // Match comma-separated format
  const oklchCommaMatch = oklch.match(/oklch\s*\(\s*([\d.]+)%?\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/i);
  if (oklchCommaMatch) {
    let l = parseFloat(oklchCommaMatch[1]);
    if (l > 1) l = l / 100;
    return {
      l: l * 100,
      c: parseFloat(oklchCommaMatch[2]),
      h: parseFloat(oklchCommaMatch[3]),
    };
  }

  // Try simple comma-separated format
  const parts = oklch.split(',').map((p) => p.trim().replace('%', ''));
  if (parts.length === 3) {
    let [l, c, h] = parts.map((p) => parseFloat(p));
    if (!isNaN(l) && !isNaN(c) && !isNaN(h)) {
      if (l > 1) l = l / 100;
      return { l: l * 100, c, h };
    }
  }

  return null;
}

/**
 * Parse OKLAB color (oklab(l% a b) or oklab(l, a, b))
 */
function parseOKLAB(oklab: string): LAB | null {
  // Match oklab(l% a b) CSS format (l is 0-1 or 0-100%)
  const oklabMatch = oklab.match(/oklab\s*\(\s*([\d.]+)%?\s+(-?[\d.]+)\s+(-?[\d.]+)\s*\)/i);
  if (oklabMatch) {
    let l = parseFloat(oklabMatch[1]);
    if (l > 1) l = l / 100;
    return {
      l: l * 100, // Store as 0-100 internally
      a: parseFloat(oklabMatch[2]),
      b: parseFloat(oklabMatch[3]),
    };
  }

  // Match comma-separated format
  const oklabCommaMatch = oklab.match(/oklab\s*\(\s*([\d.]+)%?\s*,\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\)/i);
  if (oklabCommaMatch) {
    let l = parseFloat(oklabCommaMatch[1]);
    if (l > 1) l = l / 100;
    return {
      l: l * 100,
      a: parseFloat(oklabCommaMatch[2]),
      b: parseFloat(oklabCommaMatch[3]),
    };
  }

  // Try simple comma-separated format
  const parts = oklab.split(',').map((p) => p.trim().replace('%', ''));
  if (parts.length === 3) {
    let [l, a, b] = parts.map((p) => parseFloat(p));
    if (!isNaN(l) && !isNaN(a) && !isNaN(b)) {
      if (l > 1) l = l / 100;
      return { l: l * 100, a, b };
    }
  }

  return null;
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

// D65 illuminant reference white
const D65 = { x: 95.047, y: 100.0, z: 108.883 };

/**
 * Convert RGB to XYZ (intermediate for LAB)
 */
function rgbToXYZ(rgb: RGB): XYZ {
  // Normalize and apply gamma correction (sRGB)
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  r *= 100;
  g *= 100;
  b *= 100;

  // sRGB to XYZ (D65)
  return {
    x: r * 0.4124564 + g * 0.3575761 + b * 0.1804375,
    y: r * 0.2126729 + g * 0.7151522 + b * 0.0721750,
    z: r * 0.0193339 + g * 0.1191920 + b * 0.9503041,
  };
}

/**
 * Convert XYZ to RGB
 */
function xyzToRGB(xyz: XYZ): RGB {
  let x = xyz.x / 100;
  let y = xyz.y / 100;
  let z = xyz.z / 100;

  // XYZ to sRGB
  let r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  let g = x * -0.9692660 + y * 1.8760108 + z * 0.0415560;
  let b = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  // Apply gamma correction
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

  return {
    r: Math.round(Math.max(0, Math.min(255, r * 255))),
    g: Math.round(Math.max(0, Math.min(255, g * 255))),
    b: Math.round(Math.max(0, Math.min(255, b * 255))),
  };
}

/**
 * Convert XYZ to LAB
 */
function xyzToLAB(xyz: XYZ): LAB {
  let x = xyz.x / D65.x;
  let y = xyz.y / D65.y;
  let z = xyz.z / D65.z;

  const epsilon = 0.008856;
  const kappa = 903.3;

  x = x > epsilon ? Math.pow(x, 1 / 3) : (kappa * x + 16) / 116;
  y = y > epsilon ? Math.pow(y, 1 / 3) : (kappa * y + 16) / 116;
  z = z > epsilon ? Math.pow(z, 1 / 3) : (kappa * z + 16) / 116;

  return {
    l: 116 * y - 16,
    a: 500 * (x - y),
    b: 200 * (y - z),
  };
}

/**
 * Convert LAB to XYZ
 */
function labToXYZ(lab: LAB): XYZ {
  const y = (lab.l + 16) / 116;
  const x = lab.a / 500 + y;
  const z = y - lab.b / 200;

  const epsilon = 0.008856;
  const kappa = 903.3;

  const x3 = Math.pow(x, 3);
  const z3 = Math.pow(z, 3);

  return {
    x: (x3 > epsilon ? x3 : (116 * x - 16) / kappa) * D65.x,
    y: (lab.l > kappa * epsilon ? Math.pow((lab.l + 16) / 116, 3) : lab.l / kappa) * D65.y,
    z: (z3 > epsilon ? z3 : (116 * z - 16) / kappa) * D65.z,
  };
}

/**
 * Convert RGB to LAB
 */
function rgbToLAB(rgb: RGB): LAB {
  return xyzToLAB(rgbToXYZ(rgb));
}

/**
 * Convert LAB to RGB
 */
function labToRGB(lab: LAB): RGB {
  return xyzToRGB(labToXYZ(lab));
}

/**
 * Convert LAB to LCH
 */
function labToLCH(lab: LAB): LCH {
  const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let h = Math.atan2(lab.b, lab.a) * (180 / Math.PI);
  if (h < 0) h += 360;

  return { l: lab.l, c, h };
}

/**
 * Convert LCH to LAB
 */
function lchToLAB(lch: LCH): LAB {
  const hRad = lch.h * (Math.PI / 180);
  return {
    l: lch.l,
    a: lch.c * Math.cos(hRad),
    b: lch.c * Math.sin(hRad),
  };
}

/**
 * Convert RGB to LCH
 */
function rgbToLCH(rgb: RGB): LCH {
  return labToLCH(rgbToLAB(rgb));
}

/**
 * Convert LCH to RGB
 */
function lchToRGB(lch: LCH): RGB {
  return labToRGB(lchToLAB(lch));
}

/**
 * Convert RGB to OKLAB
 */
function rgbToOKLAB(rgb: RGB): LAB {
  // Linear RGB
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  // sRGB to linear
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Linear RGB to LMS
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  // LMS to OKLAB
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  };
}

/**
 * Convert OKLAB to RGB
 */
function oklabToRGB(oklab: LAB): RGB {
  // OKLAB uses l in 0-1 range, our internal storage is 0-100
  const L = oklab.l / 100;
  const a = oklab.a;
  const b = oklab.b;

  // OKLAB to LMS
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // LMS to linear RGB
  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  // Linear to sRGB
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  bl = bl > 0.0031308 ? 1.055 * Math.pow(bl, 1 / 2.4) - 0.055 : 12.92 * bl;

  return {
    r: Math.round(Math.max(0, Math.min(255, r * 255))),
    g: Math.round(Math.max(0, Math.min(255, g * 255))),
    b: Math.round(Math.max(0, Math.min(255, bl * 255))),
  };
}

/**
 * Convert RGB to OKLCH
 */
function rgbToOKLCH(rgb: RGB): LCH {
  const oklab = rgbToOKLAB(rgb);
  const c = Math.sqrt(oklab.a * oklab.a + oklab.b * oklab.b);
  let h = Math.atan2(oklab.b, oklab.a) * (180 / Math.PI);
  if (h < 0) h += 360;

  return { l: oklab.l * 100, c, h }; // Scale l to 0-100
}

/**
 * Convert OKLCH to RGB
 */
function oklchToRGB(oklch: LCH): RGB {
  const hRad = oklch.h * (Math.PI / 180);
  const oklab: LAB = {
    l: oklch.l, // Already in 0-100 range
    a: oklch.c * Math.cos(hRad),
    b: oklch.c * Math.sin(hRad),
  };
  return oklabToRGB(oklab);
}

/**
 * Format LAB to string
 */
function formatLAB(lab: LAB): string {
  return `lab(${lab.l.toFixed(1)}% ${lab.a.toFixed(1)} ${lab.b.toFixed(1)})`;
}

/**
 * Format LCH to string
 */
function formatLCH(lch: LCH): string {
  return `lch(${lch.l.toFixed(1)}% ${lch.c.toFixed(1)} ${lch.h.toFixed(1)})`;
}

/**
 * Format OKLAB to string
 */
function formatOKLAB(oklab: LAB): string {
  // OKLAB l is 0-1 in CSS, our internal is 0-100
  return `oklab(${(oklab.l / 100).toFixed(2)} ${oklab.a.toFixed(3)} ${oklab.b.toFixed(3)})`;
}

/**
 * Format OKLCH to string
 */
function formatOKLCH(oklch: LCH): string {
  // OKLCH l is 0-1 in CSS, our internal is 0-100
  return `oklch(${(oklch.l / 100).toFixed(2)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`;
}

/**
 * Format RGBA to string
 */
function formatRGBA(rgba: RGBA): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return `rgba(${clamp(rgba.r)}, ${clamp(rgba.g)}, ${clamp(rgba.b)}, ${rgba.a.toFixed(2)})`;
}

/**
 * Format HSLA to string
 */
function formatHSLA(hsl: HSL, a: number): string {
  const h = Math.round(hsl.h) % 360;
  const s = Math.max(0, Math.min(100, Math.round(hsl.s)));
  const l = Math.max(0, Math.min(100, Math.round(hsl.l)));
  return `hsla(${h}, ${s}%, ${l}%, ${a.toFixed(2)})`;
}

/**
 * Format Hex with alpha
 */
function rgbaToHex(rgba: RGBA): string {
  const { r, g, b, a } = rgba;
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0');
  const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');

  if (a === 1) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
}

/**
 * Color conversion function
 * Converts between hex, RGB, HSL, CMYK, HSV, LAB, LCH, OKLCH, OKLAB, and named color formats
 */
export function colorConvert(from: Unit, to: Unit, value: string): string {
  if (!value.trim()) {
    return '';
  }

  // Determine format from unit ID
  const fromFormat = from.id.replace('color-', '');
  const toFormat = to.id.replace('color-', '');

  // Parse input to RGBA (universal intermediate format with alpha)
  const rgba = parseColorToRGBA(value, fromFormat);

  if (!rgba) {
    return 'Error: Invalid color format';
  }

  // Validate RGB values
  if (rgba.r < 0 || rgba.r > 255 || rgba.g < 0 || rgba.g > 255 || rgba.b < 0 || rgba.b > 255) {
    return 'Error: RGB values must be 0-255';
  }

  // Create RGB for conversions that don't need alpha
  const rgb: RGB = { r: rgba.r, g: rgba.g, b: rgba.b };

  // Convert to target format
  switch (toFormat) {
    case 'hex':
      return rgbaToHex(rgba);
    case 'rgb':
      return formatRGB(rgb);
    case 'rgba':
      return formatRGBA(rgba);
    case 'hsl':
      return formatHSL(rgbToHSL(rgb));
    case 'hsla':
      return formatHSLA(rgbToHSL(rgb), rgba.a);
    case 'cmyk':
      return formatCMYK(rgbToCMYK(rgb));
    case 'hsv':
      return formatHSV(rgbToHSV(rgb));
    case 'named':
      return findClosestNamedColor(rgba);
    case 'lab':
      return formatLAB(rgbToLAB(rgb));
    case 'lch':
      return formatLCH(rgbToLCH(rgb));
    case 'oklch':
      return formatOKLCH(rgbToOKLCH(rgb));
    case 'oklab': {
      const oklab = rgbToOKLAB(rgb);
      // Scale to 0-100 for internal storage
      return formatOKLAB({ l: oklab.l * 100, a: oklab.a, b: oklab.b });
    }
    default:
      return `Error: Unsupported format "${toFormat}"`;
  }
}

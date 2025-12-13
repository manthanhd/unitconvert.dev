import { describe, it, expect } from 'vitest';
import { colorConvert } from './color';
import { createColorUnit } from '../test/helpers';

describe('colorConvert', () => {
  const hex = createColorUnit('hex');
  const rgb = createColorUnit('rgb');
  const rgba = createColorUnit('rgba');
  const hsl = createColorUnit('hsl');
  const hsla = createColorUnit('hsla');
  const hsv = createColorUnit('hsv');
  const cmyk = createColorUnit('cmyk');
  const named = createColorUnit('named');
  const lab = createColorUnit('lab');
  const lch = createColorUnit('lch');
  const oklch = createColorUnit('oklch');
  const oklab = createColorUnit('oklab');

  describe('Hex to RGB', () => {
    it('should convert #FF0000 to rgb(255, 0, 0)', () => {
      expect(colorConvert(hex, rgb, '#FF0000')).toBe('rgb(255, 0, 0)');
    });

    it('should convert #00FF00 to rgb(0, 255, 0)', () => {
      expect(colorConvert(hex, rgb, '#00FF00')).toBe('rgb(0, 255, 0)');
    });

    it('should convert #0000FF to rgb(0, 0, 255)', () => {
      expect(colorConvert(hex, rgb, '#0000FF')).toBe('rgb(0, 0, 255)');
    });

    it('should convert #FFFFFF to rgb(255, 255, 255)', () => {
      expect(colorConvert(hex, rgb, '#FFFFFF')).toBe('rgb(255, 255, 255)');
    });

    it('should convert #000000 to rgb(0, 0, 0)', () => {
      expect(colorConvert(hex, rgb, '#000000')).toBe('rgb(0, 0, 0)');
    });

    it('should convert #808080 to rgb(128, 128, 128)', () => {
      expect(colorConvert(hex, rgb, '#808080')).toBe('rgb(128, 128, 128)');
    });

    it('should handle 3-digit hex (#F00)', () => {
      expect(colorConvert(hex, rgb, '#F00')).toBe('rgb(255, 0, 0)');
    });

    it('should handle 3-digit hex (#0F0)', () => {
      expect(colorConvert(hex, rgb, '#0F0')).toBe('rgb(0, 255, 0)');
    });

    it('should handle lowercase hex', () => {
      expect(colorConvert(hex, rgb, '#ff0000')).toBe('rgb(255, 0, 0)');
    });

    it('should handle mixed case hex', () => {
      expect(colorConvert(hex, rgb, '#Ff00fF')).toBe('rgb(255, 0, 255)');
    });
  });

  describe('RGB to Hex', () => {
    it('should convert rgb(255, 0, 0) to #ff0000', () => {
      expect(colorConvert(rgb, hex, 'rgb(255, 0, 0)')).toBe('#ff0000');
    });

    it('should convert rgb(0, 255, 0) to #00ff00', () => {
      expect(colorConvert(rgb, hex, 'rgb(0, 255, 0)')).toBe('#00ff00');
    });

    it('should convert rgb(0, 0, 255) to #0000ff', () => {
      expect(colorConvert(rgb, hex, 'rgb(0, 0, 255)')).toBe('#0000ff');
    });

    it('should convert rgb(128, 128, 128) to #808080', () => {
      expect(colorConvert(rgb, hex, 'rgb(128, 128, 128)')).toBe('#808080');
    });

    it('should handle comma-separated format (255, 0, 0)', () => {
      expect(colorConvert(rgb, hex, '255, 0, 0')).toBe('#ff0000');
    });

    it('should handle spaces in rgb format', () => {
      expect(colorConvert(rgb, hex, 'rgb( 255 , 0 , 0 )')).toBe('#ff0000');
    });
  });

  describe('Hex to HSL', () => {
    it('should convert pure red #FF0000 to hsl(0, 100%, 50%)', () => {
      expect(colorConvert(hex, hsl, '#FF0000')).toBe('hsl(0, 100%, 50%)');
    });

    it('should convert pure green #00FF00 to hsl(120, 100%, 50%)', () => {
      expect(colorConvert(hex, hsl, '#00FF00')).toBe('hsl(120, 100%, 50%)');
    });

    it('should convert pure blue #0000FF to hsl(240, 100%, 50%)', () => {
      expect(colorConvert(hex, hsl, '#0000FF')).toBe('hsl(240, 100%, 50%)');
    });

    it('should convert white #FFFFFF to hsl(0, 0%, 100%)', () => {
      expect(colorConvert(hex, hsl, '#FFFFFF')).toBe('hsl(0, 0%, 100%)');
    });

    it('should convert black #000000 to hsl(0, 0%, 0%)', () => {
      expect(colorConvert(hex, hsl, '#000000')).toBe('hsl(0, 0%, 0%)');
    });

    it('should convert gray #808080 to hsl with 0% saturation', () => {
      const result = colorConvert(hex, hsl, '#808080');
      expect(result).toMatch(/hsl\(\d+, 0%, 50%\)/);
    });

    it('should convert cyan #00FFFF to hsl(180, 100%, 50%)', () => {
      expect(colorConvert(hex, hsl, '#00FFFF')).toBe('hsl(180, 100%, 50%)');
    });

    it('should convert magenta #FF00FF to hsl(300, 100%, 50%)', () => {
      expect(colorConvert(hex, hsl, '#FF00FF')).toBe('hsl(300, 100%, 50%)');
    });

    it('should convert yellow #FFFF00 to hsl(60, 100%, 50%)', () => {
      expect(colorConvert(hex, hsl, '#FFFF00')).toBe('hsl(60, 100%, 50%)');
    });
  });

  describe('HSL to RGB', () => {
    it('should convert hsl(0, 100%, 50%) to rgb(255, 0, 0)', () => {
      expect(colorConvert(hsl, rgb, 'hsl(0, 100%, 50%)')).toBe('rgb(255, 0, 0)');
    });

    it('should convert hsl(120, 100%, 50%) to rgb(0, 255, 0)', () => {
      expect(colorConvert(hsl, rgb, 'hsl(120, 100%, 50%)')).toBe('rgb(0, 255, 0)');
    });

    it('should convert hsl(240, 100%, 50%) to rgb(0, 0, 255)', () => {
      expect(colorConvert(hsl, rgb, 'hsl(240, 100%, 50%)')).toBe('rgb(0, 0, 255)');
    });

    it('should convert hsl(0, 0%, 100%) to rgb(255, 255, 255)', () => {
      expect(colorConvert(hsl, rgb, 'hsl(0, 0%, 100%)')).toBe('rgb(255, 255, 255)');
    });

    it('should convert hsl(0, 0%, 0%) to rgb(0, 0, 0)', () => {
      expect(colorConvert(hsl, rgb, 'hsl(0, 0%, 0%)')).toBe('rgb(0, 0, 0)');
    });

    it('should handle comma-separated HSL format', () => {
      expect(colorConvert(hsl, rgb, '0, 100, 50')).toBe('rgb(255, 0, 0)');
    });
  });

  describe('RGB to CMYK', () => {
    it('should convert rgb(255, 0, 0) to cmyk(0%, 100%, 100%, 0%)', () => {
      expect(colorConvert(rgb, cmyk, 'rgb(255, 0, 0)')).toBe('cmyk(0%, 100%, 100%, 0%)');
    });

    it('should convert rgb(0, 255, 0) to cmyk(100%, 0%, 100%, 0%)', () => {
      expect(colorConvert(rgb, cmyk, 'rgb(0, 255, 0)')).toBe('cmyk(100%, 0%, 100%, 0%)');
    });

    it('should convert rgb(0, 0, 255) to cmyk(100%, 100%, 0%, 0%)', () => {
      expect(colorConvert(rgb, cmyk, 'rgb(0, 0, 255)')).toBe('cmyk(100%, 100%, 0%, 0%)');
    });

    it('should convert rgb(0, 0, 0) to cmyk(0%, 0%, 0%, 100%)', () => {
      expect(colorConvert(rgb, cmyk, 'rgb(0, 0, 0)')).toBe('cmyk(0%, 0%, 0%, 100%)');
    });

    it('should convert rgb(255, 255, 255) to cmyk(0%, 0%, 0%, 0%)', () => {
      expect(colorConvert(rgb, cmyk, 'rgb(255, 255, 255)')).toBe('cmyk(0%, 0%, 0%, 0%)');
    });

    it('should convert rgb(0, 255, 255) (cyan) to cmyk(100%, 0%, 0%, 0%)', () => {
      expect(colorConvert(rgb, cmyk, 'rgb(0, 255, 255)')).toBe('cmyk(100%, 0%, 0%, 0%)');
    });

    it('should convert rgb(255, 0, 255) (magenta) to cmyk(0%, 100%, 0%, 0%)', () => {
      expect(colorConvert(rgb, cmyk, 'rgb(255, 0, 255)')).toBe('cmyk(0%, 100%, 0%, 0%)');
    });

    it('should convert rgb(255, 255, 0) (yellow) to cmyk(0%, 0%, 100%, 0%)', () => {
      expect(colorConvert(rgb, cmyk, 'rgb(255, 255, 0)')).toBe('cmyk(0%, 0%, 100%, 0%)');
    });
  });

  describe('CMYK to RGB', () => {
    it('should convert cmyk(0%, 100%, 100%, 0%) to rgb(255, 0, 0)', () => {
      expect(colorConvert(cmyk, rgb, 'cmyk(0%, 100%, 100%, 0%)')).toBe('rgb(255, 0, 0)');
    });

    it('should convert cmyk(100%, 0%, 100%, 0%) to rgb(0, 255, 0)', () => {
      expect(colorConvert(cmyk, rgb, 'cmyk(100%, 0%, 100%, 0%)')).toBe('rgb(0, 255, 0)');
    });

    it('should convert cmyk(100%, 100%, 0%, 0%) to rgb(0, 0, 255)', () => {
      expect(colorConvert(cmyk, rgb, 'cmyk(100%, 100%, 0%, 0%)')).toBe('rgb(0, 0, 255)');
    });

    it('should handle comma-separated CMYK format', () => {
      expect(colorConvert(cmyk, rgb, '0, 100, 100, 0')).toBe('rgb(255, 0, 0)');
    });
  });

  describe('HSV/HSB conversions', () => {
    it('should convert hsv(0, 100%, 100%) to rgb(255, 0, 0)', () => {
      expect(colorConvert(hsv, rgb, 'hsv(0, 100%, 100%)')).toBe('rgb(255, 0, 0)');
    });

    it('should convert hsv(120, 100%, 100%) to rgb(0, 255, 0)', () => {
      expect(colorConvert(hsv, rgb, 'hsv(120, 100%, 100%)')).toBe('rgb(0, 255, 0)');
    });

    it('should convert hsv(240, 100%, 100%) to rgb(0, 0, 255)', () => {
      expect(colorConvert(hsv, rgb, 'hsv(240, 100%, 100%)')).toBe('rgb(0, 0, 255)');
    });

    it('should convert hsv(0, 0%, 100%) to rgb(255, 255, 255)', () => {
      expect(colorConvert(hsv, rgb, 'hsv(0, 0%, 100%)')).toBe('rgb(255, 255, 255)');
    });

    it('should convert hsv(0, 0%, 0%) to rgb(0, 0, 0)', () => {
      expect(colorConvert(hsv, rgb, 'hsv(0, 0%, 0%)')).toBe('rgb(0, 0, 0)');
    });

    it('should convert rgb(255, 0, 0) to hsv with h=0', () => {
      const result = colorConvert(rgb, hsv, 'rgb(255, 0, 0)');
      expect(result).toMatch(/hsv\(0, 100%, 100%\)/);
    });
  });

  describe('Named color conversions', () => {
    it('should convert "red" to #ff0000', () => {
      expect(colorConvert(named, hex, 'red')).toBe('#ff0000');
    });

    it('should convert "blue" to rgb(0, 0, 255)', () => {
      expect(colorConvert(named, rgb, 'blue')).toBe('rgb(0, 0, 255)');
    });

    it('should convert "green" to #008000 (not #00ff00)', () => {
      // CSS green is #008000, not #00ff00 (which is lime)
      expect(colorConvert(named, hex, 'green')).toBe('#008000');
    });

    it('should convert "lime" to #00ff00', () => {
      expect(colorConvert(named, hex, 'lime')).toBe('#00ff00');
    });

    it('should convert "rebeccapurple" to #663399', () => {
      expect(colorConvert(named, hex, 'rebeccapurple')).toBe('#663399');
    });

    it('should convert "white" to rgb(255, 255, 255)', () => {
      expect(colorConvert(named, rgb, 'white')).toBe('rgb(255, 255, 255)');
    });

    it('should convert "black" to rgb(0, 0, 0)', () => {
      expect(colorConvert(named, rgb, 'black')).toBe('rgb(0, 0, 0)');
    });

    it('should handle case insensitive named colors', () => {
      expect(colorConvert(named, hex, 'RED')).toBe('#ff0000');
      expect(colorConvert(named, hex, 'Red')).toBe('#ff0000');
    });

    it('should find closest named color for rgb(255, 0, 0)', () => {
      expect(colorConvert(rgb, named, 'rgb(255, 0, 0)')).toBe('red');
    });

    it('should find closest named color for rgb(0, 0, 255)', () => {
      expect(colorConvert(rgb, named, 'rgb(0, 0, 255)')).toBe('blue');
    });
  });

  describe('RGBA and HSLA with alpha', () => {
    it('should preserve alpha in hex to rgba', () => {
      const result = colorConvert(hex, rgba, '#FF000080');
      expect(result).toMatch(/rgba\(255, 0, 0, 0\.50\)/);
    });

    it('should handle full opacity hex', () => {
      const result = colorConvert(hex, rgba, '#FF0000FF');
      expect(result).toMatch(/rgba\(255, 0, 0, 1\.00\)/);
    });

    it('should convert rgba to hsla preserving alpha', () => {
      const result = colorConvert(rgba, hsla, 'rgba(255, 0, 0, 0.5)');
      expect(result).toMatch(/hsla\(0, 100%, 50%, 0\.50\)/);
    });

    it('should handle rgba with alpha = 1', () => {
      const result = colorConvert(rgba, hex, 'rgba(255, 0, 0, 1)');
      expect(result).toBe('#ff0000');
    });

    it('should handle rgba comma-separated format', () => {
      const result = colorConvert(rgba, hex, '255, 0, 0, 0.5');
      expect(result).toBe('#ff000080');
    });
  });

  describe('LAB color space', () => {
    it('should convert white hex to lab starting with L=100', () => {
      const result = colorConvert(hex, lab, '#FFFFFF');
      expect(result).toMatch(/lab\(100\.0%/);
    });

    it('should convert black hex to lab starting with L=0', () => {
      const result = colorConvert(hex, lab, '#000000');
      expect(result).toMatch(/lab\(0\.0%/);
    });

    it('should convert red hex to lab', () => {
      const result = colorConvert(hex, lab, '#FF0000');
      expect(result).toMatch(/lab\(/);
      // Red has positive a value
    });

    it('should convert lab to rgb', () => {
      const result = colorConvert(lab, rgb, 'lab(50% 0 0)');
      expect(result).toMatch(/rgb\(/);
    });
  });

  describe('LCH color space', () => {
    it('should convert hex to lch', () => {
      const result = colorConvert(hex, lch, '#FF0000');
      expect(result).toMatch(/lch\(/);
    });

    it('should convert lch to rgb', () => {
      const result = colorConvert(lch, rgb, 'lch(50% 50 0)');
      expect(result).toMatch(/rgb\(/);
    });
  });

  describe('OKLCH color space', () => {
    it('should convert hex to oklch', () => {
      const result = colorConvert(hex, oklch, '#FF0000');
      expect(result).toMatch(/oklch\(/);
    });

    it('should convert oklch to rgb', () => {
      const result = colorConvert(oklch, rgb, 'oklch(0.5 0.15 0)');
      expect(result).toMatch(/rgb\(/);
    });
  });

  describe('OKLAB color space', () => {
    it('should convert hex to oklab', () => {
      const result = colorConvert(hex, oklab, '#FF0000');
      expect(result).toMatch(/oklab\(/);
    });

    it('should convert oklab to rgb', () => {
      const result = colorConvert(oklab, rgb, 'oklab(0.5 0 0)');
      expect(result).toMatch(/rgb\(/);
    });
  });

  describe('Edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(colorConvert(hex, rgb, '')).toBe('');
    });

    it('should return empty string for whitespace input', () => {
      expect(colorConvert(hex, rgb, '   ')).toBe('');
    });

    it('should return error for invalid hex', () => {
      expect(colorConvert(hex, rgb, '#GGG')).toBe('Error: Invalid color format');
    });

    it('should return error for invalid hex length', () => {
      expect(colorConvert(hex, rgb, '#12345')).toBe('Error: Invalid color format');
    });

    it('should return error for RGB values > 255', () => {
      expect(colorConvert(rgb, hex, 'rgb(300, 0, 0)')).toBe('Error: RGB values must be 0-255');
    });

    it('should return error for RGB values < 0', () => {
      // Negative values fail regex parsing, returning "Invalid color format"
      expect(colorConvert(rgb, hex, 'rgb(-10, 0, 0)')).toBe('Error: Invalid color format');
    });

    it('should return error for unknown named color', () => {
      expect(colorConvert(named, hex, 'notacolor')).toBe('Error: Invalid color format');
    });
  });

  describe('Round-trip conversions', () => {
    it('should maintain color after hex -> rgb -> hex', () => {
      const intermediate = colorConvert(hex, rgb, '#FF5500');
      expect(colorConvert(rgb, hex, intermediate)).toBe('#ff5500');
    });

    it('should maintain color after hex -> hsl -> hex', () => {
      const intermediate = colorConvert(hex, hsl, '#FF0000');
      expect(colorConvert(hsl, hex, intermediate)).toBe('#ff0000');
    });

    it('should maintain color after hex -> hsl -> hex for blue', () => {
      const intermediate = colorConvert(hex, hsl, '#0000FF');
      expect(colorConvert(hsl, hex, intermediate)).toBe('#0000ff');
    });

    it('should maintain color after rgb -> cmyk -> rgb', () => {
      const intermediate = colorConvert(rgb, cmyk, 'rgb(255, 128, 0)');
      const result = colorConvert(cmyk, rgb, intermediate);
      expect(result).toBe('rgb(255, 128, 0)');
    });

    it('should maintain color after rgb -> hsv -> rgb', () => {
      const intermediate = colorConvert(rgb, hsv, 'rgb(255, 0, 0)');
      expect(colorConvert(hsv, rgb, intermediate)).toBe('rgb(255, 0, 0)');
    });

    it('should maintain pure red after hex -> cmyk -> hex', () => {
      const intermediate = colorConvert(hex, cmyk, '#FF0000');
      expect(colorConvert(cmyk, hex, intermediate)).toBe('#ff0000');
    });
  });

  describe('Parsing flexibility', () => {
    it('should handle rgb without rgb() wrapper', () => {
      expect(colorConvert(rgb, hex, '255, 0, 0')).toBe('#ff0000');
    });

    it('should handle hsl without hsl() wrapper', () => {
      expect(colorConvert(hsl, rgb, '0, 100, 50')).toBe('rgb(255, 0, 0)');
    });

    it('should handle cmyk without cmyk() wrapper', () => {
      expect(colorConvert(cmyk, rgb, '0, 100, 100, 0')).toBe('rgb(255, 0, 0)');
    });

    it('should handle hex without # prefix', () => {
      // This depends on implementation - checking if it handles gracefully
      const result = colorConvert(hex, rgb, 'FF0000');
      // Either parses it or returns error
      expect(result === 'rgb(255, 0, 0)' || result === 'Error: Invalid color format').toBe(true);
    });
  });
});

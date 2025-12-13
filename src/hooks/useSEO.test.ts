import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/preact';
import { useSEO } from './useSEO';
import type { Unit } from '../data/types';

// Mock the data module
vi.mock('../data', () => ({
  getCategory: vi.fn(),
}));

import { getCategory } from '../data';

const mockGetCategory = getCategory as ReturnType<typeof vi.fn>;

// Helper to create mock units
function createMockUnit(id: string, name: string, categoryId: string): Unit {
  return {
    id,
    categoryId,
    name,
    abbreviations: [id.substring(0, 2)],
    aliases: [],
    toBase: 1,
  };
}

describe('useSEO', () => {
  let originalTitle: string;
  let mockMetaDescription: HTMLMetaElement | null;
  let mockOgTitle: HTMLMetaElement | null;
  let mockOgDescription: HTMLMetaElement | null;
  let mockOgUrl: HTMLMetaElement | null;
  let mockTwitterTitle: HTMLMetaElement | null;
  let mockTwitterDescription: HTMLMetaElement | null;
  let mockTwitterUrl: HTMLMetaElement | null;
  let mockCanonical: HTMLLinkElement | null;

  beforeEach(() => {
    originalTitle = document.title;
    mockGetCategory.mockReset();

    // Create mock meta elements
    mockMetaDescription = document.createElement('meta');
    mockMetaDescription.setAttribute('name', 'description');
    document.head.appendChild(mockMetaDescription);

    mockOgTitle = document.createElement('meta');
    mockOgTitle.setAttribute('property', 'og:title');
    document.head.appendChild(mockOgTitle);

    mockOgDescription = document.createElement('meta');
    mockOgDescription.setAttribute('property', 'og:description');
    document.head.appendChild(mockOgDescription);

    mockOgUrl = document.createElement('meta');
    mockOgUrl.setAttribute('property', 'og:url');
    document.head.appendChild(mockOgUrl);

    mockTwitterTitle = document.createElement('meta');
    mockTwitterTitle.setAttribute('name', 'twitter:title');
    document.head.appendChild(mockTwitterTitle);

    mockTwitterDescription = document.createElement('meta');
    mockTwitterDescription.setAttribute('name', 'twitter:description');
    document.head.appendChild(mockTwitterDescription);

    mockTwitterUrl = document.createElement('meta');
    mockTwitterUrl.setAttribute('name', 'twitter:url');
    document.head.appendChild(mockTwitterUrl);

    mockCanonical = document.createElement('link');
    mockCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(mockCanonical);
  });

  afterEach(() => {
    document.title = originalTitle;

    // Clean up mock elements
    [mockMetaDescription, mockOgTitle, mockOgDescription, mockOgUrl, mockTwitterTitle, mockTwitterDescription, mockTwitterUrl, mockCanonical].forEach((el) => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  });

  describe('Default state (no units selected)', () => {
    it('should set default title and description', () => {
      renderHook(() =>
        useSEO({
          fromUnit: null,
          toUnit: null,
          fromValue: '',
          result: null,
        })
      );

      expect(document.title).toBe('Unit Converter - Fast, Keyboard-First | 100+ Units');
      expect(mockMetaDescription?.getAttribute('content')).toContain('Free instant unit converter');
    });

    it('should set canonical URL to root', () => {
      renderHook(() =>
        useSEO({
          fromUnit: null,
          toUnit: null,
          fromValue: '',
          result: null,
        })
      );

      expect(mockCanonical?.getAttribute('href')).toBe('https://unitconvert.dev/');
    });
  });

  describe('Only fromUnit selected', () => {
    it('should set title with fromUnit name', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: null,
          fromValue: '',
          result: null,
        })
      );

      expect(document.title).toBe('Convert Meter | Unit Converter');
      expect(mockCanonical?.getAttribute('href')).toBe('https://unitconvert.dev/meter');
    });
  });

  describe('Both units selected (no value)', () => {
    it('should set title with both unit names', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'length');

      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '',
          result: null,
        })
      );

      expect(document.title).toBe('Meter to Kilometer Converter | Unit Converter');
      expect(mockCanonical?.getAttribute('href')).toBe('https://unitconvert.dev/meter/kilometer');
    });

    it('should include category name in description', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'length');

      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '',
          result: null,
        })
      );

      expect(mockMetaDescription?.getAttribute('content')).toContain('length converter');
    });
  });

  describe('Full conversion with value', () => {
    it('should set title with value and result', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'length');

      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '1000',
          result: '1',
        })
      );

      expect(document.title).toBe('1000 Meter to Kilometer = 1 | Unit Converter');
      expect(mockCanonical?.getAttribute('href')).toBe('https://unitconvert.dev/meter/kilometer/1000');
    });

    it('should update description with conversion result', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'length');

      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '1000',
          result: '1',
        })
      );

      const description = mockMetaDescription?.getAttribute('content');
      expect(description).toContain('1000 Meter');
      expect(description).toContain('Kilometer');
      expect(description).toContain('Result: 1');
    });
  });

  describe('Open Graph tags', () => {
    it('should update OG title without site name suffix', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'length');

      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '1000',
          result: '1',
        })
      );

      expect(mockOgTitle?.getAttribute('content')).toBe('1000 Meter to Kilometer = 1');
      expect(mockOgTitle?.getAttribute('content')).not.toContain('Unit Converter');
    });

    it('should update OG URL', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'length');

      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '1000',
          result: '1',
        })
      );

      expect(mockOgUrl?.getAttribute('content')).toBe('https://unitconvert.dev/meter/kilometer/1000');
    });
  });

  describe('Twitter tags', () => {
    it('should update Twitter title', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'length');

      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '',
          result: null,
        })
      );

      expect(mockTwitterTitle?.getAttribute('content')).toBe('Meter to Kilometer Converter');
    });

    it('should update Twitter URL', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'length');

      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '',
          result: null,
        })
      );

      expect(mockTwitterUrl?.getAttribute('content')).toBe('https://unitconvert.dev/meter/kilometer');
    });
  });

  describe('Edge cases', () => {
    it('should handle missing category gracefully', () => {
      const meter = createMockUnit('meter', 'Meter', 'unknown');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'unknown');

      mockGetCategory.mockReturnValue(null);

      renderHook(() =>
        useSEO({
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '',
          result: null,
        })
      );

      // Should use 'Unit' as fallback
      expect(mockMetaDescription?.getAttribute('content')).toContain('unit converter');
    });

    it('should update when dependencies change', () => {
      const meter = createMockUnit('meter', 'Meter', 'length');
      const kilometer = createMockUnit('kilometer', 'Kilometer', 'length');

      mockGetCategory.mockReturnValue({ id: 'length', name: 'Length' });

      const { rerender } = renderHook(({ fromUnit, toUnit, fromValue, result }) => useSEO({ fromUnit, toUnit, fromValue, result }), {
        initialProps: {
          fromUnit: meter,
          toUnit: kilometer,
          fromValue: '',
          result: null as string | null,
        },
      });

      expect(document.title).toBe('Meter to Kilometer Converter | Unit Converter');

      rerender({
        fromUnit: meter,
        toUnit: kilometer,
        fromValue: '1000',
        result: '1',
      });

      expect(document.title).toBe('1000 Meter to Kilometer = 1 | Unit Converter');
    });
  });
});

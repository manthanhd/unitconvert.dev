import { useEffect } from 'preact/hooks';
import type { Unit } from '../data/types';
import { getCategory } from '../data';

interface SEOParams {
  fromUnit: Unit | null;
  toUnit: Unit | null;
  fromValue: string;
  result: string | null;
}

/**
 * Updates document meta tags dynamically based on conversion state.
 * This improves SEO for shared conversion URLs.
 */
export function useSEO({ fromUnit, toUnit, fromValue, result }: SEOParams) {
  useEffect(() => {
    // Build dynamic title and description
    let title: string;
    let description: string;
    let canonicalPath = '/';

    if (fromUnit && toUnit) {
      const fromCategory = getCategory(fromUnit.categoryId);
      const categoryName = fromCategory?.name ?? 'Unit';

      if (fromValue && result) {
        // Full conversion with value
        title = `${fromValue} ${fromUnit.name} to ${toUnit.name} = ${result} | Unit Converter`;
        description = `Convert ${fromValue} ${fromUnit.name} (${fromUnit.abbreviations[0]}) to ${toUnit.name} (${toUnit.abbreviations[0]}). Result: ${result}. Free instant ${categoryName.toLowerCase()} converter with keyboard shortcuts.`;
        canonicalPath = `/${fromUnit.id}/${toUnit.id}/${fromValue}`;
      } else {
        // Units selected but no value
        title = `${fromUnit.name} to ${toUnit.name} Converter | Unit Converter`;
        description = `Convert ${fromUnit.name} (${fromUnit.abbreviations[0]}) to ${toUnit.name} (${toUnit.abbreviations[0]}). Free instant ${categoryName.toLowerCase()} converter for developers with keyboard shortcuts and URL sharing.`;
        canonicalPath = `/${fromUnit.id}/${toUnit.id}`;
      }
    } else if (fromUnit) {
      // Only from unit selected
      title = `Convert ${fromUnit.name} | Unit Converter`;
      description = `Convert ${fromUnit.name} (${fromUnit.abbreviations[0]}) to other units. Free instant unit converter for developers with keyboard shortcuts.`;
      canonicalPath = `/${fromUnit.id}`;
    } else {
      // Default homepage
      title = 'Unit Converter - Fast, Keyboard-First | 100+ Units';
      description = 'Free instant unit converter: length, temperature, colors, data sizes & 100+ units. Keyboard-first with URL sharing. No signup.';
    }

    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph tags
    updateMetaTag('og:title', title.replace(' | Unit Converter', ''));
    updateMetaTag('og:description', description);
    updateMetaTag('og:url', `https://unitconvert.dev${canonicalPath}`);

    // Update Twitter tags
    updateMetaTag('twitter:title', title.replace(' | Unit Converter', ''));
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:url', `https://unitconvert.dev${canonicalPath}`);

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://unitconvert.dev${canonicalPath}`);
    }
  }, [fromUnit, toUnit, fromValue, result]);
}

/**
 * Helper to update or create meta tags
 */
function updateMetaTag(property: string, content: string) {
  // Try property attribute first (for og: tags)
  let tag = document.querySelector(`meta[property="${property}"]`);

  // Try name attribute (for twitter: tags)
  if (!tag) {
    tag = document.querySelector(`meta[name="${property}"]`);
  }

  if (tag) {
    tag.setAttribute('content', content);
  }
}

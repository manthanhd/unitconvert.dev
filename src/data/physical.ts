import type { Category, Unit } from './types';

// ============================================================================
// LENGTH
// ============================================================================

export const lengthCategory: Category = {
  id: 'length',
  name: 'Length',
  conversionType: 'linear',
};

// Base unit: meter (toBase = 1)
export const lengthUnits: Unit[] = [
  {
    id: 'meter',
    categoryId: 'length',
    name: 'Meter',
    abbreviations: ['m'],
    aliases: ['metre', 'meters', 'metres'],
    toBase: 1,
  },
  {
    id: 'kilometer',
    categoryId: 'length',
    name: 'Kilometer',
    abbreviations: ['km'],
    aliases: ['kilometre', 'kilometers', 'kilometres', 'klick', 'klicks'],
    toBase: 1000,
  },
  {
    id: 'centimeter',
    categoryId: 'length',
    name: 'Centimeter',
    abbreviations: ['cm'],
    aliases: ['centimetre', 'centimeters', 'centimetres'],
    toBase: 0.01,
  },
  {
    id: 'millimeter',
    categoryId: 'length',
    name: 'Millimeter',
    abbreviations: ['mm'],
    aliases: ['millimetre', 'millimeters', 'millimetres'],
    toBase: 0.001,
  },
  {
    id: 'micrometer',
    categoryId: 'length',
    name: 'Micrometer',
    abbreviations: ['μm', 'um'],
    aliases: ['micrometre', 'micron', 'microns'],
    toBase: 0.000001,
  },
  {
    id: 'nanometer',
    categoryId: 'length',
    name: 'Nanometer',
    abbreviations: ['nm'],
    aliases: ['nanometre', 'nanometers', 'nanometres'],
    toBase: 0.000000001,
  },
  {
    id: 'mile',
    categoryId: 'length',
    name: 'Mile',
    abbreviations: ['mi'],
    aliases: ['miles'],
    toBase: 1609.344,
  },
  {
    id: 'yard',
    categoryId: 'length',
    name: 'Yard',
    abbreviations: ['yd'],
    aliases: ['yards'],
    toBase: 0.9144,
  },
  {
    id: 'foot',
    categoryId: 'length',
    name: 'Foot',
    abbreviations: ['ft', "'"],
    aliases: ['feet'],
    toBase: 0.3048,
  },
  {
    id: 'inch',
    categoryId: 'length',
    name: 'Inch',
    abbreviations: ['in', '"'],
    aliases: ['inches'],
    toBase: 0.0254,
  },
  {
    id: 'nautical-mile',
    categoryId: 'length',
    name: 'Nautical Mile',
    abbreviations: ['nmi', 'NM'],
    aliases: ['nautical miles'],
    toBase: 1852,
  },
  {
    id: 'fathom',
    categoryId: 'length',
    name: 'Fathom',
    abbreviations: ['ftm'],
    aliases: ['fathoms'],
    toBase: 1.8288,
  },
  {
    id: 'furlong',
    categoryId: 'length',
    name: 'Furlong',
    abbreviations: ['fur'],
    aliases: ['furlongs'],
    toBase: 201.168,
  },
  {
    id: 'light-year',
    categoryId: 'length',
    name: 'Light Year',
    abbreviations: ['ly'],
    aliases: ['light years', 'lightyear', 'lightyears'],
    toBase: 9.4607304725808e15, // IAU definition (exact)
  },
  {
    id: 'astronomical-unit',
    categoryId: 'length',
    name: 'Astronomical Unit',
    abbreviations: ['au', 'AU'],
    aliases: ['astronomical units'],
    toBase: 149597870700, // IAU 2012 definition (exact)
  },
  {
    id: 'parsec',
    categoryId: 'length',
    name: 'Parsec',
    abbreviations: ['pc'],
    aliases: ['parsecs'],
    toBase: 3.0856775814913673e16, // derived from AU
  },
  {
    id: 'angstrom',
    categoryId: 'length',
    name: 'Angstrom',
    abbreviations: ['Å', 'A'],
    aliases: ['angstroms'],
    toBase: 1e-10,
  },
  {
    id: 'thou',
    categoryId: 'length',
    name: 'Thou',
    abbreviations: ['thou', 'mil'],
    aliases: ['mils'],
    toBase: 0.0000254,
  },
  {
    id: 'chain',
    categoryId: 'length',
    name: 'Chain',
    abbreviations: ['ch'],
    aliases: ['chains'],
    toBase: 20.1168,
  },
  {
    id: 'rod',
    categoryId: 'length',
    name: 'Rod',
    abbreviations: ['rd'],
    aliases: ['rods', 'perch', 'pole'],
    toBase: 5.0292,
  },
  {
    id: 'league',
    categoryId: 'length',
    name: 'League',
    abbreviations: ['lea'],
    aliases: ['leagues'],
    toBase: 4828.032,
  },
];

// ============================================================================
// AREA
// ============================================================================

export const areaCategory: Category = {
  id: 'area',
  name: 'Area',
  conversionType: 'linear',
};

// Base unit: square meter
export const areaUnits: Unit[] = [
  {
    id: 'square-meter',
    categoryId: 'area',
    name: 'Square Meter',
    abbreviations: ['m²', 'm2', 'sq m'],
    aliases: ['square meters', 'square metre', 'square metres'],
    toBase: 1,
  },
  {
    id: 'square-kilometer',
    categoryId: 'area',
    name: 'Square Kilometer',
    abbreviations: ['km²', 'km2', 'sq km'],
    aliases: ['square kilometers', 'square kilometre'],
    toBase: 1e6,
  },
  {
    id: 'square-centimeter',
    categoryId: 'area',
    name: 'Square Centimeter',
    abbreviations: ['cm²', 'cm2', 'sq cm'],
    aliases: ['square centimeters', 'square centimetre'],
    toBase: 0.0001,
  },
  {
    id: 'square-millimeter',
    categoryId: 'area',
    name: 'Square Millimeter',
    abbreviations: ['mm²', 'mm2', 'sq mm'],
    aliases: ['square millimeters', 'square millimetre'],
    toBase: 0.000001,
  },
  {
    id: 'hectare',
    categoryId: 'area',
    name: 'Hectare',
    abbreviations: ['ha'],
    aliases: ['hectares'],
    toBase: 10000,
  },
  {
    id: 'are',
    categoryId: 'area',
    name: 'Are',
    abbreviations: ['a'],
    aliases: ['ares'],
    toBase: 100,
  },
  {
    id: 'square-mile',
    categoryId: 'area',
    name: 'Square Mile',
    abbreviations: ['mi²', 'mi2', 'sq mi'],
    aliases: ['square miles'],
    toBase: 2589988.110336, // exact: 1609.344²
  },
  {
    id: 'acre',
    categoryId: 'area',
    name: 'Acre',
    abbreviations: ['ac'],
    aliases: ['acres'],
    toBase: 4046.8564224,
  },
  {
    id: 'square-yard',
    categoryId: 'area',
    name: 'Square Yard',
    abbreviations: ['yd²', 'yd2', 'sq yd'],
    aliases: ['square yards'],
    toBase: 0.83612736,
  },
  {
    id: 'square-foot',
    categoryId: 'area',
    name: 'Square Foot',
    abbreviations: ['ft²', 'ft2', 'sq ft'],
    aliases: ['square feet'],
    toBase: 0.09290304,
  },
  {
    id: 'square-inch',
    categoryId: 'area',
    name: 'Square Inch',
    abbreviations: ['in²', 'in2', 'sq in'],
    aliases: ['square inches'],
    toBase: 0.00064516,
  },
  {
    id: 'section',
    categoryId: 'area',
    name: 'Section',
    abbreviations: ['section'],
    aliases: ['sections', 'square mile section'],
    toBase: 2589988.110336, // exact: 1 sq mi
  },
  {
    id: 'township',
    categoryId: 'area',
    name: 'Township',
    abbreviations: ['township'],
    aliases: ['townships'],
    toBase: 93239571.972096, // exact: 36 sections
  },
];

// ============================================================================
// VOLUME
// ============================================================================

export const volumeCategory: Category = {
  id: 'volume',
  name: 'Volume',
  conversionType: 'linear',
};

// Base unit: cubic meter
export const volumeUnits: Unit[] = [
  {
    id: 'cubic-meter',
    categoryId: 'volume',
    name: 'Cubic Meter',
    abbreviations: ['m³', 'm3', 'cu m'],
    aliases: ['cubic meters', 'cubic metre'],
    toBase: 1,
  },
  {
    id: 'cubic-centimeter',
    categoryId: 'volume',
    name: 'Cubic Centimeter',
    abbreviations: ['cm³', 'cm3', 'cc', 'cu cm'],
    aliases: ['cubic centimeters', 'cubic centimetre'],
    toBase: 0.000001,
  },
  {
    id: 'liter',
    categoryId: 'volume',
    name: 'Liter',
    abbreviations: ['L', 'l'],
    aliases: ['litre', 'liters', 'litres'],
    toBase: 0.001,
  },
  {
    id: 'milliliter',
    categoryId: 'volume',
    name: 'Milliliter',
    abbreviations: ['mL', 'ml'],
    aliases: ['millilitre', 'milliliters', 'millilitres'],
    toBase: 0.000001,
  },
  {
    id: 'gallon-us',
    categoryId: 'volume',
    name: 'Gallon (US)',
    abbreviations: ['gal', 'us gal'],
    aliases: ['gallons', 'us gallon', 'us gallons'],
    toBase: 0.003785411784, // exact: 231 in³
  },
  {
    id: 'gallon-imperial',
    categoryId: 'volume',
    name: 'Gallon (Imperial)',
    abbreviations: ['imp gal', 'uk gal'],
    aliases: ['imperial gallon', 'imperial gallons'],
    toBase: 0.00454609,
  },
  {
    id: 'quart-us',
    categoryId: 'volume',
    name: 'Quart (US)',
    abbreviations: ['qt'],
    aliases: ['quarts', 'us quart'],
    toBase: 0.000946352946, // exact: gal/4
  },
  {
    id: 'pint-us',
    categoryId: 'volume',
    name: 'Pint (US)',
    abbreviations: ['pt'],
    aliases: ['pints', 'us pint'],
    toBase: 0.000473176473, // exact: gal/8
  },
  {
    id: 'cup-us',
    categoryId: 'volume',
    name: 'Cup (US)',
    abbreviations: ['cup', 'c'],
    aliases: ['cups', 'us cup'],
    toBase: 0.0002365882365, // exact: gal/16
  },
  {
    id: 'fluid-ounce-us',
    categoryId: 'volume',
    name: 'Fluid Ounce (US)',
    abbreviations: ['fl oz', 'floz'],
    aliases: ['fluid ounces', 'fl ounce'],
    toBase: 0.0000295735295625, // exact: gal/128
  },
  {
    id: 'tablespoon',
    categoryId: 'volume',
    name: 'Tablespoon',
    abbreviations: ['tbsp', 'Tbsp', 'tbs'],
    aliases: ['tablespoons'],
    toBase: 0.00001478676478125, // exact: fl oz/2
  },
  {
    id: 'teaspoon',
    categoryId: 'volume',
    name: 'Teaspoon',
    abbreviations: ['tsp'],
    aliases: ['teaspoons'],
    toBase: 0.00000492892159375, // exact: fl oz/6
  },
  {
    id: 'cubic-foot',
    categoryId: 'volume',
    name: 'Cubic Foot',
    abbreviations: ['ft³', 'ft3', 'cu ft'],
    aliases: ['cubic feet'],
    toBase: 0.028316846592, // exact: 0.3048³
  },
  {
    id: 'cubic-inch',
    categoryId: 'volume',
    name: 'Cubic Inch',
    abbreviations: ['in³', 'in3', 'cu in'],
    aliases: ['cubic inches'],
    toBase: 0.000016387064, // exact: 0.0254³
  },
  {
    id: 'barrel-oil',
    categoryId: 'volume',
    name: 'Barrel (Oil)',
    abbreviations: ['bbl'],
    aliases: ['barrels', 'oil barrel', 'oil barrels'],
    toBase: 0.158987294928, // exact: 42 US gal
  },
  {
    id: 'cubic-millimeter',
    categoryId: 'volume',
    name: 'Cubic Millimeter',
    abbreviations: ['mm³', 'mm3', 'cu mm'],
    aliases: ['cubic millimeters', 'cubic millimetre'],
    toBase: 1e-9,
  },
  {
    id: 'hectoliter',
    categoryId: 'volume',
    name: 'Hectoliter',
    abbreviations: ['hL', 'hl'],
    aliases: ['hectolitre', 'hectoliters', 'hectolitres'],
    toBase: 0.1,
  },
  {
    id: 'bushel',
    categoryId: 'volume',
    name: 'Bushel',
    abbreviations: ['bu'],
    aliases: ['bushels'],
    toBase: 0.0352391, // US bushel = 35.2391 L
  },
  {
    id: 'peck',
    categoryId: 'volume',
    name: 'Peck',
    abbreviations: ['pk'],
    aliases: ['pecks'],
    toBase: 0.00880977, // 1/4 bushel
  },
  {
    id: 'gill',
    categoryId: 'volume',
    name: 'Gill',
    abbreviations: ['gi'],
    aliases: ['gills'],
    toBase: 0.000118294, // US gill = 118.294 mL
  },
  {
    id: 'drop',
    categoryId: 'volume',
    name: 'Drop',
    abbreviations: ['drop', 'gtt'],
    aliases: ['drops'],
    toBase: 5e-8, // ~0.05 mL
  },
  {
    id: 'microliter',
    categoryId: 'volume',
    name: 'Microliter',
    abbreviations: ['μL', 'uL'],
    aliases: ['microlitre', 'microliters', 'microlitres'],
    toBase: 1e-9,
  },
  {
    id: 'cubic-yard',
    categoryId: 'volume',
    name: 'Cubic Yard',
    abbreviations: ['yd³', 'yd3', 'cu yd'],
    aliases: ['cubic yards'],
    toBase: 0.764554857984, // exact: 0.9144³
  },
  {
    id: 'pint-imperial',
    categoryId: 'volume',
    name: 'Pint (Imperial)',
    abbreviations: ['imp pt', 'uk pt'],
    aliases: ['imperial pint', 'imperial pints'],
    toBase: 0.000568261,
  },
  {
    id: 'fluid-ounce-imperial',
    categoryId: 'volume',
    name: 'Fluid Ounce (Imperial)',
    abbreviations: ['imp fl oz'],
    aliases: ['imperial fluid ounce', 'imperial fluid ounces'],
    toBase: 0.0000284131,
  },
];

// ============================================================================
// MASS
// ============================================================================

export const massCategory: Category = {
  id: 'mass',
  name: 'Mass / Weight',
  conversionType: 'linear',
};

// Base unit: kilogram
export const massUnits: Unit[] = [
  {
    id: 'kilogram',
    categoryId: 'mass',
    name: 'Kilogram',
    abbreviations: ['kg'],
    aliases: ['kilograms', 'kilo', 'kilos'],
    toBase: 1,
  },
  {
    id: 'gram',
    categoryId: 'mass',
    name: 'Gram',
    abbreviations: ['g'],
    aliases: ['grams'],
    toBase: 0.001,
  },
  {
    id: 'milligram',
    categoryId: 'mass',
    name: 'Milligram',
    abbreviations: ['mg'],
    aliases: ['milligrams'],
    toBase: 0.000001,
  },
  {
    id: 'microgram',
    categoryId: 'mass',
    name: 'Microgram',
    abbreviations: ['μg', 'ug', 'mcg'],
    aliases: ['micrograms'],
    toBase: 0.000000001,
  },
  {
    id: 'metric-ton',
    categoryId: 'mass',
    name: 'Metric Ton',
    abbreviations: ['t', 'tonne'],
    aliases: ['metric tons', 'tonnes'],
    toBase: 1000,
  },
  {
    id: 'pound',
    categoryId: 'mass',
    name: 'Pound',
    abbreviations: ['lb', 'lbs'],
    aliases: ['pounds'],
    toBase: 0.45359237, // exact by definition
  },
  {
    id: 'ounce',
    categoryId: 'mass',
    name: 'Ounce',
    abbreviations: ['oz'],
    aliases: ['ounces'],
    toBase: 0.028349523125, // exact: lb/16
  },
  {
    id: 'stone',
    categoryId: 'mass',
    name: 'Stone',
    abbreviations: ['st'],
    aliases: ['stones'],
    toBase: 6.35029318, // exact: 14 lb
  },
  {
    id: 'short-ton',
    categoryId: 'mass',
    name: 'Short Ton (US)',
    abbreviations: ['ton', 'us ton'],
    aliases: ['short tons', 'us tons'],
    toBase: 907.18474, // exact: 2000 lb
  },
  {
    id: 'long-ton',
    categoryId: 'mass',
    name: 'Long Ton (Imperial)',
    abbreviations: ['long ton', 'uk ton'],
    aliases: ['long tons', 'imperial tons'],
    toBase: 1016.0469088, // exact: 2240 lb
  },
  {
    id: 'carat',
    categoryId: 'mass',
    name: 'Carat',
    abbreviations: ['ct'],
    aliases: ['carats'],
    toBase: 0.0002,
  },
  {
    id: 'troy-ounce',
    categoryId: 'mass',
    name: 'Troy Ounce',
    abbreviations: ['oz t', 'troy oz'],
    aliases: ['troy ounces'],
    toBase: 0.0311034768, // exact
  },
  {
    id: 'grain',
    categoryId: 'mass',
    name: 'Grain',
    abbreviations: ['gr'],
    aliases: ['grains'],
    toBase: 0.00006479891, // exact
  },
  {
    id: 'dram',
    categoryId: 'mass',
    name: 'Dram',
    abbreviations: ['dr'],
    aliases: ['drams', 'drachm'],
    toBase: 0.0017718451953125, // exact: lb/256
  },
  {
    id: 'hundredweight-us',
    categoryId: 'mass',
    name: 'Hundredweight (US)',
    abbreviations: ['cwt'],
    aliases: ['short hundredweight', 'cental'],
    toBase: 45.359237, // exact: 100 lb
  },
  {
    id: 'hundredweight-imperial',
    categoryId: 'mass',
    name: 'Hundredweight (Imperial)',
    abbreviations: ['imp cwt'],
    aliases: ['long hundredweight'],
    toBase: 50.80234544, // exact: 112 lb
  },
  {
    id: 'pennyweight',
    categoryId: 'mass',
    name: 'Pennyweight',
    abbreviations: ['dwt'],
    aliases: ['pennyweights'],
    toBase: 0.00155517384, // exact: troy oz/20
  },
  {
    id: 'atomic-mass-unit',
    categoryId: 'mass',
    name: 'Atomic Mass Unit',
    abbreviations: ['amu', 'u', 'Da'],
    aliases: ['dalton', 'daltons', 'unified atomic mass unit'],
    toBase: 1.66053906660e-27, // CODATA 2018
  },
  {
    id: 'slug',
    categoryId: 'mass',
    name: 'Slug',
    abbreviations: ['slug'],
    aliases: ['slugs'],
    toBase: 14.593902937, // exact: lbf·s²/ft
  },
  {
    id: 'troy-pound',
    categoryId: 'mass',
    name: 'Troy Pound',
    abbreviations: ['lb t'],
    aliases: ['troy pounds'],
    toBase: 0.3732417216, // exact: 12 troy oz
  },
];

// Export all
export const physicalCategories = [lengthCategory, areaCategory, volumeCategory, massCategory];
export const physicalUnits = [...lengthUnits, ...areaUnits, ...volumeUnits, ...massUnits];

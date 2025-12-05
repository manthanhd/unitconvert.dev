import type { Category, Unit } from './types';

// ============================================================================
// DURATION
// ============================================================================

export const durationCategory: Category = {
  id: 'duration',
  name: 'Time Duration',
  conversionType: 'linear',
};

// Base unit: second
export const durationUnits: Unit[] = [
  {
    id: 'second',
    categoryId: 'duration',
    name: 'Second',
    abbreviations: ['s', 'sec'],
    aliases: ['seconds'],
    toBase: 1,
  },
  {
    id: 'millisecond',
    categoryId: 'duration',
    name: 'Millisecond',
    abbreviations: ['ms'],
    aliases: ['milliseconds'],
    toBase: 0.001,
  },
  {
    id: 'microsecond',
    categoryId: 'duration',
    name: 'Microsecond',
    abbreviations: ['μs', 'us'],
    aliases: ['microseconds'],
    toBase: 0.000001,
  },
  {
    id: 'nanosecond',
    categoryId: 'duration',
    name: 'Nanosecond',
    abbreviations: ['ns'],
    aliases: ['nanoseconds'],
    toBase: 0.000000001,
  },
  {
    id: 'minute',
    categoryId: 'duration',
    name: 'Minute',
    abbreviations: ['min'],
    aliases: ['minutes'],
    toBase: 60,
  },
  {
    id: 'hour',
    categoryId: 'duration',
    name: 'Hour',
    abbreviations: ['h', 'hr'],
    aliases: ['hours'],
    toBase: 3600,
  },
  {
    id: 'day',
    categoryId: 'duration',
    name: 'Day',
    abbreviations: ['d'],
    aliases: ['days'],
    toBase: 86400,
  },
  {
    id: 'week',
    categoryId: 'duration',
    name: 'Week',
    abbreviations: ['wk'],
    aliases: ['weeks'],
    toBase: 604800,
  },
  {
    id: 'fortnight',
    categoryId: 'duration',
    name: 'Fortnight',
    abbreviations: ['fortnight'],
    aliases: ['fortnights'],
    toBase: 1209600,
  },
  {
    id: 'month',
    categoryId: 'duration',
    name: 'Month',
    abbreviations: ['mo'],
    aliases: ['months'],
    toBase: 2629746, // average month (30.44 days)
  },
  {
    id: 'year',
    categoryId: 'duration',
    name: 'Year',
    abbreviations: ['y', 'yr'],
    aliases: ['years'],
    toBase: 31556952, // average year (365.25 days)
  },
  {
    id: 'decade',
    categoryId: 'duration',
    name: 'Decade',
    abbreviations: ['decade'],
    aliases: ['decades'],
    toBase: 315569520,
  },
  {
    id: 'century',
    categoryId: 'duration',
    name: 'Century',
    abbreviations: ['century'],
    aliases: ['centuries'],
    toBase: 3155695200,
  },
  {
    id: 'millennium',
    categoryId: 'duration',
    name: 'Millennium',
    abbreviations: ['millennium'],
    aliases: ['millennia', 'millenniums'],
    toBase: 31556952000,
  },
];

// Export all
export const timeCategories = [durationCategory];
export const timeUnits = [...durationUnits];

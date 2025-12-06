import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#app',
        additionalPrerenderRoutes: [
          '/',
          // Category Landing Pages
          '/length',
          '/temperature',
          '/mass',
          '/volume',
          '/area',
          '/speed',
          '/data-storage',
          '/data-transfer',
          '/color',
          '/number-base',
          '/typography',
          '/pressure',
          '/energy',
          '/power',
          '/force',
          '/frequency',
          '/angle',
          '/duration',
          // Length Conversions
          '/meter/foot',
          '/kilometer/mile',
          '/inch/centimeter',
          '/foot/meter',
          '/mile/kilometer',
          '/centimeter/inch',
          '/yard/meter',
          '/millimeter/inch',
          // Temperature Conversions
          '/celsius/fahrenheit',
          '/fahrenheit/celsius',
          '/kelvin/celsius',
          '/celsius/kelvin',
          '/fahrenheit/kelvin',
          // Mass/Weight Conversions
          '/kilogram/pound',
          '/pound/kilogram',
          '/ounce/gram',
          '/gram/ounce',
          '/stone/kilogram',
          // Volume Conversions
          '/liter/gallon-us',
          '/gallon-us/liter',
          '/milliliter/fluid-ounce-us',
          '/cup-us/milliliter',
          // Data Storage Conversions
          '/kilobyte/megabyte',
          '/megabyte/gigabyte',
          '/gigabyte/terabyte',
          '/byte/kilobyte',
          '/mebibyte/megabyte',
          '/gibibyte/gigabyte',
          // Color Conversions
          '/hex/rgb',
          '/rgb/hex',
          '/hex/hsl',
          '/rgb/hsl',
          '/hsl/rgb',
          // Number Base Conversions
          '/decimal/binary',
          '/binary/decimal',
          '/decimal/hexadecimal',
          '/hexadecimal/decimal',
          '/binary/hexadecimal',
          '/hexadecimal/binary',
          '/decimal/octal',
          // Typography/CSS Conversions
          '/pixel/rem',
          '/rem/pixel',
          '/pixel/em',
          '/point/pixel',
          // Area Conversions
          '/square-meter/square-foot',
          '/acre/hectare',
          '/hectare/acre',
          '/square-foot/square-meter',
          // Speed Conversions
          '/kilometer-per-hour/mile-per-hour',
          '/mile-per-hour/kilometer-per-hour',
          '/meter-per-second/kilometer-per-hour',
          // Energy Conversions
          '/kilocalorie/joule',
          '/kilowatt-hour/joule',
          // Pressure Conversions
          '/psi/bar',
          '/bar/psi',
          '/atmosphere/pascal',
          // Data Transfer Conversions
          '/megabit-per-second/megabyte-per-second',
          '/gigabit-per-second/megabyte-per-second',
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});

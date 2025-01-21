import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: 'styled-system',

  theme: {
    extend: {
      tokens: {
        colors: {
          boxTitleColor: { value: '#636363' },
          boxTitleColorHover: { value: '#3d3d3d' },
        },
        spacing: {
          basePx: { value: '15px' },
          basePy: { value: '10px' },
        },
      },
      semanticTokens: {
        colors: {
          boxBg: { value: '{colors.gray.200}' },
          boxBgHover: { value: '{colors.gray.300}' },
        },
      },
    },
  },
});

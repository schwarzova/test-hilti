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
          neutral: {
            light: {value: '#F5F5F5'}, // Light Gray
            main: {value: '#9E9E9E'},  // Gray
            dark: {value: '#424242'},  // Dark Gray
          },
          text: {
            primary:{value: '#212121'}, // Almost Black
            secondary: {value: '#636363',}, // Gray Text
            disabled: {value:'#BDBDBD'}, // Disabled Text
          },
          background: {
            light: {value: '#FFFFFF'}, // White for Light Theme
            dark:{value:  '#121212'},  // Black for Dark Theme
          },
          viewer: {
            tag: {value: '#B71C1C'}, 
            anchor: {value: '#A46BFA'}, 
          }
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

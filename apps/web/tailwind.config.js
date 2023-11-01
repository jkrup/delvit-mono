const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "ui-sans-serif", "system-ui"],
      serif: ["PT Serif", "ui-serif"],
      typo: ['Merriweather']
    },
    extend: {
      colors: {
        gold: '#AD8C3B',
        lightgrey: '#FBFBFB',
        darkgrey: '#8A836E',
        greyish: '#D9D9D9',
        lightgreyish: '#48463E66',
        lightgold: 'rgba(173, 140, 59, 0.10)',
        thingold: 'rgba(173, 140, 59, 0.03)',
        lite: '#F7F4EB',
        lightgreen: 'rgba(59, 173, 91, 0.24)',
        greenish: '#009B2B',
        brightgreen: '#00D03A',
        brownish: '#2E2D28',
        darkblue: '#09090b'
      },
      borderWidth: {
        0.5: '0.5px',
      },
      zIndex: {
        '1k': '1000',
      },
      spacing: {
        '1/20': '5%',
        '1/10': '10%',
        '3/15': '35%',
        '4/10': '40%',
        '4/15': '45%',
        '9/10': '90%',
        '150': '150%',
        '200': '200%',
        '500': '500%'
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

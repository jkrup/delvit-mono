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
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

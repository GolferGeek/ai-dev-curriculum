/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f1117',
          card: '#1a1c25',
          hover: '#22252f',
        },
        accent: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

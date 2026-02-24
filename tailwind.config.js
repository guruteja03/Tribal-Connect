/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tribal: {
          50: '#f9f4eb',
          100: '#f1e5cf',
          200: '#e2cca1',
          300: '#d2b274',
          400: '#c3974f',
          500: '#a9783a',
          600: '#855d2f',
          700: '#634524',
          800: '#422d18',
          900: '#23160d',
        },
      },
      boxShadow: {
        card: '0 10px 30px rgba(35, 22, 13, 0.12)',
      },
    },
  },
  plugins: [],
};

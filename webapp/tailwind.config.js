/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#000000',
          neutral: '#CCCCCC',
          light: '#FAFAFA',
        },
        secondary: {
          blueGreen: '#004B6E',
          darkPurple: '#120E44',
          purple: '#8948DC',
          green: '#00BA92',
          blue: '#1BC5DC',
          neutral: '#C0D1D9',
        },
        buttons: {
          active: '#000000',
          hover: '#061D28',
          disabled: '#D1D5DB',
        },
        utility: {
          warning: {
            main: '#FF3A38',
          },
          pending: {
            main: '#FF9237',
          },
          success: {
            main: '#139C08',
          },
        },
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-45deg)' },
          '50%': { transform: 'rotate(45deg)' },
        },
      },
    },
  },
  plugins: [],
};

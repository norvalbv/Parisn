/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xxs: ['10px', '12px'],
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          dark: '#020202',
          neutral: '#B0B0B0',
          light: '#FAFAFA',
        },
        secondary: {
          blueGreen: '#004B6E',
          darkPurple: '#120E44',
          purple: '#9E00FF',
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
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('daisyui')],
};

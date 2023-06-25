/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xs: [
          '0.75rem', // 12px
          {
            lineHeight: '0.875rem', // 14px
            letterSpacing: '0.08rem',
            fontWeight: 400,
          },
        ],
        xxs: ['10px', '12px'],
      },
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
          dark: '#0D0E0D',
          blueGreen: '#004B6E',
          darkPurple: '#120E44',
          purple: '#9E00FF',
          green: '#00BA92',
          blue: '#1BC5DC',
          neutral: '#C0D1D9',
          red: '#FF0000',
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
  plugins: [require('tailwind-scrollbar')],
};

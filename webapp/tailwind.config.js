const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        "sans-alt": ["var(--font-montserrat-alt1)", "sans-serif"],
        sans: ['Poppins', 'sans-serif'],
      },
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
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-45deg)' },
          '50%': { transform: 'rotate(45deg)' },
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

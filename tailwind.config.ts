import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
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
        background: '#0D0D0E',
        'text-primary': '#FAFAFA',
        'text-secondary': '#8A91A3',
        // Copied from Figma colour palette generator
        action: '#1A7CB2',
        'action-secondary': '#B21A7C',
        'action-tertiary': '#7CB21A',
        // secondary: {
        //   dark: '#0D0E0D',
        //   blueGreen: '#004B6E',
        //   darkPurple: '#120E44',
        //   purple: '#9E00FF',
        //   green: '#00BA92',
        //   blue: '#1BC5DC',
        //   neutral: '#C0D1D9',
        //   red: '#FF0000',
        // },
        // utility: {
        //   warning: {
        //     main: '#FF3A38',
        //   },
        //   pending: {
        //     main: '#FF9237',
        //   },
        //   success: {
        //     main: '#139C08',
        //   },
        // },
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
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: PluginAPI): void {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars as { [key: string]: string },
  });
}

export default config;

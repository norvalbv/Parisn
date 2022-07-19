/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1AAAE1",
        primaryVariants: {
          100: "#E1F5FF",
          200: "#B3ECFF",
          300: "#81DEFF",
          400: "#5ED0FF",
          500: "#00B8FF",
          600: "#00A6FF",
          700: "#0097FF",
          800: "#0085FF",
          900: "#006EFF",
        },
        secondary: "#120E44",
        secondaryVariants: {
          100: "#F0F0F0",
          200: "#D9D9D9",
          300: "#C0C0C0",
          400: "#AFAFAF",
          500: "#9E9E9E",
          600: "#8C8C8C",
          700: "#7A7A7A",
          800: "#686868",
          900: "#585858",
        },
        neutral: "#DBDBDB",
        neutralVariants: {},
        utility: {
          warning: {
            main: "#E50707",
          },
          neutral: {},
          success: {},
        },
      },
    },
  },
  plugins: [],
};

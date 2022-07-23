/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#000000",
          light: "#FAFAFA",
        },
        secondary: {
          blueGreen: "#004B6E",
          darkPurple: "#120E44",
          purple: "#8948DC",
          green: "#00BA92",
          blue: "#1BC5DC",
          neutral: "#004B6E",
        },
        buttons: {
          active: "#000000",
          hover: "#061D28",
          disabled: "#D1D5DB",
        },
        utility: {
          warning: {
            main: "#FF3A38",
          },
          pending: {
            main: "#FF9237",
          },
          success: {
            main: "#139C08",
          },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#DEF5E5",
        primary: "#BCEAD5",
        secondary: "#9ED5C5",
        textcol: "#8EC3B0",
        bgDarkColor: "#2C3333",
        darkPrimary: "#395B64",
        darkSecondary: "#A5C9CA",
        textDarkCol: "#E7F6F2",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode based on class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Paths to your content files
  theme: {
    extend: {
      colors: {
        black: "#191624", // Dark background color
        primary: "#FAFAFA", // Light text color
        secColor: "#efefef", // Secondary text color
        navColor: "#BEBEBE", // Navbar color
      },
      backgroundColor: {
        mainColor: "#fefefe", // Light mode background color
        secondaryColor: "#F0F0F0", // Secondary background color
        blackOverlay: "rgba(0, 0 ,0 ,0.3)", // Overlay effect
        black: "#191624", // Dark mode background color
      },
      boxShadow: {
        glow: "0 0 18px rgb(255, 0, 0, 0.7);", // Glow effect
        glowLight: "0 0 24px rgb(255, 0, 0, 0.5)", // Light glow effect
      },
    },
    fontFamily: {
      nunito: ["Nunito", "sans-serif"], // Font family for the app
      roboto: ["Roboto", "sans-serif"], // Font family for the app
      robotoCondensed: ["Roboto Condensed", "sans-serif"], // Font family for the app
    },
  },
  plugins: [],
};

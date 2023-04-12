module.exports = {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  fontFamily: {
   primary: "Saira",
  },
  container: {
   padding: {
    DEFAULT: "1.5rem",
    sm: "2rem",
    lg: "4rem",
    xl: "5rem",
    "2xl": "6rem",
   },
  },
  screens: {
   xs: "240px",
   sm: "640px",
   md: "768px",
   lg: "1024px",
   xl: "1280px",
  },
  extend: {
   colors: {
    contessa: {
     50: "#fbf6f5",
     100: "#f6ecea",
     200: "#f0dcd8",
     300: "#e4c3bd",
     400: "#d3a096",
     500: "#ba7264",
     600: "#aa6558",
     700: "#8e5347",
     800: "#77463d",
     900: "#643f38",
    },
    "waikawa-gray": {
     50: "#f5f6fa",
     100: "#eaebf4",
     200: "#d0d4e7",
     300: "#a6b0d3",
     400: "#7686ba",
     500: "#6374ae",
     600: "#414f88",
     700: "#36406e",
     800: "#30395c",
     900: "#2c324e",
    },
   },
   dropShadow: {
    primary: "0px 4px 10px rgba(15, 27, 51, 0.05);",
   },
   shadow: {
    primary: "1px 7px 8px -1px #1B2821",
   },
  },
 },
 plugins: [],
};

/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      serif: "Playfair Display, serif",
      body: "Poppins, sans-serif"
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      black: colors.black,
      gray: colors.slate,
      primary: {
        300: "#6680db",
        500: "#4c67c7",
        900: "#243778"
      },
      danger: {
        500: "#ff5555"
      }
    },
    extend: {
      fontSize: {
        h1: ["2rem"],
        h2: ["1.5rem"],
        large: ["4rem"],
        md: ["1rem"]
      },
      backgroundPosition: {
        "bottom-road": "center 66%"
      },
      backgroundImage: {
        "banner-image": "url('../src/assets/img/pink-hair.jpg')",
        road: "url('../src/assets/img/road.png')"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class" // only generate classes
    }),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        h1: {
          fontSize: theme("fontSize.h1"),
          fontFamily: theme("fontFamily.serif"),
          fontWeight: 800
        },
        h2: {
          fontSize: theme("fontSize.h2"),
          fontFamily: theme("fontFamily.serif"),
          fontWeight: 800
        }
      });
      addComponents({});
      addUtilities({});
    })
  ]
};

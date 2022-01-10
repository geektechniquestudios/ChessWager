const { stone } = require("tailwindcss/colors")
const colors = require("tailwindcss/colors")

module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    colors: {
      primary: {
        DEFAULT: "#fafaf9",
        dark: "#1c1917",
      },
      secondary: {
        DEFAULT: "#57534E",
        dark: "#A8A29E",
      },
      tertiary: {
        DEFAULT: "#2dd4bf",
        dark: "#134e4a",
      },
      positive: {
        DEFAULT: "#16A34A",
        dark: "#4ADE80",
      },
      negative: {
        DEFAULT: "#DC2626",
        dark: "#F87171",
      },
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      stone: colors.warmGray,
      rose: colors.rose,
      amber: colors.amber,
      green: colors.green,
      teal: colors.teal,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}

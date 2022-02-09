const { stone } = require("tailwindcss/colors")
const colors = require("tailwindcss/colors")

module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    colors: {
      primary: {
        DEFAULT: "#e4e4e7",
        dark: "#18181b",
      },
      secondary: {
        DEFAULT: "#d6d3d1",
        dark: "#57534e",
      },
      positive: {
        DEFAULT: "#4ADE80",
      },
      negative: {
        DEFAULT: "#DC2626",
      },
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      stone: colors.warmGray,
      rose: colors.rose,
      amber: colors.amber,
      green: colors.green,
      teal: colors.teal,
      emerald: colors.emerald,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}

const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
      stone: colors.stone,
      rose: colors.rose,
      amber: colors.amber,
      green: colors.green,
      teal: colors.teal,
      emerald: colors.emerald,
      red: colors.red,
      yellow: colors.yellow,
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}

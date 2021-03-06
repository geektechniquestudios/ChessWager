const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: colors.transparent,
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
      organge: colors.orange,
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}

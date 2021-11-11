const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      gradientColorStops: ["dark"],
      colors: {
        primary: {
          DEFAULT: colors.warmGray,
          primaryDark: colors.warmGray,
        },
        secondary: {
          DEFAULT: colors.warmGray,
          secondaryDark: colors.warmGray,
        },
        tertiary: {
          DEFAULT: colors.amber,
          tertiaryDark: colors.amber,
        },
        positive: {
          DEFAULT: colors.green,
          positiveDark: colors.green,
        },
        negative: {
          DEFAULT: colors.rose,
          negativeDark: colors.rose,
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

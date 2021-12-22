const colors = require("tailwindcss/colors")

module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    colors: {
      primary: {
        DEFAULT: '#F5F5F4',
        primaryDark: '#292524',
      },
      secondary: {
        DEFAULT: '#57534E',
        secondaryDark: '#A8A29E',
      },
      tertiary: {
        DEFAULT: '#D97706',
        tertiaryDark: '#FBBF24',
      },
      positive: {
        DEFAULT: '#16A34A',
        positiveDark: '#4ADE80',
      },
      negative: {
        DEFAULT: '#DC2626',
        negativeDark: '#F87171',
      },
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      warmGray: colors.warmGray,
      rose: colors.rose,
      amber: colors.amber,
      green: colors.green,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

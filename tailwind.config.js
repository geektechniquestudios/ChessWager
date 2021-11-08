module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {gradientColorStops: ['dark'],},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

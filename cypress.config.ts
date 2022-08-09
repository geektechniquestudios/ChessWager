import { defineConfig } from "cypress"

export default defineConfig({
  env: {
    "cypress-react-selector": {
      root: "#root",
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.ts")(on, config)
    },
    specPattern: "cypress/e2e/**/*.spec.tsx",
    baseUrl: "http://localhost:5173/",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*.spec.tsx",
  },
})

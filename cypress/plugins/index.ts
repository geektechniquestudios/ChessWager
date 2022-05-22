/// <reference types="cypress" />

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
import path from "path"
import { startDevServer } from "@cypress/vite-dev-server"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
import admin from "firebase-admin"
import { plugin as cypressFirebasePlugin } from "cypress-firebase"

module.exports = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("dev-server:start", (options) => {
    return startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, "..", "..", "vite.config.ts"),
      },
    })
  })

  config.env = process.env
  config.env.TEST_UID = process.env.CYPRESS_TEST_UID

  return cypressFirebasePlugin(on, config, admin)
}

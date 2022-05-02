import { mount } from "@cypress/react"
import { App } from "./App"
import { AppWithProviders } from "./AppWithProviders"

it("renders learn react link", () => {
  mount(<AppWithProviders />)
})

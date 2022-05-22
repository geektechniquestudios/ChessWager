import { mount } from "@cypress/react"
import { AppWithProviders } from "./AppWithProviders"

it("renders learn react link", () => {
  mount(<AppWithProviders />)
})

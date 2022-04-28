beforeEach(() => {
  cy.visit("http://localhost:3000/#")
})

describe("login flow", () => {
  it("should authenticate the user if they click login from header", () => {})
  it("should authenticate the user if they click login from dropdown", () => {})
  it("should make the header menus appear if the user is logged in", () => {})
})

describe("logout flow", () => {
  it("should log the user out if they click logout from header", () => {})
  it("should log the user out if they click logout from dropdown", () => {})
  it("should make the header menus disappear if the user is logged out", () => {})
})

beforeEach(() => {
  cy.visit("http://localhost:3000/#")
})

describe("place bet button", () => {
  it("should alert the user if they are not logged in", () => {
    cy.get('button[id="submit-bet"]').click()
    cy.on("window:alert", (text) => {
      expect(text).to.contains("You must be logged in to bet")
    })
  })
  it("should alert the user if their wallet is not connected", () => {})
  it("should make the border around the bet amount area red if user hasn't selected an amount", () => {})
})



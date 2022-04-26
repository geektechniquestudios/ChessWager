describe("place bet behavior", () => {
  it("should alert the user if they are not logged in", () => {
    cy.visit("http://localhost:3000/#")
    cy.get('button[id="submit-bet"]').click()
    cy.on("window:alert", (text) => {
      expect(text).to.contains("You must be logged in to bet")
    })
  })
})

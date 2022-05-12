beforeEach(() => {
  cy.visit("/")
})

describe("place bet button", () => {
  it("should alert the user if they are not logged in", () => {
    cy.get('button[id="submit-bet"]').click()
    cy.on("window:alert", (text) => {
      expect(text).to.contains("You must be logged in to bet")
    })
  })
  it("should make the border around the bet amount area red if user hasn't selected an amount", () => {
    cy.login()
    cy.get('div[id="bet-amount"]').should(
      "not.have.css",
      "border-color",
      "rgb(220, 38, 38)",
    )
    cy.get('button[id="submit-bet"]').click()
    cy.get('div[id="bet-amount"]').should(
      "have.css",
      "border-color",
      "rgb(220, 38, 38)",
    )
    cy.logout()
  })

  // it("should prompt a logged in user to connect their wallet if it isn't already connected", () => {
  //   // need synpress and xvfb to run this test. Can't work in headless mode
  // })

  // it("should allow a logged in user to place a bet if their wallet is connected", () => {
  //   // need synpress and xvfb to run this test. Can't work in headless mode
  //   cy.login()
  //   cy.get('p').contains("$20").click()
  //   cy.get('button[id="submit-bet"]').click()
  //   // get bet body, look for new bet
  // })
})

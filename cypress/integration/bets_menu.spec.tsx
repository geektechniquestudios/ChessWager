describe("Bets Menu", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.login()
    cy.get('button[title="Bets"]').click()
  })

  it("should open to a specific bet if a bet item is clicked", () => {
    cy.get('div[id="bets"]').should("exist")
    cy.get('div[id="bet"]').should("not.exist")
    cy.get('div[id="bets-list"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('div[id="bet"]').should("exist")
  })
  it("should open to persona if user tile is clicked", () => {
    cy.get('div[id="bets-list"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('div[id="clickedUser"]').should("not.exist")
    cy.get('button[id="user-bet-data-button"]').first().click()
    cy.get('div[id="clickedUser"]').should("exist")
  })
  // it("should mark a bet as read if it is clicked", () => {
  //   cy.get('div[id="bets-list"]').within(() => {
  //     // cy.get("a").first().should()
  //     // write bet data to firebase "unread"
  //     // check that it is unread
  //     // click button
  //     // reopen menu
  //     // check that it is read
  //   })
  // })
})

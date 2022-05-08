describe("Bets Menu", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.login()
    cy.get('button[title="Bets"]').click()
  })

  it("should open to a specific bet if a bet item is clicked", () => {
    
  })
  it("should open to persona if user tile is clicked", () => {})
  it("should show data about the bet including the outcome", () => {})
  it("should mark a bet as read if it is clicked", () => {})
})

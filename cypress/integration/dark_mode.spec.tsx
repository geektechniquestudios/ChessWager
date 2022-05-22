describe("dark mode toggle", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("should toggle light and dark mode", () => {
    cy.get('div[id="app"]').should("have.class", "dark")
    cy.get('button[id="main-header-button"]').click()
    cy.get('div[id="dark-mode"]').click()
    cy.get('div[id="app"]').should("not.have.class", "dark")
    cy.get('div[id="dark-mode"]').click()
    cy.get('div[id="app"]').should("have.class", "dark")
  })
})

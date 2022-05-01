describe("dark mode toggle", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#")
  })
  it("should toggle light and dark mode", () => {
    cy.get('button[id="main-header-button"]').click()
    cy.get('div[id="dark-mode"]').click()
  })
})

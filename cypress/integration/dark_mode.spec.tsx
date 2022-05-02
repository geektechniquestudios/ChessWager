describe("dark mode toggle", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#")
  })
  it("should toggle light and dark mode", () => {
    cy.get('div[id="app"]').should("have.class", "dark")
    cy.get('button[id="main-header-button"]').click()
    cy.get('div[id="dark-mode"]').click()
    cy.get('div[id="app"]').should("not.have.class", "dark")
    cy.get('div[id="dark-mode"]').click()
    cy.get('div[id="app"]').should("have.class", "dark")
    // cy.getReact("App")
    //   .getCurrentState()
    //   .then((res) => res.darkMode)
    //   .should("be.true")
  })
})

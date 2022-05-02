describe("dropdown", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("should open the dropdown menu if header button is clicked", () => {
    cy.get('div[id="dropdown-menu"]').should("not.exist")
    cy.get('button[id="main-header-button"]').click()
    cy.get('div[id="dropdown-menu"]').should("exist")
  })
  it("should reopen the dropdown menu if header button is clicked again", () => {
    cy.get('button[id="main-header-button"]').click()
    cy.get('div[id="dropdown-menu"]').should("exist")
    cy.get('button[id="main-header-button"]').click()
    cy.get('div[id="dropdown-menu"]').should("exist")
  })
  it("should close the dropdown menu if clicked outside of", () => {
    cy.get('button[id="main-header-button"]').click()
    cy.get('div[id="dropdown-menu"]').should("exist")
    cy.get('div[id="main-header"]').click()
    cy.get('div[id="dropdown-menu"]').should("not.exist")
  })
  it("should open to each respective top level menu once the user is logged in", () => {})
})

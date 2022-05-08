beforeEach(() => {
  cy.visit("/")
  cy.login()
})

after(cy.logout)

describe("main dropdown button", () => {
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
})

describe("persona dropdown button", () => {
  it("should open persona menu", () => {
    cy.get('div[id="persona"]').should("not.exist")
    cy.get('button[title="Persona"]').click()
    cy.get('div[id="persona"]').should("exist")
  })
})

describe("bets dropdown button", () => {
  it("should open bets menu", () => {
    cy.get('div[id="bets"]').should("not.exist")
    cy.get('button[title="Bets"]').click()
    cy.get('div[id="bets"]').should("exist")
  })
})

describe("messages dropdown button", () => {
  it("should open messages menu", () => {
    cy.get('div[id="messages"]').should("not.exist")
    cy.get('button[title="Messages"]').click()
    cy.get('div[id="messages"]').should("exist")
  })
})

describe("notifications dropdown button", () => {
  it("should open notifications menu", () => {
    cy.get('div[id="notifications"]').should("not.exist")
    cy.get('button[title="Notifications"]').click()
    cy.get('div[id="notifications"]').should("exist")
  })
})

describe("search dropdown button", () => {
  it("should open search menu", () => {
    cy.get('div[id="searchUsers"]').should("not.exist")
    cy.get('button[title="Search Users"]').click()
    cy.get('div[id="searchUsers"]').should("exist")
  })
})

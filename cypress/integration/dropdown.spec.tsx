beforeEach(() => {
  cy.visit("/")
})

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

describe("social dropdown button", () => {
  it("should open social menu", () => {})
})

describe("help button", () => {
  it("should open help menu", () => {})
})

describe("persona dropdown button", () => {
  it("should open persona menu", () => {})
})

describe("bets dropdown button", () => {
  it("should open bets menu", () => {})
})

describe("messages dropdown button", () => {
  it("should open messages menu", () => {})
})

describe("notifications dropdown button", () => {
  it("should open notifications menu", () => {})
})

describe("search dropdown button", () => {
  it("should open search menu", () => {})
})

import { before } from "mocha"

describe("user search", () => {
  before(cy.login)
  beforeEach(() => {
    cy.visit("/")
  })
  after(cy.logout)
  it("should allow the user to type in the search menu", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]')
      .type("lo")
      .should("have.value", "lo")
  })

  it("should show users when searched", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]')
      .type("ter")
      .should("have.value", "ter")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().should("exist")
    })
  })
  it("should open to clicked user menu if list item is clicked", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]')
      .type("ter")
      .should("have.value", "ter")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('div[id="clickedUser"]').should("exist")
  })
  it("should list friend if 'friends only' is selected", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get("p").contains("Friends Only").click()
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").should("exist")
    })
  })
  it("should not show self in search results", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("geek technique")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").should("not.exist")
    })
  })
})

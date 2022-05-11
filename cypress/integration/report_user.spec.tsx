describe("reporting users", () => {
  before(cy.login)
  beforeEach(() => {
    cy.visit("/")
  })
  after(cy.logout)

  it("should allow the user to type in the report field", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("ter")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Report User"]').click()
    cy.get('textArea[id="report-form"]')
      .type("Lorem ipsum dolor sit amet")
      .should("have.value", "Lorem ipsum dolor sit amet")
  })

  it("should alert user that their report was sent", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]')
      .type("ter")
      .should("have.value", "ter")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Report User"]').click()
    cy.get('textArea[id="report-form"]').type("Lorem ipsum dolor sit amet")
    cy.get('button[title="Press Enter to Send"]').click()
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Your report has been sent")
    })
  })
  it("should clear the text field after submitting a report", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]')
      .type("ter")
      .should("have.value", "ter")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Report User"]').click()
    cy.get('textArea[id="report-form"]').type("Lorem ipsum dolor sit amet")
    cy.get('button[title="Press Enter to Send"]').click()
    cy.get('textArea[id="report-form"]').should("have.value", "")
  })
})

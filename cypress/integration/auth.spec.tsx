beforeEach(() => {
  cy.visit("/")
})

describe("login/logout flow", () => {
  it("should make the header menu buttons appear if the user is logged in", () => {
    cy.get('button[title="Persona"]').should("not.exist")
    cy.get('button[title="Bets"]').should("not.exist")
    cy.get('button[title="Messages"]').should("not.exist")
    cy.get('button[title="Notifications"]').should("not.exist")
    cy.get('button[title="Search Users"]').should("not.exist")
    cy.login()
    cy.get('button[title="Persona"]').should("exist")
    cy.get('button[title="Bets"]').should("exist")
    cy.get('button[title="Messages"]').should("exist")
    cy.get('button[title="Notifications"]').should("exist")
    cy.get('button[title="Search Users"]').should("exist")
    cy.logout()
    cy.get('button[title="Persona"]').should("not.exist")
    cy.get('button[title="Bets"]').should("not.exist")
    cy.get('button[title="Messages"]').should("not.exist")
    cy.get('button[title="Notifications"]').should("not.exist")
    cy.get('button[title="Search Users"]').should("not.exist")
  })

  it("should make chat form message update", () => {
    cy.get('textArea[id="chat-form"]').should(
      "have.attr",
      "placeholder",
      "Sign in to Chat",
    )
    cy.login()
    cy.get('textArea[id="chat-form"]').should(
      "have.attr",
      "placeholder",
      "Send a Message",
    )
    cy.logout()
    cy.get('textArea[id="chat-form"]').should(
      "have.attr",
      "placeholder",
      "Sign in to Chat",
    )
  })

  it("should make the 'sign in with google' header button appear/dissapear", () => {
    cy.get('button[id="header-sign-in-button"]').should("exist")
    cy.login()
    cy.get('button[id="header-sign-in-button"]').should("not.exist")
    cy.logout()
    cy.get('button[id="header-sign-in-button"]').should("exist")
  })

  it("should toggle the 'sign in' and 'sign out' buttons in the dropdown menu", () => {
    cy.get('button[id="main-header-button"]').click()
    cy.get("a[id='dropdown-sign-in-button']").should("exist")
    cy.login()
    cy.get("a[id='dropdown-sign-in-button']").should("not.exist")
    cy.logout()
    cy.get("a[id='dropdown-sign-in-button']").should("exist")
  })
})

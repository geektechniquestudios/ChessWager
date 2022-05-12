beforeEach(() => {
  cy.visit("/")
})

describe("show/hide chat body buttons", () => {
  it("should open and close global chat", () => {
    cy.get('div[id="global-chat"]').should("exist")
    cy.get('button[id="hide-chat-button"]').click()
    cy.get('div[id="global-chat"]').should("not.exist")
    cy.get('button[id="show-chat-button"]').click()
    cy.get('div[id="global-chat"]').should("exist")
  })
})

describe("clicking the chat button", () => {
  beforeEach(cy.login)
  it("should not allow user to write a message greater than 500 characters", () => {
    Cypress.on("uncaught:exception", (err) => {
      // Prevent test failure from errors from firebase installations API
      return err.message.includes("firebaseinstallations.googleapis.com")
    })
    cy.get('textArea[id="chat-form"]')
      .type(
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus",
        { delay: 1 },
      )
      .wait(1000)
    cy.get('button[id="global-chat-button"]').click().wait(1000)
    cy.get('div[id="global-chat-body"]').should(
      "not.contain",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus",
    )
    cy.logout()
  })
  it("should allow an authenticated user to send a message and see it in the chat", () => {
    cy.get('textArea[id="chat-form"]').type("This is a test message").wait(1000)
    cy.get('button[id="global-chat-button"]').click().wait(1000)
    cy.get('div[id="global-chat-body"]').should(
      "contain",
      "This is a test message",
    )
    cy.logout()
  })
})

describe("chat body", () => {
  beforeEach(cy.login)
  it("should allow unauthenticated users to see messages", () => {
    cy.login()
    cy.get('textArea[id="chat-form"]').type("This is a test message").wait(1000)
    cy.get('button[id="global-chat-button"]').click().wait(1000)
    cy.logout()
    cy.get('div[id="global-chat-body"]').should(
      "contain",
      "This is a test message",
    )
  })
  it("should open persona of user if their chat title is clicked", () => {
    cy.login()
    cy.get('textArea[id="chat-form"]').type("This is a test message").wait(1000)
    cy.get('button[id="global-chat-button"]').click().wait(1000)
    cy.get('div[id="clickedUser"]').should("not.exist")
    cy.get('div[id="dropdown-menu"]').should("not.exist")
    cy.get('div[id="global-chat-body"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('div[id="dropdown-menu"]').should("exist")
    cy.get('div[id="clickedUser"]').should("exist")
    cy.logout()
  })
})

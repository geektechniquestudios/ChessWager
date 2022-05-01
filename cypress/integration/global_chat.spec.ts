beforeEach(() => {
  cy.visit("http://localhost:3000/#")
})

describe("chat body", () => {
  it("should list chat messages", () => {})
  it("should open persona of user if their chat title is clicked", () => {})
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
  it("should not allow user to write a message greater than 500 characters", () => {})
  it("should allow an authenticated user to send a message and see it in the chat", () => {})
  it("should attempt to log user in if not authenticated", () => {})
  it("should submit the message if they are authenticated", () => {})
})


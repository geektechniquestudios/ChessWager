beforeEach(() => {
  cy.visit("http://localhost:3000/#")
})

describe("chat body", () => {
  it("should list chat messages", () => {})
  it("should open persona of user if their chat title is clicked", () => {})
})

describe("clicking button to open and close chat", () => {
  it("should open the global chat", () => {})
  it("should close the global chat if the button is clicked again", () => {})
})

describe("clicking the chat button", () => {
  it("should not allow user to write a message greater than 500 characters", () => {})
  it("should allow an authenticated user to send a message and see it in the chat", () => {})
  it("should attempt to log user in if not authenticated", () => {})
  it("should submit the message if they are authenticated", () => {})
})


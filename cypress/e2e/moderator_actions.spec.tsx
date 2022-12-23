import "firebase/compat/firestore"

describe("moderators", () => {
  before(cy.login) // login as admin
  beforeEach(() => {
    cy.visit("/")
  })
  after(cy.logout)

  it("should be able to ban other users", () => {})

  it("should not be able to be banned by other moderators", () => {})
})

describe("super moderators", () => {
  before(cy.login) // normal geektechnique user login is a super moderator
  beforeEach(() => {
    cy.visit("/")
  })
  after(cy.logout)

  it("should be able to ban other users", () => {})

  it("should be able to unban other users", () => {})

  it("should be able to ban other moderators", () => {})

  it("should be able to unban other moderators", () => {})
})

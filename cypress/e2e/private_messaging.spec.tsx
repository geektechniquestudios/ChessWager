describe("private messaging", () => {
  beforeEach(() => {
    cy.callFirestore(
      "delete",
      "conversations/XGXaJZxzR9gArv6wKEHZ5MuvSnd2-l4UCe97h60ZCgqlZBh42rajEBp73/messages",
    ).wait(2000)
    cy.callFirestore(
      "delete",
      "conversations/XGXaJZxzR9gArv6wKEHZ5MuvSnd2-l4UCe97h60ZCgqlZBh42rajEBp73",
    ).wait(2000)

    cy.visit("/")
    cy.login().wait(1000)
  })
  afterEach(cy.logout)

  it("should create a conversation", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("sumpro molar")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click().wait(2000)
    })
    cy.get('button[title="Send Direct Message"]').click()
    cy.get('div[id="conversation"]').should("exist")
  })

  it("should send a message", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("sumpro molar")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click().wait(2000)
    })
    cy.get('button[title="Send Direct Message"]').click()
    cy.get('textArea[id="direct-message-input"]').type("test message")
    cy.get('button[title="Press Enter to Send"]').click().wait(1000)
    cy.get('div[id="convo-body"]').within(() => {
      cy.get('p[id="message"]').first().should("contain", "test message")
    })
  })

  it("should recieve a message", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("sumpro molar")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Send Direct Message"]').click()
    cy.get('textArea[id="direct-message-input"]').type("test message")
    cy.get('button[title="Press Enter to Send"]').click().wait(1000)
    cy.logout()

    cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2")
    cy.get('button[title="Messages"]').click().wait(1000)
    cy.get('div[id="conversations-list"]').within(() => {
      cy.get("a").first().click().wait(2000)
    })
    cy.get('div[id="convo-body"]').within(() => {
      cy.get('p[id="message"]').first().should("contain", "test message")
    })
  })

  it("should mark unread messages as read when clicked", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("sumpro molar")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Send Direct Message"]').click()
    cy.get('textArea[id="direct-message-input"]').type("test message")
    cy.get('button[title="Press Enter to Send"]').click().wait(1000)
    cy.logout()

    cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2")
    cy.get('button[title="Messages"]').click().wait(1000)
    cy.get('div[id="conversations-list"]').within(() => {
      cy.get("a")
        .first()
        .should("have.css", "background-color", "rgb(41, 37, 36)")
        .click()
    })
    cy.get('button[title="Messages"]').click().wait(1000)
    cy.get('div[id="conversations-list"]').within(() => {
      cy.get("a")
        .first()
        .should("have.css", "background-color", "rgba(0, 0, 0, 0)")
    })
  })

  it("should set 'new messages' to false when menu is opened", () => {
    cy.callFirestore("update", `users/${Cypress.env("CYPRESS_TEST_UID")}`, {
      hasNewMessage: true,
    }).wait(1000)
    cy.get('button[title="Messages"]').click().wait(3000)
    cy.callFirestore("get", `users/${Cypress.env("CYPRESS_TEST_UID")}`).then(
      (user) => {
        cy.wrap(user).should("have.property", "hasNewMessage", false)
      },
    )
  })
})

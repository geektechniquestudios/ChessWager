describe("user search", () => {
  beforeEach(() => {
    cy.visit("/").wait(2000)
    cy.login()
  })
  afterEach(() => {
    cy.logout().wait(2000)
  })

  it("should allow the user to type in the search menu", () => {
    cy.get('button[title="Search Users"]').click().wait(2000)
    cy.get('input[id="search-users-input"]')
      .type("lo")
      .should("have.value", "lo")
  })

  it("should show users when searched", () => {
    cy.get('button[title="Search Users"]').click().wait(2000)
    cy.get('input[id="search-users-input"]')
      .type("ter")
      .should("have.value", "ter")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().should("exist")
    })
  })

  it("should open to clicked user menu if list item is clicked", () => {
    cy.get('button[title="Search Users"]').click().wait(2000)
    cy.get('input[id="search-users-input"]')
      .type("ter")
      .should("have.value", "ter")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('div[id="clickedUser"]').should("exist")
  })

  it("should list friend if 'friends only' is selected", () => {
    cy.callFirestore("update", `users/${Cypress.env("CYPRESS_TEST_UID_2")}`, {
      sentFriendRequests: [],
      redactedFriendRequests: [],
      friends: [],
      blockedUsers: [],
    })
    cy.callFirestore("update", `users/${Cypress.env("CYPRESS_TEST_UID")}`, {
      sentFriendRequests: [],
      redactedFriendRequests: [],
      friends: [],
      blockedUsers: [],
    })
    cy.get('button[title="Search Users"]').click().wait(1000)
    cy.get('input[id="search-users-input"]').type("sumpro molar").wait(2000)
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('a[title="Add Friend"]').click().wait(2000)
    cy.logout()

    cy.get('button[id="main-header-button"]').click().wait(1000)

    cy.login(Cypress.env("CYPRESS_TEST_UID_2")).wait(2000)
    cy.get('button[title="Notifications"]').click()
    cy.get('div[id="notification-list"]').find("button").eq(0).click()
    cy.get('div[id="requests"]')
      .first()
      .within(() => {
        cy.get("a").first().get('a[title="Accept"]').click()
      })
    cy.get('button[title="Search Users"]').click()
    cy.get("p").contains("Friends Only").click()
    cy.get('input[id="search-users-input"]').clear()
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").should("exist")
    })
  })

  it("should not show self in search results", () => {
    cy.get('button[title="Search Users"]').click().wait(2000)
    cy.get('input[id="search-users-input"]').type("geek technique")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").should("not.exist")
    })
  })
})

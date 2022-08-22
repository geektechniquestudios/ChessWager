cy.on("uncaught:exception", (err) => {
  // Prevent test failure from errors from firebase installations API
  return err.message.includes("firebaseinstallations.googleapis.com")
})

describe("friend requesting", () => {
  before(cy.logout)
  beforeEach(() => {
    cy.callFirestore("update", `users/${Cypress.env("CYPRESS_TEST_UID")}`, {
      sentFriendRequests: [],
      redactedFriendRequests: [],
      friends: [],
      blockedUsers: [],
    })
    cy.callFirestore("update", `users/XGXaJZxzR9gArv6wKEHZ5MuvSnd2`, {
      sentFriendRequests: [],
      redactedFriendRequests: [],
      friends: [],
      blockedUsers: [],
    })

    cy.callFirestore(
      "delete",
      `users/XGXaJZxzR9gArv6wKEHZ5MuvSnd2/notifications`,
    )
    cy.callFirestore(
      "delete",
      `users/${Cypress.env("CYPRESS_TEST_UID")}/notifications`,
    )

    cy.visit("/")
    cy.login()
  })

  it("should send and cancel friend request to user", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("sumpro molar")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Cancel Request"]').should("not.exist")
    cy.get('button[title="Add Friend"]').click().wait(1000)
    cy.get('button[title="Cancel Request"]').should("exist")
    cy.get('button[title="Cancel Request"]').click().wait(1000)
    cy.get('button[title="Add Friend"]').should("exist")
    cy.logout()
  })

  it("should send notification to user only first time button is clicked", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("sumpro molar")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Add Friend"]').click()
    cy.get('button[title="Cancel Request"]').click()
    cy.get('button[title="Add Friend"]').click()
    cy.get('button[title="Cancel Request"]').click()
    cy.get('div[id="header-middle"]').click().wait(1000)
    cy.logout()

    cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2").wait(1000)
    cy.get('button[title="Notifications"]').click().wait(1000)
    cy.get('div[id="notification-list"]').find("a").should("have.length", 1)
    cy.logout()
  })

  it("should accept friend request from other user", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("sumpro molar")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Add Friend"]').click().wait(1000)
    cy.get('div[id="header-middle"]').click()
    cy.logout()

    cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2").wait(1000)
    cy.get('button[title="Notifications"]').click()
    cy.get('div[id="notification-list"]').find("a").eq(0).click()
    cy.get('div[id="requests"]').within(() => {
      cy.get("a").first().get('button[title="Accept"]').click()
    })
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').clear()
    cy.get("p").contains("Friends Only").click()
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().should("exist")
    })
    cy.logout()
  })

  it("should unfriend user", () => {
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').type("sumpro molar")
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Add Friend"]').click().wait(1000)
    cy.get('div[id="header-middle"]').click()
    cy.logout()

    cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2").wait(1000)
    cy.get('button[title="Notifications"]').click()
    cy.get('div[id="notification-list"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('div[id="requests"]').within(() => {
      cy.get("a").first().get('button[title="Accept"]').click()
    })
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').clear()
    cy.get("p").contains("Friends Only").click()
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('button[title="Remove Friend"]').click()
    cy.get('button[title="Search Users"]').click()
    cy.get('input[id="search-users-input"]').clear()
    cy.get("p").contains("Friends Only").click()
    cy.get('div[id="search-users-results"]').within(() => {
      cy.get("a").should("not.exist")
    })
    cy.logout()
  })
})

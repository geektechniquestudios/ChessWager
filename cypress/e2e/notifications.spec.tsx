import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

describe("notifications", () => {
  before(cy.login)
  beforeEach(() => {
    cy.visit("/")
  })
  after(cy.logout)
  
  it("should show the notification list", () => {
    cy.callFirestore(
      "set",
      `users/${Cypress.env("CYPRESS_TEST_UID")}/notifications/testid`,
      {
        clickedUserId: "XGXaJZxzR9gArv6wKEHZ5MuvSnd2",
        createdAt: firebase.firestore.Timestamp.now(),
        isRead: false,
        openToMenu: "clickedUser",
        text: "Sumpro Molar accepted your friend request.",
        uid: "XGXaJZxzR9gArv6wKEHZ5MuvSnd2",
      },
    ).wait(2000)
    cy.get('button[title="Notifications"]').click()
    cy.get('div[id="notification-list"]').within(() => {
      cy.get("a").first().should("exist")
    })
  })

  it("should open to new menu when notification menu item is clicked", () => {
    cy.get('button[title="Notifications"]').click()
    cy.get('div[id="notification-list"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('div[id="notification-list"]').should("not.exist")
  })

  it("should mark unread notifications as read when clicked", () => {
    cy.callFirestore(
      "set",
      `users/${Cypress.env("CYPRESS_TEST_UID")}/notifications/testid`,
      {
        clickedUserId: "XGXaJZxzR9gArv6wKEHZ5MuvSnd2",
        createdAt: firebase.firestore.Timestamp.now(),
        isRead: false,
        openToMenu: "clickedUser",
        text: "Sumpro Molar accepted your friend request.",
        uid: "XGXaJZxzR9gArv6wKEHZ5MuvSnd2",
      },
    )
    cy.get('button[title="Notifications"]').click()
    cy.get('div[id="notification-list"]').within(() => {
      cy.get("a").first().click()
    })
    cy.wait(5000)
    cy.callFirestore(
      "get",
      `users/${Cypress.env("CYPRESS_TEST_UID")}/notifications/testid`,
    ).then((notification) => {
      cy.wrap(notification).should("have.property", "isRead", true)
    })
  })

  it('should set "new notifications" to false when menu is opened', () => {
    cy.callFirestore("update", `users/${Cypress.env("CYPRESS_TEST_UID")}`, {
      hasNewNotifications: true,
    }).wait(1000)
    cy.get('button[title="Notifications"]').click().wait(3000)
    cy.callFirestore("get", `users/${Cypress.env("CYPRESS_TEST_UID")}`).then(
      (user) => {
        cy.wrap(user).should("have.property", "hasNewNotifications", false)
      },
    )
  })
})

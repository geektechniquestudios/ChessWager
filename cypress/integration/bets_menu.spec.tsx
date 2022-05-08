import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
describe("Bets Menu", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.login()
  })
  it("should open to a specific bet if a bet item is clicked", () => {
    cy.get('button[title="Bets"]').click()
    cy.get('div[id="bets"]').should("exist")
    cy.get('div[id="bet"]').should("not.exist")
    cy.get('div[id="bets-list"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('div[id="bet"]').should("exist")
  })
  it("should open to persona if user tile is clicked", () => {
    cy.get('button[title="Bets"]').click()
    cy.get('div[id="bets"]').should("exist")
    cy.get('div[id="bet"]').should("not.exist")
    cy.get('div[id="bets-list"]').within(() => {
      cy.get("a").first().click()
    })
    cy.get('div[id="clickedUser"]').should("not.exist")
    cy.get('button[id="user-bet-data-button"]').first().click()
    cy.get('div[id="clickedUser"]').should("exist")
  })
  // it("should mark a bet as read if it is clicked", () => {
  //   cy.callFirestore("add", "lobby", {
  //     amount: 0.338409475465313,
  //     betSide: "white",
  //     contractAddress: "0x35BFfB0AA4414c066e6Aa4890F370fd4390a48dA",
  //     createdAt: firebase.firestore.Timestamp.now(),
  //     gameId: "UKrI3zO0",
  //     hasUser1SeenUpdate: false,
  //     hasUser2SeenUpdate: false,
  //     multiplier: 1,
  //     status: "approved",
  //     timestamp: firebase.firestore.Timestamp.now(),
  //     user1DisplayName: "Geek Technique",
  //     user1FollowThrough: [1, 1],
  //     user1Id: "l4UCe97h60ZCgqlZBh42rajEBp73",
  //     user1Metamask: "0x9497DA534Dcb2B49d73dEf1468b91339e98BE60C",
  //     user1PhotoURL:
  //       "https://lh3.googleusercontent.com/a-/AOh14GjWBThC9_ArHAriyCyJchCXgss6wAVtwIQOGvd5=s96-c",
  //     user2DisplayName: "Treppy Dizzle",
  //     user2FollowThrough: [1, 1],
  //     user2Id: "jAtWsuClQAQ2zmF7lsx8W429pZG2",
  //     user2Metamask: "0xa108134AE267a44c4A64530E6FF1FBdCb66812cC",
  //     user2PhotoURL:
  //       "https://lh3.googleusercontent.com/a/AATXAJzBjUGHX3Gy4_wDWl2yvxp5ySFC49C_agf_qwEB=s96-c",
  //     users: {
  //       0: "l4UCe97h60ZCgqlZBh42rajEBp73",
  //       1: "jAtWsuClQAQ2zmF7lsx8W429pZG2",
  //     },
  //   })

  //   // cy.get('div[id="bets-list"]').within(() => {
  //   //   cy.get("a").first().click()
  //   //   // write bet data to firebase "unread"
  //   //   // check that it is unread
  //   //   // click button
  //   //   // reopen menu
  //   //   // check that it is read
  //   // })
  // })
})

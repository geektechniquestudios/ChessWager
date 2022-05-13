// import firebase from "firebase/compat/app"
// import "firebase/compat/firestore"

// This module cannot be tested currently because of some technical hurdles
// We need to be able to use metamask in the test to click on bet buttons, which isn't easy. Synpress does not seem to work
// we need to be able to control the game. Lichess has an api for controlling bots, but it is not straightforword


// need to replace chesstv api with specific game api using env variables
// control 2 bots to play moves

// beforeEach(() => {
//   // set wallet address to not be enmpty for both users
//   cy.visit("/")
//   cy.login().wait(1000)
// })
// afterEach(cy.logout)

// describe("betting lobby", () => {
//   it("should allow logged in users to click on a bet, making it selected", () => {
//     // create bet with call firestore
//     cy.callFirestore("set", "lobby/test-bet", {
//       amount: 0.6620324395895398,
//       betSide: "white",
//       contractAddress: "0xb38285756c11dcbF31074f3647d4fdF002f3dA32",
//       createdAt: firebase.firestore.Timestamp.now(),
//       gameId: "e6PFotYP",
//       hasUser1SeenUpdate: false,
//       hasUser2SeenUpdate: false,
//       multiplier: 1,
//       status: "ready",
//       user1DisplayName: "Geek Technique",
//       user1FollowThrough: [1, 1],
//       user1Id: "l4UCe97h60ZCgqlZBh42rajEBp73",
//       user1Metamask: "0x9497DA534Dcb2B49d73dEf1468b91339e98BE60C",
//       user1PhotoURL:
//         "https://lh3.googleusercontent.com/a-/AOh14GjWBThC9_ArHAriyCyJchCXgss6wAVtwIQOGvd5=s96-c",
//     }).wait(1000)
//     // get bet body, look for new bet
//     // check state of bet "isSelected"
//     // click on bet
//     // check state of bet "isSelected"
//   })

  // it("shouldn't allow unauthenticated users to click bets", () => {
  //   // create bet with call firestore
  //   cy.logout()
  //   cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2")
  //   // get bet body, look for new bet
  //   // check state of bet "isSelected"
  //   // click on bet
  //   // check state of bet "isSelected"
  // })
  // it("should keep selected bets in place as other bets move around", () => {
  //   // create 3 bets with call firestore
  //   cy.logout()
  //   cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2")
  //   // get bet body, get middle bet, click on it
  //   // reorder bets with sorting button "created at"
  //   // check that middle bet has same "created at" as before
  // })
  // it("should allow users to join", () => {
  //   // create bet with call firestore
  //   // get bet body, look for new bet
  //   // check for join button within
  //   // click join button
  // })
  // it("should allow bet creator to delete own bet", () => {
  //   // create bet with call firestore
  //   // test delete button
  //   // check that bet is gone
  // })
  // it("should allow bet creator to kick other user", () => {
  //   // create bet with call firestore in pending state with both users
  //   // test delete button
  //   // check that bet is gone
  // })
  // it("should allow bet creator to accept other user", () => {
  //   // create bet with call firestore in pending state with both users
  //   // test approve button
  //   // check that bet is gone
  // })
  // it("should open the persona menu if a user title is clicked", () => {
  //   // create bet with call firestore in pending state with both users
  //   // find user title, click on it
  //   // check that clickedUser menu is open
  // })
  // // needs to be part of e2e tests
  // // it("should update user stats based on outcome", () => {
  // //   //
  // // })
  // it("should correctly sort bets based on each lobby header button", () => {
  //   // create 5 bets with call firestore
  //   // make variety  of qualities and their expected orders
  // })
  // it("should despawn funded bets and spawn bet in funded area", () => {
  //   // create bet with call firestore in approved state
  //   // check that bet is in lobby
  //   // check that bet is not in funded area
  //   // update bet to funded state
  //   // check that bet is not in lobby
  //   // check that bet is in funded area
  // })
  // it("should allow user to pay", () => {})
// })

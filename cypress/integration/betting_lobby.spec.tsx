// need to replace chesstv api with specific game api using env variables
// control 2 bots to play moves

beforeEach(() => {
  cy.visit("/")
  cy.login()
})
afterEach(cy.logout)

describe("betting lobby", () => {
  it("should allow logged in users to click on a bet, making it selected", () => {
    // create bet with call firestore
    // get bet body, look for new bet
    // check state of bet "isSelected"
    // click on bet
    // check state of bet "isSelected"
  })
  it("shouldn't allow unauthenticated users to click bets", () => {
    // create bet with call firestore
    cy.logout()
    cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2")
    // get bet body, look for new bet
    // check state of bet "isSelected"
    // click on bet
    // check state of bet "isSelected"
  })
  it("should keep selected bets in place as other bets move around", () => {
    // create 3 bets with call firestore
    cy.logout()
    cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2")
    // get bet body, get middle bet, click on it
    // reorder bets with sorting button "created at"
    // check that middle bet has same "created at" as before
  })
  it("should allow users to join", () => {
    // create bet with call firestore
    // get bet body, look for new bet
    // check for join button within
    // click join button
  })
  it("should allow bet creator to delete own bet", () => {
    // create bet with call firestore
    // test delete button
    // check that bet is gone
  })
  it("should allow bet creator to kick other user", () => {
    // create bet with call firestore in pending state with both users
    // test delete button
    // check that bet is gone
  })
  it("should allow bet creator to accept other user", () => {
    // create bet with call firestore in pending state with both users
    // test approve button
    // check that bet is gone
  })
  it("should open the persona menu if a user title is clicked", () => {
    // create bet with call firestore in pending state with both users
    // find user title, click on it
    // check that clickedUser menu is open
  })
  // needs to be part of e2e tests
  // it("should update user stats based on outcome", () => {
  //   //
  // })
  it("should correctly sort bets based on each lobby header button", () => {
    // create 5 bets with call firestore
    // make variety  of qualities and their expected orders
  })
  it("should despawn funded bets and spawn bet in funded area", () => {
    // create bet with call firestore in approved state
    // check that bet is in lobby
    // check that bet is not in funded area
    // update bet to funded state
    // check that bet is not in lobby
    // check that bet is in funded area
  })
  // it("should allow user to pay", () => {})
})

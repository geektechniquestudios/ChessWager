// need to replace chesstv api with specific game api using env variables
// control 2 bots to play moves

beforeEach(() => {
  cy.visit("/")
})

describe("betting lobby", () => {
  it("should allow logged in users to click on a bet, making it selected", () => {
    cy.login()
    // create bet with call firestore
    // get bet body, look for new bet
    // check state of bet "isSelected"
    // click on bet
    // check state of bet "isSelected"
    cy.logout()
  })
  it("shouldn't allow unauthenticated users to click bets", () => {
    cy.login()
    // create bet with call firestore
    cy.logout()
    cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2")
    // get bet body, look for new bet
    // check state of bet "isSelected"
    // click on bet
    // check state of bet "isSelected"
    cy.logout()
  })
  it("should keep selected bets in place as other bets move around", () => {
    cy.login()
    // create 3 bets with call firestore
    cy.logout()
    cy.login("XGXaJZxzR9gArv6wKEHZ5MuvSnd2")
    // get bet body, get middle bet, click on it
    // reorder bets with sorting button "created at"
    // check that middle bet has same "created at" as before
    cy.logout()
  })
  it("should allow users to join", () => {
    cy.login()
    // create bet with call firestore
    // get bet body, look for new bet
    // check for join button within 
    // click join button
  })
  it("should allow bet creator to delete own bet", () => {
    
  })
  // it("should allow bet creator to kick other user", () => {})
  // it("should allow bet creator to accept other user", () => {})
  // it("should open the persona menu if a user title is clicked", () => {})
  // it("should update user stats based on outcome", () => {})
  // it("should correctly sort bets based on each lobby header button", () => {})
  // it("should despawn funded bets", () => {})
  // it("should despawn deleted bets", () => {})
  // it("should allow user to pay", () => {})
})

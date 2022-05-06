beforeEach(() => {
  cy.visit("/")
})

describe("lichess button", () => {
  it("should open to the lichess tv link in a new tab", () => {
    cy.get('a[id="lichess-button"]').should("have.attr", "target", "_blank")
    cy.get('a[id="lichess-button"]').then((res) => {
      const url = res.prop("href")
      cy.request(url)
    })
  })
})

describe("avax price button", () => {
  it("should open to coingecko's avax price page", () => {})
})

beforeEach(() => {
  cy.visit("/")
})

export const linkTest = (
  link: string,
  id: string,
  componentToTest: string,
  functionToRender?: () => void,
) => {
  if (functionToRender) beforeEach(functionToRender)
  describe(componentToTest, () => {
    it("should open to the link in a new tab", () => {
      cy.get(`a[id=${id}]`).should("have.attr", "target", "_blank")
      cy.get(`a[id=${id}]`).should("have.attr", "rel", "noreferrer noopener")
    })

    it("should respond with a positive status code", () => {
      cy.get(`a[id=${id}]`).then((res) => {
        const url = res.prop("href")
        cy.request({
          method: "GET",
          url,
          retryOnStatusCodeFailure: true,
        })
      })
    })

    it("should open to the correct url", () => {
      cy.get(`a[id=${id}]`).should("have.attr", "href", link)
    })
  })
}

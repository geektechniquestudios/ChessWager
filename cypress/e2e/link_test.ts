export const linkTest = (link: string, id: string, componentToTest: string) => {
  const openToSocialsMenu = () => {
    cy.get('button[id="main-header-button"]').click().wait(1000)
    cy.get('a[id="Social"]').click().wait(1000)
  }

  describe(componentToTest, () => {
    beforeEach(() => {
      cy.visit("/")
    })
    beforeEach(openToSocialsMenu)

    it("should open to the link in a new tab", () => {
      cy.get(`a[id=${id}]`).should("have.attr", "target", "_blank")
      cy.get(`a[id=${id}]`).should("have.attr", "rel", "noreferrer noopener")
    })

    it("should open to the correct url", () => {
      cy.get(`a[id=${id}]`).should("have.attr", "href", link).wait(1000)
    })
  })
}

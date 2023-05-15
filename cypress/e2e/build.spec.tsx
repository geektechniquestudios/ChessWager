interface RunBuildResult {
  success: boolean
  output: string
}

describe("Build", () => {
  it("project should build without errors", () => {
    cy.task<RunBuildResult>("runBuildWithEvents").then(
      ({ success, output }) => {
        expect(success).to.be.true
        expect(output).not.to.contain("Failed to compile")
      },
    )
  })
})

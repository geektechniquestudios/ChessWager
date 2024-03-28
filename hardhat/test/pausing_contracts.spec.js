const { expect } = require("chai")
const { deployContract, fullBetWithPayout } = require("./testUtils")

describe("Pausing Contract", () => {
  beforeEach(async () => {
    ;({ contract, owner, contractRef, account1, account2 } =
      await deployContract())
  })

  it("Should not allow bets when paused", async () => {
    await contract.pause()

    await expect(fullBetWithPayout(account1, account2)).to.be.revertedWith(
      "Pausable: paused",
    )
  })

  it("Should not allow non-owners to pause", async () => {
    await expect(contract.connect(account1).pause()).to.be.revertedWith(
      "Ownable: caller is not the owner",
    )
  })

  it("Should not allow non-owners to unpause", async () => {
    await expect(contract.connect(account1).unpause()).to.be.revertedWith(
      "Ownable: caller is not the owner",
    )
  })

  it("Should be able to unpause", async () => {
    await contract.pause()

    await expect(fullBetWithPayout(account1, account2)).to.be.revertedWith(
      "Pausable: paused",
    )

    await contract.unpause()

    await expect(fullBetWithPayout(account1, account2)).to.not.be.reverted
  })
})

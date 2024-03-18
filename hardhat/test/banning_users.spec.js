const { expect } = require("chai")

const { deployContract, generateBetDetails } = require("./testUtils")

describe("Banning Users", () => {
  beforeEach(async () => {
    ;({ contract, owner, contractRef, account1, account2 } =
      await deployContract())
  })

  it("Should not allow banned users to bet", async () => {
    const { betUser1, betId, user1Overrides } = generateBetDetails(
      account1,
      account2,
    )

    await contract.banUserByWalletAddress(account1.address)

    await expect(
      contract.connect(account1).placeBet(betUser1, betId, user1Overrides),
    ).to.be.reverted
  })

  it("Should not allow normal users to bet against banned users", async () => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    await contract.banUserByWalletAddress(account2.address)

    await expect(
      contract.connect(account1).placeBet(betUser1, betId, user1Overrides),
    ).to.be.reverted

    await expect(
      contract.connect(account2).placeBet(betUser2, betId, user2Overrides),
    ).to.be.reverted
  })

  it("Should not allow non-owners to ban users", async () => {
    await expect(
      contract.connect(account1).banUserByWalletAddress(account2.address),
    ).to.be.reverted
  })
})

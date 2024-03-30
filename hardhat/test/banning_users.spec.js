const { expect } = require("chai")

const {
  deployContract,
  generateBetDetails,
  fullBetWithPayout,
} = require("./testUtils")

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
    ).to.be.revertedWith("At least one user in this wager is banned")
  })

  it("Should not allow normal users to bet against banned users", async () => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    await contract.banUserByWalletAddress(account2.address)

    await expect(
      contract.connect(account1).placeBet(betUser1, betId, user1Overrides),
    ).to.be.revertedWith("At least one user in this wager is banned")
    await expect(
      contract.connect(account2).placeBet(betUser2, betId, user2Overrides),
    ).to.be.revertedWith("At least one user in this wager is banned")
  })

  it("Should not allow non-owners to ban users", async () => {
    await expect(
      contract.connect(account1).banUserByWalletAddress(account2.address),
    ).to.be.revertedWith("Ownable: caller is not the owner")
  })

  it("Should allow owners to unban a user", async () => {
    await contract.banUserByWalletAddress(account1.address)

    await contract.unbanUserByWalletAddress(account1.address)

    const { betUser1, betId, user1Overrides } = generateBetDetails(
      account1,
      account2,
    )

    await expect(
      contract.connect(account1).placeBet(betUser1, betId, user1Overrides),
    ).to.not.be.reverted
  })

  it("Should allow owners to ban multiple users", async () => {
    await contract.banMultipleUsersByWalletAddress([
      account1.address,
      account2.address,
    ])

    await expect(fullBetWithPayout(account1, account2)).to.be.revertedWith(
      "At least one user in this wager is banned",
    )
  })

  it("Should not allow non-owners to unban users", async () => {
    await contract.banUserByWalletAddress(account1.address)

    await expect(
      contract.connect(account2).unbanUserByWalletAddress(account1.address),
    ).to.be.revertedWith("Ownable: caller is not the owner")
  })
})

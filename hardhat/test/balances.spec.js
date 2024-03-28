const { expect } = require("chai")
const { ethers } = require("hardhat")
const { deployContract, fullBetWithPayout } = require("./testUtils")

describe("Balances", () => {
  beforeEach(async () => {
    ;({ contract, owner, contractRef, account1, account2 } =
      await deployContract())
  })

  it("Should increase after 2 users bet on a game and get paid", async () => {
    expect(await contract.viewChessWagerBalance()).to.equal(0)
    const { vig } = await fullBetWithPayout(account1, account2)

    expect(await contract.viewChessWagerBalance()).to.equal(vig)
  })

  it("Should allow withdrawls", async () => {
    const { vig } = await fullBetWithPayout(account1, account2)

    expect(await contract.viewChessWagerBalance()).to.equal(vig)

    const originalOwnerBalance = await ethers.provider.getBalance(owner.address)

    const tx = await contract.withdrawChessWagerBalance()
    const txReceipt = await tx.wait()
    const gasCost = txReceipt.gasUsed.mul(tx.gasPrice)

    expect(await contract.viewChessWagerBalance()).to.equal(0)

    const newOwnerBalance = await ethers.provider.getBalance(owner.address)

    expect(newOwnerBalance).to.equal(originalOwnerBalance.add(vig).sub(gasCost))
  })

  it("Should allow balance checking", async () => {
    expect(await contract.viewChessWagerBalance()).to.equal(0)
    const { vig } = await fullBetWithPayout(account1, account2)
    expect(await contract.viewChessWagerBalance()).to.equal(vig)
  })

  it("Should not allow non-owners to withdraw", async () => {
    await fullBetWithPayout(account1, account2)

    await expect(
      contract.connect(account1).withdrawChessWagerBalance(),
    ).to.be.revertedWith("Ownable: caller is not the owner")
  })
})

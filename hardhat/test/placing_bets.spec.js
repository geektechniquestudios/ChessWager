const { deployContract } = require("./testUtils")

const { expect } = require("chai")
const { ethers } = require("hardhat")

const { fullBetWithPayout, generateBetDetails } = require("./testUtils")

describe("Placing Bets", async () => {
  beforeEach(async () => {
    ;({ contract, owner, contractRef, account1, account2 } =
      await deployContract())
  })

  const testWithBadMultipliers = async () => {
    const multipliers = [
      -10000000, -1000000.01, -100, -1, -0.01, 0.001, 101, 100.01, 1000000.01,
      10000000,
    ]

    multipliers.forEach((multiplier) => {
      it(`Should not allow a multiplier of ${multiplier}`, async () => {
        await expect(fullBetWithPayout(account1, account2, multiplier)).to.be
          .reverted
      })
    })
  }

  testWithBadMultipliers()

  it("Should not allow users to bet against themselves", async () => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    contract.connect(account1).placeBet(betUser1, betId, user1Overrides)
    await expect(
      contract.connect(account1).placeBet(betUser2, betId, user2Overrides),
    ).to.be.revertedWith("User 2 wallet address doesn't match sender address")
  })

  it("Should not allow bets on already paid out games", async () => {
    const { betDetails } = await fullBetWithPayout(account1, account2)
    await expect(
      contract
        .connect(account1)
        .placeBet(
          betDetails.betUser1,
          betDetails.betId,
          betDetails.user1Overrides,
        ),
    ).to.be.revertedWith("Only 2 users can particiapte in a bet")
  })

  it("Should not allow bets on games if side is not white or black", async () => {
    await expect(
      fullBetWithPayout(account1, account2, 1, "93", "red"),
    ).to.be.revertedWith("Bet side must only be 'white' or 'black'")
  })

  it("Should not allow bet if the user's wallet address doesn't equal the address in the bet", async () => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    const wrongBetUser1 = {
      ...betUser1,
      user1Metamask: account2.address,
    }

    await expect(
      contract.connect(account1).placeBet(wrongBetUser1, betId, user1Overrides),
    ).to.be.revertedWith(
      "The user's wallet address doesn't equal the address in the bet",
    )

    const wrongBetUser2 = {
      ...betUser2,
      user2Metamask: account1.address,
    }

    await expect(
      contract.connect(account2).placeBet(wrongBetUser2, betId, user2Overrides),
    ).to.be.revertedWith(
      "The user's wallet address doesn't equal the address in the bet",
    )
  })

  it("Should not allow bet if bet is complete", async () => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    await contract.connect(account1).placeBet(betUser1, betId, user1Overrides)
    await contract.connect(account2).placeBet(betUser2, betId, user2Overrides)

    await expect(
      contract.connect(account1).placeBet(betUser1, betId, user1Overrides),
    ).to.be.revertedWith("Only 2 users can particiapte in a bet")
  })

  it("Should not allow bet if game is already over", async () => {
    const { betDetails } = await fullBetWithPayout(account1, account2)
    const { betUser1, betId, user1Overrides } = betDetails
    await expect(
      contract.connect(account1).placeBet(betUser1, betId, user1Overrides),
    ).to.be.revertedWith("Only 2 users can particiapte in a bet")
  })

  it("Should not allow bet if wrong amount is sent", async () => {
    const { betUser1, betId, user1Overrides } = generateBetDetails(
      account1,
      account2,
    )

    const wrongUser1Overrides = {
      ...user1Overrides,
      value: ethers.utils.parseEther("0.001"),
    }

    await expect(
      contract.connect(account1).placeBet(betUser1, betId, wrongUser1Overrides),
    ).to.be.revertedWith("Wrong amount sent")
  })

  it("Should not allow bet if a third user bets on the same betId", async () => {
    const { betDetails } = await fullBetWithPayout(account1, account2)
    const { betUser2, betId, user1Overrides } = betDetails
    await expect(
      contract.connect(owner).placeBet(betUser2, betId, user1Overrides),
    ).to.be.revertedWith("Only 2 users can particiapte in a bet")
  })

  it("Should not allow amount to be 0 or less", async () => {
    await expect(
      fullBetWithPayout(account1, account2, 1, "0"),
    ).to.be.revertedWith("Amount must be more than 0")
  })

  const testInvalidBet = async (
    firstUser,
    secondUser,
    updateBetDetails,
    errorMessage,
  ) => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    const firstBet = firstUser === account1 ? betUser1 : betUser2
    const firstOverrides =
      firstUser === account1 ? user1Overrides : user2Overrides
    let secondBet = secondUser === account1 ? betUser1 : betUser2
    const secondOverrides =
      secondUser === account1 ? user1Overrides : user2Overrides

    // Place the first valid bet
    await contract.connect(firstUser).placeBet(firstBet, betId, firstOverrides)

    // Modify the second bet with invalid details
    secondBet = updateBetDetails(secondBet)

    // Expect the second bet to be reverted
    await expect(
      contract.connect(secondUser).placeBet(secondBet, betId, secondOverrides),
    ).to.be.revertedWith(errorMessage)
  }

  const testCases = [
    {
      updateBetDetails: (bet) => ({
        ...bet,
        amount: ethers.utils.parseEther("0.001"),
      }),
      errorMessage: "User 1 bet.amount doesn't match user 2 bet.amount",
    },
    {
      updateBetDetails: (bet) => ({ ...bet, betSide: "black" }),
      errorMessage: "User 1 bet.betSide doesn't match user 2 bet.betSide",
    },
    {
      updateBetDetails: (bet) => ({ ...bet, user1Id: "wrongId" }),
      errorMessage: "User 1 bet.user1Id doesn't match user 2 bet.user1Id",
    },
    {
      updateBetDetails: (bet) => ({ ...bet, user2Id: "wrongId" }),
      errorMessage: "User 1 bet.user2Id doesn't match user 2 bet.user2Id",
    },
    {
      updateBetDetails: (bet) => ({ ...bet, multiplier: 200 }),
      errorMessage: "User 1 bet.multiplier doesn't match user 2 bet.multiplier",
    },
    {
      updateBetDetails: (bet) => ({ ...bet, gameId: "wrongGameId" }),
      errorMessage: "User 1 bet.gameId doesn't match user 2 bet.gameId",
    },
    {
      updateBetDetails: (bet) => ({ ...bet, timestamp: bet.timestamp.add(1) }),
      errorMessage: "User 1 bet.timestamp doesn't match user 2 bet.timestamp",
    },
  ]

  for (const { updateBetDetails, errorMessage } of testCases) {
    it(`Should not allow a bet if details do not match where user1 bets first for error: ${errorMessage}`, async () => {
      await testInvalidBet(account1, account2, updateBetDetails, errorMessage)
    })

    it(`Should not allow a bet if details do not match where user2 bets first for error: ${errorMessage}`, async () => {
      await testInvalidBet(account2, account1, updateBetDetails, errorMessage)
    })
  }

  it("Should not allow a bet if bet.user1Metamask does not match where user1 bets first", async () => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    const betUser2WithWrongMetamask = {
      ...betUser2,
      user1Metamask: owner.address,
    }

    await contract.connect(account1).placeBet(betUser1, betId, user1Overrides)

    await expect(
      contract
        .connect(account2)
        .placeBet(betUser2WithWrongMetamask, betId, user2Overrides),
    ).to.be.revertedWith(
      "User 1 bet.user1Metamask doesn't match user 2 bet.user1Metamask",
    )
  })

  it("Should not allow a bet if bet.user1Metamask does not match where user2 bets first", async () => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    const betUser1WithWrongMetamask = {
      ...betUser1,
      user1Metamask: owner.address,
    }

    await contract.connect(account2).placeBet(betUser2, betId, user2Overrides)

    await expect(
      contract
        .connect(account1)
        .placeBet(betUser1WithWrongMetamask, betId, user1Overrides),
    ).to.be.revertedWith(
      "The user's wallet address doesn't equal the address in the bet",
    )
  })

  it("Should not allow a bet if bet.user2Metamask does not match where user1 bets first", async () => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    const betUser2WithWrongMetamask = {
      ...betUser2,
      user2Metamask: owner.address,
    }

    await contract.connect(account1).placeBet(betUser1, betId, user1Overrides)

    await expect(
      contract
        .connect(account2)
        .placeBet(betUser2WithWrongMetamask, betId, user2Overrides),
    ).to.be.revertedWith(
      "The user's wallet address doesn't equal the address in the bet",
    )
  })

  it("Should not allow a bet if bet.user2Metamask does not match where user2 bets first", async () => {
    const { betUser1, betUser2, betId, user1Overrides, user2Overrides } =
      generateBetDetails(account1, account2)

    const betUser1WithWrongMetamask = {
      ...betUser1,
      user2Metamask: owner.address,
    }

    await contract.connect(account2).placeBet(betUser2, betId, user2Overrides)

    await expect(
      contract
        .connect(account1)
        .placeBet(betUser1WithWrongMetamask, betId, user1Overrides),
    ).to.be.revertedWith(
      "User 1 bet.user2Metamask doesn't match user 2 bet.user2Metamask",
    )
  })

  it("Should not allow a bet if amount sent doesn't match amount in bet", async () => {
    const { betUser1, betId } = generateBetDetails(account1, account2)

    const wrongUser1Overrides = {
      value: ethers.utils.parseEther("0.001"),
    }

    await expect(
      contract.connect(account1).placeBet(betUser1, betId, wrongUser1Overrides),
    ).to.be.revertedWith("Wrong amount sent")
  })
})

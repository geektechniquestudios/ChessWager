const { expect } = require("chai")

const { deployContract, generateBetDetails } = require("./testUtils")

describe("Events", () => {
  beforeEach(async () => {
    ;({ contract, owner, contractRef, account1, account2 } =
      await deployContract())
  })

  beforeEach(() => {
    betDetails = generateBetDetails(account1, account2)
  })

  const placeAndAssertBet = async (
    user,
    userBet,
    betId,
    overrides,
    expectedEvent,
    expectedArgs,
  ) => {
    await expect(contract.connect(user).placeBet(userBet, betId, overrides))
      .to.emit(contract, expectedEvent)
      .withArgs(...expectedArgs)
  }

  const placeBetsAndAssertPayout = async (
    gameId,
    winnerColor,
    expectedArgs,
  ) => {
    await contract
      .connect(account1)
      .placeBet(
        betDetails.betUser1,
        betDetails.betId,
        betDetails.user1Overrides,
      )
      .catch(console.error)
    await contract
      .connect(account2)
      .placeBet(
        betDetails.betUser2,
        betDetails.betId,
        betDetails.user2Overrides,
      )
      .catch(console.error)
    await expect(contract.payWinners(gameId, winnerColor))
      .to.emit(contract, "PayoutStatus")
      .withArgs(...expectedArgs)
  }

  it("Should emit BetPlacedStatus event for player 1", async () => {
    await placeAndAssertBet(
      account1,
      betDetails.betUser1,
      betDetails.betId,
      betDetails.user1Overrides,
      "BetPlacedStatus",
      ["user1 has paid", betDetails.betId, betDetails.betUser1.gameId],
    )
  })

  it("Should emit BetPlacedStatus event for player 2", async () => {
    await placeAndAssertBet(
      account2,
      betDetails.betUser2,
      betDetails.betId,
      betDetails.user2Overrides,
      "BetPlacedStatus",
      ["user2 has paid", betDetails.betId, betDetails.gameId],
    )
  })

  it("Should emit PayoutStatus event for player 1 winning as white", async () => {
    await placeBetsAndAssertPayout(betDetails.gameId, "white", [
      betDetails.betId,
      betDetails.gameId,
      true,
      true,
      "white",
    ])
  })

  it("Should emit PayoutStatus event for player 1 winning as black", async () => {
    await placeBetsAndAssertPayout(betDetails.gameId, "black", [
      betDetails.betId,
      betDetails.gameId,
      true,
      true,
      "black",
    ])
  })

  it("Should emit PayoutStatus event for player 2 winning as white", async () => {
    await placeBetsAndAssertPayout(betDetails.gameId, "white", [
      betDetails.betId,
      betDetails.gameId,
      true,
      true,
      "white",
    ])
  })

  it("Should emit PayoutStatus event for player 2 winning as black", async () => {
    await placeBetsAndAssertPayout(betDetails.gameId, "black", [
      betDetails.betId,
      betDetails.gameId,
      true,
      true,
      "black",
    ])
  })
})

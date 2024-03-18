const { deployContract } = require("./testUtils")

const { expect } = require("chai")
const { ethers } = require("hardhat")

const { fullBetWithPayout } = require("./testUtils")

describe("Functional Tests", async () => {
  beforeEach(async () => {
    ;({ contract, owner, contractRef, account1, account2 } =
      await deployContract())
  })

  const placeBetAndCheckBalances = async (
    multiplier,
    amount,
    betSide,
    winningSide,
    userBetOrder,
  ) => {
    const {
      betDetails,
      user1GasCost,
      user2GasCost,
      balance1BeforeBet,
      balance2BeforeBet,
      balance1AfterPayout,
      balance2AfterPayout,
      prizePool,
      vig,
    } = await fullBetWithPayout(
      account1,
      account2,
      multiplier,
      amount,
      betSide,
      winningSide,
      userBetOrder,
    )

    const user1BetAmount = betDetails.betUser1.amount
    const user2BetAmount = betDetails.betUser2.amount
      .mul(betDetails.betUser1.multiplier)
      .div(100)

    if (userBetOrder.length === 1) {
      if (userBetOrder[0] === "user1") {
        expect(balance1AfterPayout).to.equal(
          balance1BeforeBet.sub(user1GasCost),
        )
      } else {
        expect(balance2AfterPayout).to.equal(
          balance2BeforeBet.sub(user2GasCost).toString(),
        )
      }
      return
    }

    const amountToAddToUser1 =
      winningSide === "draw"
        ? user1BetAmount
        : betSide === winningSide
          ? prizePool.sub(vig)
          : ethers.constants.Zero
    const amountToAddToUser2 =
      winningSide === "draw"
        ? user2BetAmount
        : betSide !== winningSide
          ? prizePool.sub(vig)
          : ethers.constants.Zero

    const calculateExpectedBalanceAfterPayout = ({
      initialBalance,
      betAmount,
      gasCost,
      prizeAmount,
    }) => initialBalance.sub(betAmount).sub(gasCost).add(prizeAmount)

    const expectedBalance1AfterPayout = calculateExpectedBalanceAfterPayout({
      initialBalance: balance1BeforeBet,
      betAmount: user1BetAmount,
      gasCost: user1GasCost,
      prizeAmount: amountToAddToUser1,
    })

    const expectedBalance2AfterPayout = calculateExpectedBalanceAfterPayout({
      initialBalance: balance2BeforeBet,
      betAmount: user2BetAmount,
      gasCost: user2GasCost,
      prizeAmount: amountToAddToUser2,
    })

    expect(balance1AfterPayout).to.equal(expectedBalance1AfterPayout)
    expect(balance2AfterPayout).to.equal(expectedBalance2AfterPayout)
  }

  const functionalTest = () => {
    const multipliers = [0.01, 0.99, 1, 1.01, 1.37, 23, 99.99, 100]
    const amounts = [
      "0.0000000000000001", // 16 0s is the lower limit at a 0.01 multiplier
      "0.9999",
      "1.0001",
      "22.73",
      "93",
    ]

    const betSides = ["white", "black"]
    const winningSides = ["white", "black", "draw"]
    const userBetOrders = [
      ["user1", "user2"],
      ["user2", "user1"],
      ["user1"],
      ["user2"],
    ]

    multipliers.forEach((multiplier) => {
      amounts.forEach((amount) => {
        betSides.forEach((betSide) => {
          winningSides.forEach((winningSide) => {
            userBetOrders.forEach((userBetOrder) => {
              it(`Should succeed with a multiplier of ${multiplier}, amount of ${amount}, betSide of ${betSide}, winningSide of ${winningSide}, and bets placed in order by ${userBetOrder.length === 2 ? userBetOrder : "only " + userBetOrder}`, async () => {
                await placeBetAndCheckBalances(
                  multiplier,
                  amount,
                  betSide,
                  winningSide,
                  userBetOrder,
                )
              })
            })
          })
        })
      })
    })
  }

  functionalTest()
})

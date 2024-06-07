const { ethers } = require("hardhat")
const { randomUUID } = require("crypto")
const { BigNumber } = require("ethers")

const admin = require("firebase-admin")
require("dotenv").config({ path: "../.env" })
const env = process.env.VITE_BRANCH_ENV
const isLocal = env === "develop"
const adminSdk = process.env.VITE_FIREBASE_ADMIN_SDK

const cred = isLocal
  ? admin.credential.cert(require(`../../${adminSdk}`))
  : admin.credential.applicationDefault()

admin.initializeApp({ credential: cred })
const db = admin.firestore()

const deployContract = async () => {
  const contractRef = db.collection("contracts")

  await hre.network.provider.send("hardhat_reset")
  const ChessWagerContract = await ethers.getContractFactory("ChessWager")
  const contract = await ChessWagerContract.deploy()
  const [owner, account1, account2] = await ethers.getSigners()
  return { contract, owner, account1, account2, contractRef }
}

const generateBetDetails = (
  account1,
  account2,
  multiplier = 1,
  betSide = "white",
  amount = "93",
) => {
  const gameId = randomUUID()
  const timestamp = new Date() / 1000
  const bigAmount = ethers.utils.parseEther(amount.toString())

  const betUser1 = {
    amount: bigAmount,
    betSide: betSide,
    user1Id: "testUid1",
    user1Metamask: account1.address,
    user2Id: "testUid2",
    user2Metamask: account2.address,
    multiplier: multiplier * 100,
    gameId: gameId,
    timestamp: BigNumber.from(timestamp.toFixed(0)),
  }

  const betUser2 = {
    ...betUser1,
  }

  const betId = randomUUID()
  const bigAmountUser2 = bigAmount
    .mul(BigNumber.from((multiplier * 100).toFixed(0)))
    .div(100)

  const user1Overrides = {
    value: bigAmount,
  }

  const user2Overrides = {
    value: bigAmountUser2,
  }

  return {
    betUser1,
    betUser2,
    betId,
    gameId,
    user1Overrides,
    user2Overrides,
  }
}

const placeBet = async (bet, betId, overrides, account) => {
  const txResponse = await contract
    .connect(account)
    .placeBet(bet, betId, overrides)
  return txResponse.wait()
}

const calculateGasUsed = (txReceipt) =>
  txReceipt.gasUsed.mul(txReceipt.effectiveGasPrice)

const getBalance = async (account) =>
  await ethers.provider.getBalance(account.address)

const placeBetsAndGetGas = async (betDetails, userBetOrder) => {
  let txReceipt1, txReceipt2
  for (userToBet of userBetOrder) {
    if (userToBet === "user1") {
      txReceipt1 = await placeBet(
        betDetails.betUser1,
        betDetails.betId,
        betDetails.user1Overrides,
        account1,
      )
    } else {
      txReceipt2 = await placeBet(
        betDetails.betUser2,
        betDetails.betId,
        betDetails.user2Overrides,
        account2,
      )
    }
  }

  const user1GasCost = txReceipt1
    ? calculateGasUsed(txReceipt1)
    : ethers.constants.Zero
  const user2GasCost = txReceipt2
    ? calculateGasUsed(txReceipt2)
    : ethers.constants.Zero

  return { user1GasCost, user2GasCost }
}

const payWinnersAndGetGas = async (gameId, winningSide) => {
  const payWinnersTxResponse = await contract.payWinners(gameId, winningSide)
  const payWinnersTxReceipt = await payWinnersTxResponse.wait()
  return calculateGasUsed(payWinnersTxReceipt)
}

const fullBetWithPayout = async (
  account1,
  account2,
  multiplier = 1,
  amount = "93",
  betSide = "white",
  winningSide = "white",
  userBetOrder = ["user1", "user2"],
) => {
  const betDetails = generateBetDetails(
    account1,
    account2,
    multiplier,
    betSide,
    amount,
  )
  const balance1BeforeBet = await getBalance(account1)
  const balance2BeforeBet = await getBalance(account2)
  const { user1GasCost, user2GasCost } = await placeBetsAndGetGas(
    betDetails,
    userBetOrder,
  )
  const balance1AfterBet = await getBalance(account1)
  const balance2AfterBet = await getBalance(account2)
  const payoutGasCost = await payWinnersAndGetGas(
    betDetails.gameId,
    winningSide,
  )
  const balance1AfterPayout = await getBalance(account1)
  const balance2AfterPayout = await getBalance(account2)
  const gasUsedForBets = user1GasCost.add(user2GasCost)
  const totalGasCost = gasUsedForBets.add(payoutGasCost)

  const bigAmount = betDetails.betUser1.amount
  const prizePool = bigAmount.add(
    bigAmount.mul(BigNumber.from(multiplier * 100)).div(100),
  )
  const vig = prizePool.mul(9).div(2).div(100)

  return {
    betDetails,
    totalGasCost,
    payoutGasCost,
    user1GasCost,
    user2GasCost,
    balance1BeforeBet,
    balance2BeforeBet,
    balance1AfterBet,
    balance2AfterBet,
    balance1AfterPayout,
    balance2AfterPayout,
    prizePool,
    vig,
  }
}

module.exports = { deployContract, generateBetDetails, fullBetWithPayout }

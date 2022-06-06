const { expect } = require("chai")
const { ethers } = require("hardhat")

const admin = require("firebase-admin")
require("dotenv").config({ path: "../.env" })
const env = process.env.VITE_BRANCH_ENV
const isLocal = env === "develop"
const adminSdk = process.env.VITE_FIREBASE_ADMIN_SDK

const { randomUUID } = require("crypto")
const { BigNumber } = require("ethers")

let cred
if (isLocal) {
  const serviceAccount = require(`../../${adminSdk}`)
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

admin.initializeApp({ credential: cred })

const db = admin.firestore()
const contractRef = db.collection("contracts")

let contract, owner, account1, account2
beforeEach(async () => {
  await hre.network.provider.send("hardhat_reset")
  const ChessWagerContract = await ethers.getContractFactory("ChessWager")
  contract = await ChessWagerContract.deploy()
  ;[owner, account1, account2] = await ethers.getSigners()
})

describe("Deployment", () => {
  it("Should set the correct owner", async () => {
    expect(await contract.owner()).to.equal(owner.address)
  })
  it("Should write the new contract address to firebase", async () => {
    await contractRef.doc(contract.address).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      address: contract.address,
    })
    contractRef
      .doc(contract.address)
      .get()
      .then((doc) => {
        expect(doc.data().address).to.equal(contract.address)
        expect(doc.data().address).to.not.equal(undefined)
        expect(doc.data().address).to.not.equal(null)
      })
  })
})

describe("Placing Bets", async () => {
  it("Should send bet data to contract and pay winners", async () => {
    const multiplier = 1
    const gameId = randomUUID()
    const timestamp = new Date() / 1000
    const amount = "100"
    const bigAmount = ethers.utils.parseEther(amount.toString())
    const betUser1 = {
      amount: bigAmount,
      betSide: "white",
      user1Id: "testUid1",
      user1Metamask: account1.address,
      user2Id: "testUid2",
      user2Metamask: account2.address,
      multiplier: multiplier * 100,
      gameId: gameId,
      timestamp: BigNumber.from(timestamp.toFixed(0)),
    }

    const betUser2 = {
      amount: bigAmount,
      betSide: "white",
      user1Id: "testUid1",
      user1Metamask: account1.address,
      user2Id: "testUid2",
      user2Metamask: account2.address,
      multiplier: multiplier * 100,
      gameId: gameId,
      timestamp: BigNumber.from(timestamp.toFixed(0)),
    }

    const betId = randomUUID()
    const overrides = {
      value: bigAmount,
    }

    const balance1BeforeBet = await ethers.provider.getBalance(account1.address)
    const balance2BeforeBet = await ethers.provider.getBalance(account2.address)

    expect(balance1BeforeBet).to.equal(balance2BeforeBet)

    await contract
      .connect(account1)
      .placeBet(betUser1, betId, overrides)
      .catch(console.error)

    await contract
      .connect(account2)
      .placeBet(betUser2, betId, overrides)
      .catch(console.error)

    const balance1AfterBet = await ethers.provider.getBalance(account1.address)
    const balance2AfterBet = await ethers.provider.getBalance(account2.address)

    expect(balance1BeforeBet).to.equal(balance1BeforeBet)
    expect(balance1BeforeBet).to.not.equal(balance1AfterBet)
    expect(balance2BeforeBet).to.not.equal(balance2AfterBet)

    await contract.payWinners(gameId, "white").catch(console.error)

    const balance1AfterPay = await ethers.provider.getBalance(account1.address)

    expect(balance1AfterBet).to.be.lt(balance1AfterPay)
  })

  it("Should work with a mulitplier", async () => {
    const multiplier = 1.4
    const gameId = randomUUID()
    const timestamp = new Date() / 1000
    const amount = "100"
    const bigAmount = ethers.utils.parseEther(amount.toString())
    const bigAmountUser2 = ethers.utils.parseEther(
      (amount * multiplier).toString(),
    )
    const betUser1 = {
      amount: bigAmount,
      betSide: "white",
      user1Id: "testUid1",
      user1Metamask: account1.address,
      user2Id: "testUid2",
      user2Metamask: account2.address,
      multiplier: multiplier * 100,
      gameId: gameId,
      timestamp: BigNumber.from(timestamp.toFixed(0)),
    }

    const betUser2 = {
      amount: bigAmount,
      betSide: "white",
      user1Id: "testUid1",
      user1Metamask: account1.address,
      user2Id: "testUid2",
      user2Metamask: account2.address,
      multiplier: multiplier * 100,
      gameId: gameId,
      timestamp: BigNumber.from(timestamp.toFixed(0)),
    }

    const overridesForUser1 = {
      value: bigAmount,
    }

    const overridesForUser2 = {
      value: bigAmountUser2,
    }

    const balance1BeforeBet = await ethers.provider.getBalance(account1.address)
    const balance2BeforeBet = await ethers.provider.getBalance(account2.address)

    expect(balance1BeforeBet).to.equal(balance2BeforeBet)

    const betId = randomUUID()

    await contract
      .connect(account1)
      .placeBet(betUser1, betId, overridesForUser1)
      .catch(console.error)

    await contract
      .connect(account2)
      .placeBet(betUser2, betId, overridesForUser2)
      .catch(console.error)

    const balance1AfterBet = await ethers.provider.getBalance(account1.address)
    const balance2AfterBet = await ethers.provider.getBalance(account2.address)

    expect(balance1BeforeBet).to.equal(balance1BeforeBet)
    expect(balance1BeforeBet).to.not.equal(balance1AfterBet)
    expect(balance2BeforeBet).to.not.equal(balance2AfterBet)

    await contract.payWinners(gameId, "white").catch(console.error)

    const balance1AfterPay = await ethers.provider.getBalance(account1.address)

    expect(balance1AfterBet).to.be.lt(balance1AfterPay)
  })

  it("Shouldn't allow bets on already paid out games", async () => {})
})

describe("Balances", () => {
  it("Should increase after 2 users bet on a game and get paid", async () => {})
  it("Should allow withdrawls", async () => {
    // 2 players should bet
    // payout should happen
    // check balance from contract
    // check balance of owner
    contract.withdrawChessWagerBalance()
    // check owner balance, should be equal to balance of owner + balance from contract - gas
  })
  it("Should allow balance checking", async () => {
    expect(await contract.viewChessWagerBalance()).to.equal(0)
  })
})

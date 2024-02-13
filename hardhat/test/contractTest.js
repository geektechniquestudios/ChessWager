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
    const multiplier = 1.37
    const gameId = randomUUID()
    const timestamp = new Date() / 1000
    const amount = "93"
    const bigAmount = ethers.utils.parseEther(amount.toString())
    const bigAmountUser2 = bigAmount
      .mul(BigNumber.from((multiplier * 100).toFixed(0)))
      .div(100)

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

  it("Should not allow bets on already paid out games", async () => {
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

    await expect(contract.payWinners(gameId, "white")).to.be.reverted
  })
})

describe("Balances", () => {
  it("Should increase after 2 users bet on a game and get paid", async () => {
    expect(await contract.viewChessWagerBalance()).to.equal(0)
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

    await contract
      .connect(account1)
      .placeBet(betUser1, betId, overrides)
      .catch(console.error)

    await contract
      .connect(account2)
      .placeBet(betUser2, betId, overrides)
      .catch(console.error)

    await contract.payWinners(gameId, "white").catch(console.error)

    expect(await contract.viewChessWagerBalance()).to.be.gt(0)
  })

  it("Should allow withdrawls", async () => {
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

    await contract
      .connect(account1)
      .placeBet(betUser1, betId, overrides)
      .catch(console.error)

    await contract
      .connect(account2)
      .placeBet(betUser2, betId, overrides)
      .catch(console.error)

    await contract.payWinners(gameId, "white")

    expect(await contract.viewChessWagerBalance()).to.be.gt(0)

    const originalOwnerBalance = await ethers.provider.getBalance(owner.address)
    contract.withdrawChessWagerBalance()

    expect(await contract.viewChessWagerBalance()).to.equal(0)

    const newOwnerBalance = await ethers.provider.getBalance(owner.address)
    expect(newOwnerBalance).to.be.gt(originalOwnerBalance)
  })

  it("Should allow balance checking", async () => {
    expect(await contract.viewChessWagerBalance()).to.equal(0)
  })

  it("Should not allow non-owners to withdraw", async () => {
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

    await contract
      .connect(account1)
      .placeBet(betUser1, betId, overrides)
      .catch(console.error)

    await contract
      .connect(account2)
      .placeBet(betUser2, betId, overrides)
      .catch(console.error)

    await contract.payWinners(gameId, "white").catch(console.error)

    expect(await contract.viewChessWagerBalance()).to.be.gt(0)

    await expect(contract.connect(account1).withdrawChessWagerBalance()).to.be
      .reverted
  })
})

describe("Banning Users", () => {
  it("Should not allow banned users to bet", async () => {
    const userToBan = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const multiplier = 1
    const gameId = randomUUID()
    const timestamp = new Date() / 1000
    const amount = "100"
    const bigAmount = ethers.utils.parseEther(amount.toString())
    const betUser1 = {
      amount: bigAmount,
      betSide: "white",
      user1Id: "testUid1",
      user1Metamask: userToBan,
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
      user2Metamask: userToBan,
      multiplier: multiplier * 100,
      gameId: gameId,
      timestamp: BigNumber.from(timestamp.toFixed(0)),
    }

    const betId = randomUUID()
    const overrides = {
      value: bigAmount,
    }

    await contract.banUserByWalletAddress(userToBan)

    await expect(
      contract.connect(account1).placeBet(betUser1, betId, overrides),
    ).to.be.reverted

    await expect(
      contract.connect(account2).placeBet(betUser2, betId, overrides),
    ).to.be.reverted
  })

  it("Should not allow normal users to bet against banned users", async () => {
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

    await contract.banUserByWalletAddress(account2.address)

    await expect(
      contract.connect(account1).placeBet(betUser1, betId, overrides),
    ).to.be.reverted

    await expect(
      contract.connect(account2).placeBet(betUser2, betId, overrides),
    ).to.be.reverted
  })

  it("Should not allow non-owners to ban users", async () => {
    const userToBan = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    await expect(contract.connect(account1).banUserByWalletAddress(userToBan))
      .to.be.reverted
  })
})

const { expect } = require("chai")
const { ethers, waffle } = require("hardhat")

const admin = require("firebase-admin")
require("dotenv").config({ path: "../.env" })
const env = process.env.VITE_BRANCH_ENV
const isLocal = env === "develop"
const adminSdk = process.env.VITE_FIREBASE_ADMIN_SDK

const Wallet = hre.ethers.Wallet
const Contract = hre.ethers.Contract
const providers = hre.ethers.providers

const ChessWager = require("../../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
const { randomUUID } = require("crypto")
const { BigNumber } = require("ethers")
const contractABI = ChessWager.abi
const metamaskKey = process.env.VITE_METAMASK_ACCOUNT_KEY

const provider = new providers.JsonRpcProvider("http://127.0.0.1:8545")
const wallet = new Wallet(metamaskKey, provider)
// const contract = new Contract(contractAddress, contractABI, wallet)

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

describe("Deployment", () => {
  let chessWager, owner, contractAddress, address1, address2
  beforeEach(async () => {
    const ChessWagerContract = await hre.ethers.getContractFactory("ChessWager")
    chessWager = await ChessWagerContract.deploy()
    await chessWager.deployed()
    ;[owner, address1, address2] = await hre.ethers.getSigners()
  })

  it("Should set the correct owner", async () => {
    expect(await chessWager.owner()).to.equal(owner.address)
  })
  it("Should write the new contract address to firebase", async () => {
    await contractRef.doc(chessWager.address).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      address: chessWager.address,
    })
    contractRef
      .doc(chessWager.address)
      .get()
      .then((doc) => {
        expect(doc.data().address).to.equal(chessWager.address)
        expect(doc.data().address).to.not.equal(undefined)
        expect(doc.data().address).to.not.equal(null)
      })
  })
})

describe("Placing Bets", async () => {
  let chessWager, owner, contractAddress, account1, account2
  beforeEach(async () => {
    const ChessWagerContract = await ethers.getContractFactory("ChessWager")
    chessWager = await ChessWagerContract.deploy()
    ;[owner, account1, account2] = await ethers.getSigners()
    await chessWager.deployed(owner.address)
  })
  // it("Should send bet data to contract and pay winners", async () => {
  //   const multiplier = 1
  //   const gameId = randomUUID()
  //   const timestamp = new Date() / 1000
  //   const amount = ethers.utils.parseEther("0.1")
  //   const bigAmount = ethers.utils.parseEther(amount.toString())
  //   const betUser1 = {
  //     // amount: ethers.utils.parseEther(amount.toString()),
  //     amount: bigAmount,
  //     betSide: "white",
  //     user1Id: "testUid1",
  //     user1Metamask: account1.address,
  //     user2Id: "testUid2",
  //     user2Metamask: account2.address,
  //     multiplier: multiplier * 100,
  //     gameId: gameId,
  //     timestamp: BigNumber.from(timestamp.toFixed(0)),
  //   }
  //   // const betUser2 = {
  //   // amount: ethers.utils.parseEther(amount.toString()),
  //   // betSide: "white",
  //   // user1Id: "testUid1",
  //   // user1Metamask: account1.address,
  //   // user2Id: "testUid2",
  //   // user2Metamask: account2.address,
  //   // multiplier: multiplier * 100,
  //   // gameId: gameId,
  //   // timestamp: timestamp,
  //   // }

  //   const betId = randomUUID()
  //   const overrides = {
  //     value: bigAmount,
  //   }

  //   const balance1 = await ethers.provider.getBalance(account1.address)
  //   const balance2 = await ethers.provider.getBalance(account2.address)

  //   // console.log(balance1.toString(), balance2.toString())
  //   expect(balance1).to.equal(balance2)

  //   // chessWager.payWinners(gameId, "white").then(() => {
  //   //   expect(waffle.provider.getBalance(address1.address)).to.equal(
  //   //     waffle.provider.getBalance(address2.address),
  //   //   )
  //   // })

  //   chessWager
  //     .connect(account1)
  //     .placeBet(betUser1, betId, overrides)
  //     .catch(console.error)

  //   //   chessWager.connect(address2).placeBet(betUser2, betId, { value: 1 })
  //   //   chessWager.payWinners(gameId, "white").then(() => {
  //   //     expect(hre.ethers.provider.getBalance(address1)).to.not.equal(
  //   //       hre.ethers.provider.getBalance(address2),
  //   //     )
  //   //   })
  // })

  it("Should work with a mulitplier", async () => {})
  it("Shouldn't allow bets on already paid out games", async () => {})
  it("Should use a timing mechanism", async () => {})
})

describe("Balances", () => {
  let contract, owner, contractAddress, address1, address2
  beforeEach(async () => {
    const ChessWagerContract = await ethers.getContractFactory("ChessWager")
    contract = await ChessWagerContract.deploy()
    await contract.deployed()
    ;[owner, address1, address2] = await ethers.getSigners()
  })
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

// describe("tbd", () => {
//   it("Should", () => {})
// })

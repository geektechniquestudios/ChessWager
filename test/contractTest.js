const { expect } = require("chai")
const hre = require("hardhat")

const admin = require("firebase-admin")
require("dotenv").config({ path: "../.env" })
const env = process.env.BRANCH_ENV
const isLocal = env === "develop"
const adminSdk = process.env.FIREBASE_ADMIN_SDK

const Wallet = hre.ethers.Wallet
const Contract = hre.ethers.Contract
const providers = hre.ethers.providers

const ChessWager = require("../src/artifacts/contracts/ChessWager.sol/ChessWager.json")
const contractABI = ChessWager.abi
const metamaskKey = process.env.METAMASK_ACCOUNT_KEY

const provider = new providers.JsonRpcProvider("http://127.0.0.1:8545")
const wallet = new Wallet(metamaskKey, provider)
// const contract = new Contract(contractAddress, contractABI, wallet)


let cred
if (isLocal) {
  const serviceAccount = require(`../${adminSdk}`)
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

admin.initializeApp({ credential: cred })

const db = admin.firestore()
const contractRef = db.collection("contracts")

let chessWager, owner, contractAddress

describe("Deployment", () => {
  beforeEach(async () => {
    const ChessWagerContract = await hre.ethers.getContractFactory("ChessWager")
    chessWager = await ChessWagerContract.deploy()
    await chessWager.deployed()
    ;[owner] = await hre.ethers.getSigners()
  })

  it("Should write the new contract address to firebase", async () => {
    contractRef
      .doc(chessWager.address)
      .get()
      .then((doc) => {
        expect(doc.data().address).to.equal(chessWager.address)
      })
  })

  it("Should set the correct owner", async () => {
    expect(await chessWager.owner()).to.equal(owner.address)
  })
})

describe("Placing Bets", () => {
  it("Should ", () => {
    
  })
})

// describe("tbd", () => {
//   it("Should", () => {})
// })

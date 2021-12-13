// @ts-ignore
const { expect } = require("chai")
const hre = require("hardhat")

const admin = require("firebase-admin")
require("dotenv").config({ path: "../.env" })
const env = process.env.BRANCH_ENV
const isLocal = env === "develop"
const adminSdk = process.env.FIREBASE_ADMIN_SDK

let cred: any
if (isLocal) {
  const serviceAccount = require(`../${adminSdk}`)
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

admin.initializeApp({ credential: cred })

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter")
//     const greeter = await Greeter.deploy("Hello, world!")
//     await greeter.deployed()

//     expect(await greeter.greet()).to.equal("Hello, world!")

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!")

//     // wait until the transaction is mined
//     await setGreetingTx.wait()

//     expect(await greeter.greet()).to.equal("Hola, mundo!")
//   })
// })

const getContractRef = () => {
  const db = admin.firestore()
  const contractRef = db.collection("contracts")
  return contractRef
}

describe("Deployment", () => {
  it("Should compare the contract address to the database stored address", async () => {
    const ChessWagerContract = await hre.ethers.getContractFactory("ChessWager")
    const chessWager = await ChessWagerContract.deploy()
    await chessWager.deployed()
    const contractRef = getContractRef()
    contractRef
      .doc(chessWager.address)
      .get()
      .then((doc: any) => {
        expect(doc.data().address).to.equal(chessWager.address)
      })
  })
})

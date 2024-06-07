const hre = require("hardhat")
const admin = require("firebase-admin")
const env = process.env.VITE_BRANCH_ENV
const isLocal = env === "develop"
const adminSdk = process.env.VITE_FIREBASE_ADMIN_SDK
const setEnvValue = require("../../updateEnv.js")
require("dotenv").config({ path: "../../.env" })

const credential = isLocal
  ? admin.credential.cert(require(`../../${adminSdk}`))
  : admin.credential.applicationDefault()

admin.initializeApp({ credential })

const db = admin.firestore()

const contractRef = db.collection("contracts")

async function main() {
  const ChessWagerContract = await hre.ethers.getContractFactory("ChessWager")
  const chessWager = await ChessWagerContract.deploy()
  await chessWager.deployed()

  console.log(`ChessWager ${env} deployed to: ${chessWager.address}`)
  setEnvValue("VITE_CONTRACT_ADDRESS", chessWager.address)

  if (env === "develop" || env === "test" || env === "main") {
    await contractRef.doc(chessWager.address).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    console.log("Contract address written to database")
  } else {
    throw new Error(
      "Please set the environment variable for branch_env to develop, test, or main",
    )
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")
const admin = require("firebase-admin")

const credValue = process.env.CRED_VALUE
const prodOrDev = process.env.PROD_OR_DEV

let cred
if (credValue === "local") {
  const serviceAccount = require("../chesswager-bd3a6-firebase-adminsdk-tyh7t-4a018b8183.json")
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

admin.initializeApp({ credential: cred })

const db = admin.firestore()

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const ChessWager = await hre.ethers.getContractFactory("ChessWager")
  const chessWager = await ChessWager.deploy()

  await chessWager.deployed()

  console.log(`ChessWager ${prodOrDev} deployed to: ${chessWager.address}`)
  const contractRef = db.collection("contracts").doc(prodOrDev)

  if (prodOrDev === "dev" || prodOrDev === "prod") {
    await contractRef.set({
      address: chessWager.address,
    })
  } else {
    throw new Error(
      "Please set the environment variable PROD_OR_DEV to either 'dev' or 'prod'",
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

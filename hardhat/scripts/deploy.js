// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")
const admin = require("firebase-admin")

const env = process.env.BRANCH_ENV
const isLocal = env === "local"

let cred
if (isLocal) {
  const serviceAccount = require("../../chess-wager-test-firebase-adminsdk-hl438-a310055ae5.json")
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

  const shouldDeploy = process.env.CI_SHOULD_DEPLOY_CONTRACT === "true"
  if (!shouldDeploy) {
    console.log("Skipping contract deployment because the CI_SHOULD_DEPLOY_CONTRACT environment variable is set to false")  
    process.exit(0)
  }

  const ChessWager = await hre.ethers.getContractFactory("ChessWager")
  const chessWager = await ChessWager.deploy()

  await chessWager.deployed()

  console.log(`ChessWager ${env} deployed to: ${chessWager.address}`)
  
  // process.env.REACT_APP_CONTRACT_ADDRESS = chessWager.address
  
  const contractRef = db.collection("contracts").doc(env)

  if (env === "develop") {
    await contractRef.set({
      address: chessWager.address,
    })
  } else if (env === "test") {
    await contractRef.set({
      address: chessWager.address,
    })
  } else if (env === "main") {
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

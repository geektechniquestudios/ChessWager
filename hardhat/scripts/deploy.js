// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const fs = require("fs")
const os = require("os")
const hre = require("hardhat")
const admin = require("firebase-admin")
require("dotenv").config({ path: "../../.env" })
const env = process.env.BRANCH_ENV
const isLocal = env === "develop"
const adminSdk = process.env.FIREBASE_ADMIN_SDK

let cred
if (isLocal) {
  const serviceAccount = require(`../../${adminSdk}`)
  cred = admin.credential.cert(serviceAccount)
} else {
  cred = admin.credential.applicationDefault()
}

admin.initializeApp({ credential: cred })

const db = admin.firestore()

function setEnvValue(key, value) {
  // read file from hdd & split if from a linebreak to a array
  const ENV_VARS = fs.readFileSync(".env", "utf8").split(os.EOL)

  // find the env we want based on the key
  const target = ENV_VARS.indexOf(
    ENV_VARS.find((line) => {
      return line.match(new RegExp(key))
    }),
  )

  // replace the key/value with the new value
  ENV_VARS.splice(target, 1, `${key}=${value}`)

  // write everything back to the file system
  fs.writeFileSync("./.env", ENV_VARS.join(os.EOL))
}

const contractRef = db.collection("contracts").doc("mainContract")

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const shouldDeploy = process.env.CI_SHOULD_DEPLOY_CONTRACT === "true"
  if (!shouldDeploy) {
    console.log(
      "Skipping contract deployment because the CI_SHOULD_DEPLOY_CONTRACT environment variable is set to false",
    )
    await contractRef.get().then(doc => {
      setEnvValue("REACT_APP_CONTRACT_ADDRESS", doc.data().address)  
    })
    console.log("Local .env updated to reflect contract address stored in database")
    process.exit(0)
  }

  const ChessWagerContract = await hre.ethers.getContractFactory("ChessWager")
  const chessWager = await ChessWagerContract.deploy()
  await chessWager.deployed()

  console.log(`ChessWager ${env} deployed to: ${chessWager.address}`)
  setEnvValue("REACT_APP_CONTRACT_ADDRESS", chessWager.address)
  console.log("Contract address written to database")

  if (env === "develop" || env === "test" || env === "main") {
    await contractRef.set({
      address: chessWager.address,
    })
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

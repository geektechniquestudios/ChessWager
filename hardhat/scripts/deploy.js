const fs = require("fs")
const os = require("os")
const hre = require("hardhat")
const admin = require("firebase-admin")
const env = process.env.BRANCH_ENV
const isLocal = env === "develop"
const adminSdk = process.env.FIREBASE_ADMIN_SDK
require("dotenv").config({ path: "../../.env" })

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

const contractRef = db.collection("contracts")

async function main() {
  const ChessWagerContract = await hre.ethers.getContractFactory("ChessWager")
  const chessWager = await ChessWagerContract.deploy()
  await chessWager.deployed()

  console.log(`ChessWager ${env} deployed to: ${chessWager.address}`)
  setEnvValue("REACT_APP_CONTRACT_ADDRESS", chessWager.address)
  console.log("Contract address written to database")

  if (env === "develop" || env === "test" || env === "main") {
    await contractRef.doc(chessWager.address).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
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

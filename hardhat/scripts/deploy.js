const fs = require("fs")
const os = require("os")
const hre = require("hardhat")
const admin = require("firebase-admin")
const env = process.env.VITE_BRANCH_ENV
const isLocal = env === "develop"
const adminSdk = process.env.VITE_FIREBASE_ADMIN_SDK
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
  const filePath = ".env"
  const fileContents = fs.readFileSync(filePath, "utf8")

  // Split the file contents into an array of lines
  const lines = fileContents.split(/\r?\n/)

  // Find the index of the line that starts with the key
  const targetLineIndex = lines.findIndex((line) => line.startsWith(`${key}=`))

  if (targetLineIndex !== -1) {
    // Replace the value of the target line with the new value
    lines[targetLineIndex] = `${key}=${value}`
  } else {
    // Append the new key/value pair to the end of the file
    lines.push(`${key}=${value}`)
  }

  // Write the modified contents back to the file
  fs.writeFileSync(filePath, lines.join("\n"))
}

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

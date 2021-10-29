// import firebase from "firebase/compat"
import ndjson from "ndjson"
import fetch from "node-fetch"

var Web3 = require("web3")
const Provider = require("@truffle/hdwallet-provider")

const hyperquest = require("hyperquest")
// const admin = require("firebase-admin")

// const serviceAccount = require("../../../chesswager-bd3a6-firebase-adminsdk-tyh7t-4a018b8183.json")

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   // credential: admin.credential.cert(serviceAccount),
// })


const callLichessLiveTv = () => {
  let lastGameId = ""
  let gameId = ""
  hyperquest("https://lichess.org/api/tv/feed")
    .pipe(ndjson.parse())
    .on("data", (obj: any) => {
      if (obj.t === "featured") { // new game
        lastGameId = gameId
        gameId = obj.d.id
        // call lichess for game data from gameId
        fetch(`https://lichess.org/api/game/${lastGameId}`)
          .then(res => res.json())
          .then(gameData => {
            // check if game has been completed
            if (gameData.hasOwnProperty("winner")) {
              console.log("game is over, checking for winners")
              const whiteWins = gameData.winner === "white"
              const blackWins = gameData.winner === "black"
              if (whiteWins) {
                console.log("white wins")
                payWinnersContractCall(lastGameId, "white")
              } else if (blackWins) {
                console.log("black wins")
                payWinnersContractCall(lastGameId, "black")
              }
            } else if (obj.status === "draw" || obj.status === "stalemate") {
              console.log("game is a draw")
              payWinnersContractCall(lastGameId, "draw")
            }  else {
              // something is wrong, game is not over
              console.log("game is not over")
            }
          })
      } else {
        console.log("players moving ", obj)
      }
    })
}

const contractAddress = "0x4A799c24dDb3c23ee0a21D2f2B1e62cBdF6dFb99"
const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "TestEvent",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "betSide",
            type: "string",
          },
          {
            internalType: "string",
            name: "user1Id",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "user1Metamask",
            type: "address",
          },
          {
            internalType: "string",
            name: "user2Id",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "user2Metamask",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "multiplier",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "gameId",
            type: "string",
          },
        ],
        internalType: "struct ChessWager.Bet",
        name: "_bet",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "_betId",
        type: "string",
      },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "viewBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]
const metamaskAddress = process.env.METAMASK_ACCOUNT_ADDRESS
const metamaskKey = process.env.METAMASK_ACCOUNT_KEY
const rpcUrl = process.env.BSC_TESTNET_RPC_URL

const payWinnersContractCall = async (gameId: string, winningSide: string) => {
  console.log(
    "paying out winners for game ",
    gameId,
    " with winning side ",
    winningSide
  )
  const provider = new Provider(metamaskKey, rpcUrl)
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(contractABI, contractAddress)
  const payWinners = await contract.methods
    .payWinners(gameId, winningSide)
    .send({from: metamaskAddress})
  console.log("payout transaction hash: ", payWinners.transactionHash)
}

callLichessLiveTv()

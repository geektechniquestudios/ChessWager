import { useState } from "react"
import { ethers } from "ethers"

import ChessWager from "../../../../../artifacts/contracts/ChessWager.sol/ChessWager.json"
import { GameData } from "../../../../../interfaces/GameData"
import Swal from "sweetalert2"

declare let window: any
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

interface Props {}

export const MissedPaymentArea: React.FC<Props> = ({}) => {
  const [gameId, setGameId] = useState<string>("")

  // use this version for mainnet inclusion
  // const isCorrectBlockchain = async (
  //   provider: ethers.providers.Web3Provider,
  // ) => {
  //   const { chainId } = await provider.getNetwork()
  //   if (isLocal && chainId !== 43113) {
  // Swal.fire({
  //   icon: "error",
  //   title: "Wrong network!",
  //   text: "You are on the wrong network. Please switch to the fuji network.",
  // })
  //     return false
  //   }
  //   else if (!isLocal && chainId !== 43114) {
  // Swal.fire({
  //   icon: "error",
  //   title: "Wrong network!",
  //   text: "You are on the wrong network. Please switch to the fuji network.",
  // })
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // }

  //
  // use this version until mainnet

  const sendPayment = async () => {
    const fetchWinner = async () => {
      const winner = await fetch(`https://lichess.org/api/game/${gameId}`)
        .then((res) => res.json())
        .then((gameData: GameData) => {
          if (gameData.winner === "white") return "white"
          else if (gameData.winner === "black") return "black"
          else if (gameData.status === "draw") return "draw"
          else throw Error("Game is not over yet.")
        })
        .catch(console.error)
      if (winner === undefined) throw Error("winner is undefined")
      return winner as "white" | "black" | "draw"
    }

    const callSmartContract = async (winner: "white" | "black" | "draw") => {
      const isCorrectBlockchain = async (
        provider: ethers.providers.Web3Provider,
      ) => {
        const { chainId } = await provider.getNetwork()
        if (chainId !== 43113) {
          Swal.fire({
            icon: "error",
            title: "Wrong network!",
            text: "You are on the wrong network. Please switch to the fuji network.",
          })
          return false
        } else {
          return true
        }
      }

      if (typeof window.ethereum !== undefined) {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
        const contract = new ethers.Contract(
          contractAddress,
          ChessWager.abi,
          signer,
        )
        try {
          if (!(await isCorrectBlockchain(provider))) {
            return
          }
          const transaction = await contract.payWinners(gameId, winner)
          transaction.wait().then(() => {
            contract.removeAllListeners()
          })
        } catch (err) {
          contract.removeAllListeners()
          console.error(err)
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Metamask not connected.",
        })
      }
    }

    fetchWinner().then(callSmartContract)
  }

  return (
    <div className="flex h-60 w-full justify-center rounded-md border-stone-300">
      <fieldset className="mx-auto flex">
        <form
          onSubmit={sendPayment}
          className="flex h-60 w-60 flex-col items-center justify-evenly"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              sendPayment()
            }
          }}
        >
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="inline-block h-10 w-48 resize-none rounded-sm bg-stone-300 p-2 text-lg outline-none dark:bg-stone-800 dark:text-stone-50"
            placeholder="Game ID"
            autoComplete="off"
          />
          <button
            id="submit-bet"
            className="color-shift clickable rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
            type="submit"
          >
            Send Payment
          </button>
        </form>
      </fieldset>
    </div>
  )
}

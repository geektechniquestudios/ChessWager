import { useState } from "react"
import { SideChooser } from "../../../../lobby/wager-form/SideChooser"
import { BigNumber, ethers } from "ethers"

import ChessWager from "../../../../../artifacts/contracts/ChessWager.sol/ChessWager.json"

declare let window: any
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

interface Props {}

export const MissedPaymentArea: React.FC<Props> = ({}) => {
  const [gameId, setGameId] = useState<string>("")
  const [winningSide, setWinningSide] = useState<"white" | "black">("white")

    // use this version for mainnet inclusion
  // const isCorrectBlockchain = async (
  //   provider: ethers.providers.Web3Provider,
  // ) => {
  //   const { chainId } = await provider.getNetwork()
  //   if (isLocal && chainId !== 43113) {
  //     alert("You are on the wrong network. Please switch to the fuji network.")
  //     return false
  //   }
  //   else if (!isLocal && chainId !== 43114) {
  //     alert(
  //       "You are on the wrong network. Please switch to the avalanche mainnet.",
  //     )
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // }

  //
  // use this version until mainnet

  const isCorrectBlockchain = async (
    provider: ethers.providers.Web3Provider,
  ) => {
    const { chainId } = await provider.getNetwork()
    if (chainId !== 43113) {
      alert("You are on the wrong network. Please switch to the fuji network.")
      return false
    } else {
      return true
    }
  }

  const sendPayment = async () => {
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
        const transaction = await contract.payWinners(gameId, winningSide)
        transaction.wait().then(() => {
          contract.removeAllListeners()
        })
      } catch (err) {
        contract.removeAllListeners()
        console.error(err)
      }
    } else {
      alert("Metamask not connected.")
    }
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
          <div className="w-48">
            <SideChooser betSide={winningSide} setBetSide={setWinningSide} />
          </div>
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

import { BigNumber, ethers } from "ethers"
import { useCallback, useEffect, useRef } from "react"
import { RiExchangeDollarLine } from "react-icons/ri"
import ChessWager from "../../artifacts/contracts/ChessWager.sol/ChessWager.json"
import { Auth } from "../containers/Auth"
require("dotenv").config({ path: ".env" })

interface Props {
  betId: string
  amount: number
  betSide: string
  multiplier: number
  user1Id: string
  user1Metamask: string
  user2Id: string
  user2Metamask: string
  gameId: string
  timestamp: number
  contractAddress: string
}

declare let window: any

export const MetamaskPrompt: React.FC<Props> = ({
  betId,
  amount,
  betSide,
  multiplier,
  user1Id,
  user1Metamask,
  user2Id,
  user2Metamask,
  gameId,
  timestamp,
  contractAddress,
}) => {
  const { auth } = Auth.useContainer()

  const bigAmount = ethers.utils.parseEther(amount.toString())

  const betAmountWei =
    auth.currentUser?.uid === user1Id
      ? bigAmount
      : bigAmount.mul(BigNumber.from((multiplier * 100).toFixed(0))).div(100)

  const contractRef: any = useRef()

  const sendBet = useCallback(async () => {
    const bet = {
      amount: bigAmount,
      betSide: betSide,
      user1Id: user1Id,
      user1Metamask: user1Metamask,
      user2Id: user2Id,
      user2Metamask: user2Metamask,
      multiplier: multiplier * 100,
      gameId: gameId,
      timestamp: BigNumber.from(timestamp),
    }

    const overrides = {
      value: betAmountWei,
      gasLimit: 1000000,
    }
    if (typeof window.ethereum !== undefined) {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer: any = provider.getSigner()
      contractRef.current = new ethers.Contract(
        contractAddress,
        ChessWager.abi,
        signer,
      )

      try {
        const transaction = await contractRef.current.placeBet(
          bet,
          betId,
          overrides,
        )
        await transaction.wait()
      } catch (err) {
        console.error(err)
      }
    } else {
      console.log("window.eth undefined!") // tell user to install metamask
    }
  }, [
    betAmountWei,
    betId,
    betSide,
    bigAmount,
    contractAddress,
    gameId,
    multiplier,
    timestamp,
    user1Id,
    user1Metamask,
    user2Id,
    user2Metamask,
  ])

  useEffect(() => {
    sendBet()
    return () => {
      try {
        contractRef.current.removeAllListeners()
      } catch (e) {
        console.error(e)
      }
    }
  }, [contractRef, sendBet]) //@todo fix dep issue

  return (
    <button
      className="border-2 mx-2 p-1 my-0.5 animate-pulse"
      onClick={() => {
        sendBet()
      }}
    >
      <div className="flex flex-col justify-evenly">
        <div className="flex justify-center">
          <RiExchangeDollarLine size="0.8rem" />
        </div>
        <p className="text-xs">pay</p>
      </div>
    </button>
  )
}

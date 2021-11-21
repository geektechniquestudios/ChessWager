import { BigNumber, ethers } from "ethers"
import { useEffect } from "react"
import ChessWager from "../../artifacts/contracts/ChessWager.sol/ChessWager.json"
import { Auth } from "../containers/Auth"
require("dotenv").config({path: ".env"})

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
}) => {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS!

  const { auth } = Auth.useContainer()

  const bigAmount = ethers.utils.parseEther(amount.toString())

  const betAmountWei =
    auth.currentUser?.uid === user1Id
      ? bigAmount
      : bigAmount.mul(BigNumber.from((multiplier * 100).toFixed(0))).div(100)

  const bet = {
    amount: ethers.utils.parseEther(amount.toString()),
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
  }

  let contract: ethers.Contract

  const sendBet = async () => {
    if (typeof window.ethereum !== undefined) {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer: any = provider.getSigner()
      contract = new ethers.Contract(contractAddress, ChessWager.abi, signer)

      try {
        const transaction = await contract.placeBet(bet, betId, overrides)
        await transaction.wait()
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log("window.eth undefined!") // tell user to install metamask
    }
  }

  useEffect(() => {
    // wait 2 seconds before sending the bet
    setTimeout(sendBet, 2000)
    // sendBet()
    return () => {
      try {
        contract.removeAllListeners()
      } catch (e) {
        console.error(e)
      }
    }
  }, []) //@todo fix dep issue, ?useCallback

  return (
    <button
      className="bet-button"
      onClick={() => {
        sendBet()
      }}
    >
      Metamask
    </button>
  )
}

import { ethers } from "ethers"
import { useEffect } from "react"
import ChessWager from "../../artifacts/contracts/ChessWager.sol/ChessWager.json"
import { Auth } from "../containers/Auth"
require("dotenv").config()

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
}

declare let window: any

const MetamaskPrompt: React.FC<Props> = ({
  betId,
  amount,
  betSide,
  multiplier,
  user1Id,
  user1Metamask,
  user2Id,
  user2Metamask,
  gameId,
}) => {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS!

  const { auth } = Auth.useContainer()

  const betAmount =
    auth.currentUser?.uid === user1Id ? amount : (amount * multiplier)  

  const bet = {
    amount: ethers.utils.parseEther(amount.toString()), 
    betSide: betSide,
    user1Id: user1Id,
    user1Metamask: user1Metamask,
    user2Id: user2Id,
    user2Metamask: user2Metamask,
    multiplier: multiplier * 100,
    gameId: gameId,
  }

  const overrides = {
    value: ethers.utils.parseEther(betAmount.toString()), //@todo ugly pointless parse. do it right, formatEther or something
  }

  let contract: ethers.Contract

  const sendBet = async () => {
    if (typeof window.ethereum !== undefined) {
      await window.ethereum.enable()
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
      console.log("window.eth undefined!")
    }
  }

  useEffect(() => {
    sendBet()
    return () => {
      contract.removeAllListeners()
    }
  }, []) //@todo fix dep issue, ?useCallback

  return <> </>
}

export default MetamaskPrompt

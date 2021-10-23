import { ethers } from "ethers"
import { useEffect } from "react"
import ChessWager from "../../artifacts/contracts/ChessWager.sol/ChessWager.json"

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
  const chessWagerAddress = "0xC8331Af2815e0Cf07cDfBB212bBdfBa4c6715e43" //@todo update to mainnet & make dynamic

  let bet = {
    amount: ethers.utils.parseEther(amount.toString()),
    betSide: betSide,
    user1Id: user1Id,
    user1Metamask: user1Metamask,
    user2Id: user2Id,
    user2Metamask: user2Metamask,
    multiplier: multiplier * 100,
    gameId: gameId,
  }

  let overrides = {
    value: ethers.utils.parseEther(amount.toString()), //@todo ugly pointless parse. do it right, formatEther or something
    // value: ethers.utils.parseEther("0.00001")
  }

  const sendBet = async () => {
    if (typeof window.ethereum !== undefined) {
      await window.ethereum.enable()
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.providers.Web3Provider(window.ethereum) //@todo fix memory leak, move this in useEffect, then contract.removeAllListeners()
      const signer: any = provider.getSigner()
      const contract = new ethers.Contract(
        chessWagerAddress,
        ChessWager.abi,
        signer
      )

      contract.on("TestEvent", message => {
        console.log(message)
      })

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
  }, []) //@todo fix memory leak, cleanup subscriptions when unrendered

  return <> </>
}

export default MetamaskPrompt

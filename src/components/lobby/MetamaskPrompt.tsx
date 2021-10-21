import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
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
}) => {
  const chessWagerAddress = "0x510878D2336D4635e4A8Fe953940d7b0E56e2B6f" //@todo update to mainnet & make dynamic

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }

  // const fetchGreeting = async () => {
  //   if (typeof window.ethereum !== undefined) {
  //     const provider: any = new ethers.providers.Web3Provider(window.ethereum)
  //     const contract = new ethers.Contract(
  //       chessWagerAddress,
  //       ChessWager.abi,
  //       provider
  //     )
  //     try {
  //       const data = await contract.greet()
  //       console.log("data: ", data)
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  // }
  // const sendGreeting = async () => {
  //   if (typeof window.ethereum !== undefined) {
  //     await requestAccount()
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const signer: any = provider.getSigner()
  //     const contract = new ethers.Contract(
  //       chessWagerAddress,
  //       ChessWager.abi,
  //       signer
  //     )
  //     const transaction = await contract.setGreeting("")
  //     await transaction.wait()
  //     fetchGreeting()
  //   }
  // }

  let bet = {
    amount: ethers.utils.parseEther(amount.toString()),
    betSide: betSide,
    user1Id: user1Id,
    user1Metamask: user1Metamask,
    user2Id: user2Id,
    user2Metamask: user2Metamask,
    multiplier: multiplier * 100,
  }

  let overrides = {
    value: ethers.utils.parseEther(amount.toString()),
    // value: ethers.utils.parseEther("0.00001")
  }

  const sendBet = async () => {
    if (typeof window.ethereum !== undefined) {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
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
    }
  }

  useEffect(() => {
    sendBet()
  }, []) //@todo fix memory leak, cleanup subscriptions when unrendered

  return <> </>
}

export default MetamaskPrompt

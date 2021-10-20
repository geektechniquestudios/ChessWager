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

const MetamaskPrompt: React.FC<Props> = () => {
  const chessWagerAddress = "0xcC443aEA6Df9cA2ffFA2801F246Cdd95A306a17a" //@todo update to mainnet & make dynamic

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }
  
  const fetchGreeting = async () => {
    if (typeof window.ethereum !== undefined) {
      const provider: any = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        chessWagerAddress,
        ChessWager.abi,
        provider
      )
      try {
        const data = await contract.greet()
        console.log("data: ", data)
      } catch (e) {
        console.error(e)
      }
    }
  }
  const sendGreeting = async () => {
    if (typeof window.ethereum !== undefined) {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer: any = provider.getSigner()
      const contract = new ethers.Contract(chessWagerAddress, ChessWager.abi, signer)
      const transaction = await contract.setGreeting("")
      await transaction.wait()
      fetchGreeting()
    }
  }

  useEffect(() => {
    
  }, []) 

  return <> </>
}

export default MetamaskPrompt

import { BigNumber, ethers } from "ethers"
import { useEffect } from "react"
import { RiExchangeDollarLine } from "react-icons/ri"
import ChessWager from "../../artifacts/contracts/ChessWager.sol/ChessWager.json"
import { Auth } from "../containers/Auth"
require("dotenv").config({ path: "../../../.env" })
const isLocal = process.env.REACT_APP_BRANCH_ENV === "develop"

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

  let contract: ethers.Contract

  const isCorrectBlockchain = async (
    provider: ethers.providers.Web3Provider,
  ) => {
    const { chainId } = await provider.getNetwork()
    if (isLocal && chainId !== 43113) {
      alert("You are on the wrong network. Please switch to the fuji network.")
      return false
    } else if (!isLocal && chainId !== 43114) {
      alert(
        "You are on the wrong network. Please switch to the avalanche mainnet.",
      )
      return false
    } else {
      return true
    }
  }

  const sendBet = async () => {
    if (typeof window.ethereum !== undefined) {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer: any = provider.getSigner()
      contract = new ethers.Contract(contractAddress, ChessWager.abi, signer)
      try {
        if (!(await isCorrectBlockchain(provider))) {
          return
        }
        const transaction = await contract.placeBet(bet, betId, overrides)
        await transaction.wait()
      } catch (err) {
        console.error(err)
      }
    } else {
      console.log("window.eth undefined!") // tell user to install metamask
    }
  }

  useEffect(() => {
    sendBet()
    return () => {
      try {
        contract.removeAllListeners()
      } catch (e) {
        console.error(e)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <button
      className="animate-pulse"
      onClick={() => {
        sendBet()
      }}
    >
      <div className="grid place-content-center rounded-full w-8 h-8 border-1">
        <RiExchangeDollarLine size="24" title="Pay" />
      </div>
    </button>
  )
}

import { BigNumber, ethers } from "ethers"
import { useEffect } from "react"
import { BiDollar, BiWallet } from "react-icons/bi"
import ChessWager from "../../artifacts/contracts/ChessWager.sol/ChessWager.json"
import { Auth } from "../containers/Auth"
import "../../style/buttons.scss"
import { DarkMode } from "../containers/DarkMode"
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

  const sendBet = async (): Promise<void> => {
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

  const isUser1 = auth.currentUser?.uid === user1Id
  const isUser2 = auth.currentUser?.uid === user2Id

  const borderRight = isUser1 ? "border-r" : ""
  const borderLeft = isUser2 ? "border-l" : ""
  const borderStyle = `${borderRight} ${borderLeft} border-stone-400 dark:border-stone-700`

  const { isDarkOn } = DarkMode.useContainer()

  return (
    <div className={`flex flex-col justify-center ${borderStyle}}`}>
      <button
        className="color-shift w-8 h-8 grid place-content-center hover:bg-stone-300 dark:hover:bg-stone-800 rounded-md animate-pulse mx-2"
        onClick={sendBet}
      >
        <BiWallet
          size="24"
          title="Send Wager"
          color={isDarkOn ? "#bbf7d0" : "#14532d"}
        />
      </button>
    </div>
  )
}

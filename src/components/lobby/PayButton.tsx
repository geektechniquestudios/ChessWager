import { BigNumber, ethers } from "ethers"
import { motion } from "framer-motion"
import { BiWallet } from "react-icons/bi"
import ChessWager from "../../artifacts/contracts/ChessWager.sol/ChessWager.json"
import { Bet } from "../../interfaces/Bet"
import { Auth } from "../containers/Auth"
import { DarkMode } from "../containers/DarkMode"
import { CustomSwal } from "../popups/CustomSwal"
//@ts-ignore
const isLocal = import.meta.env.VITE_BRANCH_ENV === "develop"

interface Props {
  bet: Bet
}

declare let window: any

export const PayButton: React.FC<Props> = ({ bet }) => {
  const {
    user1Id,
    id,
    amount,
    betSide,
    multiplier,
    user1Metamask,
    user2Id,
    user2Metamask,
    gameId,
    timestamp,
    contractAddress,
  } = bet
  const { auth } = Auth.useContainer()

  const bigAmount = ethers.utils.parseEther(amount.toString())

  const betAmountWei =
    auth.currentUser?.uid === user1Id
      ? bigAmount
      : bigAmount.mul(BigNumber.from((multiplier * 100).toFixed(0))).div(100)

  const betForContract = {
    amount: bigAmount,
    betSide: betSide,
    user1Id: user1Id,
    user1Metamask: user1Metamask,
    user2Id: user2Id,
    user2Metamask: user2Metamask,
    multiplier: multiplier * 100,
    gameId: gameId,
    timestamp: BigNumber.from(timestamp.seconds),
  }

  const overrides = {
    value: betAmountWei,
    gasLimit: 1000000,
  }

  // use this version for mainnet inclusion
  // const isCorrectBlockchain = async (
  //   provider: ethers.providers.Web3Provider,
  // ) => {
  //   const { chainId } = await provider.getNetwork()
  //   if (isLocal && chainId !== 43113) {
  // Swal.fire({
  //   icon: "error",
  //   title: "Wrong network!",
  //   text: `You are on the wrong network. Please switch to the fuji network.`,
  // })
  //     return false
  //   }
  //   else if (!isLocal && chainId !== 43114) {
  // Swal.fire({
  //   icon: "error",
  //   title: "Wrong network!",
  //   text: `You are on the wrong network. Please switch to the fuji network.`,
  // })
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
      CustomSwal("error", "Wrong network", "Please switch to the Fuji network.")
      return false
    } else {
      return true
    }
  }

  const sendBet = async (): Promise<void> => {
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
        if (!(await isCorrectBlockchain(provider))) return

        const transaction = await contract.placeBet(
          betForContract,
          id,
          overrides,
        )
        transaction.wait().then(() => {
          contract.removeAllListeners()
        })
      } catch (err) {
        contract.removeAllListeners()
        console.error(err)
      }
    } else {
      CustomSwal(
        "error",
        "Metamask not detected",
        "Please install MetaMask to place a bet.",
      )
    }
  }

  const isUser1 = auth.currentUser?.uid === user1Id
  const { isDarkOn } = DarkMode.useContainer()

  return (
    <motion.button
      initial={{ x: isUser1 ? -20 : 20, y: -5 }}
      animate={{ x: isUser1 ? 5 : -5, y: -5 }}
      className="bet-button color-shift flex h-6 -translate-y-1 animate-pulse items-center justify-center gap-1 rounded-md border px-1.5 font-bold"
      onClick={sendBet}
    >
      <BiWallet
        size="14"
        title="Send Wager"
        color={isDarkOn ? "#bbf7d0" : "#14532d"}
      />
      <div className="text-xs font-bold">Pay</div>
    </motion.button>
  )
}

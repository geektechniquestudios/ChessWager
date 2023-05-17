import { CircularProgress } from "@mui/material"
import { BigNumber, ethers, providers } from "ethers"
import { DocumentReference, doc, updateDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { useState } from "react"
import { BiWallet } from "react-icons/bi"
import { Bet } from "../../interfaces/Bet"
import { Auth } from "../containers/Auth"
import { DarkMode } from "../containers/DarkMode"

interface Props {
  bet: Bet
}

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
  const { auth, callContract, db } = Auth.useContainer()

  const bigAmount = ethers.utils.parseEther(amount.toString())
  const bigAmountUser2 = bigAmount
    .mul(BigNumber.from((multiplier * 100).toFixed(0)))
    .div(100)

  const betAmountWei =
    auth.currentUser?.uid === user1Id ? bigAmount : bigAmountUser2

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

  const gasPriceGwei = 33
  const gasPriceWei = ethers.utils.parseUnits(gasPriceGwei.toString(), "gwei")

  const overrides = {
    value: betAmountWei,
    gasLimit: 1000000,
    gasPrice: gasPriceWei,
  }

  const [isPaymentPending, setIsPaymentPending] = useState<boolean>(false)

  const sendBet = async () => {
    const storeTransactionHash = (
      result: providers.TransactionResponse | undefined,
    ) => {
      if (!result) return
      const betDoc = doc(db, "lobby", id) as DocumentReference<Bet>
      if (isUser1) updateDoc(betDoc, { user1TransactionHash: result.hash })
      else updateDoc(betDoc, { user2TransactionHash: result.hash })
    }
    setIsPaymentPending(true)
    await callContract(
      (contract) => contract.placeBet(betForContract, id, overrides),
      contractAddress,
      storeTransactionHash,
    )
    setIsPaymentPending(false)
  }

  const isUser1 = auth.currentUser?.uid === user1Id
  const { isDarkOn } = DarkMode.useContainer()

  return (
    <motion.button
      layout="position"
      initial={{ x: isUser1 ? -70 : 70, y: -5, opacity: 0 }}
      animate={{ x: isUser1 ? 5 : -5, y: -5, opacity: 1 }}
      exit={{ x: isUser1 ? -70 : 70, y: -5, opacity: 0 }}
      className="bet-button color-shift flex h-6 -translate-y-1 animate-pulse items-center justify-center gap-1 rounded-md border px-1.5 font-bold"
      onClick={sendBet}
    >
      <div className="text-xs font-bold">Pay</div>
      <div className="grid w-5 place-content-center">
        {isPaymentPending ? (
          <CircularProgress size={13} />
        ) : (
          <BiWallet
            size="14"
            title="Send Wager"
            color={isDarkOn ? "#bbf7d0" : "#14532d"}
          />
        )}
      </div>
    </motion.button>
  )
}

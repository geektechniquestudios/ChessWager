import { CircularProgress } from "@mui/material"
import { BigNumber, ethers, providers } from "ethers"
import { DocumentReference, doc, updateDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { useState } from "react"
import { BsSend, BsSendCheck, BsSendExclamation } from "react-icons/bs"
import { Bet } from "../../interfaces/Bet"
import { AuthState } from "../../containers/AuthState"
import { DarkModeState } from "../../containers/DarkModeState"

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
  const { auth, callContract, db } = AuthState.useContainer()

  const maxDecimals = 18
  const trimmedAmount = Number(amount.toFixed(maxDecimals))
  const bigAmount = ethers.utils.parseEther(trimmedAmount.toString())
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

  const [paymentStatus, setPaymentStatus] = useState<
    "ready" | "pending" | "succeeded" | "failed"
  >("ready")

  const sendBet = async () => {
    const storeTransactionHash = async (
      transactionResponse: providers.TransactionResponse | undefined,
    ) => {
      if (!transactionResponse) {
        setPaymentStatus("failed")
        return
      }
      setPaymentStatus("succeeded")

      const betDoc = doc(db, "lobby", id) as DocumentReference<Bet>
      if (isUser1)
        updateDoc(betDoc, { user1TransactionHash: transactionResponse.hash })
      else updateDoc(betDoc, { user2TransactionHash: transactionResponse.hash })
    }

    setPaymentStatus("pending")
    await callContract(
      (contract) => contract.placeBet(betForContract, id, overrides),
      contractAddress,
      storeTransactionHash,
      () => setPaymentStatus("failed"),
    )
  }

  const isUser1 = auth.currentUser?.uid === user1Id
  const { isDarkOn } = DarkModeState.useContainer()

  const failedStyle =
    paymentStatus === "failed" ? "bet-button-failed" : "bet-button"

  const readyStyle =
    paymentStatus === "ready" || paymentStatus === "failed"
      ? "animate-pulse"
      : ""

  return (
    <motion.button
      layout="position"
      initial={{ x: isUser1 ? -70 : 70, y: -5, opacity: 0 }}
      animate={{ x: isUser1 ? 5 : -5, y: -5, opacity: 1 }}
      exit={{ x: isUser1 ? -70 : 70, y: -5, opacity: 0 }}
      className={`${failedStyle} ${readyStyle} color-shift flex h-6 -translate-y-1 items-center justify-between gap-1 rounded-md border px-1.5 font-bold`}
      onClick={sendBet}
      title="Send Wager"
      disabled={paymentStatus === "pending" || paymentStatus === "succeeded"}
    >
      <div className="text-xs font-bold">Pay</div>
      <div className="grid w-5 place-content-center">
        {paymentStatus === "ready" && (
          <BsSend size={13} color={isDarkOn ? "#bbf7d0" : "#14532d"} />
        )}
        {paymentStatus === "pending" && <CircularProgress size={13} />}
        {paymentStatus === "failed" && (
          <BsSendExclamation
            size={13}
            color={isDarkOn ? "#fbbf24" : "#eab308"}
          />
        )}
        {paymentStatus === "succeeded" && (
          <BsSendCheck size={13} color={isDarkOn ? "#bbf7d0" : "#14532d"} />
        )}
      </div>
    </motion.button>
  )
}

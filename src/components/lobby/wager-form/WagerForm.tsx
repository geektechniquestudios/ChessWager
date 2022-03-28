import { useState } from "react"
import "../../../style/lobby.scss"
import { GameState } from "../../containers/GameState"
import { Auth } from "../../containers/Auth"
import { SideChooser } from "./SideChooser"
import { BetAmount } from "./BetAmount"
import { Multiplier } from "./Multiplier"
import { Total } from "./Total"
import { PlaceBet } from "./PlaceBet"
import { QuickBet } from "./QuickBet"
import { TheirBet } from "./TheirBet"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp
} from "firebase/firestore"
import { firebaseApp } from "../../../config"
const db = getFirestore(firebaseApp)

export const WagerForm: React.FC = () => {
  const { gameId } = GameState.useContainer()
  const {
    walletAddress,
    isWalletConnected,
    auth,
    connectWallet,
    doesUserHaveEnoughAvax,
  } = Auth.useContainer()

  const user1Metamask = walletAddress

  const [betSide, setBetSide] = useState<"white" | "black">("white")
  const [betAmount, setBetAmount] = useState(0.0)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)

  const [localAvaxAmount, setLocalAvaxAmount] = useState("")
  const [localUsdAmount, setLocalUsdAmount] = useState("")
  const [isAmountEmpty, setIsAmountEmpty] = useState(false)

  const lobbyRef = collection(db, "lobby")
  const userRef = collection(db, "users")

  const canUserBet: () => Promise<boolean> = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to bet")
      return false
    } else if (betAmount === 0) {
      setIsAmountEmpty(true)
      return false
    } else if (!isWalletConnected) {
      connectWallet()
      return false
    } else if (!(await doesUserHaveEnoughAvax(betAmount))) {
      alert("Deposit more avax to place this bet")
      return false
    }
    return true
  }

  const createWager = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!(await canUserBet())) return

    const { uid, photoURL, displayName } = auth.currentUser!
    const userDoc = doc(userRef, uid)
    getDoc(userDoc)
      .then((doc: any) => {
        const user1FollowThrough = [
          doc.data().betFundedCount,
          doc.data().betAcceptedCount,
        ]
        return user1FollowThrough
      })
      .then((user1FollowThrough: number[]) => {
        addDoc(lobbyRef, {
          amount: betAmount,
          betSide: betSide,
          createdAt: serverTimestamp(),
          gameId: gameId,
          multiplier: multiplier,
          status: "ready",
          user1Id: uid,
          user1Metamask: user1Metamask,
          user1PhotoURL: photoURL,
          user1DisplayName: displayName,
          user1FollowThrough: user1FollowThrough,
          contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
        }).catch(console.error)
      })
      .catch(console.error)
  }

  return (
    <div className="flex h-full shadow-2xl bg-stone-200 dark:bg-stone-900 border border-stone-400 dark:border-stone-800">
      <div className="flex w-full p-2">
        <fieldset disabled={!auth.currentUser} className="flex w-full">
          <form
            onSubmit={createWager}
            className="w-full"
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault()
            }}
          >
            <div className="flex flex-col justify-around gap-4">
              <SideChooser betSide={betSide} setBetSide={setBetSide} />
              <QuickBet
                setBetAmount={setBetAmount}
                setLocalAvaxAmount={setLocalAvaxAmount}
                setLocalUsdAmount={setLocalUsdAmount}
                setIsAmountEmpty={setIsAmountEmpty}
              />
              <BetAmount
                betAmount={betAmount}
                setBetAmount={setBetAmount}
                localAvaxAmount={localAvaxAmount}
                setLocalAvaxAmount={setLocalAvaxAmount}
                localUsdAmount={localUsdAmount}
                setLocalUsdAmount={setLocalUsdAmount}
                isAmountEmpty={isAmountEmpty}
                setIsAmountEmpty={setIsAmountEmpty}
              />
              <TheirBet multiplier={multiplier} betAmount={betAmount} />
              <Multiplier
                setMultiplier={setMultiplier}
                sliderVal={sliderVal}
                setSliderVal={setSliderVal}
              />
            </div>
            <div className="flex flex-row justify-between mt-4 gap-2">
              <Total betAmount={betAmount} multiplier={multiplier} />
              <PlaceBet />
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  )
}

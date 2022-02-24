import { useState } from "react"
import "../../../style/lobby.scss"
import firebase from "firebase/compat/app"
import { GameState } from "../../containers/GameState"
import { Auth } from "../../containers/Auth"
import { SideChooser } from "./SideChooser"
import { BetAmount } from "./BetAmount"
import { Multiplier } from "./Multiplier"
import { Total } from "./Total"
import { PlaceBet } from "./PlaceBet"
import { QuickBet } from "./QuickBet"
import { TheirBet } from "./TheirBet"
const firestore = firebase.firestore()

export const WagerForm: React.FC = () => {
  const { gameId } = GameState.useContainer()
  const { walletAddress, isWalletConnected, auth, connectWallet } =
    Auth.useContainer()

  const user1Metamask = walletAddress

  const [betSide, setBetSide] = useState<"White" | "Black">("White")
  const [betAmount, setBetAmount] = useState(0.0)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)

  const [localAvaxAmount, setLocalAvaxAmount] = useState("")
  const [localUsdAmount, setLocalUsdAmount] = useState("")
  const [isAmountEmpty, setIsAmountEmpty] = useState(false)

  const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby")
  const userRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("users")

  const createWager = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (betAmount === 0) {
      setIsAmountEmpty(true)
      return
    }

    if (!isWalletConnected) {
      connectWallet()
      return
    }

    if (auth.currentUser) {
      const { uid, photoURL, displayName }: firebase.User = auth.currentUser

      userRef // @todo make into transaction
        .doc(uid)
        .get()
        .then((doc: any) => {
          const user1FollowThrough = [
            doc.data().betFundedCount,
            doc.data().betAcceptedCount,
          ]
          return user1FollowThrough
        })
        .then((user1FollowThrough: number[]) => {
          lobbyRef
            .add({
              amount: betAmount,
              betSide: betSide.toLowerCase(),
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              gameId: gameId,
              multiplier: multiplier,
              status: "ready",
              user1Id: uid,
              user1Metamask: user1Metamask,
              user1PhotoURL: photoURL,
              user1DisplayName: displayName,
              user1FollowThrough: user1FollowThrough,
              contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
            })
            .catch(console.error)
        })
        .catch(console.error)
    }
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

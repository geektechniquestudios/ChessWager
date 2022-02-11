import { useState } from "react"
import "../../../style/lobby.scss"
import firebase from "firebase/compat/app"
import { GameId } from "../../containers/GameId"
import { Auth } from "../../containers/Auth"
import { SideChooser } from "./SideChooser"
import { BetAmount } from "./BetAmount"
import { Multiplier } from "./Multiplier"
import { Total } from "./Total"
import { PlaceBet } from "./PlaceBet"
import { QuickBet } from "./QuickBet"
import { TheirBet } from "./TheirBet"
const firestore = firebase.firestore()

require("dotenv").config({ path: "../../../../.env" })

export const WagerForm: React.FC = () => {
  const { gameId } = GameId.useContainer()
  const { walletAddress, isWalletConnected, auth, connectWallet } =
    Auth.useContainer()

  const user1Metamask = walletAddress

  const [betSide, setBetSide] = useState("White")
  const [betAmount, setBetAmount] = useState(0.0)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)

  const [localAvaxAmount, setLocalAvaxAmount] = useState("")
  const [localUsdAmount, setLocalUsdAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAmountEmpty, setIsAmountEmpty] = useState(false)

  const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby")
  const userRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("users")
  const createWager = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // setIsLoading(true)

    if (betAmount === 0) {
      setIsAmountEmpty(true)
      // setIsLoading(false)
      return
    }

    if (!isWalletConnected) {
      connectWallet()
      // setIsLoading(false)
      return
    }

    if (auth.currentUser) {
      const { uid, photoURL, displayName }: firebase.User = auth.currentUser

      userRef
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
          lobbyRef.add({
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
            contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
          })
        })
        .catch((err: Error) => {
          console.log(err)
          // setIsLoading(false)
        })
    }
  }

  return (
    <div className="flex w-full h-full p-2">
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
            <PlaceBet isLoading={isLoading} />
          </div>
        </form>
      </fieldset>
    </div>
  )
}
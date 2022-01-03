/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react"
import CurrencyInput from "react-currency-input-field"
import "../../../style/lobby.scss"
import firebase from "firebase/compat/app"
import { GameId } from "../../containers/GameId"
import { Auth } from "../../containers/Auth"
import { FaChessKing } from "react-icons/fa"
import { Price } from "../../containers/Price"
import { SideChooser } from "./SideChooser"
import { BetAmount } from "./BetAmount"
import { Multiplier } from "./Multiplier"
import { Total } from "./Total"
import { PlaceBet } from "./PlaceBet"
require("dotenv").config({ path: "../../../../.env" })

export const WagerForm: React.FC = () => {
  const { gameId } = GameId.useContainer()
  const { walletAddress, isWalletConnected, auth, connectWallet } =
    Auth.useContainer()

  const { avaxPrice } = Price.useContainer()

  const user1Metamask = walletAddress

  const [betSide, setBetSide] = useState("White")
  const [betAmount, setBetAmount] = useState(0.01)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)
  // const [avaxPrice, setAvaxPrice] = useState(0)

  const createWager = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isWalletConnected) {
      connectWallet()
      return
    }

    const createBet = firebase.functions().httpsCallable("createBet")
    if (auth.currentUser) {
      const { uid, photoURL, displayName }: firebase.User = auth.currentUser

      createBet({
        amount: betAmount,
        betSide: betSide,
        gameId: gameId,
        multiplier: Number(multiplier).toFixed(2),
        status: "ready",
        user1Id: uid,
        user1Metamask: user1Metamask,
        user1PhotoURL: photoURL,
        user1DisplayName: displayName ?? "no name",
        contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      }).catch(console.error)
    }
  }
  // const [avaxPrice, setAvaxPrice] = useState(getAvaxPrice())

  return (
    <div className="flex w-full h-full p-2">
      <fieldset disabled={!auth.currentUser} className="flex w-full">
        <form onSubmit={createWager} className="w-full">
          <div className="flex flex-col justify-around gap-4">
            <SideChooser betSide={betSide} setBetSide={setBetSide} />
            <BetAmount betAmount={betAmount} setBetAmount={setBetAmount} />
            <Multiplier
              multiplier={multiplier}
              setMultiplier={setMultiplier}
              sliderVal={sliderVal}
              setSliderVal={setSliderVal}
            />
          </div>
          <div className="flex flex-row justify-between mt-4">
            <Total betAmount={betAmount} multiplier={multiplier} />
            <PlaceBet />
          </div>
        </form>
      </fieldset>
    </div>
  )
}

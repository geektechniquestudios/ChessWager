import { useState } from "react"
import CurrencyInput from "react-currency-input-field"
import "../../style/lobby.scss"
import "../../config"
import firebase from "firebase/compat/app"
import RangeSlider from "react-bootstrap-range-slider"
import { GameId } from "../containers/GameId"
import { Auth } from "../containers/Auth"
require("dotenv").config({ path: "../../../.env" })

export const WagerForm: React.FC = () => {
  const { gameId } = GameId.useContainer()
  const { walletAddress, isWalletConnected, auth, connectWallet } = Auth.useContainer()
  const user1Metamask = walletAddress

  const [betSide, setBetSide] = useState("white")
  const [betAmount, setBetAmount] = useState(0.01)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)

  const createWager = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isWalletConnected) {
      //@todo switch to using ethers
      connectWallet()
      return
    }

    const createBet  = firebase.functions().httpsCallable("createBet")
    if (auth.currentUser) {
      const { uid, photoURL }: firebase.User = auth.currentUser

      createBet({
        amount: betAmount,
        betSide: betSide,
        gameId: gameId,
        multiplier: Number(multiplier).toFixed(2),
        status: "ready",
        user1Id: uid,
        user1Metamask: user1Metamask,
        user1PhotoURL: photoURL,
        contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      }).catch(console.error)
    }
  }

  const calcMultiplier = (sliderVal: number) => {
    if (sliderVal <= 0) {
      setMultiplier(1.0 + Number(sliderVal)) // @todo are these number casts redundant? don't remember why I did this
    } else {
      setMultiplier(1 / (1 - Number(sliderVal)))
    }
  }

  const updateSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSliderVal: number = Number(e.target.value)
    setSliderVal(newSliderVal)
    calcMultiplier(newSliderVal)
  }

  return (
    <div>
      <fieldset disabled={!auth.currentUser}>
        <form onSubmit={createWager}>
          <button type="submit">New bet</button>
          <label>Side</label>
          <select
            value={betSide}
            onChange={(e) => {
              setBetSide(e.target.value)
            }}
          >
            <option value="white">white</option>
            <option value="black">black</option>
          </select>
          <label>Amount (eth)</label>
          <CurrencyInput
            id="bet-amount"
            name="amount"
            placeholder="Chooes your bet"
            defaultValue={0.01} //@todo display usd equivalent here
            decimalsLimit={6}
            value={betAmount}
            onValueChange={(value) => setBetAmount(Number(value))}
            allowNegativeValue={false}
            suffix="Ξ"
          />
          <label>Multiplier</label>
          <div>
            <RangeSlider
              className="range"
              value={sliderVal}
              onChange={updateSlider}
              min={-0.99}
              max={0.99}
              step={0.01}
              tooltip="off"
            />
            <p>{Number(multiplier).toFixed(2)}</p>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

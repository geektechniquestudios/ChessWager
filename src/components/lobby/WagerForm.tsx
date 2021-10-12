import { useState } from "react"
import { Form } from "react-bootstrap"
import CurrencyInput from "react-currency-input-field"
import "../../style/lobby.css"
import "../../config"
import firebase from "firebase/compat/app"
import RangeSlider from 'react-bootstrap-range-slider';
import { GameId } from "../containers/GameId"

//import "rc-slider/assets/index.css"
// import Slider, { SliderTooltip } from "../src"
//import "rc-tooltip/assets/bootstrap.css"

interface Props {
  lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  auth: firebase.auth.Auth
}


const WagerForm: React.FC<Props> = ({ lobbyRef, auth }) => {
  const {gameId, setGameId} = GameId.useContainer() // @todo const?

  const [betSide, setBetSide] = useState("white")
  const [betAmount, setBetAmount] = useState(0.34)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)

  const createWager = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (auth.currentUser) {
      const { uid, photoURL }: firebase.User = auth.currentUser
      await lobbyRef.add({
        amount: Number(betAmount),
        betSide: betSide,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        gameId: gameId, //@todo get from api call to lichess, will use redux/context , update auth
        multiplier: Number(multiplier).toFixed(2),
        status: "ready",
        user1Id: uid,
        user1Metamask: "", //@todo get from web3
        user1PhotoURL: photoURL,
      })
    }
  }

  const calcMultiplier = (sliderVal: number) => {
    if (sliderVal <= 0) {
      setMultiplier(1.0 + Number(sliderVal)) // @todo are these number casts redundant? don't remember why I did this
    } else {
      setMultiplier(1 / (1 - Number(sliderVal)))
    }
  }

  const updateSlider = (e: React.ChangeEvent<HTMLInputElement>) => { //@todo figure out how to do this correctly
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
            onChange={e => {
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
            defaultValue={0.34} //@todo display usd equivalent here
            decimalsLimit={6}
            value={betAmount}
            onValueChange={value => setBetAmount(Number(value))}
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

export default WagerForm

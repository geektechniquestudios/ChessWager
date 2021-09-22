import React, { useState } from "react"
import { Form } from "react-bootstrap"
import CurrencyInput from "react-currency-input-field"
import "../../style/lobby.css"
//import "rc-slider/assets/index.css"
// import Slider, { SliderTooltip } from "../src"
//import "rc-tooltip/assets/bootstrap.css"

const WagerForm = ({ lobbyRef, auth }) => {
  const [betSide, setBetSide] = useState("white")
  const [betAmount, setBetAmount] = useState(0.0)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)

  const createWager = async () => {
    const { uid } = auth.currentUser
    await lobbyRef.add({})
  }

  const calcMultiplier = (sliderVal) => {
    if (sliderVal <= 0) {
      setMultiplier(1.0 + Number(sliderVal))
    } else {
      setMultiplier(1 / (1 - sliderVal))
    }
  }

  const updateSlider = e => {
    const newSliderVal = e.target.value
    setSliderVal(newSliderVal)
    calcMultiplier(newSliderVal)
  }

  return (
    <div>
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
        <label>Amount</label>
        <CurrencyInput
          id="bet-amount"
          name="amount"
          placeholder="Chooes your bet"
          defaultValue={0.34} //@todo display usd equivalent here
          decimalsLimit={6}
          onValueChange={value => setBetAmount(value)}
        />
        <label>Multiplier</label>
        {/* <Slider />  */}
        {/* @todo replace with slider */}
        {/* <input
          type="number"
          id="quantity"
          name="quantity"
          min="0.1"
          max="10"
          value={multiplier}
          onChange={e => setMultiplier(e.target.value)}
        /> */}
        <div>
          <Form.Range
            className="range"
            value={sliderVal}
            onChange={updateSlider}
            min={-0.99}
            max={0.99}
            step={0.01}
            tooltip="off"
          />
          <p>{Number(multiplier).toFixed(2)}</p>
          {/* <p>{multiplier}</p> */}
        </div>
      </form>
    </div>
  )
}

export default WagerForm

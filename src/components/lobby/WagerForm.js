import React, { useState } from "react"

import CurrencyInput from "react-currency-input-field"

//import "rc-slider/assets/index.css"
// import Slider, { SliderTooltip } from "../src"
//import "rc-tooltip/assets/bootstrap.css"

const WagerForm = ({lobbyRef, auth}) => {
  const [betSide, setBetSide] = useState("white")
  const [betAmount, setBetAmount] = useState(0.0)

  const createWager = async () => {
    const { uid } = auth.currentUser
    await lobbyRef.add({

    })
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
        <input type="number" id="quantity" name="quantity" min="0.1" max="10" value="1"/>
      </form>
    </div>
  )
}

export default WagerForm

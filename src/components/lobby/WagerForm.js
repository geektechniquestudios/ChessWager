import React, { useState } from "react"
import { Form } from "react-bootstrap"
import CurrencyInput from "react-currency-input-field"
import "../../style/lobby.css"
import "../../config"
import firebase from "firebase/compat/app"
//import "rc-slider/assets/index.css"
// import Slider, { SliderTooltip } from "../src"
//import "rc-tooltip/assets/bootstrap.css"



const WagerForm = ({ lobbyRef, auth }) => {
  const [betSide, setBetSide] = useState("white")
  const [betAmount, setBetAmount] = useState(0.34)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)

  const createWager = async e => { //@todo? make a "are you sure?" popup with all the relevant info
    e.preventDefault()
    const { uid, photoURL } = auth.currentUser
    console.log(betAmount)
    console.log(betSide)
    console.log(firebase.firestore.FieldValue.serverTimestamp())
    console.log(uid)
    console.log(photoURL)

    await lobbyRef.add({ //@todo don't let people write to this unless they own it somehow
        amount: Number(betAmount),
        betSide: betSide,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        gameId: "", //@todo get from api call to lichess, will use redux, update auth
        multiplier: Number(multiplier).toFixed(2),
        status: "ready",
        user1Id: uid,
        user1Metamask: "", //@todo get from web3
        user1PhotoURL: photoURL,
        // user2Id: "",
        // user2Metamask: "",
        // user2PhotoURL: "",    
    })
  }

  const calcMultiplier = (sliderVal) => {
    if (sliderVal <= 0) {
      setMultiplier(1.0 + Number(sliderVal))
    } else {
      setMultiplier(1 / (1 - Number(sliderVal)))
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
        <label>Amount (eth)</label>
        <CurrencyInput
          id="bet-amount"
          name="amount"
          placeholder="Chooes your bet"
          defaultValue={0.34} //@todo display usd equivalent here
          decimalsLimit={6}
          value={betAmount}
          onValueChange={value => setBetAmount(value)}
          allowNegativeValue={false}
          suffix="Ξ"
        />
        <label>Multiplier</label>
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
        </div>
      </form>
    </div>
  )
}

export default WagerForm

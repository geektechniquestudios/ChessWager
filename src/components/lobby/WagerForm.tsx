/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react"
import CurrencyInput from "react-currency-input-field"
import "../../style/lobby.scss"
import firebase from "firebase/compat/app"
import RangeSlider from "react-bootstrap-range-slider"
import { GameId } from "../containers/GameId"
import { Auth } from "../containers/Auth"
import { FaChessKing } from "react-icons/fa"
import { Currency } from "../containers/Currency"
require("dotenv").config({ path: "../../../.env" })

export const WagerForm: React.FC = () => {
  const { gameId } = GameId.useContainer()
  const { walletAddress, isWalletConnected, auth, connectWallet } =
    Auth.useContainer()
  // const { getAvaxPrice } = Currency.useContainer()
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

    const createBet = firebase.functions().httpsCallable("createBet")
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

  const getAvaxPrice = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
    )
    const data = await response.json()
    return data.avax.usd
  }

  // const [avaxPrice, setAvaxPrice] = useState(getAvaxPrice())

  return (
    <div className="flex w-full h-full p-2">
      <fieldset disabled={!auth.currentUser} className="flex w-full">
        <form onSubmit={createWager} className="w-full">
          <div className="flex flex-col justify-around gap-4">
            <div className="border-2">
              <div className="flex p-2 bg-secondary-dark">
                <label>Side</label>
                <div className="border-1 mx-2" />
                <a
                  href="#"
                  className={`${
                    betSide === "white" ? "border-2" : ""
                  }  rounded-full w-7 h-7 grid place-content-center mx-1`}
                  onClick={() => {
                    setBetSide("white")
                  }}
                >
                  <FaChessKing color="white" className="" />
                </a>
                <a
                  href="#"
                  className={`${
                    betSide === "black" ? "border-2" : ""
                  }  rounded-full w-7 h-7 grid place-content-center mx-1`}
                  onClick={() => {
                    setBetSide("black")
                  }}
                >
                  <FaChessKing color="black" className="" />
                </a>
              </div>
              {/* <div className="border-b-2 border-primary-dark" /> */}
              <div className="flex justify-evenly">{betSide}</div>
            </div>
            <div className="flex border-2">
              <label className="grid place-content-center m-2">Amount</label>
              <div className="border-1 mx-2" />
              <div>
                <div className="flex justify-between my-1">
                  <span>USD</span>
                  <input />
                </div>
                <div className="flex justify-between my-1">
                  <span>AVAX</span>
                  <input />
                </div>
              </div>
              {/* 
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
              /> */}
            </div>
            <div className="flex p-2 border-2">
              <div className="grid place-content-center">
                <label>Multiplier</label>
              </div>
              <div className="border-1 mx-2" />
              <div className="grid place-content-center">
                <RangeSlider
                  className="range"
                  value={sliderVal}
                  onChange={updateSlider}
                  min={-0.99}
                  max={0.99}
                  step={0.01}
                  tooltip="off"
                />
                <p className="flex justify-center">
                  {/* <input type="text">{Number(multiplier).toFixed(2)}</input> */}
                  <input
                    type="text"
                    value={multiplier.toFixed(2)}
                    onChange={(e) => {
                      setMultiplier(Number(e.target.value))
                    }}
                    className="w-10 p-1 "
                  ></input>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between m-2">
            <div className="m-4 border-2 p-1.5">total:</div>
            <div className="grid place-content-center">
              <button type="submit" className="border-2 p-1.5 rounded-md">
                {/* <div className="w-2 h-2 rounded-full bg-primary-dark absolute opacity-75  -mt-2 -ml-2 border-2 border-tertiary animate-ping"> </div> */}
                place bet
              </button>
            </div>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

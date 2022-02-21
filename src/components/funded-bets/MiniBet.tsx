/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../style/lobby.scss"
import "firebase/compat/functions"
import { BigNumber, ethers } from "ethers"
import { GiChessRook } from "react-icons/gi"
import { Price } from "../containers/Price"

interface Props {
  amount: number
  betSide: string
  multiplier: number
  user1PhotoURL: string
  user1DisplayName: string
  user2PhotoURL: string
  user2DisplayName: string
}

export const MiniBet: React.FC<Props> = ({
  amount,
  betSide,
  multiplier,
  user1PhotoURL,
  user1DisplayName,
  user2PhotoURL,
  user2DisplayName,
}) => {
  const bigAmount = ethers.utils.parseEther(amount.toString())
  const potSize = ethers.utils.formatEther(
    bigAmount
      .mul(BigNumber.from((multiplier * 100).toFixed(0)))
      .div(100)
      .add(bigAmount),
  )

  const { avaxPrice } = Price.useContainer()
  return (
    <div>
      <div className="flex justify-between p-1">
        <div className="flex gap-1 mx-1">
          <div className="border-1 rounded-full bg-stone-600 grid place-content-center w-5 h-5">
            <GiChessRook color={betSide} size="1rem" />
          </div>
          <img
            src={user1PhotoURL}
            alt=""
            className="h-6 w-6 rounded-full"
            title={user1DisplayName}
          />
          <p>vs</p>
          <img
            src={user2PhotoURL}
            alt=""
            className="h-6 w-6 rounded-full"
            title={user2DisplayName}
          />
          <div className="border-1 rounded-full bg-stone-600 grid place-content-center w-5 h-5">
            <GiChessRook
              color={betSide === "White" ? "black" : "white"}
              size="1rem"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p>{`$${(Number(potSize) * avaxPrice).toFixed(2)}`}</p>
        </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-stone-600 to-transparent" />
    </div>
  )
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../style/lobby.scss"
import { BigNumber, ethers } from "ethers"
import { GiChessRook } from "react-icons/gi"
import { Price } from "../containers/Price"
import { WindowSize } from "../containers/WindowSize"

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

  const { width } = WindowSize.useContainer()
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="m-0.5 rounded-md border border-stone-700 bg-stone-100 text-xs text-stone-900 dark:bg-stone-800 dark:text-stone-300 sm:m-0 sm:border-none sm:bg-transparent sm:dark:bg-transparent">
      <div className="flex justify-between p-1">
        <div className="mx-1 flex flex-col items-center gap-1 sm:flex-row">
          <div className="flex gap-1">
            <div className="grid h-5 w-5 place-content-center rounded-md border border-stone-700 bg-stone-600">
              <GiChessRook color={betSide} size="1rem" />
            </div>
            <img
              src={user1PhotoURL}
              alt=""
              className="h-5 w-5 rounded-full"
              title={user1DisplayName}
            />
          </div>
          <p className="font-bold">vs</p>
          <div className="flex flex-row-reverse gap-1 sm:flex-row">
            <img
              src={user2PhotoURL}
              alt=""
              className="h-5 w-5 rounded-full"
              title={user2DisplayName}
            />
            <div className="grid h-5 w-5 place-content-center rounded-md border border-stone-700 bg-stone-400">
              <GiChessRook
                color={betSide === "white" ? "black" : "white"}
                size="1rem"
              />
            </div>
          </div>
        </div>
        <div className="grid place-content-center">
          <p>{`$${(Number(potSize) * avaxPrice).toFixed(2)}`}</p>
        </div>
      </div>

      {width >= 640 && (
        <div className="h-0.5 bg-gradient-to-r from-stone-600 to-transparent" />
      )}
    </div>
  )
}

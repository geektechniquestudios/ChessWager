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

  const formatDollars = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"
    } else {
      return num.toFixed(2)
    }
  }

  const { width } = WindowSize.useContainer()
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="m-0.5 grid shrink-0 place-content-center rounded-md border border-stone-400 bg-stone-100 text-xs text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 md:m-0 md:shrink md:place-content-start md:border-none md:bg-transparent md:dark:bg-transparent">
      <div className="mx-1 flex shrink-0 justify-between gap-1 p-1 md:mx-0">
        <div className="mx-0 flex flex-col items-center gap-1 rounded-md border border-stone-400 bg-stone-200 p-1 dark:border-stone-700 dark:bg-stone-800 md:flex-row md:border-none">
          <div className="flex gap-1">
            <div className="grid h-5 w-5 place-content-center rounded-md border border-stone-700 bg-stone-600">
              <GiChessRook color={betSide} />
            </div>
            <img
              src={user1PhotoURL}
              alt=""
              className="h-5 w-5 rounded-full"
              title={user1DisplayName}
            />
          </div>
          <p className="font-bold">vs</p>
          <div className="flex flex-row-reverse gap-1 md:flex-row">
            <img
              src={user2PhotoURL}
              alt=""
              className="h-5 w-5 rounded-full"
              title={user2DisplayName}
            />
            <div className="grid h-5 w-5 place-content-center rounded-md border border-stone-700 bg-stone-400">
              <GiChessRook color={betSide === "white" ? "black" : "white"} />
            </div>
          </div>
        </div>
        <div className="grid place-content-center rounded-md border border-stone-400 bg-stone-200 p-1 dark:border-stone-700 dark:bg-stone-800 md:border-none md:px-1">
          <p> {`$${formatDollars(Number(potSize) * avaxPrice)}`}</p>
        </div>
      </div>

      {width >= 768 && (
        <div className="h-0.5 bg-gradient-to-r from-stone-400 to-transparent dark:from-stone-600" />
      )}
    </div>
  )
}

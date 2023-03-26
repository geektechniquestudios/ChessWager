/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../style/lobby.scss"
import { BigNumber, ethers } from "ethers"
import { motion } from "framer-motion"
import { Bet } from "../../../interfaces/Bet"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import { Price } from "../../containers/Price"
import { UserMenuState } from "../../containers/UserMenuState"

interface Props {
  bet: Bet
}

export const MiniBet: React.FC<Props> = ({ bet }) => {
  const {
    amount,
    betSide,
    multiplier,
    user1Id,
    user1PhotoURL,
    user1DisplayName,
    user2Id,
    user2PhotoURL,
    user2DisplayName,
  } = bet
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
  const { openDropdownToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { avaxPrice } = Price.useContainer()
  const { auth } = Auth.useContainer()
  const isBetRelatedToUser = (bet: Bet): boolean => {
    return (
      auth.currentUser?.uid === bet.user1Id ||
      auth.currentUser?.uid === bet.user2Id
    )
  }

  const relatedToUserStyle = isBetRelatedToUser(bet)
    ? "border-green-200 dark:border-emerald-700"
    : "dark:border-stone-700 border-stone-400"

  return (
    <motion.div
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -4 },
      }}
      className={`${relatedToUserStyle} flex h-5 shrink-0 justify-center gap-1 overflow-clip rounded-md border bg-stone-100 text-xs text-stone-900 dark:bg-stone-700 dark:text-stone-300`}
    >
      <a
        className={`${
          betSide === "white" ? " dark:from-black" : "dark:from-white"
        } grid place-content-center bg-gradient-to-r py-0.5 pl-1 pr-2 dark:to-stone-700`}
        onClick={(e) => {
          e.stopPropagation()
          setClickedUserById(user1Id)
          openDropdownToMenu("clickedUser")
        }}
      >
        <img
          src={user1PhotoURL}
          alt=""
          className={`${
            betSide === "white"
              ? "border-stone-700 dark:border-stone-700"
              : "dark:border-stone border-stone-600"
          } h-4 w-4 rounded-full border bg-stone-500 dark:bg-stone-500`}
          title={user1DisplayName}
        />
      </a>
      <div className="z-10 -mx-2 grid place-content-center rounded-md font-bold">
        <p> {`$${formatDollars(Number(potSize) * avaxPrice)}`}</p>
      </div>
      <a
        className={`${
          betSide === "black" ? " dark:from-black" : "dark:from-white"
        } grid place-content-center bg-gradient-to-l py-0.5 pr-1 pl-2 dark:to-stone-700`}
        onClick={(e) => {
          e.stopPropagation()
          setClickedUserById(user2Id)
          openDropdownToMenu("clickedUser")
        }}
      >
        <img
          src={user2PhotoURL}
          alt=""
          className={`${
            betSide === "white"
              ? "border-stone-700 dark:border-stone-700"
              : "border-stone-600 dark:border-stone-600"
          } h-4 w-4 rounded-full border bg-stone-500 dark:bg-stone-500`}
          title={user2DisplayName}
        />
      </a>
    </motion.div>
  )
}

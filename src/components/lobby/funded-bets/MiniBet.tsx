/* eslint-disable jsx-a11y/anchor-is-valid */
import { BigNumber, ethers } from "ethers"
import { motion } from "framer-motion"
import { Bet } from "../../../interfaces/Bet"
import "../../../style/lobby.scss"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import { Price } from "../../containers/Price"
import { UserMenuState } from "../../containers/UserMenuState"
import { formatDollars } from "../bet/models/formatDollars"
import { MiniBetHeader } from "./MiniBetHeader"

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

  const maxDecimals = 18
  const trimmedAmount = Number(amount.toFixed(maxDecimals))
  const bigAmount = ethers.utils.parseEther(trimmedAmount.toString())

  const potSize = ethers.utils.formatEther(
    bigAmount
      .mul(BigNumber.from((multiplier * 100).toFixed(0)))
      .div(100)
      .add(bigAmount),
  )

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
    ? "bet-user1"
    : "bet-not-selected"
  const headerStyle = isBetRelatedToUser(bet)
    ? "bet-header-user1"
    : "bet-header"
  const leftBorderStyle =
    betSide === "white" ? "white-ring-border" : "black-ring-border"
  const rightBorderStyle =
    betSide === "white" ? "black-ring-border" : "white-ring-border"
  const leftRingStyle = betSide === "white" ? "white-ring" : "black-ring"
  const rightRingStyle = betSide === "white" ? "black-ring" : "white-ring"

  return (
    <motion.div
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -4 },
      }}
      className={`${relatedToUserStyle} relative flex h-7 shrink-0 justify-center gap-1 overflow-clip rounded-md border bg-stone-100 text-xs text-stone-900 dark:bg-stone-700 dark:text-stone-300`}
    >
      <MiniBetHeader headerStyle={headerStyle} />

      <a
        className="grid place-content-center py-0.5 pl-1 pr-2"
        onClick={(e) => {
          e.stopPropagation()
          setClickedUserById(user1Id)
          openDropdownToMenu("clickedUser")
        }}
      >
        <div className={`${leftBorderStyle} z-10 rounded-full border`}>
          <div className={`${leftRingStyle} rounded-full border-2`}>
            <img
              src={user1PhotoURL}
              alt=""
              className={`${leftBorderStyle} h-5 w-5 rounded-full border bg-stone-500 dark:bg-stone-500`}
              title={user1DisplayName}
            />
          </div>
        </div>
      </a>
      <div className="z-10 grid place-content-start rounded-md font-bold ">
        <p> {`$${formatDollars(Number(potSize) * avaxPrice)}`}</p>
      </div>
      <a
        className="grid place-content-center py-0.5 pl-1 pr-2"
        onClick={(e) => {
          e.stopPropagation()
          setClickedUserById(user2Id!)
          openDropdownToMenu("clickedUser")
        }}
      >
        <div className={`${rightBorderStyle} z-10 rounded-full border`}>
          <div className={`${rightRingStyle} rounded-full border-2`}>
            <img
              src={user2PhotoURL}
              alt=""
              className={`${rightBorderStyle} h-5 w-5 rounded-full border bg-stone-500 dark:bg-stone-500`}
              title={user2DisplayName}
            />
          </div>
        </div>
      </a>
    </motion.div>
  )
}

import { motion } from "framer-motion"
import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { DropdownState } from "../../../../containers/DropdownState"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { User2BetAmount } from "./User2BetAmount"
import { User2FollowThrough } from "./User2FollowThrough"

interface Props {
  bet: Bet
  isSelected: boolean
}

export const User2Image: React.FC<Props> = ({ bet }) => {
  const { betSide, user2Id, user2PhotoURL } = bet
  const { openDropdownToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { user } = Auth.useContainer()
  const disabledStyle = !user ? "pointer-events-none" : ""
  const ringStyle = betSide === "black" ? "white-ring" : "black-ring"
  const ringBorderStyle =
    betSide === "black" ? "white-ring-border" : "black-ring-border"

  return (
    <div className={`${ringBorderStyle} relative shrink-0 rounded-full border`}>
      {user2PhotoURL && (
        <motion.a
          initial={{ rotate: 90 }}
          animate={{ rotate: 0 }}
          className={`${disabledStyle} ${ringStyle} flex h-full w-full rounded-full border-4 font-extrabold`}
          onClick={(e) => {
            e.stopPropagation()
            setClickedUserById(user2Id)
            openDropdownToMenu("clickedUser")
          }}
        >
          <img
            className={`${ringBorderStyle} h-8 w-8 shrink-0 rounded-full border bg-stone-500`}
            src={user2PhotoURL}
          />
        </motion.a>
      )}

      {!user2PhotoURL && (
        <motion.div
          className={`${disabledStyle} ${ringStyle} flex h-full w-full rounded-full border-4 font-extrabold`}
        >
          <div
            className={`${ringBorderStyle} ring-center h-8 w-8 shrink-0 rounded-full border`}
          />
        </motion.div>
      )}

      <User2BetAmount bet={bet} />
      <User2FollowThrough bet={bet} />
    </div>
  )
}

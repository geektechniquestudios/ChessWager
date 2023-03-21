import { motion } from "framer-motion"
import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { DropdownState } from "../../../../containers/DropdownState"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { User2BetAmount } from "./User2BetAmount"
import { User2FollowThrough } from "./User2FollowThrough"
import { User2Spinner } from "./User2Spinner"

interface Props {
  bet: Bet
  isSelected: boolean
}

export const User2Image: React.FC<Props> = ({ bet }) => {
  const { user1Id, betSide, status, user2Id, user2PhotoURL } = bet
  const { openDropdownToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { user } = Auth.useContainer()
  const disabledStyle = !user ? "pointer-events-none" : ""
  const ringStyle = betSide === "black" ? "border-white" : "border-stone-900"
  const ringBorderStyle =
    betSide === "white" ? "border-stone-700" : "border-stone-600"
  const { auth } = Auth.useContainer()
  const isUser1 = auth.currentUser?.uid === user1Id

  return (
    <div className={`${ringBorderStyle} relative shrink-0 rounded-full border`}>
      {/* spinner is showing up on top of user image */}
      {status === "ready" && isUser1 && <User2Spinner />}

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
            className={`${ringBorderStyle} h-8 w-8 shrink-0 rounded-full border bg-stone-500`}
          />
        </motion.div>
      )}

      <User2BetAmount bet={bet} />
      <User2FollowThrough bet={bet} />
    </div>
  )
}

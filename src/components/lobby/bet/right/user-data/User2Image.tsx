import { AnimatePresence, motion } from "framer-motion"
import { Bet } from "../../../../../interfaces/Bet"
import { AuthState } from "../../../../../containers/AuthState"
import { DropdownState } from "../../../../../containers/DropdownState"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { User2BetAmount } from "./User2BetAmount"
import { User2FollowThrough } from "./User2FollowThrough"
import { ActivityOrb } from "./ActivityOrb"

interface Props {
  bet: Bet
  isSelected: boolean
}

export const User2Image: React.FC<Props> = ({ bet }) => {
  const { betSide, user2Id, user2PhotoURL } = bet
  const { openDropdownToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { user } = AuthState.useContainer()

  const disabledStyle = !user ? "pointer-events-none" : ""
  const ringStyle = betSide === "black" ? "white-ring" : "black-ring"
  const ringBorderStyle =
    betSide === "black" ? "white-ring-border" : "black-ring-border"

  const isUserThinking = false

  return (
    <div className={`${ringBorderStyle} relative shrink-0 rounded-full border`}>
      <ActivityOrb
        bet={bet}
        isUserThinking={isUserThinking}
        hasUserPaid={bet.hasUser2Paid}
      />

      {user2PhotoURL && (
        <motion.a
          initial={{ rotate: 90 }}
          animate={{ rotate: 0 }}
          className={`${disabledStyle} ${ringStyle} flex h-full w-full rounded-full border-4 font-extrabold`}
          onClick={(e) => {
            if (!user2Id) return
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
        <div
          className={`${disabledStyle} ${ringStyle} flex h-full w-full rounded-full border-4 font-extrabold`}
        >
          <div
            className={`${ringBorderStyle} ring-center h-8 w-8 shrink-0 rounded-full border`}
          ></div>
        </div>
      )}

      {!user2PhotoURL && (
        <div className="color-shift pointer-events-none absolute inset-0">
          <AnimatePresence>
            {bet.status === "ready" && (
              <motion.div
                className="absolute inset-0 z-50 m-auto h-3 w-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
                exit={{ opacity: 0 }}
              >
                <div className="relative flex h-3 w-3 blur-[1px]">
                  <div
                    className={`absolute inline-flex h-full w-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-sky-500`}
                  />
                  <div
                    className={`inline-flex h-3 w-3 rounded-full bg-sky-500`}
                  />
                  <div className="absolute inset-0 m-auto h-1 w-1 animate-pulse bg-white blur-[1px]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <User2BetAmount bet={bet} />
      <User2FollowThrough bet={bet} />
    </div>
  )
}

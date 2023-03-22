import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { DropdownState } from "../../../../containers/DropdownState"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { User1BetAmount } from "./User1BetAmount"
import { User1FollowThrough } from "./User1FollowThrough"

interface Props {
  bet: Bet
}

export const User1Image: React.FC<Props> = ({ bet }) => {
  const { user1Id, betSide, user1PhotoURL, user2Id, status } = bet
  const { openDropdownToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { user } = Auth.useContainer()
  const disabledStyle = !user ? "pointer-events-none" : ""
  const ringStyle = betSide === "white" ? "white-ring" : "black-ring"
  const ringBorderStyle =
    betSide === "white" ? "white-ring-border" : "black-ring-border"

  return (
    <div className={`${ringBorderStyle} relative shrink-0 rounded-full border`}>
      {/* <User1Spinner user2Id={user2Id} status={status} /> */}
      <a
        className={`${disabledStyle} ${ringStyle} flex h-full w-full rounded-full border-4 font-extrabold`}
        onClick={(e) => {
          e.stopPropagation()
          setClickedUserById(user1Id)
          openDropdownToMenu("clickedUser")
        }}
      >
        <img
          className={`${ringBorderStyle} h-8 w-8 shrink-0 rounded-full border bg-stone-500`}
          src={user1PhotoURL}
        />
      </a>
      <User1BetAmount bet={bet} />
      <User1FollowThrough bet={bet} />
    </div>
  )
}

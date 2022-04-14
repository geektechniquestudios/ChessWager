import { useEffect } from "react"
import { BetsState } from "../containers/BetsState"
import { Bet as BetComponent } from "./bet/Bet"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { UserDataState } from "../containers/UserDataState"

interface Props {}

export const RealtimeBets: React.FC<Props> = ({}) => {
  const { mostRecentButton, isDescending, isRealTime } =
    LobbyHeaderState.useContainer()
  const { bets, updateRealTimeBets, realTimeBets, clearMapForLobbyChange } =
    BetsState.useContainer()

  const { userData } = UserDataState.useContainer()

  useEffect(() => {
    updateRealTimeBets()
  }, [bets, mostRecentButton, isDescending])

  useEffect(clearMapForLobbyChange, [isRealTime])

  return (
    <>
      {realTimeBets
        ?.filter(
          (bet) =>
            !userData.blockedUsers.includes(bet.user1Id) &&
            !userData.blockedUsers.includes(bet.user2Id),
        )
        .map((bet, index) => (
          <BetComponent
            key={bet.id + index}
            {...bet}
            timestamp={bet.timestamp?.seconds}
            index={index}
            isLobbyEnabled={true}
          />
        ))}
    </>
  )
}

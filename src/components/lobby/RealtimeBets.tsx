import { useEffect } from "react"
import { BetsState } from "../containers/BetsState"
import { Bet as BetComponent } from "./bet/Bet"
import { LobbyHeaderState } from "./lobby-header/LobbyHeaderState"

interface Props {}

export const RealtimeBets: React.FC<Props> = ({}) => {
  const { mostRecentButton, isDescending, isRealTime } =
    LobbyHeaderState.useContainer()
  const {
    bets,
    updateRealTimeBets,
    realTimeBets,
    isLoading,
    setSelectedBetMap,
  } = BetsState.useContainer()

  useEffect(() => {
    updateRealTimeBets()
  }, [bets, mostRecentButton, isDescending])
  const clearMapForLobbyChange = () => () => {
    if (!isLoading) setSelectedBetMap(new Map())
  }

  useEffect(clearMapForLobbyChange, [isRealTime])
  return (
    <>
      {realTimeBets.map((bet, index) => (
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

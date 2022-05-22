import { useEffect, useState } from "react"
import { Auth } from "../containers/Auth"
import { BetsState } from "../containers/BetsState"
import { GameState } from "../containers/GameState"
import { LobbyState } from "../containers/LobbyState"
import { Bet as BetComponent } from "./bet/Bet"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { UserDataState } from "../containers/UserDataState"

interface Props {}

export const RefreshingBets: React.FC<Props> = ({}) => {
  const { gameId } = GameState.useContainer()
  const { user } = Auth.useContainer()
  const { isLoading } = BetsState.useContainer()

  const {
    updateRefreshingBets,
    setSelectedBetMap,
    refreshingBets,
    setRefreshingBets,
    clearMapForLobbyChange,
  } = BetsState.useContainer()

  const [isLobbyEnabled, setIsLobbyEnabled] = useState(true)
  const heartBeat = async () => {
    const delay = (time: number) =>
      new Promise((resolve) => setTimeout(resolve, time))
    setIsLobbyEnabled(false)
    await delay(700)
    updateRefreshingBets()
    setIsLobbyEnabled(true)
    setCount(5)
  }

  const [count, setCount] = useState(5)
  const [isCounting, setIsCounting] = useState(false)
  const heartBeatCountdown = () => {
    if (isCounting) return
    setIsCounting(true)
    const timeout = setTimeout(() => {
      count > 0 ? setCount(count - 1) : heartBeat()
    }, 1000)
    setIsCounting(false)
    return () => clearTimeout(timeout)
  }
  useEffect(heartBeatCountdown, [count])

  const { mostRecentButton, isDescending, isRealTime } =
    LobbyHeaderState.useContainer()
  const updateForButtonClick = () => {
    if (isLoading) return
    updateRefreshingBets()
    setIsLobbyEnabled(true)
    setCount(5)
  }

  const { dummy } = LobbyState.useContainer()
  const { userData } = UserDataState.useContainer()

  useEffect(updateForButtonClick, [
    mostRecentButton,
    isDescending,
    user,
    dummy,
    isLoading,
  ])

  const updateForNewGame = () => {
    if (isLoading) return
    setSelectedBetMap(new Map())
    setRefreshingBets([])
    setIsLobbyEnabled(true)
    setCount(5)
  }
  useEffect(updateForNewGame, [gameId])

  useEffect(clearMapForLobbyChange, [isRealTime])

  return (
    <>
      {refreshingBets
        ?.filter(
          (bet) =>
            (!userData?.blockedUsers.includes(bet.user1Id) ?? true) &&
            (!userData?.blockedUsers.includes(bet.user2Id) ?? true),
        )
        .map((bet, index) => (
          <BetComponent
            key={bet.id + index}
            {...bet}
            timestamp={bet.timestamp?.seconds}
            index={index}
            isLobbyEnabled={isLobbyEnabled}
          />
        ))}
    </>
  )
}

import { useEffect, useState } from "react"
import { Bet, BetData } from "../../interfaces/Bet"
import { Auth } from "../containers/Auth"
import { BetsState } from "../containers/BetsState"
import { GameState } from "../containers/GameState"
import { LobbyState } from "../containers/LobbyState"
import { Bet as BetComponent } from "./bet/Bet"
import { LobbyHeaderState } from "./lobby-header/LobbyHeaderState"

interface Props {
  selectedBetMap: Map<string, BetData>
  setSelectedBetMap: React.Dispatch<React.SetStateAction<Map<string, BetData>>>
  determineSortOrder: (
    a: number | string | Date,
    b: number | string | Date,
  ) => number
  sortBasedOnRecentButton: (a: Bet, b: Bet) => number
  genericBet: Bet
}

export const RefreshingBets: React.FC<Props> = ({
  selectedBetMap,
  setSelectedBetMap,
  determineSortOrder,
  sortBasedOnRecentButton,
  genericBet,
}) => {
  const { gameId } = GameState.useContainer()
  const { user } = Auth.useContainer()
  const [isLobbyUpdating, setIsLobbyUpdating] = useState(false)
  const [refreshingBets, setRefreshingBets] = useState<Bet[]>([])
  const { bets, isLoading } = BetsState.useContainer()

  const updateLobby = () => {
    const tempGameId = gameId
    if (isLobbyUpdating) return
    console.log("updating lobby")
    setIsLobbyUpdating(true)

    const buildNotSelectedBets = (): Bet[] => {
      const filterOutSelected = (bet: Bet): boolean =>
        !selectedBetMap.get(bet.id)?.isSelected
      const filterOutFundedAndUserRelated = (bet: Bet): boolean =>
        bet.status !== "funded" &&
        bet.user1Id !== user?.uid &&
        bet.gameId !== ""
      return (
        bets
          ?.filter(filterOutFundedAndUserRelated)
          .filter(filterOutSelected)
          .sort((a, b) => sortBasedOnRecentButton(b, a)) ?? []
      )
    }
    const notSelectedBets = buildNotSelectedBets()

    const selectedBets =
      bets
        ?.filter((bet) => selectedBetMap.get(bet.id))
        .sort((a, b) =>
          determineSortOrder(
            selectedBetMap.get(b.id)?.index!,
            selectedBetMap.get(a.id)?.index!,
          ),
        ) ?? []

    const selectedBetIndicies =
      selectedBets
        .map((bet) => selectedBetMap.get(bet.id)?.index)
        .sort((a, b) => determineSortOrder(b ?? 0, a ?? 0)) ?? []

    const weaveBets = (): Bet[] => {
      let out: Bet[] = []
      const selectedLength = selectedBets?.length ?? 0
      const notSelectedLength = notSelectedBets?.length ?? 0
      console.log("highest selected: ", selectedBetIndicies[0])
      const maxPossLength = Math.max(
        (selectedBetIndicies[0] ?? -1) + 1,
        selectedLength + notSelectedLength,
      )
      console.log(selectedBets)
      console.log(selectedBetIndicies)
      console.log(notSelectedBets)
      let selectedBetIndex = selectedBetIndicies.pop()
      while (out.length < maxPossLength) {
        if (out.length === selectedBetIndex) {
          out = [...out, selectedBets?.pop() ?? genericBet]
          selectedBetIndex = selectedBetIndicies.pop()
        } else {
          out = [...out, notSelectedBets?.pop() ?? genericBet]
        }
      }
      return out
    }
    setRefreshingBets(gameId === tempGameId ? weaveBets() : [])
    setIsLobbyUpdating(false)
  }

  const [isLobbyEnabled, setIsLobbyEnabled] = useState(true)

  const { dummy } = LobbyState.useContainer()

  const heartBeat = async () => {
    const delay = (time: number) =>
      new Promise((resolve) => setTimeout(resolve, time))
    console.log("heartbeat")
    setIsLobbyEnabled(false)
    await delay(1000)
    updateLobby()
    setIsLobbyEnabled(true)
    setCount(5)
  }

  const [count, setCount] = useState(5)

  const [isCounting, setIsCounting] = useState(false)
  const heartBeatCountdown = () => {
    if (isCounting) return
    setIsCounting(true)
    console.log("countdown effect " + count)
    const timeout = setTimeout(() => {
      count > 0 ? setCount(count - 1) : heartBeat()
    }, 1000)
    setIsCounting(false)
    return () => clearTimeout(timeout)
  }
  useEffect(heartBeatCountdown, [count])

  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()

  const updateForButtonClick = () => {
    if (isLoading) return
    console.log("button clicked")
    updateLobby()
    setIsLobbyEnabled(true)
    setCount(5)
  }
  useEffect(updateForButtonClick, [
    mostRecentButton,
    isDescending,
    user,
    dummy,
    isLoading,
  ])

  const updateForNewGame = () => {
    if (isLoading) return
    console.log("new game, clearing old data")
    setSelectedBetMap(new Map())
    setRefreshingBets([])
    setIsLobbyEnabled(true)
    setCount(5)
  }
  useEffect(updateForNewGame, [gameId])

  return (
    <>
      {refreshingBets?.map((bet, index) => (
        <BetComponent
          key={bet.id + index}
          {...bet}
          timestamp={bet.timestamp?.seconds}
          selectedBetMap={selectedBetMap}
          setSelectedBetMap={setSelectedBetMap}
          index={index}
          isLobbyEnabled={isLobbyEnabled}
        />
      ))}
    </>
  )
}

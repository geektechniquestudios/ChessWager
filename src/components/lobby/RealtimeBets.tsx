import { useEffect, useState } from "react"
import { Bet, BetData } from "../../interfaces/Bet"
import { Auth } from "../containers/Auth"
import { Bet as BetComponent } from "./bet/Bet"
import { LobbyHeaderState } from "./lobby-header/LobbyHeaderState"

interface Props {
  selectedBetMap: Map<string, BetData>
  setSelectedBetMap: React.Dispatch<React.SetStateAction<Map<string, BetData>>>
  determineSortOrder: any
  sortBasedOnRecentButton: any
  bets: Bet[]
  genericBet: Bet
}

export const RealtimeBets: React.FC<Props> = ({
  selectedBetMap,
  setSelectedBetMap,
  determineSortOrder,
  sortBasedOnRecentButton,
  bets,
  genericBet,
}) => {
  const { user } = Auth.useContainer()
  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()

  const updateLobby = () => {
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
    setRealTimeBets(weaveBets())
  }
  useEffect(() => {
    updateLobby()
  }, [bets, mostRecentButton, isDescending])
  const [realTimeBets, setRealTimeBets] = useState<Bet[]>(bets)

  return (
    <>
      {realTimeBets.map((bet, index) => (
        <BetComponent
          key={bet.id + index}
          {...bet}
          timestamp={bet.timestamp?.seconds}
          selectedBetMap={selectedBetMap}
          setSelectedBetMap={setSelectedBetMap}
          index={index}
          isLobbyEnabled={true}
        />
      ))}
    </>
  )
}

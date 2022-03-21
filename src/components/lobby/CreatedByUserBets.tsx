import { Bet } from "../../interfaces/Bet"
import { Auth } from "../containers/Auth"
import { Bet as BetComponent } from "./bet/Bet"

interface BetData {
  isSelected: boolean
  index: number
  id: string
}
interface Props {
  bets: Bet[]
  selectedBetMap: Map<string, BetData>
  setSelectedBetMap: React.Dispatch<React.SetStateAction<Map<string, BetData>>>
}

export const CreatedByUserBets: React.FC<Props> = ({
  bets,
  selectedBetMap,
  setSelectedBetMap,
}) => {
  const { user } = Auth.useContainer()
  return (
    <>
      {user &&
        bets
          ?.filter(
            (bet) =>
              bet.user1Id === user.uid &&
              bet.gameId !== "" &&
              bet.status !== "funded",
          )
          .map((bet, index) => (
            <BetComponent
              key={bet.id + index}
              {...bet}
              timestamp={bet.timestamp?.seconds}
              selectedBetMap={selectedBetMap}
              setSelectedBetMap={setSelectedBetMap}
            />
          ))}
    </>
  )
}

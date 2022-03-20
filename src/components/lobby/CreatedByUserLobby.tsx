import { Bet as BetType} from "../../interfaces/Bet"
import { Auth } from "../containers/Auth"
import { Bet } from "./bet/Bet"

interface Props {
  bets: BetType[]
  selectedBetMap: Map<string, BetType>
  setSelectedBetMap: React.Dispatch<React.SetStateAction<Map<string, BetType>>>
}

export const CreatedByUserLobby: React.FC<Props> = ({
  bets,
  selectedBetMap,
  setSelectedBetMap,
}) => {
  const { user } = Auth.useContainer()
  return (
  //   <>
  //     {user &&
  //       bets
  //         ?.filter(
  //           (bet) =>
  //             bet.user1Id === user.uid &&
  //             bet.gameId !== "" &&
  //             bet.status !== "funded",
  //         )
  //         .map((bet, index) => (
  //           <Bet
  //             key={bet.id + index}
  //             {...bet}
  //             timestamp={bet.timestamp?.seconds}
  //             selectedBetMap={selectedBetMap}
  //             setSelectedBetMap={setSelectedBetMap}
  //           />
  //         ))}
  //   </>
  )
}

import type { Bet } from "../../interfaces/Bet"
import { Auth } from "../containers/Auth"
import { BetsState } from "../containers/BetsState"
import { Bet as BetComponent } from "./bet/Bet"

interface Props {}

export const CreatedByUserBets: React.FC<Props> = ({}) => {
  const { user } = Auth.useContainer()
  const { bets } = BetsState.useContainer()
  return (
    <>
      {user &&
        bets
          ?.filter(
            (bet: Bet) =>
              bet.user1Id === user.uid &&
              bet.gameId !== "" &&
              bet.status !== "funded",
          )
          .map((bet: Bet, index: number) => (
            <BetComponent
              key={bet.id + index}
              {...bet}
              timestamp={bet.timestamp?.seconds}
            />
          ))}
    </>
  )
}

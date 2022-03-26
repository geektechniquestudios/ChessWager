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
            />
          ))}
    </>
  )
}

interface Props {
    bets?: string[]
}

export const BetCount: React.FC<Props> = ({
  bets,
}) => {
  return (
    <div className="flex justify-evenly">Bet Count: {bets}</div>
  )
}

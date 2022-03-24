interface Props {
  bets?: string[]
}

export const BetCount: React.FC<Props> = ({ bets }) => {
  return (
    <div
      data-bs-toggle="tooltip"
      title="Bet Count"
      className="flex justify-evenly"
    >
      Bet Count: {bets}
    </div>
  )
}

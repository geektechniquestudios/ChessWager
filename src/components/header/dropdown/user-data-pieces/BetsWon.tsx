interface Props {
  bets?: string[]
}

export const BetsWon: React.FC<Props> = ({ bets }) => {
  return (
    <div
      data-bs-toggle="tooltip"
      title="Bets Won"
      className="flex justify-evenly"
    >
      Bets Won: {bets}
    </div>
  )
}

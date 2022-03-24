interface Props {
    bets?: string[]
}

export const BetsWon: React.FC<Props> = ({
  bets,
}) => {
  return (
    <div className="flex justify-evenly">Bets Won: {bets}</div>
  )
}

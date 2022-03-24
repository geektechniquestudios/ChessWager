interface Props {
    bets?: string[]
}

export const WinPercent: React.FC<Props> = ({
  bets,
}) => {
  return (
    <div data-bs-toggle="tooltip" title="Win Percent" className="flex justify-evenly">Win%: {bets}</div>
  )
}

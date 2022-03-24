interface Props {
    bets?: string[]
}

export const WinPercent: React.FC<Props> = ({
  bets,
}) => {
  return (
    <div className="flex justify-evenly">Win%: {bets}</div>
  )
}

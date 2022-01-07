interface Props {}

export const PlaceBet: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col-reverse">
      <button type="submit" className="border-2 p-1.5 rounded-md">
        Place Bet
      </button>
    </div>
  )
}

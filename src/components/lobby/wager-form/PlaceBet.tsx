interface Props {}

export const PlaceBet: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col-reverse">
      <button type="submit" className="border-2 p-1.5 rounded-md">
        {/* <div className="w-2 h-2 rounded-full bg-primary-dark absolute opacity-75  -mt-2 -ml-2 border-2 border-tertiary animate-ping"> </div> */}
        Place Bet
      </button>
    </div>
  )
}

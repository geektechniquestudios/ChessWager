interface Props {
  betAmount: number
  multiplier: number
}

export const Total: React.FC<Props> = ({ betAmount, multiplier }) => {
  return (
    <div className="border-2 flex">
      <p className="grid place-content-center m-2 border-r-2 pr-2">Pot Size:</p>
      <div className="p-1.5">
        <div className="flex justify-between my-1">
          <div>{(betAmount * multiplier).toFixed(3)} USD</div>
        </div>
        <div className="flex justify-between my-1">
          <div>{(betAmount * multiplier + betAmount).toFixed(3)} AVAX</div>
        </div>
      </div>
    </div>
  )
}

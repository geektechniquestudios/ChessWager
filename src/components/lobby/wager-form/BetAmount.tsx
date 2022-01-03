interface Props {
  betAmount: number
  setBetAmount: React.Dispatch<React.SetStateAction<number>>
}

export const BetAmount: React.FC<Props> = ({ betAmount, setBetAmount }) => {
  return (
    <div className="flex border-2">
      <label className="grid place-content-center m-2">Amount</label>
      <div className="border-1 m-2" />
      <div>
        <div className="flex justify-between my-1">
          <span>USD</span>
          <input />
        </div>
        <div className="flex justify-between my-1">
          <span>AVAX</span>
          <input />
        </div>
      </div>
      {/* 
              
              <CurrencyInput
                id="bet-amount"
                name="amount"
                placeholder="Chooes your bet"
                defaultValue={0.01} //@todo display usd equivalent here
                decimalsLimit={6}
                value={betAmount}
                onValueChange={(value) => setBetAmount(Number(value))}
                allowNegativeValue={false}
                suffix="Ξ"
              /> */}
    </div>
  )
}

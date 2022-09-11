import { useState } from "react"

interface Props {}

export const MissedPaymentArea: React.FC<Props> = ({}) => {
  const [betId, setBetId] = useState<string>("")
  const [winningSide, setWinningSide] = useState<string>("")
  const sendPayment = async () => {}
  return (
    <div className="flex h-60 w-full justify-center">
      <fieldset className="mx-auto flex">
        <form
          onSubmit={sendPayment}
          className="flex h-60 w-60 flex-col items-center justify-center"
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault()
          }}
        >
          <input
            type="text"
            value={betId}
            onChange={(e) => setBetId(e.target.value)}
            className="inline-block h-10 w-full resize-none bg-stone-300 p-2 text-lg outline-none dark:bg-stone-800 dark:text-stone-50"
            placeholder="Bet ID"
            autoComplete="off"
          />
          <input
            type="text"
            value={winningSide}
            onChange={(e) => setWinningSide(e.target.value)}
            className="inline-block h-10 w-full resize-none bg-stone-300 p-2 text-lg outline-none dark:bg-stone-800 dark:text-stone-50"
            placeholder="Winning Side"
            autoComplete="off"
          />
          <button
            id="submit-bet"
            className="color-shift clickable rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
            type="submit"
          >
            Send Payment
          </button>
        </form>
      </fieldset>
    </div>
  )
}

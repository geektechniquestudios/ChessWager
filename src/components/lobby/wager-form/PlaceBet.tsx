import "../../../style/buttons.scss"

export const PlaceBet: React.FC = () => {
  return (
    <div className="flex flex-col-reverse">
      <button
        id="submit-bet"
        className="rounded-md border bg-stone-200 dark:bg-stone-900 hover:bg-white hover:text-stone-800  hover:border-black dark:hover:bg-stone-800 dark:hover:text-stone-300 dark:hover:border-stone-300 border-stone-500 dark:border-stone-500 text-stone-800 dark:text-stone-300 font-bold px-2 py-1.5 color-shift clickable"
        type="submit"
      >
        Place Bet
      </button>
    </div>
  )
}

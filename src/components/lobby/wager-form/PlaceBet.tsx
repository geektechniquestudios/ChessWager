import "../../../style/buttons.scss"

export const PlaceBet: React.FC = () => {
  return (
    <div className="flex flex-col-reverse">
      <button
        id="submit-bet"
        className="color-shift clickable rounded-md border border-stone-500 bg-stone-200  px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
        type="submit"
      >
        Place Bet
      </button>
    </div>
  )
}

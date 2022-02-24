import "../../../style/buttons.scss"

export const PlaceBet: React.FC = () => {
  return (
    <div className="flex flex-col-reverse">
      <button
        className="cw-button w-24 h-10 px-2 py-1 grid place-content-center"
        type="submit"
      >
        Place Bet
      </button>
    </div>
  )
}

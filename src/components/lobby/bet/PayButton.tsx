import { BiWallet } from "react-icons/bi"

export const PayButton: React.FC<any> = (sendBet: () => void) => {
  return (
    <div className="flex flex-col justify-center">
      <button
        className="color-shift w-8 h-8 grid place-content-center hover:bg-stone-300 dark:hover:bg-stone-800 rounded-md animate-pulse"
        onClick={sendBet}
      >
        <BiWallet size="24" title="Send Wager" color="green" />
      </button>
    </div>
  )
}

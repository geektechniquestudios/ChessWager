import { RingSpinner } from "react-spinners-kit"
import "../../../style/buttons.scss"
interface Props {
  isLoading: boolean
}

export const PlaceBet: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className="flex flex-col-reverse">
      <button
        className="cw-button w-24 h-10 px-2 py-1 grid place-content-center"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <RingSpinner size={20} color="#2dd4bf" /> : "Place Bet"}
      </button>
    </div>
  )
}

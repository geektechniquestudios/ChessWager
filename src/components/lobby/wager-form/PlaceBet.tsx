import Button from "@mui/material/Button"
import { RingSpinner, WhisperSpinner } from "react-spinners-kit"
import "../../../style/lobby.scss"

interface Props {
  isLoading: boolean
}

export const PlaceBet: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className="flex flex-col-reverse">
      <button
        className="border-1 w-24 h-10 px-2 py-1 place-bet font-bold rounded-sm grid place-content-center"
        // style={{ textTransform: "none", fontWeight: "bold" }}
        // className="font-bold"
        type="submit"
        // variant="outlined"
        // size="small"
      >
        {isLoading ? <RingSpinner size={20} color="#2dd4bf" /> : "Place Bet"}
      </button>
    </div>
  )
}

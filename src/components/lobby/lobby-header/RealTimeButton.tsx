import { BsFillLightningChargeFill, BsLightningCharge } from "react-icons/bs"
import { LobbyHeaderState } from "./LobbyHeaderState"

interface Props {}

export const RealTimeButton: React.FC<Props> = ({}) => {
  const { isRealTime, setIsRealTime } = LobbyHeaderState.useContainer()
  return (
    <button
      className="color-shift text-stone-900 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-none bg-stone-50 dark:bg-stone-700 px-2 grid place-content-center border-r border-stone-400 dark:border-stone-900"
      onClick={() => {
        setIsRealTime(!isRealTime)
      }}
      title="Real-time"
    >
      {isRealTime ? <BsLightningCharge /> : <BsFillLightningChargeFill />}
    </button>
  )
}

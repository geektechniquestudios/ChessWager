import { BsFillLightningChargeFill, BsLightningCharge } from "react-icons/bs"
import { LobbyHeaderState } from "../../containers/LobbyHeaderState"

interface Props {}

export const RealTimeButton: React.FC<Props> = ({}) => {
  const { isRealTime, setIsRealTime } = LobbyHeaderState.useContainer()
  return (
    <button
      className="color-shift grid place-content-center rounded-none border-l border-stone-400 bg-stone-50 px-2 text-stone-900 hover:bg-stone-200 dark:border-stone-900 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
      onClick={() => {
        localStorage.setItem("isRealTime", JSON.stringify(!isRealTime))
        setIsRealTime(!isRealTime)
      }}
      title="Real-time"
    >
      {isRealTime ? <BsFillLightningChargeFill /> : <BsLightningCharge />}
    </button>
  )
}

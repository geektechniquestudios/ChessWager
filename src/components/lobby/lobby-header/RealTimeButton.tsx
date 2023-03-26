import { BsFillLightningChargeFill, BsLightningCharge } from "react-icons/bs"
import { LobbyHeaderState } from "../../containers/LobbyHeaderState"

interface Props {}

export const RealTimeButton: React.FC<Props> = ({}) => {
  const { isRealTime, setIsRealTime } = LobbyHeaderState.useContainer()
  return (
    <button
      className="color-shift clickable my-0.5 grid place-content-center rounded-md py-1 px-2 text-stone-900 hover:bg-stone-300 dark:text-stone-300 dark:hover:bg-stone-700"
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

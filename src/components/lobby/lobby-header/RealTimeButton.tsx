import { BsFillLightningChargeFill, BsLightningCharge } from "react-icons/bs"
import { LobbyHeaderState } from "../../containers/LobbyHeaderState"

interface Props {}

export const RealtimeButton: React.FC<Props> = ({}) => {
  const { isRealtime, setIsRealtime } = LobbyHeaderState.useContainer()
  return (
    <button
      className="color-shift clickable my-0.5 grid w-10 place-content-center rounded-md px-2 py-1 text-stone-900 hover:bg-stone-300 dark:text-stone-300 dark:hover:bg-stone-700"
      onClick={() => {
        localStorage.setItem("isRealTime", JSON.stringify(!isRealtime))
        setIsRealtime(!isRealtime)
      }}
      title="Real-time"
    >
      {isRealtime ? <BsFillLightningChargeFill /> : <BsLightningCharge />}
    </button>
  )
}

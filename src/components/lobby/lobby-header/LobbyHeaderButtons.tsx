import { AiOutlineCalculator } from "react-icons/ai"
import { BsPiggyBank } from "react-icons/bs"
import { FaRegClock, FaRegHandshake } from "react-icons/fa"
import { GiPayMoney, GiYinYang } from "react-icons/gi"
import { DarkModeState } from "../../../containers/DarkModeState"
import { LobbyHeaderButton } from "./LobbyHeaderButton"

export const LobbyHeaderButtons: React.FC = () => {
  const { isDarkOn } = DarkModeState.useContainer()
  return (
    <div className="flex h-8 w-full justify-between gap-1 rounded-t-lg border-b border-stone-400 bg-stone-50 px-1 dark:border-stone-700 dark:bg-stone-800">
      <LobbyHeaderButton buttonName="Side" buttonIcon={<GiYinYang />} />
      <LobbyHeaderButton buttonName="Trust" buttonIcon={<FaRegHandshake />} />
      <LobbyHeaderButton buttonName="Prize" buttonIcon={<BsPiggyBank />} />
      <LobbyHeaderButton
        buttonName="Cost"
        buttonIcon={
          <GiPayMoney
            strokeWidth={28}
            stroke={isDarkOn ? "#d6d3d1" : "#1c1917"}
            color="transparent"
          />
        }
      />
      <LobbyHeaderButton
        buttonName="Multiplier"
        buttonIcon={<AiOutlineCalculator />}
      />
      <LobbyHeaderButton buttonName="Time" buttonIcon={<FaRegClock />} />
    </div>
  )
}

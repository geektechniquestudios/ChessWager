import { FaRegClock, FaRegHandshake } from "react-icons/fa"
import { GiPayMoney, GiYinYang } from "react-icons/gi"
import { AiOutlineCalculator } from "react-icons/ai"
import { BsPiggyBank } from "react-icons/bs"
import { HeaderButton } from "./LobbyHeaderButton"
import { DarkMode } from "../../containers/DarkMode"

export const LobbyHeaderButtons: React.FC = () => {
  const { isDarkOn } = DarkMode.useContainer()
  return (
    <div className="flex justify-between w-full px-20">
      <HeaderButton buttonName="Side" buttonIcon={<GiYinYang />} />
      <HeaderButton buttonName="Trust" buttonIcon={<FaRegHandshake />} />
      <HeaderButton buttonName="Prize" buttonIcon={<BsPiggyBank />} />
      <HeaderButton
        buttonName="Cost"
        buttonIcon={
          <GiPayMoney
            strokeWidth={28}
            stroke={isDarkOn ? "#d6d3d1" : "#1c1917"}
            color="transparent"
          />
        }
      />
      <HeaderButton
        buttonName="Multiplier"
        buttonIcon={<AiOutlineCalculator />}
      />
      <HeaderButton buttonName="Time" buttonIcon={<FaRegClock />} />
    </div>
  )
}

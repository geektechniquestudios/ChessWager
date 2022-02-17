import { FaRegClock, FaRegHandshake } from "react-icons/fa"
import { GiYinYang } from "react-icons/gi"
import { AiOutlineCalculator } from "react-icons/ai"
import { BsPiggyBank } from "react-icons/bs"
import { HeaderButton } from "./LobbyHeaderButton"

export const LobbyHeaderButtons: React.FC = () => {
  return (
    <div className="flex justify-between w-full px-20">
      <HeaderButton buttonName="Trust" buttonIcon={<FaRegHandshake />} />
      <HeaderButton buttonName="Amount" buttonIcon={<BsPiggyBank />} />
      <HeaderButton buttonName="Side" buttonIcon={<GiYinYang />} />
      <HeaderButton buttonName="Age" buttonIcon={<FaRegClock />} />
      <HeaderButton
        buttonName="Multiplier"
        buttonIcon={<AiOutlineCalculator />}
      />
    </div>
  )
}

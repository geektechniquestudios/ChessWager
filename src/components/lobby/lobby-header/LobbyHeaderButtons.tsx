import { AiOutlineCalculator } from "react-icons/ai"
import { BsPiggyBank } from "react-icons/bs"
import { FaRegClock, FaRegHandshake } from "react-icons/fa"
import { GiChessKing } from "react-icons/gi"
import { MdOutlineAttachMoney } from "react-icons/md"
import { HeaderButton } from "./LobbyHeaderButton"

export const LobbyHeaderButtons: React.FC = () => {
  return (
    <div className="flex justify-between w-full px-3">
      <HeaderButton buttonName="Trust" buttonIcon={<FaRegHandshake />} />
      <HeaderButton buttonName="Amount" buttonIcon={<BsPiggyBank />} />
      <HeaderButton buttonName="Side" buttonIcon={<GiChessKing />} />
      <HeaderButton buttonName="Age" buttonIcon={<FaRegClock />} />
      <HeaderButton buttonName="Multiplier" buttonIcon={<AiOutlineCalculator />} />
    </div>
  )
}

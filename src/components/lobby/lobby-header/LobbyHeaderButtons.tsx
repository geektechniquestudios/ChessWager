import {
  FaChess,
  FaChessKnight,
  FaChessPawn,
  FaRegClock,
  FaRegHandshake,
} from "react-icons/fa"
import { MdOutlineAttachMoney } from "react-icons/md"
import { HeaderButton } from "./LobbyHeaderButton"

export const LobbyHeaderButtons: React.FC = () => {
  return (
    <div className="flex justify-between w-full px-3">
      <HeaderButton buttonName="Trust" buttonIcon={<FaRegHandshake />} />
      <HeaderButton buttonName="Amount" buttonIcon={<MdOutlineAttachMoney />} />
      <HeaderButton buttonName="Side" buttonIcon={<FaChess />} />
      <HeaderButton buttonName="Age" buttonIcon={<FaRegClock />} />
    </div>
  )
}

import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.scss"
import "react-toggle/style.css"
import { Auth } from "../containers/Auth"
import { Dropdown } from "./dropdown/Dropdown"
import { SignInButton } from "./buttons/SignInButton"
import { ChessWagerLogo } from "./ChessWagerLogo"
import { RiNotification3Line } from "react-icons/ri"
import { SiLichess } from "react-icons/si"
import { GameId } from "../containers/GameId"
import { HeaderLeft } from "./HeaderLeft"
import { HeaderMiddle } from "./HeaderMiddle"
import { HeaderRight } from "./HeaderRight"
interface Props {
  isDarkOn: boolean
  setIsDarkOn: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
}

export const MainHeader: React.FC<Props> = ({
  isDarkOn,
  setIsDarkOn,
  open,
  setOpen,
  activeMenu,
  setActiveMenu,
}) => {
  return (
    <div className="flex no-wrap justify-between w-full ">
      <HeaderLeft />
      <HeaderMiddle />
      <HeaderRight
        open={open}
        setOpen={setOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isDarkOn={isDarkOn}
        setIsDarkOn={setIsDarkOn}
      />
    </div>
  )
}

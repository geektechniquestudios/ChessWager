import { RiNotification3Line } from "react-icons/ri"
import { SiLichess } from "react-icons/si"
import { Auth } from "../containers/Auth"
import { GameId } from "../containers/GameId"
import { LichessButton } from "./buttons/LichessButton"
import { NotificationButton } from "./buttons/NotificationButton"
import { SignInButton } from "./buttons/SignInButton"
import { Dropdown } from "./dropdown/Dropdown"

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  isDarkOn: boolean
  setIsDarkOn: React.Dispatch<React.SetStateAction<boolean>>
}

export const HeaderRight: React.FC<Props> = ({
  open,
  setOpen,
  activeMenu,
  setActiveMenu,
  isDarkOn,
  setIsDarkOn,
}) => {
  return (
    <div className="flex-auto justify-end align-middle flex mx-3 gap-1.5">
      <LichessButton />
      <NotificationButton setOpen={setOpen} setActiveMenu={setActiveMenu} />
      <SignInButton />
      <Dropdown
        setIsDarkOn={setIsDarkOn}
        isDarkOn={isDarkOn}
        open={open}
        setOpen={setOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
    </div>
  )
}

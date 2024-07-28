import "../../../../style/dropdown.scss"
import "react-toggle/style.css"
import { AuthState } from "../../../../containers/AuthState"
import { DropdownItem } from "../models/DropdownItem"
import Toggle from "react-toggle"
import { RiLoginCircleLine, RiLogoutCircleLine } from "react-icons/ri"
import { BsShare } from "react-icons/bs"
import { BiHelpCircle } from "react-icons/bi"
import { MdAttachMoney, MdMoneyOff, MdOutlineDarkMode } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import { DropdownState } from "../../../../containers/DropdownState"
import { DarkModeState } from "../../../../containers/DarkModeState"
import { Menu } from "../models/Menu"
import { MenuLine } from "../models/MenuLine"

export const Main: React.FC = () => {
  const {
    user,
    signOutWithGoogle,
    signInWithGoogle,
    connectWallet,
    isWalletConnected,
    disconnectWallet,
  } = AuthState.useContainer()
  const { goToMenu, closeDropdownMenu } = DropdownState.useContainer()
  const { isDarkOn, setIsDarkOn } = DarkModeState.useContainer()
  return (
    <Menu
      menuItems={[
        <DropdownItem
          id="Social"
          leftIcon={<BsShare />}
          goToMenu="social"
          text="Social"
          onClick={() => goToMenu("social")}
        />,
        <DropdownItem
          leftIcon={<BiHelpCircle />}
          goToMenu="help"
          text="Help"
          onClick={() => goToMenu("help")}
        />,
        <DropdownItem
          id="dark-mode"
          onClick={() => {
            setIsDarkOn(!isDarkOn)
          }}
          rightIcon={
            <Toggle
              icons={false}
              className="toggle pointer-events-none"
              checked={isDarkOn}
              readOnly
            />
          }
          leftIcon={isDarkOn ? <MdOutlineDarkMode /> : <BsSun />}
          text={isDarkOn ? "Dark Mode" : "Light Mode"}
        />,
        <MenuLine />,
        <div>
          {!isWalletConnected && (
            <DropdownItem
              onClick={() => {
                closeDropdownMenu()
                connectWallet()
              }}
              leftIcon={<MdAttachMoney />}
              text="Connect Wallet"
            />
          )}
        </div>,
        <div>
          {isWalletConnected && (
            <DropdownItem
              onClick={() => {
                disconnectWallet()
              }}
              leftIcon={<MdMoneyOff />}
              text="Disconnect Wallet"
            />
          )}
        </div>,
        <div>
          {!user && (
            <DropdownItem
              id="dropdown-sign-in-button"
              onClick={() => {
                closeDropdownMenu()
                signInWithGoogle()
              }}
              leftIcon={<RiLoginCircleLine />}
              text="Sign In"
            />
          )}
        </div>,
        <div>
          {user && (
            <DropdownItem
              id="dropdown-sign-out-button"
              onClick={() => {
                closeDropdownMenu()
                signOutWithGoogle()
              }}
              leftIcon={<RiLogoutCircleLine />}
              text="Sign Out"
            />
          )}
        </div>,
      ]}
      thisMenu="main"
    />
  )
}

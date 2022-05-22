import "../../../../style/dropdown.scss"
import "react-toggle/style.css"
import { Auth } from "../../../containers/Auth"
import { DropdownItem } from "../models/DropdownItem"
import Toggle from "react-toggle"
import { RiLoginCircleLine, RiLogoutCircleLine } from "react-icons/ri"
import { BsShare } from "react-icons/bs"
import { BiHelpCircle } from "react-icons/bi"
import { MdAttachMoney, MdMoneyOff, MdOutlineDarkMode } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import { DropdownState } from "../../../containers/DropdownState"
import { DarkMode } from "../../../containers/DarkMode"
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
  } = Auth.useContainer()
  const {
    setIsDropdownOpen,
    setMenuHeight,
    setActiveMenu,
    menuStack,
    setMenuStack,
  } = DropdownState.useContainer()
  const { isDarkOn, setIsDarkOn } = DarkMode.useContainer()
  const updateUserDarkPref = (isChecked: boolean) => {
    localStorage.setItem("darkMode", isChecked.toString())
  }
  return (
    <Menu
      menuItems={[
        <DropdownItem
          id="Social"
          leftIcon={<BsShare />}
          goToMenu="social"
          text="Social"
          onClick={() => setMenuStack([...menuStack, "social"])}
        />,
        <DropdownItem
          leftIcon={<BiHelpCircle />}
          goToMenu="help"
          text="Help"
          onClick={() => setMenuStack([...menuStack, "help"])}
        />,
        <div id="dark-mode">
          <DropdownItem
            onClick={() => {
              setIsDarkOn(!isDarkOn)
              updateUserDarkPref(!isDarkOn)
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
          />
        </div>,
        <MenuLine />,
        <div>
          {!isWalletConnected && (
            <DropdownItem
              onClick={() => {
                setIsDropdownOpen(false)
                setActiveMenu("")
                setMenuHeight(0)
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
              onClick={() => {
                setIsDropdownOpen(false)
                setActiveMenu("")
                setMenuHeight(0)
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

import "../../../../style/dropdown.scss"
import "react-toggle/style.css"
import { Auth } from "../../../containers/Auth"
import { DropdownItem } from "../models/DropdownItem"
import Toggle from "react-toggle"
import { CgProfile } from "react-icons/cg"
import {
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiSettings5Line,
} from "react-icons/ri"
import { BsShare } from "react-icons/bs"
import { BiHelpCircle, BiSearchAlt2 } from "react-icons/bi"
import { MdAttachMoney, MdMoneyOff, MdOutlineDarkMode } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import { GoGift } from "react-icons/go"
import { DropdownState } from "../../../containers/DropdownState"
import { DarkMode } from "../../../containers/DarkMode"
import { Menu } from "../models/Menu"
import { AiOutlineTrophy } from "react-icons/ai"
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
          leftIcon={<BsShare />}
          goToMenu="social"
          text="Social"
          key={3}
          onClick={() => setMenuStack([...menuStack, "social"])}
        />,
        <DropdownItem
          leftIcon={<BiHelpCircle />}
          goToMenu="help"
          text="Help"
          key={6}
          onClick={() => setMenuStack([...menuStack, "help"])}
        />,
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
          key={7}
        />,
        <MenuLine key={8} />,
        <div key={9}>
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
        <div key={10}>
          {isWalletConnected && (
            <DropdownItem
              onClick={() => {
                setIsDropdownOpen(false)
                setActiveMenu("")
                setMenuHeight(0)
                disconnectWallet()
              }}
              leftIcon={<MdMoneyOff />}
              text="Disconnect Wallet"
            />
          )}
        </div>,
        <div key={11}>
          {!user && (
            <DropdownItem
              onClick={() => {
                setIsDropdownOpen(false)
                setMenuHeight(0)
                signInWithGoogle()
              }}
              leftIcon={<RiLoginCircleLine />}
              text="Sign In"
            />
          )}
        </div>,
        <div key={12}>
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

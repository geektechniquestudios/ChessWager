import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { DropdownItem } from "../DropdownItem"
import Toggle from "react-toggle"

import { CgProfile } from "react-icons/cg"
import {
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiSettings5Line,
} from "react-icons/ri"
import { BsShare } from "react-icons/bs"
import { BiHelpCircle } from "react-icons/bi"
import { MdAttachMoney, MdMoneyOff, MdOutlineDarkMode } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import { GoGift } from "react-icons/go"
import { DropdownState } from "../../../containers/DropdownState"
import { DarkMode } from "../../../containers/DarkMode"
import { Menu } from "../Menu"

export const Main: React.FC = () => {
  const {
    user,
    signOutWithGoogle,
    signInWithGoogle,
    connectWallet,
    isWalletConnected,
    disconnectWallet,
  } = Auth.useContainer()
  const { setIsDropdownOpen, setMenuHeight } = DropdownState.useContainer()
  const { isDarkOn, setIsDarkOn } = DarkMode.useContainer()
  const updateUserDarkPref = (isChecked: boolean) => {
    localStorage.setItem("darkMode", isChecked.toString())
  }
  return (
    <Menu
      menuItems={[
        <div key={0}>
          {user && (
            <DropdownItem
              leftIcon={<CgProfile />}
              goToMenu="profile"
              text="Profile"
            />
          )}
        </div>,
        <div key={1}>
          {user && (
            <DropdownItem
              leftIcon={<RiSettings5Line />}
              goToMenu="settings"
              text="Settings"
            />
          )}
        </div>,
        <div key={2}>
          {user && (
            <DropdownItem leftIcon={<GoGift />} goToMenu="store" text="Store" />
          )}
        </div>,
        <DropdownItem
          leftIcon={<BsShare />}
          goToMenu="social"
          text="Social"
          key={3}
        />,
        <DropdownItem
          leftIcon={<BiHelpCircle />}
          goToMenu="help"
          text="Help"
          key={4}
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
          key={5}
        />,
        <div
          className="border-b-2 border-stone-400 dark:border-stone-600"
          key={6}
        />,
        <div key={7}>
          {!isWalletConnected && (
            <DropdownItem
              onClick={connectWallet}
              leftIcon={<MdAttachMoney />}
              text="Connect Wallet"
            />
          )}
        </div>,
        <div key={8}>
          {isWalletConnected && (
            <DropdownItem
              onClick={disconnectWallet}
              leftIcon={<MdMoneyOff />}
              text="Disconnect Wallet"
            />
          )}
        </div>,
        <div key={9}>
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
        <div key={10}>
          {user && (
            <DropdownItem
              onClick={() => {
                setIsDropdownOpen(false)
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

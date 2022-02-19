import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { DropdownItem } from "../DropdownItem"
import { CSSTransition } from "react-transition-group"
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

export const Main: React.FC = () => {
  const {
    user,
    signOutWithGoogle,
    signInWithGoogle,
    connectWallet,
    isWalletConnected,
    disconnectWallet,
  } = Auth.useContainer()

  const { setMenuHeight, activeMenu, heightMultiplier } =
    DropdownState.useContainer()
  const { isDarkOn, setIsDarkOn } = DarkMode.useContainer()
  const updateUserDarkPref = (isChecked: boolean) => {
    localStorage.setItem("darkMode", isChecked.toString())
  }

  const calcHeight = (el: any) => {
    const height = el.offsetHeight * heightMultiplier
    setMenuHeight(height)
  }

  return (
    <>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          {user && (
            <DropdownItem
              leftIcon={<CgProfile />}
              goToMenu="profile"
              text="Profile"
            />
          )}
          {user && (
            <DropdownItem
              leftIcon={<RiSettings5Line />}
              goToMenu="settings"
              text="Settings"
            />
          )}
          {user && (
            <DropdownItem leftIcon={<GoGift />} goToMenu="store" text="Store" />
          )}
          <DropdownItem
            leftIcon={<BsShare />}
            goToMenu="social"
            text="Social"
          />
          <DropdownItem
            leftIcon={<BiHelpCircle />}
            goToMenu="help"
            text="Help"
          />
          <DropdownItem
            onClick={() => {
              setIsDarkOn(!isDarkOn)
              updateUserDarkPref(!isDarkOn)
            }}
            rightIcon={
              <div className="px-2 justify-center align-middle flex h-full py-2 ">
                <Toggle
                  icons={false}
                  className="toggle pointer-events-none "
                  checked={isDarkOn}
                  readOnly
                />
              </div>
            }
            leftIcon={isDarkOn ? <MdOutlineDarkMode /> : <BsSun />}
            text={isDarkOn ? "Dark Mode" : "Light Mode"}
          />
          <div className="border-b-2" />
          {!isWalletConnected && (
            <DropdownItem
              onClick={connectWallet}
              leftIcon={<MdAttachMoney />}
              text="Connect Wallet"
            />
          )}
          {isWalletConnected && (
            <DropdownItem
              onClick={disconnectWallet}
              leftIcon={<MdMoneyOff />}
              text="Disconnect Wallet"
            />
          )}

          {!user && (
            <DropdownItem
              onClick={() => {
                signInWithGoogle()
              }}
              leftIcon={<RiLoginCircleLine />}
              text="Sign In"
            />
          )}
          {user && (
            <DropdownItem
              onClick={signOutWithGoogle}
              leftIcon={<RiLogoutCircleLine />}
              text="Sign Out"
            />
          )}
        </div>
      </CSSTransition>
    </>
  )
}

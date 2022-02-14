import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { DropdownItem } from "../DropdownItem"
import { CSSTransition } from "react-transition-group"
import Toggle from "react-toggle"

import { StaticDropdownItem } from "../StaticDropdownItem"
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
            <DropdownItem leftIcon={<CgProfile />} goToMenu="profile">
              Profile
            </DropdownItem>
          )}
          {user && (
            <DropdownItem leftIcon={<RiSettings5Line />} goToMenu="settings">
              Settings
            </DropdownItem>
          )}

          {user && (
            <DropdownItem leftIcon={<GoGift />} goToMenu="store">
              Store
            </DropdownItem>
          )}
          <DropdownItem leftIcon={<BsShare />} goToMenu="social">
            Social
          </DropdownItem>
          <DropdownItem leftIcon={<BiHelpCircle />} goToMenu="help">
            Help
          </DropdownItem>
          <StaticDropdownItem
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
          >
            {isDarkOn ? "Dark Mode" : "Light Mode"}
          </StaticDropdownItem>
          <div className="border-b-2" />
          {!isWalletConnected && (
            <StaticDropdownItem
              onClick={connectWallet}
              leftIcon={<MdAttachMoney />}
            >
              Connect Wallet
            </StaticDropdownItem>
          )}
          {isWalletConnected && (
            <StaticDropdownItem
              onClick={disconnectWallet}
              leftIcon={<MdMoneyOff />}
            >
              Disconnect Wallet
            </StaticDropdownItem>
          )}

          {!user && (
            <StaticDropdownItem
              onClick={() => {
                signInWithGoogle()
              }}
              leftIcon={<RiLoginCircleLine />}
            >
              Log in
            </StaticDropdownItem>
          )}

          {user && (
            <StaticDropdownItem
              onClick={signOutWithGoogle}
              leftIcon={<RiLogoutCircleLine />}
            >
              Log Out
            </StaticDropdownItem>
          )}
        </div>
      </CSSTransition>
    </>
  )
}

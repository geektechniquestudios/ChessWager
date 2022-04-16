import { SignInButton } from "./buttons/SignInButton"
import { MainHeaderButton } from "./buttons/MainHeaderButton"
import { BiChevronDown, BiSearchAlt2 } from "react-icons/bi"
import { RiChat2Line, RiNotification3Line } from "react-icons/ri"
import { DarkMode } from "../containers/DarkMode"
import { FaRegGem } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { UserDataState } from "../containers/UserDataState"
import { Auth } from "../containers/Auth"
import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { firebaseApp } from "../../config"
import { DropdownMenu } from "./dropdown/DropdownMenu"
import { DropdownState } from "../containers/DropdownState"

const db = getFirestore(firebaseApp)

export const HeaderRight: React.FC = () => {
  const { isDarkOn } = DarkMode.useContainer()
  const { userData } = UserDataState.useContainer()

  const greenMessageStyle =
    userData?.hasNewMessage ?? false
      ? isDarkOn
        ? "text-green-400"
        : "text-green-600"
      : ""
  const greenNotificationStyle =
    userData?.hasNewNotifications ?? false
      ? isDarkOn
        ? "text-green-400"
        : "text-green-600"
      : ""

  const { auth } = Auth.useContainer()
  const setNewMessagesToFalse = () => {
    if (!userData!.hasNewMessage) return
    const userRef = doc(db, "users", auth.currentUser!.uid)
    updateDoc(userRef, { hasNewMessage: false })
  }
  const setNewNotificationsToFalse = () => {
    if (!userData!.hasNewNotifications) return
    const userRef = doc(db, "users", auth.currentUser!.uid)
    updateDoc(userRef, { hasNewNotifications: false })
  }
  const { isDropdownOpen, setIsDropdownOpen, setActiveMenu } =
    DropdownState.useContainer()
  return (
    <div className="flex-auto justify-end align-middle items-center flex mx-3 gap-1.5">
      <MainHeaderButton
        title="Search Users"
        openToMenu="searchUsers"
        icon={<BiSearchAlt2 size="21" />}
        authRequired={true}
      />
      <MainHeaderButton
        title="Notifications"
        openToMenu="notifications"
        icon={
          <RiNotification3Line
            size="21"
            className={`${greenNotificationStyle}`}
          />
        }
        onClick={setNewNotificationsToFalse}
        authRequired={true}
      />
      <MainHeaderButton
        title="Messages"
        openToMenu="messages"
        icon={<RiChat2Line size="21" className={`${greenMessageStyle}`} />}
        onClick={setNewMessagesToFalse}
        authRequired={true}
      />
      <MainHeaderButton
        title="Bets"
        openToMenu="bets"
        icon={<FaRegGem size="20" />}
        authRequired={true}
      />
      <MainHeaderButton
        title="Persona"
        openToMenu="persona"
        icon={<CgProfile size="21" />}
        authRequired={true}
      />
      <SignInButton />
      <MainHeaderButton
        title="Main"
        openToMenu="main"
        icon={<BiChevronDown size="21" />}
        authRequired={false}
      />
      {isDropdownOpen && <DropdownMenu />}
    </div>
  )
}

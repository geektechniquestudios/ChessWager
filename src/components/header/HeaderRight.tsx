import { SignInButton } from "./buttons/SignInButton"
import { Dropdown } from "./dropdown/Dropdown"
import { MainHeaderButton } from "./buttons/MainHeaderButton"
import { BiSearchAlt2 } from "react-icons/bi"
import { RiChat2Line, RiNotification3Line } from "react-icons/ri"
import { FiUsers } from "react-icons/fi"
import { ConversationsState } from "../containers/ConversationsState"
import { DarkMode } from "../containers/DarkMode"

export const HeaderRight: React.FC = () => {
  const { doesUserHaveNewMessages } = ConversationsState.useContainer()
  const { isDarkOn } = DarkMode.useContainer()

  const messageIcon: React.ReactNode = doesUserHaveNewMessages ? (
    <RiChat2Line
      size="21"
      className="m-2"
      color={isDarkOn ? "#4ade80" : "#16a34a"}
    />
  ) : (
    <RiChat2Line size="21" className="m-2" />
  )

  return (
    <div className="flex-auto justify-end align-middle flex mx-3 gap-1.5">
      <MainHeaderButton
        title="Search Users"
        openToMenu="searchUsers"
        icon={<BiSearchAlt2 size="21" className="m-2" />}
      />
      <MainHeaderButton
        title="Messages"
        openToMenu="messages"
        icon={messageIcon}
      />
      <MainHeaderButton
        title="Friends"
        openToMenu="friends"
        icon={<FiUsers size="21" className="m-2" />}
      />
      <MainHeaderButton
        title="Notifications"
        openToMenu="notifications"
        icon={<RiNotification3Line size="21" className="m-2" />}
      />
      <SignInButton />
      <Dropdown />
    </div>
  )
}

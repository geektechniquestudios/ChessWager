import { BiArrowFromLeft } from "react-icons/bi"
import { RiChatSettingsLine } from "react-icons/ri"
import { ChatToggle } from "../containers/ChatToggle"
import { DropdownState } from "../containers/DropdownState"

export const ChatHeader: React.FC = () => {
  const { setIsDropdownOpen, setActiveMenu } = DropdownState.useContainer()
  const { setShowChat } = ChatToggle.useContainer()
  return (
    <header className="global-chat-header flex bg-stone-200 dark:bg-stone-700 border-b border-stone-400 dark:border-stone-700 justify-between">
      <button
        onClick={() => {
          setShowChat(false)
          localStorage.setItem("showChat", "false")
        }}
        className=" hover:bg-stone-400 dark:hover:bg-stone-800 rounded-md color-shift m-2"
      >
        <BiArrowFromLeft
          size="1.3em"
          className="text-stone-900 dark:text-stone-50 m-1 color-shift"
        />
      </button>
      <div className="text-stone-900 dark:text-stone-50 grid place-content-center text-bold text-md">
        GLOBAL CHAT
      </div>
      <div className="w-11"/>
      {/* <button
        className=" hover:bg-stone-400 dark:hover:bg-stone-800 rounded-md color-shift m-2"
        onClick={() => {
          setActiveMenu("settings")
          setIsDropdownOpen(true)
        }}
      >
        <RiChatSettingsLine
          size="1.3em"
          className="text-stone-900 dark:text-stone-50 m-1 color-shift cw-button border-none bg-transparent"
          title="Chat Settings"
        />
      </button> */}
    </header>
  )
}

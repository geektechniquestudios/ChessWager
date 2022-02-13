import { BiArrowFromLeft } from "react-icons/bi"
import { RiChatSettingsLine } from "react-icons/ri"

interface Props {
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChatHeader: React.FC<Props> = ({
  setActiveMenu,
  setOpen,
  setShowChat,
}) => {
  return (
    <header className="flex bg-stone-200 dark:bg-stone-900 border-b border-stone-400 dark:border-stone-700 justify-between">
      <button
        onClick={() => {
          setShowChat(false)
          localStorage.setItem("showChat", "false")
        }}
        className=" hover:bg-stone-400 dark:hover:bg-stone-700 rounded-sm color-shift m-2"
      >
        <BiArrowFromLeft
          size="1.3em"
          className="text-stone-900 dark:text-stone-50 m-1 color-shift"
        />
      </button>
      <div className="text-stone-900 dark:text-stone-50 grid place-content-center text-bold text-md">
        GLOBAL CHAT
      </div>
      <button
        className=" hover:bg-stone-400 dark:hover:bg-stone-700 rounded-sm color-shift m-2"
        onClick={() => {
          setActiveMenu("settings")
          setOpen(true)
        }}
      >
        <RiChatSettingsLine
          size="1.3em"
          className="text-stone-900 dark:text-stone-50 m-1 color-shift cw-button border-none bg-transparent"
          title="Chat Settings"
        />
      </button>
    </header>
  )
}

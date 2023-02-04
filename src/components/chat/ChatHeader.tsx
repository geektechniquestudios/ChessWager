import { BiArrowFromLeft } from "react-icons/bi"
import { ChatToggle } from "../containers/ChatToggle"

export const ChatHeader: React.FC = () => {
  const { setShowChat } = ChatToggle.useContainer()
  return (
    <header className="global-chat-header flex justify-between border-b border-stone-400 bg-stone-200 dark:border-stone-700 dark:bg-stone-700">
      <button
        id="hide-chat-button"
        onClick={() => {
          setShowChat(false)
          localStorage.setItem("showChat", "false")
        }}
        className=" color-shift m-2 rounded-md hover:bg-stone-400 dark:hover:bg-stone-800"
      >
        <BiArrowFromLeft
          size="1.3em"
          className="color-shift m-1 text-stone-900 dark:text-stone-50"
          title="Hide Chat"
        />
      </button>
      <div className="text-bold text-md grid place-content-center text-stone-900 dark:text-stone-50">
        PUBLIC CHAT
      </div>
      <div className="w-11" />
    </header>
  )
}

import { BiArrowFromRight } from "react-icons/bi"
import { ChatToggle } from "../containers/ChatToggle"

interface Props {}

export const ShowChatButton: React.FC<Props> = ({}) => {
  const { showChat, setShowChat } = ChatToggle.useContainer()

  return (
    <>
      {!showChat && (
        <button
          id="show-chat-button"
          onClick={() => {
            setShowChat(true)
            localStorage.setItem("showChat", "true")
          }}
          className="m-3 hover:bg-stone-400 dark:hover:bg-stone-700 rounded-md color-shift absolute top-12 right-0"
        >
          <BiArrowFromRight
            size="1.4em"
            className="text-stone-900 dark:text-stone-50 m-1 color-shift"
          />
        </button>
      )}
    </>
  )
}

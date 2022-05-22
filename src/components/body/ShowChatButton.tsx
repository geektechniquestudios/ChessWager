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
          className="color-shift absolute top-12 right-0 m-3 rounded-md hover:bg-stone-400 dark:hover:bg-stone-700"
        >
          <BiArrowFromRight
            size="1.4em"
            className="color-shift m-1 text-stone-900 dark:text-stone-50"
          />
        </button>
      )}
    </>
  )
}

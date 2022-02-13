import { Auth } from "../containers/Auth"

interface Props {
  message: {
    text: string
    uid: string
    photoURL: string
    userName: string
  }
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const { auth } = Auth.useContainer()
  const { text, uid, photoURL, userName } = message

  const userMessage = uid === auth.currentUser?.uid ? "text-left" : ""

  return (
    <div
      className={`${userMessage} w-full hover:bg-stone-500 color-shift gap-1.5 p-2 rounded-md color-shift flex`}
    >
      <img
        src={photoURL}
        alt=""
        title={userName}
        className="w-4 h-4 rounded-full"
      />
      <div className="text-xs text-stone-900 dark:text-stone-300">{`${
        userName.split(" ")[0]
      }`}</div>
      <p className="message-text relative text-base break-words text-stone-900 dark:text-stone-300">
        {text}
      </p>
    </div>
  )
}

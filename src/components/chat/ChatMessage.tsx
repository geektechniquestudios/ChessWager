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

  let messageClass
  if (!auth.currentUser) {
    messageClass = "received"
  } else {
    messageClass = uid === auth.currentUser.uid ? "sent" : "received"
  }
  return (
    <>
      <div
        className={`message ${messageClass} w-full hover:bg-stone-500 color-shift rounded-md gap-1.5`}
      >
        <img
          src={photoURL}
          alt=""
          title={userName}
          className="chat-user-img w-4 h-4 rounded-full"
        />
        <div className="text-xs">{`${userName.split(" ")[0]}`}</div>
        <p className="message-text relative text-base break-words">{text}</p>
      </div>
    </>
  )
}

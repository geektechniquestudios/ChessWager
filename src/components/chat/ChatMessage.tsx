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
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="" title={userName} className="user-img" />
        <p className="message-text">{text}</p>
      </div>
    </>
  )
}

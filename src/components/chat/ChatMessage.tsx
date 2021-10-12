import { AuthContainer } from "../containers/Auth"

const ChatMessage: React.FC<{
  message: {
    text: string
    uid: string
    photoURL: string
    userName: string
  }
}> = ({ message }) => {
  const { auth } = AuthContainer.useContainer()
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
        <img src={photoURL} alt="" title={userName} />
        <p>{text}</p>
      </div>
    </>
  )
}

export default ChatMessage

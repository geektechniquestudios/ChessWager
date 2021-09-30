import "../../style/chat.css"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"

import { useCollectionData } from "react-firebase-hooks/firestore"
import { useRef, useState } from "react"
import "../../config"

const firestore = firebase.firestore()
//const storage = getStorage()

interface Props {
  user: firebase.User | null | undefined
  auth: firebase.auth.Auth
}

const GlobalChat: React.FC<Props> = ({ user, auth }) => {
  return (
    <div className="global-chat">
      <section>
        <ChatRoom user={user} auth={auth} />
      </section>
    </div>
  )
}

const ChatRoom: React.FC<Props> = ({ user, auth }) => {
  const dummy = useRef<HTMLInputElement>(null)
  const messagesRef = firestore.collection("messages")
  const query = messagesRef.orderBy("createdAt", "desc").limit(25)

  const [messages] = useCollectionData(query, { idField: "id" })
  const [formValue, setFormValue] = useState("")

  const sendMessage = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (formValue === "" || !user) {
      //@todo make regex for any empty string
      return
    }
    if (auth.currentUser) {
      const { uid, photoURL }: firebase.User = auth.currentUser

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        userName: auth.currentUser.displayName,
      })

      setFormValue("")
      if (dummy.current != null) {
        dummy.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <>
      <main>
        <span ref={dummy}></span>
        {messages &&
          messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} auth={auth} />
          ))}
      </main>
      <fieldset disabled={!auth.currentUser}>
        <form onSubmit={e => sendMessage(e)}>
          <input
            value={auth.currentUser ? formValue : "sign in to chat"}
            onChange={e => setFormValue(e.target.value)}
          />
          <button type="submit">🕊️</button>
        </form>
      </fieldset>
    </>
  )
}

const ChatMessage: React.FC<{
  message: {
    text: string
    uid: string
    photoURL: string
    userName: string
  }
  auth: firebase.auth.Auth
}> = ({ message, auth }) => {
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

export default GlobalChat

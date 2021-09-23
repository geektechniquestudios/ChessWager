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

function GlobalChat({ user, auth }) {
  return (
    <div className="global-chat">
      <section>
        <ChatRoom user={user} auth={auth} />
      </section>
    </div>
  )
}

const ChatRoom = ({ user, auth }) => {
  const dummy = useRef()
  const messagesRef = firestore.collection("messages")
  const query = messagesRef.orderBy("createdAt", "desc").limit(25)

  const [messages] = useCollectionData(query, { idField: "id" })
  const [formValue, setFormValue] = useState("")

  const sendMessage = async e => {
    e.preventDefault()
    if (formValue === "" || !user) {
      //@todo make regex for any empty string
      return
    }
    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      userName: auth.currentUser.displayName,
    })

    setFormValue("")
    dummy.current.scrollIntoView({ behavior: "smooth" })
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
        <form onSubmit={sendMessage}>
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

function ChatMessage({ message, auth }) {
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
        {/* <p style={{ fontSize: 5, padding: 5 }}>{userName}</p> */}
        {/* remove inline style @todo */}
        <img src={photoURL} alt="" />
        <p>{text}</p>
      </div>
    </>
  )
}

export default GlobalChat

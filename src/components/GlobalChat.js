import "../style/chat.css"
import "../config"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useRef, useState } from "react"

const auth = firebase.auth()
const firestore = firebase.firestore()
//const storage = getStorage()

function GlobalChat() {
  const [user] = useAuthState(auth)

  return (
    <div className="global-chat">
      {/* <header>
        <SignOut />
      </header> */}
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const ChatRoom = () => {
  const dummy = useRef()
  const messagesRef = firestore.collection("messages")
  const query = messagesRef.orderBy("createdAt", "desc").limit(25)

  const [messages] = useCollectionData(query, { idField: "id" })
  const [formValue, setFormValue] = useState("")

  const sendMessage = async e => {
    e.preventDefault()
    if (formValue === "") {
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
          messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={e => setFormValue(e.target.value)} />
        <button type="submit">🕊️</button>
      </form>
    </>
  )
}

function ChatMessage({ message }) {
  const { text, uid, photoURL, userName } = message

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received"
  return (
    <>
      <div className={`message ${messageClass}`}>
        <p style={{ fontSize: 5, padding: 5 }}>{userName}</p>
        {/* remove inline style @todo */}
        <img src={photoURL} alt="" />
        <p>{text}</p>
      </div>
    </>
  )
}

export default GlobalChat

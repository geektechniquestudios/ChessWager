import "../../style/chat.scss"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"

import { useCollectionData } from "react-firebase-hooks/firestore"
import { useRef, useState } from "react"
import { Auth } from "../containers/Auth"
import { ChatMessage } from "./ChatMessage"
import { Firestore } from "../containers/Firestore"

export const GlobalChat: React.FC<Props> = ({ showChat, setShowChat }) => {
  return (
    <div className="global-chat ">
      {showChat && <ChatRoom showChat={showChat} setShowChat={setShowChat} />}
    </div>
  )
}

interface Props {
  showChat: boolean
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatRoom: React.FC<Props> = ({ showChat, setShowChat }) => {
  const { firestore } = Firestore.useContainer()
  const { user, auth } = Auth.useContainer()

  const dummy = useRef<HTMLInputElement>(null)
  const messagesRef = firestore.collection("messages")
  const query = messagesRef.orderBy("createdAt", "desc").limit(25)

  const [messages] = useCollectionData(query, { idField: "id" })
  const [formValue, setFormValue] = useState("")

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="border-l-2 border-black">
      <header className="flex border-b-2 border-black">
        <button
          onClick={() => setShowChat(!showChat)}
          className="bg-white w-16 m-1 rounded-sm"
        >
          {"->"}
        </button>
      </header>
      <main>
        <fieldset disabled={!auth.currentUser} className="fieldset">
          <form onSubmit={(e) => sendMessage(e)} className="form">
            <input
              type="text-area"
              value={auth.currentUser ? formValue : "sign in to chat"}
              onChange={(e) => setFormValue(e.target.value)}
              className="input"
            />
            <div className="w-full flex justify-end">
              <button type="submit">🕊️</button>
            </div>
          </form>
        </fieldset>
        <span ref={dummy}></span>
        <div className="">
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
      </main>
    </div>
  )
}

export default GlobalChat

import "../../style/chat.scss"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"
import TextareaAutosize from "react-textarea-autosize"

import { useCollectionData } from "react-firebase-hooks/firestore"
import { useRef, useState } from "react"
import { Auth } from "../containers/Auth"
import { ChatMessage } from "./ChatMessage"
import { Firestore } from "../containers/Firestore"

interface Props {
  showChat: boolean
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
  formValue: string
  setFormValue: React.Dispatch<React.SetStateAction<string>>
}

export const GlobalChat: React.FC<Props> = ({
  showChat,
  setShowChat,
  formValue,
  setFormValue,
}) => {
  const { firestore } = Firestore.useContainer()
  const { user, auth } = Auth.useContainer()

  const dummy = useRef<HTMLInputElement>(null)
  const messagesRef = firestore.collection("messages")
  const query = messagesRef.orderBy("createdAt", "desc").limit(25)

  const [messages] = useCollectionData(query, { idField: "id" })

  const sendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
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
    <div className="border-l-2 border-black global-chat">
      <header className="flex border-b-2 border-black">
        <button
          onClick={() => {
            setShowChat(false)
            localStorage.setItem("showChat", "false")
          }}
          className="bg-white w-16 m-1 rounded-sm"
        >
          {"->"}
        </button>
      </header>
      <main>
        <fieldset disabled={!auth.currentUser} className="fieldset">
          <form onSubmit={(e) => sendMessage(e)} className="form">
            <TextareaAutosize
              value={auth.currentUser ? formValue : "sign in to chat"}
              onChange={(e) => setFormValue(e.target.value)}
              className="input"
              placeholder="send a message"
              maxRows={4}
              onKeyDown={(e) => {
                e.key === "Enter" && sendMessage(e)
              }}
            />
            <div className="w-full flex justify-end mt-2">
              <button type="submit">🕊️</button>
            </div>
          </form>
        </fieldset>
        <span ref={dummy}></span>
        <div className="flex flex-col-reverse pb-3">
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
      </main>
    </div>
  )
}

export default GlobalChat

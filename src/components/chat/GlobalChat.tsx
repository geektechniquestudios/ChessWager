import "../../style/chat.scss"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"
import TextareaAutosize from "react-textarea-autosize"
import Button from "@mui/material/Button"

import { useCollectionData } from "react-firebase-hooks/firestore"
import { useRef } from "react"
import { Auth } from "../containers/Auth"
import { ChatMessage } from "./ChatMessage"
import { Firestore } from "../containers/Firestore"
import { BiArrowFromLeft } from "react-icons/bi"

interface Props {
  showChat: boolean
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
  formValue: string
  setFormValue: React.Dispatch<React.SetStateAction<string>>
  setAutoShowChat: React.Dispatch<React.SetStateAction<boolean>>
  setAutoHideChat: React.Dispatch<React.SetStateAction<boolean>>
  width: number
}

export const GlobalChat: React.FC<Props> = ({
  width,
  showChat,
  setShowChat,
  formValue,
  setFormValue,
  setAutoShowChat,
  setAutoHideChat,
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

    if (formValue.trim() === "" || !user) {
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
    <div
      className="border-l-2 border-black global-chat"
      style={{ width: "21em" }}
    >
      <header className="flex border-b-2 border-black">
        <button
          onClick={() => {
            // setAutoShowChat(false)
            // setAutoHideChat(false)
            setShowChat(false)
            localStorage.setItem("showChat", "false")
            // if (width > 850) {

            // }
          }}
          className="m-3 hover:bg-secondary-dark rounded-sm color-shift"
        >
          <BiArrowFromLeft
            size="1.4em"
            className="text-primary-dark hover:text-primary-dark dark:text-primary m-1 color-shift"
          />
        </button>
      </header>
      <main>
        <fieldset
          disabled={!auth.currentUser}
          className="fieldset justify-center flex"
        >
          <form
            onSubmit={(e) => sendMessage(e)}
            className="form rounded-sm justify-center w-full pb-1"
          >
            <TextareaAutosize
              value={auth.currentUser ? formValue : "Sign in to Chat"}
              onChange={(e) => setFormValue(e.target.value)}
              className="input"
              placeholder="Send a Message"
              maxRows={4}
              onKeyDown={(e) => {
                e.key === "Enter" && sendMessage(e)
              }}
            />
            <div className="w-full flex justify-end p-2">
              <button
                className="border-1 px-2 py-1 rounded-sm hover:bg-secondary-dark dark:bg-secondary-dark color-shift font-bold active"
                onClick={() => {}}
                type="submit"
              >
                Chat
              </button>
            </div>
          </form>
        </fieldset>
        <span ref={dummy}></span>
        <div className="chat-window flex flex-col-reverse pb-3 overflow-y-scroll">
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
      </main>
    </div>
  )
}

export default GlobalChat

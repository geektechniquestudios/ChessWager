import "../../style/chat.scss"
import "../../style/buttons.scss"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"
import TextareaAutosize from "react-textarea-autosize"

import { useCollectionData } from "react-firebase-hooks/firestore"
import { useRef } from "react"
import { Auth } from "../containers/Auth"
import { ChatMessage } from "./ChatMessage"
import { Firestore } from "../containers/Firestore"
import { BiArrowFromLeft } from "react-icons/bi"
import { RiChatSettingsLine } from "react-icons/ri"

interface Props {
  formValue: string
  setFormValue: React.Dispatch<React.SetStateAction<string>>
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalChat: React.FC<Props> = ({
  formValue,
  setFormValue,
  setShowChat,
  setActiveMenu,
  setOpen,
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
      className="global-chat border-l border-stone-400 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
      style={{ width: "21em" }}
    >
      <header className="flex bg-stone-300 dark:bg-stone-800 border-b border-stone-400 dark:border-stone-700 justify-between">
        <button
          onClick={() => {
            setShowChat(false)
            localStorage.setItem("showChat", "false")
          }}
          className="m-3 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-sm color-shift"
        >
          <BiArrowFromLeft
            size="1.4em"
            className="text-stone-900 dark:text-stone-50 m-1 color-shift"
          />
        </button>
        <div className="text-stone-900 dark:text-stone-50 grid place-content-center text-bold text-lg">
          GLOBAL CHAT
        </div>
        <button
          className="m-3 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-sm color-shift"
          onClick={() => {
            setActiveMenu("settings")
            setOpen(true)
          }}
        >
          <RiChatSettingsLine
            size="1.4em"
            className="text-stone-900 dark:text-stone-50 m-1 color-shift cw-button border-none bg-transparent"
            title="Chat Settings"
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
            className="form justify-center w-full pb-1"
          >
            <TextareaAutosize
              value={auth.currentUser ? formValue : "Sign in to Chat"}
              onChange={(e) => setFormValue(e.target.value)}
              className="input bg-stone-200 dark:bg-stone-800 dark:text-stone-50"
              placeholder="Send a Message"
              maxRows={4}
              onKeyDown={(e) => {
                e.key === "Enter" && sendMessage(e)
              }}
            />
            <div className="w-full flex justify-end p-2">
              <button
                className="cw-button px-2 py-1 hover:bg-stone-300"
                onClick={() => {}}
                type="submit"
              >
                Chat
              </button>
            </div>
          </form>
        </fieldset>
        <span ref={dummy}></span>
        <div className="chat-window flex flex-col-reverse pb-3 overflow-y-scroll overflow-x-hidden">
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
      </main>
    </div>
  )
}

export default GlobalChat

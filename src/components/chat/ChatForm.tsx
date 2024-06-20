import { TextareaAutosize } from "@mui/material"
import { AuthState } from "../../containers/AuthState"
import "../../style/scrollbar.scss"
import {
  addDoc,
  CollectionReference,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore"
import { CustomSwal } from "../popups/CustomSwal"
import { ChatFormState } from "../../containers/ChatFormState"
import { CharacterConuter } from "./CharacterConuter"
import { ReplyingTo } from "./ReplyingTo"

interface Props {
  bottomOfChatRef: React.RefObject<HTMLInputElement>
  messagesRef: CollectionReference<DocumentData>
}

export const ChatForm: React.FC<Props> = ({ bottomOfChatRef, messagesRef }) => {
  const { auth } = AuthState.useContainer()
  const { signInWithGoogle } = AuthState.useContainer()
  const { chatFormValue, setChatFormValue, replyingTo } = ChatFormState.useContainer()

  const sendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    if (chatFormValue.length > 500) {
      console.log("Message too long")
      CustomSwal(
        "error",
        "Message too long",
        "Please keep messages under 500 characters.",
      )
      return
    }
    if (!auth.currentUser) signInWithGoogle()
    if (chatFormValue.trim() === "" || !auth.currentUser) return

    const { uid, photoURL } = auth.currentUser

    addDoc(messagesRef, {
      text: chatFormValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      userName: auth.currentUser.displayName,
      // replyingTo
    })

    setChatFormValue("")
    bottomOfChatRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col">
      <ReplyingTo />
      <fieldset className="fieldset">
        <form
          onSubmit={sendMessage}
          className="form w-full justify-center whitespace-nowrap pb-1"
        >
          <TextareaAutosize
            id="chat-form"
            value={chatFormValue}
            onChange={(e) => {
              setChatFormValue(e.target.value)
            }}
            className="scrollbar inline-block w-full resize-none break-words border-b border-stone-200 bg-stone-50 p-2 text-lg outline-none dark:border-stone-900 dark:bg-stone-800 dark:text-stone-50"
            placeholder={
              auth.currentUser ? "Send a Message" : "Sign in to Chat"
            }
            maxRows={4}
            minRows={1}
            onKeyDown={(e) => {
              if (!e.shiftKey && e.key === "Enter") sendMessage(e)
            }}
          />
          <CharacterConuter />
        </form>
      </fieldset>
    </div>
  )
}

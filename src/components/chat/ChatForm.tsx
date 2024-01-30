import { TextareaAutosize } from "@mui/material"
import { AuthState } from "../../containers/AuthState"
import "../../style/scrollbar.scss"
import {
  addDoc,
  CollectionReference,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore"

interface Props {
  dummy: React.RefObject<HTMLInputElement>
  messagesRef: CollectionReference<DocumentData>
  formValue: string
  setFormValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((formValue: string) => void)
}

export const ChatForm: React.FC<Props> = ({
  dummy,
  messagesRef,
  formValue,
  setFormValue,
}) => {
  const { auth } = AuthState.useContainer()
  const { signInWithGoogle } = AuthState.useContainer()

  const sendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    if (!auth.currentUser) signInWithGoogle()
    if (formValue.trim() === "" || !auth.currentUser) return

    const { uid, photoURL } = auth.currentUser

    addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      userName: auth.currentUser.displayName,
    })

    setFormValue("")
    dummy.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <fieldset className="fieldset flex justify-center">
      <form
        onSubmit={sendMessage}
        className="form w-full justify-center whitespace-nowrap pb-1"
      >
        <TextareaAutosize
          id="chat-form"
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value)
          }}
          className="scrollbar inline-block w-full resize-none break-words bg-stone-200 p-2 text-lg outline-none dark:bg-stone-800 dark:text-stone-50"
          placeholder={auth.currentUser ? "Send a Message" : "Sign in to Chat"}
          maxRows={4}
          minRows={1}
          onKeyDown={(e) => {
            if (!e.shiftKey && e.key === "Enter") {
              sendMessage(e)
            }
          }}
        />
        <div className="flex w-full justify-end p-2">
          <button
            className="color-shift clickable rounded-md border border-stone-500 bg-stone-200  px-2 py-1 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
            type="submit"
            disabled={false}
            id="global-chat-button"
          >
            Chat
          </button>
        </div>
      </form>
    </fieldset>
  )
}

import { TextareaAutosize } from "@mui/material"
import { Auth } from "../containers/Auth"
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
  const { auth } = Auth.useContainer()
  const { signInWithGoogle } = Auth.useContainer()

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
    <fieldset className="fieldset justify-center flex">
      <form onSubmit={sendMessage} className="form justify-center w-full pb-1">
        <TextareaAutosize
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value)
          }}
          className="scrollbar break-words inline-block resize-none outline-none text-lg w-full p-2 bg-stone-200 dark:bg-stone-800 dark:text-stone-50"
          placeholder={auth.currentUser ? "Send a Message" : "Sign in to Chat"}
          maxRows={4}
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage(e)
          }}
        />
        <div className="w-full flex justify-end p-2">
          <button
            className="rounded-md border bg-stone-200 dark:bg-stone-900 hover:bg-white hover:text-stone-800  hover:border-black dark:hover:bg-stone-800 dark:hover:text-stone-300 dark:hover:border-stone-300 border-stone-500 dark:border-stone-500 text-stone-800 dark:text-stone-300 font-bold px-2 py-1 color-shift clickable"
            type="submit"
            disabled={false}
          >
            Chat
          </button>
        </div>
      </form>
    </fieldset>
  )
}

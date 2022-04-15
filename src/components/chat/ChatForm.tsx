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
  const { user, auth } = Auth.useContainer()
  const sendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    if (formValue.trim() === "" || !user || !auth.currentUser) return

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
    <fieldset
      disabled={!auth.currentUser}
      className="fieldset justify-center flex"
    >
      <form onSubmit={sendMessage} className="form justify-center w-full pb-1">
        <TextareaAutosize
          value={auth.currentUser ? formValue : "Sign in to Chat"}
          onChange={(e) => {
            setFormValue(e.target.value)
          }}
          className="scrollbar break-words inline-block resize-none outline-none text-lg w-full p-2 bg-stone-200 dark:bg-stone-800 dark:text-stone-50"
          placeholder="Send a Message"
          maxRows={4}
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage(e)
          }}
        />
        <div className="w-full flex justify-end p-2">
          <button
            className="cw-button px-2 py-1 hover:bg-stone-300"
            type="submit"
          >
            Chat
          </button>
        </div>
      </form>
    </fieldset>
  )
}

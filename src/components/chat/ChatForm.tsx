import { TextareaAutosize } from "@mui/material"
import { Auth } from "../containers/Auth"
import firebase from "firebase/compat/app"

interface Props {
  formValue: string
  setFormValue: React.Dispatch<React.SetStateAction<string>>
  dummy: React.RefObject<HTMLInputElement>
  messagesRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
}

export const ChatForm: React.FC<Props> = ({
  formValue,
  setFormValue,
  dummy,
  messagesRef,
}) => {
  const { user, auth } = Auth.useContainer()

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
  )
}

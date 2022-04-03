import { TextareaAutosize } from "@mui/material"
import { Auth } from "../../../../containers/Auth"
import "../../../../../style/dropdown.scss"
import { BiSend } from "react-icons/bi"
import type { Conversation } from "../../../../../interfaces/Conversation"
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
const db = getFirestore(firebaseApp)

interface Props {
  dummy: React.RefObject<HTMLInputElement>
  messagesRef: CollectionReference<DocumentData>
  formValue: string
  setFormValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((formValue: string) => void)
  conversationDocRef: DocumentReference<DocumentData>
}
export const ConvoChatForm: React.FC<Props> = ({
  dummy,
  messagesRef,
  formValue,
  setFormValue,
  conversationDocRef,
}) => {
  const { user, auth } = Auth.useContainer()

  const sendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    if (formValue.trim() === "" || !user || !auth.currentUser) return

    const { uid, photoURL, displayName } = auth.currentUser

    addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      userName: displayName,
    })

    const conversation = (await getDoc(conversationDocRef)).data()

    const isUser1 =
      (conversation?.user1.id ?? "") === (auth.currentUser?.uid ?? " ")

    const isUser2 =
      (conversation?.user2.id ?? "") === (auth.currentUser?.uid ?? " ")

    if (isUser1) {
      const userRef = doc(db, "users", conversation!.user2.id)
      setDoc(
        userRef,
        {
          hasNewMessage: true,
        },
        { merge: true },
      )
      setDoc(
        conversationDocRef,
        {
          messageThumbnail: formValue,
          doesUser1HaveUnreadMessages: true,
          modifiedAt: serverTimestamp(),
        },
        { merge: true },
      )
    } else if (isUser2) {
      const userRef = doc(db, "users", conversation!.user1.id)
      setDoc(
        userRef,
        {
          hasNewMessage: true,
        },
        { merge: true },
      )

      setDoc(
        conversationDocRef,
        {
          messageThumbnail: formValue,
          doesUser1HaveUnreadMessages: true,
          modifiedAt: serverTimestamp(),
        },
        { merge: true },
      )
    } else {
      throw new Error("User not in conversation")
    }

    // also need to batch writes
    // also need to write rules

    setFormValue("")
    dummy.current?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div className="flex-col justify-end w-full">
      <fieldset
        disabled={!auth.currentUser}
        className="fieldset justify-center flex"
      >
        <form
          onSubmit={sendMessage}
          className="form justify-between w-full flex"
        >
          <TextareaAutosize
            value={auth.currentUser ? formValue : "Sign in to Chat"}
            onChange={(e) => {
              setFormValue(e.target.value)
            }}
            className="scrollbar break-words inline-block resize-none outline-none text-md grow p-2 bg-stone-200 dark:bg-stone-800 dark:text-stone-50 rounded-md ml-2"
            placeholder="Send a Message"
            maxRows={4}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage(e)
            }}
          />
          <div className="flex flex-col-reverse">
            <button
              className="grid place-content-center mr-2 ml-1.5 mb-1 rounded-full p-1.5 hover:bg-stone-400 dark:hover:bg-stone-800 color-shift"
              title="Press Enter to Send"
            >
              <BiSend size="25" />
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

import { TextareaAutosize } from "@mui/material"
import { Auth } from "../../../../containers/Auth"
import "../../../../../style/dropdown.scss"
import { BiSend } from "react-icons/bi"
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { ChatFormData } from "../../../../containers/ChatFormData"
import { ConversationsState } from "../../../../containers/ConversationsState"
const db = getFirestore(firebaseApp)

interface Props {
  dummy: React.RefObject<HTMLInputElement>
}

export const ConvoChatForm: React.FC<Props> = ({ dummy }) => {
  const { convoFormValue, setConvoFormValue } = ChatFormData.useContainer()

  const { user, auth } = Auth.useContainer()
  const { userIdFromMessages } = UserMenuState.useContainer()
  const convoId = [auth.currentUser?.uid, userIdFromMessages].sort().join("-")
  const setFormValue = (formValue: string) => {
    const newMap = new Map(convoFormValue)
    newMap.set(convoId, formValue)
    setConvoFormValue(newMap)
  }
  const formValue = convoFormValue.get(convoId) ?? ""

  const { conversations } = ConversationsState.useContainer()

  const sendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    if (formValue.trim() === "" || !user || !auth.currentUser) return

    const { uid, photoURL, displayName } = auth.currentUser
    const batch = writeBatch(db)
    const messagesRef = collection(
      doc(db, "conversations", convoId),
      "messages",
    )

    batch.set(doc(messagesRef), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      userName: displayName,
      convoId,
    })

    const conversationDocRef = doc(db, "conversations", convoId)

    const conversation = conversations?.find((c) => c.id === convoId)

    const isUser1 =
      (conversation?.user1.id ?? "") === (auth.currentUser?.uid ?? " ")
    const isUser2 =
      (conversation?.user2.id ?? "") === (auth.currentUser?.uid ?? " ")

    if (isUser1) {
      const userRef = doc(db, "users", conversation!.user2.id)
      batch.update(userRef, {
        hasNewMessage: true,
      })
      batch.update(conversationDocRef, {
        messageThumbnail: formValue,
        doesUser2HaveUnreadMessages: true,
        modifiedAt: serverTimestamp(),
      })
    } else if (isUser2) {
      const userRef = doc(db, "users", conversation!.user1.id)
      batch.update(userRef, {
        hasNewMessage: true,
      })
      batch.update(conversationDocRef, {
        messageThumbnail: formValue,
        doesUser1HaveUnreadMessages: true,
        modifiedAt: serverTimestamp(),
      })
    } else {
      throw new Error("User not in conversation")
    }
    batch.commit()

    setFormValue("")
    dummy.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="w-full grow flex-col justify-start pb-2">
      <fieldset
        disabled={!auth.currentUser}
        className="fieldset flex justify-center"
      >
        <form
          onSubmit={sendMessage}
          className="form flex w-full justify-between"
        >
          <TextareaAutosize
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value)
            }}
            className="scrollbar text-md ml-2 inline-block grow resize-none break-words rounded-md bg-stone-300 p-2 outline-none dark:bg-stone-800 dark:text-stone-50"
            placeholder="Send a Message"
            maxRows={4}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage(e)
            }}
          />
          <div className="flex flex-col-reverse">
            <button
              className="color-shift mr-2 ml-1.5 mb-1 grid place-content-center rounded-full p-1.5 hover:bg-stone-400 dark:hover:bg-stone-800"
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

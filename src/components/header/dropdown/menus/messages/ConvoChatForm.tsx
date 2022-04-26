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
    <div className="flex-col justify-start w-full grow pb-2">
      <fieldset
        disabled={!auth.currentUser}
        className="fieldset justify-center flex"
      >
        <form
          onSubmit={sendMessage}
          className="form justify-between w-full flex"
        >
          <TextareaAutosize
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value)
            }}
            className="scrollbar break-words inline-block resize-none outline-none text-md grow p-2 bg-stone-300 dark:bg-stone-800 dark:text-stone-50 rounded-md ml-2"
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

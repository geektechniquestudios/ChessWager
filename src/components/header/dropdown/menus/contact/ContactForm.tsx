import { TextareaAutosize } from "@mui/material"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { BiSend } from "react-icons/bi"
import "../../../../../style/dropdown.scss"
import { AuthState } from "../../../../../containers/AuthState"
import { ChatFormState } from "../../../../../containers/ChatFormState"
import { CustomSwal } from "../../../../popups/CustomSwal"

interface Props {}

export const ContactForm: React.FC<Props> = ({}) => {
  const { user, auth, db } = AuthState.useContainer()
  const { reportFormValue, setReportFormValue } = ChatFormState.useContainer()
  const sendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    if (reportFormValue.trim() === "" || !user || !auth.currentUser) return

    const { uid, photoURL, displayName } = auth.currentUser
    const contactsRef = collection(db, "contacts")

    addDoc(contactsRef, {
      text: reportFormValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      userName: displayName,
      resolved: false,
    }).then(() => {
      setReportFormValue("")
      CustomSwal(
        "success",
        "Message Sent",
        "Your message will be reviewed soon.",
      )
    })
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
            id="report-form"
            value={reportFormValue}
            onChange={(e) => {
              setReportFormValue(e.target.value)
            }}
            className="scrollbar text-md ml-2 inline-block grow resize-none break-words rounded-md border border-stone-400 bg-stone-100 p-2 outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-50"
            placeholder={
              auth.currentUser ? "Send a Message" : "Sign in to write"
            }
            maxRows={1}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage(e)
            }}
          />
          <div className="flex flex-col-reverse">
            <button
              className="color-shift mb-1 ml-1.5 mr-2 grid place-content-center rounded-full p-1.5 hover:bg-stone-400 dark:hover:bg-stone-800"
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

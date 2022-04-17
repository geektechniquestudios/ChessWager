import { TextareaAutosize } from "@mui/material"
import { Auth } from "../../../../containers/Auth"
import "../../../../../style/dropdown.scss"
import { BiSend } from "react-icons/bi"
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { ChatFormData } from "../../../../containers/ChatFormData"
import { UserMenuState } from "../../../../containers/UserMenuState"

const db = getFirestore(firebaseApp)

interface Props {}

export const ReportForm: React.FC<Props> = ({}) => {
  const { user, auth } = Auth.useContainer()
  const { reportedUserId } = UserMenuState.useContainer()
  const { reportFormValue, setReportFormValue } = ChatFormData.useContainer()
  const sendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    if (reportFormValue.trim() === "" || !user || !auth.currentUser) return

    const { uid, photoURL, displayName } = auth.currentUser
    const reportsRef = collection(db, "reports")

    addDoc(reportsRef, {
      text: reportFormValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      userName: displayName,
      reportedUserId,
      resolved: false,
    })

    setReportFormValue("")
    alert("Your report has been sent")
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
            value={auth.currentUser ? reportFormValue : "Sign in to Chat"}
            onChange={(e) => {
              setReportFormValue(e.target.value)
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

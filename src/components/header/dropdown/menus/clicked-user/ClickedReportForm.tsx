import { collection, doc, getFirestore } from "firebase/firestore"
import { useRef } from "react"
import { BsFillBadgeHdFill } from "react-icons/bs"
import { GoReport } from "react-icons/go"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { ChatFormData } from "../../../../containers/ChatFormData"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { DropdownArea } from "../../models/DropdownArea"
import { ConvoChatForm } from "../messages/ConvoChatForm"
import { ReportForm } from "../report/ReportForm"

const db = getFirestore(firebaseApp)

interface Props {
  userToReport: string
}

export const ClickedReportForm: React.FC<Props> = ({ userToReport }) => {
  const { auth } = Auth.useContainer()
  const { userIdFromMessages } = UserMenuState.useContainer()
  const docId = [auth.currentUser?.uid, userIdFromMessages].sort().join("-")

  const messagesRef = collection(doc(db, "conversations", docId), "messages")
  const conversationDocRef = doc(db, "conversations", docId)

  const dummy = useRef<HTMLInputElement>(null)
  const { convoFormValue, setConvoFormValue } = ChatFormData.useContainer()
  const setFormValue = (formValue: string) => {
    const newMap = new Map(convoFormValue)
    newMap.set(docId, formValue)
    setConvoFormValue(newMap)
  }
  return (
    <div className="flex flex-col justify-between h-96 w-full">
      <p className="text-lg flex justify-center w-full mt-4 items-center gap-2">
        <GoReport />
        <>Tell Us What Happened</>
      </p>
      <div className="px-4 flex flex-col justify-evenly h-full gap-1">
        <p className="flex ">
          We're intererested in keeping our community clean. If this user has
          engaged in any of the following, please let us know.
        </p>
        <ul className="text-sm flex flex-col gap-0.5">
          <li>• Sexual, violent, hateful, or abusive language</li>
          <li>• Spam or advertising</li>
          <li>• Harassment or bullying</li>
          <li>• Scamming or impersonating users</li>
        </ul>
      </div>
      <div className="mt-2">
        <ReportForm />
        {/* <ConvoChatForm
          dummy={dummy}
          messagesRef={messagesRef}
          formValue={convoFormValue.get(docId) ?? ""}
          setFormValue={setFormValue}
          conversationDocRef={conversationDocRef}
        /> */}
      </div>
    </div>
  )
}

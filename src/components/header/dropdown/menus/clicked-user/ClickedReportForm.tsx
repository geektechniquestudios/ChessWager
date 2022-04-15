import { getFirestore } from "firebase/firestore"
import { GoReport } from "react-icons/go"
import { firebaseApp } from "../../../../../config"
import { ReportForm } from "../report/ReportForm"

const db = getFirestore(firebaseApp)

interface Props {}

export const ClickedReportForm: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col justify-between h-96 w-full">
      <p className="text-lg flex justify-center items-center gap-2 py-2 m-2 rounded-md dark:bg-stone-800 bg-stone-300">
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
      </div>
    </div>
  )
}

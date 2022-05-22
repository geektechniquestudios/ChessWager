import { GoReport } from "react-icons/go"
import { ReportForm } from "./ReportForm"

interface Props {}

export const ReportArea: React.FC<Props> = ({}) => {
  return (
    <div className="flex h-96 w-full flex-col justify-between">
      <p className="m-2 flex items-center justify-center gap-2 rounded-md bg-stone-300 py-2 text-lg dark:bg-stone-800">
        <GoReport />
        <>Tell Us What Happened</>
      </p>
      <div className="flex h-full flex-col justify-evenly gap-1 px-4">
        <p className="flex ">
          We're intererested in keeping our community clean. If this user has
          engaged in any of the following, please let us know.
        </p>
        <ul className="flex flex-col gap-0.5 text-sm">
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

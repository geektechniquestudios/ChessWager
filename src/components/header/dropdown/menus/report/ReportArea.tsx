import { GoReport } from "react-icons/go"
import { ReportForm } from "./ReportForm"

interface Props {}

export const ReportArea: React.FC<Props> = ({}) => {
  return (
    <div className="flex w-full flex-col justify-between">
      <p className="m-2 flex items-center justify-center gap-2 rounded-md border border-stone-400 bg-stone-300 py-2 text-lg dark:border-stone-700 dark:bg-stone-800">
        <GoReport />
        <>Tell Us What Happened</>
      </p>
      <div className="flex h-full flex-col justify-evenly">
        <div className="mx-2 flex flex-col rounded-md border border-stone-500 bg-stone-100 p-2 dark:border-stone-600 dark:bg-stone-900">
          We're intererested in keeping our community clean. If this user has
          engaged in any of the following, please let us know.
          <ul className="flex flex-col gap-0.5 p-2.5 text-sm">
            <li>• Sexual, violent, hateful, or abusive language</li>
            <li>• Spam or advertising</li>
            <li>• Harassment or bullying</li>
            <li>• Scamming or impersonating users</li>
          </ul>
        </div>
      </div>
      <div className="mt-2">
        <ReportForm />
      </div>
    </div>
  )
}

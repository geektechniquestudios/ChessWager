import { GoReport } from "react-icons/go"
import { ContactForm } from "./ContactForm"

interface Props {}

export const ContactArea: React.FC<Props> = ({}) => {
  return (
    <div className="flex w-full flex-col justify-between">
      <div className="m-2 flex items-center justify-center gap-2 rounded-md border border-stone-500 bg-stone-50 py-2 text-lg dark:border-stone-700 dark:bg-stone-900">
        <GoReport />
        <>Contact Us</>
      </div>
      <div className="flex h-full flex-col justify-evenly">
        <p className="mx-2 flex flex-col gap-3 rounded-md border border-stone-500 bg-stone-50 p-2 dark:border-stone-600 dark:bg-stone-900">
          If something is not working as expected, or if you have any other
          concerns, please don't hesitate to let us know.
          <p> We're here to help!</p>
        </p>
      </div>
      <div className="mt-2">
        <ContactForm />
      </div>
    </div>
  )
}

import { useState } from "react"

interface Props {}

const [formValue, setFormValue] = useState("")

export const SearchArea: React.FC<Props> = ({}) => {
  return (
    <textarea
      value={formValue}
      onChange={(e) => setFormValue(e.target.value)}
      className="input break-words inline-block resize-none outline-none text-lg w-full p-2 bg-stone-200 dark:bg-stone-800 dark:text-stone-50"
      placeholder="Search Users"
      onKeyDown={(e) => {}}
    />
  )
}

import { HiMinus } from "react-icons/hi"
import { BetsState } from "../../../containers/BetsState"

interface Props {}

export const WagerFormHeader: React.FC<Props> = ({}) => {
  const { setShowWagerForm } = BetsState.useContainer()
  return (
    <button
      type="button"
      className="clickable color-shift absolute right-2 top-0 grid h-5 w-7 place-content-center rounded-b-md hover:bg-stone-300 hover:text-black dark:border-stone-400 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-700 dark:hover:text-white"
      onClick={() => {
        setShowWagerForm(false)
      }}
    >
      <HiMinus />
    </button>
  )
}

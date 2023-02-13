import { AiOutlineMinus } from "react-icons/ai"
import { BetsState } from "../../containers/BetsState"

interface Props {}

export const WagerFormHeader: React.FC<Props> = ({}) => {
  const { setShowWagerForm } = BetsState.useContainer()
  return (
    <button
      type="button"
      className="color-shift clickable absolute right-2 top-0 grid h-4 w-6 place-content-center rounded-b-md hover:bg-stone-300 hover:text-black dark:border-stone-400 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-700 dark:hover:text-white"
      onClick={() => {
        setShowWagerForm(false)
      }}
    >
      <AiOutlineMinus size="9" />
    </button>
  )
}

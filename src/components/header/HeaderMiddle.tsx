import "../../style/buttons.scss"
import { Auth } from "../containers/Auth"
import { DropdownState } from "../containers/DropdownState"

interface Props {}

export const HeaderMiddle: React.FC<Props> = ({}) => {
  const { hasFirstBetBeenPlaced } = Auth.useContainer()
  const { goToMenu } = DropdownState.useContainer()

  return (
    <div className="w-1/3 flex-auto" id="header-middle">
      <div className="flex justify-center">
        {!hasFirstBetBeenPlaced && (
          <button
            onClick={() => {
              goToMenu("howToPlay")
            }}
            className="color-shift clickable animate-pulse rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
          >
            Make your first bet
          </button>
        )}
      </div>
    </div>
  )
}

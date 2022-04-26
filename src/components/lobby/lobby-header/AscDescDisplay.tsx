import { BsArrowDown, BsArrowDownUp, BsArrowUp } from "react-icons/bs"
import { LobbyHeaderState } from "../../containers/LobbyHeaderState"

export const AscDescDisplay: React.FC = () => {
  const { isDescending, mostRecentButton, setIsDescending } =
    LobbyHeaderState.useContainer()
  return (
    <button
      className="color-shift text-stone-900 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-none bg-stone-50 dark:bg-stone-700 px-2 grid place-content-center border-r border-stone-400 dark:border-stone-900"
      onClick={() => {
        setIsDescending(!isDescending)
      }}
    >
      <>
        {mostRecentButton === "" ? (
          <BsArrowDownUp />
        ) : (
          <>
            {isDescending && <BsArrowDown />}
            {!isDescending && <BsArrowUp />}
          </>
        )}
      </>
    </button>
  )
}

import { BsArrowDown, BsArrowDownUp, BsArrowUp } from "react-icons/bs"
import { LobbyHeaderState } from "./LobbyHeaderState"

export const AscDescDisplay: React.FC = () => {
  const { isDescending, mostRecentButton, setIsDescending } =
    LobbyHeaderState.useContainer()
  return (
    <button
      className="color-shift text-stone-900 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-none bg-stone-400 dark:bg-stone-900 px-2 grid place-content-center"
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

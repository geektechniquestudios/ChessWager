import { BsArrowDown, BsArrowDownUp, BsArrowUp } from "react-icons/bs"
import { LobbyHeaderState } from "../../containers/LobbyHeaderState"

export const AscDescDisplay: React.FC = () => {
  const { isDescending, mostRecentButton, setIsDescending } =
    LobbyHeaderState.useContainer()
  return (
    <button
      className="color-shift grid place-content-center rounded-none border-r border-stone-400 bg-stone-50 px-2 text-stone-900 hover:bg-stone-200 dark:border-stone-900 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
      onClick={() => {
        setIsDescending(!isDescending)
      }}
      aria-label="sorting-order-button"
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

import { BsArrowDown, BsArrowDownUp, BsArrowUp } from "react-icons/bs"
import { LobbyHeaderState } from "../../containers/LobbyHeaderState"

export const AscDescButton: React.FC = () => {
  const { isDescending, mostRecentButton, setIsDescending } =
    LobbyHeaderState.useContainer()
  return (
    <button
      className="color-shift clickable my-0.5 grid place-content-center rounded-md py-1 px-2 text-stone-900 hover:bg-stone-300 dark:text-stone-300 dark:hover:bg-stone-700"
      onClick={() => {
        setIsDescending(!isDescending)
      }}
      title="Sort"
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

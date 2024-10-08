import { LobbyHeaderState } from "../../../containers/LobbyHeaderState"

interface Props {
  buttonName: string
  buttonIcon: React.ReactNode
}

export const LobbyHeaderButton: React.FC<Props> = ({
  buttonName,
  buttonIcon,
}) => {
  const {
    isDescending,
    setIsDescending,
    mostRecentButton,
    setMostRecentButton,
  } = LobbyHeaderState.useContainer()
  return (
    <button
      className={`color-shift clickable my-0.5 grid max-w-[7em] grow place-content-center rounded-md border px-2 py-1 text-stone-800 hover:text-black dark:text-stone-300 dark:hover:text-white
        ${
          mostRecentButton === buttonName
            ? "border-stone-300 bg-stone-200 dark:border-stone-600 dark:bg-stone-700"
            : "border-transparent hover:bg-stone-200 dark:hover:bg-stone-700"
        }`}
      onClick={() => {
        mostRecentButton === buttonName && setIsDescending(!isDescending)
        setMostRecentButton(buttonName)
      }}
      title={buttonName}
    >
      {buttonIcon}
    </button>
  )
}

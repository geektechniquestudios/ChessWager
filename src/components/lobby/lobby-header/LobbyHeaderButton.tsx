import { LobbyHeaderState } from "../../containers/LobbyHeaderState"

interface Props {
  buttonName: string
  buttonIcon: React.ReactNode
}

export const HeaderButton: React.FC<Props> = ({ buttonName, buttonIcon }) => {
  const {
    isDescending,
    setIsDescending,
    mostRecentButton,
    setMostRecentButton,
  } = LobbyHeaderState.useContainer()
  return (
    <button
      className={`color-shift clickable my-0.5 grid max-w-[7em] grow place-content-center rounded-md border py-1 px-2 text-stone-900 dark:text-stone-300
        ${
          mostRecentButton === buttonName
            ? "border-stone-400 bg-stone-300 dark:border-stone-600 dark:bg-stone-900"
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

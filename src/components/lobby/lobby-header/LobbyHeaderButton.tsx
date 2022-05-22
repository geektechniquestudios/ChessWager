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
      className={`color-shift my-0.5 grid place-content-center rounded-md border py-1 px-2 text-stone-900 hover:bg-stone-400 dark:text-stone-300 dark:hover:bg-stone-700 
        ${
          mostRecentButton === buttonName
            ? "border-stone-400 bg-stone-300 dark:border-stone-600 dark:bg-black"
            : "border-transparent"
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

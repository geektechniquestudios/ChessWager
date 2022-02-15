import { LobbyHeaderState } from "./LobbyHeaderState"

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
      className={`color-shift grid place-content-center text-stone-900 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-md py-1 px-2 my-0.5 
        ${mostRecentButton === buttonName ? "border" : "border-none"}`}
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

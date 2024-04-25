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
      className={`color-shift clickable my-0.5 grid max-w-[7em] grow place-content-center rounded-md border px-2 py-1 text-stone-900 dark:text-stone-300
        ${
          mostRecentButton === buttonName
            ? "border-slate-300 bg-slate-200 dark:border-stone-600 dark:bg-stone-900"
            : "border-transparent hover:bg-slate-200 dark:hover:bg-stone-700"
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

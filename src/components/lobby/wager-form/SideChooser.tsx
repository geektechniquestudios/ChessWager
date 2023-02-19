import { SideChooserButton } from "./SideChooserButton"

interface Props {
  betSide: "white" | "black"
  setBetSide: React.Dispatch<React.SetStateAction<"white" | "black">>
  title?: string
}

export const SideChooser: React.FC<Props> = ({
  betSide,
  setBetSide,
  title = "Side",
}) => {
  return (
    <div className="color-shift flex rounded-md border border-stone-400 bg-stone-200 p-2 dark:border-stone-500 dark:bg-stone-700">
      <p className="m-2 grid place-content-center font-bold text-stone-900 dark:text-stone-300">
        {title}
      </p>
      <div className="mx-2 border border-stone-900 dark:border-stone-500" />
      <div className="flex w-full items-center justify-evenly">
        <SideChooserButton
          betSide={betSide}
          thisSide="white"
          setBetSide={setBetSide}
        />
        <SideChooserButton
          betSide={betSide}
          thisSide="black"
          setBetSide={setBetSide}
        />
      </div>
    </div>
  )
}

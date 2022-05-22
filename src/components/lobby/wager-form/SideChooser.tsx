import { SideChooserButton } from "./SideChooserButton"

interface Props {
  betSide: "white" | "black"
  setBetSide: React.Dispatch<React.SetStateAction<"white" | "black">>
}

export const SideChooser: React.FC<Props> = ({ betSide, setBetSide }) => {
  return (
    <div className="color-shift flex rounded-md border border-stone-400 bg-stone-300 p-2 dark:border-stone-500 dark:bg-stone-700">
      <p className="m-2 grid place-content-center font-bold text-stone-900 dark:text-stone-300">
        Side
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

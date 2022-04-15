import { SideChooserButton } from "./SideChooserButton"

interface Props {
  betSide: "white" | "black"
  setBetSide: React.Dispatch<React.SetStateAction<"white" | "black">>
}

export const SideChooser: React.FC<Props> = ({ betSide, setBetSide }) => {
  return (
    <div className="flex p-2 border border-stone-400 dark:border-stone-500 dark:bg-stone-700 bg-stone-300 color-shift">
      <p className="text-stone-900 dark:text-stone-300 grid place-content-center m-2 font-bold">
        Side
      </p>
      <div className="border mx-2 border-stone-900 dark:border-stone-500" />
      <div className="flex items-center w-full justify-evenly">
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

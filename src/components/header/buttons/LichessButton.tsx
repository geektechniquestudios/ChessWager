import { SiLichess } from "react-icons/si"

interface Props {}

export const LichessButton: React.FC<Props> = ({}) => {
  return (
    <a
      id="lichess-button"
      href={`https://lichess.org/tv`}
      className="w-9 h-9 rounded-md grid place-content-center color-shift clickable border-none hover:bg-stone-300 dark:hover:bg-stone-700 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white border-stone-800 dark:border-stone-300 text-stone-800 dark:text-stone-300"
      title="Watch on Lichess"
      data-toggle="tooltip"
      target="_blank"
      rel="noreferrer"
    >
      <SiLichess size="19" title="Watch on Lichess" />
    </a>
  )
}
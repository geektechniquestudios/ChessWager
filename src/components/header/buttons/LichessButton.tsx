import { SiLichess } from "react-icons/si"
import { GameId } from "../../containers/GameId"

interface Props {}

export const LichessButton: React.FC<Props> = ({}) => {
  const { gameId } = GameId.useContainer()

  return (
    <div className="flex flex-col justify-center">
      <a
        href={`https://lichess.org/${gameId}`}
        className="cw-button border-none hover:bg-stone-300"
        title="Watch on Lichess"
        data-toggle="tooltip"
      >
        <SiLichess size="19" className="m-2" />
      </a>
    </div>
  )
}

import { Countdown } from "./Countdown"

interface Props {
  title: string
  name: string
  time: number
  rating: number
  fen: string
  side: string
}

export const PlayerData: React.FC<Props> = ({
  title,
  name,
  time,
  rating,
  fen,
  side,
}) => {
  return (
    <div className="flex  p-2 w-full justify-between">
      <span className="flex justify-center flex-col ">
        <p className="mx-1 font-bold text-teal-800">
          {title}
        </p>
        {`${name}  ${rating}`}
      </span>
      <Countdown fen={fen} side={side} time={time} />
    </div>
  )
}

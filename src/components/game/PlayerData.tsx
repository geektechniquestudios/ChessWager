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
    <div>
      {title + " " + name + " " + rating}
      <br />
      <Countdown fen={fen} side={side} time={time} />
    </div>
  )
}

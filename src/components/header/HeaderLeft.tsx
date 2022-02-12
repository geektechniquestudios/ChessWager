import { AvaxPriceButton } from "./buttons/AvaxPriceButton"
import { LichessButton } from "./buttons/LichessButton"
import { ChessWagerLogo } from "./ChessWagerLogo"

export const HeaderLeft: React.FC = () => {
  return (
    <div className="flex-auto">
      <div className="flex justify-start h-full mx-3 gap-1.5">
        {/* <ChessWagerLogo
          className="h-full"
          color="teal"
          stroke="teal"
          strokeWidth={2}
          height="2.5em"
        /> */}
        <LichessButton />
        <AvaxPriceButton />
      </div>
    </div>
  )
}

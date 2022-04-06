import { AvaxPriceButton } from "./buttons/AvaxPriceButton"
import { LichessButton } from "./buttons/LichessButton"

export const HeaderLeft: React.FC = () => {
  return (
    <div className="flex-auto">
      <div className="flex justify-start align-middle items-center h-full mx-3 gap-1.5">
        <AvaxPriceButton />
        <LichessButton />
      </div>
    </div>
  )
}

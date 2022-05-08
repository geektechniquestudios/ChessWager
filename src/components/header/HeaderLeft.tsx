import { AvaxPriceButton } from "./buttons/AvaxPriceButton"
import { LichessButton } from "./buttons/LichessButton"

export const HeaderLeft: React.FC = () => {
  return (
    <div className="flex-auto">
      <div className="mx-3 flex h-full items-center justify-start gap-1.5 align-middle">
        <AvaxPriceButton />
        <LichessButton />
      </div>
    </div>
  )
}

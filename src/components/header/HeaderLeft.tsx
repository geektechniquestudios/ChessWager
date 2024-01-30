import { AnimatePresence } from "framer-motion"
import { WindowSizeState } from "../../containers/WindowSizeState"
import { AvaxPriceButton } from "./buttons/AvaxPriceButton"
import { LichessButton } from "./buttons/LichessButton"
import { AuthState } from "../../containers/AuthState"

export const HeaderLeft: React.FC = () => {
  const { width } = WindowSizeState.useContainer()
  const { isLoading } = AuthState.useContainer()
  return (
    <AnimatePresence mode="popLayout">
      {width > 370 && !isLoading && (
        <div className="flex h-full w-1/4 shrink-0 items-center justify-start gap-1.5 pl-3">
          <LichessButton />
          <AvaxPriceButton />
        </div>
      )}
    </AnimatePresence>
  )
}

import { AscDescDisplay } from "./AscDescDisplay"
import { LobbyHeaderButtons } from "./LobbyHeaderButtons"
import { RealTimeButton } from "./RealTimeButton"

export const LobbyHeader: React.FC = () => {
  return (
    <div className="flex h-6 w-full border-t border-b border-stone-400 bg-stone-200 dark:border-stone-700 dark:bg-stone-900 sm:border-t-0">
      <AscDescDisplay />
      <LobbyHeaderButtons />
      <RealTimeButton />
    </div>
  )
}

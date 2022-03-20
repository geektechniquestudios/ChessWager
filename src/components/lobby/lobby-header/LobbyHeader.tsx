import { AscDescDisplay } from "./AscDescDisplay"
import { LobbyHeaderButtons } from "./LobbyHeaderButtons"
import { RealTimeButton } from "./RealTimeButton"

export const LobbyHeader: React.FC = () => {
  return (
    <div className="flex w-full h-6 bg-stone-200 dark:bg-stone-900 border-b border-stone-400 dark:border-stone-700">
      <AscDescDisplay />
      <LobbyHeaderButtons />
      <RealTimeButton />
    </div>
  )
}

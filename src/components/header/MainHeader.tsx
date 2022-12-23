import { HeaderLeft } from "./HeaderLeft"
import { HeaderMiddle } from "./HeaderMiddle"
import { HeaderRight } from "./HeaderRight"

export const MainHeader: React.FC = () => {
  return (
    <header className="color-shift flex items-center border-b border-stone-400 bg-stone-50 dark:border-stone-700 dark:bg-stone-800">
      <div className="no-wrap flex w-full justify-between" id="main-header">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
      </div>
    </header>
  )
}

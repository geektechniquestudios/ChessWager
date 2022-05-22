import { HeaderLeft } from "./HeaderLeft"
import { HeaderMiddle } from "./HeaderMiddle"
import { HeaderRight } from "./HeaderRight"

export const MainHeader: React.FC = () => {
  return (
    <div className="no-wrap flex w-full justify-between" id="main-header">
      <HeaderLeft />
      <HeaderMiddle />
      <HeaderRight />
    </div>
  )
}

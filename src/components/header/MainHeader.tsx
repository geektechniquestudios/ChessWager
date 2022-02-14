import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.scss"
import "react-toggle/style.css"
import { HeaderLeft } from "./HeaderLeft"
import { HeaderMiddle } from "./HeaderMiddle"
import { HeaderRight } from "./HeaderRight"

export const MainHeader: React.FC = () => {
  return (
    <div className="flex no-wrap justify-between w-full">
      <HeaderLeft />
      <HeaderMiddle />
      <HeaderRight />
    </div>
  )
}

import { RiUserHeartLine } from "react-icons/ri"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {}

export const FollowingButton: React.FC<Props> = ({}) => {
  const { setActiveMenu } = DropdownState.useContainer()
  return (
    <DropdownButton
      content={<RiUserHeartLine />}
      onClick={() => {
        setActiveMenu("following")
      }}
      title="Following"
    />
  )
}

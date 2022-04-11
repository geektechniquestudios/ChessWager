import { RiHeartsLine, RiUserHeartLine } from "react-icons/ri"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {}

export const FollowersButton: React.FC<Props> = ({}) => {
  const { setActiveMenu } = DropdownState.useContainer()

  return (
    <DropdownButton
      content={<RiHeartsLine />}
      onClick={() => {
        setActiveMenu("followers")
      }}
      title="Followers"
    />
  )
}

import { BiMessageAdd } from "react-icons/bi"
import { RiMailSendLine, RiSendPlane2Line } from "react-icons/ri"
import { DropdownState } from "../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const SendMessageButton: React.FC<Props> = ({ id }) => {
  const { setActiveMenu } = DropdownState.useContainer()

  return (
    <DropdownButton
      content={<RiMailSendLine />}
      onClick={() => {
        setActiveMenu("directMessage")
      }}
      title="Send Direct Message"
    />
  )
}

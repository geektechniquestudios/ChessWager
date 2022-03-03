import { BiMessageAdd } from "react-icons/bi"
import { RiMailSendLine, RiSendPlane2Line } from "react-icons/ri"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const SendMessageButton: React.FC<Props> = ({ id }) => {
  const sendMessage = () => {}
  return (
    <DropdownButton
      content={<RiMailSendLine />}
      onClick={sendMessage}
      title="Send Direct Message"
    />
  )
}

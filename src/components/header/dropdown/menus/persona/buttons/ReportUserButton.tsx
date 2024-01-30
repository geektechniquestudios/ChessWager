import { FiFlag } from "react-icons/fi"
import { DropdownState } from "../../../../../../containers/DropdownState"
import { UserMenuState } from "../../../../../../containers/UserMenuState"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const ReportUserButton: React.FC<Props> = ({ id }) => {
  const { setActiveMenu, menuStack, setMenuStack } =
    DropdownState.useContainer()
  const { setReportedUserId } = UserMenuState.useContainer()

  return (
    <DropdownButton
      content={<FiFlag />}
      onClick={() => {
        setActiveMenu("report")
        setMenuStack([...menuStack, "report"])
        setReportedUserId(id)
      }}
      title="Report User"
    />
  )
}

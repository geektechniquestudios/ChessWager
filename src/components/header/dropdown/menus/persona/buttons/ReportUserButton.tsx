import { FiFlag } from "react-icons/fi"
import { DropdownState } from "../../../../../containers/DropdownState"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
  activeMenu: string
}

export const ReportUserButton: React.FC<Props> = ({ id, activeMenu }) => {
  const { setActiveMenu } = DropdownState.useContainer()
  const { setReportedUserId } = UserMenuState.useContainer()

  return (
    <DropdownButton
      content={<FiFlag />}
      onClick={() => {
        setActiveMenu(activeMenu + "Report")
        setReportedUserId(id)
      }}
      title="Report User"
    />
  )
}

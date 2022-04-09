import { MdOutlineReportProblem } from "react-icons/md"
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
      content={<MdOutlineReportProblem />}
      onClick={() => {
        setActiveMenu(activeMenu + "Report")
        setReportedUserId(id)
      }}
      title="Report User"
    />
  )
}

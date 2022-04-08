import { MdOutlineReportProblem } from "react-icons/md"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
  activeMenu: string
}

export const ReportUserButton: React.FC<Props> = ({ id, activeMenu }) => {
  const { setActiveMenu } = DropdownState.useContainer()

  return (
    <DropdownButton
      content={<MdOutlineReportProblem />}
      onClick={() => {
        setActiveMenu(activeMenu + "Report")
      }}
      title="Report User"
    />
  )
}

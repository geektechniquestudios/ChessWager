import { MdOutlineReportProblem } from "react-icons/md"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const ReportUserButton: React.FC<Props> = ({ id }) => {
  const { setActiveMenu } = DropdownState.useContainer()

  return (
    <DropdownButton
      content={<MdOutlineReportProblem />}
      onClick={() => {
        setActiveMenu("report")
      }}
      title="Report User"
    />
  )
}

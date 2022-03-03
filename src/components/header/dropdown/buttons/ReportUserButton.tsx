import { MdOutlineReportProblem } from "react-icons/md"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const ReportUserButton: React.FC<Props> = ({ id }) => {
  const reportUser = () => {}
  return (
    <DropdownButton
      content={<MdOutlineReportProblem />}
      onClick={reportUser}
      title="Report User"
    />
  )
}

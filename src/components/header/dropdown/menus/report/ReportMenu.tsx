import { Menu } from "../../models/Menu"
import { ReportArea } from "./ReportArea"

interface Props {}

export const ReportMenu: React.FC<Props> = ({}) => {
  return <Menu menuItems={[<ReportArea />]} thisMenu={"report"} />
}

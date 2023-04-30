import { Menu } from "../../models/Menu"
import { ContractDataArea } from "./ContractDataArea"

interface Props {}

export const ContractDataMenu: React.FC<Props> = ({}) => {
  return <Menu menuItems={[<ContractDataArea />]} thisMenu="contractData" />
}

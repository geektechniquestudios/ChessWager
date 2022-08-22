import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { ContractDataArea } from "./ContractDataArea"

interface Props {}

export const ContractDataMenu: React.FC<Props> = ({}) => {
  return (
    <Menu
      menuItems={[<DropdownArea content={<ContractDataArea />} />]}
      thisMenu="contractData"
    />
  )
}

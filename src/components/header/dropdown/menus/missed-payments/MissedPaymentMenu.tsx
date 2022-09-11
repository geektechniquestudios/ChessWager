import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { MissedPaymentArea } from "./MissedPaymentArea"

interface Props {}

export const MissedPaymentMenu: React.FC<Props> = ({}) => {
  return (
    <Menu
      menuItems={[<DropdownArea content={<MissedPaymentArea />} />]}
      thisMenu="missedPayment"
    />
  )
}

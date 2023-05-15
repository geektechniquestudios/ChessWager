import { Menu } from "../../models/Menu"
import { MissedPaymentArea } from "./MissedPaymentArea"

interface Props {}

export const MissedPaymentsMenu: React.FC<Props> = ({}) => {
  return <Menu menuItems={[<MissedPaymentArea />]} thisMenu="missedPayments" />
}

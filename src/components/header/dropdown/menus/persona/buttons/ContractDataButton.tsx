import { RiBankLine, RiPenNibLine, RiSkull2Line } from "react-icons/ri"
import { DropdownState } from "../../../../../containers/DropdownState"
import { UserDataState } from "../../../../../containers/UserDataState"
import { DropdownButton } from "./DropdownButton"

interface Props {}

export const ContractDataButton: React.FC<Props> = ({}) => {
  const { userData } = UserDataState.useContainer()
  const isCreator =
    userData?.walletAddress === "0x9497DA534Dcb2B49d73dEf1468b91339e98BE60C"
  const { setActiveMenu, menuStack, setMenuStack } =
    DropdownState.useContainer()
  return (
    <>
      {isCreator && (
        <DropdownButton
          content={<RiPenNibLine />}
          onClick={() => {
            setActiveMenu("contractData")
            setMenuStack([...menuStack, "contractData"])
          }}
          title="Manage Contract Funds"
        />
      )}
    </>
  )
}

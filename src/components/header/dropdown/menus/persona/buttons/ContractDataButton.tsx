import { RiPenNibLine } from "react-icons/ri"
import { DropdownState } from "../../../../../containers/DropdownState"
import { UserDataState } from "../../../../../containers/UserDataState"
import { DropdownButton } from "./DropdownButton"

const adminWallet = import.meta.env.VITE_METAMASK_ACCOUNT_ADDRESS

interface Props {}

export const ContractDataButton: React.FC<Props> = ({}) => {
  const { userData } = UserDataState.useContainer()
  const isCreator = (userData?.walletAddress ?? 1) === (adminWallet ?? 2)
  const { goToMenu } = DropdownState.useContainer()
  return (
    <>
      {isCreator && (
        <DropdownButton
          content={<RiPenNibLine />}
          onClick={() => {
            goToMenu("contractData")
          }}
          title="Manage Contract Funds"
        />
      )}
    </>
  )
}

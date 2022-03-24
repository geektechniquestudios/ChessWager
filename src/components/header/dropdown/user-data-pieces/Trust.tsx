import { FaRegHandshake } from "react-icons/fa"

interface Props {
  betAcceptedCount?: number
  betFundedCount?: number
}

export const Trust: React.FC<Props> = ({
  betAcceptedCount,
  betFundedCount,
}) => {
  return (
    <div data-bs-toggle="tooltip" title="Trust" className="flex justify-evenly">
      <FaRegHandshake /> {betFundedCount}/{betAcceptedCount}
    </div>
  )
}

import { FaUsersSlash } from "react-icons/fa"

interface Props {
    blocked?: string[]
}

export const NumberBlocked: React.FC<Props> = ({
  blocked,
}) => {
  return (
    <div data-bs-toggle="tooltip" title="Number Blocked" className="flex justify-evenly"><FaUsersSlash /> {blocked}</div>
    )
}

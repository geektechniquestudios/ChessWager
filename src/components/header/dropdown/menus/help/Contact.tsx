import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"

export const Contact: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownArea
          content={
            <div className="h-24 w-full flex justify-center my-2">
              Not made yet
            </div>
          }
        />,
      ]}
      thisMenu={"contact"}
    />
  )
}

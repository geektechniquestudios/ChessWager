import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"

export const Faq: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownArea
          content={
            <div className="my-2 flex h-24 w-full justify-center">
              Not made yet
            </div>
          }
        />,
      ]}
      thisMenu={"faq"}
    />
  )
}

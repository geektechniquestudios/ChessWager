import { BiArrowBack } from "react-icons/bi"
import { DropdownArea } from "../../models/DropdownArea"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"

export const Faq: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="help"
          leftIcon={<BiArrowBack />}
          key={0}
          text="FAQs"
        />,
        <MenuLine key={1} />,
        <DropdownArea
          key={2}
          content={
            <div className="h-24 w-full flex justify-center my-2">
              Not made yet
            </div>
          }
        />,
      ]}
      thisMenu={"faq"}
    />
  )
}

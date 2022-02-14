import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"
import { BiMessageRoundedError } from "react-icons/bi"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai"

export const Help: React.FC = () => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem goToMenu="main" leftIcon={<BiArrowBack />} key={0}>
            <h2>Help</h2>
          </DropdownItem>,
          <div className="border-b-2" key={1} />,
          <DropdownItem leftIcon={<AiOutlineQuestionCircle />} key={2}>
            How to Play
          </DropdownItem>,
          <DropdownItem leftIcon={<AiOutlineInfoCircle />} key={3}>
            FAQs
          </DropdownItem>,
          <DropdownItem leftIcon={<BiMessageRoundedError />} key={4}>
            Contact Us
          </DropdownItem>,
        ]}
        thisMenu={"help"}
      />
    </>
  )
}

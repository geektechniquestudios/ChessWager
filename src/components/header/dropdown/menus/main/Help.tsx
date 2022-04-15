import { DropdownItem } from "../../models/DropdownItem"
import { BiMessageRoundedError } from "react-icons/bi"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../../models/Menu"
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai"
import { MenuLine } from "../../models/MenuLine"

export const Help: React.FC = () => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Help"
          />,
          <MenuLine key={1} />,
          <DropdownItem
            goToMenu="howToPlay"
            leftIcon={<AiOutlineQuestionCircle />}
            key={2}
            text="How to Play"
          />,
          <DropdownItem
            goToMenu="faq"
            leftIcon={<AiOutlineInfoCircle />}
            key={3}
            text="FAQs"
          />,
          <DropdownItem
            goToMenu="contact"
            leftIcon={<BiMessageRoundedError />}
            key={4}
            text="Contact Us"
          />,
        ]}
        thisMenu={"help"}
      />
    </>
  )
}

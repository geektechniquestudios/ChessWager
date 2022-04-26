import { DropdownItem } from "../../models/DropdownItem"
import { BiMessageRoundedError } from "react-icons/bi"
import { Menu } from "../../models/Menu"
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai"
import { DropdownState } from "../../../../containers/DropdownState"

export const HelpMenu: React.FC = () => {
  const { menuStack, setMenuStack } = DropdownState.useContainer()
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="howToPlay"
            leftIcon={<AiOutlineQuestionCircle />}
            text="How to Play"
            onClick={() => setMenuStack([...menuStack, "howToPlay"])}
          />,
          <DropdownItem
            goToMenu="faq"
            leftIcon={<AiOutlineInfoCircle />}
            text="FAQs"
            onClick={() => setMenuStack([...menuStack, "faq"])}
          />,
          <DropdownItem
            goToMenu="contact"
            leftIcon={<BiMessageRoundedError />}
            text="Contact Us"
            onClick={() => setMenuStack([...menuStack, "contact"])}
          />,
        ]}
        thisMenu={"help"}
      />
    </>
  )
}

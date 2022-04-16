import { DropdownItem } from "../../models/DropdownItem"
import { BiMessageRoundedError } from "react-icons/bi"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../../models/Menu"
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai"
import { MenuLine } from "../../models/MenuLine"
import { DropdownState } from "../../../../containers/DropdownState"

export const HelpMenu: React.FC = () => {
  const { menuStack, setMenuStack } = DropdownState.useContainer()
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            isBackButton
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
            onClick={() => setMenuStack([...menuStack, "howToPlay"])}
          />,
          <DropdownItem
            goToMenu="faq"
            leftIcon={<AiOutlineInfoCircle />}
            key={3}
            text="FAQs"
            onClick={() => setMenuStack([...menuStack, "faq"])}
          />,
          <DropdownItem
            goToMenu="contact"
            leftIcon={<BiMessageRoundedError />}
            key={4}
            text="Contact Us"
            onClick={() => setMenuStack([...menuStack, "contact"])}
          />,
        ]}
        thisMenu={"help"}
      />
    </>
  )
}

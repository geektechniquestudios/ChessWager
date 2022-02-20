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
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Help"
          />,
          <div
            className="border-b-2 border-stone-400 dark:border-stone-600"
            key={1}
          />,
          <DropdownItem
            leftIcon={<AiOutlineQuestionCircle />}
            key={2}
            text="How to Play"
          />,
          <DropdownItem
            leftIcon={<AiOutlineInfoCircle />}
            key={3}
            text="FAQs"
          />,
          <DropdownItem
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

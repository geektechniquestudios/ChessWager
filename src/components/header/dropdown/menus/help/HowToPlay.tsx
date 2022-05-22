import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"

export const HowToPlay: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownArea
          key={2}
          content={
            <div className="my-2 flex h-24 w-full justify-center">
              Not made yet
            </div>
          }
        />,
      ]}
      thisMenu={"howToPlay"}
    />
  )
}

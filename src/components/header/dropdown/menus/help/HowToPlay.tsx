import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"

export const HowToPlay: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownArea
          key={2}
          content={
            <div className="h-24 w-full flex justify-center my-2">
              Not made yet
            </div>
          }
        />,
      ]}
      thisMenu={"howToPlay"}
    />
  )
}

import { BetsState } from "../../../../containers/BetsState"
import { DropdownState } from "../../../../containers/DropdownState"
import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { SectionWrapper } from "./SectionWrapper"

export const HowToPlay: React.FC = ({}) => {
  const { setShowWagerForm } = BetsState.useContainer()
  const { closeDropdownMenu } = DropdownState.useContainer()
  return (
    <Menu
      menuItems={[
        <DropdownArea
          content={
            <div className="my-2 flex w-full flex-col justify-center gap-2 px-2">
              <SectionWrapper
                text="1. Add the Metamask extension to your browser"
                href="https://metamask.io/download/"
              />
              <SectionWrapper
                text="2. Add the Avalanche network to Metamask"
                href="https://chainlist.org/chain/43114/"
              />
              <SectionWrapper
                text="3. Fund your wallet"
                href="https://www.coinbase.com/price/avalanche"
              />
              <SectionWrapper
                text="4. Place a bet"
                onClick={() => {
                  setShowWagerForm(true)
                  closeDropdownMenu()
                }}
              />
            </div>
          }
        />,
      ]}
      thisMenu="howToPlay"
    />
  )
}

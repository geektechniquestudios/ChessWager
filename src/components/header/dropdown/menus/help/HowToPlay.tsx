import { BetsState } from "../../../../containers/BetsState"
import { DropdownState } from "../../../../containers/DropdownState"
import { Menu } from "../../models/Menu"
import { SectionWrapper } from "./SectionWrapper"
const isMainnet = import.meta.env.IS_MAINNET

export const HowToPlay: React.FC = ({}) => {
  const { setShowWagerForm } = BetsState.useContainer()
  const { closeDropdownMenu } = DropdownState.useContainer()
  return (
    <Menu
      menuItems={[
        <div className="my-2 flex w-full flex-col justify-center gap-2 px-2">
          <SectionWrapper
            text="1. Add the Metamask extension to your browser"
            href="https://metamask.io/download/"
          />
          <SectionWrapper
            text="2. Add the Avalanche network to Metamask"
            href={`https://chainlist.org/chain/${
              isMainnet ? "43114" : "43113"
            }`}
          />
          <SectionWrapper
            text="3. Fund your wallet"
            href={
              isMainnet
                ? "https://www.coinbase.com/price/avalanche"
                : "https://faucet.avax.network/"
            }
          />
          <SectionWrapper
            text="4. Place a bet"
            onClick={() => {
              setShowWagerForm(true)
              closeDropdownMenu()
            }}
          />
        </div>,
      ]}
      thisMenu="howToPlay"
    />
  )
}

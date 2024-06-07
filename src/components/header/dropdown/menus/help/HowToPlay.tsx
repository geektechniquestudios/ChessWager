import { BetsState } from "../../../../../containers/BetsState"
import { DropdownState } from "../../../../../containers/DropdownState"
import { Menu } from "../../models/Menu"
import { HowToPlaySection } from "./HowToPlaySection"
import { TbNetwork } from "react-icons/tb"
import { CiCoinInsert } from "react-icons/ci"
import { FaRegHandshake } from "react-icons/fa"
import { BiExtension } from "react-icons/bi"

const isMainnet = import.meta.env.VITE_IS_MAINNET === "true"

export const HowToPlay: React.FC = ({}) => {
  const { setShowWagerForm } = BetsState.useContainer()
  const { closeDropdownMenu } = DropdownState.useContainer()
  return (
    <Menu
      menuItems={[
        <div className="my-2 flex w-full flex-col justify-center gap-2 px-2">
          <HowToPlaySection
            text="1. Add the Metamask extension to your browser"
            href="https://metamask.io/download/"
            icon={<BiExtension size={25} />}
          />
          <HowToPlaySection
            text="2. Add the Avalanche network to Metamask"
            href={`https://chainlist.org/chain/${
              isMainnet ? "43114" : "43113"
            }`}
            icon={<TbNetwork size={25} />}
          />
          <HowToPlaySection
            text="3. Fund your wallet"
            href={
              isMainnet
                ? "https://www.coinbase.com/price/avalanche"
                : "https://faucet.avax.network/"
            }
            icon={<CiCoinInsert size={30} />}
          />
          <HowToPlaySection
            text="4. Place a bet"
            onClick={() => {
              setShowWagerForm(true)
              closeDropdownMenu()
            }}
            icon={<FaRegHandshake size={20} />}
          />
        </div>,
      ]}
      thisMenu="howToPlay"
    />
  )
}

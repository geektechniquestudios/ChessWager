import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { SectionWrapper } from "./SectionWrapper"

declare let window: any

export const HowToPlay: React.FC = ({}) => {
  // use this version for mainnet inclusion
  // const isCorrectBlockchain = async (
  //   provider: ethers.providers.Web3Provider,
  // ) => {
  //   const { chainId } = await provider.getNetwork()
  //   if (isLocal && chainId !== 43113) {
  //     alert("You are on the wrong network. Please switch to the fuji network.")
  //     return false
  //   }
  //   else if (!isLocal && chainId !== 43114) {
  //     alert(
  //       "You are on the wrong network. Please switch to the avalanche mainnet.",
  //     )
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // }

  //
  // use this version until mainnet
  

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
                href="https://app.pangolin.exchange/#/buy"
              />
            </div>
          }
        />,
      ]}
      thisMenu={"howToPlay"}
    />
  )
}

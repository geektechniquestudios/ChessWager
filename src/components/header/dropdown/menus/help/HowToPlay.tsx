import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { SectionWrapper } from "./SectionWrapper"

declare let window: any

export const HowToPlay: React.FC = ({}) => {
  const isMetamaskInstalled = typeof window.ethereum !== undefined
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

  const checkNetowrk = async () => {
    // await window.ethereum.request({ method: "eth_requestAccounts" })
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const { chainId } = await provider.getNetwork()
    // return chainId === 43113
    return true
  }

  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

  useEffect(() => {
    checkNetowrk().then(setIsCorrectNetwork)
  }, [])

  const isWalletBalancePositive = () => {
    return true
  }

  const connectWallet = async () => {}

  return (
    <Menu
      menuItems={[
        <DropdownArea
          content={
            <div className="my-2 flex w-full flex-col justify-center gap-2 px-2">
              <SectionWrapper
                text="1. Add the Metamask extension to your browser"
                href="https://metamask.io/download/"
                isComplete={isMetamaskInstalled}
              />
              <SectionWrapper
                text="2. Add the Avalanche network to Metamask"
                href="https://chainlist.org/chain/43114/"
                isComplete={isCorrectNetwork}
              />
              <SectionWrapper
                text="3. Fund your wallet"
                href="https://app.pangolin.exchange/#/buy"
                isComplete={isWalletBalancePositive()}
                // isComplete={true}
              /> 
               <SectionWrapper
                text="4. Connect your wallet"
                onClick={() => {
                  // connectWallet()
                }}
                isComplete={true}
              />
            </div>
          }
        />,
      ]}
      thisMenu={"howToPlay"}
    />
  )
}

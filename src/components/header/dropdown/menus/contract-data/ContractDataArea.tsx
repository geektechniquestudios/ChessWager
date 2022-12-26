import { useEffect, useState } from "react"
import { ethers } from "ethers"
import ChessWager from "../../../../../artifacts/contracts/ChessWager.sol/ChessWager.json"
import { Price } from "../../../../containers/Price"
import { CircularProgress } from "@mui/material"
import { DropdownState } from "../../../../containers/DropdownState"
import { CustomSwal } from "../../../../popups/CustomSwal"

//@ts-ignore
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

interface Props {}

declare let window: any

export const ContractDataArea: React.FC<Props> = ({}) => {
  const [contractBalanceUSD, setContractBalanceUSD] = useState<number>(0)
  const [contractBalanceAVAX, setContractBalanceAVAX] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { avaxPrice } = Price.useContainer()

  // use this version for mainnet inclusion
  // const isCorrectBlockchain = async (
  //   provider: ethers.providers.Web3Provider,
  // ) => {
  //   const { chainId } = await provider.getNetwork()
  // if (isLocal && chainId !== 43113) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Wrong Network!",
  //     text: "You are on the wrong network. Please switch to the fuji network.",
  //   })
  //   return false
  // }
  //   else if (!isLocal && chainId !== 43114) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Wrong Network!",
  //     text: "You are on the wrong network. Please switch to the avalanche mainnet.",
  //   })
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // }

  //
  // use this version until mainnet

  const isCorrectBlockchain = async (
    provider: ethers.providers.Web3Provider,
  ) => {
    const { chainId } = await provider.getNetwork()
    if (chainId !== 43113) {
      CustomSwal(
        "error",
        "Wrong Network",
        "You are on the wrong network. Please switch to the Fuji network.",
      )
      return false
    } else {
      return true
    }
  }

  const callContract = async (
    contractCallFunction: (contract: ethers.Contract) => any,
  ) => {
    if (typeof window.ethereum === undefined) {
      CustomSwal("error", "Error", "Please install MetaMask to place a bet.")
    }
    await window.ethereum.request({ method: "eth_requestAccounts" })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress,
      ChessWager.abi,
      signer,
    )
    try {
      if (!(await isCorrectBlockchain(provider))) {
        return
      }
      await contractCallFunction(contract)
      contract.removeAllListeners()
    } catch (err) {
      contract.removeAllListeners()
      console.error(err)
    }
  }

  const getBalance = async (contract: ethers.Contract) => {
    const balance = await contract.viewChessWagerBalance()
    const balanceAVAX = Number(
      (Number(balance.toString()) / 10 ** 18).toFixed(6),
    )
    const balanceUSD = Number((balanceAVAX * avaxPrice).toFixed(2))

    setContractBalanceAVAX(balanceAVAX)
    setContractBalanceUSD(balanceUSD)
    setIsLoading(false)
  }

  const withdrawBalance = async (contract: ethers.Contract) => {
    await contract.withdrawChessWagerBalance()
  }

  useEffect(() => {
    callContract(getBalance)
    const interval = setInterval(() => {
      callContract(getBalance)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const { goToMenu } = DropdownState.useContainer()

  return (
    <div className="flex h-60 w-full justify-center">
      <div className="flex flex-col justify-evenly">
        <>
          {isLoading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex justify-end text-3xl">
                <p className="p-0.5 text-sm">$</p>
                {contractBalanceUSD.toFixed(2)}
                <p className="flex w-12 flex-col-reverse p-0.5 text-sm">USD</p>
              </div>
              <div className="flex justify-end text-3xl">
                {contractBalanceAVAX.toFixed(4)}
                <p className="flex w-12 flex-col-reverse p-0.5 text-sm">AVAX</p>
              </div>
            </div>
          )}
        </>
        <button
          className="color-shift clickable rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
          onClick={() => {
            callContract(withdrawBalance)
          }}
        >
          Withdraw Balance
        </button>
        <button
          className="color-shift clickable rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
          onClick={() => {
            goToMenu("missedPayments")
          }}
        >
          Missed Payments
        </button>
      </div>
    </div>
  )
}

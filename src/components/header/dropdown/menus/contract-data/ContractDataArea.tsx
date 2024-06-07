import { CircularProgress } from "@mui/material"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { AuthState } from "../../../../../containers/AuthState"
import { DropdownState } from "../../../../../containers/DropdownState"
import { PriceState } from "../../../../../containers/PriceState"

interface Props {}

export const ContractDataArea: React.FC<Props> = ({}) => {
  const [contractBalanceUSD, setContractBalanceUSD] = useState<number>(0)
  const [contractBalanceAVAX, setContractBalanceAVAX] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { avaxPrice } = PriceState.useContainer()
  const { callContract } = AuthState.useContainer()

  const getBalance = async (contract: ethers.Contract) => {
    const balance: number = await contract.viewChessWagerBalance()
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
          className="color-shift clickable rounded-md border border-stone-500 bg-stone-100 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
          onClick={() => {
            callContract(withdrawBalance)
          }}
        >
          Withdraw Balance
        </button>
        <button
          className="color-shift clickable rounded-md border border-stone-500 bg-stone-100 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
          onClick={() => {
            goToMenu("missedPayments")
          }}
        >
          Missed Payments
        </button>
        <button
          className="color-shift clickable rounded-md border border-stone-500 bg-stone-100 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
          onClick={() => {
            goToMenu("banUser")
          }}
        >
          Ban Hammer
        </button>
      </div>
    </div>
  )
}

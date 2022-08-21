import { useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"
import ChessWager from "../../../../../artifacts/contracts/ChessWager.sol/ChessWager.json"

//@ts-ignore
const contractAddress = import.meta.env.VITE_METAMASK_ACCOUNT_ADDRESS

interface Props {}

declare let window: any

export const ContractDataArea: React.FC<Props> = ({}) => {
  const [contractBalanceUSD, setContractBalanceUSD] = useState<number>(0)
  const [contractBalanceAVAX, setContractBalanceAVAX] = useState<number>(0)

  const overrides = {
    gasLimit: 1000000,
  }

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

  const isCorrectBlockchain = async (
    provider: ethers.providers.Web3Provider,
  ) => {
    const { chainId } = await provider.getNetwork()
    if (chainId !== 43113) {
      alert("You are on the wrong network. Please switch to the fuji network.")
      return false
    } else {
      return true
    }
  }

  const callContract = async (
    contractCall: (contract: ethers.Contract) => any,
  ) => {
    if (typeof window.ethereum === undefined)
      alert("Please install MetaMask to place a bet.")

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
      // const transaction = await contract.viewChessWagerBalance()
      const transaction = await contractCall(contract)
      console.log(transaction)
      transaction.wait().then(() => {
        contract.removeAllListeners()
      })
    } catch (err) {
      contract.removeAllListeners()
      console.error(err)
    }
  }

  const balanceCheck = async (contract: ethers.Contract) => {
    return contract.viewChessWagerBalance()
  }

  const withdrawBalance = async (contract: ethers.Contract) => {
    return contract.withdrawChessWagerBalance(overrides)
  }

  useEffect(() => {
    callContract(balanceCheck)
  }, [])

  return (
    <div className="flex h-60 w-full justify-center">
      <div className="flex flex-col justify-evenly">
        <div className="flex flex-col gap-2">
          <p className="flex justify-center text-3xl">
            {contractBalanceUSD.toFixed(2)}
          </p>
          <p className="flex justify-center text-3xl">
            {contractBalanceAVAX.toFixed(6)}
          </p>
        </div>
        <button
          className="color-shift clickable rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
          onClick={() => {
            callContract(withdrawBalance)
          }}
        >
          Withdraw Balance
        </button>
      </div>
    </div>
  )
}

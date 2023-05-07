import { GiPayMoney, GiReceiveMoney } from "react-icons/gi"
import { RiPenNibLine } from "react-icons/ri"
import { SiLichess } from "react-icons/si"
import { DropdownButton } from "../persona/buttons/DropdownButton"
const isMainnet = import.meta.env.IS_MAINNET

interface Props {
  contractAddress: string
  gameId: string
  userTransactionHash?: string
  payoutTransactionHash?: string
}

export const BetMenuHeader: React.FC<Props> = ({
  contractAddress,
  gameId,
  userTransactionHash,
  payoutTransactionHash,
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-2">
        <DropdownButton
          href={`https://lichess.org/${gameId}`}
          title="Game Source"
          content={<SiLichess />}
        />
        {userTransactionHash && (
          <DropdownButton
            href={`https://${
              isMainnet ? "" : "testnet."
            }snowtrace.io/tx/${userTransactionHash}`}
            title="Your Buy-In Transaction"
            content={<GiPayMoney />}
          />
        )}
        {payoutTransactionHash && userTransactionHash && (
          <DropdownButton
            href={`https://${
              isMainnet ? "" : "testnet."
            }snowtrace.io/tx/${payoutTransactionHash}`}
            title="Payout Transaction"
            content={<GiReceiveMoney />}
          />
        )}
      </div>
      <DropdownButton
        href={`https://${
          isMainnet ? "" : "testnet."
        }snowtrace.io/address/${contractAddress}`}
        className="color-shift clickable flex gap-2 rounded-full border border-stone-600 bg-white px-2 py-1 text-xs text-stone-800 hover:border-black hover:text-black dark:border-stone-400 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-white dark:hover:text-white"
        title="Smart Contract"
        content={
          <div className="flex gap-1">
            <div className="mt-0.5">
              <RiPenNibLine />
            </div>
            {contractAddress?.substring(-1, 6)}...
            {contractAddress?.substring(
              contractAddress.length - 3,
              contractAddress.length,
            )}
          </div>
        }
      />
    </div>
  )
}

import { BsPiggyBank } from "react-icons/bs"
import { FaRegHandPeace, FaRegHandshake } from "react-icons/fa"
import { FiPercent, FiUsers } from "react-icons/fi"
import { GiPayMoney } from "react-icons/gi"
import { RiHandCoinLine } from "react-icons/ri"
import { DarkModeState } from "../../../../../containers/DarkModeState"
import { UserDataTile } from "./UserDataTile"

interface Props {
  betWinCount: number
  betFundedCount: number
  betAcceptedCount: number
  friends: string[]
  amountBet: number
  amountWon: number
}

export const UserTiles: React.FC<Props> = ({
  betWinCount,
  betFundedCount,
  betAcceptedCount,
  friends,
  amountBet,
  amountWon,
}) => {
  const { isDarkOn } = DarkModeState.useContainer()
  const winPercent =
    betWinCount !== 0 && betFundedCount !== 0
      ? ((betWinCount / betFundedCount) * 100).toFixed(2)
      : 0

  const trust = `${betFundedCount} / ${betAcceptedCount}`
  return (
    <div className="mb-1 grid w-full grid-cols-2 gap-x-1 gap-y-1.5 text-sm">
      <UserDataTile data={trust} name="Trust" icon={<FaRegHandshake />} />
      <UserDataTile
        data={friends?.length ?? 0}
        name="Friends"
        icon={<FiUsers />}
      />
      <UserDataTile
        data={betWinCount ?? 0}
        name="Bets Won"
        icon={<FaRegHandPeace />}
      />
      <UserDataTile
        data={betFundedCount - betWinCount}
        name="Bets Lost"
        icon={<FaRegHandPeace className="rotate-180" />}
      />
      <UserDataTile data={winPercent} name="Win Percent" icon={<FiPercent />} />
      <UserDataTile
        data={amountBet.toFixed(4) ?? 0}
        name="Total Amount Bet"
        icon={
          <GiPayMoney
            strokeWidth={35}
            stroke={isDarkOn ? "#d6d3d1" : "#1c1917"}
            color="transparent"
          />
        }
      />
      <UserDataTile
        name="Total AVAX Won"
        icon={<RiHandCoinLine />}
        data={parseFloat((amountWon ?? 0).toFixed(4))}
      />
      <UserDataTile
        data={(amountWon - amountBet).toFixed(4) ?? 0}
        name="Net Profit"
        icon={<BsPiggyBank />}
      />
    </div>
  )
}

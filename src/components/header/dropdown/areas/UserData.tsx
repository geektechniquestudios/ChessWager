import { AiOutlineMinusCircle } from "react-icons/ai"
import { BsPiggyBank } from "react-icons/bs"
import { FaRegHandPeace, FaRegHandshake } from "react-icons/fa"
import { FiPercent } from "react-icons/fi"
import { GiPayMoney } from "react-icons/gi"
import {
  RiHandCoinLine,
  RiHeartsLine,
  RiStackLine,
  RiUserHeartLine,
} from "react-icons/ri"
import { DarkMode } from "../../../containers/DarkMode"
import { UserDataLoading } from "./LoadingUserData"
import { UserButtons } from "./UserButtons"
import { UserDataTile } from "./UserDataTile"

interface Props {
  betAcceptedCount?: number
  betFundedCount?: number
  bets?: string[]
  blocked?: string[]
  photoURL?: string
  displayName?: string
  walletAddress?: string
  id?: string
  isLoading?: boolean
}

export const UserData: React.FC<Props> = ({
  betAcceptedCount,
  betFundedCount,
  bets,
  blocked,
  displayName,
  id,
  photoURL,
  walletAddress,
  isLoading,
}) => {
  const { isDarkOn } = DarkMode.useContainer()
  return (
    <div className="h-96 flex flex-col items-center">
      {isLoading ? (
        <UserDataLoading isLoading={isLoading} />
      ) : (
        <>
          <img
            src={photoURL}
            className="w-24 h-24 rounded-full grid place-content-center mt-9"
          />
          <p className="my-3">{displayName ?? ""}</p>
          <UserButtons
            id={id ?? ""}
            displayName={displayName ?? ""}
            photoURL={photoURL!}
          />
          <div className="w-full h-full grid gap-1.5 grid-cols-2 p-2">
            <UserDataTile
              data={"5"}
              name="Following"
              icon={<RiUserHeartLine />}
            />
            <UserDataTile
              data={"20"}
              name="Followers"
              icon={<RiHeartsLine />}
            />
            <UserDataTile
              data={`${betFundedCount} / ${betAcceptedCount}`}
              name="Trust"
              icon={<FaRegHandshake />}
            />
            <UserDataTile
              data={"128"}
              name="Bet Count"
              icon={<RiStackLine />}
            />
            <UserDataTile
              data={"72"}
              name="Bets Won"
              icon={<FaRegHandPeace />}
            />
            <UserDataTile
              data={"56"}
              name="Bets Lost"
              icon={<AiOutlineMinusCircle />}
            />
            <UserDataTile
              data={"56.25"}
              name="Win Percent"
              icon={<FiPercent />}
            />
            <UserDataTile
              data={"479"}
              name="Total Amount Bet"
              icon={
                <GiPayMoney
                  strokeWidth={22}
                  stroke={isDarkOn ? "#d6d3d1" : "#1c1917"}
                  color="transparent"
                />
              }
            />
            <UserDataTile
              data={"1121"}
              name="Net Profit"
              icon={<BsPiggyBank />}
            />
            <UserDataTile
              data={"9430"}
              name="Total Amount Won"
              icon={<RiHandCoinLine />}
            />
          </div>
        </>
      )}
    </div>
  )
}

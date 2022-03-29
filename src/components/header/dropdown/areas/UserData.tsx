import { BsPiggyBank } from "react-icons/bs"
import { FaRegHandshake, FaUsersSlash } from "react-icons/fa"
import { FiPercent } from "react-icons/fi"
import { GiPayMoney, GiPodiumWinner, GiShadowFollower, GiTwoShadows } from "react-icons/gi"
import { RiStackLine } from "react-icons/ri"
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
              icon={<GiShadowFollower />}
            />
            <UserDataTile
              data={"20"}
              name="Followers"
              icon={<GiTwoShadows />}
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
              icon={<GiPodiumWinner />}
            />
            <UserDataTile
              data={"1121"}
              name="Net Profit"
              icon={<BsPiggyBank />}
            />
            <UserDataTile
              data={"56.25"}
              name="Win Percent"
              icon={<FiPercent />}
            />
            <UserDataTile
              data={"479"}
              name="Total Amount Bet"
              icon={<GiPayMoney />}
            />
            <UserDataTile
              data={"3"}
              name="Users Blocked"
              icon={<FaUsersSlash />}
            />
          </div>
        </>
      )}
    </div>
  )
}

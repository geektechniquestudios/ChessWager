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
          <div className="w-full h-full grid gap-2 grid-cols-2 p-3">
            <UserDataTile
              data={""}
              name="Following"
              icon={<GiShadowFollower />}
            />
            <UserDataTile
              data={""}
              name="Followers"
              icon={<GiTwoShadows />}
            />
            <UserDataTile
              data={`${betFundedCount} / ${betAcceptedCount}`}
              name="Trust"
              icon={<FaRegHandshake />}
            />
            <UserDataTile
              data={""}
              name="Bet Count"
              icon={<RiStackLine />}
            />
            <UserDataTile
              data={""}
              name="Bets Won"
              icon={<GiPodiumWinner />}
            />
            <UserDataTile
              data={""}
              name="Net Profit"
              icon={<BsPiggyBank />}
            />
            <UserDataTile
              data={""}
              name="Win Percent"
              icon={<FiPercent />}
            />
            <UserDataTile
              data={""}
              name="Total Amount Bet"
              icon={<GiPayMoney />}
            />
            <UserDataTile
              data={""}
              name="Users Blocked"
              icon={<FaUsersSlash />}
            />
          </div>
        </>
      )}
    </div>
  )
}

import { UserImage } from "./UserImage"

interface Props {
  user2PhotoURL: string
  user2DisplayName: string
  status: string
  user2Id: string
}

export const User2Image: React.FC<Props> = ({
  user2PhotoURL,
  user2DisplayName,
  status,
  user2Id,
}) => {
  return (
    <>
      {status !== "ready" && (
        <UserImage
          photoURL={user2PhotoURL}
          displayName={user2DisplayName}
          isPlayer2={true}
          userId={user2Id}
        />
      )}
    </>
  )
}

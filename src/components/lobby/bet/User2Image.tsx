import { UserImage } from "./UserImage"

interface Props {
  user2PhotoURL: string
  user2DisplayName: string
  status: string
}

export const User2Image: React.FC<Props> = ({
  user2PhotoURL,
  user2DisplayName,
  status,
}) => {
  return (
    <>
      {status !== "ready" && (
        <UserImage
          photoURL={user2PhotoURL}
          displayName={user2DisplayName}
          isPlayer2={true}
        />
      )}
    </>
  )
}

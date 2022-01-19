import { Auth } from "../../containers/Auth"

interface Props {
  user2PhotoURL: string
  user2DisplayName: string
  user1Id: string
  status: string
  isSelected: boolean
}

export const User2Image: React.FC<Props> = ({
  user2PhotoURL,
  user2DisplayName,
  user1Id,
  status,
  isSelected,
}) => {
  const { auth } = Auth.useContainer()
  const isUser1 = auth.currentUser?.uid === user1Id

  return (
    <>
      {status !== "ready" && (
        <div className="flex border-2 rounded-r-full px-1 min-w-min justify-end">
          <div className="flex justify-center align-middle">
            <p className="text-xs mx-1 flex flex-col justify-center">
              {user2DisplayName}
            </p>
            <div className="flex flex-col justify-center">
              <div className="rounded-full border w-8 h-8 grid place-content-center">
                <img
                  src={user2PhotoURL}
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "ready" && isSelected && !isUser1 && (
        <>
          <div className="flex border-2 rounded-r-full px-1 min-w-min justify-end">
            <div className="flex justify-center align-middle">
              <p className="text-xs mx-1 flex flex-col justify-center">
                {auth.currentUser?.displayName}
              </p>
              <div className="flex flex-col justify-center">
                <div className="rounded-full border w-8 h-8 grid place-content-center">
                  <img
                    src={auth.currentUser?.photoURL ?? ""}
                    alt=""
                    className="h-6 w-6 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

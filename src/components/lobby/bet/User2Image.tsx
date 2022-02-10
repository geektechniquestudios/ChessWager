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
        <div className="flex px-1 min-w-min gap-2">
          <div className="flex justify-center align-middle">
            <p className="text-xs mx-1 flex flex-col justify-center">
              {user2DisplayName}
            </p>
            <div className="flex flex-col justify-center align-middle">
              <div className="rounded-full w-8 h-8 grid place-content-center">
                <img
                  src={user2PhotoURL}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

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
    <div className="flex border-2 rounded-r-full px-1 min-w-min justify-end">
      <div className="flex justify-center align-middle">
        {status !== "ready" && (
          <>
            <p className="text-xs mx-1">{user2DisplayName}</p>
            <div className="flex flex-col justify-center">
              <div className="rounded-full border w-8 h-8 grid place-content-center">
                <img
                  src={user2PhotoURL}
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

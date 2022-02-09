interface Props {
  user1PhotoURL: string
  user1DisplayName: string
}

export const User1Image: React.FC<Props> = ({
  user1PhotoURL,
  user1DisplayName,
}) => {
  return (
    <div className="flex px-1 min-w-min gap-2">
      <div className="flex flex-col justify-center align-middle">
        <div className="rounded-full w-8 h-8 grid place-content-center">
          <img src={user1PhotoURL} alt="" className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <p className="text-xs mx-1 flex flex-col justify-center">{user1DisplayName}</p>
    </div>
  )
}

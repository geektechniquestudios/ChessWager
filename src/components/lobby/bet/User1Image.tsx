interface Props {
  user1PhotoURL: string
  user1DisplayName: string
}

export const User1Image: React.FC<Props> = ({
  user1PhotoURL,
  user1DisplayName,
}) => {
  return (
    <div className="flex border-2 rounded-l-full px-1 min-w-min">
      <div className="flex flex-col justify-center align-middle">
        <div className="rounded-full border w-8 h-8 grid place-content-center">
          <img src={user1PhotoURL} alt="" className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <p className="text-xs mx-1 flex flex-col justify-center">{user1DisplayName}</p>
    </div>
  )
}

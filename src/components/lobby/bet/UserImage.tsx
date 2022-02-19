interface Props {
  photoURL: string
  displayName: string
  isPlayer2?: boolean
}

export const UserImage: React.FC<Props> = ({
  photoURL,
  displayName,
  isPlayer2,
}) => {
  const sideFlip = isPlayer2 ?? false ? "flex-row-reverse" : ""
  return (
    <div className={`flex px-1 min-w-min gap-2 ${sideFlip}`}>
      <div className="flex flex-col justify-center align-middle">
        <div className="rounded-full w-8 h-8 grid place-content-center">
          <img src={photoURL} alt="" className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <p className="text-xs mx-1 flex flex-col justify-center">{displayName}</p>
    </div>
  )
}

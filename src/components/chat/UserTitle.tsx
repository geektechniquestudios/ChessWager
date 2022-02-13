interface Props {
  photoURL: string
  userName: string
}

export const UserTitle: React.FC<Props> = ({ photoURL, userName }) => {
  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col justify-center">
        <img
          src={photoURL}
          alt=""
          title={userName}
          className="w-4 h-4 rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xs font-bold text-stone-900 dark:text-stone-300">{`${userName}`}</p>
      </div>
    </div>
  )
}

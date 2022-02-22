import { DropdownState } from "../containers/DropdownState"

interface Props {
  photoURL: string
  userName: string
}

export const UserTitle: React.FC<Props> = ({ photoURL, userName }) => {
  const { setIsDropdownOpen } = DropdownState.useContainer()

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className="flex gap-1 mr-1 float-left hover:underline"
      onClick={() => {
        setIsDropdownOpen(true)
      }}
    >
      <img
        src={photoURL}
        alt=""
        title={userName}
        className="w-4 h-4 rounded-full"
      />
      <p className="text-xs font-bold text-stone-900 dark:text-stone-300 hover:underline">{`${userName}:`}</p>
    </a>
  )
}

interface Props {
  name: string
  icon: React.ReactNode
  data: string | number
}

export const UserDataTile: React.FC<Props> = ({ name, icon, data }) => {
  return (
    <div
      title={name}
      className="flex justify-between rounded-md bg-stone-300 dark:bg-stone-600 border border-stone-400 dark:border-stone-800"
    >
      <div className="flex justify-center items-center rounded-md text-lg m-1 px-4 bg-stone-100 dark:bg-stone-700">
        {icon}
      </div>
      <div className="flex justify-center items-center grow text-lg">
        {data}
      </div>
    </div>
  )
}

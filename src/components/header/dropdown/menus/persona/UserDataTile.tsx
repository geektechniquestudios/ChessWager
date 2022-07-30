interface Props {
  name: string
  icon: React.ReactNode
  data: string | number
}

export const UserDataTile: React.FC<Props> = ({ name, icon, data }) => {
  return (
    <div
      title={name}
      className="flex justify-between rounded-md border border-stone-400 bg-stone-300 dark:border-stone-500 dark:bg-stone-600"
    >
      <div className="m-1 flex items-center justify-center rounded-md bg-stone-100 px-4 text-lg dark:bg-stone-700">
        {icon}
      </div>
      <div className="flex grow items-center justify-center">{data}</div>
    </div>
  )
}

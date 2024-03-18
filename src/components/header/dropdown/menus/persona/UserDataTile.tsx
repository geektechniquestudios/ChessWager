interface Props {
  name: string
  icon: React.ReactNode
  data: string | number
}

export const UserDataTile: React.FC<Props> = ({ name, icon, data }) => {
  return (
    <div
      title={name}
      className="flex justify-between whitespace-nowrap rounded-md border border-stone-400 bg-stone-200 p-0.5 dark:border-stone-500 dark:bg-stone-600"
    >
      <div className="boder-stone-400 flex items-center justify-center rounded-md border border-stone-400 bg-stone-100 px-2 py-0.5 text-lg dark:border-stone-500 dark:bg-stone-700">
        {icon}
      </div>
      <div className="flex grow items-center justify-center">{data}</div>
    </div>
  )
}

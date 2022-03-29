interface Props {
  name: string
  icon: React.ReactNode
  data: string
}

export const UserDataTile: React.FC<Props> = ({ name, icon, data }) => {
  return (
    <div className="flex justify-between rounded-md bg-stone-300 dark:bg-stone-600">
      <div
        title={name}
        className="flex items-center align-center rounded-md m-1 px-5 bg-stone-100 dark:bg-stone-700"
      >
        {icon}
      </div>
      <div className="grid place-content-center mx-1.5">{data}</div>
    </div>
  )
}

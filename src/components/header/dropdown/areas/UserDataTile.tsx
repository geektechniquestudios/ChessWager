interface Props {
  name: string
  icon: React.ReactNode
  data: string
}

export const UserDataTile: React.FC<Props> = ({ name, icon, data }) => {
  return (
    <div className="flex justify-between bg-stone-300 dark:bg-stone-800">
      <div
        title={name}
        className="flex items-center align-center m-1 px-5 bg-stone-200 dark:bg-stone-700"
      >
        {icon}
      </div>
      <div className="grid place-content-center mx-1.5">
        {data}
      </div>
    </div>
  )
}

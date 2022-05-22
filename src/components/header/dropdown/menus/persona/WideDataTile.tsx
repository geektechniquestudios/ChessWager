interface Props {
  name: string
  icon: React.ReactNode
  data: string
}

export const WideDataTile: React.FC<Props> = ({ name, icon, data }) => {
  return (
    <div
      title={name}
      className="my-1 flex w-full justify-between rounded-md border border-stone-400 bg-stone-300 dark:border-stone-800 dark:bg-stone-600"
    >
      <div className="m-1 flex items-center justify-center rounded-md bg-stone-100 px-6 text-lg dark:bg-stone-700">
        {icon}
      </div>
      <div className="flex grow items-center justify-center text-lg">
        {data}
      </div>
    </div>
  )
}

interface Props {
  dataName: string
  dataIcon: React.ReactNode
}

export const UserDataTile: React.FC<Props> = ({ dataName, dataIcon }) => {
  return (
    <div className="flex justify-evenly bg-stone-300 dark:bg-stone-800">
      <div
        title={dataName}
        className="flex items-center rounded align-center m-1 px-5 bg-stone-200 dark:bg-stone-700"
      >
        {dataIcon}
      </div>
    </div>
  )
}

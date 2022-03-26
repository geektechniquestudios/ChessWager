interface Props {
    dataName: string
    dataIcon: React.ReactNode
  }
  
  export const UserDataTile: React.FC<Props> = ({ dataName, dataIcon }) => {
    return (
      <div title={dataName} className="flex justify-evenly">
        {dataIcon}
      </div>
    )
  }
  
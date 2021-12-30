interface Props {}

export const LobbyHeader: React.FC<Props> = ({}) => {
  return (
    <div className="flex w-full h-6 border">
      <div className="border">filter:</div>
      <div className="flex justify-between w-full mx-4">
        <div className="border">trust</div>
        <div className="border">amount</div>
        <div className="border">side</div>
      </div>
    </div>
  )
}

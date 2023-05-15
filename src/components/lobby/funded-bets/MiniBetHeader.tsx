interface Props {
  headerStyle: string
}

export const MiniBetHeader: React.FC<Props> = ({ headerStyle }) => {
  return (
    <>
      <div
        className={`${headerStyle} absolute left-0 right-0 top-0 h-3 rounded-t-sm border-b`}
      />
      <div
        className={`${headerStyle} absolute top-0 h-4 w-12 rounded-b-md border-b`}
      />
    </>
  )
}

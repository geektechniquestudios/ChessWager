interface Props {}

export const UserDataLoading: React.FC<Props> = ({}) => {
  return (
    <div className="flex-col w-full h-full">
      <div className="flex w-full justify-center">
        <div className="rounded-full h-24 w-24 bg-stone-400 dark:bg-stone-500 my-9 animate-pulse" />
      </div>
      <div className="h-full bg-stone-400 dark:bg-stone-500 animate-pulse rounded-md" />
    </div>
  )
}

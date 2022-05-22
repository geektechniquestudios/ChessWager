interface Props {}

export const UserDataLoading: React.FC<Props> = ({}) => {
  return (
    <div className="h-full w-full flex-col">
      <div className="flex w-full justify-center">
        <div className="my-9 h-24 w-24 animate-pulse rounded-full bg-stone-400 dark:bg-stone-500" />
      </div>
      <div className="h-full animate-pulse rounded-md bg-stone-400 dark:bg-stone-500" />
    </div>
  )
}

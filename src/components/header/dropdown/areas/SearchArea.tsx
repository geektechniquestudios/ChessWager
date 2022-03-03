interface Props {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const SearchArea: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <input
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="inline-block resize-none outline-none text-lg w-full p-2 bg-stone-200 dark:bg-stone-800 dark:text-stone-50 h-12"
      placeholder="Find someone"
    />
  )
}

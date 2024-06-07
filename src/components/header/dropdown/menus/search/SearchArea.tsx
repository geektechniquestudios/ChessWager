import { useEffect, useRef } from "react"

interface Props {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const SearchArea: React.FC<Props> = ({ search, setSearch }) => {
  const searchInput = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setTimeout(() => {
      searchInput.current?.focus()
    }, 500)
  }, [])
  return (
    <input
      id="search-users-input"
      ref={searchInput}
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="inline-block h-10 w-full resize-none bg-stone-100 p-2 text-lg outline-none dark:bg-stone-800 dark:text-stone-50"
      placeholder="Find someone"
      autoComplete="off"
    />
  )
}

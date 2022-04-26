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
      ref={searchInput}
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="inline-block resize-none outline-none text-lg w-full p-2 bg-stone-300 dark:bg-stone-800 dark:text-stone-50 h-10"
      placeholder="Find someone"
    />
  )
}

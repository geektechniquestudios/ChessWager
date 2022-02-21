import { DropdownState } from "../../containers/DropdownState"

interface Props {
  content: React.ReactNode
  height?: number
}

export const DropdownArea: React.FC<Props> = ({ content, height }) => {
  return (
    <div
      className={`${
        height && `h-${height}`
      } w-64 px-4 flex items-center dark:text-stone-200 color-shift`}
    >
      {content}
    </div>
  )
}

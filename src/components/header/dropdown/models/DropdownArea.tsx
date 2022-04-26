interface Props {
  content: React.ReactNode
  className?: string
}

export const DropdownArea: React.FC<Props> = ({ content, className }) => {
  return (
    <div
      className={`w-64 flex items-center dark:text-stone-200 color-shift ${className}`}
    >
      {content}
    </div>
  )
}

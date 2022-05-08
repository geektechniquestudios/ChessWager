interface Props {
  content: React.ReactNode
  className?: string
}

export const DropdownArea: React.FC<Props> = ({ content, className }) => {
  return (
    <div
      className={`color-shift flex w-64 items-center dark:text-stone-200 ${className}`}
    >
      {content}
    </div>
  )
}

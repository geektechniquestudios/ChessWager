interface Props {
  content: React.ReactNode
  height?: number
  className?: string
}

export const DropdownArea: React.FC<Props> = ({
  content,
  height,
  className,
}) => {
  const h = height ?? "auto"
  return (
    <div
      className={`h-${h} w-64 px-4 flex items-center dark:text-stone-200 color-shift ${className}`}
    >
      {content}
    </div>
  )
}

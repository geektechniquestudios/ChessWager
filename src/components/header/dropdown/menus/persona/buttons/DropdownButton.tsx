interface Props {
  content: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  title?: string
  className?: string
}

export const DropdownButton: React.FC<Props> = ({
  content,
  onClick,
  title,
  className,
}) => {
  return (
    <button
      className={`${className} color-shift clickable grid place-content-center rounded-full border border-stone-600 bg-white p-1 text-stone-800 hover:border-black hover:text-black dark:border-stone-400 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-white dark:hover:text-white`}
      onClick={onClick}
      title={title ?? ""}
    >
      {content}
    </button>
  )
}

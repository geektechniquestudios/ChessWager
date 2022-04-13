interface Props {
  content: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  title: string
}

export const DropdownButton: React.FC<Props> = ({
  content,
  onClick,
  title,
}) => {
  return (
    <button
      className="rounded-full grid place-content-center color-shift clickable border border-stone-400 dark:border-stone-800 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white text-stone-800 dark:text-stone-300 p-1 bg-white dark:bg-stone-800"
      onClick={onClick}
      title={title}
    >
      {content}
    </button>
  )
}

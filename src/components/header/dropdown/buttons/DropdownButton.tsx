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
      className="clickable color-shift p-2 rounded-md grid place-content-center border hover:bg-white hover:text-black hover:border-black dark:hover:bg-stone-800 dark:hover:text-white dark:hover:border-white border-stone-800 dark:border-stone-300 text-stone-800 dark:text-stone-300 w-10"
      onClick={onClick}
      title={title}
    >
      {content}
    </button>
  )
}

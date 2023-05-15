interface Props {
  content: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
  title: string
  className?: string
  href?: string
}

export const DropdownButton: React.FC<Props> = ({
  content,
  onClick,
  title,
  className,
  href,
}) => {
  return (
    <a
      className={`${className} color-shift clickable grid place-content-center rounded-full border border-stone-600 bg-white p-1 text-stone-800 hover:border-black hover:text-black dark:border-stone-400 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-white dark:hover:text-white`}
      onClick={onClick}
      href={href}
      title={title ?? ""}
      rel="noopener noreferrer"
      target="_blank"
    >
      {content}
    </a>
  )
}

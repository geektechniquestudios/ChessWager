interface Props {
  text: string
  href?: string
  isComplete: boolean
  onClick?: () => void
}

export const SectionWrapper: React.FC<Props> = ({
  text,
  href,
  isComplete,
  onClick,
}) => {
  const isCompleteStyle = isComplete
    ? "border-green-600"
    : "border-stone-600 dark:border-stone-500"
  return (
    <a
      href={href}
      className={`color-shift rounded-md border bg-stone-100 p-2 hover:text-stone-900 dark:bg-stone-800 dark:hover:border-white dark:hover:text-stone-200 ${isCompleteStyle}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {text}
    </a>
  )
}

interface Props {
  text: string
  href?: string
  onClick?: () => void
}

export const SectionWrapper: React.FC<Props> = ({
  text,
  href,
  onClick,
}) => {
  return (
    <a
      href={href}
      className="color-shift rounded-md border bg-stone-100 p-2 hover:text-stone-900 dark:bg-stone-800 dark:hover:border-white dark:hover:text-stone-200"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {text}
    </a>
  )
}

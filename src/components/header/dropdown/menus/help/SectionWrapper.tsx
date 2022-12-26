interface Props {
  text: string
  href?: string
  onClick?: () => void
}

export const SectionWrapper: React.FC<Props> = ({ text, href, onClick }) => {
  return (
    <a
      href={href}
      className="color-shift rounded-md border border-stone-300 bg-stone-100 p-2 hover:border-black hover:text-stone-900 dark:border-stone-500 dark:bg-stone-800 dark:hover:border-white dark:hover:text-stone-200"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {text}
    </a>
  )
}

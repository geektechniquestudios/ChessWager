interface Props {
  text: string
  href?: string
}

export const SectionWrapper: React.FC<Props> = ({ text, href }) => {
  return (
    <a
      href={href}
      className="color-shift rounded-md border border-stone-600 bg-stone-100 p-2 hover:text-stone-900 dark:border-stone-500 dark:bg-stone-800 dark:hover:border-white dark:hover:text-stone-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  )
}

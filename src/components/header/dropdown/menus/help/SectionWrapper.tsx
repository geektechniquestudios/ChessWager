import { ReactNode } from "react"

interface Props {
  text: string
  href?: string
  onClick?: () => void
  icon?: ReactNode
  isComplete?: boolean
}

export const SectionWrapper: React.FC<Props> = ({
  text,
  href,
  onClick,
  icon,
  isComplete,
}) => {
  return (
    <div className="color-shift relative flex justify-between gap-2 rounded-md border border-stone-300 bg-stone-100 p-2 dark:border-stone-500 dark:bg-stone-600">
      <p className="grid place-content-center">{text}</p>
      <div className="grid place-content-center">
        <a
          className="color-shift grid h-9 w-9 shrink-0 place-content-center rounded-md border dark:border-stone-400 dark:hover:border-stone-500 dark:hover:bg-stone-500"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {icon}
        </a>
      </div>
    </div>
  )
}

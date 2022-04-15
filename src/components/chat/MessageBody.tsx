interface Props {
  text: string
}

export const MessageBody: React.FC<Props> = ({ text }) => {
  return (
    <p className="text-stone-900 dark:text-stone-300 text-sm break-words">
      {text}
    </p>
  )
}

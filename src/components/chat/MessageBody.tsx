interface Props {
  text: string
}

export const MessageBody: React.FC<Props> = ({ text }) => {
  return (
    <p
      className="break-words text-sm text-stone-900 dark:text-stone-300"
      id="message"
    >
      {text}
    </p>
  )
}

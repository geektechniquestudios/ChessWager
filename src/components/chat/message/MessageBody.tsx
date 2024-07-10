import { useMemo } from "react"
import { AttributeScores, Message } from "../../../interfaces/Message"
import { responseFilter } from "../ResponseFilter"

interface Props {
  message: Message
  messageRef?: React.RefObject<HTMLDivElement>
}

export const MessageBody: React.FC<Props> = ({ message, messageRef }) => {
  const { text, attribute_scores } = message
  const {
    IDENTITY_ATTACK,
    SEVERE_TOXICITY,
    THREAT,
    TOXICITY,
    INSULT,
    PROFANITY,
  } = attribute_scores ?? {}

  const isToxic = (attributeScores: AttributeScores): boolean => {
    if ((SEVERE_TOXICITY ?? 0) > 0.7 || (IDENTITY_ATTACK ?? 0) > 0.7)
      return true
    const weights = {
      IDENTITY_ATTACK: 2,
      SEVERE_TOXICITY: 2.2,
      THREAT: 1.6,
      TOXICITY: 1.7,
      INSULT: 0.4,
      PROFANITY: 0.3,
    }
    const toxicityThreshold = 1.0
    const weightedSums = Object.keys(attributeScores).reduce(
      (total, attribute) => {
        return (
          total +
          attributeScores[attribute as keyof AttributeScores] *
            weights[attribute as keyof AttributeScores]
        )
      },
      0,
    )

    const score = weightedSums / 4
    return score > toxicityThreshold
  }

  const isMessageBlocked = useMemo(
    () => (attribute_scores ? isToxic(attribute_scores) : false),
    [IDENTITY_ATTACK, SEVERE_TOXICITY, THREAT, TOXICITY, INSULT, PROFANITY],
  )

  const textToShow = isMessageBlocked ? responseFilter(text) : text

  return (
    <p
      ref={messageRef}
      id="message"
      className="whitespace-pre-wrap break-words text-stone-900 dark:text-stone-300"
    >
      {textToShow}
    </p>
  )
}

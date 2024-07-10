import React from "react"

interface Props {
  showMore: boolean
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>
  isClampable: boolean
}

export const ShowMoreButton: React.FC<Props> = ({
  showMore,
  setShowMore,
  isClampable,
}) => {
  return (
    <>
      {isClampable && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="color-shift pl-3 text-xs font-semibold text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-300"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  )
}

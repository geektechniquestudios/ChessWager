import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { DropdownState } from "../../../../containers/DropdownState"
import { UserMenuState } from "../../../../containers/UserMenuState"

interface Props {
  scrollingContainerRef: React.RefObject<HTMLElement>
}

export const ConversationMenuHeader: React.FC<Props> = ({
  scrollingContainerRef,
}) => {
  const { usernameFromMessages, setClickedUserById, userIdFromMessages } =
    UserMenuState.useContainer()
  const { goToMenu } = DropdownState.useContainer()

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = scrollingContainerRef.current
        ? scrollingContainerRef.current.scrollTop
        : 0
      const maxScrollTop = scrollingContainerRef.current
        ? scrollingContainerRef.current.scrollHeight -
          scrollingContainerRef.current.clientHeight
        : 0

      setScrollDirection(currentScrollTop > lastScrollTop ? "down" : "up")
      setIsAtBottom(currentScrollTop >= maxScrollTop)
      setLastScrollTop(currentScrollTop)
    }

    if (scrollingContainerRef.current) {
      scrollingContainerRef.current.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (scrollingContainerRef.current) {
        scrollingContainerRef.current.removeEventListener(
          "scroll",
          handleScroll,
        )
      }
    }
  }, [scrollingContainerRef, lastScrollTop])

  const top = scrollDirection === "up" && !isAtBottom ? -5 : 5
  const opacity = scrollDirection === "up" && !isAtBottom ? 0 : 1

  return (
    <div className="flex w-full justify-center">
      <motion.button
        className="color-shift absolute z-10 grid w-5/6 place-content-center gap-0.5 overflow-hidden overflow-ellipsis whitespace-nowrap rounded-lg border border-stone-400 bg-stone-200 px-1.5 py-0.5 text-xs font-bold text-stone-800 hover:border-stone-800 dark:border-stone-500 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-stone-400"
        initial={{ opacity: 0, top: 5 }}
        animate={{ opacity, top }}
        onClick={() => {
          setClickedUserById(userIdFromMessages)
          goToMenu("clickedUser")
        }}
      >
        {usernameFromMessages}
      </motion.button>
    </div>
  )
}

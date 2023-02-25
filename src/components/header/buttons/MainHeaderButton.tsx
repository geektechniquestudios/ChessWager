import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface Props {
  id?: string
  title: string
  openToMenu: string
  icon: React.ReactNode
  onClick?: () => void
  authRequired?: boolean
  animationOffset: number
}

export const MainHeaderButton: React.FC<Props> = ({
  title,
  openToMenu,
  icon,
  onClick,
  authRequired = false,
  id,
  animationOffset,
}) => {
  const { user } = Auth.useContainer()
  const {
    activeMenu,
    openDropdownToMenu,
    closeDropdownMenu,
    menuRefMap,
    setMenuRefMap,
  } = DropdownState.useContainer()

  const ref = useRef(null)

  useEffect(() => {
    const temp = menuRefMap.set(openToMenu, ref)
    setMenuRefMap(temp)
  }, [])

  const activeStyle =
    activeMenu === openToMenu ? "bg-stone-300 dark:bg-stone-700" : ""

  return (
    <AnimatePresence mode="wait">
      {(user || !authRequired) && (
        <motion.button
          ref={ref}
          initial={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: [0, 0, 1], translateY: 0 }}
          exit={{ opacity: 0, translateY: -30 }}
          transition={{
            duration: 0.7,
            delay: 0.05 * animationOffset,
            type: "spring",
            stiffness: 40,
          }}
          id={id}
          className={`${activeStyle} color-shift clickable grid h-9 w-9 place-content-center rounded-md border-none border-stone-800 text-stone-800 hover:border-black hover:bg-stone-300 hover:text-black dark:border-stone-300 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-700 dark:hover:text-white`}
          title={title}
          onClick={() => {
            // prevents opening new menu when header button is pressed that is already open
            if (activeMenu === openToMenu) {
              closeDropdownMenu()
              return
            }

            openDropdownToMenu(openToMenu)
            onClick && onClick()
          }}
        >
          {icon}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

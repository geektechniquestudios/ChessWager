import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { AuthState } from "../../../containers/AuthState"
import { DropdownState } from "../../../containers/DropdownState"

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
  const { user } = AuthState.useContainer()
  const {
    activeMenu,
    openDropdownToMenu,
    closeDropdownMenu,
    menuRefMap,
    setMenuRefMap,
  } = DropdownState.useContainer()

  const ref = useRef<HTMLButtonElement>(null)

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
          layout
          ref={ref}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{
            delay: 0.05 * animationOffset,
            type: "just",
          }}
          id={id}
          className={`${activeStyle} color-shift clickable z-50 grid h-9 w-9 place-content-center rounded-md text-stone-800 hover:bg-stone-300 hover:text-black dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-white`}
          title={title}
          onClick={() => {
            // prevents opening new menu when header button is pressed that is already open
            if (activeMenu === openToMenu || (authRequired && !user)) {
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

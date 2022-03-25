import "../../../../../style/scrollbar.scss"

export const AchievementsList: React.FC = ({}) => {
  return (
    <div
      className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
      style={{ direction: "rtl" }}
    >
      <div className="mt-3 w-full justify-center flex dark:text-stone-400 text-stone-400">
        Coming Soon
      </div>
    </div>
  )
}

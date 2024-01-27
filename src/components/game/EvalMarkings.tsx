interface Props {}

export const EvalMarkings: React.FC<Props> = ({}) => {
  return (
    <div className="absolute flex h-full flex-col justify-between mix-blend-exclusion">
      {[...Array(21)].map((_, index) => (
        <div
          className="flex w-full items-center justify-start text-xs"
          key={index}
        >
          {![0, 10, 20].includes(index) && (
            <div>
              <div
                className={`flex h-0.5 items-center justify-center bg-stone-500 dark:bg-stone-400 ${
                  [5, 10, 15].includes(index) ? "w-2" : "w-1"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

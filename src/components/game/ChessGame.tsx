import React from "react"
import { PlayerData } from "./PlayerData"
import Chessground from "@react-chess/chessground"
import { GameResultPopup } from "./popup/GameResultPopup"
import { motion } from "framer-motion"
import { useGameStream } from "./useGameStream"

// We use an old version of chessground because it looks better. If we ever upgarde, uncomment the styles below.
// import "chessground/assets/chessground.base.css"
// import "chessground/assets/chessground.brown.css"
// import "chessground/assets/chessground.cburnett.css"
// import "chessground/assets/chessground.base.css"

export const ChessGame: React.FC = () => {
  const {
    fen,
    whiteName,
    whiteTime,
    whiteRating,
    whiteTitle,
    blackName,
    blackTime,
    blackRating,
    blackTitle,
    orientation,
    isNewGame,
  } = useGameStream()

  return (
    <div className="flex h-full w-auto flex-col">
      <div className="flex h-full flex-col items-center justify-center gap-2 overflow-hidden p-2">
        <div className="my-0 flex w-full justify-center">
          <motion.div
            layout
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="color-shift w-2/5 resize-x flex-col justify-center overflow-hidden rounded-xl border border-stone-500 bg-stone-100 p-1.5 align-middle text-stone-900 shadow-lg dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            style={{ minWidth: "16.5em", maxWidth: "80vh" }}
          >
            <div className="relative flex h-full w-full resize justify-center align-middle">
              <GameResultPopup orientation={orientation} />
              <div className="flex w-full flex-col justify-center rounded-lg border border-stone-500 bg-stone-200 align-middle dark:border-stone-700 dark:bg-stone-700">
                <div className="flex w-full justify-center">
                  <PlayerData
                    side={orientation === "white" ? "black" : "white"}
                    title={orientation === "white" ? blackTitle : whiteTitle}
                    name={orientation === "white" ? blackName : whiteName}
                    time={orientation === "white" ? blackTime : whiteTime}
                    rating={orientation === "white" ? blackRating : whiteRating}
                    fen={fen}
                    isNewGame={isNewGame}
                    isTop
                  />
                </div>
                <div className="aspect-h-1 aspect-w-1 border-b border-t border-stone-600 dark:border-stone-400">
                  <Chessground
                    contained
                    config={{
                      fen,
                      orientation,
                      draggable: { enabled: false },
                      movable: {
                        free: false,
                      },
                      coordinates: false,
                    }}
                  />
                </div>
                <div className="flex justify-center">
                  <PlayerData
                    side={orientation === "white" ? "white" : "black"}
                    title={orientation === "black" ? blackTitle : whiteTitle}
                    name={orientation === "black" ? blackName : whiteName}
                    time={orientation === "black" ? blackTime : whiteTime}
                    rating={orientation === "black" ? blackRating : whiteRating}
                    fen={fen}
                    isNewGame={isNewGame}
                    isTop={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

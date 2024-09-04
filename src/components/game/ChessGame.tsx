import Chessground from "@react-chess/chessground"
import { motion } from "framer-motion"
import { PlayerData } from "./PlayerData"
import { GameResultPopup } from "./popup/GameResultPopup"
import { EvalBar } from "./EvalBar"
import { GameStreamState } from "../../containers/GameStreamState"
import "../../style/chessground.base.scss"
import "../../style/chessground.brown.scss"
import "../../style/chessground.cburnett.scss"

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
    isCheckmate,
    isWhiteTurn,
  } = GameStreamState.useContainer()

  const shouldShowCheckmate: "white" | "black" | false = isCheckmate
    ? isWhiteTurn
      ? "white"
      : "black"
    : false

  return (
    <div className="flex h-full w-auto flex-col">
      <div className="flex h-full flex-col items-center justify-center gap-2 overflow-hidden p-2">
        <div className="relative my-0 flex w-full justify-center">
          <motion.div
            layout
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="color-shift w-[30em] resize-x flex-col justify-center overflow-hidden rounded-xl border border-stone-500 bg-stone-50 p-1.5 align-middle text-stone-900 shadow-lg dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            style={{ minWidth: "16.5em", maxWidth: "85vh" }}
          >
            <GameResultPopup orientation={orientation} />
            <div className="flex h-full w-full items-center justify-center gap-2">
              <EvalBar fen={fen} orientation={orientation} />
              <div className="flex w-full flex-col justify-center rounded-xl  border border-stone-500 bg-stone-100 align-middle dark:border-stone-500 dark:bg-stone-700">
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

                <div className="aspect-h-1 aspect-w-1 border-b border-t border-stone-600 dark:border-stone-400">
                  <Chessground
                    contained
                    config={{
                      check: shouldShowCheckmate,
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
          </motion.div>
        </div>
      </div>
    </div>
  )
}

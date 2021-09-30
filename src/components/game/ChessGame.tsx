import React from "react"
// @ts-ignore
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import "../../style/game.css"

const ChessGame = () => {
  return (
    <div id="chess-board">
      {/* <ChessBoard position="start" /> */}
      <a href="https://lichess.org/" target="_blank" rel="noreferrer">Check out the game on lichess</a>
      <Chessground
        width="40em"
        height="40em"
        viewOnly={true}
        id="chess-board"
        // fen={}
      />
    </div>
  )
}

export default ChessGame

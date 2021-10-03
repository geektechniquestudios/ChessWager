import firebase from "firebase/compat"
import React from "react"
// @ts-ignore
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import "../../style/game.css"

const ChessGame = () => {
  const clearBets = firebase.functions().httpsCallable("clearAllActiveBets")

  return (
    <div id="chess-board">
      {/* @todo remove in prod */}
      <button onClick={e => clearBets()}> clear </button> 

      {/* <ChessBoard position="start" /> */}
      <a href="https://lichess.org/" target="_blank" rel="noreferrer">
        Check out the game on lichess
      </a>
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

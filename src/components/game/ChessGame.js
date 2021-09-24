import React from 'react'
import Chessground from 'react-chessground'
// import 'react-chessground/dist/styles/chessground.css'
import "../../style/game.css"

const ChessGame = () => {
    return (
        <div id="chess-board">
            {/* <ChessBoard position="start" /> */}
            <Chessground />
        </div>
    )
}

export default ChessGame

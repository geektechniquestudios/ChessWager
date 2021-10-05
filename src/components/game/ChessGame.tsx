import firebase from "firebase/compat"
import React, { useEffect, useState } from "react"
// @ts-ignore
import Chessground from "react-chessground"
// @ts-ignore
import ndjsonStream from "can-ndjson-stream"
import "react-chessground/dist/styles/chessground.css"
import "../../style/game.css"

interface Featured {
  t: string
  d: {
    id: string
    orientation: string //black /white
    players: Player[]
    fen: string
    wc: number
    bc: number
  }
}

interface Player {
  color: string
  user: {
    name: string
    id: string
    title: string
  }
  rating: number
}

const ChessGame: React.FC = () => {
  const clearBets = firebase.functions().httpsCallable("clearAllActiveBets")

  const [fen, setFen] = useState("")
  const [gameId, setGameId] = useState("")

  const [whiteName, setWhiteName] = useState("")
  const [whiteTime, setWhiteTime] = useState("")
  const [whiteRating, setWhiteRating] = useState(0)
  const [whiteTitle, setWhiteTitle] = useState("")

  const [blackName, setBlackName] = useState("")
  const [blackTime, setBlackTime] = useState("")
  const [blackRating, setBlackRating] = useState(0)
  const [blackTitle, setBlackTitle] = useState("")

  const updateTitles = (res: Featured): void => {
    console.log(res)
    const white: Player | undefined = res.d.players.find(
      player => player.color === "white"
    )
    const black: Player | undefined = res.d.players.find(
      player => player.color === "black"
    )

    // console.log(black)
    // console.log(white)

    if (black === undefined || white === undefined) return

    setFen(res.d.fen)
    setGameId(res.d.id)

    if(white.user.title !== undefined) setWhiteTitle(white.user.title)
    setWhiteName(white.user.name)
    setWhiteRating(white.rating)

    if(black.user.title !== undefined) setBlackTitle(white.user.title)
    setBlackName(black.user.name)
    setBlackRating(black.rating)

    return
  }

  useEffect(() => {
    fetch("https://lichess.org/api/tv/feed", {
      method: "get",
    })
      .then(data => {
        return ndjsonStream(data.body)
      })
      .then(todoStream => {
        const streamReader = todoStream.getReader()
        streamReader.read().then(async (res: any) => {
          updateTitles(res.value)
          while (!res || !res.done) {
            res = await streamReader.read()
            //updateTitles(res.value)
            if (res.value.t === "fen") {
              // game has reset
              setFen(res.value.d.fen)
            } else {
              updateTitles(res.value)
            }
          }
        })
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div id="chess-board">
      {/* @todo remove in prod */}
      <button onClick={_e => clearBets()}> clear </button>

      {/* <ChessBoard position="start" /> */}
      <a href="https://lichess.org/" target="_blank" rel="noreferrer">
        Check out the game on lichess
      </a>
      <span>
        <Chessground
          width="40em"
          height="40em"
          viewOnly={true}
          id="chess-board"
          fen={fen}
        />
        <div>
          {whiteTitle} {whiteName}
          {`${whiteTime}`}
          <br />
          {blackTitle} {blackName}
          {`${blackTime}`}
        </div>
      </span>
    </div>
  )
}

export default ChessGame

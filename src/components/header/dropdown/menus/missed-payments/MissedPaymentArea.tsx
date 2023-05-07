import { useState } from "react"

import { GameData } from "../../../../../interfaces/GameData"
import { Auth } from "../../../../containers/Auth"

interface Props {}

export const MissedPaymentArea: React.FC<Props> = ({}) => {
  const { callContract } = Auth.useContainer()
  const [gameId, setGameId] = useState<string>("")

  const sendPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fetchWinner = async () => {
      const winner = await fetch(`https://lichess.org/api/game/${gameId}`)
        .then((res) => res.json())
        .then((gameData: GameData) => {
          if (gameData.winner === "white") return "white"
          else if (gameData.winner === "black") return "black"
          else if (gameData.status === "draw") return "draw"
          else throw Error("Game is not over yet.")
        })
        .catch(console.error)
      if (winner === undefined) throw Error("winner is undefined")
      return winner as "white" | "black" | "draw"
    }

    fetchWinner().then((winner: "white" | "black" | "draw") => {
      callContract((contract) =>
        contract.payWinners(gameId, winner, {
          gasLimit: 1000000,
        }),
      )
    })
  }

  return (
    <div className="flex h-60 w-full justify-center rounded-md border-stone-300">
      <fieldset className="mx-auto flex">
        <form
          onSubmit={sendPayment}
          className="flex h-60 w-60 flex-col items-center justify-evenly"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendPayment(e)
          }}
        >
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="inline-block h-10 w-48 resize-none rounded-sm bg-stone-300 p-2 text-lg outline-none dark:bg-stone-800 dark:text-stone-50"
            placeholder="Game ID"
            autoComplete="off"
          />
          <button
            id="submit-bet"
            className="color-shift clickable rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
            type="submit"
          >
            Send Payment
          </button>
        </form>
      </fieldset>
    </div>
  )
}

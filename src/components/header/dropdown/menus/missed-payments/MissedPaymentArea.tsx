import { FormEvent, useState } from "react"
import { GameData } from "../../../../../interfaces/GameData"
import { Auth } from "../../../../containers/Auth"

type Outcome = "white" | "black" | "draw"

interface Props {}

export const MissedPaymentArea: React.FC<Props> = ({}) => {
  const { callContract } = Auth.useContainer()
  const [gameId, setGameId] = useState<string>("")

  const sendPayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const getOutcomeFromLichess = async (gameId: string): Promise<Outcome> => {
      const gameData: GameData = await fetch(
        `https://lichess.org/api/game/${gameId}`,
      ).then((response: Response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json() as Promise<GameData>
      })

      if (gameData.status === "started") throw new Error(`Game is not over`)

      return gameData?.winner ?? "draw"
    }

    const outcome = await getOutcomeFromLichess(gameId)

    callContract((contract) =>
      contract.payWinners(gameId, outcome, {
        gasLimit: 1000000,
      }),
    )
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

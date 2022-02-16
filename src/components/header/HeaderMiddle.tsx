import { useState } from "react"

interface Props {}

export const HeaderMiddle: React.FC<Props> = ({}) => {
  const [score, setScore] = useState(0)

  const wasmSupported =
    typeof WebAssembly === "object" &&
    WebAssembly.validate(
      Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00),
    )

  const stockfish = new Worker(
    wasmSupported ? "stockfish.wasm.js" : "stockfish.js",
  )

  stockfish.addEventListener("message", function (e) {
    console.log(e.data)
    setScore(e.data)
  })

  stockfish.postMessage("uci")
  return <div className="flex-auto text-white">{score}</div>
}

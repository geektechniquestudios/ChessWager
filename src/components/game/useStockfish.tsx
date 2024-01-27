import { MutableRefObject, useEffect, useRef, useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"

export const useStockfish = (fen: string) => {
  const whiteWorkerRef = useRef<Worker | null>(null)
  const blackWorkerRef = useRef<Worker | null>(null)

  const [score, setScore] = useState<number>(0)
  const [mateIn, setMateIn] = useState<number>(0)
  const [depth, setDepth] = useState<number>(-1)
  const [isAnalysisOn, setIsAnalysisOn] = useLocalStorage<boolean>(
    "isAnalysisOn",
    true,
  )

  const depthToSearch = 20

  const wasmSupported =
    typeof WebAssembly === "object" &&
    WebAssembly.validate(
      Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00),
    )

  const stockfishFile = wasmSupported ? "/stockfish.wasm.js" : "/stockfish.js"

  const handleStockfishMessage = (event: MessageEvent, isWhite: boolean) => {
    const message = event.data.toString()
    const scoreRegex = /depth (\d+).*score (cp (-?\d+)|mate (-?\d+))/
    const match = message.match(scoreRegex)
    if (!match) return

    const depth = parseInt(match[1] ?? 0, 10)
    const score = parseInt(match[3] ?? 0, 10) * (isWhite ? 1 : -1)
    const mateIn = parseInt(match[4] ?? 0, 10) * (isWhite ? 1 : -1)
    setScore(score)
    setMateIn(mateIn)
    setDepth(depth)
  }

  const newWorker = (isWhite: boolean) => {
    const worker = new Worker(stockfishFile, { type: "module" })
    worker.onmessage = (event) => {
      handleStockfishMessage(event, isWhite)
    }
    worker.postMessage("uci")
    return worker
  }

  const getIsWhiteTurn = (fen: string): boolean => fen.split(" ")[1] === "w"
  const isWhiteTurn = getIsWhiteTurn(fen)

  const analyzeFen = (fen: string) => {
    const getWorkerRefs = (
      fen: string,
    ): {
      activeWorkerRef: MutableRefObject<Worker | null>
      passiveWorkerRef: MutableRefObject<Worker | null>
    } => {
      const [activeWorkerRef, passiveWorkerRef] = getIsWhiteTurn(fen)
        ? [whiteWorkerRef, blackWorkerRef]
        : [blackWorkerRef, whiteWorkerRef]
      return { activeWorkerRef, passiveWorkerRef }
    }

    if (
      !fen ||
      !isAnalysisOn ||
      !whiteWorkerRef.current ||
      !blackWorkerRef.current
    )
      return
    const { activeWorkerRef, passiveWorkerRef } = getWorkerRefs(fen)
    passiveWorkerRef.current?.terminate()
    passiveWorkerRef.current = newWorker(!getIsWhiteTurn(fen))
    activeWorkerRef.current?.postMessage(`position fen ${fen}`)
    activeWorkerRef.current?.postMessage(`go depth ${depthToSearch}`)
  }

  const stopAnalysis = () => {
    whiteWorkerRef.current?.terminate()
    blackWorkerRef.current?.terminate()
    setDepth(-1)
    setScore(0)
    setMateIn(0)
  }

  const startAnalysis = (fen: string) => {
    whiteWorkerRef.current = newWorker(true)
    blackWorkerRef.current = newWorker(false)
    analyzeFen(fen)
  }

  const [areWorkersReady, setAreWorkersReady] = useState(false)

  useEffect(() => {
    if (!areWorkersReady) return
    analyzeFen(fen)
  }, [fen])

  useEffect(() => {
    isAnalysisOn ? startAnalysis(fen) : stopAnalysis()
    setAreWorkersReady(true)
    return () => {
      stopAnalysis()
    }
  }, [isAnalysisOn])

  return {
    depth,
    score,
    mateIn,
    isAnalysisOn,
    setIsAnalysisOn,
    isWhiteTurn,
  }
}

import { useMotionValue, useAnimationFrame } from "framer-motion"
import { useRef } from "react"

export const useOrbitAnimation = (shouldAnimate: boolean) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const startTime = useRef<number | null>(null)

  const wanderSpeed = 1.5
  const bobSpeed = 3
  const bobAmount = 6
  const horizontalWanderAmount = 24
  const verticalWanderAmount = 8

  const generateNoiseOffset = (t: number, speed: number, seedOffset = 0) => {
    const noiseScale = 0.6
    const x = Math.cos(t * speed + seedOffset)
    const y = Math.sin(t * speed * 1.3 + seedOffset)
    const z = Math.sin(t * speed * 0.7 + seedOffset + Math.PI)
    return (x + y + z) * noiseScale
  }

  useAnimationFrame((t) => {
    if (!shouldAnimate) return
    if (startTime.current === null) startTime.current = t

    const elapsedSec = (t - startTime.current) / 1000

    const verticalBob = Math.sin(elapsedSec * bobSpeed) * bobAmount
    const horizontalWander =
      generateNoiseOffset(elapsedSec, wanderSpeed, 0) * horizontalWanderAmount
    const verticalWander =
      generateNoiseOffset(elapsedSec, wanderSpeed, 100) * verticalWanderAmount

    const finalX = horizontalWander
    const finalY = verticalWander + verticalBob

    x.set(finalX)
    y.set(finalY)
  })

  return { x, y }
}

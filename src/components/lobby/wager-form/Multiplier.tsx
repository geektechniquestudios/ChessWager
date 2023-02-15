import { Slider } from "@mui/material"
import { useState } from "react"
import CurrencyInput from "react-currency-input-field"

interface Props {
  multiplier: number
  setMultiplier: React.Dispatch<React.SetStateAction<number>>
  sliderVal: number
  setSliderVal: React.Dispatch<React.SetStateAction<number>>
}

export const Multiplier: React.FC<Props> = ({
  multiplier,
  setMultiplier,
  sliderVal,
  setSliderVal,
}) => {
  const [localMultiplier, setLocalMultiplier] = useState(
    multiplier.toFixed(2).toString(),
  )

  const calcMultiplier = (sliderVal: number) => {
    if (sliderVal <= 0) {
      setMultiplier(Number((1.0 + Number(sliderVal)).toFixed(2)))
      setLocalMultiplier((1.0 + Number(sliderVal)).toFixed(2).toString())
    } else {
      setMultiplier(Number((1 / (1 - Number(sliderVal))).toFixed(2)))
      setLocalMultiplier((1 / (1 - Number(sliderVal))).toFixed(2).toString())
    }
  }

  const calcSlider = (multiplier: number) => {
    if (multiplier <= 1) {
      setSliderVal(Number((multiplier - 1).toFixed(2)))
    } else if (multiplier > 1) {
      setSliderVal(
        (Number(multiplier.toFixed(2)) - 1) / Number(multiplier.toFixed(2)),
      )
    }
  }

  const updateSlider = (e: any) => {
    const newSliderVal: number = Number(e.target.value ?? 0)
    setSliderVal(newSliderVal)
    calcMultiplier(newSliderVal)
  }

  const blur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    let tempValue = e.target.value.replace(/,/g, "") ?? "1.00"
    if (tempValue === "") {
      tempValue = "1.00"
    }
    let newValue = Number(Number(tempValue).toFixed(2))

    if (newValue <= 0) {
      newValue = 0.01
    } else if (newValue > 100) {
      newValue = 100.0
    }

    setLocalMultiplier(newValue.toString())
    setMultiplier(newValue)
    calcSlider(newValue)
  }

  return (
    <div className="color-shift flex w-full rounded-md border border-stone-400 bg-stone-300 p-2 dark:border-stone-500 dark:bg-stone-700">
      <div className="grid place-content-center">
        <p className="font-bold text-stone-900 dark:text-stone-300">
          Multiplier
        </p>
      </div>
      <div className="mx-2 border border-stone-900 dark:border-stone-500" />
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col px-3 py-1">
          <Slider
            className="w-full"
            value={sliderVal}
            onChange={updateSlider}
            min={-0.99}
            max={0.99}
            step={0.01}
            size="small"
            aria-label="multiplier-slider"
          />
          <p className="flex justify-center">
            <CurrencyInput
              value={localMultiplier}
              onValueChange={(value) => {
                setLocalMultiplier(value!)
              }}
              className="w-14 rounded-sm bg-stone-200 p-1 text-center font-bold text-stone-900 dark:bg-stone-800 dark:text-stone-200"
              allowNegativeValue={false}
              fixedDecimalLength={2}
              onBlur={blur}
              onKeyPress={(e) => {
                e.key === "Enter" && e.currentTarget.blur()
              }}
              aria-label="multiplier-number-input"
            />
          </p>
        </div>
      </div>
    </div>
  )
}

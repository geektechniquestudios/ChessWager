import { Slider } from "@mui/material"
import { useState } from "react"
import CurrencyInput from "react-currency-input-field"

interface Props {
  setMultiplier: React.Dispatch<React.SetStateAction<number>>
  sliderVal: number
  setSliderVal: React.Dispatch<React.SetStateAction<number>>
}

export const Multiplier: React.FC<Props> = ({
  setMultiplier,
  sliderVal,
  setSliderVal,
}) => {
  const [localMultiplier, setLocalMultiplier] = useState("1.00")

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
    <div className="flex p-2 border w-full border-stone-400 dark:border-stone-500 dark:bg-stone-700 bg-stone-300 color-shift rounded-md">
      <div className="grid place-content-center">
        <p className="text-stone-900 dark:text-stone-300 font-bold">
          Multiplier
        </p>
      </div>
      <div className="border mx-2 border-stone-900 dark:border-stone-500" />
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full px-3 py-1">
          <Slider
            className="w-full "
            value={sliderVal}
            onChange={updateSlider}
            min={-0.99}
            max={0.99}
            step={0.01}
            size="small"
          />
          <p className="flex justify-center">
            <CurrencyInput
              value={localMultiplier}
              onValueChange={(value) => {
                setLocalMultiplier(value!)
              }}
              className="w-14 p-1 text-center bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-200 font-bold rounded-sm"
              allowNegativeValue={false}
              fixedDecimalLength={2}
              onBlur={blur}
              onKeyPress={(e) => {
                e.key === "Enter" && e.currentTarget.blur()
              }}
            />
          </p>
        </div>
      </div>
    </div>
  )
}

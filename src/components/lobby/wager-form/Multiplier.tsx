import RangeSlider from "react-bootstrap-range-slider"

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
  const calcMultiplier = (sliderVal: number) => {
    if (sliderVal <= 0) {
      setMultiplier(1.0 + Number(sliderVal)) // @todo are these number casts redundant? don't remember why I did this
    } else {
      setMultiplier(1 / (1 - Number(sliderVal)))
    }
  }

  const updateSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSliderVal: number = Number(e.target.value)
    setSliderVal(newSliderVal)
    calcMultiplier(newSliderVal)
  }
  return (
    <div className="flex p-2 border-2">
      <div className="grid place-content-center">
        <label>Multiplier</label>
      </div>
      <div className="border-1 mx-2" />
      <div className="grid place-content-center">
        <RangeSlider
          className="range"
          value={sliderVal}
          onChange={updateSlider}
          min={-0.99}
          max={0.99}
          step={0.01}
          tooltip="off"
        />
        <p className="flex justify-center">
          {/* <input type="text">{Number(multiplier).toFixed(2)}</input> */}
          <input
            type="text"
            value={multiplier.toFixed(2)}
            onChange={(e) => {
              setMultiplier(Number(e.target.value))
            }}
            className="w-10 p-1 "
          ></input>
        </p>
      </div>
    </div>
  )
}

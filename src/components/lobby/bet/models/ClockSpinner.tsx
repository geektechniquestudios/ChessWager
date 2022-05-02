import { DarkMode } from "../../../containers/DarkMode"
// "Forked" from https://codepen.io/nikhil8krishnan/pen/rVoXJa, but there's no github repo
// Thank you Nikhil Krishnan!

export const ClockSpinner: React.FC = () => {
  const { isDarkOn } = DarkMode.useContainer()
  const stroke = isDarkOn ? "#d6d3d1" : "#1c1917"
  return (
    <>
      <div className="grid place-content-center m-0.5" title="Waiting for an Oponent">
        <svg
          version="1.1"
          id="L2"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 100 100"
          width={21}
          height={21}
        >
          <circle
            fill="none"
            stroke={stroke}
            strokeWidth="3"
            strokeMiterlimit="10"
            cx="50"
            cy="50"
            r="48"
          />
          <line
            fill="none"
            strokeLinecap="round"
            stroke={stroke}
            strokeWidth="7"
            strokeMiterlimit="10"
            x1="50"
            y1="50"
            x2="85"
            y2="50.5"
          >
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
          <line
            fill="none"
            strokeLinecap="round"
            stroke={stroke}
            strokeWidth="7"
            strokeMiterlimit="10"
            x1="50"
            y1="50"
            x2="49.5"
            y2="74"
          >
            <animateTransform
              attributeName="transform"
              dur="15s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
        </svg>
      </div>
    </>
  )
}

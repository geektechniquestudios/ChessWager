import { Auth } from "../../containers/Auth"

// Forked from https://codepen.io/nikhil8krishnan/pen/rVoXJa, but there's no github repo
// Thank you Nikhil Krishnan!

interface Props {
  status: string
  user1Id: string
}

export const User2Spinner: React.FC<Props> = ({ status, user1Id }) => {
  const { auth } = Auth.useContainer()
  const isUser1 = auth.currentUser?.uid === user1Id
  const stroke = "teal"
  return (
    <>
      {status === "ready" && isUser1 && (
        <div
          className="grid place-content-center"
          title="Waiting for an Oponent"
        >
          <svg
            version="1.1"
            id="L2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 100 100"
            width={25}
            height={25}
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
      )}
    </>
  )
}
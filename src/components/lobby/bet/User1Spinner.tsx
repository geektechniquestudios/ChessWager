import { Auth } from "../../containers/Auth"
import "./spinner.scss"

interface Props {user2Id: string, status: string}

export const User1Spinner: React.FC<Props> = ({user2Id, status}) => {
  const { auth } = Auth.useContainer()
  const isUser2 = auth.currentUser?.uid === user2Id
  return (
    <>
      {status === "pending" && isUser2 && (
        <div
          className="grid place-content-center"
          title="Opponent is Deciding"
        >
          <svg
            className="spinner"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="path"
              fill="none"
              stroke-width="6"
              stroke-linecap="round"
              cx="33"
              cy="33"
              r="30"
            ></circle>
          </svg>
        </div>
      )}
    </>
  )
}

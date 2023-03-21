import { BeatLoader } from "react-spinners"
import { Auth } from "../../../../containers/Auth"

interface Props {
  user2Id: string
  status: string
}

export const User1Spinner: React.FC<Props> = ({ user2Id, status }) => {
  const { auth } = Auth.useContainer()
  const isUser2 = auth.currentUser?.uid === user2Id
  return (
    // <div className="absolute inset-0 grid h-10 w-10 place-content-center rounded-full">
    <>
      {status === "pending" && isUser2 && (
        <></>
        // <CircularProgress color="neutral" size="lg" value={1} variant="soft" />
      )}
    </>
    // </div>
  )
}

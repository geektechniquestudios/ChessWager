import { useMoralis } from "react-moralis"

const MetamaskSignIn: React.FC = () => {
  const { authenticate, user } = useMoralis()

  return (
    <>
      <button
        onClick={() => {
          authenticate()
        }}
      >
        Connect Metamask
      </button>
    </>
  )
}

export default MetamaskSignIn

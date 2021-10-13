import { useMoralis } from "react-moralis"

const MetamaskSignIn = () => {
  const { authenticate } = useMoralis()
  return (
    <>
      <button
        onClick={() => {
          authenticate().catch(console.error)
        }}
      >
        Connect Metamask
      </button>
    </>
  )
}

export default MetamaskSignIn

import { useMoralis } from "react-moralis"

const MetamaskSignIn: React.FC = () => {
  const { authenticate, enableWeb3 } = useMoralis()

  return (
    <>
      <button
        onClick={() => {
          authenticate() //@todo do I need both of these?
          enableWeb3()
        }}
      >
        Connect Metamask
      </button>
    </>
  )
}

export default MetamaskSignIn

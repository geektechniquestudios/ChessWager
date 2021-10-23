import { useMoralis } from "react-moralis"

const MetamaskSignOut = () => {
  const { logout } = useMoralis()
  return (
    <>
      <button
        onClick={() => {
          logout()
        }}
      >
        Disconnect Metamask
      </button>
    </>
  )
}

export default MetamaskSignOut

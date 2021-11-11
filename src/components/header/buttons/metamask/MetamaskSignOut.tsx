import { useMoralis } from "react-moralis"

const MetamaskSignOut = () => {
  const { logout } = useMoralis()
  return (
    <>
      <button
        onClick={() => {
          logout()
        }}
        className="header-button"
      >
        Disconnect Metamask
      </button>
    </>
  )
}

export default MetamaskSignOut

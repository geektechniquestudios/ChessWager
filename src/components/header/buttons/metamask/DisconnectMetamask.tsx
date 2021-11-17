import { useMoralis } from "react-moralis"

export const DisconnectMetamask = () => {
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

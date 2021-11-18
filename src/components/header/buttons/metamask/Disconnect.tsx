import { useMoralis } from "react-moralis"

export const Disconnect = () => {
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
